---
title: Shimming
sort: 17
contributors:
  - pksjce
  - jhnns
  - simon04
---

`webpack`作为模块打包工具可以支持使用ES2015模块，CommonJS或者AMD编写的模块。但是很多时候，当使用第三方的库的时候，我们可以看出还需要一些依赖比如对于`jqueray`的全局别名`$`。它们也可能产生其它需要被导出的全局变量。在此，我们一起来看一下帮助webpack理解这些**不完整的模块**的方式。

## 相对于打包的`dist`版本优先未压缩的CommonJS/AMD文件。

大多数模块在它们的`package.json`中的`main`区链接`dist`版本。尽管这对大多数开发者是有用的，对于webpack最好是链接到源代码版本，因为这样webpack能够更好地优化依赖。然而大多数情况下`dist`也能够运行正常。

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

## `provide-plugin`
[`provide-plugin`](/plugins/provide-plugin)可以让模块作为一个变量被`webpack`在别的模块中引用。只有你需要使用这个变量的时候这个模块才会被引用。

大多数遗留的模块依赖于某些特定的全局变量，比如jQuery plugins对于`$`或者`jQuery`。在这样的情形下，你可以在webpack中预先设置`var $ = require(“jquery”)`在每次遇到全局标识符`$`的时候。

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

## `imports-loader`

[`imports-loader`](/loaders/imports-loader/) 在引入的遗留模块中插入必要的全局变量。

比如，某些遗留模块依赖于作为`window`对象的`this`。当这个模块在CommonJS环境中执行就会产生问题，因为在这个环境中`this`就是`module.exports`。在这种情况下你可以通过使用`imports-loader`来重写`this`。

**webpack.config.js**
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

webpack中的模块支持不同的[模块风格](/concepts/modules)，比如AMD, CommonJS以及遗留模块。然而，通常它们会首先检查`define`，然后使用某种怪异的代码来导出属性。在这些情况下，你可以通过设置`define = false`来强制使用CommonJS路径：

**webpack.config.js**
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

假设库产生一个全局变量，它就希望它的用户来使用它。在这种情况下，我们可以使用[`exports-loader`](/loaders/exports-loader/)以CommonJS格式来导出全局变量。比如为了将`file`导出成`file`以及将`helpers.parse`导出成`parse`：

**webpack.config.js**
```javascript
module.exports = {
  module: {
    rules: [{
      test: require.resolve("some-module"), 
      use: 'exports-loader?file,parse=helpers.parse'
      // 在文件的源头中加入以下代码
      //  exports["file"] = file;
      //  exports["parse"] = helpers.parse;
    }]
  }
};
```

## `script-loader`

[script-loader](/loaders/script-loader/) 在全局环境中执行代码，就像你在`script`标签中加入代码。在这种模式下一般的库都能够运行。require, module等等是未定义的。

W>这个文件是作为字符串加入到打包文件中。它不会被`webpack`压缩，因此使用一个压缩的版本。也没有其他的开发工具可以支持通过这个加载器添加的库。

假设你有一个`legacy.js`文件包含...

```javascript
GLOBAL_CONFIG = {};
```

...使用`scrupt-loader`...

```javascript
require('script-loader!legacy.js');
```

...基本上产生：

```javascript
eval("GLOBAL_CONFIG = {};");
```

## `noParse` 选项 

当这个模块没有AMD或者CommonJS版本的时候，并且你希望包括`dist`，你可以将这个模块标志成 [`noParse`](/configuration/module/#module-noparse)。然后`webpack`将会直接包括这个模块并且不会解析它，这样可以用于减少构建时间。

W>任何需要引入AST的特性都不会工作，比如`ProvidePlugin`。

```javascript
module.exports = {
  module: {
    noParse: /jquery|backbone/
  }
};
```

***

> 原文：https://webpack.js.org/guides/shimming/