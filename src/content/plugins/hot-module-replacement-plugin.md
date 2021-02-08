---
title: HotModuleReplacementPlugin
contributors:
  - skipjack
  - byzyk
  - chenxsan
  - snitin315
related:
  - title: Concepts - Hot Module Replacement
    url: /concepts/hot-module-replacement
  - title: API - Hot Module Replacement
    url: /api/hot-module-replacement
---

 [Hot Module Replacement](/concepts/hot-module-replacement)，除此之外还被称为 HMR。

<<<<<<< HEAD
W> HMR **绝对不能**被用在生产环境。

=======
W> HMR should **never** be used in production.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## 基本使用 {#basic-usage}

启用 HMR 很容易，且在大多数情况下不需要任何配置。

```javascript
new webpack.HotModuleReplacementPlugin({
  // Options...
});
```
