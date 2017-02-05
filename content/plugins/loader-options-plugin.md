---
title: LoaderOptionsPlugin
contributors:
    - johnnyreilly
---

?> 需要 Review

`LoaderOptionsPlugin` 和其他插件不同。它的用途是帮助人们从 webpack 1 迁移至 webpack 2。在 webpack 2 中对 `webpack.config.js` 的结构要求变得更加严格；不再开放扩展给其他的加载器/插件。webpack 2 推荐的使用方式是直接传递 `options` 给加载器/插件。换句话说，配置选项将**不是**全局/共享的。

不过，在某个加载器升级为依靠直接传递给它的配置选项运行之前，可以使用 `LoaderOptionsPlugin` 来抹平差异。你可以通过这个插件配置全局/共享的加载器配置，使所有的加载器都能收到这些配置。

在将来这个插件可能会被移除。

## 配置

```javascript
new webpack.LoaderOptionsPlugin(options)
```

* `options.debug` (`boolean`)：加载器是否为 `debug` 模式。`debug` 在 webpack 3 中将被移除。
* `options.minimize` (`boolean`)：加载器是否要切换到优化模式。
* `options.options` (`object`)：一个配置对象，用来配置旧的加载器 - 将使用和 `webpack.config.js` 相同的结构。

* `options.options.context` (`string`)：配置加载器时使用的上下文。
* 其他选项和在 `webpack.config.js` 中一样……

## 示例

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
