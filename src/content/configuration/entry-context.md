---
title: Entry and Context
sort: 4
contributors:
  - sokra
  - skipjack
  - tarang9211
  - byzyk
  - madhavarshney
  - EugeneHlushko
  - smelukov
  - anshumanv
  - snitin315
---

The entry object is where webpack looks to start building the bundle. The context is an absolute string to the directory that contains the entry files.

## `context`

`string`

The base directory, an **absolute path**, for resolving entry points and loaders from configuration.

```js
const path = require('path');

module.exports = {
  //...
  context: path.resolve(__dirname, 'app'),
};
```

By default the current directory is used, but it's recommended to pass a value in your configuration. This makes your configuration independent from CWD (current working directory).

---

## `entry`

`string` `[string]` `object = { <key> string | [string] | object = { import string | [string], dependOn string | [string], filename string, layer string }}` `(function() => string | [string] | object = { <key> string | [string] } | object = { import string | [string], dependOn string | [string], filename string })`

The point or points where to start the application bundling process. If an array is passed then all items will be processed.

A dynamically loaded module is **not** an entry point.

Simple rule: one entry point per HTML page. SPA: one entry point, MPA: multiple entry points.

```js
module.exports = {
  //...
  entry: {
    home: './home.js',
    about: './about.js',
    contact: './contact.js',
  },
};
```

### Naming

If a string or array of strings is passed, the chunk is named `main`. If an object is passed, each key is the name of a chunk, and the value describes the entry point for the chunk.

### Entry descriptor

If an object is passed the value might be a string, array of strings or a descriptor:

```js
module.exports = {
  //...
  entry: {
    home: './home.js',
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    catalog: {
      import: './catalog.js',
      filename: 'pages/catalog.js',
      dependOn: 'shared',
    },
    personal: {
      import: './personal.js',
      filename: 'pages/personal.js',
      dependOn: 'shared',
      chunkLoading: 'jsonp',
      layer: 'name of layer', // set the layer for an entry point
    },
  },
};
```

Descriptor syntax might be used to pass additional options to an entry point.

### Output filename

By default, the output filename for the entry chunk is extracted from [`output.filename`](/configuration/output/#outputfilename) but you can specify a custom output filename for a specific entry:

```js
module.exports = {
  //...
  entry: {
    app: './app.js',
    home: { import: './contact.js', filename: 'pages/[name][ext]' },
    about: { import: './about.js', filename: 'pages/[name][ext]' },
  },
};
```

Descriptor syntax was used here to pass `filename`-option to the specific entry points.

### Dependencies

By default, every entry chunk stores all the modules that it uses. With `dependOn` option you can share the modules from one entry chunk to another:

```js
module.exports = {
  //...
  entry: {
    app: { import: './app.js', dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types'],
  },
};
```

The `app` chunk will not contain the modules that `react-vendors` has.

`dependOn` option can also accept an array of strings:

```js
module.exports = {
  //...
  entry: {
    moment: { import: 'moment-mini', runtime: 'runtime' },
    reactvendors: { import: ['react', 'react-dom'], runtime: 'runtime' },
    testapp: {
      import: './wwwroot/component/TestApp.tsx',
      dependOn: ['reactvendors', 'moment'],
    },
  },
};
```

Also, you can specify multiple files per entry using an array:

```js
module.exports = {
  //...
  entry: {
    app: { import: ['./app.js', './app2.js'], dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types'],
  },
};
```

### Dynamic entry

If a function is passed then it will be invoked on every [make](/api/compiler-hooks/#make) event.

> Note that the make event triggers when webpack starts and for every invalidation when [watching for file changes](/configuration/watch/).

```js
module.exports = {
  //...
  entry: () => './demo',
};
```

or

```js
module.exports = {
  //...
  entry: () => new Promise((resolve) => resolve(['./demo', './demo2'])),
};
```

For example: you can use dynamic entries to get the actual entries from an external source (remote server, file system content or database):

**webpack.config.js**

```js
module.exports = {
  entry() {
    return fetchPathsFromSomeExternalSource(); // returns a promise that will be resolved with something like ['src/main-layout.js', 'src/admin-layout.js']
  },
};
```

When combining with the [`output.library`](/configuration/output/#outputlibrary) option: If an array is passed only the last item is exported.
