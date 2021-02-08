---
title: 入口起点(entry points)
sort: 1
contributors:
  - TheLarkInn
  - chrisVillanueva
  - byzyk
  - sokra
  - EugeneHlushko
  - Zearin
  - chenxsan
  - adyjs
---

<<<<<<< HEAD
正如我们在 [起步](/guides/getting-started/#using-a-configuration) 中提到的，在 webpack 配置中有多种方式定义 `entry` 属性。除了解释为什么它可能非常有用，我们还将向你展示__如何去__配置 `entry` 属性。

=======
As mentioned in [Getting Started](/guides/getting-started/#using-a-configuration), there are multiple ways to define the `entry` property in your webpack configuration. We will show you the ways you **can** configure the `entry` property, in addition to explaining why it may be useful to you.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## 单个入口（简写）语法 {#single-entry-shorthand-syntax}

用法：`entry: string | [string]`

**webpack.config.js**

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

`entry` 属性的单个入口语法，参考下面的简写：

**webpack.config.js**

```javascript
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
  },
};
```

<<<<<<< HEAD
我们也可以将一个文件路径数组传递给 `entry` 属性，这将创建一个所谓的 __"multi-main entry"__。在你想要一次注入多个依赖文件，并且将它们的依赖关系绘制在一个 "chunk" 中时，这种方式就很有用。
=======
We can also pass an array of file paths to the `entry` property which creates what is known as a **"multi-main entry"**. This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

**webpack.config.js**

```javascript
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
```

当你希望通过一个入口（例如一个库）为应用程序或工具快速设置 webpack 配置时，单一入口的语法方式是不错的选择。然而，使用这种语法方式来扩展或调整配置的灵活性不大。

<<<<<<< HEAD

## 对象语法 {#object-syntax}
=======
## Object Syntax
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

用法：`entry: { <entryChunkName> string | [string] } | {}`

**webpack.config.js**

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
};
```

对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式。

<<<<<<< HEAD
T> __“webpack 配置的可扩展”__是指，这些配置可以重复使用，并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 [webpack-merge](https://github.com/survivejs/webpack-merge)）将它们合并起来。
=======
T> **"Scalable webpack configurations"** are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target, and runtime. They are then merged using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

T> 当你通过插件生成入口时，你可以传递空对象 `{}` 给 `entry`。

### 描述入口的对象 {#entry-description-object}

用于描述入口的对象。你可以使用如下属性：

<<<<<<< HEAD
- `dependOn`:  当前入口所依赖的入口。它们必须在该入口被加载前被加载。
- `filename`:  指定要输出的文件名称。
- `import`:  启动时需加载的模块。
- `library`:  library 的相关选项。
- `runtime`:  运行时 chunk 的名字。如果设置了，就会创建一个以这个名字命名的运行时 chunk，否则将使用现有的入口作为运行时。
=======
- `dependOn`: The entry points that the current entry point depends on. They must be loaded before this entry point is loaded.
- `filename`: Specifies the name of each output file on disk.
- `import`: Module(s) that are loaded upon startup.
- `library`: Options for library.
- `runtime`: The name of the runtime chunk. If set, a runtime chunk with this name is created otherwise an existing entry point is used as runtime.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

**webpack.config.js**

```javascript
module.exports = {
  entry: {
    a2: 'dependingfile.js',
    b2: {
      dependOn: 'a2',
      import: './src/app.js',
    },
  },
};
```

`runtime` 和 `dependOn` 不应在同一个入口上同时使用，所以如下配置无效，并且会抛出错误：

**webpack.config.js**

```javascript
module.exports = {
  entry: {
    a2: './a',
    b2: {
      runtime: 'x2',
      dependOn: 'a2',
      import: './b',
    },
  },
};
```

确保 `runtime` 不能指向已存在的入口名称，例如下面配置会抛出一个错误：

```javascript
module.exports = {
  entry: {
    a1: './a',
    b1: {
      runtime: 'a1',
      import: './b',
    },
  },
};
```

另外 `dependOn` 不能是循环引用的，下面的例子也会出现错误：

```javascript
module.exports = {
  entry: {
    a3: {
      import: './a',
      dependOn: 'b3',
    },
    b3: {
      import: './b',
      dependOn: 'a3',
    },
  },
};
```

## 常见场景 {#scenarios}

以下列出一些入口配置和它们的实际用例：

### 分离 app(应用程序) 和 vendor(第三方库) 入口 {#separate-app-and-vendor-entries}

**webpack.config.js**

```javascript
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js',
  },
};
```

**webpack.prod.js**

```javascript
module.exports = {
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
};
```

**webpack.dev.js**

```javascript
module.exports = {
  output: {
    filename: '[name].bundle.js',
  },
};
```

<<<<<<< HEAD
__这是什么？__这是告诉 webpack 我们想要配置 2 个单独的入口点（例如上面的示例）。

__为什么？__这样你就可以在 `vendor.js` 中存入未做修改的必要 library 或文件（例如 Bootstrap, jQuery, 图片等），然后将它们打包在一起成为单独的 chunk。内容哈希保持不变，这使浏览器可以独立地缓存它们，从而减少了加载时间。

T> 在 webpack < 4 的版本中，通常将 vendor 作为一个单独的入口起点添加到 entry 选项中，以将其编译为一个单独的文件（与 `CommonsChunkPlugin` 结合使用）。<br><br>而在 webpack 4 中不鼓励这样做。而是使用 [`optimization.splitChunks`](/configuration/optimization/#optimizationsplitchunks) 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。__不要__ 为 vendor 或其他不是执行起点创建 entry。
=======
**What does this do?** We are telling webpack that we would like 2 separate entry points (like the above example).

**Why?** With this you can import required libraries or files that aren't modified (e.g. Bootstrap, jQuery, images, etc) inside `vendor.js` and they will be bundled together into their own chunk. Content hash remains the same, which allows the browser to cache them separately thereby reducing load time.

T> In webpack version < 4 it was common to add vendors as a separate entry point to compile it as a separate file (in combination with the `CommonsChunkPlugin`). <br><br> This is discouraged in webpack 4. Instead, the [`optimization.splitChunks`](/configuration/optimization/#optimizationsplitchunks) option takes care of separating vendors and app modules and creating a separate file. **Do not** create an entry for vendors or other stuff that is not the starting point of execution.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

### 多页面应用程序 {#multi-page-application}

**webpack.config.js**

```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
};
```

<<<<<<< HEAD
__这是什么？__我们告诉 webpack 需要三个独立分离的依赖图（如上面的示例）。

__为什么？__在多页面应用程序中，server 会拉取一个新的 HTML 文档给你的客户端。页面重新加载此新文档，并且资源被重新下载。然而，这给了我们特殊的机会去做很多事，例如使用 [`optimization.splitChunks`](/configuration/optimization/#optimizationsplitchunks) 为页面间共享的应用程序代码创建 bundle。由于入口起点数量的增多，多页应用能够复用多个入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。
=======
**What does this do?** We are telling webpack that we would like 3 separate dependency graphs (like the above example).

**Why?** In a multi-page application, the server is going to fetch a new HTML document for you. The page reloads this new document and assets are redownloaded. However, this gives us the unique opportunity to do things like using [`optimization.splitChunks`](/configuration/optimization/#optimizationsplitchunks) to create bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the number of entry points increases.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

T> 根据经验：每个 HTML 文档只使用一个入口起点。具体原因请参阅[此 issue](https://bundlers.tooling.report/code-splitting/multi-entry/#webpack)。
