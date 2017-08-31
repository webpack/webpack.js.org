---
title: Authoring Libraries
sort: 12
contributors:
  - pksjce
  - johnstew
  - simon04
  - 5angel
  - marioacc
---

Aside from applications, webpack can also be used to bundle JavaScript libraries. The following guide is meant for library authors looking to streamline their bundling strategy.


## Authoring a Library

Let's assume that you are writing a small library ,`webpack-numbers`, allowing to convert numbers 1 to 5 from their numeric representation to the textual one and vice-versa, e.g.: 2 to 'two'.
The basic project structure may look like this.

__project__

``` diff
+  |webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

Initialize npm, install webpack and lodash

``` bash
npm init -y
npm install --save-dev webpack lodash
```

__src/ref.json__

```javascript
[{
    "num": 1,
    "word": "One"
}, {
    "num": 2,
    "word": "Two"
}, {
    "num": 3,
    "word": "Three"
}, {
    "num": 4,
    "word": "Four"
}, {
    "num": 5,
    "word": "Five"
}, {
    "num": 0,
    "word": "Zero"
}]
```

__src/index.js__

```javascript
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
    return _.reduce(numRef, (accum, ref) => {
        return ref.num === num ? ref.word : accum;
    }, '');
};

export function wordToNum(word) {
    return _.reduce(numRef, (accum, ref) => {
        return ref.word === word && word.toLowerCase() ? ref.num : accum;
    }, -1);
};
```

The usage specification for the library use will be as follows:

```javascript
// ES2015 module import
import * as webpackNumbers from 'webpack-numbers';
// CommonJS module require
var webpackNumbers = require('webpack-numbers');
...
// ES2015 and CommonJS module use
webpackNumbers.wordToNum('Two');
...
// AMD module require
require(['webpackNumbers'], function ( webpackNumbers) {
    ...
    // AMD module use
    webpackNumbers.wordToNum('Two');
    ...
});

```

The consumer also can use the library loading it with the script tag:

```html
<html>
...
<script src="https://unpkg.com/webpack-numbers"></script>
<script>
    ...
    // Global variable
    webpackNumbers.wordToNum('Five')
    // Property in the window object
    window.webpackNumbers.wordToNum('Five')

    ...
</script>
</html>
```

The configurations also can expose the library in the following ways:

- Property in the global object, for node.
- Property in the `this` object.


For full library configuration and code please refer to [webpack-library-example](https://github.com/kalcifer/webpack-library-example)


## Configure webpack

Now the plan is to bundle this library achieving the next goals:

- Without bundling `lodash`, but requiring it to be loaded by the consumer using `externals`.
- Setting the library name as `webpack-numbers`.
- Exposing the library as a variable called `webpackNumbers`.
- Being able to access the library inside Node.js.s

Also, the consumer will be able to access the library the following ways:

- ES2015 module. i.e. `import webpackNumbers from 'webpack-numbers'`.
- CommonJS module. i.e. `require('webpack-numbers')`.
- Global variable when included through `script` tag.



### Add webpack

Add this basic webpack configuration to bundle the library.

__webpack.config.js__

```javascript
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js'
    }
};

```



### Add `externals`

Now, if you run `webpack`, you will find that a largish bundle file is created. If you inspect the file, you will find that lodash has been bundled along with your code.
It would be unnecessary for your library to bundle a library like `lodash`. Hence you would want to give up control of this external library to the consumer of your library.

This can be done using the `externals` configuration as:

__webpack.config.js__

```javascript
module.exports = {
    ...
    externals: {
        "lodash": {
            commonjs: "lodash",
            commonjs2: "lodash",
            amd: "lodash",
            root: "_"
        }
    }
    ...
};
```

This means that your library expects a dependency named `lodash` to be available in the consumer's environment.

However, if you only plan on using your library as a dependency in another webpack bundle, you may specify externals as an array.

```javascript
module.exports = {
    ...
    externals: [
      'react',
      'react-dom'
    ]
    ...
};
```

Please note: for bundles that use several files from a package like this:

```javascript
import A from 'library/A';
import B from 'library/B';
...
```

you wont be able to exclude them from bundle by specifying `library` in the externals.

You'll either need to exclude them one by one or by using a regular expression.

```javascript
module.exports = {
    ...
    externals: [
      'library/A',
      'library/B',
      // everything that starts with "library/"
      /^library\/.+$/
    ]
    ...
};
```

W> With webpack 3.5.5, using the following configuration doesn't work properly as stated in [issue 4824](https://github.com/webpack/webpack/issues/4824):

```javascript
module.exports = {
    ...
    output: {
        ...

        libraryTarget: {
            root:'_'
        }
    }
    ...
};
```

W> However, you can set libraryTarget.var='_' to expect the library as a global variable

### Add `libraryTarget`

For widespread use of the library, we would like it to be compatible in different environments, i.e. CommonJS, AMD, Node.js and as a global variable.

To make your library available for reuse, add the `library` property inside `output` in the webpack configuration.

__webpack.config.js__

```javascript
module.exports = {
    ...
    output: {
        ...
        library: 'webpackNumbers'
    }
    ...
};
```

This makes your library bundle available as a global variable named `webpackNumbers` when imported. To make the library compatible with other environments, add `libraryTarget` property to the config. This will add the different options about how the library can be exposed.

__webpack.config.js__

```javascript
module.exports = {
    ...
    output: {
        ...
        library: 'webpackNumbers',
        libraryTarget: 'umd',
    }
    ...
};
```

You can expose the library in the following ways:

- Variable: as a global variable. Available in the `script` tag. i.e. `libraryTarget:'var'`.
- This: available trough the this object. i.e. `libraryTarget:'this'`.
- Window: available trough the `window` object, in the browser. i.e. `libraryTarget:'window'`.
- UMD: available after AMD or CommonJS `require`. i.e. `libraryTarget:'umd'`

If `library` is set and `libraryTarget` is not, `libraryTarget` defaults to `var` as specified in the [output configuration documentation](/configuration/output).
See [`output.libraryTarget`](/configuration/output#output-librarytarget) there for a detailed list of all available options.


### Final Steps

[Tweak your production build using webpack](/guides/production).

Add the path to your generated bundle as the package's main file in `package.json`

__package.json__

```javascript
{
    "main": "dist/webpack-numbers.js",
    // To add as standard module as per https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage
    "module": "src/index.js",
}
```

The key `main` refers to the [standard from `package.json`](https://docs.npmjs.com/files/package.json#main), and `module` to [a](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md) [proposal](https://github.com/rollup/rollup/wiki/pkg.module) to allow the JavaScript ecosystem upgrade to use ES2015 modules without breaking backwards compatibility.

W> `module` will point to a module that has ES2015 module syntax but otherwise only syntax features that browser/node supports.

Now you can [publish it as an npm package](https://docs.npmjs.com/getting-started/publishing-npm-packages) and find it at [unpkg.com](https://unpkg.com/#/) to distribute it to your users.
