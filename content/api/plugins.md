---
title: 插件 API(Plugin API)
sort: 4
---

关于编写插件的高阶介绍，可以从阅读 [如何编写插件](/development/how-to-write-a-plugin) 开始。

很多 webpack 中的对象都继承了 Tapable 类，暴露了一个 `plugin` 方法。插件可以使用 `plugin` 方法注入自定义的构建步骤。你可以看到 `compiler.plugin` 和 `compilation.plugin` 被频繁使用。基本上，每个插件的调用都在构建流程中绑定了回调来触发特定的步骤。

每个插件会在 webpack 启动时被安装一次，webpack 通过调用插件的 `apply` 方法来安装它们，并且传递一个 webpack `compiler` 对象的引用。然后你可以调用 `compiler.plugin` 来访问资源的编译和它们独立的构建步骤。下面就是一个示例：

```javascript
// MyPlugin.js

function MyPlugin(options) {
  // 根据 options 配置你的插件
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compile", function(params) {
    console.log("The compiler is starting to compile...");
  });

  compiler.plugin("compilation", function(compilation) {
    console.log("The compiler is starting a new compilation...");

    compilation.plugin("optimize", function() {
      console.log("The compilation is starting to optimize files...");
    });
  });

  compiler.plugin("emit", function(compilation, callback) {
    console.log("The compilation is going to emit files...");
    callback();
  });
};

module.exports = MyPlugin;
```

Then in `webpack.config.js`

```javascript
    plugins: [
        new MyPlugin({options: 'nada'})
    ]
```

## 插件接口

插件接口有下面两种不同区别：

* 基于时间：
  * 同步（默认）：就像上面看到的，使用 return 。
  * 异步：最后的参数是一个回调。规范为：function(err, result)
  * 并行：处理函数（handlers）被并行地调用（异步地）。

* 返回值:
  * 没有委托（bailing）（默认）：没有返回值。
  * 委托：处理函数被按顺序地调用，直到某一个处理函数有返回任何值。
  * 并行委托：处理函数被并行地调用（异步地）。产生的第一个返回值（按顺序地）最后会被使用。
  * 瀑布流：每个处理函数取得并使用上一个处理函数的结果作为参数。

（译注：这里的*处理函数*指插件通过 `plugin` 方法注册的函数）

## `Compiler` 实例

插件需要有 apply 方法（在原型链或绑定原型）来访问 compiler 实例。

**MyPlugin.js**

```javascript
function MyPlugin() {};
MyPlugin.prototype.apply = function (compiler) {
    //现在你可以访问所有的 compiler 实例方法
}
module.exports = MyPlugin;
```

下面这样也可以：

**MyFunction.js**

```javascript
function apply(options, compiler) {
    //现在你可以访问所有的 compiler 实例方法
    //和配置
}

//这里的小技巧可以简单的向插件传递和检查配置项
module.exports = function(options) {
    if (options instanceof Array) {
        options = {
            include: options
        };
    }

    if (!Array.isArray(options.include)) {
        options.include = [ options.include ];
    }

    return {
        apply: apply.bind(this, options)
    };
};

```

### `run(compiler: Compiler)` 异步

编译器的 `run` 方法用来开始一个 compilation。在跟踪模式（watch mode）将不会被调用。

### `watch-run(watching: Watching)` 异步

编译器的 `watch` 方法用来开始一个 watching compilation。在普通模式将不会被调用。
The `watch` method of the Compiler is used to start a watching compilation. This is not called in normal mode.

### `compilation(c: Compilation, params: Object)`

一个 `Compilation` 被创建了。插件可以使用它来得到 `Compilation` 的引用。`params` 对象包含一些有用的引用。

### `normal-module-factory(nmf: NormalModuleFactory)`

一个 `NormalModuleFactory` 被创建了。插件可以使用它来得到 `NormalModuleFactory` 对象的引用。

```javascript
compiler.plugin("normal-module-factory", function(nmf) {
    nmf.plugin("after-resolve", function(data) {
        data.loaders.unshift(path.join(__dirname, "postloader.js"));
    });
});
```

### `context-module-factory(cmf: ContextModuleFactory)`

一个 `ContextModuleFactory` 被创建了。插件可以使用它来得到 `ContextModuleFactory` 对象的引用。

### `compile(params)`

