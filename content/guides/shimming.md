---
title: Shimming
sort: 13
contributors:
  - pksjce
  - jhnns
  - simon04
---

`webpack` 作为模块打包工具可以支持 ES2015 模块，根据 CommonJS 或者 AMD 规范编写的模块。但是很多时候，当使用第三方 library 的时候，可以看出我们还期望有一些全局依赖，比如对于大家都知道 `jquery` 的 `$`。这可能也会创建一些需要被导出的全局变量。在此，我们会看到通过不同的方式去帮助 webpack 支持这些**彼此割裂的模块**。


## 未压缩的 CommonJS/AMD 文件优先于 `dist` 打包版本。

多数模块会在 `package.json` 的 `main` 字段中链接到 library 的 `dist` 版本。虽然对多数开发者来说这是有用的，但对于 webpack 来说更好的方式是链接到 src 版本的别名上，因为这样 webpack 能够更好地优化依赖。然而多数情况下 `dist` 版本也能正常运行。

``` javascript
// webpack.config.js

module.exports = {
    ...
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};
```


## `ProvidePlugin`

[`ProvidePlugin`](/plugins/provide-plugin) 可以将模块作为一个变量，被 `webpack` 在其他每个模块中引用。只有你需要使用此变量的时候，这个模块才会被 require 进来。
多数之前遗留的模块，会依赖于已存在的某些特定全局变量，比如 jQuery 插件中的 `$` 或者 `jQuery`。在这种场景，你可以在每次遇到全局标识符 `$` 的时候，在 webpack 中预先设置 `var $ = require(“jquery”)`。

```javascript
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
```

此插件还能够通过使用以下格式，通过配置一个路径数组，提供导出某个模块：`[module, child, ...children?]`。

以下配置将正确从 TypeScript 的 `tslib` package 包中导入函数 `__assign`，并将其提供给调用之处。

```javascript
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      __assign: ['tslib', '__assign'],
      __extends: ['tslib', '__extends'],
    })
  ]
};
```


## `imports-loader`

[`imports-loader`](/loaders/imports-loader/)  在引用了之前的遗留模块中，插入必需的全局变量。
例如，某些遗留模块依赖于 `this` 作为 `window` 对象，而在 CommonJS 上下文中执行的 `this` 等同于 `module.exports`。在这种情况下，你可以使用 `imports-loader` 来替换重写 `this`。

__webpack.config.js__

```javascript
module.exports = {
  module: {
    rules: [{
      test: require.resolve("some-module"),
      use: 'imports-loader?this=>window'
    }]
  }
};
```

webpack 中的模块支持不同的[模块风格](/concepts/modules)，比如AMD, CommonJS 以及之前的遗留模块。然而，通常会先检查 `define`，然后使用一些比较怪异的代码来导出属性。在这些情况下，可以通过设置 `define = false`，有助于强制使用 CommonJS 路径：

__webpack.config.js__

```javascript
module.exports = {
  module: {
    rules: [{
      test: require.resolve("some-module"),
      use: 'imports-loader?define=>false'
    }]
  }
};
```


## `exports-loader`

比如说，一个 library 创建了一个全局变量，它期望使用者通过全局变量去使用；在这种情况下，我们能够使用 [`exports-loader`](/loaders/exports-loader/)，将全局变量导出为 CommonJS 格式。比如，为了将 `file` 导出为 `file` 以及将 `helpers.parse` 导出为 `parse`：

__webpack.config.js__

```javascript
module.exports = {
  module: {
    rules: [{
      test: require.resolve("some-module"),
      use: 'exports-loader?file,parse=helpers.parse'
      // 在文件的源码中加入以下代码
      //  exports["file"] = file;
      //  exports["parse"] = helpers.parse;
    }]
  }
};
```


## `script-loader`

[`script-loader`](/loaders/script-loader/) 在全局上下文中执行代码，如同你在 `script` 标签中加入代码。在这种模式下，普通的 library 都能够正常运行。访问 `require`, `module` 等变量则是 undefined。

W> 文件作为字符串添加到 bundle 中。它不会被 `webpack` 压缩，因此如果使用了一个压缩后的版本，没有开发工具支持调试此 loader 添加的 library。

假设你有一个 `legacy.js` 文件包含……

```javascript
GLOBAL_CONFIG = {};
```

...使用 `script-loader`...

```javascript
require('script-loader!legacy.js');
```

...基本上会生成：

```javascript
eval("GLOBAL_CONFIG = {};");
```


## `noParse` 选项

当模块没有 AMD/CommonJS 的版本时，并且你希望直接引入 `dist`版本，你可以将这个模块标记为 [`noParse`](/configuration/module/#module-noparse)。然后 `webpack` 将会直接引入这个模块并且不会解析它，这样可以用来改善构建时间。

W> 任何用到 AST 特性（比如 `ProvidePlugin`）都不会工作。

```javascript
module.exports = {
  module: {
    noParse: /jquery|backbone/
  }
};
```


## Node 内置

Node 内置（如 `process`），可以直接从配置文件(configuration file)进行正确的 polyfill，而无需使用任何专门的 loader 或插件。有关更多信息和示例，请查看[node 配置页面](/configuration/node)。

***

> 原文：https://webpack.js.org/guides/shimming/
