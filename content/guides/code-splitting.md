---
title: 分割代码
sort: 2
contributors:
  - pksjce
---

Code splitting is the most compelling feature for  `webpack` usage. You can split your code into various bundles and load them on demand with`webpack`. It allows to tweak an application for these optimisations using the configuration.
You can load them at a later time in your code or in a specific route only or on an event from the user even.

There are mainly two kind of code-splits that need to be accomplished with `webpack`

## On demand code-splitting

`webpack` can help us split our code into logical pieces or chunks as per our application routes or as per predicted user behaviour. This means that we can load non-essential assets when the user performs an action like route change and demands for it.

### Code splitting with `require.ensure()`

`require.ensure()` is the CommonJS way of including assets asynchronously. By adding `require.ensure([<fileurl>])`, we can define a split point in the code. webpack can then create a separate bundle of all the code inside this split point.
Learn [how to split code](/guides/code-splitting-require) using `require.ensure()`.

?> Document `System.import()`

## Resource splitting for cacheing and parallel loads

### CSS splitting

An application owner would want to split all the css into a separate bundle. This enhances cacheability of the resource bundle and also allows the browser to parallely load the bundle which makes for a solid performance improvement.
Learn [how to split css](/guides/code-splitting-css) using the ExtractTextWebpackPlugin.

### Vendor code splitting

A typical application uses third party libraries for framework/functionality needs. Particular versions of these libraries are used and code here does not change often. However, the application code changes frequently. Bundling application code with third party code would be inefficient. This is because the browser can cache asset files based on the cache header. To take advantage of this, we want to keep the hash of the vendor files constant regardless of application code changes. We can do this only when we separate the bundles for vendor and application code.

Learn [how to split vendor/library](/guides/code-splitting-libraries) code using the CommonsChunkPlugin.