编译器开始编译。在普通模式和跟踪模式都能使用。插件可以在这个时间点来修改 `params` 对象（比如修饰工厂函数）。

```javascript
compiler.plugin("compile", function(params) {
    //你现在处于 "compile" 阶段
});
```

### `make(c: Compilation)` 并行

插件可以在这个时间点，通过 Compilation 的 `addEntry(context, entry, name, callback)` 和 `prefetch(context, dependency, callback)` 方法，向编译添加入口（entries）或者预拉取模块。

### `after-compile(c: Compilation)` 异步

编译过程已经结束，模块已经被封闭（sealed）。下一步是发起输出（emit）生成资源。在这里可以通过一些炫酷的方法使用模块的结果。

处理函数将不会被复制到子编译器中。

### `emit(c: Compilation)` 异步

编译器开始输出生成资源。这里是插件向 `c.assets` 数组添加生成资源的最后机会。

### `after-emit(c: Compilation)` 异步

编译器已经输出所有生成资源。

### `done(stats: Stats)`

所有任务已经完成。

### `failed(err: Error)`

编译器处在跟踪模式并且一个编译已经失败。

### `invalid()`

编译器处在跟踪模式并且一个文件变化被检测到，编译短暂延迟后马上开始（`options.watchDelay`）。

### `after-plugins()`

所有从配置对象中提取的插件已经被加到编译器上。

### `after-resolvers()`

所有从配置对象中提取的插件已经被加到解析器上。

## `Compilation` 实例

编译实例继承于编译器。例如，compiler.compilation 是对所有 require 图表中对象的字面上的编译。这个对象可以访问所有的模块和它们的依赖（大部分是循环依赖）。在编译阶段，模块被加载，封闭，优化，分块，哈希和重建等等。这将是编译中任何操作主要的生命周期。

```javascript
compiler.plugin("compilation", function(compilation) {
    //主要的编译实例
    //随后所有的方法都从 compilation.plugin 上得来
});
```

### `normal-module-loader`

普通模块加载器，真实地一个一个加载模块图表中所有的模块的函数。
is the function that actually loads all the modules in the module graph (one-by-one).

```javascript
compilation.plugin('normal-module-loader', function(loaderContext, module) {
    //这里是所以模块被加载的地方
    //一个接一个，此时还没有依赖被创建
});
```

### `seal`

编译的封闭已经开始。

```javascript
compilation.plugin('seal', function() {
    //你已经不能再接收到任何模块
    //没有参数
});
```

### `optimize`

优化编译。

```javascript
compilation.plugin('optimize', function() {
    //webpack 已经进入优化阶段
    //没有参数
});
```

### `optimize-tree(chunks, modules)` 异步

树的异步优化。

```javascript
compilation.plugin('optimize-tree', function(chunks, modules) {

});
```

### `optimize-modules(modules: Module[])`

模块的优化。

```javascript
compilation.plugin('optimize-modules', function(modules) {
    //树优化期间处理模块数组
});
```

### `after-optimize-modules(modules: Module[])`

模块优化已经结束。

### `optimize-chunks(chunks: Chunk[])`

块的优化。

```javascript
//块的优化在编译中可能运行很长时间

compilation.plugin('optimize-chunks', function(chunks) {
    //这里一般只有一个块，除非你在配置中指定了多个入口
    chunks.forEach(function (chunk) {
        //块含有模块的循环引用
        chunk.modules.forEach(function (module){
            //module.loaders, module.rawRequest, module.dependencies, etc.
        });
    });
});
```

### `after-optimize-chunks(chunks: Chunk[])`

块的优化已经结束。

### `revive-modules(modules: Module[], records)`

从记录中重建模块信息。

### `optimize-module-order(modules: Module[])`

按模块重要性重新排序，第一个模块是最重要的模块，将得到最小的 id。

### `optimize-module-ids(modules: Module[])`

优化模块的 id。

### `after-optimize-module-ids(modules: Module[])`

模块 id 优化已经结束。

### `record-modules(modules: Module[], records)`

存储模块信息到记录。

### `revive-chunks(chunks: Chunk[], records)`

从记录中重建块信息。
Restore chunk info from records.

### `optimize-chunk-order(chunks: Chunk[])`

按块重要性重新排序，第一个块是最重要的模块，将得到最小的 id。

### `optimize-chunk-ids(chunks: Chunk[])`

优化块的 id。

### `after-optimize-chunk-ids(chunks: Chunk[])`

