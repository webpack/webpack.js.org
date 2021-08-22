---
title: 脚手架
sort: 14
contributors:
  - evenstensberg
  - pranshuchittora
  - EugeneHlushko
  - jamesgeorge007
translators:
  - QC-L
  - dear-lizhihua
---

首次设置复杂的 webpack 配置可能会很困难。并且编写高级配置来优化性能会更加困难。下面提供的 `init` 能力，可以让我们使用可自定义的第三方初始化包，来创建 webpack 配置。

## 创建脚手架 $#creating-a-scaffold$

在编写 `webpack-cli` 脚手架之前，请先考虑下要实现的目标和要使用的群体：

- 是否需要实现一个可被多种应用程序和项目使用的通用脚手架？
- 是否需要脚手架支持特定内容，例如同时编写 webpack.config.js 和框架代码的脚手架？
- 谁是潜在的用户，脚手架用户将会有什么样的用户体验？

`webpack-cli` 提供了一种交互式体验，可以对应地自定义输出。例如，询问类似 "你的入口起点是什么？" 这样的问题。

### 编写脚手架 $#writing-a-scaffold$

如果你想要学习如何编写脚手架，这里有许多资源可以参考，可以阅读 [编写脚手架](/contribute/writing-a-scaffold/) 教程作为开始。

`webpack-scaffold` 是用于创建脚手架的工具套件。它包含一些可用于创建脚手架的功能。

### 执行脚手架 $#running-a-scaffold$

可以使用 `webpack-cli init` 执行脚手架：

```bash
webpack-cli init <your-scaffold>
```

#### 在本地运行脚手架 $#running-a-scaffold-locally$

当脚手架 package 位于本地文件系统中时，应将 `init` 指向其路径：

```bash
webpack-cli init path/to/your/scaffold
```

或者，还可以创建一个全局模块并符号链接(symlink)到本地模块：

- 使用 npm

```bash
cd path/to/my-scaffold
npm link
webpack-cli init my-scaffold
```

- 使用 yarn

```bash
cd path/to/my-scaffold
yarn link
webpack-cli init my-scaffold
```

#### 从 npm 运行脚手架 $#running-a-scaffold-from-npm$

如果可以从 npm 获得此 package，则其名称必须以 `webpack-scaffold` 开头，并且可以通过运行以下命令来使用：

```bash
webpack-cli init webpack-scaffold-yourpackage
```

## API $#api$

要创建一个`脚手架`，必须创建一个 [`yeoman-generator`](http://yeoman.io/authoring/)。感谢它的存在，现在可以选择在它的基础上扩展出你自己的 generator，其中同样包括 Yeoman API 中提供的方法。值得注意的是，我们支持常规 webpack 配置的所有属性。为了实现这一点，需要记住一件事：

W> 使用字符串创建对象，而使用双字符串(double string)创建字符串。这意味着，为了创建一个字符串，你必须将其包装在另一个字符串中，以便我们正确验证它。

### 必选项 $#required$

- [`opts.env.configuration`(required)](#optsenvconfigurationrequired)
- [`opts.env.configuration.myObj` (required)](#optsenvconfigurationmyobj-required)
- [`myObj.webpackOptions` (required)](#myobjwebpackoptions-required)
- [`writing` (required)](#writing-required)

### 可选项 $#optional$

- [myObj.merge](#myobjmerge-optional)
- [myObj.topScope](#myobjtopscopeoptional)
- [myObj.configName](#myobjconfignameoptional)

### `opts.env.configuration`（必选项） $#optsenvconfigurationrequired$

`object`

这里是你配置的入口起点，请在 generator 的构造函数中对其进行初始化，以使 CLI 能够正常运行：

```js
class MyScaffold extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {};
  }
}
```

### `opts.env.configuration.myObj`（必选项） $#optsenvconfigurationmyobj-required$

`object`

这里是你的脚手架，此处添加一些选项，CLI 会将其转换为 webpack 配置。你可以根据自己的喜好命名多种不同的脚手架，它们代表不同的配置，例如 `dev.config` 或 `prod.config`：

```js
class MyScaffold extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {},
      prod: {},
    };
  }
}
```

### `myObj.webpackOptions`（必选项） $#myobjwebpackoptions-required$

`object`

该对象具有与常规 webpack [配置](/configuration/) 相同的格式。在此处声明想要预置的属性，例如 `entry`, `output` 和 `context`。可以在 yeoman 方法中对此进行初始化：

```js
this.options.env.configuration.dev.webpackOptions = {
  entry: 'app.js',
  output: {},
};
```

### `writing`（必选项） $#writing-required$

`function`

为了运行脚手架实例，需要将配置写入一个 `.yo-rc.json` 文件。可以使用 yeoman generator 中提供的某个生命周期来完成，例如 `writing` 方法：

```js
class MyScaffold extends Generator {
  writing() {
    this.config.set('configuration', myObj);
  }
}
```

### `myObj.merge`（可选项） $#myobjmerge-optional$

`string`

如果要使用 [`webpack-merge`](https://github.com/survivejs/webpack-merge)，可以将 `myObj` 的 `merge` 属性，设置为需要合并的配置的名称：

```js
this.options.env.configuration.dev.merge = 'myConfig';
```

### `myObj.topScope`（可选项） $#myobjtopscopeoptional$

`[string]`

在 `topScope` 属性中，可以编写配置所需的所有代码，例如模块导入和函数/变量声明：

```js
this.options.env.configuration.dev.topScope = [
  'const webpack = require("webpack");',
  'const path = require("path");',
];
```

### `myObj.configName`（可选项） $#myobjconfignameoptional$

`string`

`configName` 允许自定义配置文件的名称。例如，可以将其命名为 `webpack.base.js` 而不是默认的 `webpack.config.js`：

```js
this.options.env.configuration.dev.configName = 'base';
```
