---
title: Getting Started
sort: 3
contributors:
  - bebraw
  - varunjayaraman
  - cntanglijun
  - chrisVillanueva
---

webpack is a tool to build JavaScript modules in your application. To start using `webpack` from its [cli](/api/cli) or [api](/api/node), follow the [Installation instructions](/get-started/install-webpack).
webpack simplifies your workflow by quickly constructing a dependency graph of your application and bundling them in the right order. webpack can be configured to customise optimisations to your code, to split vendor/css/js code for production, run a development server that hot-reloads your code without page refresh and many such cool features. Learn more about [why you should use webpack](/get-started/why-webpack).

## Creating a bundle

Create a demo directory to try out webpack. [Install webpack](/get-started/install-webpack).

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack@beta
./node_modules/.bin/webpack --help # Shows a list of valid cli commands
.\node_modules\.bin\webpack --help # For windows users
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

To run this piece of code, one usually has the below HTML

__index.html__

```html
<html>
  <head>
    <title>Webpack 2 demo</title>
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
    <title>Webpack 2 demo</title>
-   <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
-   <script src="app/index.js"></script>
+   <script src="dist/bundle.js"></script>
  </body>
</html>
```

Here, `index.js` explicitly requires `lodash` to be present, and binds it as `_` (no global scope pollution).

By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle where scripts will be executed in the correct order. Also unused dependencies will not be included in the bundle.

Now run `webpack` on this folder with `index.js` as the entry file and `bundle.js` as the output file in which all code required for the page is bundled.

```bash
webpack app/index.js dist/bundle.js

Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]

```

T> If you created a local `webpack@beta` build, be sure to reference `webpack` with `./node_modules/.bin/webpack` on the command line.

Open `index.html` in your browser to see the result of a successful bundle.
You should see a page with the following text: 'Hello webpack'.

## Using webpack with a config

For a more complex configuration, we can use a configuration file that webpack can reference to bundle your code. After you create a `webpack.config.js` file, you can represent the CLI command above
with the following config settings.

__webpack.config.js__
```javascript
module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  }
}
```

This file can be run by webpack as follows.

```bash
webpack --config webpack.config.js

Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]

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

