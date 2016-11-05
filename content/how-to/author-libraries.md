---
title: How to Author Libraries?
contributors:
    - pksjce
---

webpack is a tool which can be used to bundle application code and also to bundle library code. If you are the author of JavaScript library and are looking to streamline your bundle strategy then this document will help you.

## Author a library

We have here a small wrapper library to convert number 1 to 5 from number to word and vice-versa. It looks something like this.

__index.js__
```javascript
import _ from 'lodash';
import numRef from './ref.json';

function createTransalator() {
    return {
        numtoword: (num) => {
            return num < 0 || num > 5 ? 'This is a failure' : converttoword(num);
        },
        wordtonum: (word) => {
            const num = converttonum(word);
            return num === -1 ? 'This is a failure' : num;
        }
    };
}

const converttoword = (num) => {
    return _.reduce(numRef, (accum, ref) => {
        return ref.num === num ? ref.word : accum;
    }, '');
};

const converttonum = (word) => {
    return _.reduce(numRef, (accum, ref) => {
        return ref.word === word && word.toLowerCase() ? ref.num : accum;
    }, -1);
};

module.exports = createTransalator();

```

The usage spec for the library will be as follows.

```javascript
// ES2015 modules

import webpackNumbers from 'webpack-numbers';

    ...
    webpackNumbers.wordtonum('Two') /// output is 2
    ...

// CommonJs modules

var webpackNumbers = require('webpack-numbers');
...
webpackNumbers.numtoword(3); // output is Three
...

// As a script tag

<html>
...
<script src='https://unpkg.com/webpack-numbers' type='text/javascript'/>
<script type='text/javascript'>
    ...
    /* webpackNumbers is available as a global variable */
    webpackNumbers.wordtonum('Five') //output is 5
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
  - Library can be accessed inside nodejs.

### Add webpack

Add basic webpack configuration.
Also add a [`.babelrc`](https://babeljs.io/docs/usage/babelrc/) file so that you can write webpack config in es2015 syntax.

__webpack.config.babel.js__
```javascript
export default () => (
    {
        entry: './index.js',
        output: {
            path: './dist',
            filename: 'webpack-numbers.js'
        }
    }
);

```

This adds basic configuration to bundle the library.

### Add loaders

But it will not work without adding relevant loaders for transpiling the code.
We will add a `babel-loader` as our library is written in es2015 syntax. Add preset [`babel-preset-es2015-webpack`](https://www.npmjs.com/package/babel-preset-es2015-webpack) to transpile for webpack2.
Similarly a `json-loader` is required to precompile our json fixture file.

```javascript
export default () => (
    {
        ...
        module: {
            rules: [{
                test: /.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
                options: {
                    presets: ['es2015-webpack']
                }
            }, {
                test: /.json$/,
                exclude: /node_modules/,
                use: 'json-loader'
            }]
        }
    }
);
```
### Add `externals`

Now, if you run `webpack`, you will find that a largish bundle file is created. If you inspect the file, you will find that lodash has been bundled along with your code.
It would be unnecessary for your library to bundle a library like `lodash`. Hence you would want to give up control of this external library to the consumer of your library.

This can be done using the `externals` configuration as

```javascript
export.default () => ({
    ...
    externals: [{
        '_' : 'lodash'
    }]
    ...
})
```

This means that your library expects `lodash` to be available in the consumers environment, with a global name of `_`. It essentially aliases `_` to the library `lodash`.
Also this configuration prevents webpack from bundling this external library to your library code.

### Add `libraryTarget`

For widespread use of the library, we would like it to be compatible in different environments, ie CommonJs, AMD, nodejs and as a global variable.

To make your library available for reuse, add `library` property in webpack configuration.

```javascript
export default = () => ({
    ...
    output: {
        ...
        library: 'webpackNumbers'
    }
    ...
})
```

This makes your library bundle to be available as a global variable when imported.
To make the library compatible with other environments, add `libraryTarget` property to the config.

```javascript
export default = () => ({
    ...
    output: {
        ...
        library: 'webpackNumbers',
        libraryTarget:'umd' // Possible value - amd, commonjs, commonjs2, commonjs-module, this, var
    }
    ...
})
```

If `library` property is set and `libraryTarget` is set to be `var` by default, as given in the [config reference](/configuration/output).

### Final steps

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