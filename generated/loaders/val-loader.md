---
title: val-loader
source: https://raw.githubusercontent.com/webpack/val-loader/master/README.md
edit: https://github.com/webpack/val-loader/edit/master/README.md
---
# val loader for webpack

## Usage

``` javascript
var a = require("val-loader!./file.js");
// => excute file.js while compiling and 
//    take the result as javascript code for including
```

Don't forget to polyfill `require` if you want to use it in node.
See `webpack` documentation.

The excution of file.js has polyfill already applied.

This loader is also useful if you want to provide data for another loader:

``` javascript
require("css-loader!val-loader!./generateCss.js");
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/val-loader/