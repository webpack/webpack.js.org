---
title: 管理资源
sort: 3
contributors:
  - skipjack
  - michael-ciniawsky
  - TheDutchCoder
  - sudarsangp
---

如果你是从开始一直遵循着指南的示例，现在会有一个小项目，显示 "Hello webpack"。现在我们尝试整合一些其他资源，比如图像，看看 webpack 如何处理。

在 webpack 出现之前，前端开发人员会使用 grunt 和 gulp 等工具来处理资源，并将它们从 `/src` 文件夹移动到 `/dist` 或 `/build` 目录中。同样方式也被用于 JavaScript 模块，但是，像 webpack 这样的工具，将__动态打包(dynamically bundle)__所有依赖项（创建所谓的[依赖图(dependency graph)](/concepts/dependency-graph)）。这是极好的创举，因为现在每个模块都可以_明确表述它自身的依赖，我们将避免打包未使用的模块。

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader _引入任何其他类型的文件_。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。让我们从 CSS 开始起步，或许你可能已经熟悉了这个设置过程。

## 安装

在开始之前，让我们对项目做一个小的修改：

__dist/index.html__

``` diff
  <html>
    <head>
-    <title>Getting Started</title>
+    <title>Asset Management</title>
    </head>
    <body>
      <script src="./bundle.js"></script>
    </body>
  </html>
```


## 加载 CSS

为了从 JavaScript 模块中 `import` 一个 CSS 文件，你需要在 [`module` 配置中](/configuration/module) 安装并添加 [style-loader](/loaders/style-loader) 和 [css-loader](/loaders/css-loader)：

``` bash
npm install --save-dev style-loader css-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

T> webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 `.css` 结尾的全部文件，都将被提供给 `style-loader` 和 `css-loader`。

这使你可以在依赖于此样式的文件中 `import './style.css'`。现在，当该模块运行时，含有 CSS 字符串的 `<style>` 标签，将被插入到 html 文件的 `<head>` 中。

我们尝试一下，通过在项目中添加一个新的 `style.css` 文件，并将其导入到我们的 `index.js` 中：

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

__src/style.css__

``` css
.hello {
  color: red;
}
```

__src/index.js__

``` diff
  import _ from 'lodash';
+ import './style.css';

  function component() {
    var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.classList.add('hello');

    return element;
  }

  document.body.appendChild(component());
```

现在运行构建命令：

``` bash
npm run build

Hash: 9a3abfc96300ef87880f
Version: webpack 2.6.1
Time: 834ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  560 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] ./src/style.css 1 kB {0} [built]
   [2] ./~/css-loader!./src/style.css 191 bytes {0} [built]
   [3] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [4] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [5] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [6] (webpack)/buildin/global.js 509 bytes {0} [built]
   [7] (webpack)/buildin/module.js 517 bytes {0} [built]
   [8] ./src/index.js 351 bytes {0} [built]
```

再次在浏览器中打开 `index.html`，你应该看到 `Hello webpack` 现在的样式是红色。要查看 webpack 做了什么，请检查页面（不要查看页面源代码，因为它不会显示结果），并查看页面的 head 标签。它应该包含我们在 `index.js` 中导入的 style 块元素。

T> 请注意，你也可以进行 [CSS 分离](/plugins/extract-text-webpack-plugin)，以便在生产环境中节省加载时间。最重要的是，现有的 loader 可以支持任何你可以想到的 CSS 处理器风格 - [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader) 和 [less](/loaders/less-loader) 等。


## 加载图片

假想，现在我们正在下载 CSS，但是我们的背景和图标这些图片，要如何处理呢？使用 [file-loader](/loaders/file-loader)，我们可以轻松地将这些内容混合到 CSS 中：

``` bash
npm install --save-dev file-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

