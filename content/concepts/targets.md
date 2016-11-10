---
title: 部署目标
contributors:
  - TheLarkInn
  - dear-lizhihua
---

因为服务器和浏览器代码都可以用 JavaScript 编写，所以 webpack 提供了多种部署_目标(target)_，你可以在你的 webpack [配置](/configuration)中设置。

W> webpack `target` 属性不要和 `output.libraryTarget` 属性混淆。有关 `output` 属性的更多信息，请查看[我们的指南](/concepts/output)。

## 用法

要设置 `target` 属性，只需要在你的 webpack 配置中设置 target 的值。

**webpack.config.js**

```javascript
const config = {
  target: 'node'
};

module.exports = config;
```

## 选项

以下是可以传递给 `target` 属性的值的列表。

* `"async-node"` Compile for usage in a Node.js-like environment (use `fs` and `vm` to load chunks async)
* `"electron-main"` Compile for electron renderer process, provide a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environment and `NodeTargetPlugin` and `ExternalsPlugin` for commonjs and electron bulit-in modules. *Note: need `webpack` >= 1.12.15.
* `"node"` Compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks)
* `"node-webkit"` Compile for usage in webkit, uses jsonp chunk loading but also supports build in Node.js modules plus require("nw.gui") (experimental)
* `"web"` Compile for usage in a browser-like environment (default)
* `"webworker"` Compile as WebWorker
* `"async-node"` 编译为 类 node.js(node.js-like) 环境可用（使用 `fs` 和 `vm` 加载异步块）
* `"electron-main"` Compile for electron renderer process, provide a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environment and `NodeTargetPlugin` and `ExternalsPlugin` for commonjs and electron bulit-in modules. *注意: 需要 `webpack` >= 1.12.15。
* `"node"` 编译为 类 node.js(node.js-like) 环境可用（使用 `require` 加载块）
* `"node-webkit"` 编译为 webkit 可用，使用 jsonp 分块加载，但也支持在 node.js 模块构建添加 require("nw.gui") （实验性质）
* `"web"` 编译为 类浏览器(browser-like) 环境可用（默认）
* `"webworker"` 当作 WebWorker 编译

每个_target_都有各种部署/环境特定的附加项，以支持满足其需求。

例如，当你的使用 _target_ 是 `electron-main`，*webpack* 包含多个 `electron-main` 特定的变量。有关使用哪些模板和 _externals_ 的更多信息，您可以直接参考 [webpack 源码](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L70-L185)。

?> We should expand on this further. What specifically is included.

## 多个目标

尽管 webpack 不支持向 `target` 传入多个字符串，你可以通过打包两份分离的配置来创建同构的库：

**webpack.config.js**

```javascript
var serverConfig = {
  target: 'node',
  output: {
    path: 'dist',
    filename: 'lib.node.js'
  }
  //…
};

var clientConfig = {
  target: 'web', // <=== 默认是 'web'，可省略
  output: {
    path: 'dist',
    filename: 'lib.js'
  }
  //…
};

module.exports = [ serverConfig, clientConfig ];
```

上面的例子将在你的 `dist` 文件夹下创建 `lib.js` 和 `lib.node.js` 文件。

## 资源

从上面的选项可以看出有多个不同的部署_目标_可供选择。下面是一个示例列表，以及你可以参考的资源。

### 打包输出比较

  **[compare-webpack-target-bundles](https://github.com/TheLarkInn/compare-webpack-target-bundles)**：大量有关「测试和查看不同的 webpack _目标_」的资源。也有大量 bug 报告。

?> Need to find up to date examples of these webpack targets being used in live code or boilerplates.

***

> 原文：https://webpack.js.org/concepts/targets/