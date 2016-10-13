---
title: Resolve
contributors:
    - pksjce
---

### Overview

`webpack` resolves file paths using the resolver. This resolver can be configured to have new or changed defaults.
Have a look at [Module Resolution](concepts/module-resolution) for more explanation of how the resolver works.

### `resolve`

``` javascript
    module.exports = {
        entry: 'index.js',
        output: {
            filename: 'bundle.js'
        },
        resolve: {
            /* resolver options */
        }
    }
```

* `resolve.alias`

This is a hashmap with key as module name and value as corresponding module paths. Can be used as shortcuts to long module paths.
If the the key ends with $ only the exact match (without the $) will be replaced.
If the value is a relative path it will be relative to the file containing the require.

| `alias:` | `require("xyz")` | `require("xyz/file.js")` |
| -------- | ---------------- | -------------------------|
| `{}` | `/abc/node_modules/xyz/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "/abs/path/to/file.js" }` | `/abs/path/to/file.js` | error |
| `{ xyz$: "/abs/path/to/file.js" }` | `/abs/path/to/file.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "./dir/file.js" }` | `/abc/dir/file.js` | error |
| `{ xyz$: "./dir/file.js" }` | `/abc/dir/file.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "/some/dir" }` | `/some/dir/index.js` | `/some/dir/file.js` |
| `{ xyz$: "/some/dir" }` | `/some/dir/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "./dir" }` | `/abc/dir/index.js` | `/abc/dir/file.js` |
| `{ xyz: "modu" }` | `/abc/node_modules/modu/index.js` | `/abc/node_modules/modu/file.js` |
| `{ xyz$: "modu" }` | `/abc/node_modules/modu/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "modu/some/file.js" }` | `/abc/node_modules/modu/some/file.js` | error |
| `{ xyz: "modu/dir" }` | `/abc/node_modules/modu/dir/index.js` | `/abc/node_modules/dir/file.js` |
| `{ xyz: "xyz/dir" }` | `/abc/node_modules/xyz/dir/index.js` | `/abc/node_modules/xyz/dir/file.js` |
| `{ xyz$: "xyz/dir" }` | `/abc/node_modules/xyz/dir/index.js` | `/abc/node_modules/xyz/file.js` |

`index.js` may resolve to another file if defined in the `package.json`.

`/abc/node_modules` may resolve in `/node_modules` too.

* `resolve.root`

The directory (absolute path) that contains your modules. May also be an array of directories. This setting should be used to add individual directories to the search path.
It must be an absolute path! Don’t pass something like ./app/modules.

```
var path = require('path');

// ...
resolve: {
  root: [
    path.resolve('./app/modules'),
    path.resolve('./vendor/modules')
  ]
}
```

* `resolve.modules`

An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules. This functions similarly to how node finds “node_modules” directories. For example, if the value is ["mydir"], webpack will look in “./mydir”, “../mydir”, “../../mydir”, etc.
Has combined `resolve.root`, `resolve.modulesDirectories` and `resolve.fallback`
Default : `["web_modules", "node_modules", path.resolve(__dirname, "app")]`

* `resolve.descriptionFiles`

Default: `["package.json"]`
The JSON files to use for descriptions.

* `resolve.mainFields`
Default: `["main"]`
The field in the description file to pick the file while resolving directories.

* `resolve.mainFiles`
Default: `["index"]`
The filename to be used while resolving directories.

* `resolve.aliasFields`
Default: `["browser"]`
These fields in the description files offer aliasing in this package.
The content of these fields is an object where requests to a key are mapped to the corresponding value.

* `resolve.extensions`

An array of extensions that should be used to resolve modules. For example, in order to discover CoffeeScript files, your array should contain the string `".coffee"`.

T> IMPORTANT: Setting this option will override the default, meaning that `webpack` will no longer try to resolve modules using the default extensions. If you want modules that were required with their extension (e.g. `require('./somefile.ext')`) to be properly resolved, you must include an empty string in your array. Similarly, if you want modules that were required without extensions (e.g. `require('underscore')`) to be resolved to files with `“.js”` extensions, you must include `".js"` in your array.

* `resolve.enforceExtension`
Default: `false`
If false it will also try to use no extension from above

* `resolve.moduleExtensions`
Example: `['-loaders']`
These extensions are tried when resolving a module

* `resolve.enforceModuleExtension`
Default: `false`
If false it's also try to use no module extension from above

* `resolve.resolveToContext`
Default: `false`
If true, trying to resolve a context to its absolute path ends when a directory is found.

* `resolve.unsafeCache`
Default: `false`
Boosts performance by aggressive caching. Enable aggressive but unsafe caching for the resolving of a part of your files. Changes to cached paths may cause failure (in rare cases). An array of RegExps, only a RegExp or true (all files) is expected. If the resolved path matches, it’ll be cached.


### `resolveLoader`
Like resolve but for loaders

Default:
``` javascript
{
    modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
    packageMains: ["webpackLoader", "webLoader", "loader", "main"]
}
```
T> Note that you can use alias here and other features familiar from resolve. For example `{ txt: 'raw-loader' }` would shim `txt!templates/demo.txt` to use `raw-loader`.

* `resolveLoader.moduleTemplates`

That's a `resolveLoader` only property.
It describes alternatives for the module name that are tried.
Default: `["*-webpack-loader", "*-web-loader", "*-loader", "*"]`
