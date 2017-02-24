---
title: Watch and WatchOptions
sort: 12
contributors:
  - sokra
  - skipjack
  - SpaceK33z
---

webpack can watch files and recompile whenever they change. This page explains how to enable this and a couple of tweaks you can make if watching does not work properly for you.

## `watch`

`boolean`

Turn on watch mode. This means that after the initial build, webpack will continue to watch for changes in any of the resolved files. Watch mode is turned off by default:

```js
watch: false
```

T> In webpack-dev-server and webpack-dev-middleware watch mode is enabled by default.

## `watchOptions`

`object`

A set of options used to customize watch mode:

```js
watchOptions: {
  aggregateTimeout: 300,
  poll: 1000
}
```

## `watchOptions.aggregateTimeout`

`number`

Add a delay before rebuilding once the first file changed. This allows webpack to aggregate any other changes made during this time period into one rebuild. Pass a value in milliseconds:

```js
aggregateTimeout: 300 // The default
```

## `watchOptions.ignored`

For some systems, watching many file systems can result in a lot of CPU or memory usage. It is possible to exclude a huge folder like `node_modules`:

```js
ignored: /node_modules/
```

It is also possible to use [anymatch](https://github.com/es128/anymatch) patterns:

```js
ignored: "files/**/*.js"
```

## `watchOptions.poll`

`boolean` `number`

Turn on [polling](http://whatis.techtarget.com/definition/polling) by passing `true`, or specifying a poll interval in milliseconds:

```js
poll: 1000 // Check for changes every second
```

T> If watching does not work for you, try out this option. Watching does not work with NFS and machines in VirtualBox.

