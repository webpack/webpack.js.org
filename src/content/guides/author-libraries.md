---
title: Authoring Libraries
sort: 7
contributors:
  - pksjce
  - johnstew
  - simon04
  - 5angel
  - marioacc
  - byzyk
  - EugeneHlushko
  - AnayaDesign
  - chenxsan
  - wizardofhogwarts
---

Aside from applications, webpack can also be used to bundle JavaScript libraries. The following guide is meant for library authors looking to streamline their bundling strategy.

## Authoring a Library

Let's assume that we are writing a small library, `webpack-numbers`, that allows users to convert the numbers 1 through 5 from their numeric representation to a textual one and vice-versa, e.g. 2 to 'two'.

The basic project structure would look like this:

**project**

```diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

Initialize the project with npm, then install `webpack`, `webpack-cli` and `lodash`:

```bash
npm init -y
npm install --save-dev webpack wepack-cli lodash
```

We install `lodash` as `devDependencies` instead of `dependencies` because we don't want to bundle it into our library, or our library could be easily bloated.

**src/ref.json**

```json
[
  {
    "num": 1,
    "word": "One"
  },
  {
    "num": 2,
    "word": "Two"
  },
  {
    "num": 3,
    "word": "Three"
  },
  {
    "num": 4,
    "word": "Four"
  },
  {
    "num": 5,
    "word": "Five"
  },
  {
    "num": 0,
    "word": "Zero"
  }
]
```

**src/index.js**

```js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ''
  );
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}
```

## Webpack Configuration

Let's start with this basic webpack configuration:

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
  },
};
```

It should be familiar have you used webpack to bundle your application. Basically, we're telling webpack to bundle `src/index.js` into `dist/webpack-numbers.js`.

## Expose the Library

So far everything should be the same as bundling an application, and here comes the different part – we need to expose exports from the entry point through [`output.library`](/configuration/output/#outputlibrary) option.

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
+     library: "webpackNumbers",
    },
  };
```

We exposed the entry point as `webpackNumbers` so users can use it through script tag:

```html
<script src="https://example.org/webpack-numbers.js"></script>
<script>
  window.webpackNumbers.wordToNum('Five');
</script>
```

However it only works when it's referenced through script tag, it can't be used in other environments like CommonJS, AMD, Node.js, etc.

As a library author, we want it to be compatible in different environments, i.e., users should be able to consume the bundled library in multiple ways listed below:

- **CommonJS module require**:

  ```js
  const webpackNumbers = require('webpack-numbers');
  // ...
  webpackNumbers.wordToNum('Two');
  ```

- **AMD module require**:

  ```js
  require(['webpackNumbers'], function (webpackNumbers) {
    // ...
    webpackNumbers.wordToNum('Two');
  });
  ```

- **script tag**:

  ```html
  <!DOCTYPE html>
  <html>
    ...
    <script src="https://example.org/webpack-numbers.js"></script>
    <script>
      // ...
      // Global variable
      webpackNumbers.wordToNum('Five');
      // Property in the window object
      window.webpackNumbers.wordToNum('Five');
      // ...
    </script>
  </html>
  ```

Let's update the `output.library` option with its `type` set to [`'umd'`](/configuration/output/#type-amd):

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'webpack-numbers.js',
-    library: 'webpackNumbers',
+    library: {
+      name: 'webpackNumbers',
+      type: 'umd',
+    },
   },
 };
```

Now webpack will bundle a library that can work with CommonJS, AMD, and script tag.

T> Note that the `library` setup is tied to the `entry` configuration. For most libraries, specifying a single entry point is sufficient. While [multi-part libraries](https://github.com/webpack/webpack/tree/master/examples/multi-part-library) are possible, it is simpler to expose partial exports through an [index script](https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file) that serves as a single entry point. Using an `array` as an `entry` point for a library is **not recommended**.

## Externalize Lodash

Now, if you run `npx webpack`, you will find that a largish bundle is created. If you inspect the file, you'll see that lodash has been bundled along with your code. In this case, we'd prefer to treat `lodash` as a _peer dependency_. Meaning that the consumer should already have `lodash` installed. Hence you would want to give up control of this external library to the consumer of your library.

This can be done using the [`externals`](/configuration/externals/) configuration:

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
      library: {
        name: "webpackNumbers",
        type: "umd"
      },
    },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_',
+     },
+   },
  };
```

This means that your library expects a dependency named `lodash` to be available in the consumer's environment.

### External Limitations

For libraries that use several files from a dependency:

```js
import A from 'library/one';
import B from 'library/two';

// ...
```

You won't be able to exclude them from the bundle by specifying `library` in the externals. You'll either need to exclude them one by one or by using a regular expression.

```js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // Everything that starts with "library/"
    /^library\/.+$/,
  ],
};
```

## Final Steps

Optimize your output for production by following the steps mentioned in the [production guide](/guides/production). Let's also add the path to your generated bundle as the package's `main` field in with the `package.json`

**package.json**

```json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

Or, to add it as a standard module as per [this guide](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage):

```json
{
  ...
  "module": "src/index.js",
  ...
}
```

The key `main` refers to the [standard from `package.json`](https://docs.npmjs.com/files/package.json#main), and `module` to [a](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md) [proposal](https://github.com/rollup/rollup/wiki/pkg.module) to allow the JavaScript ecosystem upgrade to use ES2015 modules without breaking backwards compatibility.

W> The `module` property should point to a script that utilizes ES2015 module syntax but no other syntax features that aren't yet supported by browsers or node. This enables webpack to parse the module syntax itself, allowing for lighter bundles via [tree shaking](https://webpack.js.org/guides/tree-shaking/) if users are only consuming certain parts of the library.

Now you can [publish it as an npm package](https://docs.npmjs.com/getting-started/publishing-npm-packages) and find it at [unpkg.com](https://unpkg.com/#/) to distribute it to your users.

T> To expose stylesheets associated with your library, the [`MiniCssExtractPlugin`](/plugins/mini-css-extract-plugin) should be used. Users can then consume and load these as they would any other stylesheet.
