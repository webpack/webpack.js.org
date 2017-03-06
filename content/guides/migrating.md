---
title: 从 v1 迁移到 v2
sort: 20
contributors:
  - sokra
  - jhnns
  - grgur
  - domfarolino
  - johnnyreilly
  - jouni-kantola
  - frederikprijck
  - chrisVillanueva
  - bebraw
  - howdy39
---

## `resolve.root`, `resolve.fallback`, `resolve.modulesDirectories`

上述配置项被一个单独的配置项 `resolve.modules` 取代。详见 [resolving](/configuration/resolve)。

``` diff
  resolve: {
-   root: path.join(__dirname, "src")
+   modules: [
+     path.join(__dirname, "src"),
+     "node_modules"
+   ]
  }
```

## `resolve.extensions`

此配置项不再需要传一个空字符串。此行为被迁移到 `resolve.enforceExtension`。详见 [resolving](/configuration/resolve)。

## `resolve.*`

还有更多的变化，由于不常用，不在这里详细列出。详见 [resolving](/configuration/resolve)。

## `module.loaders` 改成了 `module.rules`

旧的 loader 配置被更强大的 rules 系统取代，后者允许配置 loader 以及其他更多项。为了兼容旧版，`module.loaders` 语法被保留，旧的属性名依然可以被解析。新的命名约定更易于理解并且是升级配置使用 `module.rules` 的好理由。

``` diff
  module: {
-   loaders: [
+   rules: [
      {
        test: /\.css$/,
-       loaders: [
-         "style-loader",
-         "css-loader?modules=true"
+       use: [
+         {
+           loader: "style-loader"
+         },
+         {
+           loader: "css-loader",
+           options: {
+             modules: true
+           }
+         }
        ]
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader", // Do not use "use" here
        options: {
          // ...
        }
      }
    ]
  }
```

## 链式 loaders

