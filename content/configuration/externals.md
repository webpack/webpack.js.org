---
title: 外部扩展(Externals)
sort: 13
contributors:
  - sokra
  - skipjack
  - pksjce
---

`externals` 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 __library 开发人员__来说是最有用的，然而也会有各种各样的应用程序用到它。

T> __用户(consumer)__，在这里是指，引用了「使用 webpack 打包的 library」 的任何终端用户的应用程序(end user application)。


## `externals`

`string` `array` `object` `function`  `regex`

__防止__将某些 `import` 的包(package)__打包__到 bundle 中，而是在运行时(runtime)再去从外部获取这些*扩展依赖(external dependencies)*。

例如，从 CDN 引入 [jQuery](https://jquery.com/)，而不是把它打包：

**index.html**

```html
...
<script src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"></script>
...
```

**webpack.config.js**

```javascript
externals: {
  jquery: 'jQuery'
}
```

这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：

```javascript
import $ from 'jquery';

$('.my-element').animate(...);
```

具有外部依赖(external dependency)的 bundle 可以在各种模块上下文(module context)中使用，例如 [CommonJS, AMD, 全局变量和 ES2015 模块](/concepts/modules)。外部 library 可能是以下任何一种形式：

* __root__ - 外部 library 能够作为全局变量使用。用户可以通过在 script 标签中引入来实现。这是 externals 的默认设置。
* __commonjs__ - 用户(consumer)应用程序可能使用 CommonJS 模块系统，因此外部 library 应该使用 CommonJS 模块系统，并且应该是一个 CommonJS 模块。
* __commonjs2__ - 类似上面几行，但导出的是 `module.exports.default`。
* __amd__ - 类似上面几行，但使用 AMD 模块系统。

`externals` 接受各种语法，并且按照不同方式去解释他们。


### string

externals 中的 `jQuery`，表示你的 bundle 需要访问全局形式的 `jQuery` 变量。


### array

```javascript
externals: {
  subtract: ['./math', 'subtract']
}
```

`subtract: ['./math', 'subtract']` 转换为父子结构，其中 `./math` 是父模块，而 bundle 只引用 `subtract` 变量下的子集。


### object

```javascript
externals : {
  react: 'react'
}

// 或者

externals : {
  lodash : {
    commonjs: "lodash",
    amd: "lodash",
    root: "_" // indicates global variable
  }
}

// or

externals : {
  subtract : {
    root: ["math", "subtract"]
  }
}
```

此语法用于描述所有外部 library 可用的访问方式。这里 `lodash` 这个外部 library 可以在 AMD 和 CommonJS 模块系统中通过 `lodash` 访问，但在全局变量形式下用 `_` 访问。`subtract` 可以通过全局 `math` 对象下的属性 `subtract` 访问（例如 `window['math']['subtract']`）。


### function

It might be useful to define your own function to control the behavior of what you want to externalize from webpack. [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals), for example, excludes all modules from the node_modules and provides some options to, for example, whitelist packages.

It basically comes down to this:

```javascript
externals: [
  function(context, request, callback) {
    if (/^yourregex$/.test(request)){
      return callback(null, 'commonjs ' + request);
    }
    callback();
  }
],
```

The `'commonjs ' + request` defines the type of module that needs to be externalized.


### regex

Every dependency that matches the given regular expression will be excluded from the output bundles.

```javascript
externals: /^(jquery|\$)$/i
```

In this case any dependency named `jQuery`, capitalized or not, or `$` would be externalized.


关于如何使用此 externals 配置的更多信息，请参考[如何编写 library](/guides/author-libraries)。

***

> 原文：https://webpack.js.org/configuration/externals/
