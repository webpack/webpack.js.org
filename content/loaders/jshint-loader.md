---
title: jshint-loader
source: https://raw.githubusercontent.com/webpack-contrib/jshint-loader/master/README.md
edit: https://github.com/webpack-contrib/jshint-loader/edit/master/README.md
---
# jshint loader for webpack

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

### Custom reporter

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

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
