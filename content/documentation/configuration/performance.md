---
title: Performance
sort: 14
contributors:
  - thelarkinn
---

These options allows you to control how webpack notifies you of assets and entrypoints that exceed a specific file limit. 
This feature was inspired by the idea of [webpack Performance Budgets](https://github.com/webpack/webpack/issues/3216).

## `performance`

`object`

Configure how performance hints are shown. For example if you have an asset that is over 250kb, webpack will emit a warning notifiying you of this.


## `performance.hints`

`boolean | "error" | "warning"`

Turns hints on/off. In addition, tells webpack to throw either an error or a warning when hints are found. This property is set to `"warning"` by default.

Given an asset is created that is over 250kb:

```js
performance: {
  hints: false
}
```

No hint warnings or errors are shown.

```js
performance: {
  hints: "warning"
}
```

A warning will be displayed notifying you of a large asset. We recommend something like this for development environments.

```js
performance: {
  hints: "error"
}
```

An error will be displayed notifying you of a large asset. We recommend using `hints: "error"` during production builds to help prevent deploying production bundles that are too large, impacting webpage performance. 

## `performance.maxEntrypointSize`

`int`

An entrypoint represents all assets that would be utilized during initial load time for a specific entry. This option controls when webpack should emit performance hints based on the maximum entrypoint size. The default value is `250000` (bytes).

```js
performance: {
  maxEntrypointSize: 400000
}
```

## `performance.maxAssetSize`

`int`

An asset is any emitted file from webpack. This option controls when webpack emits a performance hint based on individual asset size. The default value is `250000` (bytes).


```js
performance: {
  maxAssetSize: 100000
}
```

## `performance.assetFilter`

`Function`

This property allows webpack to control what files are used to calculate performance hints. The default function is seen below: 

```js
function(assetFilename) {
	return !(/\.map$/.test(assetFilename))
};
```

You can override this property by passing your own function in: 

```js 
performance: {
  assetFilter: function(assetFilename) {
    return assetFilename.endsWith('.js');
  }
}
```

The example above will only give you performance hints based on `.js` files.
