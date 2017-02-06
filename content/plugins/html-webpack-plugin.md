---
title: HtmlWebpackPlugin
contributors:
  - ampedandwired
  - simon04
---

The [`HtmlWebpackPlugin`](https://github.com/ampedandwired/html-webpack-plugin) simplifies creation of HTML files to serve your
webpack bundles. This is especially useful for webpack bundles that include
a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply
your own template using [lodash templates](https://lodash.com/docs#template), or use your own [loader](/loaders).

## Installation
```
$ npm install html-webpack-plugin --save-dev
```

## Basic Usage

The plugin will generate an HTML5 file for you that includes all your webpack
bundles in the body using `script` tags. Just add the plugin to your webpack
config as follows:

```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

This will generate a file `dist/index.html` containing the following:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

If you have multiple webpack entry points, they will all be included with `script`
tags in the generated HTML.

If you have any CSS assets in webpack's output (for example, CSS extracted
with the [ExtractTextPlugin](/plugins/extract-text-webpack-plugin))
then these will be included with `<link>` tags in the HTML head.

## Configuration

For all configuration options, please see the
[plugin documentation](https://github.com/ampedandwired/html-webpack-plugin#configuration).


## Third party addons

The plugin supports addons. For a list see the
[documentation](https://github.com/ampedandwired/html-webpack-plugin#third-party-addons).
