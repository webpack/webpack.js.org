---
title: 管理资源
sort: 2
contributors:
  - skipjack
  - michael-ciniawsky
  - TheDutchCoder
  - sudarsangp
  - chenxsan
  - EugeneHlushko
  - AnayaDesign
  - wizardofhogwarts
  - astonizer
---

如果你是从开始一直在沿用指南的示例，现在会有一个小项目，显示 "Hello webpack"。现在我们尝试混合一些其他资源，比如 images，看看 webpack 如何处理。

在 webpack 出现之前，前端开发人员会使用 [grunt](https://gruntjs.com/) 和 [gulp](https://gulpjs.com/) 等工具来处理资源，并将它们从 `/src` 文件夹移动到 `/dist` 或 `/build` 目录中。JavaScript 模块也遵循同样方式，但是，像 webpack 这样的工具，将__动态打包__所有依赖（创建所谓的 [依赖图(dependency graph)](/concepts/dependency-graph)）。这是极好的创举，因为现在每个模块都可以_明确表述它自身的依赖_，可以避免打包未使用的模块。

webpack 最出色的功能之一就是，除了引入 JavaScript，还可以通过 loader _引入任何其他类型的文件_。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建 web 站点或 web 应用程序中的所有非 JavaScript 内容。让我们从 CSS 开始起步，或许你可能已经熟悉了下面这些设置。

## 设置 {#setup}

在开始之前，让我们对项目做一个小的修改：

__dist/index.html__

``` diff
  <!doctype html>
  <html>
    <head>
-    <title>起步</title>
+    <title>管理资源</title>
    </head>
    <body>
-     <script src="main.js"></script>
+     <script src="bundle.js"></script>
    </body>
  </html>
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
-     filename: 'main.js',
+     filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```


## 加载 CSS {#loading-css}

为了在 JavaScript 模块中 `import` 一个 CSS 文件，你需要安装 [style-loader](/loaders/style-loader) 和 [css-loader](/loaders/css-loader)，并在 [`module` 配置](/configuration/module) 中添加这些 loader：

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
      path: path.resolve(__dirname, 'dist'),
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader',
+         ],
+       },
+     ],
+   },
  };
```

模块 loader 可以链式调用。链中的每个 loader 都将对资源进行转换。链会逆序执行。第一个 loader 将其结果（被转换后的资源）传递给下一个 loader，依此类推。最后，webpack 期望链中的最后的 loader 返回 JavaScript。

应保证 loader 的先后顺序：'style-loader' 在前，而 'css-loader' 在后。如果不遵守此约定，webpack 可能会抛出错误。

T> webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这个示例中，所有以 `.css` 结尾的文件，都将被提供给 `style-loader` 和 `css-loader`。

这使你可以在依赖于此样式的 js 文件中 `import './style.css'`。现在，在此模块执行过程中，含有 CSS 字符串的 `<style>` 标签，将被插入到 html 文件的 `<head>` 中。

我们尝试一下，通过在项目中添加一个新的 `style.css` 文件，并将其 import 到我们的 `index.js` 中：

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
    const element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.classList.add('hello');

    return element;
  }

  document.body.appendChild(component());
```

现在运行 build 命令：

``` bash
npm run build

...
    Asset      Size  Chunks             Chunk Names
bundle.js  76.4 KiB       0  [emitted]  main
Entrypoint main = bundle.js
...
```

再次在浏览器中打开 `index.html`，你应该看到 `Hello webpack` 现在的样式是红色。要查看 webpack 做了什么，请检查页面（不要查看页面源代码，它不会显示结果，因为 `<style>` 标签是由 JavaScript 动态创建的），并查看页面的 head 标签。它应该包含 style 块元素，也就是我们在 `index.js` 中 import 的 css 文件中的样式。

注意，在多数情况下，你也可以进行 [压缩 CSS](/plugins/mini-css-extract-plugin/#minimizing-for-production)，以便在生产环境中节省加载时间。最重要的是，现有的 loader 可以支持任何你可以想到的 CSS 风格 - [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader) 和 [less](/loaders/less-loader) 等。


## 加载 images 图像 {#loading-images}

假想，现在我们正在下载 CSS，但是像 background 和 icon 这样的图像，要如何处理呢？使用 [file-loader](/loaders/file-loader)，我们可以轻松地将这些内容混合到 CSS 中：

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
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader',
+         ],
+       },
      ],
    },
  };
