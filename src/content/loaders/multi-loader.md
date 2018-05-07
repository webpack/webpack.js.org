---
title: multi-loader
source: https://raw.githubusercontent.com/webpack-contrib/multi-loader/master/README.md
edit: https://github.com/webpack-contrib/multi-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/multi-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]



A `webpack` loader for splitting modules and using multiple loaders. This loader
requires a module multiple times, each time loaded with different loaders, as
defined in your config.

_Note: In a multi-entry, the exports of the last item are exported._

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `multi-loader`:

```console
$ npm install multi-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

```js
// webpack.config.js
const multi = require('multi-loader');
{
	module: {
		loaders: [
			{
				test: /\.css$/,
				// Add CSS to the DOM and return the raw content
				loader: multi(
					'style-loader!css-loader!autoprefixer-loader',
					'raw-loader'
				)
			}
		]
	}
}
```

And run `webpack` via your preferred method.

## License

#### [MIT](https://raw.githubusercontent.com/webpack-contrib/multi-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/multi-loader.svg
[npm-url]: https://npmjs.com/package/multi-loader

[node]: https://img.shields.io/node/v/multi-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/multi-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/multi-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/multi-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/multi-loader

[cover]: https://codecov.io/gh/webpack-contrib/multi-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/multi-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack