---
title: 模块热替换插件(HotModuleReplacementPlugin)
contributors:
  - skipjack
related:
  - title: Concepts - Hot Module Replacement
    url: /concepts/hot-module-replacement
  - title: API - Hot Module Replacement
    url: /api/hot-module-replacement
---

启用[热替换模块(Hot Module Replacement)](/concepts/hot-module-replacement)，也被称为 HMR。

W> __永远不要__在生产环境(production)下启用 HMR


## 基本用法(Basic Usage)

启用 HMR 非常简单，在大多数情况下也不需要设置选项。

``` javascript
new webpack.HotModuleReplacementPlugin({
  // Options...
})
```


## 选项(Options)

包含如下选项：

- `multiStep` (boolean)：设置为 `true` 时，插件会分成两步构建文件。首先编译热加载 chunks，之后再编译剩余的通常的资源。
- `fullBuildTimeout` (number)：当 `multiStep` 启用时，表示两步构建之间的延时。
- `requestTimeout` (number)：下载 manifest 的延时（webpack 3.0.0 后的版本支持）。

W> 这些选项属于实验性内容，因此以后可能会被弃用。就如同上文所说的那样，这些选项通常情况下都是没有必要设置的，仅仅是设置一下 `new webpack.HotModuleReplacementPlugin()` 在大部分情况下就足够了。
