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

Let's assume that you are writing a small library ,`webpack-numbers`, that allows users to convert the numbers 1 through 5 from their numeric representation to a textual one and vice-versa, e.g. 2 to 'two'.

The basic project structure may look like this:

__project__

``` diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

Initialize npm, install webpack and lodash:

``` bash
npm init -y
npm install --save-dev webpack lodash
```

__src/ref.json__

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

__src/index.js__

``` js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
}

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
}
```

The usage specification for the library use will be as follows:

- __ES2015 module import:__

``` js
import * as webpackNumbers from 'webpack-numbers';
// ...
webpackNumbers.wordToNum('Two');
```

- __CommonJS module require:__

``` js
const webpackNumbers = require('webpack-numbers');
// ...
webpackNumbers.wordToNum('Two');
```

- __AMD module require:__

``` js
require(['webpackNumbers'], function (webpackNumbers) {
  // ...
  webpackNumbers.wordToNum('Two');
});
```

The consumer also can use the library by loading it via a script tag:

``` html
<!doctype html>
<html>
  ...
  <script src="https://unpkg.com/webpack-numbers"></script>
  <script>
    // ...
    // Global variable
    webpackNumbers.wordToNum('Five')
    // Property in the window object
    window.webpackNumbers.wordToNum('Five')
    // ...
  </script>
</html>
```

Note that we can also configure it to expose the library in the following ways:

- Property in the global object, for node.
- Property in the `this` object.

For full library configuration and code please refer to [webpack-library-example](https://github.com/kalcifer/webpack-library-example).


## Base Configuration

Now let's bundle this library in a way that will achieve the following goals:

- Using `externals` to avoid bundling `lodash`, so the consumer is required to load it.
- Setting the library name as `webpack-numbers`.
- Exposing the library as a variable called `webpackNumbers`.
- Being able to access the library inside Node.js.

Also, the consumer should be able to access the library in the following ways:

- ES2015 module. i.e. `import webpackNumbers from 'webpack-numbers'`.
- CommonJS module. i.e. `require('webpack-numbers')`.
- Global variable when included through `script` tag.



We can start with this basic webpack configuration:

__webpack.config.js__

``` js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js'
  }
};
```

## Base Configuration with source map 
 Source maps is a useful debugging tool to enable you to view where the original code was
 For more information about getting source maps setup and available options please refer to:
 https://webpack.js.org/configuration/devtool/
 To see code examples please refer to this repo:
 https://github.com/webpack/webpack/tree/master/examples/source-map

``` js
const path = require('path');

module.exports = [
  'source-map'
].map(devtool =>({
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js'
  },
  devtool,
  optimization: {
    runtimeChunk: true
  }
}));
 ```

## Externalize Lodash

Now, if you run `webpack`, you will find that a largish bundle is created. If you inspect the file, you'll see that lodash has been bundled along with your code. In this case, we'd prefer to treat `lodash` as a `peerDependency`. Meaning that the consumer should already have `lodash` installed. Hence you would want to give up control of this external library to the consumer of your library.

This can be done using the `externals` configuration:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js'
-   }
+   },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_'
+     }
+   }
  };
```

This means that your library expects a dependency named `lodash` to be available in the consumer's environment.

T> Note that if you only plan on using your library as a dependency in another webpack bundle, you may specify `externals` as an array.


## External Limitations

For libraries that use several files from a dependency:

``` js
import A from 'library/one';
import B from 'library/two';

// ...
```

You won't be able to exclude them from the bundle by specifying `library` in the externals. You'll either need to exclude them one by one or by using a regular expression.

``` js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // Everything that starts with "library/"
    /^library\/.+$/
  ]
};
```


## Expose the Library

For widespread use of the library, we would like it to be compatible in different environments, i.e. CommonJS, AMD, Node.js and as a global variable. To make your library available for consumption, add the `library` property inside `output`:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
-     filename: 'webpack-numbers.js'
+     filename: 'webpack-numbers.js',
+     library: 'webpackNumbers'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

T> Note that the `library` setup is tied to the `entry` configuration. For most libraries, specifying a single entry point is sufficient. While [multi-part libraries](https://github.com/webpack/webpack/tree/master/examples/multi-part-library) are possible, it is simpler to expose partial exports through an [index script](https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file) that serves as a single entry point. Using an `array` as an `entry` point for a library is __not recommended__.

This exposes your library bundle available as a global variable named `webpackNumbers` when imported. To make the library compatible with other environments, add `libraryTarget` property to the config. This will add various options about how the library can be exposed.

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
-     library: 'webpackNumbers'
+     library: 'webpackNumbers',
+     libraryTarget: 'umd'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

You can expose the library in the following ways:

- Variable: as a global variable made available by a `script` tag (`libraryTarget:'var'`).
- This: available through the `this` object (`libraryTarget:'this'`).
- Window: available through the `window` object, in the browser (`libraryTarget:'window'`).
- UMD: available after AMD or CommonJS `require` (`libraryTarget:'umd'`).

If `library` is set and `libraryTarget` is not, `libraryTarget` defaults to `var` as specified in the [output configuration documentation](/configuration/output). See [`output.libraryTarget`](/configuration/output#outputlibrarytarget) there for a detailed list of all available options.

W> With webpack 3.5.5, using `libraryTarget: { root:'_' }` doesn't work properly (as stated in [issue 4824](https://github.com/webpack/webpack/issues/4824)). However, you can set `libraryTarget: { var: '_' }` to expect the library as a global variable.


### Final Steps

Optimize your output for production by following the steps mentioned in the [production guide](/guides/production). Let's also add the path to your generated bundle as the package's `main` field in with the `package.json`

__package.json__

``` json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

Or, to add it as a standard module as per [this guide](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage):

``` json
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
