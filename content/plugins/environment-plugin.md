---
title: environment-plugin
contributors:
  - simon04
  - einarlove
---

The EnvironmentPlugin is a shorthand for using the [define-plugin](/plugins/define-plugin) on [`process.env`](https://nodejs.org/api/process.html#process_process_env) keys.

```js
new webpack.EnvironmentPlugin(keys)
```

## How to use
The EnvironmentPlugin accepts either an array of keys or an object with default values.

```js
new webpack.EnvironmentPlugin(['NODE_ENV', 'VERSION'])
```

When given an object, the values are used as defaults for when they are not defined in `process.env`.

```js
new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  VERSION: 33,
})
```

T> Warning is given if the value is undefined. This can be suppressed with a default value or a value of `null`.

## Example

```js
new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  DEBUG: false,
  TITLE: 'There\'s a problem on the horizon. There is no horizon.'
})
```

```js
// entry.js
document.title = process.env.TITLE

if (process.env.NODE_ENV !== 'production' || process.env.DEBUG === 'true') {
  document.title = process.env.TITLE_IN_DEBUG
}
```

When executing `$ NODE_ENV=production webpack` in the terminal to build, entry.js becomes this:

```js
// entry.js
document.title = 'There\'s a problem on the horizon. There is no horizon.'

if ('production' !== 'production' || 'false' === 'true') {
  document.title = process.env.TITLE_IN_DEBUG // undefined
}
```

W> Variables coming from `process.env` are always strings, so unlike [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) variables are stringified before replaced. Undefined variables are an exception.
