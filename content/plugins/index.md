---
title: Plugins
contributors:
  - simon04
  - gonzoyumo
  - rouzbeh84
  - aretecode
  - eko3alpha
---

webpack has a rich plugin interface. Most of the features within webpack itself use this plugin interface. This makes webpack **flexible**.

|Name|Description|
|:--:|:----------|
|[`BabiliWebpackPlugin`](/plugins/babili-webpack-plugin) | A Webpack Plugin for [Babili](https://github.com/babel/babili) - A babel based minifier |
|[`BannerPlugin`](/plugins/banner-plugin) | Adds a banner to the top of each generated chunk |
|[`ContextReplacementPlugin`](/plugins/context-replacement-plugin) | Allows you to override the inferred context of a `require` expression |
|[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) | Generates chunks of common modules shared between entry points and splits them into separate  bundles, e.g., `vendor.bundle.js` && `app.bundle.js` |
|[`ComponentWebpackPlugin`](/plugins/component-webpack-plugin) | Use components with webpack |
|[`CompressionWebpackPlugin`](/plugins/compression-webpack-plugin) | Prepare compressed versions of assets to serve them with Content-Encoding |
|[`DefinePlugin`](/plugins/define-plugin) | Allows global constants configured at compile time, useful for allowing different behavior between dev/release builds |
|[`DllPlugin`](/plugins/dll-plugin) | Provide means to split bundles in a way that can drastically improve build time performance |
|[`EnvironmentPlugin`](/plugins/environment-plugin) | Shorthand for using the [`DefinePlugin`](./define-plugin) on `process.env` keys |
|[`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin) | Extracts Text (CSS) from your bundles into a separate file (app.bundle.css) |
|[`HotModuleReplacementPlugin`](/plugins/hot-module-replacement-plugin) | Enables Hot Module Replacement, otherwise known as HMR |
|[`HtmlWebpackPlugin`](/plugins/html-webpack-plugin)| Simplifies creation of HTML files (`index.html`) to serve your bundles |
|[`I18nWebpackPlugin`](/plugins/i18n-webpack-plugin)| Adds i18n support to your bundles |
|[`IgnorePlugin`](/plugins/ignore-plugin) | Excludes certain modules from bundles |
|[`LimitChunkCountPlugin`](/plugins/limit-chunk-count-plugin) | Set min/max limits for chunking to fine tune and control chunking |
|[`LoaderOptionsPlugin`](/plugins/loader-options-plugin) | Used for migrating from webpack 1 to 2 |
|[`MinChunkSizePlugin`](/plugins/min-chunk-size-plugin) | Keep chunk size above the specified limit |
|[`NormalModuleReplacementPlugin`](/plugins/normal-module-replacement-plugin) | Replaces resource that matches a regexp |
|[`NoEmitOnErrorsPlugin`](/plugins/no-emit-on-errors-plugin) | Skip the emitting phase whenever there are errors while compiling |
|[`NormalModuleReplacementPlugin`](/plugins/normal-module-replacement-plugin) | Replace one resource with another, e.g., `config.dev.js` with `config.pro.js` |
|[`NpmInstallWebpackPlugin`](/plugins/npm-install-webpack-plugin) | Automatically install missing dependencies durring development |
|[`ProvidePlugin`](/plugins/provide-plugin) | Use modules without having to use import/require |
|[`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin) | Enables a more fine grained control of source maps |
|[`UglifyjsWebpackPlugin`](/uglifyjs-webpack-plugin) | enables control of the version of UglifyJS in your project |
|[`ZopfliWebpackPlugin`](/plugins/zopfli-webpack-plugin) | Node-Zopfli plugin for Webpack |

![Awesome](../assets/awesome-badge.svg)
For more third-party plugins, see the list from [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins).
