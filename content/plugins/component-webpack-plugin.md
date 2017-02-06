---
title: ComponentWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/component-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/component-webpack-plugin/edit/master/README.md
---
# component for webpack

## Usage

see an example here: [webpack/webpack/examples/component](https://github.com/webpack/webpack/tree/master/examples/component)

``` javascript
var ComponentPlugin = require("component-webpack-plugin");
module.exports = {
	plugins: [
		new ComponentPlugin();
	]
}
```

## Advanced usage

``` javascript
var ComponentPlugin = require("component-webpack-plugin");
module.exports = {
	plugins: [
		new ComponentPlugin({
			// Load xyz field in component.json
			xyz: true,
			// This is equal to: xyz: "[file]"
			
			// Load xyz field with the xyz-loader
			xyz: "!xyz-loader![file]",
			
			// This is default:
			// styles: "!style-loader!css-loader![file]"
		}, [
			// Lookup paths
			"component"
		]);
	]
}
```


## License

MIT (http://www.opensource.org/licenses/mit-license.php)