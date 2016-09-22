---
title: Watch and WatchOptions
contributors:
  - sokra
  - gregvenech
---

?> Description...

### `watch`

`boolean`

Turn on watch mode. This means that after the initial build, webpack will continue to watch for changes in any of the resolved files. Watch mode is turned off by default:

```js
watch: false
```


### `watchOptions`

`object`

A set of options used to customize watch mode:

```js
watchOptions: {
  aggregateTimeout: 300,
  poll: 1000
}
```


### `watchOptions.aggregateTimeout`

`number`

Add a delay before rebuilding once the first file changed. This allows webpack to aggregate any other changes made during this time period into one rebuild. Pass a value in milliseconds:

```js
aggregateTimeout: 300 // The default
```


### `watchOptions.poll`

`boolean` `number`

Turn on [polling](http://whatis.techtarget.com/definition/polling) by passing `true`, or specifying a poll interval in milliseconds:

```js
poll: 1000 // Check for changes every second
```
