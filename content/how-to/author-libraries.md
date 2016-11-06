---
title: How to Author Libraries?
contributors:
    - pksjce
---

webpack is a tool which can be used to bundle application code and also to bundle library code. If you are the author of a JavaScript library and are looking to streamline your bundle strategy then this document will help you.

## Author a Library

We have here a small wrapper library to convert number 1 to 5 from number to word and vice-versa. It looks something like this.

__index.js__
```javascript
import _ from 'lodash';
import numRef from './ref.json';

const numToWord = function(num) {
        return _.reduce(numRef, (accum, ref) => {
            return ref.num === num ? ref.word : accum;
        }, '');
    };

const wordToNum = function(word) {
        return _.reduce(numRef, (accum, ref) => {
            return ref.word === word && word.toLowerCase() ? ref.num : accum;
        }, -1);
    };

export {numToWord, wordToNum}

```

The usage spec for the library will be as follows.

```javascript
// ES2015 modules

import webpackNumbers from 'webpack-numbers';

    ...
    webpackNumbers.wordToNum('Two') /// output is 2
    ...

// CommonJs modules

var webpackNumbers = require('webpack-numbers');
...
webpackNumbers.numToWord(3); // output is Three
...

// As a script tag

<html>
...
<script src='https://unpkg.com/webpack-numbers' type='text/javascript'/>
<script type='text/javascript'>
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
  - Without bundling lodash but requiring it to be loaded by the consumer.
  - Name of the library is `webpack-numbers` and the variable is `webpackNumbers`.
  - Library can be imported as `import webpackNumbers from 'webpack-numbers'` or `require('webpack-numbers')`.
  - Library can be accessed through global variable `webpackNumbers` when included through `script` tag.
  - Library can be accessed inside Node.js.

### Add webpack

Add basic webpack configuration.

__webpack.config.js__
```javascript

module.exports = {
    entry: './index.js',
    output: {
        path: './dist',
        filename: 'webpack-numbers.js'
    }
};

```

This adds basic configuration to bundle the library.

### Add Loaders

But it will not work without adding relevant loaders for transpiling the code.
Here, we need a [`json-loader`](https://github.com/webpack/json-loader) is required to precompile our json fixture file.

```javascript
module.exports = {
    // ...
    module: {
        rules: [{
            test: /.json$/,
            use: 'json-loader'
        }]
    }
};
```
### Add `externals`

Now, if you run `webpack`, you will find that a largish bundle file is created. If you inspect the file, you will find that lodash has been bundled along with your code.
It would be unnecessary for your library to bundle a library like `lodash`. Hence you would want to give up control of this external library to the consumer of your library.

This can be done using the `externals` configuration as

```javascript
module.exports = {
    ...
    externals: [{
        '_' : 'lodash'
    }]
    ...
};
```

This means that your library expects `lodash` to be available in the consumers environment, with a global name of `_`. It essentially aliases `_` to the library `lodash`.
Also this configuration prevents webpack from bundling this external library to your library code.

### Add `libraryTarget`

For widespread use of the library, we would like it to be compatible in different environments, ie CommonJs, AMD, nodejs and as a global variable.

To make your library available for reuse, add `library` property in webpack configuration.

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

```javascript
module.exports = {
    ...
    output: {
        ...
        library: 'webpackNumbers',
        libraryTarget:'umd' // Possible value - amd, commonjs, commonjs2, commonjs-module, this, var
    }
    ...
};
```

If `library` property is set and `libraryTarget` is set to be `var` by default, as given in the [config reference](/configuration/output).

### Final Steps

[Tweak your production build using webpack](/how-to/generate-production-build).

Add the path to your generated bundle as the package's main file in `package.json`

```json
{
    ...
    "main": "dist/webpack-numbers.js"
    ...
}
```

Now you can [publish it as an npm package](https://docs.npmjs.com/getting-started/publishing-npm-packages) and find it at [unpkg.com](https://unpkg.com/#/) to distribute it to your users.