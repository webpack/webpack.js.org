---
title: Hot Module Replacement - React
sort: 8
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - chrisVillanueva
---

As explained in detail on the [concept page](/concepts/hot-module-replacement), Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running without a page reload.

HMR is particularly useful in applications using a single state tree,
since components are "dumb" and will reflect the latest application state, even
after their source is changed and they are replaced.

This guide will be demonstrating the use of HMR with Babel,
React, and PostCSS (using CSS Modules).
Although the approach described below uses Babel and
React, these tools are not necessary for HMR to work.

T> If you'd like to see examples of other approaches, please request them or better yet, [open up a PR with an addition](https://github.com/webpack/webpack.js.org).

## Project Setup

To follow along, please ensure you have a project directory with
webpack 2 installed. webpack documentation provides help with
[installation](/get-started/install-webpack) steps and suggestions to
[get started](/get-started).  Feel free to review those sections before
starting this guide.

Open a terminal an enter these commands to begin this guide.

```bash
mkdir webpack-react-hmr && cd webpack-react-hmr
npm init -y                                             # Creates package.json
npm install --save-dev webpack@2.1.0-beta.25            # Local webpack installation
npm install --save-dev webpack-dev-server@2.1.0-beta.0  # Local webpack-dev-server installation
```
T> After installation, you may see `WARN` messages related to your `package.json` file.  Update *description* and *repository* fields if you want to resolve warnings.  However, the missing fields will not disrupt `webpack-react-hmr` builds.  For more information on `package.json` settings, visit [this page here](https://docs.npmjs.com/files/package.json).

You should now be in the `webpack-react-hmr` project directory with webpack
installed.  You can verify successful installation with the following
command:

```bash
npm list --depth=0  #View list of project top-level packages
```

T> If you have any issues with installation, click the "Find Help" button
on the right-side fixed sidebar.

After installation success, you can begin adding HMR and React dependencies.


## Project Config

The next step is to  add the following dependencies to your `package.json` file.
To use HMR, you'll need to install the following dependencies:

```bash
npm install --save-dev babel@6.5.2 babel-core@6.13.2 babel-loader@6.2.4 babel-preset-es2015@6.13.2 babel-preset-react@6.11.1 babel-preset-stage-2@6.13.0 css-loader@0.23.1 postcss-loader@0.9.1 react-hot-loader@3.0.0-beta.6 style-loader@0.13.1
```

For the purpose of this walkthrough, you'll also need the following React dependencies:

```bash
npm install --save react@15.3.0 react-dom@15.3.0
```

Run the following command to once again verify successful local installation of all packages:
```bash
npm list --depth=0  #View list of project top-level packages
```

### Babel Config

Now we need to ensure babel is properly configured to transpile es2015 and React code
into ES5 for the webpack bundle file. Create a `.babelrc` file at the root of your project
directory and add these settings:

```json

// .babelrc

{
  "presets": [
    ["es2015", {"modules": false}],
    // webpack understands the native import syntax, and uses it for tree shaking

    "stage-2",
    // Specifies what level of language features to activate.
    // Stage 2 is "draft", 4 is finished, 0 is strawman.
    // See https://tc39.github.io/process-document/

    "react"
    // Transpile React components to JavaScript
  ],
  "plugins": [
    "react-hot-loader/babel"
    // Enables React code to work with HMR.
  ]
}
```

### webpack Config

There are many ways to setup your webpack config file -- via API,
multiple or single config files, etc.  We will use a basic
configuration, so your `webpack.config.js` file should resemble
this:

```js

// ./webpack.config.js

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates


    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};
```

There's a lot going on above, and not all of it is related to HMR.
You may benefit from reading the
[webpack-dev-server options](/configuration/dev-server) and the [concept pages](/concepts).

The basic assumption here is that your `index.js` entry file is located within
the `./src` subdirectory and that your css file is preprocessed with CSS Loader Modules .

Please refer to inline comments within the file for config setting explanation. The main
areas to look are the `devServer` and `entry` keys. The `HotModuleReplacementPlugin` in
the `plugins` array is necessary for HMR functionality.

There are two modules included here for the purposes of this guide:

- The `react-hot-loader` addition to the entry, as noted above, is necessary to enable
HMR with React components.

- The `NamedModulesPlugin` is a useful addition
to better understand what modules are being updated when using HMR.


### Code

Now we need to create our application source files with the following steps:

Create a `./src` subdirectory at the root of your `webpack-react-hmr` project.  All application files will be located here.

Next, `cd` into the `./src` subdirectory, create an `index.js` file, and place the code provided below into the file:

```js

// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default
    render(NewApp)
  });
}
```

The important thing to note in the code above is the `module` reference.

1. webpack will expose `module.hot` to our code since we set `devServer: { hot: true }`;

2. Thus we can use the `module.hot` hook to enable HMR for specific resources (Here's `App.js`). The most important API here is `module.hot.accept`, which specifies how to handle changes to specific dependencies.

3. Note that because webpack 2 has built-in support for ES2015 modules, you won't need to re-require your root component in `module.hot.accept`. To make this work, you need to change the Babel ES2015 preset in `.babelrc` to be:

  ```
  ["es2015", {"modules": false}]
  ```

  like what we did in [Babel Config](#babel-config). Note that disabling Babel's module plugin is not only necessary for HMR. If you don't disable it you'll run into many other issues (see [Migrating from v1 to v2](/guides/migrating/#mixing-es2015-with-amd-and-commonjs) and [webpack-tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)).

4. Note that if you're using ES6 modules in your webpack 2 configuration file, and you change your `.babelrc` file in #3 above, you either need to use `require` or create two `.babelrc` files (issue [here](https://github.com/webpack/webpack.js.org/issues/154)):
  * One in the project root directory with `"presets": ["es2015"]
  * One in the home directory for webpack to build. For this example, in `src/`.

So in this case, `module.hot.accept` will fire the `render` method whenever `src/components/App.js` or its dependencies are changed - which means the `render` method will also fire when the `App.css` is changed, since `App.css` is included in `App.js`.

We need to create a new subdirectory within `./src` and name it `components`.  Now, `cd` into `components` (so your path from project root is `./src/components`) and create two application files:  `App.js` and `App.css`.

**App.js** should contain the code below:

```js

// ./src/components/App.js

import React from 'react';
import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <h2>Hello, </h2>
  </div>
);

export default App;
```

**App.css** should contain the styles written below:
```css

/* ./src/components/App.css */

.app {
    text-size-adjust: none;
    font-family: helvetica, arial, sans-serif;
    line-height: 200%;
    padding: 6px 20px 30px;
}
```
The final step is to make our `index.html` file.  This file will render the app in a user's browser and reference our `bundle.js` output file. webpack-dev-server will not run without it.  At this point, you should move back to the project's root directory.  When you are there, create another subdirectory named `dist`.  Now `cd` into `dist` and create the `index.html` file.

**index.html** requires the following markup:

```html
<!-- ./dist/index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example Index</title>
</head>
<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>
</html>

```


### Package.json

We can edit our `package.json` file to start up `webpack-dev-server`, bundle our code, and see HMR in action by using an npm script command. Open the file and add the `start` script written below:

```json
{
  "scripts" : {
    "start" : "./node_modules/.bin/webpack-dev-server"
  }
}
```

T> This command references a local webpack-dev-server installation.  Window users will need to use
   `.\node_modules\.bin\webpack-dev-server` for the command to work


Run `npm start`, open up your browser to `http://localhost:8080`,
and you should see the following entries printed in your browser's console.log:

```bash
dev-server.js:49[HMR] Waiting for update signal from WDS…
only-dev-server.js:74[HMR] Waiting for update signal from WDS…
client?c7c8:24 [WDS] Hot Module Replacement enabled.
```

Go ahead and edit and save your `App.js` file.
You should see something like the following in your browser's console.log:

```bash
[WDS] App updated. Recompiling…
client?c7c8:91 [WDS] App hot update…
dev-server.js:45 [HMR] Checking for updates on the server…
log-apply-result.js:20 [HMR] Updated modules:
log-apply-result.js:22 [HMR]  - ./components/App.js
dev-server.js:27 [HMR] App is up to date.
```

Note that HMR specifies the paths of the updated modules.
That's because we're using `NamedModulesPlugin`.

You are now able to work on your React application with HMR enabled.
