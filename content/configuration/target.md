---
title: Target
sort: 11
contributors:
  - juangl
  - sokra
  - skipjack
---

?> Compare with [the concept page](/concepts/targets) and determine what goes where.

## `target`

`string`

Tell webpack what environment the application is targeting. The following options are supported:

`target: "node"` - Compile for [NodeJS](https://nodejs.org/en/), using `require` to load chunks

`target: "node-webkit"` - Compile for [Webkit](https://webkit.org/), using [JSONP](https://sacha.me/articles/jsonp-demystified/) to load chunks

`target: "web"` - Compile for usage in a browser

`target: "webworker"` - Compile as a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)


T> Allows importing of built-in Node.js modules and [`nw.gui`](http://docs.nwjs.io/en/latest/) (experimental).

`target: "async-node"` - Use `fs` and `vm` to load chunks asynchronously

`target: "electron"` - Compile for [Electron](http://electron.atom.io/) for `main-proccess`

`target: "electron-main"` - Alias for `target: "electron"`

`target: "electron-renderer"` - Compile for [Electron](http://electron.atom.io/) for `renderer-proccess`

T> Allows importing of Electron-specific modules.

It defaults to:

```js
target: "web"
```
