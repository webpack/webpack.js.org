---
title: Getting Started
sort: 0
contributors:
  - bebraw
  - varunjayaraman
  - cntanglijun
  - chrisVillanueva
  - johnstew
  - simon04
  - aaronang
  - jecoopr
---

webpack is a tool to build JavaScript modules in your application. To start using `webpack` from its [cli](/api/cli) or [api](/api/node), follow the [Installation instructions](/guides/installation).
webpack simplifies your workflow by quickly constructing a dependency graph of your application and bundling them in the right order. webpack can be configured to customise optimisations to your code, to split vendor/css/js code for production, run a development server that hot-reloads your code without page refresh and many such cool features. Learn more about [why you should use webpack](/guides/why-webpack).

## Creating a bundle

Create a demo directory to try out webpack. [Install webpack](/guides/installation).

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
```

```bash
./node_modules/.bin/webpack --help # Shows a list of valid cli commands
.\node_modules\.bin\webpack --help # For windows users
webpack --help # If you installed webpack globally
```

Now create a subdirectory `app` with an `index.js` file.

__app/index.js__

```javascript
function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

To run this piece of code, create an `index.html` file in the project's root.

__index.html__

```html
<html>
  <head>
    <title>webpack 2 demo</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="app/index.js"></script>
  </body>
</html>
```

In this example, there are implicit dependencies between the `<script>` tags.

`index.js` depends on `lodash` being included in the page before it runs. It is implicit because `index.js` never declared a need for `lodash`; it just assumes that a global variable `_` exists.

There are problems with managing JavaScript projects this way:
  - If a dependency is missing, or is included in the wrong order, the application will not function at all.
  - If a dependency is included but is not used, then there is a lot of unnecessary code that the browser has to download.

To bundle the `lodash` dependency with `index.js`, we need to first install `lodash`

```
npm install --save lodash
```

and then import it.

__app/index.js__

```diff
+ import _ from 'lodash';

function component () {
  ...
```

We also need to change `index.html` to expect a single bundled js file.

```diff
 <html>
   <head>
     <title>webpack 2 demo</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="app/index.js"></script>
+    <script src="dist/bundle.js"></script>
   </body>
 </html>
```

Here, `index.js` explicitly requires `lodash` to be present, and binds it as `_` (no global scope pollution).

By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle where scripts will be executed in the correct order. Also unused dependencies will not be included in the bundle.

Now run `webpack` on this folder with `index.js` as the entry file and `bundle.js` as the output file in which all code required for the page is bundled.

```bash
./node_modules/.bin/webpack app/index.js dist/bundle.js

Hash: ff6c1d39b26f89b3b7bb
Version: webpack 2.2.0
Time: 385ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./app/index.js 278 bytes {0} [built]
```
T> Output may vary. If the build is successful then you are good to go.

Open `index.html` in your browser to see the result of a successful bundle.
You should see a page with the following text: 'Hello webpack'.

## Using ES2015 modules with webpack

Noticed the use of [ES2015 module import](https://developer.mozilla.org//en-US/docs/Web/JavaScript/Reference/Statements/import) (alias ES2015, *harmony*) in `app/index.js`? Although `import`/`export` statements are not supported in browsers (yet), using them is fine since webpack will replace those instructions with an ES5 compatible wrapper code. Inspect `dist/bundle.js` to convince yourself.

Note that webpack will not touch your code other than `import`/`export`. In case you are using other [ES2015 features](http://es6-features.org/), make sure to use a transpiler such as [Babel](https://babeljs.io/) or [Bublé](https://buble.surge.sh/guide/).

## Using webpack with a config

For a more complex configuration, we can use a configuration file that webpack can reference to bundle your code. After you create a `webpack.config.js` file, you can represent the CLI command above
with the following config settings.

__webpack.config.js__
```javascript
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

This file can be run by webpack as follows.

```bash
./node_modules/.bin/webpack --config webpack.config.js

Hash: ff6c1d39b26f89b3b7bb
Version: webpack 2.2.0
Time: 390ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./app/index.js 278 bytes {0} [built]
```

T> If a `webpack.config.js` is present, `webpack` command picks it up by default.

T> If you created a successful `dist/bundle.js` file using the 'Creating a bundle' section, delete the `dist` subdirectory to validate output from your `webpack.config.js` file settings.

The config file allows for all the flexibility in using webpack. We can add loader rules, plugins, resolve options and many other enhancements to our bundles using this configuration file.

## Using webpack with npm

Given it's not particularly fun to run webpack from the CLI this way, we can set up a little shortcut. Adjust *package.json* like this:

```json
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

You can now achieve the same as above by using `npm run build` command. npm picks up the scripts through it and patches the environment temporarily so that it contains the bin commands. You will see this convention in a lot of projects out there.

T> You can pass custom parameters to webpack by adding two dashes to the `npm run build` command, e.g. `npm run build -- --colors`.

## Conclusion

Now that you have a basic build together, you should dig into the [basic concepts](/concepts) and [configuration](/configuration) of webpack to better understand its design. Also check out the [guides](/guides) to learn how to approach common problems. The [API](/api) section digs into the lower level features.
