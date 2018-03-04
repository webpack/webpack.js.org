---
title: 作者指引
sort: 2
---

以下部分包含编辑(edit)和格式化(format)网站内容的所有必需知识。请确保在开始编辑或添加之前，你已经进行过一些研究。有时候最困难的地方在于，找到内容应该存在的位置和确定它是否存在。


## 步骤

1. 查看相关的引用文件。
2. 点击`编辑`并展开结构。
3. 提交 PR 修改。


## YAML 文件顶部信息

每篇文章顶部的内容部分，都是以 [YAML Frontmatter](https://jekyllrb.com/docs/frontmatter/) 格式书写：

``` yaml
---
title: 我的文章
sort: 3
contributors:
  - [github 用户名]
related:
  - title: 相关文章的 title
    url: [相关文章的 url]
---
```

让我们来逐个分析：

- `title`：文章的名称。
- `sort`：这篇文章在这类文章的顺序。
- `contributors`：贡献文章的 GitHub 用户列表。
- `related`：所有相关阅读或有用示例。

请注意，`related` 将在页面底部生成__进一步阅读__部分，并且在下面 `contributors` 会生成__贡献__部分。如果你写了一篇文章，并希望获得认可，请不要犹豫，将你的 GitHub 用户名添加到 `contributors` 列表中。


## 文档结构

1. 简介 - 一个或两个段落，以便你了解关于什么和为什么的基本想法。
2. 概述剩余内容 - 将如何呈现内容。
3. 主要内容 - 告诉你答应说的话。
4. 结论 - 告诉你所讲的并重述要点。


## 排版

- webpack 应当总是以小写字母书写。即使在一句话的起始位置也是如此。（[来源](https://github.com/webpack/media#name)）
- loader 应当用反引号(\`)包裹，并且使用[串联式(kebab-cased)](https://en.wikipedia.org/w/index.php?title=Kebab_case)：`css-loader`, `ts-loader`, ……
- plugin 应当用反引号(\`)包裹，并且使用[串联式(kebab-cased)](https://en.wikipedia.org/w/index.php?title=Kebab_case)：`BannerPlugin`, `NpmInstallWebpackPlugin`, ……
- 使用 "webpack 2" 指代特定的 webpack 版本（~~"webpack v2"~~）
- 使用 ES5; ES2015, ES2016, …… 指代 ECMAScript 标准（~~ES6~~, ~~ES7~~）


## 格式化

### 代码

__语法：\`\`\`javascript … \`\`\`__

```javascript
function foo () {
  return 'bar';
}

foo();
```

### 列表

- Boo
- Foo
- Zoo

列表，应该按字母表顺序排列。

### 表格

参数   | 解释说明                                      | 输入类型 | 默认值
----------- | ------------------------------------------------ | ---------- |--------------
--debug     | Switch loaders to debug mode                     | boolean    | false
--devtool   | Define source map type for the bundled resources | string     | -
--progress  | Print compilation progress in percentage         | boolean    | false

表格也一样.

### 配置属性

[配置](/configuration) 属性，应该按字母表顺序排列:

- `devServer.compress`
- `devServer.contentBase`
- `devServer.hot`

### 引用

#### 引用块

**语法：\>**

> 这是一个引用块.

#### 提示

**语法：T\>**

T> 这是一个提示.

**语法：W\>**

W> 这是一个警告.

**语法：?\>**

?> 这个一个 todo 待办项.

***

> 原文：https://webpack.js.org/contribute/writers-guide/
