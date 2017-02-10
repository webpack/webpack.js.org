---
title: Hot Module Replacement - React
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - aiduryagin
---

As explained in detail on the [concept page](/concepts/hot-module-replacement), Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running without a page reload.
HMR is particularly useful in applications using a single state tree,
since components are "dumb" and will reflect the latest application state, even
after their source is changed and they are replaced.

The approach described below uses Babel and
React, but these tools are not necessary for HMR to work.

T> If you'd like to see examples of other approaches, please request them or better yet, [open up a PR with an addition](https://github.com/webpack/webpack.js.org).

## Project Config

This guide will be demonstrating the use of HMR with Babel,
React, and PostCSS (using CSS Modules).
To follow along, please add the following dependencies to your `package.json`:

To use HMR, you'll need the following dependencies:

```bash
npm install --save-dev babel-core@6.13.2 babel-loader@6.2.4 babel-preset-es2015@6.13.2 babel-preset-react@6.11.1 babel-preset-stage-2@6.13.0 css-loader@0.23.1 postcss-loader@0.9.1 react-hot-loader@3.0.0-beta.6 style-loader@0.13.1 webpack@2.1.0-beta.25 webpack-dev-server@2.1.0-beta.0
```

In addition, for the purposes of this walkthrough, you'll need:

```bash
npm install --save react@15.3.0 react-dom@15.3.0
```


### Babel Config

Your `.babelrc` file should look like the following:

```json
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

While there're many ways of setting up your webpack config - via API,
via multiple or single config files, etc - here is the basic information
you should have available.

```js
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

The basic assumption here is that your JavaScript entry is located at `./src/index.js`
and that you're using CSS Modules for your styling.

Please see the comments inline that explain each portion of the config. The main
areas to look are the `devServer` key and the `entry` key. The `HotModuleReplacementPlugin` is
also necessary to include in the `plugins` array.

There are two modules included here for the purposes of this guide:

- The `react-hot-loader` addition to the entry, as noted above, is necessary to enable
HMR with React components.

- The `NamedModulesPlugin` is a useful addition
to better understand what modules are being updated when using HMR.


### Code

In this guide, we're using the following files:

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
    render(App)
  });
}
```

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

```css
// ./src/components/App.css
.app {
    text-size-adjust: none;
    font-family: helvetica, arial, sans-serif;
    line-height: 200%;
    padding: 6px 20px 30px;
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

4. Note that if you're using ES2015 modules in your webpack 2 configuration file, and you change your `.babelrc` file in #3 above, you either need to use `require` or create two `.babelrc` files (issue [here](https://github.com/webpack/webpack.js.org/issues/154)):
  * One in the project root directory with `"presets": ["es2015"]`
  * One in the home directory for webpack to build. For this example, in `src/`.

So in this case, `module.hot.accept` will fire the `render` method whenever `src/components/App.js` or its dependencies are changed - which means the `render` method will also fire when the `App.css` is changed, since `App.css` is included in `App.js`.

### index.html

This needs to be placed inside of `dist` in your project root. webpack-dev-server will not run without it.

```html
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

Finally, we need to start up `webpack-dev-server` to bundle our code and see HMR in action.
We can use the following `package.json` entry:

```json
{
  "scripts" : {
    "start" : "webpack-dev-server"
  }
}
```

Run `npm start`, open up your browser to `http://localhost:8080`,
and you should see the following entries printed in your console.log:

```bash
dev-server.js:49[HMR] Waiting for update signal from WDS…
only-dev-server.js:74[HMR] Waiting for update signal from WDS…
client?c7c8:24 [WDS] Hot Module Replacement enabled.
```

Go ahead and edit and save your `App.js` file.
You should see something like the following in your console.log:

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
