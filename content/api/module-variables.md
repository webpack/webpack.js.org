---
title: Module API - Variables
sort: 3
contributors:
  - skipjack
  - sokra
related:
  - title: CommonJS
    url: https://en.wikipedia.org/wiki/CommonJS
  - title: Asynchronous Module Definition
    url: https://en.wikipedia.org/wiki/Asynchronous_module_definition
---

This is section covers all __variables__ available in code compiled with webpack. Modules will have access to certain data from the compilation process through `module` and other variables.


### `module.loaded` (NodeJS)

This is `false` if the module is currently executing, and `true` if the sync execution has finished.


### `module.hot` (webpack-specific)

Indicates whether or not [HMR](/concepts/hot-module-replacement) is enabled and provides an interface to the process.

?> Document all properties of the `module.hot` object


### `module.id` (CommonJS)

The ID of the current module.

``` javascript
module.id === require.resolve("./file.js")
```


### `module.exports` (CommonJS)

Defines the value that will be returned when a consumer makes a `require` call to the module (defaults to a new object).

``` javascript
module.exports = function doSomething() {
  // Do something...
};
```

W> This CANNOT be used in an asynchronous function.


### `exports` (CommonJS)

This variable is equal ot default value of `module.exports` (i.e. an object). If `module.exports` gets overwritten, `exports` will no longer be exported.

``` javascript
exports.someValue = 42;
exports.anObject = {
    x: 123
};
exports.aFunction = function doSomething() {
    // Do something
};
```


### `global` (NodeJS)

See [node.js global](http://nodejs.org/api/globals.html#globals_global).


### `process` (NodeJS)

See [node.js process](http://nodejs.org/api/process.html).


### `__dirname` (NodeJS)

Depending on the config option `node.__dirname`:

* `false`: Not defined
* `mock`: equal "/"
* `true`: [node.js __dirname](http://nodejs.org/api/globals.html#globals_dirname)

If used inside a expression that is parsed by the Parser, the config option is treated as `true`.


### `__filename` (NodeJS)

Depending on the config option `node.__filename`:

* `false`: Not defined
* `mock`: equal "/index.js"
* `true`: [node.js __filename](http://nodejs.org/api/globals.html#globals_filename)

If used inside a expression that is parsed by the Parser, the config option is treated as `true`.


### `__resourceQuery` (webpack-specific)

The resource query of the current module. If the following `require` call were made, then the query string would be available in `file.js`.

``` javascript
require('file.js?test')
```

__file.js__

``` javascript
__resourceQuery === '?test'
```


### `__webpack_public_path__` (webpack-specific)

Equals the config options `output.publicPath`.


### `__webpack_require__` (webpack-specific)

The raw require function. This expression isn't parsed by the Parser for dependencies.


### `__webpack_chunk_load__` (webpack-specific)

The internal chunk loading function. Takes two arguments:

* `chunkId` The id for the chunk to load.
* `callback(require)` A callback function called once the chunk is loaded.


### `__webpack_modules__` (webpack-specific)

Access to the internal object of all modules.


### `__webpack_hash__` (webpack-specific)

This variable is only available with the `HotModuleReplacementPlugin` or the `ExtendedAPIPlugin`. It provides access to the hash of the compilation.


### `__non_webpack_require__` (webpack-specific)

Generates a `require` function that is not parsed by webpack. Can be used to do cool stuff with a global require function if available.


### `DEBUG`  (webpack-specific)

Equals the config option `debug`.
