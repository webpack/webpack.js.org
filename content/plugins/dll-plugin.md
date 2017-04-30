---
title: DllPlugin
contributors:
  - aretecode
  - sokra
  - opiepj
  - simon04
---

## Introduction

The `DllPlugin` and `DllReferencePlugin` provide means to split bundles in a way that can drastically improve build time performance.

[DllPlugin](#DllPlugin) is used in a separate webpack config exclusively to create a dll-only-bundle. It creates a `manifest.json` file, which is used by the [DllReferencePlugin](#DllReferencePlugin) to map dependencies.

[DllReferencePlugin](#DllReferencePlugin) is used in the primary webpack config, it references the dll-only-bundle(s) to require pre-built dependencies.



## `DllPlugin`

* `context` (optional): context of requests in the manifest file (defaults to the webpack context.)
* `name`: name of the exposed dll function ([TemplatePaths][src-TemplatedPathPlugin]: `[hash]` & `[name]` )
* `path`: **absolute path** to the manifest json file (output)

```javascript
new webpack.DllPlugin(options)
```

Creates a `manifest.json` which is written to the given `path`. It contains mappings from require and import requests, to module ids. It is used by the [DllReferencePlugin](#DllReferencePlugin).


W> Keep the `name` consistent with `output.library`.

Combine this plugin with `output.library` option to expose (aka, put into the global scope) the dll function.


### `DllReferencePlugin`

* `context`: (**absolute path**) context of requests in the manifest (or content property)
* `content` (optional): the mappings from request to module id (defaults to `manifest.content`)
* `manifest` (object): an object containing `content` and `name`
* `name` (optional): the name where the dll is exposed (defaults to `manifest.name`) (see also `externals`)
* `scope` (optional): prefix which is used for accessing the content of the dll
* `sourceType` (optional): how the dll is exposed ([libraryTarget][docs-libraryTarget])

```javascript
new webpack.DllReferencePlugin(options)
```

References a dll manifest file to map dependency names to module ids, then requires them as needed using the internal `__webpack_require__` function.


### Modes

Can be used in two different modes:

#### **Scoped mode**

The content of the dll is accessible under a module prefix. i.e. with `scope = "xyz"` a file `abc` in the dll can be access via `require("xyz/abc")`.

T> [See an example use of scope][examples-dll-user]


#### **Mapped mode**

The content of the dll is mapped to the current directory. If a required file matches a file in the dll (after resolving), then the file from the dll is used instead.

Because this happens after resolving every file in the dll bundle, the same paths must be available for the consumer of the dll bundle. i.e. if the dll contains `lodash` and the file `abc`, `require("lodash")` and `require("./abc")` will be used from the dll, rather than building them into the main bundle.

T> [See an example use of mapped mode][examples-dll-source-type-and-dependencies]



## Usage

W> `DllReferencePlugin` and `DllPlugin` are used in _separate_ webpack configs.


```javascript
// webpack.vendor.config.js
new webpack.DllPlugin({
  context: __dirname,
  name: "[name]_[hash]"
  path: path.join(__dirname, "manifest.json"),
})
```

```javascript
// webpack.app.config.js
new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require("./manifest.json"),
  name: "./my-dll.js",
  scope: "xyz",
  sourceType: "commonsjs2"
})
```


## **Examples**

### [vendor][examples-dll-vendor] and [user][examples-dll-user]

_Two separate example folders. Demonstrates scope, and context._

T> Multiple `DllPlugins` and multiple `DllReferencePlugins`.


### related

* [code splitting example][examples-explicit-vendor-chunk]



## More

### Source

* [DllPlugin source][src-DllPlugin]
* [DllReferencePlugin source][src-DllReferencePlugin]
* [DllModuleFactory source][src-DllModuleFactory]
* [ManifestPlugin source][src-ManifestPlugin]

### Tests

* [DllPlugin creation test][tests-DllPlugin-0]
* [DllPlugin without scope test][tests-DllPlugin-2]
* [DllReferencePlugin use Dll test][tests-DllPlugin-1]


[examples-examples]: https://github.com/webpack/webpack/tree/master/examples
[examples-dll-vendor]: https://github.com/webpack/webpack/tree/master/examples/dll
[examples-dll-user]: https://github.com/webpack/webpack/tree/master/examples/dll-user
[examples-explicit-vendor-chunk]: https://github.com/webpack/webpack/tree/master/examples/explicit-vendor-chunk/README.md

[src-DllReferencePlugin]: https://github.com/webpack/tree/master/lib/DllReferencePlugin.js
[src-DllPlugin]: https://github.com/webpack/webpack/tree/master/lib/DllPlugin.js
[src-DllEntryPlugin]: https://github.com/webpack/webpack/blob/master/lib/DllEntryPlugin.js
[src-DllModuleFactory]: https://github.com/webpack/webpack/blob/master/lib/DllModuleFactory.js
[src-ManifestPlugin]: https://github.com/webpack/webpack/blob/master/lib/LibManifestPlugin.js
[src-TemplatedPathPlugin]: https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js

[tests-DllPlugin-0]: https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin/0-create-dll/webpack.config.js
[tests-DllPlugin-1]: https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin
[tests-DllPlugin-2]: https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin/2-use-dll-without-scope/webpack.config.js

[docs-libraryTarget]: https://webpack.js.org/configuration/output/#output-librarytarget
