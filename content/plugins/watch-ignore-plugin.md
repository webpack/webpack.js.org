---
title: WatchIgnorePlugin
contributors:
  - skipjack
---

无视监视插件
无视指定的文件。 举例来说，在[监视模式(watch omde)](/configuration/watch)下，符合给定地址的文件或者满足给定正则表达式的文件的改动不会触发重编译。

``` javascript
new webpack.WatchIgnorePlugin(paths)
```


## Options

选项
- `路径(paths)` (数组): 一个正则表达式或者绝对路径的数组。表示符合条件的文件将不会被监视
