---
title: 创建 Library
sort: 12
contributors:
  - pksjce
  - johnstew
  - simon04
  - 5angel
  - marioacc
---

除了打包应用程序代码，webpack 还可以用于打包 JavaScript library。以下指南适用于希望流水线化(streamline)打包策略的 library 作者。


## 创建一个 library

假设你正在编写一个名为 `webpack-numbers` 的小的 library，可以将数字 1 到 5 转换为文本表示，反之亦然，例如将 2 转换为 'two'。

基本的项目结构可能如下所示：

__project__

``` diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

初始化 npm，安装 webpack 和 lodash：

``` bash
npm init -y
npm install --save-dev webpack lodash
```

__src/ref.json__

```javascript
[{
  "num": 1,
  "word": "One"
}, {
  "num": 2,
  "word": "Two"
}, {
  "num": 3,
  "word": "Three"
}, {
  "num": 4,
  "word": "Four"
}, {
  "num": 5,
  "word": "Five"
}, {
  "num": 0,
  "word": "Zero"
}]
```

__src/index.js__

```javascript
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
};

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
};
```

该 library 的使用方式如下：

```javascript
// ES2015 模块引入
import * as webpackNumbers from 'webpack-numbers';
// CommonJS 模块引入
var webpackNumbers = require('webpack-numbers');
// ...
// ES2015 和 CommonJS 模块调用
webpackNumbers.wordToNum('Two');
// ...
// AMD 模块引入
require(['webpackNumbers'], function ( webpackNumbers) {
  // ...
  // AMD 模块调用
  webpackNumbers.wordToNum('Two');
  // ...
});
```

用户还可以通过 script 标签来加载和使用此 library：

``` html
<html>
...
<script src="https://unpkg.com/webpack-numbers"></script>
<script>
  // ...
  // 全局变量
  webpackNumbers.wordToNum('Five')
  // window 对象中的属性
  window.webpackNumbers.wordToNum('Five')
  // ...
</script>
</html>
```

注意，我们还可以通过以下配置方式，将 library 暴露：

- global 对象中的属性，用于 Node.js。
- `this` 对象中的属性。

完整的 library 配置和相关代码请参阅 [webpack library 示例](https://github.com/kalcifer/webpack-library-example)。


## 基本配置

现在，让我们以某种方式打包这个 library，能够实现以下几个目标：

- 不打包 `lodash`，而是使用 `externals` 来 require 用户加载好的 lodash。
- 设置 library 的名称为 `webpack-numbers`.
- 将 library 暴露为一个名为 `webpackNumbers`的变量。
- 能够访问其他 Node.js 中的 library。

此外，用户应该能够通过以下方式访问 library：

- ES2015 模块。例如 `import webpackNumbers from 'webpack-numbers'`。
- CommonJS 模块。例如 `require('webpack-numbers')`.
- 全局变量，当通过 `script` 脚本引入时

我们可以从这个基本的 webpack 配置开始：

__webpack.config.js__

```javascript
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js'
  }
};
```


## 外部化 lodash

现在，如果执行 `webpack`，你会发现创建了一个非常巨大的文件。如果你查看这个文件，会看到 lodash 也被打包到代码中。在这种场景中，我们更倾向于把 `lodash` 当作 `peerDependency`。也就是说，用户应该已经将 `lodash` 安装好。因此，你可以放弃对外部 library 的控制，而是将控制权让给使用 library 的用户。

这可以使用 `externals` 配置来完成：

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js'
-   }
+   },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_'
+     }
+   }
  };
```

这意味着你的 library 需要一个名为 `lodash` 的依赖，这个依赖在用户的环境中必须存在且可用。

T> 注意，如果你计划只是将 library 用作另一个 webpack bundle 中的依赖模块，则可以将 `externals` 指定为数组。


## 外部扩展的限制

对于从一个依赖目录中，调用多个文件的 library：

``` js
import A from 'library/one';
import B from 'library/two';

// ...
```

无法通过在 externals 中指定 `library` 目录的方式，将它们从 bundle 中排除。你需要逐个排除它们，或者使用正则表达式排除。

``` js
externals: [
  'library/one',
  'library/two',
  // Everything that starts with "library/"
  /^library\/.+$/
]
```


## 暴露 library

对于用途广泛的 library，我们希望它能够兼容不同的环境，例如 CommonJS，AMD，Node.js 或者作为一个全局变量。为了让你的 library 能够在各种用户环境(consumption)中可用，需要在 `output` 中添加 `library` 属性：

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
-     filename: 'webpack-numbers.js'
+     filename: 'webpack-numbers.js',
+     library: 'webpackNumbers'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

当你在 import 引入模块时，这可以将你的 library bundle 暴露为名为 `webpackNumbers` 的全局变量。为了让 library 和其他环境兼容，还需要在配置文件中添加 `libraryTarget` 属性。这是可以控制 library 如何以不同方式暴露的选项。

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
-     library: 'webpackNumbers'
+     library: 'webpackNumbers',
+     libraryTarget: 'umd'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

可以通过以下方式暴露 library：

- 遍历：作为一个全局变量，通过 `script` 标签来访问（`libraryTarget:'var'`）。
- this：通过 `this` 对象访问（`libraryTarget:'this'`）。
- window：通过 `window` 对象访问，在浏览器中（`libraryTarget:'window'`）。
- UMD：在 AMD 或 CommonJS 的 `require` 之后可访问（`libraryTarget:'umd'`）。

如果设置了 `library` 但没设置 `libraryTarget`，则 `libraryTarget` 默认为 `var`，详细说明请查看 [output 配置文档](/configuration/output)。查看 [`output.libraryTarget`](/configuration/output#output-librarytarget)，以获取所有可用选项的详细列表。

W> 在 webpack 3.5.5 中，使用 `libraryTarget: { root:'_' }` 将无法正常工作（参考 [issue 4824](https://github.com/webpack/webpack/issues/4824)) 所述）。然而，可以设置 `libraryTarget: { var: '_' }` 来将 library 作为全局变量。


### 最终步骤

遵循[生产环境指南](/guides/production)中的步骤，来优化生产环境下的输出。那么，我们还需要通过设置 `package.json` 中的 `main` 字段，添加生成 bundle 的文件路径。

__package.json__

``` json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

或者，按照这里的[指南](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)添加为标准模块：

``` json
{
  ...
  "module": "src/index.js",
  ...
}
```

键(key) `main` 是指 [`package.json` 标准](https://docs.npmjs.com/files/package.json#main)，以及`module` 是[一个](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md)[提案](https://github.com/rollup/rollup/wiki/pkg.module)，此提案允许 JavaScript 生态系统升级使用 ES2015 模块，而不会破坏向后兼容性。

W> `module` 将指向一个含有 ES2015 模块语法的模块，但是只有在支持此语法功能的浏览器或 Node.js 版本中才可用。

现在你可以[将其发布为一个 npm 包](https://docs.npmjs.com/getting-started/publishing-npm-packages)，并且在 [unpkg.com](https://unpkg.com/#/) 找到它并分发给你的用户。

***

> 原文：https://webpack.js.org/guides/author-libraries/
