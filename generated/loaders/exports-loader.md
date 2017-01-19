---
title: exports-loader
source: https://raw.githubusercontent.com/webpack/exports-loader/master/README.md
edit: https://github.com/webpack/exports-loader/edit/master/README.md
---
# exports loader for webpack

## Installation

```
npm install exports-loader
```

## Usage

``` javascript
require("exports-loader?file,parse=helpers.parse!./file.js");
// adds below code the the file's source:
//  exports["file"] = file;
//  exports["parse"] = helpers.parse;

require("exports-loader?file!./file.js");
// adds below code the the file's source:
//  module.exports = file;
```

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
