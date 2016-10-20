---
title: Webpack 起步
---

You might be familiar with tools like Make, Grunt, Gulp, Browserify, or Brunch. Make is the oldest and the most known one as it's a general build tool and its history goes back to the 70s. More specialized *task runners*, like Grunt and Gulp, are focused on JavaScript and have healthy plugin ecosystems around them.

## What Are Task Runners?

Task runners literally make it easier to handle tasks, such as linting, building, or developing your project. Compared to *bundlers* like Browserify, Brunch, or webpack, they have a higher level focus. As you might guess from the term bundler, the goal of these tools is to achieve something lower level.

## What Are Bundlers?

Roughly put bundlers take assets, such as JavaScript files in, and then transform them into format that's suitable for the browser of the end user to consume. This process of bundling happens to be one of the most important problems in web development and solving it well you can remove a large part of pain from the process.

Bundlers can work in tandem with task runners. You can still benefit from their higher level tooling while leaving the problem of bundling to more specialized tools. [grunt-webpack](https://www.npmjs.com/package/grunt-webpack) and [gulp-webpack](https://www.npmjs.com/package/gulp-webpack) are good examples of integrations.

T> Often webpack users use npm `scripts` as their task runner. This is a good starting point. Cross-platform support can become a problem, but there are several workarounds for that.

T> Even though webpack core focuses on bundling, you can find a variety of extensions that allow you to use it in a task runner kind of way.

## Getting Started

W> Before getting started, make sure you have a fresh version of [Node.js](https://nodejs.org/en/) installed. The current LTS is an ideal starting point. You may run into a variety of issues with the older versions as they may be missing functionality webpack or related packages might need.

Although it is possible to install webpack globally, it is a good practice to maintain it as a *development dependency* of your project. This way you can control the version and have something that works also in a *Continuous Integration* environment. The problem with global dependencies is that they may lead to hard to debug issues.

As a first step, set up a demo project:

```bash
mkdir webpack-demo -- Create a new directory
cd webpack-demo -- Access the directory
npm init -y -- Initialize the project
```

After this process you should have a directory that contains a *package.json* file. That is where we maintain our project dependencies and in this case tasks as well.

To get webpack installed, invoke:

```bash
npm i webpack -D -- Install webpack as a development dependency
```

Once it has installed, you should see a new directory, *node_modules*. In addition to webpack, it will contain quite a few of other packages. If you check out *package.json* at the project root, you should see webpack as a development dependency to your project (the `devDependencies` section).

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
}

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
