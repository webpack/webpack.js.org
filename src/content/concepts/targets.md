---
title: target
sort: 10
contributors:
  - TheLarkInn
  - rouzbeh84
  - johnstew
  - srilman
  - byzyk
  - EugeneHlushko
---

由于 JavaScript 既可以编写服务端代码也可以编写浏览器代码，所以 webpack 提供了多种部署 _target_，你可以在 webpack 的[配置选项](/configuration)中进行设置。

W> webpack 的 `target` 属性，不要和 `output.libraryTarget` 属性混淆。有关 `output` 属性的更多信息，请参阅 [output 指南](/concepts/output/)

## 用法 {#usage}

想设置 `target` 属性，只需在 webpack 配置中设置 target 字段：

**webpack.config.js**

```javascript
module.exports = {
  target: 'node',
};
```

在上述示例中，target 设置为 `node`，webpack 将在类 Node.js 环境编译代码。(使用 Node.js 的 `require` 加载 chunk，而不加载任何内置模块，如 `fs` 或 `path`)。

每个 _target_ 都包含各种 deployment（部署）/environment（环境）特定的附加项，以满足其需求。具体请参阅 [target 可用值](/configuration/target/)。

?> 后续会进一步扩展受欢迎的 target。

## 多 target {#multiple-targets}

虽然 webpack **不支持** 向 `target` 属性传入多个字符串，但是可以通过设置两个独立配置，来构建对 library 进行同构：

**webpack.config.js**

```javascript
const path = require('path');
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js',
  },
  //…
};

const clientConfig = {
  target: 'web', // <=== 默认为 'web'，可省略
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js',
  },
  //…
};

module.exports = [serverConfig, clientConfig];
```

上述示例中，将会在 `dist` 文件夹下创建 `lib.js` 和 `lib.node.js` 文件。

## 资源 {#resources}

从上面选项可以看出，你可以选择部署不同的 _target_。下面是可以参考的示例和资源：

-  **[compare-webpack-target-bundles](https://github.com/TheLarkInn/compare-webpack-target-bundles)**：测试并查看 webpack _target_ 的绝佳资源。同样包含错误上报。
- **[Boilerplate of Electron-React Application](https://github.com/chentsulin/electron-react-boilerplate)**: 一个关于 electron 主进程和渲染进程构建过程的优秀示例。

?> 需要你查看在线代码或样本中 webpack 配置中使用的 target 示例。
