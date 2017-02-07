---
title: transform-loader
source: https://raw.githubusercontent.com/webpack-contrib/transform-loader/master/README.md
edit: https://github.com/webpack-contrib/transform-loader/edit/master/README.md
---
# transform loader for webpack

通过 webpack 加载器的方式来使用 browserify 的转换模块。

## 用法

[文档：使用加载器](http://webpack.github.io/docs/using-loaders.html)

通过查询参数来传递模块名。

``` javascript
var x = require("!transform-loader?brfs!./file.js");
var x = require("!transform-loader/cacheable?brfs!./file.js"); // 可缓存版本
```

如果你传递了一个数字，将得到 `this.options.transforms[number]` 中的函数。

### webpack 2 配置示例

``` javascript
module.exports = {
  module: {
    rules: [
      {
        loader: "transform-loader?brfs",
        enforce: "post"
      },
			{
        test: /\.coffee$/,
        loader: "transform-loader/cacheable?coffeeify"
      },
      {
        test: /\.weirdjs$/,
        loader: "transform-loader?0"
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        transforms: [
          function(file) {
            return through(function(buf) {
              this.queue(buf.split("").map(function(s) {
                return String.fromCharCode(127-s.charCodeAt(0));
              }).join(""));
            }, function() { this.queue(null); });
          }
        ]
      }
    })
  ]
};
```

### webpack 1 配置示例

``` javascript
module.exports = {
	module: {
		postLoaders: [
			{
				loader: "transform-loader?brfs"
			}
		]
		loaders: [
			{
				test: /\.coffee$/,
				loader: "transform-loader/cacheable?coffeeify"
			},
			{
				test: /\.weirdjs$/,
				loader: "transform-loader?0"
			}
		]
	},
	transforms: [
		function(file) {
			return through(function(buf) {
				this.queue(buf.split("").map(function(s) {
					return String.fromCharCode(127-s.charCodeAt(0));
				}).join(""));
			}, function() { this.queue(null); });
		}
	]
};
```

### 典型例子 brfs

假如你有下面这样的 Node 源码：

```js
var test = require('fs').readFileSync('./test.txt', 'utf8');
```

在 `npm install transform-loader brfs --save` 之后，像下面这样添加加载器到你的配置中：

```js
module.exports = {
    context: __dirname,
    entry: "./index.js",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "transform-loader?brfs"
            }
        ]
    }
}
```

加载器将应用到所有 JS 文件，这样在执行 watch 任务时将导致性能提醒。因此你也许需要使用带缓存的版本 `transform-loader/cacheable?brfs` 。

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/transform-loader/
