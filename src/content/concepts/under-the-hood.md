---
title: 揭示内部原理
sort: 14
contributors:
  - smelukov
  - EugeneHlushko
  - chenxsan
  - amirsaeed671
---

> 此章节描述 webpack 内部实现，对于插件开发人员可能会提供帮助

打包，是指处理某些文件并将其输出为其他文件的能力。

但是，在输入和输出之间，还包括有 [模块](/concepts/modules/), [入口起点](/concepts/entry-points/), chunk, chunk 组和许多其他中间部分。

## 主要部分 {#the-main-parts}

项目中使用的每个文件都是一个 [模块](/concepts/modules/)

**./index.js**

```js
import app from './app.js';
```

**./app.js**

```js
export default 'the app';
```

通过互相引用，这些模块会形成一个图(`ModuleGraph`)数据结构。

在打包过程中，模块会被合并成 chunk。
chunk 合并成 chunk 组，并形成一个通过模块互相连接的图(`ModuleGraph`)。
那么如何通过以上来描述一个入口起点：在其内部，会创建一个只有一个 chunk 的 chunk 组。

**./webpack.config.js**

```js
module.exports = {
  entry: './index.js',
};
```

这会创建出一个名为 `main` 的 chunk 组（`main` 是入口起点的默认名称）。
此 chunk 组包含 `./index.js` 模块。随着 parser 处理 `./index.js` 内部的 import 时， 新模块就会被添加到此 chunk 中。

另外的一个示例：

**./webpack.config.js**

```js
module.exports = {
  entry: {
    home: './home.js',
    about: './about.js',
  },
};
```

这会创建出两个名为 `home` 和 `about` 的 chunk 组。
每个 chunk 组都有一个包含一个模块的 chunk：`./home.js` 对应 `home`，`./about.js` 对应 `about`

> 一个 chunk 组中可能有多个 chunk。例如，[SplitChunksPlugin](/plugins/split-chunks-plugin/) 会将一个 chunk 拆分为一个或多个 chunk。

## chunk {#chunks}

chunk 有两种形式：

- `initial(初始化)` 是入口起点的 main chunk。此 chunk 包含为入口起点指定的所有模块及其依赖项。
- `non-initial` 是可以延迟加载的块。可能会出现在使用 [动态导入(dynamic imports)](/guides/code-splitting/#dynamic-imports) 或者 [SplitChunksPlugin](/plugins/split-chunks-plugin/) 时。

每个 chunk 都有对应的 **asset(资源)**。资源，是指输出文件（即打包结果）。

**webpack.config.js**

```js
module.exports = {
  entry: './src/index.jsx',
};
```

**./src/index.jsx**

```js
import React from 'react';
import ReactDOM from 'react-dom';

import('./app.jsx').then((App) => {
  ReactDOM.render(<App />, root);
});
```

这会创建出一个名为 `main` 的 initial chunk。其中包含：

- `./src/index.jsx`
- `react`
- `react-dom`

以及除 `./app.jsx` 外的所有依赖

然后会为 `./app.jsx` 创建 non-initial chunk，这是因为 `./app.jsx` 是动态导入的。

**Output:**

- `/dist/main.js` - 一个 `initial` chunk
- `/dist/394.js` - `non-initial` chunk

默认情况下，这些 `non-initial` chunk 没有名称，因此会使用唯一 ID 来替代名称。
在使用动态导入时，我们可以通过使用 [magic comment(魔术注释)](/api/module-methods/#magic-comments) 来显式指定 chunk 名称：

```js
import(
  /* webpackChunkName: "app" */
  './app.jsx'
).then((App) => {
  ReactDOM.render(<App />, root);
});
```

**Output:**

- `/dist/main.js` - 一个 `initial` chunk
- `/dist/app.js` - `non-initial` chunk

## output(输出) {#output}

输出文件的名称会受配置中的两个字段的影响：

- [`output.filename`](/configuration/output/#outputfilename) - 用于 `initial` chunk 文件
- [`output.chunkFilename`](/configuration/output/#outputchunkfilename) - 用于 `non-initial` chunk 文件
- 在某些情况下，使用 `initial` 和 `non-initial` 的 chunk 时，可以使用 `output.filename`。

这些字段中会有一些 [占位符](/configuration/output/#template-strings)。常用的占位符如下：

- `[id]` - chunk id（例如 `[id].js` -> `485.js`）
- `[name]` - chunk name（例如 `[name].js` -> `app.js`）。如果 chunk 没有名称，则会使用其 id 作为名称
- `[contenthash]` - 输出文件内容的 md4-hash（例如 `[contenthash].js` -> `4ea6ff1de66c537eb9b2.js`）
