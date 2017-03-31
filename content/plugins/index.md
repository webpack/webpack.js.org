---
title: Plugins
contributors:
  - simon04
  - gonzoyumo
  - rouzbeh84
---

webpack has a rich plugin interface. Most of the features within webpack itself use this plugin interface. This makes webpack **flexible**.

|Name|Description|
|:--:|:----------|
|[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)|Generates chunks of common modules shared between entry points and splits them into separate  bundles, e.g., `vendor.bundle.js` && `app.bundle.js`|
|[`ComponentWebpackPlugin`](/plugins/component-webpack-plugin)|Use components with webpack|
|[`CompressionWebpackPlugin`](/plugins/compression-webpack-plugin)|Prepare compressed versions of assets to serve them with Content-Encoding|
|[`DefinePlugin`](/plugins/define-plugin)|Allows global constants configured at compile time, useful for allowing different behavior between dev/release builds|
|[`EnvironmentPlugin`](/plugins/environment-plugin)|Shorthand for using the [`DefinePlugin`](./define-plugin) on `process.env` keys.|
|[`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin)|Extracts Text (CSS) from your bundles into a separate file (app.bundle.css)|
|[`HtmlWebpackPlugin`](/plugins/html-webpack-plugin)| Simplifies creation of HTML files (`index.html`) to serve your bundles|
|[`I18nWebpackPlugin`](/plugins/i18n-webpack-plugin)|Adds i18n support to your bundles|
|[`LimitChunkCountPlugin`](/plugins/limit-chunk-count-plugin)| Set min/max limits for chunking to fine tune and control chunking|
|[`NormalModuleReplacementPlugin`](/plugins/normal-module-replacement-plugin)|Replaces resource that matches a regexp|

![Awesome](../assets/awesome-badge.svg)
For more third-party plugins, see the list from [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins).
