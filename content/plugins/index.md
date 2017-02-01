---
title: Plugins
contributors:
  - simon04
---

webpack has a rich plugin interface. Most of the features within webpack itself use this plugin interface. This makes webpack **flexible**.

|Name|Description|
|:--:|:----------|
|[commons-chunk-plugin](/plugins/commons-chunk-plugin)|Generates chunks of common modules shared between entry points and splits them into separate  bundles, e.g., `1vendor.bundle.js` && `app.bundle.js`|
|[extract-text-webpack-plugin](/plugins/extract-text-webpack-plugin)|Extracts Text (CSS) from your bundles into a separate file (app.bundle.css)|
|[component-webpack-plugin](/plugins/component-webpack-plugin)|Use components with webpack|
|[compression-webpack-plugin](/plugins/compression-webpack-plugin)|Prepare compressed versions of assets to serve them with Content-Encoding|
|[i18n-webpack-plugin](/plugins/i18n-webpack-plugin)|Adds i18n support to your bundles|
|[html-webpack-plugin](/plugins/html-webpack-plugin)| Simplifies creation of HTML files (`index.html`) to serve your bundles|


![Awesome](../../assets/awesome-badge.svg)
For more thrid-party plugins, see the list from [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins).
