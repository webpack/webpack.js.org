---
title: Get Started with Webpack
contributors:
  - bebraw
sort: 3
---

## Getting Started

webpack is a tool to build javascript modules in your application. To start using `webpack` from its [cli](/api/cli) or [api](/api/node), follow the [Installation instructions](/get-started/install-webpack).
webpack simplifies your workflow by quickly constructing a dependency graph of your application and bundling them in the right order. webpack can be configured to customise optimisations to your code, to split vendor/css/js code for production, have a hot reloaded dev server and many such cool features. Learn more about [why you should use webpack](/get-started/why-webpack).

## Running webpack

To prove that webpack works, we can try to running it through terminal. Try this:

```bash
npm bin -- Figure out npm bin directory
node_modules/.bin/webpack -- Execute webpack
```

Assuming you found the bin directory and ran webpack successfully, you should see quite a bit of information including webpack version, link to the usage guide, and available flags.

Given it's not particularly fun to run webpack this way, we can set up a little shortcut. Adjust *package.json* like this:

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

webpack doesn't do anything useful yet, but we can fix that next by adding some files to the project and then bundling them.

T> I use `webpack --` so that we can pass custom parameters to webpack through npm.

## Bundling with webpack

To keep it simple, create an entry point to the application like this:

**app/index.js**

```javascript
function component () {
  var element = document.createElement('h1');

  element.innerHTML = 'Hello world';

  return element;
};

document.body.appendChild(component());
```

To build it, invoke `npm run build -- app build/index.js`. As a result you should see something like this in the terminal:

```bash
Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]
```

If you check out the *build* directory, it should contain the built file. It contains some familiar code from above, but in addition it contains webpack bootstrapping code. That code makes more sense as you add dependencies to your project.

T> Try adding another file to your project and point to it from *app/index.js* using either a CommonJS `require` or ES6 `import` statement. webpack should pick it up and include it to your bundle.

## Setting Up Configuration

Given you'll run into the limits of the CLI interface quite fast, most projects contain a specific configuration file normally named as *webpack.config.js*. We can handle configuration related concerns there. To achieve the same as above without the CLI portion, you could write configuration like this:

**webpack.config.js**

```javascript
const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'index.js' // Try also [name].js
  }
};
```

If you run `npm run build` now, you should get the same result. Even though this is more verbose than the earlier solution, we can begin to untap the power of webpack now by adding loaders and plugins.

## Conclusion

Now that you have a basic build together, you should dig into the [basic concepts](/concepts) and [configuration](/configuration) of webpack to understand its design better. Check out also the [how to section](/how-to) in order to see how to resolve common problems. The [API](/api) section digs into lower level.

**[Next, concepts >](/concepts)**

