---
title: Environment
contributors:
  - simon04
---

Eventually you will find the need to disambiguate in your `webpack.config.js` between [development](/guides/development) and [production builds](/guides/production-build). You have (at least) two options:

## Using `--env`

The webpack CLI support specifying build environment keys via `--cli` such as `--env.production` or `--env.platform=web`. To make use of those settings, change the configuration object into a function in `webpack.config.js`:

```diff
-module.exports = {
+module.exports = function(env) {
+  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
+        compress: env.production // compress only in production build
      })
    ]
+  };
};
```

## Using environment variables

Alternatively, the standard approach in Node.js modules can be applied: Set an environment variable when running webpack and refer to the variables using Node's [`process.env`](https://nodejs.org/api/process.html#process_process_env). The variable `NODE_ENV` is commonly used as de-facto standard (see [here](https://dzone.com/articles/what-you-should-know-about-node-env)).

**webpack.config.js**
```diff
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
+      compress: process.env.NODE_ENV === 'production'
    })
  ]
};
```

Use the [`cross-env`](https://www.npmjs.com/package/cross-env) package to cross-platform-set environment variables:

**package.json**
```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production PLATFORM=web webpack"
  }
}
```

## References
* https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172#.297u8iuz1
