---
title: Resolve
contributors:
  - sokra
  - gregvenech
  - SpaceK33z
---

These options change how modules are resolved. webpack provides reasonable defaults, but it is possible to change the resolving in detail.

### `resolve`

`object`

Configure how modules are resolved. For example, when calling `import "lodash"` in ES6, the `resolve` options can change where webpack goes to look for `"lodash"` (see [`modules`](#resolve-modules)).


### `resolve.modules`

`array`

Tell webpack what directories should be searched when resolving modules.

Absolute and relative paths can both be used, but be aware that they will behave a bit different.

A relative path will be scanned simarly to how Node scans for `node_modules`, by looking through the current directory as well as it's ancestors (i.e. `./node_modules`, `../node_modules`, and on).

With an absolute path, it will only search in the given directory.

`resolve.modules` defaults to:

```js
modules: ["node_modules"]
```

If you want to add a directory to search in that takes precedences over `node_modules/`:

```js
modules: [path.resolve(__dirname, "src"), "node_modules"]
```


### `resolve.extensions`

`array`

Automatically resolve certain extensions. This defaults to:

```js
extensions: [ ".js", ".json" ]
```

which is what enables users to leave off the extension when importing:

```js
import File from '../path/to/file'
```

W> Using this will **override the default array**, meaning that webpack will no longer try to resolve modules using the default extensions. For modules that are imported with their extension, e.g. `import SomeFile from "./somefile.ext"`, to be properly resolved, an empty string must be included in the array.


### `resolve.alias`

`object`

Create aliases to `import` or `require` certain modules more easily. For example, to alias a bunch of commonly used `src/` folders:

```js
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}
```

Now, instead of using relative paths when importing like so:

```js
import Utility from '../../utilities/utility';
```

you can use the alias:

```js
import Utility from 'Utilities/utility';
```

A trailing `$` can also be added to the given object's keys to signify an exact match:

```js
alias: {
  xyz$: path.resolve(__dirname, 'path/to/file.js')
}
```

which would yield these results:

```js
import Test1 from 'xyz'; // Success, file.js is resolved and imported
import Test2 from 'xyz/file.js'; // Error, /path/to/file.js/file.js is invalid
```


### `resolve.mainFields`

`array`

When importing from an npm package, e.g. `import * as D3 from "d3"`, this option will determine which fields in it's `package.json` are checked. It defaults to:

```js
mainFields: ["browser", "module", "main"]
```

For example, the `package.json` of [D3](https://d3js.org/) contains these fields:

```js
{
  ...
  main: 'build/d3.node.js',
  browser: 'build/d3.js',
  module: 'index',
  ...
}
```

This means that when we `import * as D3 from "d3"` this will really resolve to the file in the `browser` property. The `browser` property takes precedence here because it's the first item in `mainFields`.

### `resolve.aliasFields`

`string`

Specify a field, such as `browser`, to be parsed according to [this specification](https://github.com/defunctzombie/package-browser-field-spec). Default:

```js
aliasFields: ["browser"]
```


### `resolve.unsafeCache`

`regex` `array` `boolean`

Enable aggressive, but **unsafe**, caching of modules. Passing `true` will cache everything. A regular expression, or an array of regular expressions, can be used to test file paths and only cache certain modules. For example, to only cache utilities:

```js
unsafeCache: /src\/utilities/
```

W> Changes to cached paths may cause failure in rare cases.


### `resolveLoader`

`object`

This set of options is identical to the `resolve` set above, but is used only to resolve webpack's [loader](/concepts/loaders) packages.