```

现在，在 `import MyImage from './my-image.png'` 时，此图像将被处理并添加到 `output` 目录，_并且_ `MyImage` 变量将包含该图像在处理后的最终 url。在使用 [css-loader](/loaders/css-loader) 时，如前所示，会使用类似过程处理你的 CSS 中的 `url('./my-image.png')`。loader 会识别这是一个本地文件，并将 `'./my-image.png'` 路径，替换为 `output` 目录中图像的最终路径。而 [html-loader](/loaders/html-loader) 以相同的方式处理 `<img src="./my-image.png" />`。

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
    const element = document.createElement('div');

    // lodash，现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

+   // 将图像添加到我们已经存在的 div 中。
+   const myIcon = new Image();
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

重新构建并再次打开 index.html 文件：

``` bash
npm run build

...
                               Asset      Size  Chunks                    Chunk Names
da4574bb234ddc4bb47cbe1ca4b20303.png  3.01 MiB          [emitted]  [big]
                           bundle.js  76.7 KiB       0  [emitted]         main
Entrypoint main = bundle.js
...
```

如果一切顺利，你现在应该看到你的 icon 图标成为了重复的背景图，以及 `Hello webpack` 文本旁边的 `img` 元素。如果检查此元素，你将看到实际的文件名已更改为 `5c999da72346a995e7e2718865d019c8.png`。这意味着 webpack 在 `src` 文件夹中找到我们的文件，并对其进行了处理！

T> 合乎逻辑下一步是，压缩和优化你的图像。查看 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 和 [url-loader](/loaders/url-loader)，以了解更多关于如何增强加载处理图像功能。


## 加载 fonts 字体 {#loading-fonts}

那么，像字体这样的其他资源如何处理呢？file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，也包括字体。让我们更新 `webpack.config.js` 来处理字体文件：

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader',
+         ],
+       },
      ],
    },
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

配置好 loader 并将字体文件放在合适的位置后，你可以通过一个 `@font-face` 声明将其混合。本地的 `url(...)` 指令会被 webpack 获取处理，就像它处理图片一样：

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

现在，让我们重新构建，然后看下 webpack 是否处理了我们的字体：

``` bash
npm run build

...
                                 Asset      Size  Chunks                    Chunk Names
5439466351d432b73fdb518c6ae9654a.woff2  19.5 KiB          [emitted]
 387c65cc923ad19790469cfb5b7cb583.woff  23.4 KiB          [emitted]
  da4574bb234ddc4bb47cbe1ca4b20303.png  3.01 MiB          [emitted]  [big]
                             bundle.js    77 KiB       0  [emitted]         main
Entrypoint main = bundle.js
...
```

重新打开 `index.html` 看看我们的 `Hello webpack` 文本显示是否换上了新的字体。如果一切顺利，你应该能看到变化。


## 加载数据 {#loading-data}

此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)。让我们处理加载这三类文件：

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
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ],
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader',
+         ],
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader',
+         ],
+       },
      ],
    },
  };
```

在项目中添加一些数据文件：

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
+   |- data.csv
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

__src/data.csv__

``` csv
to,from,heading,body
Mary,John,Reminder,Call Cindy on Tuesday
Zoe,Bill,Reminder,Buy orange juice
Autumn,Lindsey,Letter,I miss you
```

现在，你可以 `import` 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，所导入的 `Data` 变量，将包含可直接使用的已解析 JSON：

__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
  import Icon from './icon.png';
+ import Data from './data.xml';
+ import Notes from './data.csv';

  function component() {
    const element = document.createElement('div');

    // lodash，现在通过 script 标签导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // 将图像添加到我们已经存在的 div 中。
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

+   console.log(Data);
+   console.log(Notes);

    return element;
  }

  document.body.appendChild(component());
```

重新执行 `npm run build` 命令，然后打开 `index.html`。查看开发者工具中的控制台，你应该能够看到导入的数据会被打印出来！

T> 在使用 [d3](https://github.com/d3) 等工具实现某些数据可视化时，这个功能极其有用。可以不用在运行时再去发送一个 ajax 请求获取和解析数据，而是在构建过程中将其提前加载到模块中，以便浏览器加载模块后，直接就可以访问解析过的数据。

W> 只有在使用 JSON 模块默认导出时会没有警告。

```javascript
// 没有警告
import data from './data.json';

