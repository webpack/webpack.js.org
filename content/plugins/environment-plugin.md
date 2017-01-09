---
title: environment-plugin
contributors:
  - einarlove
---

```js
new webpack.EnvironmentPlugin(keys)
```

Replaces instances of `process.env.VARIABLE` with variable set on build.
Takes either an array of keys or object with default values.

**Example:**

```js
// keys from process.env
new webpack.EnvironmentPlugin(['NODE_ENV', 'VERSION'])

// or with default values
new webpack.EnvironmentPlugin({
  VERSION: packageJson.version,
  NODE_ENV: 'development'
})
```

T> If the variable is undefine on build, webpack gives a warning. This can be suppressed with a default value or a `null` value.

## Why
It's common to use variables stored in [`process.env`](https://nodejs.org/api/process.html#process_process_env) when writing code for node and servers for configuration outside your environment. If they are needed when run later like in a browser you can use EnvironmentPlugin to replace them on build.

T> Variables coming from `process.env` are always strings, so unlike [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) variables are stringified before replaced. Undefined variables are an exception.
