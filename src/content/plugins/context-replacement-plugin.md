---
title: ContextReplacementPlugin
contributors:
  - simon04
related:
  - title: Issue 2783 - ContextReplacementPlugin Description
    url: https://github.com/webpack/webpack/issues/2783#issuecomment-234137265
---

*上下文(Context)* 与一个[带表达式的 require 语句](/guides/dependency-management/#require-with-expression) 相关，例如 `require('./locale/' + name + '.json')`。遇见此类表达式时，webpack 查找目录 (`'./locale/'`) 下符合正则表达式 (`/^.*\.json$/`)的文件。由于 `name` 在编译时(compile time)还是未知的，webpack 会将每个文件都作为模块引入到 bundle 中。

`上下文替换插件(ContextReplacementPlugin)` 允许你覆盖查找规则，该插件有许多配置方式：


## 用法

```javascript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentResource?: string,
  newContentRecursive?: boolean,
  newContentRegExp?: RegExp
)
```

如果资源（或目录）符合 `resourceRegExp` 正则表达式，插件会替换默认资源为 `newContentResource`，布尔值 `newContentRecursive` 表明是否使用递归查找，`newContextRegExp` 用于筛选新上下文里的资源。如果 `newContentResource` 为相对路径，会相对于前一匹配资源路径去解析。

这是一个限制模块使用的小例子：

```javascript
new webpack.ContextReplacementPlugin(
  /moment[\/\\]locale$/,
  /de|fr|hu/
)
```

限定查找 `moment/locale` 上下文里符合 `/de|fr|hu/` 表达式的文件，因此也只会打包这几种本地化内容（更多详细信息，请查看[这个 issue](https://github.com/moment/moment/issues/2373)）。

## 内容回调函数

```javascript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentCallback: (data) => void
)
```

`newContentCallback` 函数的第一形参为[`上下文模块工厂(ContextModuleFactory)`的 `data` 对象](/api/plugins/module-factories/)，你需要覆写该对象的 `request` 属性。

使用这个回调函数，我们可以动态地将请求重定向到一个新的位置：

```javascript
new webpack.ContextReplacementPlugin(/^\.\/locale$/, (context) => {
  if ( !/\/moment\//.test(context.context) ) return;

  Object.assign(context, {
    regExp: /^\.\/\w+/,
    request: '../../locale' // 相对路径解析
  });
}),
```


## 其他选项

`newContentResource` 和 `newContentCreateContextMap` 参数也可用：

```javascript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentResource: string,
  newContentCreateContextMap: object // 将运行时请求(runtime-request)映射到编译时请求(compile-time request)
)
```

这两个参数可以一起使用，来更加有针对性的重定向请求。 `newContentCreateContextMap` 允许你将运行时的请求，映射为形式为对象的编译请求：

```javascript
new ContextReplacementPlugin(/selector/, './folder', {
  './request': './request',
  './other-request': './new-request'
})
```

***

> 原文：https://webpack.js.org/plugins/context-replacement-plugin/
