---
title: jshint-loader
source: https://raw.githubusercontent.com/webpack/jshint-loader/master/README.md
edit: https://github.com/webpack/jshint-loader/edit/master/README.md
---
#webpack的jshint loader

## 用法
在你的webpack配置里启用jshint loader

``` javascript
module.exports = {
	module: {
		preLoaders: [
			{
				test: /\.js$/, // 对.js文件进行处理
				exclude: /node_modules/, // 排除掉node_modules文件夹下的所有文件
				loader: "jshint-loader"
			}
		]
	},

	// 更多jslint的配置项
	jshint: {
		// 查询jslint配置项，请参考 http://www.jshint.com/docs/options/
		// 例如
		camelcase: true,
		//jslint的错误在默认情况下会显示为warning（警告）信息
		//将emitErrors参数设置为true可使错误显示为error（错误）信息
		emitErrors: false,
    //jshint默认情况下不会打断webpack编译
    //如果你想在jshint出现错误时，立刻停止编译
    //设置failOnHint参数
		// jshint to not interrupt the compilation
		// if you want any file with jshint errors to fail
		// set failOnHint to true
		failOnHint: false,

		// 自定义报告函数
		reporter: function(errors) { }
	}
}
```

### 自定义报告函数
在默认情况下，`jshint-loader`会提供一个默认的报告方法。
然而，如果你想自定义报告函数，你可以向`jshint`配置下 key 为`report`下的配置项传入自定义的函数（请参考上文的用法）
然后，jshint将会生成与以下示例结构一致的错误/警告信息（数组）给报告函数。
```js
[
{
    id:        [字符串, 通常是 '(error)'],
    code:      [字符串, 错误/警告（error/warning）code],
    reason:    [字符串, 错误/警告（error/warning）信息],
    evidence:  [字符串, 对应生成此错误的code]
    line:      [数字]
    character: [数字]
    scope:     [字符串, 信息作用域;
                通常是 '(main)' 除非代码被解析(eval)了]

    [+ 还有一些旧有的参数，一般用户不必了解]
},
// ...
// 更多的错误/警告
]
```
报告函数会将loader的上下文信息保存在`this`后执行。你可以使用`this.emitWarning(...)`或者`this.emitError(...)`方法,手动触发信息的报告。请参考[关于loader上下文的webpack文档](http://webpack.github.io/docs/loaders.html#loader-context).  
####**注意:** `jshint reporters` 是与  `jshint-loader` **不兼容**的!  
这是因为reporter的输入来源，只能从一个文件读取，而不能同时多个文件。在这种方式下的错误报告，是与jshint的[传统reporters](http://www.jshint.com/docs/reporters/) 不一样的，因为loader插件（例如 jshint-loader）是会在每一个源文件上执行的，所以它们的报告函数也会分别对应每一个源文件上执行。
This is due to the fact that reporter input is only processed from one file; not multiple files. Error reporting in this manner differs from [tranditional reporters](http://www.jshint.com/docs/reporters/) for jshint
since the loader plugin (i.e. jshint-loader) is executed for each source file; and thus the reporter is executed for each file.
webpack控制台输出的格式大致如下：
```js
...

WARNING in ./path/to/file.js
<reporter output>

...
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/jshint-loader/