---
title: Plugins
contributors:
  - simon04
  - gonzoyumo
---

webpack 有一个富插件接口(rich plugin interface)。webpack 自身的多数功能都使用这个插件接口。这个插件接口使 webpack 变得**极其灵活**。

|名称|描述|
|:--:|:----------|
|[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)|将多个入口起点之间共享的公共模块，生成为一些 chunk，并且分离到单独的 bundle 中，例如，`1vendor.bundle.js` 和 `app.bundle.js`|
|[`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin)|从 bundle 中提取文本（CSS）到分离的文件（app.bundle.css）|
|[`ComponentWebpackPlugin`](/plugins/component-webpack-plugin)|通过 webpack 使用组件|
|[`CompressionWebpackPlugin`](/plugins/compression-webpack-plugin)|预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务|
|[`I18nWebpackPlugin`](/plugins/i18n-webpack-plugin)|为 bundle 增加国际化支持|
|[`HtmlWebpackPlugin`](/plugins/html-webpack-plugin)| 用于简化 HTML 文件（`index.html`）的创建，提供访问 bundle 的服务。|
|[`NormalModuleReplacementPlugin`](/plugins/normal-module-replacement-plugin)|Replaces resource that matches a regexp|


![Awesome](../assets/awesome-badge.svg)
更多第三方插件，请查看 [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins) 列表。
