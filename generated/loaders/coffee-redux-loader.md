---
title: coffee-redux-loader
source: https://raw.githubusercontent.com/webpack/coffee-redux-loader/master/README.md
edit: https://github.com/webpack/coffee-redux-loader/edit/master/README.md
---
# webpack 的 coffee-script-redux loader

## 用法

``` javascript
var exportsOfFile = require("coffee-redux-loader!./file.coffee");
// => return exports of executed and compiled file.coffee
```

如果你想要在 node 运行环境中使用，不要忘了 polyfill `require`。
请查看 `webpack` 文档。


## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/coffee-redux-loader/