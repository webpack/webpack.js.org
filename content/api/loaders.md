---
title: Loader API
sort: 4
contributors:
    - TheLarkInn
    - jhnns

---

Loaders are transformations that are applied on the source code of a module. They are functions (running in Node.js) that take the source of a resource file as the parameter and return the new source.

## How to write a loader

A loader is just a JavaScript module that exports a function. The [loader runner](https://github.com/webpack/loader-runner) calls this function and passes the result of the previous loader or the resource file into it. The `this` context of the function is filled-in by webpack and the [loader runner](https://github.com/webpack/loader-runner) with some useful methods that allow the loader (among other things) to change its invocation style to async, or get query parameters. The first loader is passed one argument: the content of the resource file. The compiler expects a result from the last loader. The result should be a `String` or a `Buffer` (which is converted to a string), representing the JavaScript source code of the module. An optional SourceMap result (as JSON object) may also be passed.

A single result can be returned in **sync mode**. For multiple results the `this.callback()` must be called. In **async mode** `this.async()` must be called to indicate that the [loader runner](https://github.com/webpack/loader-runner) should wait for an asynchronous result. It returns `this.callback()`. Then the loader must return `undefined` and call that callback.

## Examples

### Sync Loader

**sync-loader.js**

```javascript
module.exports = function(content) {
    return someSyncOperation(content);
};
```

**sync-loader-with-multiple-results.js**

```javascript
module.exports = function(content) {
    this.callback(null, someSyncOperation(content), sourceMaps, ast);
    return; // always return undefined when calling callback()
};
```

### Async Loader

**async-loader.js**

```javascript
module.exports = function(content) {
    var callback = this.async();
    someAsyncOperation(content, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
    });
};
```

**async-loader-with-multiple-results.js**

```javascript
module.exports = function(content) {
    var callback = this.async();
    someAsyncOperation(content, function(err, result, sourceMaps, ast) {
        if(err) return callback(err);
        callback(null, result, sourceMaps, ast);
    });
};
```

T> Loaders were originally designed to work in synchronous loader pipelines, like Node.js (using [enhanced-require](https://github.com/webpack/enhanced-require)), *and* asynchronous pipelines, like in webpack. However, since expensive synchronous computations are a bad idea in a single-threaded environment like Node.js, we advise to make your loader asynchronously if possible. Synchronous loaders are ok if the amount of computation is trivial.

### "Raw" Loader

By default, the resource file is converted to a UTF-8 string and passed to the loader. By setting the `raw` flag, the loader will receive the raw `Buffer`. Every loader is allowed to deliver its result as `String` or as `Buffer`. The compiler converts them between loaders.

**raw-loader.js**

```javascript
module.exports = function(content) {
	assert(content instanceof Buffer);
	return someSyncOperation(content);
	// return value can be a `Buffer` too
	// This is also allowed if loader is not "raw"
};
module.exports.raw = true;
```

### Pitching Loader

Loaders are **always** called from right to left. But, in some cases, loaders do not care about the results of the previous loader or the resource. They only care for **metadata**. The `pitch` method on the loaders is called from **left to right** before the loaders are called (from right to left).

If a loader delivers a result in the `pitch` method the process turns around and skips the remaining loaders, continuing with the calls to the more left loaders. `data` can be passed between pitch and normal call.

```javascript
module.exports = function(content) {
	return someSyncOperation(content, this.data.value);
};
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
	if(someCondition()) {
		// fast exit
		return "module.exports = require(" + JSON.stringify("-!" + remainingRequest) + ");";
	}
	data.value = 42;
};
```

## The loader context

The loader context represents the properties that are available inside of a loader assigned to the `this` property.

Given the following example this require call is used:
In `/abc/file.js`:

```javascript
require("./loader1?xyz!loader2!./resource?rrr");
```

### `this.version`

**Loader API version.** Currently `2`. This is useful for providing backwards compatibility. Using the version you can specify custom logic or fallbacks for breaking changes.  

### `this.context`

**The directory of the module.** Can be used as context for resolving other stuff.

In the example: `/abc` because `resource.js` is in this directory

### `this.request`

The resolved request string.

In the example: `"/abc/loader1.js?xyz!/abc/node_modules/loader2/index.js!/abc/resource.js?rrr"`

### `this.query`

1. In case the loader was configured with an [`options`](/configuration/module/#useentry) object, this will be a reference to the object.
2. If the loader has no `options`, but was invoked with a query string, this will be a string starting with `?`.

T> Use the [`getOptions` method from the `loader-utils`](https://github.com/webpack/loader-utils#getoptions) to extract the given loader options.

### `this.callback`

A function that can be called synchronously or asynchronously in order to return multiple results. The expected arguments are:

```typescript
this.callback(
    err: Error | null,
    content: string | Buffer,
    sourceMap?: SourceMap,
    abstractSyntaxTree?: AST
);
```

1. The first argument must be an `Error` or `null`
2. The second argument a `string` or a [`Buffer`](https://nodejs.org/api/buffer.html).
3. Optional: The third argument must be a source map that is parsable by [this module](https://github.com/mozilla/source-map).
4. Optional: `AST` can be an Abstract Syntax Tree of the given language, like [`ESTree`](https://github.com/estree/estree). This value is ignored by webpack itself, but useful to speed up the build time if you want to share common ASTs between loaders.

In case this function is called, you should return undefined to avoid ambigious loader results.

### `this.async`

Tells the [loader-runner](https://github.com/webpack/loader-runner) that the loader intends to call back asynchronously. Returns `this.callback`.

### `this.data`

A data object shared between the pitch and the normal phase.

### `this.cacheable`

A function that sets the cacheable flag:

```typescript
cacheable(flag = true: boolean)
```

By default, loader results are flagged as cacheable. Call this method passing `false` to make the loader's result not cacheable.

A cacheable loader must have a deterministic result, when inputs and dependencies haven't changed. This means the loader shouldn't have other dependencies than specified with `this.addDependency`.

### `this.loaders`

An array of all the loaders. It is writeable in the pitch phase.

```typescript
loaders = [{request: string, path: string, query: string, module: function}]
```

In the example:

```javascript
[
  { request: "/abc/loader1.js?xyz",
	path: "/abc/loader1.js",
	query: "?xyz",
	module: [Function]
  },
  { request: "/abc/node_modules/loader2/index.js",
	path: "/abc/node_modules/loader2/index.js",
	query: "",
	module: [Function]
  }
]
```

### `this.loaderIndex`

The index in the loaders array of the current loader.

In the example: in loader1: `0`, in loader2: `1`

### `this.resource`

The resource part of the request, including query.

In the example: `"/abc/resource.js?rrr"`

### `this.resourcePath`

The resource file.

In the example: `"/abc/resource.js"`

### `this.resourceQuery`

The query of the resource.

In the example: `"?rrr"`

### `this.target`

Target of compilation. Passed from configuration options.

Example values: `"web"`, `"node"`

### `this.webpack`

This boolean is set to true when this is compiled by webpack.

T> Loaders were originally designed to also work as Babel transforms. Therefore if you write a loader that works for both, you can use this property to know if there is access to additional loaderContext and webpack features.

### `this.sourceMap`

Should a source map be generated. Since generating source maps can be an expensive task, you should check if source maps are actually requested.

### `this.emitWarning`

```typescript
emitWarning(message: string)
```

Emit a warning.

### `this.emitError`

```typescript
emitError(message: string)
```

Emit an error.

### `this.loadModule`

```typescript
loadModule(request: string, callback: function(err, source, sourceMap, module))
```

Resolves the given request to a module, applies all configured loaders and calls back with the generated source, the sourceMap and the module instance (usually an instance of [`NormalModule`](https://github.com/webpack/webpack/blob/master/lib/NormalModule.js)). Use this function if you need to know the source code of another module to generate the result.

### `this.resolve`

```typescript
resolve(context: string, request: string, callback: function(err, result: string))
```

Resolve a request like a require expression.

### `this.addDependency`

```typescript
addDependency(file: string)
dependency(file: string) // shortcut
```

Adds a file as dependency of the loader result in order to make them watchable. For example, [`html-loader`](https://github.com/webpack/html-loader) uses this technique as it finds `src` and `src-set` attributes. Then, it sets the url's for those attributes as dependencies of the html file that is parsed.  

### `this.addContextDependency`

```typescript
addContextDependency(directory: string)
```

Add a directory as dependency of the loader result.

### `this.clearDependencies`

```typescript
clearDependencies()
```

Remove all dependencies of the loader result. Even initial dependencies and these of other loaders. Consider using `pitch`.

### `this.emitFile`

```typescript
emitFile(name: string, content: Buffer|string, sourceMap: {...})
```

Emit a file. This is webpack-specific.

### `this.fs`

Access to the `compilation`'s `inputFileSystem` property.

## Deprecated context properties

W> The usage of these properties is highly discouraged since we are planing to remove them from the context. They are still listed here for documentation purposes.

### `this.exec`

```typescript
exec(code: string, filename: string)
```

Execute some code fragment like a module.

### `this.resolveSync`

```typescript
resolveSync(context: string, request: string) -> string
```

Resolve a request like a require expression.

### `this.value`

Pass values to the next loader. If you know what your result exports if executed as module, set this value here (as a only element array).

### `this.inputValue`

Passed from the last loader. If you would execute the input argument as module, consider reading this variable for a shortcut (for performance).

### `this.options`

The options passed to the Compiler.

### `this.debug`

A boolean flag. It is set when in debug mode.

### `this.minimize`

Should the result be minimized.

### `this._compilation`

Hacky access to the Compilation object of webpack.

### `this._compiler`

Hacky access to the Compiler object of webpack.

### `this._module`

Hacky access to the Module object being loaded.
