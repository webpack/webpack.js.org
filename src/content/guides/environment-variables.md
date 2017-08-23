---
title: Environment Variables
sort: 16
contributors:
  - simon04
related:
  - title: The Fine Art of the webpack 2 Config
    url: https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172#.297u8iuz1
---

To disambiguate in your `webpack.config.js` between [development](/guides/development) and [production builds](/guides/production), you may use environment variables.

The standard approach in Node.js modules can be applied: Set an environment variable when running webpack and refer to the variables using Node's [`process.env`](https://nodejs.org/api/process.html#process_process_env). The variable `NODE_ENV` is commonly used as de-facto standard (see [here](https://dzone.com/articles/what-you-should-know-about-node-env)).

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
