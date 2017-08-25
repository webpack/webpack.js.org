---
title: LoaderOptionsPlugin
contributors:
  - johnnyreilly
  - skipjack
---

`loader-options-plugin` 和其他插件不同，它用于将 webpack 1 迁移至 webpack 2。在 webpack 2 中，对 `webpack.config.js` 的结构要求变得更加严格；不再开放扩展给其他的 loader/插件。webpack 2 推荐的使用方式是直接传递 `options` 给 loader/插件（换句话说，`配置选项`将**不是**全局/共享的）。

不过，在某个 loader 升级为依靠直接传递给它的配置选项运行之前，可以使用 `loader-options-plugin` 来抹平差异。你可以通过这个插件配置全局/共享的 loader 配置，使所有的 loader 都能收到这些配置。

``` js
new webpack.LoaderOptionsPlugin({
  // Options...
})
```

W> 将来这个插件可能会被移除，因为它只是用于迁移。


## 选项

此插件支持以下选项：

* `options.debug` (`boolean`)：loader 是否为 `debug` 模式。`debug` 在 webpack 3 中将被移除。
* `options.minimize` (`boolean`)：loader 是否要切换到优化模式。
* `options.options` (`object`)：一个配置对象，用来配置旧的 loader - 将使用和 `webpack.config.js` 相同的结构。
* `options.options.context` (`string`)：配置 loader 时使用的上下文。
* 任何其他选项和在 `webpack.config.js` 中一样……


## 用法

关于此插件可能的用法，这里有个示例：

```javascript
new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  options: {
    context: __dirname
  }
})
```

***

> 原文：https://webpack.js.org/plugins/loader-options-plugin/
