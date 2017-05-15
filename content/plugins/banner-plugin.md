---
title: BannerPlugin
contributors:
  - simon04
---

``` javascript
new webpack.BannerPlugin(banner)
// or
new webpack.BannerPlugin(options)
```

为每个 chunk 文件头部添加 banner。

## 选项

```javascript
{
  banner: string, // 其值为字符串，将作为注释存在
  raw: boolean, // 如果值为 true，将直出，不会被作为注释
  entryOnly: boolean, // 如果值为 true，将只在入口 chunks 文件中添加
  test: string | RegExp | Array,
  include: string | RegExp | Array,
  exclude: string | RegExp | Array,
}
```

***

> 原文：https://webpack.js.org/plugins/banner-plugin/