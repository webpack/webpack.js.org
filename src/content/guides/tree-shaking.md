---
title: Tree Shaking
sort: 7
contributors:
  - simon04
  - zacanger
  - alexjoverm
  - avant1
  - MijaelWatts
  - dmitriid
related:
  - title: Tree shaking with webpack 2, TypeScript and Babel
    url: https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/
  - title: Tree-shaking with webpack 2 and Babel 6
    url: http://www.2ality.com/2015/12/webpack-tree-shaking.html
  - title: webpack 2 Tree Shaking Configuration
    url: https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.15tuaw71x
  - title: Issue 2867
    url: https://github.com/webpack/webpack/issues/2867
  - title: Issue 4784
    url: https://github.com/webpack/webpack/issues/4784
---

_Tree shaking_ is a term commonly used in the JavaScript context for dead-code elimination. It relies on the [static structure](http://exploringjs.com/es6/ch_modules.html#static-module-structure) of ES2015 module syntax, i.e. [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export). The name and concept have been popularized by the ES2015 module bundler [rollup](https://github.com/rollup/rollup).

The webpack 2 release came with built-in support for ES2015 modules (alias _harmony modules_) as well as unused module export detection.

T> The remainder of this guide will stem from [Getting Started](/guides/getting-started). If you haven't read through that guide already, please do so now.


## Add a Utility

Let's add a new utility file to our project, `src/math.js`, that exports two functions:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
  |- math.js
|- /node_modules
```

__src/math.js__

``` javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

With that in place, let's update our entry script to utilize one of these new methods and remove `lodash` for simplicity:

__src/index.js__

``` diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   var element = document.createElement('div');
+   var element = document.createElement('pre');

-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

Note that we __did not `import` the `square` method__ from the `src/math.js` module. That function is what's known as "dead code", meaning an unused `export` that should be dropped. Now let's run our npm script, `npm run build`, and inspect the output bundle:

__dist/bundle.js (around lines 90 - 100)__

``` js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export square */
/* harmony export (immutable) */ __webpack_exports__["a"] = cube;
function square(x) {
  return x * x;
}

function cube(x) {
  return x * x * x;
}
```

Note the `unused harmony export square` comment above. If you look at the code below it, you'll notice that `square` is not being exported, however, it is still included in the bundle. We'll fix that in the next section.


## Minify the Output

So we've cued up our "dead code" to be dropped by using the `import` and `export` syntax, but we still need to drop it from the bundle. To do that, we'll add a minifier that supports dead code removal -- the [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin) -- to our configuration...

Let's start by installing it:

``` bash
npm install --save-dev uglifyjs-webpack-plugin
```

And then adding it into our config:

__webpack.config.js__

``` diff
const path = require('path');
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ plugins: [
+   new UglifyJSPlugin()
+ ]
};
```

T> Note that the `--optimize-minimize` flag can be used to insert the `UglifyJsPlugin` as well.

With that squared away, we can run another `npm run build` and see if anything has changed.

Notice anything different about `dist/bundle.js`? Clearly the whole bundle is now minified and mangled, but, if you look carefully, you won't see the `square` function included but will see a mangled version of the `cube` function (`function r(e){return e*e*e}n.a=r`). With minification and tree shaking our bundle is now a few bytes smaller! While that may not seem like much in this contrived example, tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees.


## Caveats

Please note that webpack doesn't perform tree-shaking by itself. It relies on third party tools like [UglifyJS](/plugins/uglifyjs-webpack-plugin/) to perform actual dead code elimination. There are situations where tree-shaking may not be effective. For example, consider the following modules:

__transforms.js__

``` js
import * as mylib from 'mylib';

export const someVar = mylib.transform({
  // ...
});

export const someOtherVar = mylib.transform({
  // ...
});
```

__index.js__

``` js
import { someVar } from './transforms.js';

// Use `someVar`...
```

In the code above webpack cannot determine whether or not the call to `mylib.transform` triggers any side-effects. As a result, it errs on the safe side and leaves `someOtherVar` in the bundled code.

In general, when a tool cannot guarantee that a particular code path doesn't lead to side-effects, this code may remain in the generated bundle even if you are sure it shouldn't. Common situations include invoking a function from a third-party module that webpack and/or the minifier cannot inspect, re-exporting functions imported from third-party modules, etc.

The code used in this guide assumes you perform tree-shaking using UglifyJS plugin. However, there are other tools such as [webpack-rollup-loader](https://github.com/erikdesjardins/webpack-rollup-loader) or [Babel Minify Webpack Plugin](/plugins/babel-minify-webpack-plugin) that may produce different results depending on your setup.


## Conclusion

So, what we've learned is that in order to take advantage of _tree shaking_, you must...

- Use ES2015 module syntax (i.e. `import` and `export`).
- Include a minifier that supports dead code removal (e.g. the `UglifyJSPlugin`).

You can imagine your application as a tree. The source code and libraries you actually use represent the green, living leaves of the tree. Dead code represents the brown, dead leaves of the tree that are consumed by autumn. In order to get rid of the dead leaves, you have to shake the tree, causing them to fall.

If you are interested in more ways to optimize your output, please jump to the next guide for details on building for [production](/guides/production).
