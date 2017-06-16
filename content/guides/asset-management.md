---
title: 管理资源(Asset Management)
sort: 3
contributors:
  - skipjack
  - michael-ciniawsky
---

现在 webpack 的配置都已经设置好了 -- 转换和 lint 你的 JavaScript 模块，使用 [`HTMLWebpackPlugin`](/plugins/html-webpack-plugin) 生成一个 html 文件，甚至可以使用 [css-loader](/loaders/css-loader) 来通过 JavaScript 模块加载 CSS。但请稍待片刻，你的网站需要一大堆其他资源，如图片（例如 `.png`, `.jpg`, `.svg`）、字体（例如 `.woff`, `.woff2`, `.eot`）和数据（例如 `.json`, `.xml`, `.csv`）！

在 webpack 出现之前，前端开发人员会使用 grunt 和 gulp 等工具来处理这些 "web 资源"，并将它们从 `/src` 文件夹移动到 `/dist` 或 `/build` 目录中。同样方式也被用于 JavaScript 模块，但是，你可能已经知道，像 webpack 这样的工具现在将从"入口(enter)"开始，访问你的应用程序，并__动态打包(dynamically bundle)__所有依赖项（创建所谓的[依赖图表(dependency graph)](/concepts/dependency-graph)）。这是极好的创举，因为现在每个模块都可以_明确表述它自身的依赖，我们将避免打包未使用的模块。

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader _引入任何其他类型的文件_。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。让我们从 CSS 开始起步，或许你可能已经熟悉了这个设置过程...


## 加载 CSS

为了从 JavaScript 模块中 `import` 一个 CSS 文件，你只需要在 [`module` 配置中](/configuration/module) 安装并添加 [style-loader](/loaders/style-loader) 和 [css-loader](/loaders/css-loader)……

``` bash
npm install --save-dev style-loader css-loader
```

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  //...
}
```

这使你可以在依赖于此样式的文件中 `import './style.css'`。现在，当该模块运行时，含有 CSS 字符串的 `<style>` 标签，将被插入到 html 文件的 `<head>` 中。

T> 请注意，你也可以进行 [CSS 分离](/guides/code-splitting-css)，以便在生产环境中节省加载时间。最重要的是，现有的 loader 可以支持任何你可以想到的 CSS 处理器风格 - [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader) 和 [less](/loaders/less-loader) 等。


## 加载图片

假想，现在我们正在下载 CSS，但是我们的背景和图标如何处理呢？使用 [file-loader](/loaders/file-loader)，我们可以轻松地将这些内容混合到 CSS 中：

``` bash
npm install --save-dev file-loader
```

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  //...
}
```

现在，当你运行 `import Image from './my-image.png'` 时，该图片会被处理，以及添加到 `output` 目录中，_并且_ `Image` 变量将在处理后，包含该图片的完整 url。使用 [css-loader](/loaders/css-loader) 时，遇到 CSS 中的 `url('./my-image.png')` 也会进行与以上相同的处理过程。loader 将会识别这是一个本地文件，并将 `'./my-image.png'` 路径替换为 `output` 目录中图片的最终路径。[html-loader](/loaders/html-loader) 也会以同样的方式去处理 `<img src="./my-image.png" />`。

T> 下一步是缩小和优化你的图像。关于更多如何增强你的图像加载过程，请查看 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 和 [url-loader](/loaders/url-loader)。


## 加载字体

那么，像字体这样的其他资源如何处理呢？file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体：

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  //...
}
```

一切就绪后，你可以这样定义一个字体……

``` css
@font-face {
  font-family: 'MyFont';
  src:  url('./font.woff2') format('woff2'),
        url('./font.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}
```

然后，相对路径，会被替换为构建目录中的完整路径/文件名。


## 加载数据

此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)。让我们处理这三类文件：

``` bash
npm install --save-dev csv-loader xml-loader
```

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(csv|tsv)$/,
        use: 'csv-loader'
      },
      {
        test: /\.xml$/,
        use: 'xml-loader',
      }
    ]
  },
  //...
}
```

现在，你可以 `import` 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，所导入的 `Data` 变量将包含可直接使用的已解析 JSON：

``` js
import Data from './data.csv'

Data.forEach((row, index) => {
  console.log(`Row ${index}: `, row)
})
```

T> 在使用 [d3](https://github.com/d3) 等工具来实现某些数据可视化时，预加载数据会非常有用。我们可以不用再发送 ajax 请求，然后于运行时解析数据，而是在构建过程中将其提前载入并打包到模块中，以便浏览器加载模块后，可以立即从模块中解析数据。


## 全局资源

上述所有内容中最出色之处是，以这种方式加载资源，你可以以更直观的方式将模块和资源组合在一起。无需依赖于含有全部资源的 `/assets` 目录，而是将资源与代码组合在一起：

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


## 延伸阅读

- [Loading Fonts](https://survivejs.com/webpack/loading/fonts/) on SurviveJS
