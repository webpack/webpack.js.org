---
title: BannerPlugin
contributors:
  - simon04
related:
  - title: banner-plugin-hashing test
    url: https://github.com/webpack/webpack/blob/master/test/configCases/plugins/banner-plugin-hashing/webpack.config.js
---

为每个 chunk 文件头部添加 banner。

``` javascript
new webpack.BannerPlugin(banner)
// or
new webpack.BannerPlugin(options)
```


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


## 占位符(Placeholders)

从 webpack 2.5.0 开始，会对 `banner` 字符串中的占位符取值：

```javascript
new webpack.BannerPlugin({
  banner: "hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
})
```

***

> 原文：https://webpack.js.org/plugins/banner-plugin/