---
title: Authoring Libraries
contributors:
    - pksjce
    - johnstew
    - simon04
---

webpack is a tool which can be used to bundle application code and also to bundle library code. If you are the author of a JavaScript library and are looking to streamline your bundle strategy then this document will help you.

## Author a Library

Let's assume that you are writing a small library `webpack-numbers` allowing to convert numbers 1 to 5 from their numeric to a textual representation and vice-versa. The implementation makes use of ES2015 modules, and might look like this:

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

The usage spec for the library will be as follows.

```javascript
import * as webpackNumbers from 'webpack-numbers';

...
webpackNumbers.wordToNum('Two') // output is 2
...

// CommonJS modules

var webpackNumbers = require('webpack-numbers');

...
webpackNumbers.numToWord(3); // output is Three
...
```

```html
// Or as a script tag

<html>
...
<script src="https://unpkg.com/webpack-numbers"></script>
<script>
    ...
    /* webpackNumbers is available as a global variable */
    webpackNumbers.wordToNum('Five') //output is 5
    ...
</script>
</html>
```

For full library configuration and code please refer to [webpack-library-example](https://github.com/kalcifer/webpack-library-example)

## Configure webpack

Now the agenda is to bundle this library
  - Without bundling `lodash` but requiring it to be loaded by the consumer.
  - Name of the library is `webpack-numbers` and the variable is `webpackNumbers`.
  - Library can be imported as `import webpackNumbers from 'webpack-numbers'` or `require('webpack-numbers')`.
  - Library can be accessed through global variable `webpackNumbers` when included through `script` tag.
  - Library can be accessed inside Node.js.

### Add webpack

Add basic webpack configuration.

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

This adds basic configuration to bundle the library.

### Add `externals`

Now, if you run `webpack`, you will find that a largish bundle file is created. If you inspect the file, you will find that lodash has been bundled along with your code.
It would be unnecessary for your library to bundle a library like `lodash`. Hence you would want to give up control of this external library to the consumer of your library.

This can be done using the `externals` configuration as

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

### Add `libraryTarget`

For widespread use of the library, we would like it to be compatible in different environments, i. e. CommonJS, AMD, Node.js and as a global variable.

To make your library available for reuse, add `library` property in webpack configuration.

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

This makes your library bundle to be available as a global variable when imported.
To make the library compatible with other environments, add `libraryTarget` property to the config.

__webpack.config.js__

```javascript
module.exports = {
    ...
    output: {
        ...
        library: 'webpackNumbers',
        libraryTarget: 'umd' // Possible value - amd, commonjs, commonjs2, commonjs-module, this, var
    }
    ...
};
```

If `library` is set and `libraryTarget` is not, `libraryTarget` defaults to `var` as specified in the [config reference](/configuration/output).

### Final Steps

[Tweak your production build using webpack](/guides/production-build).

Add the path to your generated bundle as the package's main file in `package.json`

__package.json__

```javascript
{
    "main": "dist/webpack-numbers.js",
    "module": "src/index.js", // To add as standard module as per https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage
}
```

The key `main` refers to the [standard from `package.json`](https://docs.npmjs.com/files/package.json#main), and `module` to [a](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md) [proposal](https://github.com/rollup/rollup/wiki/pkg.module) to allow the JavaScript ecosystem upgrade to use ES2015 modules without breaking backwards compatibility.

W> `module` will point to a module that has ES2015 module syntax but otherwise only syntax features that browser/node supports.

Now you can [publish it as an npm package](https://docs.npmjs.com/getting-started/publishing-npm-packages) and find it at [unpkg.com](https://unpkg.com/#/) to distribute it to your users.