// 显示警告，规范不允许这样做。
import { foo } from './data.json';
```

### 自定义 JSON 模块 parser {#customize-parser-of-json-modules}

通过使用 [自定义 parser](/configuration/module/#ruleparserparse) 替代特定的 webpack loader，可以将任何 `toml`、`yaml` 或 `json5` 文件作为 JSON 模块导入。

假设你在 `src` 文件夹下有一个 `data.toml`、一个 `data.yaml` 以及一个 `data.json5` 文件：

__src/data.toml__

```toml
title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
organization = "GitHub"
bio = "GitHub Cofounder & CEO\nLikes tater tots and beer."
dob = 1979-05-27T07:32:00Z
```

__src/data.yaml__

```yaml
title: YAML Example
owner:
  name: Tom Preston-Werner
  organization: GitHub
  bio: |-
    GitHub Cofounder & CEO
    Likes tater tots and beer.
  dob: 1979-05-27T07:32:00.000Z
```

__src/data.json5__

```json5
{
  // comment
  title: "JSON5 Example",
  owner: {
    name: "Tom Preston-Werner",
    organization: "GitHub",
    bio: "GitHub Cofounder & CEO\n\
Likes tater tots and beer.",
    dob: "1979-05-27T07:32:00.000Z"
  }
}
```

首先安装 `toml`，`yamljs` 和 `json5` 的 packages：

```bash
npm install toml yamljs json5 --save-dev
```

并在你的 webpack 中配置它们：

__webpack.config.js__

```javascript
const toml = require('toml'); 
const yaml = require('yamljs');
const json5 = require('json5');
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.toml$/,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      {
        test: /\.yaml$/,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      }
    ]
  }
};
```

__src/index.js__

```javascript
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5';

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`

console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`
```

## 全局资源 {#global-assets}

上述所有内容中最出色之处在于，以这种方式加载资源，你可以以更直观的方式将模块和资源组合在一起。无需依赖于含有全部资源的 `/assets` 目录，而是将资源与代码组合在一起使用。例如，类似这样的结构会非常有用：

``` diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

这种配置方式会使你的代码更具备可移植性，因为现有的集中放置的方式会让所有资源紧密耦合起来。假如你想在另一个项目中使用  `/my-component`，只需将其复制或移动到 `/components` 目录下。只要你已经安装过全部_外部依赖_，并且_已经在配置中定义过相同的 loader_，那么项目应该能够良好运行。

但是，假如你只能被局限在旧有开发方式，或者你有一些在多个组件（视图、模板、模块等）之间共享的资源。你仍然可以将这些资源存储在一个基本目录(base directory)中，甚至配合使用 [alias](/configuration/resolve/#resolvealias) 来使它们更方便 `import 导入`。


## 回退处理 {#wrapping-up}

对于下篇指南，我们无需使用本指南中所有用到的资源，因此我们会进行一些清理工作，以便为下篇指南 [管理输出](/guides/output-management/) 做好准备：

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
-   |- data.csv
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
      path: path.resolve(__dirname, 'dist'),
    },
-   module: {
-     rules: [
-       {
-         test: /\.css$/,
-         use: [
-           'style-loader',
-           'css-loader',
-         ],
-       },
-       {
-         test: /\.(png|svg|jpg|gif)$/,
-         use: [
-           'file-loader',
-         ],
-       },
-       {
-         test: /\.(woff|woff2|eot|ttf|otf)$/,
-         use: [
-           'file-loader',
-         ],
-       },
-       {
-         test: /\.(csv|tsv)$/,
-         use: [
-           'csv-loader',
-         ],
-       },
-       {
-         test: /\.xml$/,
-         use: [
-           'xml-loader',
-         ],
-       },
-     ],
-   },
  };
```

__src/index.js__

``` diff
  import _ from 'lodash';
- import './style.css';
- import Icon from './icon.png';
- import Data from './data.xml';
- import Notes from './data.csv';
-
  function component() {
    const element = document.createElement('div');
-
-   // lodash，现在通过 script 标签导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.classList.add('hello');
-
-   // 将图像添加到我们已经存在的 div 中。
-   const myIcon = new Image();
-   myIcon.src = Icon;
-
-   element.appendChild(myIcon);
-
-   console.log(Data);
-   console.log(Notes);

    return element;
  }

  document.body.appendChild(component());
```


## 下篇指南 {#next-guide}

我们继续移步到 [管理输出](/guides/output-management/)


## 延伸阅读 {#further-reading}

- [加载字体](https://survivejs.com/webpack/loading/fonts/) on SurviveJS
