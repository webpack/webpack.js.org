---
title: 资源模块
sort: 24
contributors:
  - smelukov
  - EugeneHlushko
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

W> 这是一项实验功能。通过在 webpack 配置的 [experiments](/configuration/experiments/) 选项中设置 `experiments.asset: true` 来开启资源模块。

__webpack.config.js__

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
+ experiments: {
+   asset: true
+ },
};
```

## resource 资源(resource asset) {#resource-assets}

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
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

__src/index.js__

```js
import mainImage from './images/main.png';

img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
```

所有 `.png` 文件都将被发送到输出目录，并且其路径将被注入到 bundle 中。

### 自定义输出文件名 {#custom-output-filename}

默认情况下，`asset/resource` 模块以 `[hash][ext]` 文件名发送到输出目录。

可以通过在 webpack 配置中设置 [`output.assetModuleFilename`](/configuration/output/#outputassetmodulefilename) 来修改此模板字符串：

__webpack.config.js__

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext]'
  },
  experiments: {
    asset: true
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
+   assetModuleFilename: 'images/[hash][ext]'
  },
  experiments: {
    asset: true
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
+         filename: 'static/[hash][ext]'
+       }
+     }
    ]
  },
};
```

使用此配置，所有 `html` 文件都将被发送到输出目录中的 `static` 目录中。

`Rule.generator.filename` 与 [`output.assetModuleFilename`](/configuration/output/#outputassetmodulefilename) 相同，并且仅适用于 `asset` 和 `asset/resource` 模块类型。

## inline 资源(inlining asset) {#inlining-assets}

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
-   assetModuleFilename: 'images/[hash][ext]'
  },
  experiments: {
    asset: true
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
-         filename: 'static/[hash][ext]'
-       }
-     }
    ]
  }
};
```

__src/index.js__

```diff
- import mainImage from './images/main.png';
+ import metroMap from './images/matro.svg';

- img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
+ block.style.background = `url(${metroMap})`; // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
```

所有 `.svg` 文件都将作为 data URI 注入到 bundle 中。

### 自定义 data URI 生成器 {#custom-data-uri-generator}

webpack 输出的 data URI，默认是呈现为使用 Base64 算法编码的文件内容。

如果要使用自定义编码算法，则可以指定一个自定义函数来编码文件内容：

__webpack.config.js__

```diff
const path = require('path');
+ const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
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

__webpack.config.js__

```diff
const path = require('path');
- const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
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

__src/example.txt__

```text
Hello world
```

__src/index.js__

```diff
- import metroMap from './images/matro.svg';
+ import exampleText from './example.txt';

- block.style.background = `url(${metroMap}); // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
+ block.textContent = exampleText; // 'Hello world'
```

所有 `.txt` 文件将原样注入到 bundle 中。

## 通用资源类型(general asset type) {#general-asset-type}

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
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

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
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
