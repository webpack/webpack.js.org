---
title: Other Options
sort: 16
contributors:
  - sokra
  - skipjack
---

?> These are all the other options that might not need an entire page. Either we need to create new pages for them, move them to an existing page, or keep an **Other Options** section like this and replace this TODO with a short description/lead-in paragraph.

## `amd`

`object`

Set the value of `require.amd` or `define.amd`:

```js
amd: {
  jQuery: true
}
```

?> I don't think this is very clear, at least not without a link pointing to what this might be used for.


## `bail`

`boolean`

Fail out on the first error instead of tolerating it. By default webpack will log these errors in red in the terminal, as well as the browser console when using HMR, but continue bundling. To enable it:

```js
bail: true
```

This will force webpack to exit its bundling process.


## `cache`

`boolean` `object`

Cache the generated webpack modules and chunks to improve build speed. Caching is enabled by default while in watch mode. To disable caching simply pass:

```js
cache: false
```

If an object is passed, webpack will use this object for caching. Keeping a reference to this object will allow one to share the same cache between compiler calls:

```js
let SharedCache = {};

export default {
  ...,
  cache: SharedCache
}
```

W> Don't share the cache between calls with different options.

?> Elaborate on the warning and example - calls with different configuration options?

## `loader`

`object`

Expose custom values into the loader context.

?> Add an example...


## `profile`

`boolean`

Capture a "profile" of the application, including statistics and hints, which can then be dissected using the [Analyze](https://webpack.github.io/analyse/) tool.

T> Use the [StatsPlugin](https://www.npmjs.com/package/stats-webpack-plugin) for more control over the generated profile.


## `recordsPath`

Description...

?> Add example and description as well as details on `recordsInputPath` and `recordsOutputPath`.


## `recordsInputPath`

Description...

?> Add example and description as well as details on `recordsInputPath` and `recordsOutputPath`.


## `recordsOutputPath`

Description...

?> Add example and description as well as details on `recordsInputPath` and `recordsOutputPath`.
