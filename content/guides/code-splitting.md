---
title: 代码分割
sort: 2
contributors:
  - pksjce
  - xie qianyue
---

代码分割是 `webpack` 中最为人称道的特性。你可以把你的代码分割到不同的打包文件(bundle)中，再让 `webpack` 按需加载。这样你便可以对你的程序进行微调优化。你可以延迟加载打包文件，或者只在特定路由下加载，或者被用户事件触发才加载。

总的来说，有两类需要 `webpack` 完成的代码分割工作。

## 按需分割代码

`webpack` 能够按照程序路由或者用户行为把代码分割成更小的逻辑模块。这样的话，我们可以在用户作出某些行为时，例如改变路由时，才去加载某些资源。

### 使用 `require.ensure()` 分割代码

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
