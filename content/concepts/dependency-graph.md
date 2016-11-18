---
title: Dependency Graph
sort: 9
contributors:
  - TheLarkInn
---

Any time one file depends on another, webpack treats this as a _dependency_. This allows webpack to take non-code assets, such as images or web fonts, and also provide them as _dependencies_ for your application.

When webpack processes your application, it starts from a list of modules defined on the command line or in its config file.
Starting from these _entry points_, webpack recursively builds a _dependency graph_ that includes every module your application needs, then packages all of those modules into a small number of _bundles_ - often, just one - to be loaded by the browser.

T> Bundling your application is especially powerful for *HTTP/1.1* clients, as it minimizes the number of times your app has to wait while the browser starts a new request. For *HTTP/2*, you can also use Code Splitting and bundling through webpack for the [best optimization](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6#.7y5d3hz59).
