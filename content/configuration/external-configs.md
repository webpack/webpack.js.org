---
title: External Configurations
sort: 3
contributors:
  - sokra
  - skipjack
  - tarang9211
---

Webpack lets you define you configuration files in any language. The list of supported file extensions can be found at the [node-interpret](https://www.npmjs.com/package/interpret) package. Webpack will still interpret your file as pure JS!

For example if you use **coffeescript**, your file would be as follows:

**webpack.config.coffee.js**

```javascript
HtmlWebpackPlugin = require('html-webpack-plugin')
#installed via npm
webpack = require('webpack')
#to access built-in plugins
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


?> loader settings, e.g. `sassLoader`, `eslint` sections
