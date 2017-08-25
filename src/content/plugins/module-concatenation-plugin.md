---
title: ModuleConcatenationPlugin
contributors:
  - skipjack
  - TheLarkInn
related:
  - webpack 3: Official Release!!
---

In the past, one of webpack’s trade-offs when bundling was that each module in your bundle would be wrapped in individual function closures. These wrapper functions made it slower for your JavaScript to execute in the browser. In comparison, tools like Closure Compiler and RollupJS ‘hoist’ or concatenate the scope of all your modules into one closure and allow for your code to have a faster execution time in the browser.

This plugin will enable the same concatenation behavior in webpack.

``` js
new webpack.optimize.ModuleConcatenationPlugin()
```

> Scope Hoisting is specifically a feature made possible by ECMAScript Module syntax. Because of this webpack may fallback to normal bundling based on what kind of modules you are using, and [other conditions](https://medium.com/webpack/webpack-freelancing-log-book-week-5-7-4764be3266f5).
