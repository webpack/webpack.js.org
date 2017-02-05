---
title: Dependency Management
sort: 60
contributors:
  - ndelangen
  - chrisVillanueva
---

> es6 modules

> commonjs

> amd

## require with expression

A context is created if your request contains expressions, so the **exact** module is not known on compile time.

Example:
```javascript
require("./template/" + name + ".ejs");
```

webpack parses the `require()` call and extracts some information:

```
Directory: ./template
Regular expression: /^.*\.ejs$/
```

**context module**

A context module is generated. It contains references to **all modules in that directory** that can be required with a request matching the regular expression. The context module contains a map which translates requests to module ids.

Example:
```javascript
{
    "./table.ejs": 42,
    "./table-row.ejs": 43,
    "./directory/folder.ejs": 44
}
```
The context module also contains some runtime logic to access the map.

This means dynamic requires are supported but will cause all possible modules to be included in the bundle.

## `require.context`

You can create your own context with the `require.context()` function.
It allows you to pass in a directory to search, a flag indicating whether subdirectories should be searched
too, and a regular expression to match files against.

webpack parses for `require.context()` in the code while building.

The syntax is as follows:

```javascript
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
```

Examples:

```javascript
require.context("./test", false, /\.test\.js$/);
// a context with files from the test directory that can be required with a request endings with `.test.js`.
```

```javascript
require.context("../", true, /\.stories\.js$/);
// a context with all files in the parent folder and descending folders ending with `.stories.js`.
```

### context module API
A context module exports a (require) function that takes one argument: the request.

The exported function has 3 properties: `resolve`, `keys`, `id`.

- `resolve` is a function and returns the module id of the parsed request.
- `keys` is a function that returns an array of all possible requests that the context module can handle.

  This can be useful if you want to require all files in a directory or matching a pattern, Example:

  ```javascript
  function importAll (r) {
    r.keys().forEach(r);
  }
  importAll(require.context('../components/', true, /\.js$/));
  ```

  ```javascript
  var cache = {};
  function importAll (r) {
    r.keys().forEach(key => cache[key] = r(key));
  }
  importAll(require.context('../components/', true, /\.js$/));
  // At build-time cache will be populated with all required modules.
  ```
- `id` is the module id of the context module. This may be useful for `module.hot.accept`.
