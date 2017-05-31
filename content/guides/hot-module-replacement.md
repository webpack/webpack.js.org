---
title: Hot Module Replacement
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - aiduryagin
  - rohannair
  - joshsantos
  - drpicox
  - skipjack
related:
  - title: Concepts - Hot Module Replacement
    url: /concepts/hot-module-replacement
  - title: API - Hot Module Replacement
    url: /api/hot-module-replacement
---

Hot Module Replacement (or HMR) is one of the most useful features offered by webpack. It allows all kinds of modules to be updated at runtime without the need for a full refresh. This page focuses on __implementation__ while the [concepts page](/concepts/hot-module-replacement) gives more details on how it works and why it's useful.

W> __HMR__ is not intended for use in production, meaning it should only be used in development. See the [building for production guide](/guides/production-build) for more information.


## Enabling HMR

Enabling this feature is actually fairly simple. Let's take a look at how to set it up with [webpack-dev-server](https://github.com/webpack/webpack-dev-server)...

``` js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',

  plugins: [
    new webpack.HotModuleReplacementPlugin() // Enable HMR
  ],

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
```

Not too bad, huh? Let's test it out using `module.hot.accept`...

__index.js__

``` js
import Lib from './library';

if (module.hot) {
  module.hot.accept('./library', function() {
    console.log('Accepting the updated library module!');
    Library.log();
  })
}
```

__library.js__

``` js
export default {
  log() {
    // Change this after the server is started to test
    console.log('Initial log...')
  }
}
```

Start changing the `console.log` statement in `library.js`, to `'Second log...'` for example, and you should see the following output in the browser console...

``` diff
[HMR] Waiting for update signal from WDS...
main.js:9998 Initial log...
main.js:9468 [WDS] Hot Module Replacement enabled.
+ 2main.js:9468 [WDS] App updated. Recompiling...
+ main.js:9468 [WDS] App hot update...
+ main.js:9912 [HMR] Checking for updates on the server...
+ main.js:9982 Accepting the updated library module!
+ 0.1bafc70….hot-update.js:11 Second log...
+ main.js:9955 [HMR] Updated modules:
+ main.js:9957 [HMR]  - ./src/library.js
+ main.js:9894 [HMR] App is up to date.
```


## Gotchas

Hot Module Replacement can be tricky. For example, let's say I have the following class:

``` js
class Logger {
  log(text) {
    console.log('Logging some text: ', text)
  }
}
```

Even if the underlying module containing this class is patched with new code, any existing instances of the class still have the old `log` method. Meaning if we changed what that method does, it wouldn't be reflected in those old instances unless we re-instantiate them somehow using `module.hot.accept`.

This is just one example, but there are many others that can easily trip people up. Luckily, there are a lot of loaders out there, some mentioned below, that will make using this process much easier.


## HMR with Stylesheets

Hot Module Replacement with CSS is actually fairly straightforward with the help of the `style-loader`. This loader uses `module.hot.accept` behind the scenes to patch `<style>` tags when CSS dependencies are updated. So, with the following webpack configuration...

``` js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  // ...
}
```

hot loading stylesheets is a breeze...

__index.js__

``` js
import Lib from './library';
import './styles.css';

// ...
```

__styles.css__

``` css
body {
  background: blue;
}
```

Change the style on `body` to `background: red;` and you should immediately see the page's background color change without a full refresh.


## Other Code and Frameworks

There are many other loaders and examples out in the community to make HMR interact smoothly with a variety of frameworks and libraries...

- [React Hot Loader](https://github.com/gaearon/react-hot-loader): Tweak react components in real time.
- [Vue Loader](https://github.com/vuejs/vue-loader): This loader supports HMR for vue components out of the box.
- [Elm Hot Loader](https://github.com/fluxxu/elm-hot-loader): Supports HMR for the Elm programming language.
- [Redux HMR](https://survivejs.com/webpack/appendices/hmr-with-react/#configuring-hmr-with-redux): No loader or plugin necessary! A simple change

T> If you know of any other loaders or plugins that help with or enhance Hot Module Replacement please submit a pull request to add to this list!
