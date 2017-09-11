---
title: DllPlugin
contributors:
  - aretecode
  - sokra
  - opiepj
  - simon04
  - skipjack
related:
  - title: Code Splitting Example
    url: https://github.com/webpack/webpack/tree/master/examples/explicit-vendor-chunk/README.md
---

`DLLPlugin` 和 `DLLReferencePlugin` 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。


## `DllPlugin`

这个插件是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 bundle(dll-only-bundle)。 这个插件会生成一个名为 `manifest.json` 的文件，这个文件是用来让 [`DLLReferencePlugin`](/plugins/dll-plugin#dllreferenceplugin) 映射到相关的依赖上去的。

* `context` (optional): manifest 文件中请求的上下文(context)(默认值为 webpack 的上下文(context))
* `name`: 暴露出的 DLL 的函数名 ([TemplatePaths](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js): `[hash]` & `[name]` )
* `path`: manifest json 文件的**绝对路径** (输出文件)

```javascript
new webpack.DllPlugin(options)
```

在给定的 `path` 路径下创建一个名为 `manifest.json` 的文件。 这个文件包含了从 `require` 和 `import` 的request到模块 id 的映射。 `DLLReferencePlugin` 也会用到这个文件。

这个插件与 [`output.library`](/configuration/output/#output-library) 的选项相结合可以暴露出 (也叫做放入全局域) dll 函数。


## `DllReferencePlugin`

这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。

* `context`: (**绝对路径**) manifest (或者是内容属性)中请求的上下文
* `manifest`: 包含 `content` 和 `name` 的对象，或者在编译时(compilation)的一个用于加载的 JSON manifest 绝对路径
* `content` (optional): 请求到模块 id 的映射 (默认值为 `manifest.content`)
* `name` (optional): dll 暴露的地方的名称 (默认值为 `manifest.name`) (可参考 [`externals`](/configuration/externals/))
* `scope` (optional): dll 中内容的前缀
* `sourceType` (optional): dll 是如何暴露的 ([libraryTarget](/configuration/output/#output-librarytarget))

```javascript
new webpack.DllReferencePlugin(options)
```

通过引用 dll 的 manifest 文件来把依赖的名称映射到模块的 id 上，之后再在需要的时候通过内置的 `__webpack_require__` 函数来 `require` 他们

W> 与 [`output.library`](/configuration/output/#output-library) 保持 `name` 的一致性。


### 模式(Modes)

这个插件支持两种模式，分别是_作用域(scoped)_和_映射(mapped)_。

#### 作用域模式(Scoped Mode)

dll 中的内容可以在模块前缀下才能被引用，举例来说，令`scope = "xyz" `的话，这个 dll 中的名为 `abc` 的文件可以通过 `require("xyz/abc")` 来获取

T> [作用域的用例](https://github.com/webpack/webpack/tree/master/examples/dll-user)

#### 映射模式(Mapped Mode)

dll 中的内容被映射到了当前目录下。如果一个被 `require` 的文件符合 dll 中的某个文件(解析之后)，那么这个dll中的这个文件就会被使用。

由于这是在解析了 dll 中每个文件之后才发生的，相同的路径必须能够确保这个 dll bundle 的使用者(不一定是人，可指某些代码)有权限访问。 举例来说， 假如一个 dll bundle 中含有 `loadash`库 以及 文件`abc`， 那么 `require("lodash")` 和 `require("./abc")` 都不会被编译进主要的 bundle文件，而是会被 dll 所使用。


## 用法(Usage)

W> `DllReferencePlugin` 和 `DLL插件DllPlugin` 都是在_另外_的 webpack 设置中使用的。

**webpack.vendor.config.js**

```javascript
new webpack.DllPlugin({
  context: __dirname,
  name: "[name]_[hash]",
  path: path.join(__dirname, "manifest.json"),
})
```

**webpack.app.config.js**

```javascript
new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require("./manifest.json"),
  name: "./my-dll.js",
  scope: "xyz",
  sourceType: "commonjs2"
})
```


## 示例(Examples)

[Vendor](https://github.com/webpack/webpack/tree/master/examples/dll) and [User](https://github.com/webpack/webpack/tree/master/examples/dll-user)

_两个单独的用例，用来分别演示作用域(scope)和上下文(context)。_

T> 多个 `DllPlugins` 和 `DllReferencePlugins`.


## 引用参考(References)

### Source

* [DllPlugin source](https://github.com/webpack/webpack/tree/master/lib/DllPlugin.js)
* [DllReferencePlugin source](https://github.com/webpack/webpack/tree/master/lib/DllReferencePlugin.js)
* [DllEntryPlugin source](https://github.com/webpack/webpack/blob/master/lib/DllEntryPlugin.js)
* [DllModuleFactory source](https://github.com/webpack/webpack/blob/master/lib/DllModuleFactory.js)
* [ManifestPlugin source](https://github.com/webpack/webpack/blob/master/lib/LibManifestPlugin.js)

### Tests

* [DllPlugin creation test](https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin/0-create-dll/webpack.config.js)
* [DllPlugin without scope test](https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin/2-use-dll-without-scope/webpack.config.js)
* [DllReferencePlugin use Dll test](https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin)
