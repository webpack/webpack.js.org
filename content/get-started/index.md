---
title: Get Started with Webpack
contributors:
  - bebraw
sort: 3
---

## Getting Started

webpack is a tool to build javascript modules in your application. To start using `webpack` from its [cli](/api/cli) or [api](/api/node), follow the [Installation instructions](/get-started/install-webpack).
webpack simplifies your workflow by quickly constructing a dependency graph of your application and bundling them in the right order. webpack can be configured to customise optimisations to your code, to split vendor/css/js code for production, have a hot reloaded dev server and many such cool features. Learn more about [why you should use webpack](/get-started/why-webpack).

## Creating a bundle

Create a demo directory to try out webpack. [Install webpack](/get-started/install-webpack).

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
webpack --help //Shows a list of valid cli commands
npm install --save lodash
```

Now create an `index.js` file.

```javascript
import _ from 'lodash';

function component () {
  var element = document.createElement('div');

  element.innerHTML = _.map(['Hello','webpack'], function(item){
    return item + ' ';
  });

  return element;
};

document.body.appendChild(component());
```

To run this piece of code, one usually has the below html

```html
<html>
  <head>
      <title>Webpack demo</title>
      <script src='https://unpkg.com/lodash@4.16.6' type='text/javascript'/>
      <script src='index.js' type='text/javascript'/> 
  </head>
  <body>
  </body>
</html>
```

Now run `webpack` on this folder with the entry file to be `index.js` and to output a `bundle.js` file which bundles all the code required for the page.

```bash
webpack --entry index.js --output bundle.js

Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]

```

Now modify the index.html as

```diff
<html>
  <head>
      <title>Webpack demo</title>
-      <script src='https://unpkg.com/lodash@4.16.6' type='text/javascript'/>
-      <script src='index.js' type='text/javascript'/>
+      <script src='bundle.js' type='text/javascript'/>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
```

If not for webpack, you would have to manage the order of loading for your files ie load `lodash` first and then `index.js` and any other client code in that order.
By including a single `bundle.js` gets rid of these complexities.

## Using webpack with a config

For more complex configuration, we can use a configuration file that webpack can reference to bundle your code.
The above CLI command would be represented in config as follows -

__webpack.config.js__
```javascript
module.exports = function(env){
  return {
    entry: 'index.js'
    output: {
      filename: 'bundle.js'
    }
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

The config file allows for all the flexibility in using webpack. We can add loaders, plugins, resolve options and many other enhancements to our bundles using this configuration file.

## Using webpack with npm

Given it's not particularly fun to run webpack from the CLI this way, we can set up a little shortcut. Adjust *package.json* like this:

```json
{
  ...
  "scripts": {
    "build": "webpack --"
  },
  ...
}
```

You can now achieve the same as above by using `npm run build` command. npm picks up the scripts through it and patches the environment temporarily so that it contains the bin commands. You will see this convention a lot of projects out there.

T> I use `webpack --` so that we can pass custom parameters to webpack through npm.

## Conclusion

Now that you have a basic build together, you should dig into the [basic concepts](/concepts) and [configuration](/configuration) of webpack to understand its design better. Check out also the [how to section](/how-to) in order to see how to resolve common problems. The [API](/api) section digs into lower level.

**[Next, concepts >](/concepts)**

