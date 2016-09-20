---
title: Module
contributors:
  - sokra
  - gregvenech
---

### `module`

`object`

These options determine how the [different types of modules](/concepts/everything-is-a-module) within a project will be treated.


### Loader Objects

Loader objects are used in a few places throughout the configuration. They identify groups of modules using regular expressions. [Loaders](/concepts/loaders) can then be used, and chained together, to process, transform, or manipulate that group of modules in a variety of ways. Loader objects can contain the following properties:

`test: /\.js/` - Identify one or more file extensions using a [regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp), string, or function

`include: /\/src/` - Include modules using a regex, string, or function

`exclude: /node_modules/` - Exclude modules using a regex, string, or function

`loader: "babel-loader!eslint-loader"` - A `!` delimited string of loaders to use on these modules

`loaders: [ "babel-loader", "eslint-loader" ]` - An array of loaders to use on these modules

T> Loaders are always read from **right to left** whether passed via a string or an array. In the example above, the [eslint-loader](https://github.com/MoOx/eslint-loader) will lint the JavaScript modules and then hand them off to the [babel-loader](https://github.com/babel/babel-loader) for transpiling. It's useful to think of this process as a series of nested function calls, i.e. `babelLoader(eslintLoader(...))`, each one passing it's return value on to the next.


### `module.preLoaders`

`array`

An array of [loader objects](#loader-objects) to be used as the first step in the loading process. In the example above, linting could be broken out into a *preLoader*:

```js
module: {
  preLoaders: [
    { test: /\.js/, exclude: /node_modules/, loader: 'eslint-loader' }
  ],
  ...
}
```


### `module.loaders`

`array`

An array of [loader objects](#loader-objects) to be used as the second step in the loading process. Many times `module.loaders` will be the only set of loader objects needed. A basic configuration might look like this:

```js
module: {
  loaders: [
    { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader!eslint-loader' },
    { test: /\.css/, loader: 'style-loader!css-loader' },
    { test: /\.(jpg|png|gif), loader: 'file-loader!img-loader' }
  ]
}
```


### `module.postLoaders`

`array`

An array of [loader objects](#loader-objects) to be used as the last step in the loading process.

?> Any good examples?


### `module.noParse`

`regex` `array`

Prevent webpack from parsing any files matching the given regular expression(s). Ignored files **should not** have calls to `import`, `require`, `define` or any other importing mechanism. This can boost build performance when ignoring large libraries...

```js
noParse: /jquery|backbone/
```


### Module Contexts

General description...

Here are the available options with their defaults:

```js
module: {
  ...,
  unknownContextRequest: ".",
  unknownContextRegExp: /^\.\/.*$/,
  unknownContextRecursive: true,
  unknownContextCritical: true,
  exprContextRequest: ".",
  exprContextRegExp: /^\.\/.*$/,
  exprContextRecursive: true,
  exprContextCritical: true,
  wrappedContextRegExp: /.*/,
  wrappedContextRecursive: true,
  wrappedContextCritical: false
}
```

?> Need help on this, frankly I haven't needed these options and am a bit confused about what they're used for even after reading through the [current section](http://webpack.github.io/docs/configuration.html#automatically-created-contexts-defaults-module-xxxcontextxxx) a few times.
