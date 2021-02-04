---
title: Lazy Loading
sort: 18
contributors:
  - iammerrick
  - chrisVillanueva
  - skipjack
  - byzyk
  - EugeneHlushko
  - AnayaDesign
related:
  - title: Lazy Loading ES2015 Modules in the Browser
    url: https://dzone.com/articles/lazy-loading-es2015-modules-in-the-browser
  - title: Asynchronous vs Deferred JavaScript
    url: https://bitsofco.de/async-vs-defer/
---

T> This guide is a small follow-up to [Code Splitting](/guides/code-splitting). If you have not yet read through that guide, please do so now.

Lazy, or "on demand", loading is a great way to optimize your site or application. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.


## Example

Let's take the example from [Code Splitting](/guides/code-splitting/#dynamic-imports) and tweak it a bit to demonstrate this concept even more. The code there does cause a separate chunk, `lodash.bundle.js`, to be generated and technically "lazy-loads" it as soon as the script is run. The trouble is that no user interaction is required to load the bundle – meaning that every time the page is loaded, the request will fire. This doesn't help us too much and will impact performance negatively.

Let's try something different. We'll add an interaction to log some text to the console when the user clicks a button. However, we'll wait to load that code (`print.js`) until the interaction occurs for the first time. To do this we'll go back and rework the [final _Dynamic Imports_ example](/guides/code-splitting/#dynamic-imports) from _Code Splitting_ and leave `lodash` in the main chunk.

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

__webpack.config.js__

``` diff
  const path = require("path");
+ const { CleanWebpackPlugin } = require("clean-webpack-plugin");
+ const HtmlWebpackPlugin = require("html-webpack-plugin");

  module.exports = {
  mode: "development",
    entry: {
      index: "./src/index.js",
    },
+   plugins: [
+     new CleanWebpackPlugin(),
+     new HtmlWebpackPlugin({
+       title: "Production",
+     }),
+   ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
```

__src/print.js__

``` js
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

__src/index.js__

``` diff
+ import _ from 'lodash';
+
- async function getComponent() {
+ function component() {
    const element = document.createElement('div');
-   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+   const button = document.createElement('button');
+   const br = document.createElement('br');

+   button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.appendChild(br);
+   element.appendChild(button);
+
+   // Note that because a network request is involved, some indication
+   // of loading would need to be shown in a production-level site/app.
+   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
+     const print = module.default;
+
+     print();
+   });

    return element;
  }

- getComponent().then(component => {
-   document.body.appendChild(component);
- });
+ document.body.appendChild(component());
```

W> Note that when using `import()` on ES6 modules you must reference the `.default` property as it's the actual `module` object that will be returned when the promise is resolved.

Now let's run webpack and check out our new lazy-loading functionality:

``` bash
...
          Asset       Size  Chunks                    Chunk Names
print.bundle.js  417 bytes       0  [emitted]         print
index.bundle.js     548 kB       1  [emitted]  [big]  index
     index.html  189 bytes          [emitted]
...
```


## Frameworks

Many frameworks and libraries have their own recommendations on how this should be accomplished within their methodologies. Here are a few examples:

- React: [Code Splitting and Lazy Loading](https://reacttraining.com/react-router/web/guides/code-splitting)
- Vue: [Dynamic Imports in Vue.js for better performance](https://vuedose.tips/tips/dynamic-imports-in-vue-js-for-better-performance/)
- Angular: [Lazy Loading route configuration](https://angular.io/guide/router#milestone-6-asynchronous-routing) and [AngularJS + webpack = lazyLoad](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd)
