---
title: LimitChunkCountPlugin
contributors:
  - rouzbeh84
---

当你在编写代码时，你可能已经添加了许多代码块分离点(code split points)来实现按需加载(load stuff on demand)。在编译完之后，你可能会注意到现在有许多很小的 chunk - 这产生了大量 HTTP 请求开销。幸运的是，webpack 可以后处理你的 chunk，并通过合并的方式减少请求。webpack 提供了两个_对象_选项：

- 通过 `--optimize-max-chunks 15` 这种内联方式(inline)，来限制最大 chunk 数量，或者在配置文件中添加 `new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})`
- 通过 `--optimize-min-chunk-size 10000` 这种内联方式(inline)，来限制最小 chunk 数量，或者在配置文件中添加 `new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})`

webpack 接受这两个参数来合并 chunk（优先合并含有重复的模块的 chunk）。由于不会合并到入口 chunk(entry chunk)，所以不会影响页面初始化加载时间。

## 单页面应用程序(Single-Page-App)

单页面应用程序(SPA)是 web 应用程序的一种类型，webpack 旨在为其设计和优化。

你或许把应用程序拆分成多个 chunks，通过切换路由(router)的方式加载。入口 chunk 仅包含路由和 library，不会包含实际内容。当你的用户通过导航浏览你的应用程序的时候他可以很好的工作，但在初始化页面加载时，需要两次 HTTP 往返(round trips)：一次 HTTP 请求用于获取 router，另一次 HTTP 请求用于根据 router 获取当前页面内容。

如果你是使用了 HTML5 的 History API，通过 URL 来反映当前实际的页面内容，你的服务器就能知道，哪块是被客户端代码所请求的页面内容。为了节省「HTTP 往返次数(round trips)」你可以在 HTTP 响应(response)中加入「内容 chunk(content chunk)」：通过添加 script 标签这是可以办到的。浏览器会同时载入 chunk。

``` html
<script src="entry-chunk.js" type="text/javascript" charset="utf-8"></script>
<script src="3.chunk.js" type="text/javascript" charset="utf-8"></script>
```

你可以从 stats 提取 chunk 文件。（[stats-webpack-plugin](https://www.npmjs.com/package/stats-webpack-plugin)可以从 build stats 输出）

## 多页面应用程序(Multi-Page-App)

当你编译一个（真正的）多页面应用程序，想要在页面间分享共同的代码。事实上在 webpack 上非常容易：编译多个 entry 点：

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

这会生成多个入口 chunk：`p1.entry.chunk.js`, `p2.entry.chunk.js` 和 `p3.entry.chunk.js` 。但是其余的 chunks 可以通过它们共享。

如果你的 chunks 有共同的模块，这里有些很酷的插件来完成。[`CommonsChunkPlugin`](./commons-chunk-plugin)识别共同的模块并且把他们放入一个共同的 chunk 里。你需要在你的页面上添加两个 script 标签，一个共同 chunk 和一个入口 chunk。

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

这会生成多个入口 chunk：`p1.entry.chunk.js`, `p2.entry.chunk.js` 和 `p3.entry.chunk.js`, 加上一个 `commons.chunk.js`。首先载入 `commons.chunk.js`，然后是 `xx.entry.chunk.js`。

你可以生成多个公用的 chunk，通过选择入口 chunk 来实现。并且你可以聚集这些共用 chunk。

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
