---
title: val-loader
source: https://raw.githubusercontent.com/webpack-contrib/val-loader/master/README.md
edit: https://github.com/webpack-contrib/val-loader/edit/master/README.md
---
# val loader for webpack

## 用法

``` javascript
var a = require("val-loader!./file.js");
// => 在编译时执行 file.js 并把结果转为 javascript 代码包含到文件中
```

如果要在 Node.js 中使用，不要忘记兼容（polyfill）`require`。可以参考 `webpack` 文档。


在执行 file.js 时如果有 polyfill 也已经会被使用。

这个加载器也可以用在你需要提供数据给另一个加载器的时候：

``` javascript
require("css-loader!val-loader!./generateCss.js");
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
