---
title: coverjs-loader
source: https://raw.githubusercontent.com/webpack-contrib/coverjs-loader/master/README.md
edit: https://github.com/webpack-contrib/coverjs-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/coverjs-loader
---


## 用法

``` javascript
webpack-dev-server "mocha!./cover-my-client-tests.js" --options webpackOptions.js
```

``` javascript
// webpackOptions.js
module.exports = {
	// 你的 webpack options
	output: "bundle.js",
	publicPrefix: "/",
	debug: true,
	includeFilenames: true,
	watch: true,

	// 绑定 coverjs loader
	postLoaders: [{
		test: "", // 所有文件
		exclude: [
			"node_modules.chai",
			"node_modules.coverjs-loader",
			"node_modules.webpack.buildin"
		],
		loader: "coverjs-loader"
	}]
}
```

``` javascript
// cover-my-client-tests.js
require("./my-client-tests");

after(function() {
	require("cover-loader").reportHtml();
});
```

参考示例 [the-big-test](https://github.com/webpack/the-big-test)。

这是一个独立的 loader，你不必一定把它和 mocha loader 结合一起使用。如果你想 cover 一个普通的项目，也可以直接使用它。`reportHtml` 方法会把输出内容添加到 body 中。


## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/coverjs-loader/
