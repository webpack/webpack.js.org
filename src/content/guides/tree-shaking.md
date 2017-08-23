---
title: Tree Shaking
sort: 7
contributors:
  - simon04
  - zacanger
  - alexjoverm
related:
  - title: Tree shaking with webpack 2, TypeScript and Babel
    url: https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/
  - title: Tree-shaking with webpack 2 and Babel 6
    url: http://www.2ality.com/2015/12/webpack-tree-shaking.html
  - title: webpack 2 Tree Shaking Configuration
    url: https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.15tuaw71x
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

With that in place, let's update our entry script to utilize this one of these new methods:

__src/index.js__

``` diff
  import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = _.join([
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ], '\n\n');

    return element;
  }

  document.body.appendChild(component());
```

Note that we __did not `import` the `square` method__ from the `src/math.js` module. That function is what's known as "dead code", meaning an unused `export` that should be dropped. Now let's run our npm script, `npm run build`, and inspect the output:

__dist/bundle.js__

``` js
// TODO: Display contents with `unused harmony export square`...
```

Note the `unused harmony export square` comment above. If you look at the code below it, you'll notice that `square` is not being exported, however, it is still included in the bundle. We'll fix that in the next section.


## Minify the Output

So we've cued up our "dead code" to be dropped by using the `import` and `export` syntax, but we still need to drop it from the bundle. To do that, we'll add a minifier that supports dead code removal -- the [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin) -- to our configuration...

Let's start by installing it:

``` bash
npm i --save-dev uglifyjs-webpack-plugin
```

And then adding it into our config:

__webpack.config.js__

``` diff
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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

With that squared away, we can run another `npm run build` and see if anything has changed:

__dist/bundle.js__

``` js
// TODO: Display contents with `square removed...
```

Notice anything missing? The `square` function has been dropped and our output bundle is now a few bytes smaller! While that may not seem like much in this contrived example, tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees.


## Conclusion

So, what we've learned is that in order to take advantage of _tree shaking_, you must...

- Use ES2015 module syntax (i.e. `import` and `export`).
- Include a minifier that supports dead code removal (e.g. the `UglifyJSPlugin`).

If you are interested in more ways to optimize your output, please jump to the next guide for details on building for [production](/guides/production).
