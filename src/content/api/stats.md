---
title: 包含统计数据的文件(Stats Data)
sort: 3
contributors:
  - skipjack
---

通过 webpack 编译源文件时，用户可以生成包含有关于模块的统计数据的 JSON 文件。这些统计数据不仅可以帮助开发者来分析应用的依赖图表，还可以优化编译的速度。这个 JSON 文件可以通过以下的命令来生成:

``` bash
webpack --profile --json > compilation-stats.json
```

这个标识是告诉 webpack `compilation-stats.json` 要包含依赖的图表以及各种其他的编译信息。一般来说，也会把 `--profile` 一起加入，这样每一个包含自身编译数据的[`模块`对象(`modules` object)](#modules-object) 都会添加 `profile` 。


## 结构 (Structure)

最外层的输出 JSON 文件比较容易理解，但是其中还是有一小部分嵌套的数据不是那么容易理解。不过放心，这其中的每一部分都在后面有更详细的解释，并且注释中还附带有超链接可以直接跳入相应的章节。

``` js-with-links
{
  "version": "1.4.13", // 用来编译的 webpack 的版本
  "hash": "11593e3b3ac85436984a", // 编译使用的 hash
  "time": 2469, // 编译耗时 (ms)
  "filteredModules": 0, // 当 [`exclude`](/configuration/stats/#stats)传入[`toJson`](/api/node/#stats-tojson-options-) 函数时，统计被无视的模块的数量
  "assetsByChunkName": {
    // 用作映射的 chunk 的名称
    "main": "web.js?h=11593e3b3ac85436984a",
    "named-chunk": "named-chunk.web.js",
    "other-chunk": [
      "other-chunk.js",
      "other-chunk.css"
    ]
  },
  "assets": [
    // [asset 对象 (asset objects)](#asset-objects) 的数组
  ],
  "chunks": [
    // [chunk 对象 (chunk objects)](#chunk-objects) 的数组
  ],
  "modules": [
    // [模块对象 (module objects)](#module-objects) 的数组
  ],
  "errors": [
    // [错误字符串 (error string)](#errors-and-warnings) 的数组
  ],
  "warnings": [
    // [警告字符串 (warning string)](#errors-and-warnings) 的数组
  ]
}
```


### Asset对象 (Asset Objects)

每一个 `assets` 对象都表示一个编译出的 `output` 文件。 `assets` 都会有一个共同的结构：

``` js
{
  "chunkNames": [], // 这个 asset 包含的 chunk
  "chunks": [ 10, 6 ], // 这个 asset 包含的 chunk 的 id
  "emitted": true, // 表示这个 asset 是否会让它输出到 output 目录
  "name": "10.web.js", // 输出的文件名
  "size": 1058 // 文件的大小
}
```


### Chunk对象 (Chunk Objects)

每一个 `chunks` 表示一组称为 [chunk](/glossary#c) 的模块。每一个对象都满足以下的结构。

``` js-with-links
{
  "entry": true, // 表示这个 chunk 是否包含 webpack 的运行时
  "files": [
    // 一个包含这个 chunk 的文件名的数组
  ],
  "filteredModules": 0, // 见上文的 [结构](#Structure)
  "id": 0, // 这个 chunk 的id
  "initial": true, // 表示这个 chunk 是开始就要加载还是 [懒加载(lazy-loading)](/guides/lazy-loading)
  "modules": [
    // [模块对象 (module objects)](#module-objects)的数组
    "web.js?h=11593e3b3ac85436984a"
  ],
  "names": [
    // 包含在这个 chunk 内的 chunk 的名字的数组
  ],
  "origins": [
    // 下文详述
  ],
  "parents": [], // 父 chunk 的 ids
  "rendered": true, // 表示这个 chunk 是否会参与进编译
  "size": 188057 // chunk 的大小(byte)
}
```

`chunks` 对象还会包含一个 `来源 (origins)` ，来表示每一个 chunk 是从哪里来的。 `来源 (origins)` 是以下的形式

``` js-with-links
{
  "loc": "", // 具体是哪行生成了这个chunk
  "module": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的位置
  "moduleId": 0, // 模块的ID
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的地址
  "moduleName": "./lib/index.web.js", // 模块的相对地址
  "name": "main", // chunk的名称
  "reasons": [
    // [模块对象](#模块对象)中`reason`的数组
  ]
}
```


### 模块对象 (Module Objects)

缺少了对实际参与进编译的模块的描述，这些数据又有什么意义呢。每一个在依赖图表中的模块都可以表示成以下的形式。

``` js-with-links
{
  "assets": [
    // [asset对象 (asset objects)](#asset-objects)的数组
  ],
  "built": true, // 表示这个模块会参与 [Loaders](/concepts/loaders) , 解析, 并被编译
  "cacheable": true, // 表示这个模块是否会被缓存
  "chunks": [
    // 包含这个模块的 chunks 的 id
  ],
  "errors": 0, // 处理这个模块发现的错误的数量
  "failed": false, // 编译是否失败
  "id": 0, // 这个模块的ID (类似于 [`module.id`](/api/module-variables#module-id-commonjs-))
  "identifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // webpack内部使用的唯一的标识
  "name": "./lib/index.web.js", // 实际文件的地址
  "optional": false, // 每一个对这个模块的请求都会包裹在 `try... catch` 内 (与ESM无关)
  "prefetched": false, // 表示这个模块是否会被 [prefetched](/plugins/prefetch-plugin)
  "profile": {
    // 有关 [`--profile` flag](/api/cli#profiling) 的这个模块特有的编译数据 (ms)
    "building": 73, // 载入和解析
    "dependencies": 242, // 编译依赖
    "factory": 11 // 解决依赖
  },
  "reasons": [
    // 见下文描述
  ],
  "size": 3593, // 预估模块的大小 (byte)
  "source": "// Should not break it...\r\nif(typeof...", // 字符串化的输入
  "warnings": 0 // 处理模块时警告的数量
}
```

每一个模块都包含一个 `理由 (reasons)` 对象，这个对象描述了这个模块被加入依赖图表的理由。每一个 `理由 (reasons)` 都类似于上文 [chunk objects](#chunk-objects)中的 `来源 (origins)`:

``` js-with-links
{
  "loc": "33:24-93", // 导致这个被加入依赖图标的代码行数
  "module": "./lib/index.web.js", // 所基于模块的相对地址 [context](/configuration/entry-context/#context)
  "moduleId": 0, // 模块的 ID
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的地址
  "moduleName": "./lib/index.web.js", // 可读性更好的模块名称 (用于 "更好的打印 (pretty-printing)")
  "type": "require.context", // 使用的[请求的种类 (type of request)](/api/module-methods)
  "userRequest": "../../cases" // 用来 `import` 或者 `require` 的源字符串
}
```


### 错误与警告

`错误 (errors)` 和 `警告 (warnings)` 会包含一个字符串数组。每个字符串包含了信息和栈的追溯:

``` bash
../cases/parsing/browserify/index.js
Critical dependencies:
2:114-121 This seem to be a pre-built javascript file. Even while this is possible, it's not recommended. Try to require to orginal source to get better results.
 @ ../cases/parsing/browserify/index.js 2:114-121
```

W> 需要注意的是，当 `错误详情为false(errorDetails:false)`传入`toJson`函数时，对栈的追溯就不会被显示。`错误详情(errorDetils)` 默认值为 `true`
