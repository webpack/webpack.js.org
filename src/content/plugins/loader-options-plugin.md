---
title: LoaderOptionsPlugin
contributors:
  - johnnyreilly
  - skipjack
  - byzyk
  - EugeneHlushko
---

The `LoaderOptionsPlugin` is unlike other plugins in that it is built for migration from webpack 1 to 2. In webpack 2, the schema for a `webpack.config.js` became stricter; no longer open for extension by other loaders and plugins. The intention is that you pass `options` directly to loaders and plugins (i.e. `options` are __not__ global or shared).

However, until a loader has been updated to depend upon options being passed directly to them, the `LoaderOptionsPlugin` exists to bridge the gap. You can configure global loader options with this plugin and all loaders will receive these options.

``` js
new webpack.LoaderOptionsPlugin({
  // Options...
});
```

W> This plugin will be removed in the future as it only exists for migration.


## Options

This plugin supports the following options:

- `options.debug` (`boolean`): Whether loaders should be in `debug` mode or not. `debug` will be removed as of webpack 3.
- `options.minimize` (`boolean`): Where loaders can be switched to minimize mode.
- `options.options` (`object`): A configuration object that can be used to configure older loaders - this will take the same schema a `webpack.config.js`.
- `options.options.context` (`string`): The context that can be used to configure older loaders.
- any other options allowed in a `webpack.config.js`....


## Usage

Here's an example of how this plugin might be used:

```javascript
new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  options: {
    context: __dirname
  }
});
```
