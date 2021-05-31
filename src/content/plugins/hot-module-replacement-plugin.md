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
translators:
  - yolilufei
  - QC-L
---

 [Hot Module Replacement](/concepts/hot-module-replacement)，除此之外还被称为 HMR。

W> HMR **绝对不能**被用在生产环境。

## 基本使用 {#basic-usage}

<<<<<<< HEAD
启用 HMR 很容易，且在大多数情况下不需要任何配置。
=======
Enabling HMR is straightforward and in most cases no options are necessary.
>>>>>>> b2b1b5d42c04cdccdc522c97cb2f4604e898a382

```javascript
new webpack.HotModuleReplacementPlugin({
  // Options...
});
```
