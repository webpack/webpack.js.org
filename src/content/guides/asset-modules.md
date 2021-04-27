---
title: 资源模块
sort: 25
contributors:
  - smelukov
  - EugeneHlushko
  - chenxsan
  - anshumanv
  - spence-s
translators:
  - QC-L
  - jacob-lcs
  - dear-lizhihua
related:
  - title: webpack 5 - 资源模块
    url: https://dev.to/smelukov/webpack-5-asset-modules-2o3h
---

资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

在 webpack 5 之前，通常使用：

- [`raw-loader`](/loaders/raw-loader/) 将文件导入为字符串
- [`url-loader`](/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中
- [`file-loader`](/loaders/file-loader/) 将文件发送到输出目录

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

当在 webpack 5 中使用旧的 assets loader（如 `file-loader`/`url-loader`/`raw-loader` 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 `'javascript/auto'` 来解决。

**webpack.config.js**

```diff
module.exports = {
  module: {
   rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
+       type: 'javascript/auto'
      },
   ]
  },
}
```

如需从 asset loader 中排除来自新 URL 处理的 asset，请添加 `dependency: { not: ['url'] }` 到 loader 配置中。

**webpack.config.js**

```diff
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
+       dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  }
}
```

## Resource 资源 {#resource-assets}

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
+ module: {
+   rules: [
+     {
+       test: /\.png/,
+       type: 'asset/resource'
+     }
+   ]
+ },
};
```

**src/index.js**

```js
import mainImage from './images/main.png';

img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
```

所有 `.png` 文件都将被发送到输出目录，并且其路径将被注入到 bundle 中。

### 自定义输出文件名 {#custom-output-filename}

默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。

可以通过在 webpack 配置中设置 [`output.assetModuleFilename`](/configuration/output/#outputassetmodulefilename) 来修改此模板字符串：

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
};
```

另一种自定义输出文件名的方式是，将某些资源发送到指定目录：

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
-     }
+     },
+     {
+       test: /\.html/,
+       type: 'asset/resource',
+       generator: {
+         filename: 'static/[hash][ext][query]'
+       }
+     }
    ]
  },
};
```

使用此配置，所有 `html` 文件都将被发送到输出目录中的 `static` 目录中。

`Rule.generator.filename` 与 [`output.assetModuleFilename`](/configuration/output/#outputassetmodulefilename) 相同，并且仅适用于 `asset` 和 `asset/resource` 模块类型。

## inline 资源(inlining asset) {#inlining-assets}

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
-   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
-       test: /\.png/,
-       type: 'asset/resource'
+       test: /\.svg/,
+       type: 'asset/inline'
-     },
+     }
-     {
-       test: /\.html/,
-       type: 'asset/resource',
-       generator: {
-         filename: 'static/[hash][ext][query]'
-       }
-     }
    ]
  }
};
```

**src/index.js**

```diff
- import mainImage from './images/main.png';
+ import metroMap from './images/metro.svg';

- img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
+ block.style.background = `url(${metroMap})`; // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
```

所有 `.svg` 文件都将作为 data URI 注入到 bundle 中。

### 自定义 data URI 生成器 {#custom-data-uri-generator}

webpack 输出的 data URI，默认是呈现为使用 Base64 算法编码的文件内容。

如果要使用自定义编码算法，则可以指定一个自定义函数来编码文件内容：

**webpack.config.js**

```diff
const path = require('path');
+ const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
+       generator: {
+         dataUrl: content => {
+           content = content.toString();
+           return svgToMiniDataURI(content);
+         }
+       }
      }
    ]
  },
};
```

现在，所有 `.svg` 文件都将通过 `mini-svg-data-uri` 包进行编码。

## source 资源(source asset) {#source-assets}

**webpack.config.js**

```diff
const path = require('path');
- const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
-       test: /\.svg/,
-       type: 'asset/inline',
-       generator: {
-         dataUrl: content => {
-           content = content.toString();
-           return svgToMiniDataURI(content);
-         }
-       }
+       test: /\.txt/,
+       type: 'asset/source',
      }
    ]
  },
};
```

**src/example.txt**

```text
Hello world
```

**src/index.js**

```diff
- import metroMap from './images/metro.svg';
+ import exampleText from './example.txt';

- block.style.background = `url(${metroMap}); // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
+ block.textContent = exampleText; // 'Hello world'
```

所有 `.txt` 文件将原样注入到 bundle 中。

## URL 资源

当使用 `new URL('./path/to/asset', import.meta.url)`，webpack 也会创建资源模块。

**src/index.js**

```js
const logo = new URL('./logo.svg', import.meta.url);
```

根据你配置中 [`target`](/configuration/target/) 的不同，webpack 会将上述代码编译成不同结果：

```js
// target: web
new URL(
  __webpack_public_path__ + 'logo.svg',
  document.baseURI || self.location.href
);

// target: webworker
new URL(__webpack_public_path__ + 'logo.svg', self.location);

// target: node, node-webkit, nwjs, electron-main, electron-renderer, electron-preload, async-node
new URL(
  __webpack_public_path__ + 'logo.svg',
  require('url').pathToFileUrl(__filename)
);
```

## 通用资源类型 {#general-asset-type}

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
+       test: /\.txt/,
+       type: 'asset',
      }
    ]
  },
};
```

现在，webpack 将按照默认条件，自动地在 `resource` 和 `inline` 之间进行选择：小于 8kb 的文件，将会视为 `inline` 模块类型，否则会被视为 `resource` 模块类型。

可以通过在 webpack 配置的 module rule 层级中，设置 [`Rule.parser.dataUrlCondition.maxSize`](/configuration/module/#ruleparserdataurlcondition) 选项来修改此条件：

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
+       parser: {
+         dataUrlCondition: {
+           maxSize: 4 * 1024 // 4kb
+         }
+       }
      }
    ]
  },
};
```

还可以 [指定一个函数](/configuration/module/#ruleparserdataurlcondition) 来决定是否 inline 模块。

## 变更内联 loader 的语法 {#replacing-inline-loader-syntax}

在 asset 模块和 webpack 5 之前，可以使用[内联语法](/concepts/loaders/#inline)与上述传统的 loader 结合使用。

现在建议去掉所有的内联 loader 的语法，使用资源查询条件来模仿内联语法的功能。

示例，将 `raw-loader` 替换为 `asset/source` 类型：

```diff
- import myModule from 'raw-loader!my-module';
+ import myModule from 'my-module?raw';
```

webpack 相关配置：

```diff
module: {
    rules: [
    // ...
+     {
+       resourceQuery: /raw/,
+       type: 'asset/source',
+     }
    ]
  },
```

如果你想把原始资源排除在其他 loader 的处理范围以外，请使用使用取反的正则：

```diff
module: {
    rules: [
    // ...
+     {
+       test: /\.m?js$/,
+       resourceQuery: { not: /raw/ },
+       use: [ ... ]
+     },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      }
    ]
  },
```

或者使用 `oneOf` 的规则列表。此处只应用第一个匹配规则：

```diff
module: {
    rules: [
    // ...
+     { oneOf: [
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
+       {
+         test: /\.m?js$/,
+         use: [ ... ]
+       },
+     ] }
    ]
  },
```
