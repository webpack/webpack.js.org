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

Adds a banner to the top of each generated chunk.

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
