---
title: 配置(Configuration)
sort: 6
contributors:
- TheLarkInn
- simon04
---

你可能已经注意到，很少有 webpack 配置看起来很完全相同。这是因为 **webpack 的配置文件，是导出一个对象的 JavaScript 文件。**此对象，由 webpack 根据对象定义的属性进行解析。

因为 webpack 配置是标准的 Node.js CommonJS 模块，你**可以做到以下事情**：

* 通过 `require(...)` 导入其他文件
* 通过 `require(...)` 使用 npm 的工具函数
* 使用 JavaScript 控制流表达式，例如 `?:` 操作符
* 对常用值使用常量或变量
* 编写并执行函数来生成部分配置

请在合适的时机使用这些特性。

虽然技术上可行，**但应避免以下做法**：

* 在使用 webpack 命令行接口(CLI)（应该编写自己的命令行接口(CLI)，或[使用 `--env`](/configuration/configuration-types/)）时，访问命令行接口(CLI)参数
* 导出不确定的值（调用 webpack 两次应该产生同样的输出文件）
* 编写很长的配置（应该将配置拆分为多个文件）

T> 你需要从这份文档中收获最大的点，就是你的 webpack 配置，可以有很多种的格式和风格。但为了你和你的团队能够易于理解和维护，你们要始终采取同一种用法、格式和风格。

接下来的例子展示了 webpack 配置对象(webpack configuration object)如何即具有表现力，又具有可配置性，这是因为_配置对象即是代码_：

## 最简单的配置

**webpack.config.js**

```javascript
var path = require('path');

module.exports = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

## 多个 Target

查看：[导出多个配置](/configuration/configuration-types/#exporting-multiple-configurations)

## 使用其他配置语言

webpack 接受以多种编程和数据语言编写的配置文件。

查看：[配置语言](/configuration/configuration-languages/)

***

> 原文：https://webpack.js.org/concepts/configuration/