现在，当你 `import MyImage from './my-image.png'`，该图像将被处理并添加到 `output` 目录，_并且_ `MyImage` 变量将包含该图像在处理后的最终 url。当使用 [css-loader](/loaders/css-loader) 时，如上所示，你的 CSS 中的 `url('./my-image.png')` 会使用类似的过程去处理。loader 会识别这是一个本地文件，并将 `'./my-image.png'` 路径，替换为`输出`目录中图像的最终路径。[html-loader](/loaders/html-loader) 以相同的方式处理 `<img src="./my-image.png" />`。

我们向项目添加一个图像，然后看它是如何工作的，你可以使用任何你喜欢的图像：

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
+ import Icon from './icon.png';

  function component() {
    var element = document.createElement('div');

    // Lodash，现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

+   // 将图像添加到我们现有的 div。
+   var myIcon = new Image();
+   myIcon.src = Icon;
+
+   element.appendChild(myIcon);

    return element;
  }

  document.body.appendChild(component());
```

__src/style.css__

``` diff
  .hello {
    color: red;
+   background: url('./icon.png');
  }
```

让我们重新构建，并再次打开 index.html 文件：

``` bash
npm run build

Hash: 854865050ea3c1c7f237
Version: webpack 2.6.1
Time: 895ms
                               Asset     Size  Chunks                    Chunk Names
5c999da72346a995e7e2718865d019c8.png  11.3 kB          [emitted]
                           bundle.js   561 kB       0  [emitted]  [big]  main
   [0] ./src/icon.png 82 bytes {0} [built]
   [1] ./~/lodash/lodash.js 540 kB {0} [built]
   [2] ./src/style.css 1 kB {0} [built]
   [3] ./~/css-loader!./src/style.css 242 bytes {0} [built]
   [4] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [5] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [6] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [7] (webpack)/buildin/global.js 509 bytes {0} [built]
   [8] (webpack)/buildin/module.js 517 bytes {0} [built]
   [9] ./src/index.js 503 bytes {0} [built]
```

如果一切顺利，和 `Hello webpack` 文本旁边的 `img` 元素一样，现在看到的图标是重复的背景图片。如果您检查此元素，您将看到实际的文件名已更改为像 `5c999da72346a995e7e2718865d019c8.png` 一样。这意味着 webpack 在 `src` 文件夹中找到我们的文件，并成功处理过它！

T> 合乎逻辑下一步是，压缩和优化您的图像。查看 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 和 [url-loader](/loaders/url-loader)，以了解更多关于如果增强加载处理图片功能。


## 加载字体

那么，像字体这样的其他资源如何处理呢？file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体。让我们更新 `webpack.config.js` 来处理字体文件：

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

在项目中添加一些字体文件：

__project__


``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- my-font.woff
+   |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

通过配置好 loader 并将字体文件放在合适的地方，你可以通过一个 `@font-face` 声明引入。本地的 `url(...)` 指令会被 webpack 获取处理，就像它处理图片资源一样：

__src/style.css__

``` diff
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./my-font.woff2') format('woff2'),
+         url('./my-font.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
+ }

  .hello {
    color: red;
+   font-family: 'MyFont';
    background: url('./icon.png');
  }
```

现在让我们重新构建来看看 webpack 是否处理了我们的字体：

``` bash
npm run build

Hash: b4aef94169088c79ed1c
Version: webpack 2.6.1
Time: 775ms
                                Asset     Size  Chunks                    Chunk Names
 5c999da72346a995e7e2718865d019c8.png  11.3 kB          [emitted]
11aebbbd407bcc3ab1e914ca0238d24d.woff   221 kB          [emitted]
                            bundle.js   561 kB       0  [emitted]  [big]  main
   [0] ./src/icon.png 82 bytes {0} [built]
   [1] ./~/lodash/lodash.js 540 kB {0} [built]
   [2] ./src/style.css 1 kB {0} [built]
   [3] ./~/css-loader!./src/style.css 420 bytes {0} [built]
   [4] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [5] ./src/MyFont.woff 83 bytes {0} [built]
   [6] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [7] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [8] (webpack)/buildin/global.js 509 bytes {0} [built]
   [9] (webpack)/buildin/module.js 517 bytes {0} [built]
  [10] ./src/index.js 503 bytes {0} [built]
