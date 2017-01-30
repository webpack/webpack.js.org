---
title: exports-loader
source: https://raw.githubusercontent.com/webpack-contrib/exports-loader/master/README.md
edit: https://github.com/webpack-contrib/exports-loader/edit/master/README.md
---
# exports loader for webpack

`exports-loader` 通过在文件中追加 `exports[...] = ...` 语句读取导出的变量。

##  安装

```
npm install exports-loader
```

##  用法

``` javascript
require("exports-loader?file,parse=helpers.parse!./file.js");
//  将添加下面的代码:
//  exports["file"] = file;
//  exports["parse"] = helpers.parse;

require("exports-loader?file!./file.js");
//  将添加下面的代码:
//  module.exports = file;
```

[文档: 使用加载器](http://webpack.github.io/docs/using-loaders.html)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
