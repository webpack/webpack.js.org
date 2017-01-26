---
title: environment-plugin
contributors:
  - simon04
---

The environment-plugin is a shorthand for using the [define-plugin](/plugins/define-plugin)
on [`process.env`](https://nodejs.org/api/process.html#process_process_env) keys.

**Example:**

```javascript
new webpack.EnvironmentPlugin([
  'NODE_ENV'
])
```

This is equivalent to the following define-plugin application:

```javascript
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})
```
