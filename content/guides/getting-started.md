---
title: Getting Started
sort: 2
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

As you may already know, webpack is used to compile JavaScript modules. Once [installed](/guides/installation), you can interface with webpack either from its [CLI](/api/cli) or [API](/api/node). If you're still new to webpack, please read through the [core concepts](/concepts) and [this comparison](/guides/comparison) to learn why you might use it over the other tools that are out in the community.


## Basic Setup

First let's create a directory, initialize NPM, and [install webpack locally](/guides/installation#local-installation):

``` bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
```

Now we'll create the following directory structure and contents:

``` diff
webpack-demo
+ |- index.html
+ |- /src
+   |- index.js
```

__src/index.js__

```javascript
function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

__index.html__

```html
<html>
  <head>
    <title>webpack 2 demo</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="/src/index.js"></script>
  </body>
</html>
```

In this example, there are implicit dependencies between the `<script>` tags. Our `index.js` file depends on `lodash` being included in the page before it runs. This is because `index.js` never declared a need for `lodash`; it just assumes that the global variable `_` exists.

There are problems with managing JavaScript projects this way:

- It is not immediately apparent that the script depends on an external library.
- If a dependency is missing, or included in the wrong order, the application will not function properly.
- If a dependency is included but not used, the browser will be forced to download unnecessary code.

Let's try using webpack to manage these scripts instead...


## Creating a Bundle

First we'll tweak our directory structure slightly, separating the "source" code we write and edit (`/src`) from our "distribution" code (`/dist`) which is actually shipped to the browser:

``` diff
webpack-demo
+ |- dist
+   |- index.html
- |- index.html
|- /src
  |- index.js
```

To bundle the `lodash` dependency with `index.js`, we'll need to install the library locally...

```bash
npm install --save lodash
```

and then import it from our script...

__src/index.js__

```diff
+ import _ from 'lodash';

function component () {
// ...
```

We also need to change our update our `<script>` tags to point to the unified bundle:

__dist/index.html__

```diff
 <html>
  <head>
    <title>webpack 2 demo</title>
-   <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
-   <script src="src/index.js"></script>
+   <script src="dist/bundle.js"></script>
  </body>
 </html>
```

In this setup, `index.js` explicitly requires `lodash` to be present, and binds it as `_` (no global scope pollution). By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle where scripts will be executed in the correct order.

With that said, let's run `webpack` with our script as the [entry point](/concepts/entry-points) and `bundle.js` as the [output](/concepts/output):

```bash
./node_modules/.bin/webpack src/index.js dist/bundle.js

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

Open `index.html` in your browser and, if everything went right, you should see the following text: 'Hello webpack'.


## ES2015 Modules

Notice the use of [ES2015 module `import`](https://developer.mozilla.org//en-US/docs/Web/JavaScript/Reference/Statements/import) (alias ES2015, *harmony*) in `src/index.js`? Although `import`/`export` statements are not supported in browsers (yet), webpack supports them and will replace those instructions with ES5 compatible wrapper code in the output. Inspect `dist/bundle.js` if you need to assure yourself.

Note that webpack will not alter any code other than `import` and `export` statements. In case you are using other [ES2015 features](http://es6-features.org/), make sure to use a transpiler such as [Babel](https://babeljs.io/) or [Bublé](https://buble.surge.sh/guide/). See our [Module API](/api/module-methods) documentation for information on the various module syntaxes supported by webpack.


## Using a Configuration

For a more complex setup, we can use a configuration file that webpack can reference to bundle your code. After you create a `webpack.config.js` file, you can represent the CLI command above with the following config settings.

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
