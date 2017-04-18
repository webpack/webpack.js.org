---
title: DllPlugin
contributors:
  - aretecode
  - sokra
  - opiepj
---

The `DllPlugin` and `DllReferencePlugin` provide means to split bundles in a way that can drastically improve build time performance.

[DllPlugin](#DllPlugin) is used in a separate webpack config exclusively to create a dll-only-bundle. It creates a `manifest.json` file, which used by the [DllReferencePlugin](#DllReferencePlugin) to map dependencies.

[DllReferencePlugin](#DllReferencePlugin) is used in the primary webpack config, it references the dll-only-bundle(s) to require pre-built dependencies.

[See a usage example](https://github.com/webpack/webpack/tree/master/examples/dll)


## `DllPlugin`

* `path`: **absolute path** to the manifest json file (output)
* `name`: name of the exposed dll function
* `context` (optional): context of requests in the manifest file (defaults to the webpack context.)

Creates a `manifest.json` which is written to the given `path`. It contains mappings from require and import requests, to module ids. It is used by the [DllReferencePlugin](#DllReferencePlugin).


W> Keep the `name` consistent with `output.library`.

Combine this plugin with `output.library` option to expose (aka, put into the global scope) the dll function.

```javascript
new DllPlugin({
  context: __dirname,
  path: path.join(__dirname, "manifest.json"),
  name: "[name]_[hash]"
})
```


### `DllReferencePlugin`

* `context`: (**absolute path**) context of requests in the manifest (or content property)
* `scope` (optional): prefix which is used for accessing the content of the dll
* `manifest` (object): an object containing `content` and `name`
* `name` (optional): the name where the dll is exposed (defaults to `manifest.name`) (see also `externals`)
* `sourceType` (optional): how the dll is exposed (defaults to `"var"`) (see also `externals`)
* `content` (optional): the mappings from request to module id (defaults to `manifest.content`)


References a dll manifest file to map dependency names to module ids, then requires them as needed using the internal `__webpack_require__` function.


```javascript
new DllReferencePlugin({
  context: __dirname,
  scope: "xyz",
  manifest: require("./manifest.json"),
  name: "./my-dll.js",
  sourceType: "commonsjs2",
  content: { ... }
})
```

Can be used in two different modes:

**Scoped mode**

The content of the dll is accessible under a module prefix. i.e. with `scope = "xyz"` a file `abc` in the dll can be access via `require("xyz/abc")`.

**Mapped mode**

The content of the dll is mapped to the current directory. If a required file matches a file in the dll (after resolving), then the file from the dll is used instead.

T> because this happens after resolving every file in the dll bundle, the same paths must be available for the consumer of the dll bundle. i.e. if the dll contains `jquery` and the file `abc`, `require("jquery")` and `require("./abc")` will be used from the dll, rather than building them into the main bundle.

?> add a node.js example to [webpack/examples](https://github.com/webpack/webpack/tree/master/examples)

<!--
**Example:**

[Usage example][examples-dll]

#### Using dlls via `<script>` tags

Dll bundle: `output.library = "[name]_[hash]"` `output.libraryTarget = "var"` `DllPlugin.name = "[name]_[hash]"`

Dll consumer: `DllReferencePlugin.sourceType = "var"`

#### Using dlls via node.js

Dll bundle: `output.libraryTarget = "commonjs2"`

Dll consumer: `DllReferencePlugin.sourceType = "commonjs2"` `DllReferencePlugin.name = "./path/to/dll.js"`
-->

### More

#### Examples
[code splitting example][examples-explicit-vendor-chunk]
[usage example](https://github.com/webpack/webpack/tree/master/examples/dll)

#### Source
- [DllPlugin source][src-DllPlugin]
- [DllReferencePlugin source][src-DllReferencePlugin]

#### Tests
- [DllPlugin creation test][tests-DllPlugin-0]
- [DllPlugin without scope test][tests-DllPlugin-2]

[examples-dll]: https://github.com/webpack/webpack/tree/master/examples/dll-user
[examples-explicit-vendor-chunk]: https://github.com/webpack/webpack/tree/master/examples/explicit-vendor-chunk/README.md
[src-DllReferencePlugin]: https://github.com/webpack/tree/master/lib/DllReferencePlugin.js
[src-DllPlugin]: https://github.com/webpack/webpack/tree/master/lib/DllPlugin.js
[tests-DllPlugin-0]: https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin/0-create-dll/webpack.config.js
[tests-DllPlugin-2]: https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin/2-use-dll-without-scope/webpack.config.js
