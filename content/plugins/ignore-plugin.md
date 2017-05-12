---
title: IgnorePlugin
contributors:
  - simon04
---

```js
new webpack.IgnorePlugin(requestRegExp, [contextRegExp])
```

不打包路径满足给定正则表达式的资源。

* `requestRegExp` 测试资源请求路径的正则表达式。
* `contextRegExp` (可选) 测试资源上下文(目录)的正则表达式。

## 典型用例

### 忽略 moment 的本地化内容

[moment](https://momentjs.com/) 2.18 会将所有本地化内容和核心功能一起打包(见[该 GitHub issue](https://github.com/moment/moment/issues/2373))。你可使用 `IgnorePlugin` 在打包时忽略本地化内容:

```js
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```
