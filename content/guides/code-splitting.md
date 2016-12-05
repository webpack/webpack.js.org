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

`require.ensure()` 使用 CommonJS 的方式异步导入资源。我们可以通过 `require.ensure([<fileurl>])` 来在代码中定义一个分割点。webpack 便能够为这个分割点内的所有代码创建一个独立的打包文件。参考[这里](/guides/code-splitting-require)，学习如何使用 `require.ensure()`。

?> Document `System.import()`

## 分割资源实现缓存和并行加载

### 分割 CSS

你也可以把 css 代码分割到独立的打包文件中。这样做能够提高打包文件的缓存能力，也能够让浏览器并行加载打包文件，使加载速度获得显著的提升。

参考[这里](/guides/code-splitting-css)，学习如何使用 ExtractTextWebpackPlugin 分割 CSS。

### 分割第三方库代码

很多应用都会因为框架或对于某个功能的需求而用到第三方库。在一段时间内，项目中引用的第三方库版本不会改变，它们的代码也不会改变。然而，程序本身的代码却频繁迭代。把第三方库和程序自身代码一块打包的效率将是非常低下的。如果我们能够把第三库的代码和程序自身的代码分割开来的话，即使程序代码更改了，第三方库的打包文件的 hash 也不会改变。而浏览器能够根据请求的 cache header 缓存资源文件，这样第三方库的打包文件便能够被缓存起来。 

参考[这里](/guides/code-splitting-libraries)，学习如何使用 CommonsChunkPlugin。
