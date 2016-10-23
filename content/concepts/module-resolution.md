---
title: 模块解析
contributors:
    - pksjce
    - dear-lizhihua
---

解析器是一个帮助查找模块绝对路径的库。
一个模块可以作为另一个模块的依赖模块，然后被后者引用，如下

```js
require('/path/to/module')
//or
import mymodule from '/path/to/module'
```

依赖模块可以来自应用程序代码或第三方库。解析器帮助 `webpack` 找到包(bundle)中需要引入的模块代码，这些代码在包含在每个 `require()/import` 这样的语句中。
当打包模块时，`webpack` 使用[增强解析](https://github.com/webpack/enhanced-resolve)来解析文件路径

## webpack 中的解析规则

`webpack` 解析三种文件路径

* 绝对路径

```js
require("/home/me/file");
require("C:\\Home\\me\\file");
```

由于我们已经有了文件的绝对路径，因此不需要进一步解析。

* 相对路径

```js
require("../src/file");
require("./file");
```

在示例中，资源文件的目录被认为是上下文目录(context directory)。给定的相对路径被追加到上下文路径(context path)，以生成文件绝对路径(absolute path)。

* 模块路径

```js
require("module");
require("module/lib/file");
```

模块被指定在 `resolve.modules` 的内部目录中搜索，该目录可以是由不同的路径组成的数组。
别名，即设置 `resolve.alias` 为一个存在的模块路径，允许你使用一个别名替换在 `require/import` 中的模块路径。

一旦根据以上规则解析路径后，解析器将检查路径是指向文件还是目录。如果路径指向文件，那么文件被直接打包。
但是如果路径指向一个文件夹，则采取以下步骤找到具有正确扩展名的正确文件。
* 正确文件是由 `package.json` 中 `main: "<filename>.js"` 字段来决定。
* 如果没有 package.json 或者未找到 main 对应的文件，则会查找 `resolve.mainFiles` 配置选项。
* 如果还是失败，接下来默认查找名为 `index` 的文件。
* `resolve.extensions` 告诉我们解析器解析时可接收的扩展名（例如 `.js, .jsx`）。

## 加载器(Loader)解析

加载器的解析遵循与文件解析器相同的规则。但是 `resolveLoader` 配置可以用来为加载器提供独立的分析规则。

## 缓存

每个文件系统访问都被缓存，以便合并同一事物的多个并行或穿行请求。在观察模式下，只有改变的文件会从缓存中删除（观察者知道哪些文件已更改）。在非观察模式下，在每次编译前清理缓存。

### 不安全的缓存

`resolve.unsafeCache` 配置选项通过主动缓存提高的性能。每个解析过程都被缓存，并且永远不会被清除。在多数情况下是正确的，但是边缘情况下是错误的（什么是边缘情况？）。

有关上述配置的更多信息，请查看[解析 API](/configuration/resolve)。