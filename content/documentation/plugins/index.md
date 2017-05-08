---
title: Plugins
contributors:
  - simon04
  - gonzoyumo
  - rouzbeh84
  - aretecode
---

webpack has a rich plugin interface. Most of the features within webpack itself use this plugin interface. This makes webpack **flexible**.

|Name|Description|
|:--:|:----------|
|[`CommonsChunkPlugin`](/documentation/plugins/commons-chunk-plugin)|Generates chunks of common modules shared between entry points and splits them into separate  bundles, e.g. `vendor.bundle.js` && `app.bundle.js`|
|[`ComponentWebpackPlugin`](/documentation/plugins/component-webpack-plugin)|Use components with webpack|
|[`CompressionWebpackPlugin`](/documentation/plugins/compression-webpack-plugin)|Prepare compressed versions of assets to serve them with Content-Encoding|
|[`DefinePlugin`](/documentation/plugins/define-plugin)|Allows global constants configured at compile time, useful for allowing different behavior between dev/release builds|
|[`EnvironmentPlugin`](/documentation/plugins/environment-plugin)|Shorthand for using the [`DefinePlugin`](./define-plugin) on `process.env` keys.|
|[`DllPlugin`](/plugins/dll-plugin)|Provide means to split bundles in a way that can drastically improve build time performance.|
|[`ExtractTextWebpackPlugin`](/documentation/plugins/extract-text-webpack-plugin)|Extracts Text (CSS) from your bundles into a separate file|
|[`HtmlWebpackPlugin`](/documentation/plugins/html-webpack-plugin)| Simplifies creation of HTML files (`index.html`) to serve your bundles|
|[`I18nWebpackPlugin`](/documentation/plugins/i18n-webpack-plugin)|Adds i18n support to your bundles|
|[`LimitChunkCountPlugin`](/documentation/plugins/limit-chunk-count-plugin)| Set min/max limits for chunking to fine tune and control chunking|
|[`NormalModuleReplacementPlugin`](/documentation/plugins/normal-module-replacement-plugin)|Replaces resource that matches a regexp|

![Awesome](../assets/awesome-badge.svg)
For more third-party plugins, see the list from [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins).
