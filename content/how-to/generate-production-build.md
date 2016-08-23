---
title: How to Generate a Production Build?
---

Generating production builds with Webpack is straight-forward. There are three things to keep in mind:

- Source maps
- Node environment
- Minification

## Source maps

We encourage you to have source maps enabled in production. They are useful for debugging and to run benchmark tests. Webpack can generate inline source maps included in the bundles or separated files.

In your configuration, use the `devtools` object to set the source map type. We currently support seven types of source maps. You can find more information about them in our [configuration](https://webpack.github.io/docs/configuration.html#devtool) documentation page.

One of the good options to go is using `cheap-module-source-map` which simplifies the source maps to a single mapping per line.

## Node environment variable

The second step is to tell Webpack to generate a production build by setting the node environment variable to `production`. Webpack will not include any extra useful code, warnings and checks used in development.

```js
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
],
```

Spoiler: Setting the env var only won't make your bundle smaller. This take us to the last step:

## Minification

Webpack comes with UglifyJS plugin which minimize the output. You can pass an object containing [UglifyJS options](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin).

```js
module.exports = {
  //...
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
  //...
}
```

That's it! You're all set to ship production code.
