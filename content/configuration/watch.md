---
title: Watch 和 WatchOptions
sort: 12
contributors:
  - sokra
  - skipjack
  - SpaceK33z
---

webpack 可以监听文件变化，当它们修改后会重新编译。这个页面介绍了如何启用这个功能，以及当 watch 无法正常运行的时候你可以做的一些调整。

## `watch`

`boolean`

启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。Watch 模式默认关闭。

```js
watch: false
```

T> webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。

## `watchOptions`

`object`

一组用来定制 Watch 模式的选项：

```js
watchOptions: {
  aggregateTimeout: 300,
  poll: 1000
}
```

## `watchOptions.aggregateTimeout`

`number`

当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：

```js
aggregateTimeout: 300 // 默认值
```

## `watchOptions.ignored`

对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 `node_modules`：

```js
ignored: /node_modules/
```

也可以使用 [anymatch](https://github.com/es128/anymatch) 模式：

```js
ignored: "files/**/*.js"
```

## `watchOptions.poll`

`boolean` `number`

通过传递 `true` 开启 [polling](http://whatis.techtarget.com/definition/polling)，或者指定毫秒为单位进行轮询。

```js
poll: 1000 // 每秒检查一次变动
```

T> 如果监听没生效，试试这个选项吧。Watch 在 NFS 和 VirtualBox 机器上不适用。

***

> 原文：https://webpack.js.org/configuration/watch/
