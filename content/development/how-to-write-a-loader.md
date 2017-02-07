---
title: How to write a loader?
sort: 3
---

A loader is a node module exporting a `function`.

This function is called when a resource should be transformed by this loader.

In the simple case, when only a single loader is applied to the resource, the loader is called with one parameter: the content of the resource file as string.

The loader can access the [loader API](/api/loaders/) on the `this` context in the function.

A sync loader that only wants to give a one value can simply `return` it. In every other case the loader can give back any number of values with the `this.callback(err, values...)` function. Errors are passed to the `this.callback` function or thrown in a sync loader.

The loader is expected to give back one or two values. The first value is a resulting JavaScript code as string or buffer. The second optional value is a SourceMap as JavaScript object.

In the complex case, when multiple loaders are chained, only the last loader gets the resource file and only the first loader is expected to give back one or two values (JavaScript and SourceMap). Values that any other loader give back are passed to the previous loader.

## Examples

``` javascript
// Identity loader
module.exports = function(source) {
  return source;
};
```

``` javascript
// Identity loader with SourceMap support
module.exports = function(source, map) {
  this.callback(null, source, map);
};
```

## Guidelines

(Ordered by priority, first one should get the highest priority)

* Loaders should do only a single task
* Loaders can be chained. Create loaders for every step, instead of a loader that does everything at once.

This also means they should not convert to JavaScript if not necessary.

Example: Render HTML from a template file by applying the query parameters

I could write a loader that compiles the template from source, execute it and return a module that exports a string containing the HTML code. This is bad.

Instead I should write loaders for every task in this use case and apply them all (pipeline):

* `jade-loader`: Convert template to a module that exports a function.
* `apply-loader`: Takes a function exporting module and returns raw result by applying query parameters.
* `html-loader`: Takes HTML and exports a string exporting module.

### Generate modules that are modular

Loader generated modules should respect the same design principles like normal modules.

Example: That's a bad design: (not modular, global state, ...)

```javascript
require("any-template-language-loader!./xyz.atl");

var html = anyTemplateLanguage.render("xyz");
```

### Flag itself cacheable if possible

Most loaders are cacheable, so they should flag itself as cacheable.

Just call `cacheable` in the loader.

```javascript
// Cacheable identity loader
module.exports = function(source) {
  this.cacheable();
  return source;
};
```

### Do not keep state between runs and modules

A loader should be independent of other modules compiled (except of these issued by the loader).

A loader should be independent of previous compilations of the same module.

### Mark dependencies

If a loader uses external resources (i. e. by reading from filesystem), they **must** tell about that. This information is used to invalidate cacheable loaders and recompile in watch mode.

``` javascript
// Loader adding a header
var path = require("path");
module.exports = function(source) {
  this.cacheable();
  var callback = this.async();
  var headerPath = path.resolve("header.js");
  this.addDependency(headerPath);
  fs.readFile(headerPath, "utf-8", function(err, header) {
    if(err) return callback(err);
    callback(null, header + "\n" + source);
  });
};
```

### Resolve dependencies

In many languages there is some schema to specify dependencies. i. e. in css there is `@import` and `url(...)`. These dependencies should be resolved by the module system.

There are two options to do this:

* Transform them to `require`s.
* Use the `this.resolve` function to resolve the path

Example 1 `css-loader`: The `css-loader` transform dependencies to `require`s, by replacing `@import`s with a require to the other stylesheet (processed with the `css-loader` too) and `url(...)` with a `require` to the referenced file.

Example 2 `less-loader`: The `less-loader` cannot transform `@import`s to `require`s, because all less files need to be compiled in one pass to track variables and mixins. Therefore the `less-loader` extends the less compiler with a custom path resolving logic. This custom logic uses `this.resolve` to resolve the file with the configuration of the module system (aliasing, custom module directories, etc.).

If the language only accept relative urls (like css: `url(file)` always means `./file`), there is the `~`-convention to specify references to modules:

``` text
url(file) -> require("./file")
url(~module) -> require("module")
```

### Extract common code

Don't generate much code that is common in every module processed by that loader. Create a (runtime) file in the loader and generate a `require` to that common code.

## Do not embed absolute paths

Don't put absolute paths in to the module code. They break hashing when the root for the project is moved. There is a method [`stringifyRequest` in loader-utils](https://github.com/webpack/loader-utils#stringifyrequest) which converts an absolute path to an relative one.

**Example:**

``` js
var loaderUtils = require("loader-utils");

return "var runtime = require(" +
  loaderUtils.stringifyRequest(this, "!" + require.resolve("module/runtime")) +
  ");";
```

### Use a library as `peerDependencies` when they wrap it

using a peerDependency allows the application developer to specify the exact version in `package.json` if desired. The dependency should be relatively open to allow updating the library without needing to publish a new loader version.

``` javascript
"peerDependencies": {
  "library": "^1.3.5"
}
```

### Programmable objects as `query`-option

there are situations where your loader requires programmable objects with functions which cannot stringified as `query`-string. The `less-loader`, for example, provides the possibility to specify [LESS-plugins](https://github.com/webpack/less-loader#less-plugins). In these cases, a loader is allowed to extend webpack's `options`-object to retrieve that specific option. In order to avoid name collisions, however, it is important that the option is namespaced under the loader's camelCased npm-name.

**Example:**

```javascript
// webpack.config.js
module.exports = {
  ...
  lessLoader: {
    lessPlugins: [
      new LessPluginCleanCSS({advanced: true})
    ]
  }
};
```

The loader should also allow to specify the config-key (e.g. `lessLoader`) via `query`. See [discussion](https://github.com/webpack/less-loader/pull/40) and [example implementation](https://github.com/webpack/less-loader/blob/39f742b4624fceae6d9cf266e9554d07a32a9c14/index.js#L49-51).
