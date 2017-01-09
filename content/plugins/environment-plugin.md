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

If the variable is undefine on build, webpack gives a warning. This can be suppressed with a default value or a `null` value.

T> Variables coming from `process.env` are always strings, so unlike [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) variables are stringified before replaced. Undefined variables are an exception.
