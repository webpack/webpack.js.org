---
title: Loader API
sort: 4
contributors:
    - TheLarkInn
---

Loaders allow you to preprocess files as you `require()` or “load” them. Loaders are kind of like “tasks” in other build tools,
and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like CoffeeScript to JavaScript), or inline images as data URLs. Loaders even allow you to do things like `require()` css files right in your JavaScript!

To tell webpack to transform a module with a loader, you can specify the loader in the webpack [configuration](/configuration) file (preferred) or in the module request, such as in a `require()` call.

?> When /concepts/loaders merges, we should link to the many usages of loaders found there (require vs configuration) from this page.

## How to write a loader

A loader is just a JavaScript module that exports a function. The compiler calls this function and passes the result of the previous loader or the resource file into it. The `this` context of the function is filled-in by the compiler with some useful methods that allow the loader (among other things) to change its invocation style to async, or get query parameters. The first loader is passed one argument: the content of the resource file. The compiler expects a result from the last loader. The result should be a `String` or a `Buffer` (which is converted to a string), representing the JavaScript source code of the module. An optional SourceMap result (as JSON object) may also be passed.

A single result can be returned in **sync mode**. For multiple results the `this.callback()` must be called. In **async mode** `this.async()` must be called. It returns `this.callback()` if **async mode** is allowed. Then the loader must return `undefined` and call the callback.

## Examples

### Sync Loader

**sync-loader.js**

```javascript
module.exports = function(content) {
    return someSyncOperation(content);
};
```

### Async Loader

**async-loader.js**

```javascript
module.exports = function(content) {
    var callback = this.async();
    if(!callback) return someSyncOperation(content);
    someAsyncOperation(content, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
    });
};
```

T> It’s recommended to give an asynchronous loader a fall-back to synchronous mode. This isn’t required for webpack, but allows the loader to run  synchronously using [enhanced-require](https://github.com/webpack/enhanced-resolve).

### "Raw" Loader

By default, the resource file is treated as utf-8 string and passed as String to the loader. By setting raw to true the loader is passed the raw `Buffer`. Every loader is allowed to deliver its result as `String` or as `Buffer`. The compiler converts them between loaders.

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

The order of chained loaders are **always** called from right to left. But, in some cases, loaders do not care about the results of the previous loader or the resource. They only care for **metadata**. The `pitch` method on the loaders is called from **left to right** before the loaders are called (from right to left).

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

### `version`

**Loader API version.** Currently `2`. This is useful for providing backwards compatibility. Using the version you can specify custom logic or fallbacks for breaking changes.  

### `context`

**The directory of the module.** Can be used as context for resolving other stuff.

In the example: `/abc` because `resource.js` is in this directory

### `request`

The resolved request string.

In the example: `"/abc/loader1.js?xyz!/abc/node_modules/loader2/index.js!/abc/resource.js?rrr"`

### `query`

A string. The query of the request for the current loader.

In the example: in loader1: `"?xyz"`, in loader2: `""`

### `data`

A data object shared between the pitch and the normal phase.

### `cacheable`

```typescript
cacheable(flag = true: boolean)
```

By default, loader results are cacheable. Call this method passing `false` to make the loader's result not cacheable.

A cacheable loader must have a deterministic result, when inputs and dependencies haven't changed. This means the loader shouldn't have other dependencies than specified with `this.addDependency`. Most loaders are deterministic and cacheable.

### `loaders`

```typescript
loaders = [{request: string, path: string, query: string, module: function}]
```

An array of all the loaders. It is writeable in the pitch phase.

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

### `loaderIndex`

The index in the loaders array of the current loader.

In the example: in loader1: `0`, in loader2: `1`

### `resource`

The resource part of the request, including query.

In the example: `"/abc/resource.js?rrr"`

### `resourcePath`

The resource file.

In the example: `"/abc/resource.js"`

### `resourceQuery`

The query of the resource.

In the example: `"?rrr"`

### `emitWarning`

```typescript
emitWarning(message: string)
```

Emit a warning.

### `emitError`

```typescript
emitError(message: string)
```

Emit an error.

### `exec`

```typescript
exec(code: string, filename: string)
```

Execute some code fragment like a module.

T> Don't use `require(this.resourcePath)`, use this function to make loaders chainable!

### `resolve`

```typescript
resolve(context: string, request: string, callback: function(err, result: string))
```

Resolve a request like a require expression.

### `resolveSync`

```typescript
resolveSync(context: string, request: string) -> string
```

Resolve a request like a require expression.

### `addDependency`

```typescript
addDependency(file: string)
dependency(file: string) // shortcut
```

Adds a file as dependency of the loader result in order to make them watchable. For example, [`html-loader`](https://github.com/webpack/html-loader) uses this technique as it finds `src` and `src-set` attributes. Then, it sets the url's for those attributes as dependencies of the html file that is parsed.  

### `addContextDependency`

```typescript
addContextDependency(directory: string)
```

Add a directory as dependency of the loader result.

### `clearDependencies`

```typescript
clearDependencies()
```

Remove all dependencies of the loader result. Even initial dependencies and these of other loaders. Consider using `pitch`.

### `value`

Pass values to the next loader. If you know what your result exports if executed as module, set this value here (as a only element array).

### `inputValue`

Passed from the last loader. If you would execute the input argument as module, consider reading this variable for a shortcut (for performance).

### `options`

The options passed to the Compiler.

### `debug`

A boolean flag. It is set when in debug mode.

### `minimize`

Should the result be minimized.

### `sourceMap`

Should a SourceMap be generated.

### `target`

Target of compilation. Passed from configuration options.

Example values: `"web"`, `"node"`

### `webpack`

This boolean is set to true when this is compiled by webpack.

T> Loaders were originally designed to also work as Babel transforms. Therefore if you write a loader that works for both, you can use this property to know if there is access to additional loaderContext and webpack features.

### `emitFile`

```typescript
emitFile(name: string, content: Buffer|String, sourceMap: {...})
```

Emit a file. This is webpack-specific.

### `fs`

Access to the `compilation`'s `inputFileSystem` property.

### `_compilation`

Hacky access to the Compilation object of webpack.

### `_compiler`

Hacky access to the Compiler object of webpack.

### `_module`

Hacky access to the Module object being loaded.

### Custom `loaderContext` Properties

Custom properties can be added to the `loaderContext` by either specifying values on the `loader` proprty on your webpack [configuration](/configuration), or by creating a [custom plugin](/api/plugins) that hooks into the `normal-module-loader` event which gives you access to the `loaderContext` to modify or extend.
