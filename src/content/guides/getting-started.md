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
  - TheDutchCoder
  - sudarsangp
  - Vanguard90
  - chrischinchilla
---

Webpack is used to compile JavaScript modules. Once [installed](/guides/installation), you can interface with webpack either from its [CLI](/api/cli) or [API](/api/node). If you're new to webpack, read through the [core concepts](/concepts) and [this comparison](/comparison) to learn why to use it over the other tools available the community.

## Basic Setup

Create a directory, initialize npm, and [install webpack locally](/guides/installation#local-installation):

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
```

Create the following directory structure and contents:

__project__

```diff
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

__src/index.js__

```javascript
function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

__index.html__

```html
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

In this example, there are implicit dependencies between the `<script>` tags. The `index.js` file depends on including `lodash` in the page before it runs. This is because `index.js` never declared a need for `lodash`; it assumes that the global variable `_` exists.

There are problems with managing JavaScript projects this way:

-  It is not immediately apparent that the script depends on an external library.
-  If a dependency is missing, or included in the wrong order, the application will not function properly.
-  If a dependency is included but not used, the browser is forced to download unnecessary code.

Let's use webpack to manage these scripts instead.

## Creating a Bundle

First we'll tweak our directory structure slightly, separating the "source" code (`/src`) from our "distribution" code (`/dist`). The  "source" code is the code that we'll write and edit. The "distribution" code is the minimized and optimized `output` of our build process that the browser will load:

__project__

```diff
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

To bundle the `lodash` dependency with `index.js`, we'll need to install the library locally.

```bash
npm install --save lodash
```

And then import it in our script.

__src/index.js__

```diff
+ import _ from 'lodash';
+
  function component() {
    var element = document.createElement('div');

-  // Lodash, currently included via a script, is required for this line to work
+   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

Now, since we're bundling our scripts, we have to update the `index.html` file. Let's remove the lodash `<script>`, as we now `import` it, and change the other `<script>` tag to load the bundle, instead of the raw `/src` file:

__dist/index.html__

```diff
  <html>
   <head>
     <title>Getting Started</title>
-   <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-   <script src="./src/index.js"></script>
+    <script src="bundle.js"></script>
   </body>
  </html>
```

In this setup, `index.js` explicitly requires `lodash` to be present, and binds it as `_` (no global scope pollution). By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle that runs scripts in the correct order.

With that said, let's run `npx webpack` with our script as the [entry point](/concepts/entry-points) and `bundle.js` as the [output](/concepts/output). The `npx` command, which ships with Node 8.2 or higher, runs the webpack binary (`./node_modules/.bin/webpack`) of the webpack package we installed at the beginning of this guide:

```bash
npx webpack src/index.js dist/bundle.js

Hash: 857f878815ce63ad5b4f
Version: webpack 3.9.1
Time: 332ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./src/index.js 222 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
```

T> Your output may vary a bit, but if the build is successful then you are good to go.

Open `index.html` in your browser and, if everything went right, you should see the following text: 'Hello webpack'.

## Modules

[ES2015](https://babeljs.io/learn-es2015/) standardized the [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) statements. Although they are not supported in most browsers yet, webpack does support them out of the box.

Behind the scenes, webpack "transpiles" the code so that older browsers can also run it. If you inspect `dist/bundle.js`, you can see how webpack does this, it's quite ingenious! Besides `import` and `export`, webpack supports other module syntax as well, see the [Module API](/api/module-methods) for more information.

Webpack doesn't alter any code other than `import` and `export` statements. If you are using other [ES2015 features](http://es6-features.org/), make sure to [use a transpiler](/loaders/#transpiling) such as [Babel](https://babeljs.io/) or [Bublé](https://buble.surge.sh/guide/) via webpack's [loader system](/concepts/loaders/).

## Using a Configuration

Most projects will need a more complex setup, which is why webpack supports a [configuration file](/concepts/configuration). This is much more efficient than having to type in a lot of commands in the terminal, so let's create one to replace the CLI options used above:

__project__

```diff
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Now, let's run the build again but instead using our new configuration:

```bash
npx webpack --config webpack.config.js

Hash: 857f878815ce63ad5b4f
Version: webpack 3.9.1
Time: 298ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./src/index.js 222 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
```

W> Note that when calling `webpack` via its path on Windows, you must use backslashes instead, e.g. `node_modules\.bin\webpack --config webpack.config.js`.

T> If a `webpack.config.js` is present, the `webpack` command picks it up by default. We use the `--config` option here to show that you can pass a config of any name. This is useful for more complex configurations that you need to split into multiple files.

A configuration file allows far more flexibility than simple CLI usage. We can specify loader rules, plugins, resolve options and many other enhancements this way. See the [configuration documentation](/configuration) to learn more.

## NPM Scripts

Given it's not particularly fun to run a local copy of webpack from the CLI, we can set up a little shortcut. Let's adjust our _package.json_ by adding an [npm script](https://docs.npmjs.com/misc/scripts):

__package.json__

```json
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

Now we can use the `npm run build` command in place of the `npx` command we used earlier. Within `scripts` we can reference locally installed npm packages by name the same way we did with `npx`. This convention is the standard in most npm-based projects because it allows all contributors to use the same set of common scripts (each with flags like `--config` if necessary).

Now run the following command and see if your script alias works:

```bash
npm run build

Hash: 857f878815ce63ad5b4f
Version: webpack 3.9.1
Time: 294ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./src/index.js 222 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
```

T> We can pass custom parameters to webpack by adding two dashes between the `npm run build` command and the parameters, e.g. `npm run build -- --colors`.

## Conclusion

With a basic build complete, we recommend you read the next guide [`Asset Management`](/guides/asset-management) to learn how to manage assets like images and fonts with webpack. At this point, the project should look like this:

__project__

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

T> If you're using npm 5, you'll probably also see a `package-lock.json` file in your directory.

If you want to learn more about webpack's design, you can check out the [basic concepts](/concepts) and [configuration](/configuration) pages. Furthermore, the [API](/api) section digs into the interfaces webpack offers.