```

重新打开 `index.html` 看看我们的 `Hello webpack` 文本显示是否换上了新的字体。如果一切顺利，你应该能看到变化。


## 加载数据

此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)。让我们处理这三类文件：

``` bash
npm install --save-dev csv-loader xml-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

给你的项目添加一些数据文件：

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- data.xml
    |- my-font.woff
    |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

__src/data.xml__

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

现在，你可以 `import` 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，所导入的 `Data` 变量将包含可直接使用的已解析 JSON：

__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
  import Icon from './icon.png';
+ import Data from './data.xml';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    var myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

+   console.log(Data);

    return element;
  }

  document.body.appendChild(component());
```

当你打开 `index.html` 并查看开发者工具中的控制台，你应该能够看到你导入的数据被打印在了上面！

T> 在使用 [d3](https://github.com/d3) 等工具来实现某些数据可视化时，预加载数据会非常有用。我们可以不用再发送 ajax 请求，然后于运行时解析数据，而是在构建过程中将其提前载入并打包到模块中，以便浏览器加载模块后，可以立即从模块中解析数据。


## 全局资源

上述所有内容中最出色之处是，以这种方式加载资源，你可以以更直观的方式将模块和资源组合在一起。无需依赖于含有全部资源的 `/assets` 目录，而是将资源与代码组合在一起。例如，类似这样的结构会非常有用：

``` diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

这种配置方式会使你的代码更具备可移植性，因为现有的统一放置的方式会造成所有资源紧密耦合在一起。假如你想在另一个项目中使用  `/my-component`，只需将其复制或移动到 `/components` 目录下。只要你已经安装了任何_扩展依赖(external dependencies)_，并且你_已经在配置中定义过相同的 loader_，那么项目应该能够良好运行。

但是，假如你无法使用新的开发方式，只能被固定于旧有开发方式，或者你有一些在多个组件（视图、模板、模块等）之间共享的资源。你仍然可以将这些资源存储在公共目录(base directory)中，甚至配合使用 [alias](/configuration/resolve#resolve-alias) 来使它们更方便 `import 导入`。


## 回退处理

对于接下来的指南，我们无需使用本指南中所有用到的资源，因此我们会进行一些清理工作，以便为下一部分指南中的[管理输出章节](/guides/output-management/)做好准备：

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
-   |- data.xml
-   |- my-font.woff
-   |- my-font.woff2
-   |- icon.png
-   |- style.css
    |- index.js
  |- /node_modules
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
-   module: {
-     rules: [
-       {
-         test: /\.css$/,
-         use: [
-           'style-loader',
-           'css-loader'
-         ]
-       },
-       {
-         test: /\.(png|svg|jpg|gif)$/,
-         use: [
-           'file-loader'
-         ]
-       },
-       {
-         test: /\.(woff|woff2|eot|ttf|otf)$/,
-         use: [
-           'file-loader'
-         ]
-       },
-       {
-         test: /\.(csv|tsv)$/,
-         use: [
-           'csv-loader'
-         ]
-       },
-       {
-         test: /\.xml$/,
-         use: [
-           'xml-loader'
-         ]
-       }
-     ]
-   }
  };
```

__src/index.js__

``` diff
  import _ from 'lodash';
- import './style.css';
- import Icon from './icon.png';
- import Data from './data.xml';
-
  function component() {
    var element = document.createElement('div');
-
-   // Lodash，现在通过 script 标签导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.classList.add('hello');
-
-   // 将图像添加到我们已有的 div 中。
-   var myIcon = new Image();
-   myIcon.src = Icon;
-
-   element.appendChild(myIcon);
-
-   console.log(Data);

    return element;
  }

  document.body.appendChild(component());
```


## 下一章节指南

让我们继续移步到[管理输出](/guides/output-management/)


## 延伸阅读

- [加载字体](https://survivejs.com/webpack/loading/fonts/) on SurviveJS

***

> 原文：https://webpack.js.org/guides/asset-management/
