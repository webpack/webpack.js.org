---
title: Resolve
contributors:
  - sokra
  - gregvenech
---

?> Add a description

### `resolve`

`object`

Configure how modules are resolved. For example, when calling `import "lodash"` in ES6, the `resolve` options can change where webpack goes to look for `"lodash"` (see [`modulesDirectories`](#resolve-modulesdirectories)).


### `resolve.root`

`string` `array`

Tell webpack what directories should be searched when resolving modules. 

```js
root: path.resolve(__dirname, 'src')
```

W> The value or values **must be an absolute path(s)**.


### `resolve.fallback`

`string` `array`

Add a fallback(s) for instances where webpack is unable to resolve a module in the given `root` or `modulesDirectories`. This option takes the same values as `root` above.

W> As with `root`, the value or values **must be an absolute path(s)**.


### `resolve.modulesDirectories`

`array`

Determine what directories should be searched for installed packages and libraries. These directories will be scanned for similarly to how Node scans for `node_modules`... by looking through the current directory as well as it's ancestors (i.e. `./node_modules`, `../node_modules`, and on). It defaults to:

```js
modulesDirectories: [ "node_modules", "web_modules" ]
```

Unlike `root` and `fallback`, **absolute paths are not necessary** and should only be used when there is a hierarchy within these folders.


### `resolve.extensions`

`array`

Automatically resolve certain extensions. This defaults to:

```js
extensions: [ "", ".webpack.js", ".web.js", ".js" ]
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


### `resolve.packageMains`

`array`

When importing from an npm package, e.g. `import * as D3 from "d3"`, this option will determine which fields in it's `package.json` are checked. It defaults to:

```js
packageMains: [ "webpack", "browser", "web", "browserify", [ "jam", "main" ], "main" ]
```

For example, the current version of [D3](https://d3js.org/) (4.2.2) contains these fields:

```js
{
  ...
  main: 'build/d3.node.js',
  browser: 'build/d3.js',
  module: 'index',
  'jsnext:main': 'index',
  ...
}
```

This means that when we `import * as D3 from "d3"` this will really resolve to either the `main` or `browser` files. 

?> TODO: Discuss order here... I'm assuming they're read from left to right meaning `browser` is what would be imported in the example? What does the nested array, i.e. `[ "jam", "main" ]`, do?


### `resolve.packageAlias`

`string`

Specify a field, such as `browser`, to be parsed according to [this specification](https://github.com/defunctzombie/package-browser-field-spec).


### `resolve.unsafeCache`

`regex` `array` `boolean`

Enable aggressive, but **unsafe**, caching of modules. Passing `true` will cache everything. A regular expression, or an array of regular expressions, can be used to test file paths and only cache certain modules. For example, to only cache utilities:

```js
unsafeCache: /src\/utilities/
```

W> Changes to cached paths may cause failure in rare cases.
