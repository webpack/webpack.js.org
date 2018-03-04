---
title: 模块解析(Module Resolution)
sort: 8
contributors:
    - pksjce
    - pastelsky
---

resolver 是一个库(library)，用于帮助找到模块的绝对路径。一个模块可以作为另一个模块的依赖模块，然后被后者引用，如下：

```js
import foo from 'path/to/module'
// 或者
require('path/to/module')
```

所依赖的模块可以是来自应用程序代码或第三方的库(library)。resolver 帮助 webpack 找到 bundle 中需要引入的模块代码，这些代码在包含在每个 `require`/`import` 语句中。
当打包模块时，`webpack` 使用 [enhanced-resolve](https://github.com/webpack/enhanced-resolve) 来解析文件路径


## webpack 中的解析规则

使用 `enhanced-resolve`，webpack 能够解析三种文件路径：


### 绝对路径

```js
import "/home/me/file";

import "C:\\Users\\me\\file";
```

由于我们已经取得文件的绝对路径，因此不需要进一步再做解析。


### 相对路径

```js
import "../src/file1";
import "./file2";
```

在这种情况下，使用 `import` 或 `require` 的资源文件(resource file)所在的目录被认为是上下文目录(context directory)。在 `import/require` 中给定的相对路径，会添加此上下文路径(context path)，以产生模块的绝对路径(absolute path)。


### 模块路径

```js
import "module";
import "module/lib/file";
```

模块将在 [`resolve.modules`](/configuration/resolve/#resolve-modules) 中指定的所有目录内搜索。
你可以替换初始模块路径，此替换路径通过使用 [`resolve.alias`](/configuration/resolve/#resolve-alias) 配置选项来创建一个别名。

一旦根据上述规则解析路径后，解析器(resolver)将检查路径是否指向文件或目录。如果路径指向一个文件：

* 如果路径具有文件扩展名，则被直接将文件打包。
* 否则，将使用 [`resolve.extensions`] 选项作为文件扩展名来解析，此选项告诉解析器在解析中能够接受哪些扩展名（例如 `.js`, `.jsx`）。

如果路径指向一个文件夹，则采取以下步骤找到具有正确扩展名的正确文件：

* 如果文件夹中包含 `package.json` 文件，则按照顺序查找 [`resolve.mainFields`](/configuration/resolve/#resolve-mainfields) 配置选项中指定的字段。并且 `package.json` 中的第一个这样的字段确定文件路径。
* 如果 `package.json` 文件不存在或者 `package.json` 文件中的 main 字段没有返回一个有效路径，则按照顺序查找 [`resolve.mainFiles`](/configuration/resolve/#resolve-mainfiles) 配置选项中指定的文件名，看是否能在 import/require 目录下匹配到一个存在的文件名。
* 文件扩展名通过 `resolve.extensions` 选项采用类似的方法进行解析。

webpack 根据构建目标(build target)为这些选项提供了合理的[默认](/configuration/resolve)配置。


## 解析 Loader(Resolving Loaders)

Loader 解析遵循与文件解析器指定的规则相同的规则。但是 [`resolveLoader`](/configuration/resolve/#resolveloader) 配置选项可以用来为 Loader 提供独立的解析规则。


## 缓存

每个文件系统访问都被缓存，以便更快触发对同一文件的多个并行或串行请求。在[观察模式](/configuration/watch/#watch)下，只有修改过的文件会从缓存中摘出。如果关闭观察模式，在每次编译前清理缓存。


有关上述配置的更多信息，请查看[解析 API](/configuration/resolve)学习。

***

> 原文：https://webpack.js.org/concepts/module-resolution/
