---
title: Configuration Languages
sort: 2
contributors:
  - sokra
  - skipjack
  - tarang9211
---

webpack lets you define you configuration files in any language. The list of supported file extensions can be found at the [node-interpret](https://github.com/js-cli/js-interpret) package. webpack with the help of [node-interpret](https://github.com/js-cli/js-interpret) will run your configuration through the language of your choice.

For example if you use **coffeescript**, your file would be as follows:

**webpack.config.coffee**

```javascript
HtmlWebpackPlugin = require('html-webpack-plugin')
webpack = require('webpack')
path = require('path')
config =
  entry: './path/to/my/entry/file.js'
  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'my-first-webpack.bundle.js'
  module: rules: [ {
    test: /\.(js|jsx)$/
    use: 'babel-loader'
  } ]
  plugins: [
    new (webpack.optimize.UglifyJsPlugin)
    new HtmlWebpackPlugin(template: './src/index.html')
  ]
module.exports = config
```
