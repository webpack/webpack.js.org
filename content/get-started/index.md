---
title: Get Started with Webpack
contributors:
  - bebraw
sort: 3
---

## Getting Started

webpack is a tool to build JavaScript modules in your application. To start using `webpack` from its [cli](/api/cli) or [api](/api/node), follow the [Installation instructions](/get-started/install-webpack).
webpack simplifies your workflow by quickly constructing a dependency graph of your application and bundling them in the right order. webpack can be configured to customise optimisations to your code, to split vendor/css/js code for production, run a development server that hot-reloads your code without page refresh and many such cool features. Learn more about [why you should use webpack](/get-started/why-webpack).

## Creating a bundle

Create a demo directory to try out webpack. [Install webpack](/get-started/install-webpack).

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
webpack --help # Shows a list of valid cli commands
npm install --save lodash
```

Now create an `index.js` file.

__app/index.js__

```javascript
function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.map(['Hello','webpack'], function(item){
    return item + ' ';
  });

  return element;
}

document.body.appendChild(component());
```

To run this piece of code, one usually has the below html

__index.html__

```html
<html>
  <head>
    <title>Webpack demo</title>
    <script src='https://unpkg.com/lodash@4.16.6' type='text/javascript'></script>
  </head>
  <body>
    <script src='index.js' type='text/javascript'></script>
  </body>
</html>
```

In this example, there are implicit dependencies between the script tags.

`index.js` depends on `lodash` being included in the page before it runs. It is implicit because `index.js` never declared a need for `lodash`; it just assumes that a global variable `_` exists.

There are problems with managing JavaScript projects this way:
  - If a dependency is missing, or is included in the wrong order, the application will not function at all. 
  - If a dependency is included but is not used, then there is a lot of unnecessary code that the browser has to download.

To bundle the `lodash` dependency with the `index.js`, we need to import `lodash`.

__app/index.js__

```diff
+ import _ from `lodash`;

function component () {
  ...
```

Also we will need to change the `index.html` to expect a single bundled js file.

```diff
<html>
  <head>
    <title>Webpack demo</title>
-   <script src='https://unpkg.com/lodash@4.16.6' type='text/javascript'></script>
-   <script src='index.js' type='text/javascript'></script>
+   <script src='dist/bundle.js' type='text/javascript'></script>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
```

Here, `index.js` explicitly requires `lodash` to be present, and binds it as `_` (no global scope pollution).

By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle where scripts will be executed in the correct order. Also unused dependencies will not be included in the bundle.

Now run `webpack` on this folder with the entry file to be `index.js` and to output a `bundle.js` file which bundles all the code required for the page.

```bash
webpack app/index.js dist/bundle.js

Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]

```

## Using webpack with a config

For more complex configuration, we can use a configuration file that webpack can reference to bundle your code.
The above CLI command would be represented in config as follows -

__webpack.config.js__
```javascript
module.exports = {
  entry: './app/index.js'
  output: {
    filename: 'bundle.js',
    path: './dist'
  }
}
```

This file can be run by webpack as

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

You can now achieve the same as above by using `npm run build` command. npm picks up the scripts through it and patches the environment temporarily so that it contains the bin commands. You will see this convention a lot of projects out there.

T> You can pass custom parameters to webpack by adding two dashes to the `npm run build` command, e.g. `npm run build -- --colors`.

## Conclusion

Now that you have a basic build together, you should dig into the [basic concepts](/concepts) and [configuration](/configuration) of webpack to understand its design better. Check out also the [how to section](/how-to) in order to see how to resolve common problems. The [API](/api) section digs into lower level.

