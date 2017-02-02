---
title: LoaderOptionsPlugin
contributors:
    - johnnyreilly
---

?> Review this content

The `LoaderOptionsPlugin` is unlike other plugins.  It exists to help people move from webpack 1 to webpack 2.  With webpack 2 the schema for a `webpack.config.js` became stricter; no longer open for extension by other loaders / plugins.  With webpack 2 the intention is that you pass `options` directly to loaders / plugins. i.e. options are **not** global / shared.

However, until a loader has been updated to depend upon options being passed directly to them, the `LoaderOptionsPlugin` exists to bridge the gap.  You can configure global / shared loader options with this plugin and all loaders will receive these options.

In the future this plugin may be removed.

```javascript
new webpack.LoaderOptionsPlugin(options)
```

* `options.debug` (`boolean`): Whether loaders should be in `debug` mode or not. `debug` will be removed as of webpack 3.
* `options.minimize` (`boolean`): Where loaders can be switched to minimize mode.
* `options.options` (`object`): A configuration object that can be used to configure older loaders - this will take the same schema a `webpack.config.js`

* `options.options.context` (`string`): The context that can be used to configure older loaders
* other options as in a `webpack.config.js`....

## Examples

```javascript
new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  options: {
    context: __dirname
  }
})
```
