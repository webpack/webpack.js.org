---
title: HotModuleReplacementPlugin
contributors:
  - skipjack
  - byzyk
  - chenxsan
related:
  - title: Concepts - Hot Module Replacement
    url: /concepts/hot-module-replacement
  - title: API - Hot Module Replacement
    url: /api/hot-module-replacement
---

 [Hot Module Replacement](/concepts/hot-module-replacement)，除此之外还被称为 HMR。

W> HMR **绝对不能**被用在生产环境。


## 基本使用 {#basic-usage}

启用 HMR 很容易，且在大多数情况下不需要任何配置。

``` javascript
new webpack.HotModuleReplacementPlugin({
  // Options...
});
```


## 配置选项 {#options}

可接收以下配置选项：

- `multiStep` (boolean): 为 `true`，插件会分两步构建 —— 首先编译热更新 chunk，然后保留普通资源(normal assets)。
- `fullBuildTimeout` (number): 用于当 `multiStep` 启用时，定义两个步骤之间的延迟时间。

W> 这些选项是实验性的并且可能会被弃用。就像上面说的，它们并非必须，正常情况下只需要 `new webpack.HotModuleReplacementPlugin()` 就足够了。