块 id 优化已经结束。

### `record-chunks(chunks: Chunk[], records)`

存储块信息到记录。

### `before-hash`

编译开始哈希前。

### `after-hash`

编译哈希后。

### `before-chunk-assets`

创建块生成资源前。

### `additional-chunk-assets(chunks: Chunk[])`

为块创建附加的生成资源。

### `record(compilation, records)`

存储编译信息到记录。

### `optimize-chunk-assets(chunks: Chunk[])` 异步

优化块的生成资源。

生成资源被存储在 `this.assets`，但是它们并不都是块的生成资源。一个 `Chunk` 有一个 `files` 属性指出这个块创建的所有文件。附加的生成资源被存储在 `this.additionalChunkAssets` 中。

这是一个为每个块添加 banner 的例子。

```javascript
compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
    chunks.forEach(function(chunk) {
        chunk.files.forEach(function(file) {
            compilation.assets[file] = new ConcatSource("\/**Sweet Banner**\/", "\n", compilation.assets[file]);
        });
    });
    callback();
});
```

### `after-optimize-chunk-assets(chunks: Chunk[])`

块生成资源已经被优化。这里是一个来自 [@boopathi](https://github.com/boopathi) 的示例插件，详细的输出每个块里有什么。

```javascript
var PrintChunksPlugin = function() {};
PrintChunksPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation, params) {
        compilation.plugin('after-optimize-chunk-assets', function(chunks) {
            console.log(chunks.map(function(c) {
                return {
                    id: c.id,
                    name: c.name,
                    includes: c.modules.map(function(m) {
                        return m.request;
                    })
                };
            }));
        });
    });
};
```

### `optimize-assets(assets: Object{name: Source})` 异步

优化所有生成资源。

生成资源被存放在 `this.assets`.

### `after-optimize-assets(assets: Object{name: Source})`

生成资源优化已经结束。

### `build-module(module)`

一个模块构建开始前。

```javascript
compilation.plugin('build-module', function(module){
    console.log('build module');
    console.log(module);
});
```

### `succeed-module(module)`

一个模块已经被成功构建。

```javascript
compilation.plugin('succeed-module', function(module){
    console.log('succeed module');
    console.log(module);
});
```

### `failed-module(module)`

一个模块构建失败。

```javascript
compilation.plugin('failed-module', function(module){
    console.log('failed module');
    console.log(module);
});
```

### `module-asset(module, filename)`

一个模块中的一个生成资源被加到编译中。

### `chunk-asset(chunk, filename)`

一个块中的一个生成资源被加到编译中。

## `MainTemplate` 实例

### `startup(source, module, hash)`
```javascript
    compilation.mainTemplate.plugin('startup', function(source, module, hash) {
      if (!module.chunks.length && source.indexOf('__ReactStyle__') === -1) {
        var originName = module.origins && module.origins.length ? module.origins[0].name : 'main';
        return ['if (typeof window !== "undefined") {',
            '  window.__ReactStyle__ = ' + JSON.stringify(classNames[originName]) + ';',
            '}'
          ].join('\n') + source;
      }
      return source;
    });
```

## `Parser` 实例 (`compiler.parser`)

分析器实例接收一个字符串和回调，当字符串能被匹配到时返回一个表达式。

```javascript
compiler.parser.plugin("var rewire", function (expr) {
    //如果你的原模块含有 'var rewire'
    //现在你将得到一个表达式对象的处理函数
    return true;
});
```

### `program(ast)` 委托

获取代码片段的 AST 的通用插件接口。

### `statement(statement: Statement)` 委托

获取代码片段的语句的通用插件接口。

### `call <identifier>(expr: Expression)` 委托

`abc(1)` => `call abc`

`a.b.c(1)` => `call a.b.c`

### `expression <identifier>(expr: Expression)` 委托

`abc` => `expression abc`

`a.b.c` => `expression a.b.c`

### `expression ?:(expr: Expression)` 委托

`(abc ? 1 : 2)` => `expression ?!`

返回一个布尔值来忽略错误路径的分析。

### `typeof <identifier>(expr: Expression)` 委托

`typeof a.b.c` => `typeof a.b.c`

### `statement if(statement: Statement)` 委托

`if(abc) {}` => `statement if`

返回一个布尔值来忽略错误路径的分析。

### `label <labelname>(statement: Statement)` 委托

`xyz: abc` => `label xyz`

### `var <name>(statement: Statement)` 委托

`var abc, def` => `var abc` + `var def`

返回 `false` 对已知的定义不加入变量。

### `evaluate <expression type>(expr: Expression)` 委托

计算一个表达式。

### `evaluate typeof <identifier>(expr: Expression)` 委托

计算一个标识符的类型。

### `evaluate Identifier <identifier>(expr: Expression)` 委托

计算一个标识符是否是未定义的。

### `evaluate defined Identifier <identifier>(expr: Expression)` 委托

计算一个标识符是否是已定义的。

### `evaluate CallExpression .<property>(expr: Expression)` 委托

计算一个成员函数的调用是否是一个成功的表达式。

# `NormalModuleFactory`

### `before-resolve(data)` 异步 瀑布流

工厂函数开始解析前。 `data` 对象含有这些属性：

* `context` 解析目录的绝对路径。
* `request` 表达式的请求。

插件可以修改这个对象或者传递一个新的对象给回调。

### `after-resolve(data)` 异步 瀑布流

工厂函数解析后。 `data` 对象含有这些属性：

* `request` 解析请求。这充当了 NormalModule 的标识符。
* `userRequest` 用户输入的请求。已被解析，但是不包含预加载器或 post 加载器。
* `rawRequest` 未解析的请求。
* `loaders` 解析出的加载器的数组。将传递给 NormalModule 并被执行。
* `resource` 原始资源。将被 NormalModule 读取。
* `parser` 将被 NormalModule 使用的分析器。

# `ContextModuleFactory`

### `before-resolve(data)` 异步 瀑布流

### `after-resolve(data)` 异步 瀑布流

### `alternatives(options: Array)` 异步 瀑布流

## 解析器

* `compiler.resolvers.normal` 普通模块的解析器
* `compiler.resolvers.context` 上下文模块的解析器
* `compiler.resolvers.loader` 加载器的解析器

任何插件都应该使用 `this.fileSystem` 作为文件系统，因为它具有缓存。它只有异步名称函数，但是如果用户使用同步的文件系统接口，它可以变为同步的表现（比如 enhanced-require）。

拼接路径时应该使用 `this.join`。它标准化（normalizes）了路径。这里也有一个 `this.normalizes` 方法。

还有一个可用的委托异步的 forEach 接口 `this.forEachBail(array, iterator, callback)`。

要传递请求到其他解析插件，使用 `this.doResolve(types: String|String[], request: Request, callback)` 方法。`types` 根据优先级的识别会有多种请求类型的可能。

```javascript
interface Request {
  path: String // 请求的当前路径
  request: String // 当前的请求字符串
  query: String // 当前请求的查询字符串，如果有
  module: boolean // 请求是否以模块开始
  directory: boolean // 请求是否指向一个目录
  file: boolean // 请求是否指向一个文件
  resolved: boolean // 请求是否已经被解析
  // 在布尔值属性上，undefined 意味着 false 
}

// 示例
// 在 /home/user/project/file.js 文件中：require("../test?charset=ascii")
{
  path: "/home/user/project",
  request: "../test",
  query: "?charset=ascii"
}
// 在 /home/user/project/file.js 文件中：require("test/test/")
{
  path: "/home/user/project",
  request: "test/test/",
  module: true,
  directory: true
}
```

### `resolve(context: String, request: String)`

解析流程开始前。

### `resolve-step(types: String[], request: Request)`

解析流程中一个单独的步骤开始前。

### `module(request: Request)` 异步 瀑布流

一个模块请求被找到并且要被解析。

### `directory(request: Request)` 异步 瀑布流

一个目录请求被找到并且要被解析。

### `file(request: Request)` 异步 瀑布流

一个文件请求被找到并且要被解析。

### 插件也许可以提供更多扩展点

这里是一个 webpack 提供的默认插件列表。它们都有 `(request: Request)`（是异步和瀑布流的）。

普通模块的流程和上下文是 `module -> module-module -> directory -> file`。

加载器的流程是 `module -> module-loader-module -> module-module -> directory -> file`。

### `module-module`

一个模块应该被在一个特定的目录下被找到。`path` 包含了这个目录。

### `module-loader-module`（仅加载器）

在模块模板被应用到模块名之前使用。流程将从 `module-module` 继续。

***

> 原文：https://webpack.js.org/api/plugins/
