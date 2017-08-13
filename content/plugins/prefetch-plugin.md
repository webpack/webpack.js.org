---
title: PrefetchPlugin
contributors:
  - skipjack
---

预取出普通的模块请求(module request)，可以让这些模块在他们被 `import` 或者是 `require` 之前就解析并且编译。使用这个预取插件可以提升性能。可以多试试在编译前记录时间(profile)来决定最佳的预取的节点。

``` javascript
new webpack.PrefetchPlugin([context], request)
```


## 选项

- `context`：文件夹的绝对路径
- `request`：普通模块的 request 字符串
