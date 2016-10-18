---
title: 如何配置 HMR 热重载？
contributors:
  - jmreidy
---

Hot Module Replacement (HMR) exchanges, adds, or removes modules while an
application is running without a page reload.
HMR is particularly useful in applications using a single state tree,
since components are "dumb" and will reflect the latest application state, even
after their source is changed and they are replaced.

Webpack's power lies in its customizablity, and there are MANY ways of configuring HMR
given the needs of a particular project. The approach described below uses Babel and
React, but these tools are not necessary for HMR to work.
If you'd like to see examples of other approaches,
please request them or, better yet,
[open up a PR with an addition](https://github.com/webpack/webpack.io)

This guide will be demonstrating the use of HMR with Babel,
React, and PostCSS (using CSS Modules).
To follow along, please add the following deps to your `package.json`:

To use HMR, you'll need the following dependencies:

```bash
npm install --save-dev babel@6.5.2 babel-core@6.13.2 babel-loader@6.2.4 babel-preset-es2015@6.13.2 babel-preset-react@6.11.1 babel-preset-stage-2@6.13.0 css-loader@0.23.1 postcss-loader@0.9.1 react-hot-loader@3.0.0-beta.1 style-loader@0.13.1 webpack@2.1.0-beta.20 webpack-dev-server@2.1.0-beta.0
```

In addition, for the purposes of this walkthrough, you'll need:

```bash
npm install --save react@15.3.0 react-dom@15.3.0
```


### Babel Config

Your `.babelrc` file should look like the following:

```bash
{
  "presets": [
    ["es2015", {"modules": false}],
    //Webpack understands the native import syntax, and uses it for tree shaking

    "stage-2",
    //Specifies what level of language features to activate.
    //State 2 is "draft", 4 is finished, 0 is strawman.
    //See https://tc39.github.io/process-document/

    "react"
    //Transpile React components to JS
  ],
  "plugins": [
    "react-hot-loader/babel"
    //Enables React code to work with HMR.
  ]
}
```

### Webpack config

While there's many ways of setting up your Webpack config - via API,
via multiple or single config files, etc - here is the basic information
you should have available.

```js
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = env => {
  return {
    entry: [
      'react-hot-loader/patch',
      //activate HMR for React

      'webpack-dev-server/client?http://localhost:8080',
      //bundle the client for webpack dev server
      //and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      //bundle the client for hot reloading
      //only- means to only hot reload for successful updates


      './index.js'
      //the entry point of our app
    ],
    output: {
      filename: 'bundle.js',
      //the output bundle

      path: resolve(__dirname, 'dist'),

      publicPath: '/'
      //necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, 'src'),

    devtool: 'inline-source-map',

    devServer: {
      hot: true,
      //activate hot reloading

      contentBase: '/dist',
      //match the output path

      publicPath: '/'
      //match the output publicPath
    },

    module: {
      loaders: [
        { test: /\.js$/,
          loaders: [
            'babel',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: [
            'style',
            'css-loader?modules',
            'postcss-loader',
          ],
        },
      ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      //activates HMR

      new webpack.NamedModulesPlugin(),
      //prints more readable module names in the browser console on HMR updates
    ],
  };
};
```

There's a lot going on above, and not all of it is related to HMR.
You may benefit from reading the
[full documentation](https://webpack.github.io/docs/webpack-dev-server.html)
on webpack dev server, and the [other articles](https://webpack.js.org/concepts/)
here on webpack.js.org.

The basic assumption here is that your JS entry is located at `./src/index.js`,
and that you're using CSS Modules for your styling.

Please see the comments inline that explain each portion of the config. The main
areas to look are the `devServer` key and the `entry` key. The `HotModuleReplacementPlugin` is
also necessary to include in the `plugins` array.

There are two modules included here for the purposes of this guide.
The react-hot-loader addition to the entry, as noted above, is necessary to enable
HMR with React components. The NamedModulesPlugin is a useful addition
to better understand what modules are being updated when using HMR.

### Code

In this guide, we're using the following files:

```js
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', render);
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

Now, the above code is using React, but it doesn't need to be. In fact,
the only thing that matters above is the code refering to `module`.
First, we wrap the HMR code inside of `module.hot` check;
webpack exposes `module` to the code, and if we are running with `hot: true` configured,
we'll enter the inside of the conditional.

While the module API offers more options than what's above, the most
important element is the `module.hot.accept` call.
It specific how to handle changes to specific dependencies.

So in this case, `module.hot` will fire the `render` method ONLY
when `src/components/App.js` changes. Note that would also include when the
dependencies of `App.js` change -
so the `render` method will file not just for changes made directly to the
source of `App.js`, but also changes made to `App.css`, since `App.css`
is included in `App.js`.

### Package.json

Finally, we need to start up webpack dev server to bundle our code and see HMR in action.
We can use the following package.json entry:

```json
{
  "scripts": {
    "start" : "webpack-dev-server --env.dev",
  }
}
```

Run `npm start`, open up your browser to `localhost:8080`,
and you should see the folling entries printed in your console.log:

```bash
dev-server.js:49[HMR] Waiting for update signal from WDS…
only-dev-server.js:74[HMR] Waiting for update signal from WDS…
client?c7c8:24 [WDS] Hot Module Replacement enabled.
```

Go ahead and edit and save your App.js file.
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
That's because we're using the NamedModules plugin.
