---
title: Other Options
sort: 16
contributors:
  - sokra
  - skipjack
  - terinjokes
---


These are the remaining configuration options supported by webpack.

W> Help Wanted: This page is still a work in progress. If you are familiar with any of the options for which the description or examples are incomplete, please create an issue and submit a PR at the [docs repo](https://github.com/webpack/webpack.js.org)!


## `amd`

`object`

Set the value of `require.amd` or `define.amd`:

```js
amd: {
  jQuery: true
}
```

Certain popular modules written for AMD, most notably jQuery versions 1.7.0 to 1.9.1, will only register as an AMD module if the loader indicates it has taken [special allowances](https://github.com/amdjs/amdjs-api/wiki/jQuery-and-AMD) for multiple versions being included on a page.

The allowances were the ability to restrict registrations to a specific version or to support different sandboxes with different defined modules.

This option allows you to set the key your module looks for to a truthy value.
As it happens, the AMD support in webpack ignores the defined name anyways.


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
