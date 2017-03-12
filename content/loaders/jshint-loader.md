---
title: jshint-loader
source: https://raw.githubusercontent.com/webpack-contrib/jshint-loader/master/README.md
edit: https://github.com/webpack-contrib/jshint-loader/edit/master/README.md
---
## Install

```bash
npm i jshint-loader --save
```

## Usage

Apply the jshint loader as pre/postLoader in your webpack configuration:

``` javascript
module.exports = {
	module: {
		preLoaders: [
			{
				test: /\.js$/, // include .js files
				exclude: /node_modules/, // exclude any and all files in the node_modules folder
				loader: "jshint-loader"
			}
		]
	},

	// more options in the optional jshint object
	jshint: {
		// any jshint option http://www.jshint.com/docs/options/
		// i. e.
		camelcase: true,

		// jshint errors are displayed by default as warnings
		// set emitErrors to true to display them as errors
		emitErrors: false,

		// jshint to not interrupt the compilation
		// if you want any file with jshint errors to fail
		// set failOnHint to true
		failOnHint: false,

		// custom reporter function
		reporter: function(errors) { }
	}
}
```

## Custom reporter

By default, `jshint-loader` will provide a default reporter.

However, if you prefer a custom reporter, pass a function under the `reporter` key in `jshint` options. (see *usage* above)

The reporter function will be passed an array of errors/warnings produced by jshint
with the following structure:
```js
[
{
    id:        [string, usually '(error)'],
    code:      [string, error/warning code],
    reason:    [string, error/warning message],
    evidence:  [string, a piece of code that generated this error]
    line:      [number]
    character: [number]
    scope:     [string, message scope;
                usually '(main)' unless the code was eval'ed]

    [+ a few other legacy fields that you don't need to worry about.]
},
// ...
// more errors/warnings
]
```

The reporter function will be excuted with the loader context as `this`. You may emit messages using `this.emitWarning(...)` or `this.emitError(...)`. See [webpack docs on loader context](http://webpack.github.io/docs/loaders.html#loader-context).

**Note:** jshint reporters are **not compatible** with jshint-loader!
This is due to the fact that reporter input is only processed from one file; not multiple files. Error reporting in this manner differs from [tranditional reporters](http://www.jshint.com/docs/reporters/) for jshint
since the loader plugin (i.e. jshint-loader) is executed for each source file; and thus the reporter is executed for each file.

The output in webpack CLI will usually be:
```js
...

WARNING in ./path/to/file.js
<reporter output>

...
```
`

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/jshint-loader.svg
[npm-url]: https://npmjs.com/package/jshint-loader

[deps]: https://david-dm.org/webpack-contrib/jshint-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/jshint-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/jshint-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/jshint-loader
