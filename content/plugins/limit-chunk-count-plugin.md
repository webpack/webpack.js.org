---
title: LimitChunkCountPlugin
contributors:
  - rouzbeh84
---

当你在写代码的时候，你可能已经按需求添加了分割的代码块。当你写完代码的时候，你可能会注意到因为你的代码包含了太多太小的chunk产生了巨大的网络请求数。幸运的是， webpack 可以通过合并的方式获取你的 chunk。 webpack 提供了两个选项:

- 限制最大的 chunk 数量 `--optimize-max-chunks 15` 或者在 config 中添加 `new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})`
- 限制最小的 chunk 数量 `--optimize-min-chunk-size 10000` 或者在 config 中添加 `new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})`

webpack 会合并chunks(会优先合并重复的模块).由于不会合并到 entry chunk，所以不会影响页面初始化加载时间。

## Single-Page-App

Single-Page-App 是 webpack 设计的初衷和优化的对象。

你或许把你的 app 分割成了多块 chunks ，通过router的方式加载。The entry chunk 只包含 router 和 libraries ，不会包含实际内容。当你的用户通过导航浏览你的 app 的时候他可以很好的工作，但是页面初始化的时候需要两次加载:第一次是router，第二次是实际的页面内容。

如果你是通过 HTML5 的History API 在 URl 上来映射实际的页面内容
，你的服务器能知道那块内容是被客户端所请求的。为了减少加载次数你可以在响应中加入 chunk ：通过添加script标签这是可以办到的。浏览器会同时载入 chunk 。

``` html
<script src="entry-chunk.js" type="text/javascript" charset="utf-8"></script>
<script src="3.chunk.js" type="text/javascript" charset="utf-8"></script>
```

你可以从 stats 提取chunk文件，([stats-webpack-plugin](https://www.npmjs.com/package/stats-webpack-plugin)可以从 build stats 输出)

## Multi-Page-App

当你编译一个(真正)的多页 app ，想要在页面间分享共同的代码。事实上在 webpack 上非常容易:编译多个entry点:

`webpack p1=./page1 p2=./page2 p3=./page3 [name].entry-chunk.js`

``` javascript
module.exports = {
  entry: {
    p1: "./page1",
    p2: "./page2",
    p3: "./page3"
  },
  output: {
    filename: "[name].entry.chunk.js"
  }
}
```

这回生成多个入口 chunks: `p1.entry.chunk.js`, `p2.entry.chunk.js` 和 `p3.entry.chunk.js` 。 但是其余的 chunks 可以通过它们共享。

如果你的 chunks 有共同的模块,这里有些很酷的插件来完成。[`CommonsChunkPlugin`](./commons-chunk-plugin)识别共同的模块并且把他们放入一个共同的 chunk 里。你需要在你的页面上添加两个 script 标签，一个共同chunk和一个入口 chunk。

``` javascript
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: {
    p1: "./page1",
    p2: "./page2",
    p3: "./page3"
  },
  output: {
    filename: "[name].entry.chunk.js"
  },
  plugins: [
    new CommonsChunkPlugin("commons.chunk.js")
  ]
}
```

这回生成多个入口 chunks : `p1.entry.chunk.js`, `p2.entry.chunk.js` 和 `p3.entry.chunk.js`, 加上一个 `commons.chunk.js` 。首先载入 `commons.chunk.js` 然后是 `xx.entry.chunk.js`。

你可以生成多个公用的 chunks ,通过选择入口 chunks 来实现。并且你可以聚集这些共用 chunks 。

``` javascript
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: {
    p1: "./page1",
    p2: "./page2",
    p3: "./page3",
    ap1: "./admin/page1",
    ap2: "./admin/page2"
  },
  output: {
    filename: "[name].js"
  },
  plugins: [
    new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),
    new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
  ]
};
// <script>s required:
// page1.html: commons.js, p1.js
// page2.html: commons.js, p2.js
// page3.html: p3.js
// admin-page1.html: commons.js, admin-commons.js, ap1.js
// admin-page2.html: commons.js, admin-commons.js, ap2.js
```

高级提示: 你可以在你的共用 chunk 里运行下面的代码

``` javascript
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: {
    p1: "./page1",
    p2: "./page2",
    commons: "./entry-for-the-commons-chunk"
  },
  plugins: [
    new CommonsChunkPlugin("commons", "commons.js")
  ]
};
```
