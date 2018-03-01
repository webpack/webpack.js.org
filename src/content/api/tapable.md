---
title: Tapable
group: Plugins
sort: 1
contributors:
  - thelarkinn
  - pksjce
  - e-cloud
---

[Tapable](https://github.com/webpack/tapable) 是一个小型的库，允许你对一个 javascript 模块添加和应用插件。它可以被继承或混入到其他模块中。类似于 NodeJS 的 `EventEmitter` 类，专注于自定义事件的触发和处理。除此之外，`Tapable` 还允许你通过回调函数的参数，访问事件的“触发者(emittee)”或“提供者(producer)”。

`Tapable` 有四组成员函数：

- `plugin(name:string, handler:function)`：允许将一个自定义插件注册到 **Tapable 实例** 的事件中。它的行为和 `EventEmitter` 的 `on()` 方法相似，用来注册一个处理函数/监听器，来在信号/事件发生时做一些事情。
- `apply(…pluginInstances: (AnyPlugin|function)[])`：`AnyPlugin` 应该是一个拥有 `apply` 方法的类（也可以是一个对象，但是不常见），或者只是一个包含注册代码的函数。这个方法只**调用**插件的定义，从而将真正的事件监听器可以注册到 _Tapable_ 实例的注册列表中。
- `applyPlugins*(name:string, …)`：_Tapable_ 实例可以通过使用这些函数，在指定的 hash 下应用所有的插件。这一组方法的行为和 `EventEmitter` 的 `emit()` 方法相似，使用多种策略细致地控制事件的触发。
- `mixin(pt: Object)`：一个简单地方法，使用混入而不是继承的方式扩展 `Tapable` 的原型。

不同的 `applyPlugins*` 方法覆盖了以下使用场景：

- 连续地执行插件。
- 并行地执行插件。
- 一个接一个地执行插件，从前面的插件（瀑布流）获取输入。
- 异步地执行插件。
- 在允许时停止执行插件：也就是说，一旦一个插件返回了一个非 `undefined` 值，跳出执行流，返回_这个插件的返回值_。听起来像是 `EventEmitter` 的 `once()` 方法，但是完全不同。


## 示例

webpack 中的 _Tapable_ 实例之一，[Compiler](/api/compiler)，负责编译 webpack 配置对象并返回一个 [Compilation](/api/compilation) 实例。而 Compilation 实例执行时，会创建所需的 bundles。

接下来看一个简化版本的 `Tapable` 的使用方式：

__node_modules/webpack/lib/Compiler.js__

``` js
var Tapable = require("tapable");

function Compiler() {
	Tapable.call(this);
}

Compiler.prototype = Object.create(Tapable.prototype);
```

现在在这个 compiler 上写一个插件，

__my-custom-plugin.js__

``` js
function CustomPlugin() {}
CustomPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', pluginFunction);
}
```

compiler 会在生命周期中适当的时机执行这个插件

__node_modules/webpack/lib/Compiler.js__

``` js
this.apply*("emit",options) // 将获取 'emit' 名称下的所有插件并运行它们。
```

***

> 原文：https://webpack.js.org/api/tapable/
