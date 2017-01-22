---
title: coffee-redux-loader
source: https://raw.githubusercontent.com/webpack/coffee-redux-loader/master/README.md
edit: https://github.com/webpack/coffee-redux-loader/edit/master/README.md
---
# coffee-script-redux loader for webpack

## Usage

``` javascript
var exportsOfFile = require("coffee-redux-loader!./file.coffee");
// => return exports of executed and compiled file.coffee
```

Don't forget to polyfill `require` if you want to use it in node.
See `webpack` documentation.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/coffee-redux-loader/