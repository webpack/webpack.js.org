---
title: Hot Module Replacement - React
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - aiduryagin
  - rohannair
---

As explained in detail on the [concept page](/concepts/hot-module-replacement), Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running, without a page reload.
HMR is particularly useful in applications using a single state tree
since components are "dumb" and will reflect the latest application state, even
after their source is changed and they are replaced.

The approach described below specifically uses Babel and React, but HMR can be done in a variety of other ways, using other tools.

T> If you'd like to see examples of other approaches please request them, or better yet [open up a PR with an addition](https://github.com/webpack/webpack.js.org).

## Project Config

This guide will be demonstrating HMR using Babel on a React app, with PostCSS (using CSS Modules).

First, install the following dev dependencies:

```bash
npm install --save-dev babel-core babel-loader style-loader css-loader postcss-loader /
  babel-preset-es2015 babel-preset-react webpack-dev-server webpack
```

In addition you'll need to install React, ReactDOM and `react-hot-loader` (make sure to use the `next` release of this package)

```bash
npm install --save react react-dom react-hot-loader@next
```


### Babel Config

Create a `.babelrc` with the following options:

__.babelrc__

```json
{
  "presets": [
    ["es2015", {"modules": false}],
    // webpack understands the native import syntax, and uses it for tree shaking

    "react"
    // Transpile React components to JavaScript
  ],
  "plugins": [
    "react-hot-loader/babel"
    // Enables React code to work with HMR.
  ]
}
```

We need to use ES2015 modules to make HMR work properly. To do this, set the `module` option to false in our es2015 preset. We can do something similar using `babel-preset-env`:

```json
["env", {"modules": false}]
```

Setting Babel's module plugin to false helps fix many issues (see [Migrating from v1 to v2](/guides/migrating/#mixing-es2015-with-amd-and-commonjs) and [webpack-tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)).

Note: Node.js doesn't support ES2015 modules yet and using ES2015 modules in your webpack 2 configuration file will cause an [issue](https://github.com/webpack/webpack.js.org/issues/154).

To work around this you will need two `.babelrc` file to transpile the configuration and app code separately: 
1. in the project root directory with `"presets": ["es2015"]`
2. in the source directory for app code

### Webpack configuration

For this example, we will use a single webpack config file, with the following assumptions:
* all app source code lives inside the `<root>/src` folder
* the entry point to the app is at `/src/index.js`

T> Please review the [webpack-dev-server options](/configuration/dev-server) and the [concept pages](/concepts) to familiarize yourself with the concepts below

__webpack.config.js__

```js
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, 'src'),

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
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', 'postcss-loader', ],
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


### App code

Let's set up our React app:

__src/index.js__

```js
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

__src/components/App.js__

```js
import React from 'react';
import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <h2>Hello, </h2>
  </div>
);

export default App;
```

__src/components/App.css__

```css
.app {
  text-size-adjust: none;
  font-family: helvetica, arial, sans-serif;
  line-height: 200%;
  padding: 6px 20px 30px;
}
```

Important to note:

1. Setting set `devServer: { hot: true }` causes webpack will expose the `module.hot` API to our code

2. We use the `module.hot` hook to enable HMR for specific resources (`App.js` in this example). The most important property here is `module.hot.accept`, which specifies how to handle changes to specific dependencies.

3. Whenever `src/components/App.js` or its dependencies are changed `module.hot.accept` will fire the `render` method. The `render` method will even fire when `App.css` is changed because it is included in `App.js`.

__dist/index.html__

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

We need to put the index.html file in our `dist` folder because `webpack-dev-server` will not run without it.

### Putting it all together

Finally, lets add a start task to `package.json`, that calls the `webpack-dev-server` binary.

__package.json__

```json
{
  ...
  "scripts" : {
    "start" : "webpack-dev-server"
  }
  ...
}
```

When we run `npm start`, it will launch the webpack dev server, causing our code to be transpiled by Babel, and bundled. Open a browser to `http://localhost:8080`, and check the JS console for logs similar to:
```bash
dev-server.js:49[HMR] Waiting for update signal from WDS…
only-dev-server.js:74[HMR] Waiting for update signal from WDS…
client?c7c8:24 [WDS] Hot Module Replacement enabled.
```

When you edit and save your `App.js` file, you should see something like the following in the console, and the App should update with changes.

```bash
[WDS] App updated. Recompiling…
client?c7c8:91 [WDS] App hot update…
dev-server.js:45 [HMR] Checking for updates on the server…
log-apply-result.js:20 [HMR] Updated modules:
log-apply-result.js:22 [HMR]  - ./components/App.js
dev-server.js:27 [HMR] App is up to date.
```

Note that HMR specifies the paths of the updated modules because we're using `NamedModulesPlugin`.
