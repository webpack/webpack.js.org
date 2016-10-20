---
title: 如何生成一个生产构建？
contributors:
  - henriquea
---

Generating production builds with webpack is straight-forward. There are three things to keep in mind:

- Source Maps
- Node environment
- Minification

## Source Maps

We encourage you to have Source Maps enabled in production. They are useful for debugging and to run benchmark tests. Webpack can generate inline Source Maps included in the bundles or separated files.

In your configuration, use the `devtools` object to set the Source Map type. We currently support seven types of Source Maps. You can find more information about them in our [configuration](/configuration/devtool) documentation page.

One of the good options to go is using `cheap-module-source-map` which simplifies the Source Maps to a single mapping per line.

## Node environment variable

The second step is to tell webpack to generate a production build by setting the node environment variable to `production`. webpack will not include any extra useful code, warnings and checks used in development.

The `DefinePlugin` creates **compile** time constants. Useful for injecting your node environment as seen below.

?> TODO: Add a link to the `ProvidePlugin` documentation

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
  /*...*/
};
```

T> Spoiler: Setting the env var only won't make your bundle smaller. This take us to the last step:

## Minification

webpack comes with UglifyJS plugin which minimize the output. You can pass an object containing [UglifyJS options](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin).

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
  /*...*/
};
```

That's it! You're all set to ship production code.

?> TODO: Add reading reference link to "How to manage multiple configurations"
?> TODO: Add reference link to "Splitting configuration"
