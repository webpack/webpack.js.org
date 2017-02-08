---
title: bundle-loader
source: https://raw.githubusercontent.com/webpack/bundle-loader/master/README.md
edit: https://github.com/webpack/bundle-loader/edit/master/README.md
---
# webpack 的文件束加载器

## Usage

[文档: 使用加载器](http://webpack.github.io/docs/using-loaders.html)

``` javascript
// 当你引用 文件束 (bundle) 的时候，chunk 会被浏览器加载。
var waitForChunk = require("bundle-loader!./file.js");

// 为了等待 chunk 的加载完成 (而且为了拿到 exports 输出)
// 你需要异步去等待它
waitForChunk(function(file) {
	// 这里可以使用file，就像是用下面的代码require进来一样
	// var file = require("./file.js");
});
// 将 require 包裹在 require.ensure 的代码块中
```

当你引用文件束的时候，chunk 会被浏览器加载。如果你想它懒加载，请用：

``` javascript
var load = require("bundle-loader?lazy!./file.js");

// 文件束不会被加载，除非你调用了 call 函数
load(function(file) {

});
```

你可能会给文件束设名称(`name` 查询参数)。请查看[documentation](https://github.com/webpack/loader-utils#interpolatename).

``` javascript
require("bundle-loader?lazy&name=my-chunk!./file.js");
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/bundle-loader/