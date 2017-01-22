---
title: react-proxy-loader
source: https://raw.githubusercontent.com/webpack/react-proxy-loader/master/README.md
edit: https://github.com/webpack/react-proxy-loader/edit/master/README.md
---
# react-proxy-loader

Wraps a react component in a proxy component to enable Code Splitting (loads a react component and its dependencies on demand).

## installation

`npm install react-proxy-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` js
var Component = require("react-proxy-loader!./Component");
// => returns the proxied component (It loads on demand.)
// (webpack creates an additional chunk for this component and its dependencies)

var ComponentProxyMixin = require("react-proxy-loader!./Component").Mixin;
// => returns a mixin for the proxied component
// (This allows you to setup rendering for the loading state for the proxy)
var ComponentProxy = React.createClass({
	mixins: [ComponentProxyMixin],
	renderUnavailable: function() {
		return <p>Loading...</p>;
	}
});
```

The proxy is a react component. All properties are transferred to the wrapped component.

### Configuration

Instead of (or in addition to) inlining the loader call you can also specify the proxied components in your configuration:

``` js
module.exports = {
	module: {
		loaders: [
			/* ... */
			{
				test: [
					/component\.jsx$/, // select component by RegExp
					/\.async\.jsx$/, // select component by extension
					"/abs/path/to/component.jsx" // absolute path to component
				],
				loader: "react-proxy-loader"
			}
		]
	}
};
```

### Chunk name

You can give the chunk a name with the `name` query parameter:

``` js
var Component = require("react-proxy-loader?name=chunkName!./Component");
```

# License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/react-proxy-loader/