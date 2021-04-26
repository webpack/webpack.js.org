---
title: 创建 library
sort: 7
contributors:
  - pksjce
  - johnstew
  - simon04
  - 5angel
  - marioacc
  - byzyk
  - EugeneHlushko
  - AnayaDesign
  - chenxsan
  - wizardofhogwarts
---

除了打包应用程序，webpack 还可以用于打包 JavaScript library。以下指南适用于希望简化打包策略的 library 作者。

## 创建一个 library {#authoring-a-library}

假设我们正在编写一个名为 `webpack-numbers` 的小的 library，可以将数字 1 到 5 转换为文本表示，反之亦然，例如将 2 转换为 'two'。

基本的项目结构可能如下所示：

**project**

```diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

使用 npm 初始化项目，然后安装 `webpack`，`webpack-cli` 和 `lodash`：

```bash
npm init -y
npm install --save-dev webpack webpack-cli lodash
```

我们将 `lodash` 安装为 `devDependencies` 而不是 `dependencies`，因为我们不需要将其打包到我们的库中，否则我们的库体积很容易变大。

**src/ref.json**

```json
[
  {
    "num": 1,
    "word": "One"
  },
  {
    "num": 2,
    "word": "Two"
  },
  {
    "num": 3,
    "word": "Three"
  },
  {
    "num": 4,
    "word": "Four"
  },
  {
    "num": 5,
    "word": "Five"
  },
  {
    "num": 0,
    "word": "Zero"
  }
]
```

**src/index.js**

```js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ''
  );
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}
```

## Webpack 配置 {#webpack-configuration}

我们可以从如下 webpack 基本配置开始：

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
  },
};
```

你应该能够熟练使用 webpack 打包你的应用。基本上，我们将通知 webpack 将 `src/index.js` 打包到 `dist/webpack-numbers.js` 中。

## Expose the Library {#expose-the-library}

到目前为止，一切都应该与打包应用程序一样，这里是不同的部分 - 我们需要通过 [`output.library`](/configuration/output/#outputlibrary) 配置项暴露从入口导出的内容。

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
+     library: "webpackNumbers",
    },
  };
```

We exposed the entry point as `webpackNumbers` so users can use it through script tag:

```html
<script src="https://example.org/webpack-numbers.js"></script>
<script>
  window.webpackNumbers.wordToNum('Five');
</script>
```

然而它只能通过被 script 标签引用而发挥作用，它不能运行在 CommonJS、AMD、Node.js 等环境中。

作为一个库作者，我们希望它能够兼容不同的环境，也就是说，用户应该能够通过以下方式使用打包后的库：

- **CommonJS module require**:

  ```js
  const webpackNumbers = require('webpack-numbers');
  // ...
  webpackNumbers.wordToNum('Two');
  ```

- **AMD module require**:

  ```js
  require(['webpackNumbers'], function (webpackNumbers) {
    // ...
    webpackNumbers.wordToNum('Two');
  });
  ```

- **script tag**:

  ```html
  <!DOCTYPE html>
  <html>
    ...
    <script src="https://example.org/webpack-numbers.js"></script>
    <script>
      // ...
      // Global variable
      webpackNumbers.wordToNum('Five');
      // Property in the window object
      window.webpackNumbers.wordToNum('Five');
      // ...
    </script>
  </html>
  ```

我们更新 `output.library` 配置项，将其 `type` 设置为 [`'umd'`](/configuration/output/#type-amd)：

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'webpack-numbers.js',
-    library: 'webpackNumbers',
+    library: {
+      name: 'webpackNumbers',
+      type: 'umd',
+    },
   },
 };
```

现在 webpack 将打包一个库，其可以与 CommonJS、AMD 以及 script 标签使用。

T> 请注意，`library` 设置与 `entry` 配置项绑定。对于绝大多数的库，指定一个入口就已经足够了。尽管 [multi-part 库](https://github.com/webpack/webpack/tree/master/examples/multi-part-library) 是有可能的，但通过作为单个入口点的[索引脚本](https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file)暴露部分导出会更简单。**不推荐**使用一个 `array` 作为库的 `entry`。

## 外部化 lodash {#externalize-lodash}

现在，如果执行 `webpack`，你会发现创建了一个体积相当大的文件。如果你查看这个文件，会看到 lodash 也被打包到代码中。在这种场景中，我们更倾向于把 `lodash` 当作 `peerDependency`。也就是说，consumer(使用者) 应该已经安装过 `lodash` 。因此，你就可以放弃控制此外部 library ，而是将控制权让给使用 library 的 consumer。

这可以使用 `externals` 配置来完成：

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
      library: {
        name: "webpackNumbers",
        type: "umd"
      },
    },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_',
+     },
+   },
  };
```

这意味着你的 library 需要一个名为 `lodash` 的依赖，这个依赖在 consumer 环境中必须存在且可用。

### 外部化的限制 {#external-limitations}

对于想要实现从一个依赖中调用多个文件的那些 library：

```js
import A from 'library/one';
import B from 'library/two';

// ...
```

无法通过在 externals 中指定整个 `library` 的方式，将它们从 bundle 中排除。而是需要逐个或者使用一个正则表达式，来排除它们。

```js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // 匹配以 "library/" 开始的所有依赖
    /^library\/.+$/,
  ],
};
```

## 最终步骤 {#final-steps}

遵循 [生产环境](/guides/production) 指南中提到的步骤，来优化生产环境下的输出结果。那么，我们还需要将生成 bundle 的文件路径，添加到 `package.json` 中的 `main` 字段中。

**package.json**

```json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

或者，按照这个 [指南](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)，将其添加为标准模块：

```json
{
  ...
  "module": "src/index.js",
  ...
}
```

这里的 key(键) `main` 是参照 [`package.json` 标准](https://docs.npmjs.com/files/package.json#main)，而 `module` 是参照 [一个](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md)[提案](https://github.com/rollup/rollup/wiki/pkg.module)，此提案允许 JavaScript 生态系统升级使用 ES2015 模块，而不会破坏向后兼容性。

W> `module` 属性应指向一个使用 ES2015 模块语法的脚本，但不包括浏览器或 Node.js 尚不支持的其他语法特性。这使得 webpack 本身就可以解析模块语法，如果用户只用到 library 的某些部分，则允许通过 [tree shaking](https://webpack.docschina.org/guides/tree-shaking/) 打包更轻量的包。

现在，你可以 [将其发布为一个 npm package](https://docs.npmjs.com/getting-started/publishing-npm-packages)，并且在 [unpkg.com](https://unpkg.com/#/) 找到它，并分发给你的用户。

T> 为了暴露和 library 关联着的样式表，你应该使用 [`MiniCssExtractPlugin`](/plugins/mini-css-extract-plugin)。然后，用户可以像使用其他样式表一样使用和加载这些样式表。
