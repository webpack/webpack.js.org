---
title: BannerPlugin
contributors:
  - simon04
related:
  - title: banner-plugin-hashing test
    url: https://github.com/webpack/webpack/blob/master/test/configCases/plugins/banner-plugin-hashing/webpack.config.js

---

Adds a banner to the top of each generated chunk.

``` javascript
new webpack.BannerPlugin(banner)
// or
new webpack.BannerPlugin(options)
```


## Options

```javascript
{
  banner: string, // the banner as string, it will be wrapped in a comment
  raw: boolean, // if true, banner will not be wrapped in a comment
  entryOnly: boolean, // if true, the banner will only be added to the entry chunks
  test: string | RegExp | Array,
  include: string | RegExp | Array,
  exclude: string | RegExp | Array,
}
```


## Placeholders

Since webpack 2.5.0, placeholders are evaluated in the `banner` string:

```javascript
new webpack.BannerPlugin({
  banner: "hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
})
```
