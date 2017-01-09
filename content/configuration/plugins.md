---
title: Plugins
sort: 8
contributors:
  - sokra
  - skipjack
  - einarlove
---

?> `plugins` customize the webpack build process in a variety of ways. This page discusses using existing plugins, however if you are interested in writing your own please visit Writing a Plugin.

## `plugins`

`array`

A list of webpack plugins. For example, when multiple bundles share some of the same dependencies, the `CommonsChunkPlugin` could be useful to extract those dependencies into a shared bundle to avoid duplication. This could be added like so:

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    ...
  })
]
```

A more complex example, using multiple plugins, might look something like this:

?> Add a more detailed example

## `EnvironmentPlugin`
Replaces instances of `process.env.VARIABLE` with variable set in runtime on build. Takes either an array of keys or object with default values.

```js
// keys from process.env
new webpack.EnvironmentPlugin(['NODE_ENV', 'VERSION'])

// or with default values
new webpack.EnvironmentPlugin({
  VERSION: packageJson.version,
  NODE_ENV: 'development'
})
```

If a variable is undefined on build webpack gives a warning on build. This can be suppressed with a default value or a `null` value.

Variables coming from `process.env` are always strings, so unlike [DefinePlugin](https://webpack.js.org/configuration/plugins/#defineplugin) variables are stringified before replaced. Undefined variables are an exception.
