---
title: react-proxy-loader
source: https://raw.githubusercontent.com/webpack-contrib/react-proxy-loader/master/README.md
edit: https://github.com/webpack-contrib/react-proxy-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/react-proxy-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]

[![chat][chat]][chat-url]



Wraps a react component in a proxy component to enable Code Splitting, which
loads a react component and its dependencies on demand.

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `react-proxy-loader`:

```console
$ npm install react-proxy-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

``` js
// returns the proxied component, loaded on demand
// webpack creates an additional chunk for this component and its dependencies
const Component = require('react-proxy-loader!./Component');

// returns a mixin for the proxied component
// This allows you to setup rendering for the loading state for the proxy
const ComponentProxyMixin = require('react-proxy-loader!./Component').Mixin;

const ComponentProxy = React.createClass({
	mixins: [ComponentProxyMixin],
	renderUnavailable: function() {
		return <p>Loading...</p>;
	}
});
```

Or specify the proxied components in your configuration:

``` js
// webpack.config.js
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

Or provide a chunk name within a `name` query parameter:

``` js
var Component = require("react-proxy-loader?name=chunkName!./Component");
```

And run `webpack` via your preferred method.


## License

#### [MIT](https://raw.githubusercontent.com/webpack-contrib/react-proxy-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/react-proxy-loader.svg
[npm-url]: https://npmjs.com/package/react-proxy-loader

[node]: https://img.shields.io/node/v/react-proxy-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/react-proxy-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/react-proxy-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/react-proxy-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/react-proxy-loader

[cover]: https://codecov.io/gh/webpack-contrib/react-proxy-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/react-proxy-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
