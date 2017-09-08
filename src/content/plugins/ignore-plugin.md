---
title: IgnorePlugin
contributors:
  - simon04
---

防止在 `import` 或 `require` 调用时，生成以下正则表达式匹配的模块：

* `requestRegExp` 匹配(test)资源请求路径的正则表达式。
* `contextRegExp` （可选）匹配(test)资源上下文（目录）的正则表达式。

``` js
new webpack.IgnorePlugin(requestRegExp, [contextRegExp])
```

以下示例演示了此插件的几种用法。


## 忽略 moment 的本地化内容

[moment](https://momentjs.com/) 2.18 会将所有本地化内容和核心功能一起打包（见[该 GitHub issue](https://github.com/moment/moment/issues/2373)）。你可使用 `IgnorePlugin` 在打包时忽略本地化内容:

```js
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```

***

> 原文：https://webpack.js.org/plugins/ignore-plugin/
