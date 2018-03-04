---
title: i18n-loader
source: https://raw.githubusercontent.com/webpack-contrib/i18n-loader/master/README.md
edit: https://github.com/webpack-contrib/i18n-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/i18n-loader
---


##  用法

### ./colors.json

``` javascript
{
	"red": "red",
	"green": "green",
	"blue": "blue"
}
```

### ./de-de.colors.json

``` javascript
{
	"red": "rot",
	"green": "gr�n"
}
```

### 调用

``` javascript
// 假如我们的所在区域是 "de-de-berlin"
var locale = require("i18n!./colors.json");

// 等待准备就绪，在一个 web 项目中所有地区只需要一次
// 因为所有地区的语言被合并到一个块中
locale(function() {
	console.log(locale.red); // 输出 rot
	console.log(locale.blue); // 输出 blue
});
```

### 配置

如果想要一次加载然后可以同步地使用，
你应该告诉 loader 所有要使用的地区。

``` javascript
{
  "i18n": {
    "locales": [
      "de",
      "de-de",
      "fr"
    ],
    // "bundleTogether": false
    // 可以禁止所有地区打包到一起
  }
}
```

### 可选的调用方法

``` javascript
require("i18n/choose!./file.js"); // 根据地区选择正确的文件，
					// 但是不会合并到对象中
require("i18n/concat!./file.js"); // 拼接所有合适的地区
require("i18n/merge!./file.js"); // 合并到对象中
					// ./file.js 在编译时会被排除掉
require("i18n!./file.json") == require("i18n/merge!json!./file.json")
```

如果需要在 node 中使用，不要忘记填补（polyfill）`require`。
可以参考 `webpack` 文档。

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/i18n-loader/
