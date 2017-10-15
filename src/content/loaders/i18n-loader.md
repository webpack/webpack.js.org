---
title: i18n-loader
source: https://raw.githubusercontent.com/webpack-contrib/i18n-loader/master/README.md
edit: https://github.com/webpack-contrib/i18n-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/i18n-loader
---


## Usage

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

### call it

``` javascript
// assuming our locale is "de-de-berlin"
var locale = require("i18n!./colors.json");

// wait for ready, this is only required once for all locales in a web app
// because all locales of the same language are merged into one chuck
locale(function() {
	console.log(locale.red); // prints rot
	console.log(locale.blue); // prints blue
});
```

### options

You should tell the loader about all your locales, if you want to load them once
and than want to use them synchronous.

``` javascript
{
	"i18n": {
		"locales": [
			"de",
			"de-de",
			"fr"
		],
		// "bundleTogether": false
		// this can disable the bundling of locales
	}
}
```

### alternative calls

``` javascript
require("i18n/choose!./file.js"); // chooses the correct file by locale,
					// but it do not merge the objects
require("i18n/concat!./file.js"); // concatinate all fitting locales
require("i18n/merge!./file.js"); // merges the resulting objects
					// ./file.js is excuted while compiling
require("i18n!./file.json") == require("i18n/merge!json!./file.json")
```

Don't forget to polyfill `require` if you want to use it in node.
See `webpack` documentation.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)