与 v1 版本相同，loaders 可以链式调用，上一个 loader 的输出被作为输入传给下一个 loader。使用 [rule.use](/configuration/module#rule-use) 配置项，`use` 可以设置为一个 loaders 的数组列表。在 v1 版本中，loaders 通常被用 `!` 连写。这一写法在新版中只在使用旧的 `module.loaders` 时有效。

``` diff
  module: {
-   loaders: {
+   rules: [{
      test: /\.less$/,
-     loader: "style-loader!css-loader!less-loader"
+     use: [
+       "style-loader",
+       "css-loader",
+       "less-loader"
+     ]
    }]
  }
```

## 取消了在模块名中自动添加 `-loader`  后缀

现在在指定 loader 的时候不能再省略 -loader 后缀了:

``` diff
  module: {
    rules: [
      {
        use: [
-         "style",
+         "style-loader",
-         "css",
+         "css-loader",
-         "less",
+         "less-loader",
        ]
      }
    ]
  }
```

你仍然可以启用这一旧行为，方法是通过配置 `resolveLoader.moduleExtensions` 项，但是我们不推荐这么做。

``` diff
+ resolveLoader: {
+   moduleExtensions: ["-loader"]
+ }
```

了解这一改变背后的原因，请参阅 [#2986](https://github.com/webpack/webpack/issues/2986)。

## `json-loader` 不再需要手动添加

如果没有为 JSON 文件配置 loader，webpack 将自动尝试通过 加载 [`json-loader`](https://github.com/webpack/json-loader) JSON 文件。

``` diff
  module: {
    rules: [
-     {
-       test: /\.json/,
-       loader: "json-loader"
-     }
    ]
  }
```

[我们决定这么做](https://github.com/webpack/webpack/issues/3363) 以消除 webpack、 node.js 和 browserify 之间的环境差异。

## loader 默认的 resolve 配置是相对于 context 的

在 webpack 1 中，loader 默认配置下 resolve 相对于被匹配的文件。而在 webpack 2 中默认配置的 resolve 相对于 `context` 配置项。

这解决了一些问题，比如使用 `npm link` 或引用 `context` 之外的模块时导致重复载入。

你可以不再需要使用一些变通方案了：

``` diff
  module: {
    rules: [
      {
        // ...
-       loader: require.resolve("my-loader")
+       loader: "my-loader"
      }
    ]
  },
  resolveLoader: {
-   root: path.resolve(__dirname, "node_modules")
  }
```

## 取消了 `module.preLoaders` 以及 `module.postLoaders`

``` diff
  module: {
-   preLoaders: [
+   rules: [
      {
        test: /\.js$/,
+       enforce: "pre",
        loader: "eslint-loader"
      }
    ]
  }
```

## `UglifyJsPlugin` sourceMap

`UglifyJsPlugin` 的 `sourceMap` 配置项现在默认为 `false` 而不是 `true`。
这意味着如果你在压缩代码时启用了 source map，或者想要让 uglifyjs 的警告能够对应到正确的代码行，你需要将 `UglifyJsPlugin` 的 `sourceMap` 设为 `true`。

``` diff
  devtool: "source-map",
  plugins: [
    new UglifyJsPlugin({
+     sourceMap: true
    })
  ]
```

## `UglifyJsPlugin` warnings

`UglifyJsPlugin` 的 `compress.warnings` 配置项现在默认为 `false` 而不是 `true`。
这意味着如果你想要看到 uglifyjs 的警告信息，你需要将 `compress.warnings` 设为 `true`。

``` diff
  devtool: "source-map",
  plugins: [
    new UglifyJsPlugin({
+     compress: {
+       warnings: true
+     }
    })
  ]
```

## `UglifyJsPlugin` 压缩 loaders

`UglifyJsPlugin` 不再压缩 loaders。在未来很长一段时间里，需要通过设置 `minimize:true` 来压缩 loaders。参考 loader 文档里的相关配置项。

loaders 的压缩模式将在 webpack 3 或更高的版本中被取消。

为了兼容旧的 loaders，loaders 可以通过插件来切换到压缩模式：

``` diff
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     minimize: true
+   })
  ]
```

## `DedupePlugin` 被移除

不再需要 `webpack.optimize.DedupePlugin`。请从配置中移除。

## `BannerPlugin` - 破坏性改动

`BannerPlugin` 不在接受两个参数而是只接受单独的 options 对象。

``` diff
  plugins: [
-    new webpack.BannerPlugin('Banner', {raw: true, entryOnly: true});
+    new webpack.BannerPlugin({banner: 'Banner', raw: true, entryOnly: true});
  ]
```

## `OccurrenceOrderPlugin` 被默认加载

我们不再需要在配置里指定它：

``` diff
  plugins: [
-   new webpack.optimize.OccurrenceOrderPlugin()
  ]
```

## `ExtractTextWebpackPlugin` - 大改变

[ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) 需要使用版本2，才能在 webpack 2 下正常运行。

`npm install --save-dev extract-text-webpack-plugin@beta`

这一插件的配置变化主要体现在语法上。

### `ExtractTextPlugin.extract`

```diff
module: {
  rules: [
    {
      test: /.css$/,
-      loader: ExtractTextPlugin.extract("style-loader", "css-loader", { publicPath: "/dist" })
+      use: ExtractTextPlugin.extract({
+        fallback: "style-loader",
+        use: "css-loader",
+        publicPath: "/dist"
+      })
    }
  ]
}
```

### `new ExtractTextPlugin({options})`

```diff
plugins: [
-  new ExtractTextPlugin("bundle.css", { allChunks: true, disable: false })
+  new ExtractTextPlugin({
+    filename: "bundle.css",
+    disable: false,
+    allChunks: true
+  })
]
```

## 全动态 requires 现在默认会失败

只有一个表达式的依赖（例如 `require(expr)`）将创建一个空的 context 而不是一个完整目录的 context。

如果有上面那样的代码，最好把它重构了，因为在 ES2015 模块下它不可以用。如果你确定不会有 ES2015 模块，你可以使用 `ContextReplacementPlugin` 来提示编译器进行正确的处理。

?> 此处欠一篇关于动态依赖的文章。

### 在 CLI 和配置中使用自定义参数

如果你之前滥用 CLI 来传自定义参数到配置中，比如：

`webpack --custom-stuff`

``` js
// webpack.config.js
var customStuff = process.argv.indexOf("--custom-stuff") >= 0;
/* ... */
module.exports = config;
```

你将会发现新版中不再允许这么做。CLI 现在更加严格了。

替代地，现在提供了一个接口来传递参数给配置。我们应该采用这种新方式，在未来许多工具将可能依赖它。

`webpack --env.customStuff`

``` js
module.exports = function(env) {
  var customStuff = env.customStuff;
  /* ... */
  return config;
};
```

详见 [CLI](/api/cli)。

## `require.ensure` 以及 AMD `require` 将采用异步式调用

现在这些函数总是异步的，而不是当 chunk 已经加载过的时候同步调用它们的 callback。

**注意 `require.ensure` 现在依赖于原生的 `Promise`。如果在不支持 Promise 的环境里使用 `require.ensure`，你需要添加 polyfill。**

## 通过 `options` 配置 loader

你不能再通过 `webpack.config.js` 的自定义属性来配置 loader。只能通过 `options` 来配置。下面配置的 `ts` 属性在 webpack 2 下不再有效：

```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  // does not work with webpack 2
  ts: { transpileOnly: false }
}
```

### 什么是 `options`?

好问题。严格来说，有两种办法，都可以用来配置 webpack 的 loader。典型的 `options` 被称为 `query`，是一个可以被添加到 loader 名之后的字符串。它比较像一个 query string，但是实际上有[更强大的能力](https://github.com/webpack/loader-utils#parsequery)：

```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader?' + JSON.stringify({ transpileOnly: false })
    }]
  }
}
```

不过它也可以分开来，写成一个单独的对象，紧跟在 loader 属性后面：

```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options:  { transpileOnly: false }
    }]
  }
}
```

## `LoaderOptionsPlugin` context

有的 loader 需要从配置中读取一些 context 信息。在未来很长一段时间里，这将需要通过 loader options 传入。详见 loader 文档的相关选项。

为了保持对旧 loaders 的兼容，这些信息可以通过插件传进来：

``` diff
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     options: {
+       context: __dirname
+     }
+   })
  ]
```

## `debug`

在 webpack 1 中 `debug` 配置项切换 loaders 到 debug 模式。在未来很长一段时间里，这将需要通过 loader 配置项传递。详见 loader 文档的相关选项。

loaders 的 debug 模式将在 webpack 3 或后续版本中取消。

为了保持对旧 loaders 的兼容，loader 可以通过插件来切换到 debug 模式：

``` diff
- debug: true,
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     debug: true
+   })
  ]
```

## ES2015 的代码分割

在 webpack v1 中，你能使用 [`require.ensure`](/guides/code-splitting-require) 作为方法来懒加载 chunks 到你的应用中：

```javascript
require.ensure([], function(require) {
  var foo = require("./module");
});
```

ES2015 模块加载规范定义了 [`import()`](/guides/code-splitting-import) 方法来运行时动态地加载 ES2015 模块。

webpack 将 `import()` 作为分割点并将被请求的模块放到一个单独的 chunk 中。
`import()` 接收模块名作为参数，并返回一个 Promise。

``` js
function onClick() {
  import("./module").then(module => {
    return module.default;
  }).catch(err => {
    console.log("Chunk loading failed");
  });
}
```

好消息是：如果加载 chunk 失败，我们可以进行处理，因为现在它基于 `Promise`。

警告：`require.ensure` 允许用可选的第三个参数为 chunk 简单命名，但是 `import` API 还未提供这个能力。如果你想要保留这个功能，你可以继续使用 `require.ensure`。

```javascript
require.ensure([], function(require) {
  var foo = require("./module");
}, "custom-chunk-name");
```

## 动态表达式

可以传递部分表达式给 `import()`。这与 CommonJS 对表达式的处理方式一致（webpack 为所有可能匹配的文件创建 context）。

`import()` 为每一个可能的模块创建独立的 chunk。

``` js
function route(path, query) {
  return import(`./routes/${path}/route`)
    .then(route => new route.Route(query));
}
// 上面代码为每个可能的路由创建独立的 chunk
```

## 混合使用 ES2015、AMD 和 CommonJS

你可以自由混合使用三种模块类型（甚至在同一个文件中）。在这个情况中 webpack 的行为和 babel 以及 node-eps 一致：

```javascript
// CommonJS consuming ES2015 Module
var book = require("./book");

book.currentPage;
book.readPage();
book.default === "This is a book";
```

```javascript
// ES2015 Module consuming CommonJS
import fs from "fs"; // module.exports map to default
import { readFileSync } from "fs"; // named exports are read from returned object+

typeof fs.readFileSync === "function";
typeof readFileSync === "function";
```

值得注意的是，你需要让 Babel 不解析这些模块符号，从而让 webpack 可以使用它们。你可以通过设置如下配置到 .babelrc 或 babel-loader 来实现这一点。

**.babelrc**

```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ]
}
```

## Hints

不需要改变什么，但有机会改变。

### 模板字符串

webpack 现在支持表达式中的模板字符串了。这意味着你可以在 webpack 构建中使用它们：

``` diff
- require("./templates/" + name);
+ require(`./templates/${name}`);
```

### 配置中使用 Promise

webpack 现在支持在配置文件中返回 `Promise` 了。这让你能在配置文件中做异步处理。

**webpack.config.js**

``` js
module.exports = function() {
  return fetchLangs().then(lang => ({
    entry: "...",
    // ...
    plugins: [
      new DefinePlugin({ LANGUAGE: lang })
    ]
  }));
};
```

### 高级 loader 匹配

webpack 现在支持对 loader 进行更多方式的匹配。

``` js
module: {
  rules: [
    {
      resource: /filename/, // matches "/path/filename.js"
      resourceQuery: /querystring/, // matches "/filename.js?querystring"
      issuer: /filename/, // matches "/path/something.js" if requested from "/path/filename.js"
    }
  ]
}
```

### 更多的 CLI 参数项

你可以使用一些新的 CLI 参数项：

`--define process.env.NODE_ENV="production"` 见 [`DefinePlugin`](/plugins/define-plugin/)。

`--display-depth` 显示每个模块到入口的距离。

`--display-used-exports` 显示一个模块中被使用的 exports 信息。

`--display-max-modules` 设置输出时显示的模块数量（默认是 15）。

`-p` 能够定义 `process.env.NODE_ENV` 为 `"production"`。

## Loader 变化

仅与 loader 作者有关的改变。

### Cacheable

Loaders 现在默认可被缓存。Loaders 如果不想被缓存，需要选择不被缓存。

``` diff
  // Cacheable loader
  module.exports = function(source) {
-   this.cacheable();
    return source;
  }
```

``` diff
  // Not cacheable loader
  module.exports = function(source) {
+   this.cacheable(false);
    return source;
  }
```

### 复合 options

webpack 1 只支持能够 `JSON.stringify` 的对象作为配置项。webpack 2 现在支持任意 JS 对象作为 loader 配置项。

使用复合 options 只有一个附加条件。你需要在 options 对象上添加一个 `ident`，让它能够被其他 loader 引用。

options 对象上有了 `ident` ，内联的 loader 就可以引用这个 options 对象。下面是个例子：

`require("some-loader??by-ident!resource")`

``` js
{
  test: /.../,
  loader: "...",
  options: {
    ident: "by-ident",
    magic: () => return Math.random()
  }
}
```

这种内联风格在常规的代码里一般用不着，但是在 loader 生成的代码里比较常见。比如，`style-loader` 生成一个模块，通过 `require` 加载其余的请求（它们输出 CSS）。

``` js
// style-loader generated code (simplified)
var addStyle = require("./add-style");
var css = require("-!css-loader?{"modules":true}!postcss-loader??postcss-ident");

addStyle(css);
```

所以如果你使用复合 options，告诉你的用户你使用的 `ident`。

***

> 原文：https://webpack.js.org/guides/migrating/