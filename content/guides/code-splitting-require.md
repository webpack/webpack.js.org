---
title: Code Splitting - Using require.ensure
sort: 33
contributors:
  - pksjce
  - rahulcs
  - johnstew
---

In this section, we will discuss how webpack splits code using `require.ensure()`.

## `require.ensure()`

webpack statically parses for `require.ensure()` in the code while building and adds the modules here into a separate chunk. This new chunk is loaded on demand by webpack through jsonp.

The syntax is as follows

```javascript
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
```

#### dependencies
This is an array of strings where we can declare all the modules that need to be made available before all the code in the callback function can be executed.

#### callback
This is the callback function that webpack will execute once the dependencies are loaded. An implementation of the require object is sent as a parameter to this function. This is so that, we can further `require()` the dependencies and any other modules for execution.

#### chunkName
The chunkName is the name given to the chunk created by this particular `require.ensure()`. By giving the same name at different split points of `require.ensure()`, we can make sure all the dependencies are collectively put in the same bundle.

Let us consider the following project

```bash
\\ file structure
    |
    js --|
    |    |-- entry.js
    |    |-- a.js
    |    |-- b.js
    webpack.config.js
    |
    dist
```

```javascript
\\ entry.js

require('a');
require.ensure([], function(require){
    require('b');
});

\\ a.js
console.log('***** I AM a *****');

\\ b.js
console.log('***** I AM b *****');
```

```javascript
\\ webpack.config.js
var path = require('path');

module.exports = function(env) {
    return {
        entry: './js/entry.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```
On running webpack on this project, we find that webpack has created two new bundles, `bundle.js` and `0.bundle.js`.

`entry.js` and `a.js` are bundled in `bundle.js`.

`b.js` is bundled in `0.bundle.js`.

W> `require.ensure` relies on `Promises` internally. If you use `require.ensure` with older browsers, remember to shim `Promise.` [es6-promise polyfill](https://github.com/stefanpenner/es6-promise).

## Gotchas for `require.ensure()`

### Empty Array as Parameter

```javascript
require.ensure([], function(require){
    require('./a.js');
});
```

The above code ensures that a split point is created and `a.js` is bundled separately by webpack.

### Dependencies as Parameter

```javascript
require.ensure(['./a.js'], function(require) {
    require('./b.js');
});
```

In the above code, `a.js` and `b.js` are bundled together and split from the main bundle. But only the contents of `b.js` are executed. The contents of `a.js` are only made available and not executed.
To execute `a.js`, we will have to require it in a sync manner like `require('./a.js')` for the JavaScript to get executed.
