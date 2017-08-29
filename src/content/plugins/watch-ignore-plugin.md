---
title: WatchIgnorePlugin
contributors:
  - skipjack
---

无视指定的文件。换句话说，当处于[监视模式(watch mode)](/configuration/watch)下，符合给定地址的文件或者满足给定正则表达式的文件的改动不会触发重编译。

``` javascript
new webpack.WatchIgnorePlugin(paths)
```


## 选项

- `路径(paths)` (array)：一个正则表达式或者绝对路径的数组。表示符合条件的文件将不会被监视
