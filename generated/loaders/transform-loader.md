---
title: transform-loader
source: https://raw.githubusercontent.com/webpack/transform-loader/master/README.md
edit: https://github.com/webpack/transform-loader/edit/master/README.md
---
# transform loader for webpack

Use a browserify transforms as webpack-loader

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Pass the module name as query parameter.

``` javascript
var x = require("!transform-loader?brfs!./file.js");
var x = require("!transform-loader/cacheable?brfs!./file.js"); // cacheable version
```

If you pass a number instead it will take the function from `this.options.transforms[number]`.

### Example webpack 2 config

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

### Example webpack 1 config

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

### Typical brfs Example

Say you have the following Node source:

```js
var test = require('fs').readFileSync('./test.txt', 'utf8');
```

After `npm install transform-loader brfs --save`, add the following loader to your config:

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

The loader is applied to all JS files, which can incur a performance hit with watch tasks. So you may want to use `transform-loader/cacheable?brfs` instead. 

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/transform-loader/