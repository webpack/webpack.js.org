---
title: style-loader
source: https://raw.githubusercontent.com/webpack-contrib/style-loader/master/README.md
edit: https://github.com/webpack-contrib/style-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/style-loader
translators:
  - lmhcoding
  - jacob-lcs
  - QC-L
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



把 CSS 插入到 DOM 中。

## 快速开始 {#getting-started}

首先，你需要安装 `style-loader`：

```console
npm install --save-dev style-loader
```

推荐将 `style-loader` 与 [`css-loader`](/loaders/css-loader/) 一起使用

然后把 loader 添加到你的 `webpack` 配置中。比如：

**style.css**

```css
body {
  background: green;
}
```

**component.js**

```js
import "./style.css";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

## Options {#options}

<<<<<<< HEAD
|              名称               |         类型         |  默认值   | 描述                                              |
| :-----------------------------: | :------------------: | :--------: | :------------------------------------------------------- |
| [**`injectType`**](#injecttype) |      `{String}`      | `styleTag` | 配置把 styles 插入到 DOM 中的方式 |
| [**`attributes`**](#attributes) |      `{Object}`      |    `{}`    | 添加自定义属性到插入的标签中              |
|     [**`insert`**](#insert)     | `{String\|Function}` |   `head`   | 在指定的位置插入标签 |
|       [**`base`**](#base)       |      `{Number}`      |   `true`   | 基于 (DLLPlugin) 设置 module ID |
|   [**`esModule`**](#esmodule)   |     `{Boolean}`      |  `false`   | 使用 ES modules 语法                                       |
|    [**`modules`**](#modules)    |      `{Object}`      | `undefined`| 配置 CSS Modules                                |
=======
|                     Name                      |         Type         |   Default   | Description                                                |
| :-------------------------------------------: | :------------------: | :---------: | :--------------------------------------------------------- |
|        [**`injectType`**](#injecttype)        |      `{String}`      | `styleTag`  | Allows to setup how styles will be injected into the DOM   |
|        [**`attributes`**](#attributes)        |      `{Object}`      |    `{}`     | Adds custom attributes to tag                              |
|            [**`insert`**](#insert)            | `{String\|Function}` |   `head`    | Inserts tag at the given position into the DOM             |
| [**`styleTagTransform`**](#styletagtransform) |     `{Function}`     | `undefined` | Transform tag and css when insert 'style' tag into the DOM |
|              [**`base`**](#base)              |      `{Number}`      |   `true`    | Sets module ID base (DLLPlugin)                            |
|          [**`esModule`**](#esmodule)          |     `{Boolean}`      |   `true`    | Use ES modules syntax                                      |
>>>>>>> b3ce25d6670851b05ede7bf57623de457e983a63

### `injectType` {#injecttype}

Type: `String`
Default: `styleTag`

配置把 styles 插入到 DOM 中的方式。

可选值：

- `styleTag`
- `singletonStyleTag`
- `autoStyleTag`
- `lazyStyleTag`
- `lazySingletonStyleTag`
- `lazyAutoStyleTag`
- `linkTag`

#### `styleTag` {#styletag}

通过使用多个 `<style></style>` 自动把 styles 插入到 DOM 中。该方式是默认行为。

**component.js**

```js
import "./styles.css";
```

使用 Locals (CSS Modules) 的例子：

**component-with-css-modules.js**

```js
import styles from "./styles.css";

const divElement = document.createElement("div");
divElement.className = styles["my-class"];
```

导入的对象保存着所有的 locals (class names)。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
<<<<<<< HEAD
          // 由于是默认行为，`injectType` 选项可以省略
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          'css-loader',
=======
          // The `injectType`  option can be avoided because it is default behaviour
          { loader: "style-loader", options: { injectType: "styleTag" } },
          "css-loader",
>>>>>>> b3ce25d6670851b05ede7bf57623de457e983a63
        ],
      },
    ],
  },
};
```

此 loader 插入的 style 效果如下：

```html
<style>
  .foo {
    color: red;
  }
</style>
<style>
  .bar {
    color: blue;
  }
</style>
```

#### `singletonStyleTag` {#singletonstyletag}

通过使用一个 `<style></style>` 来自动把 styles 插入到 DOM 中。

> ⚠ Source map 不起作用

**component.js**

```js
import "./styles.css";
```

**component-with-css-modules.js**

```js
import styles from "./styles.css";

const divElement = document.createElement("div");
divElement.className = styles["my-class"];
```

导入的对象保存着所有的 locals  (class names)。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "singletonStyleTag" },
          },
          "css-loader",
        ],
      },
    ],
  },
};
```

loader 插入的 styles 如下：

```html
<style>
  .foo {
    color: red;
  }
  .bar {
    color: blue;
  }
</style>
```

<<<<<<< HEAD
#### `lazyStyleTag` {#lazystyletag}
=======
#### `autoStyleTag`

Works the same as a [`styleTag`](#styletag), but if the code is executed in IE6-9, turns on the [`singletonStyleTag`](#singletonstyletag) mode.

#### `lazyStyleTag`
>>>>>>> b3ce25d6670851b05ede7bf57623de457e983a63

在需要时使用多个 `<style></style>` 把 styles 插入到 DOM 中。

推荐 lazy style 遵循使用 `.lazy.css` 作为后缀的命名约定，`style-loader` 基本用法是使用 `.css` 作为文件后缀（其他文件也一样，比如：`.lazy.less` 和 `.less`）。

当使用 `lazyStyleTag` 时，`style-loader` 将惰性插入 styles，在需要使用 styles 时可以通过 `style.use()` / `style.unuse()` 使 style 可用。

> ⚠️ 调用 `unuse` 多于 `use` 时，其表现会不确定。因此，请不要这么做。

**component.js**

```js
import styles from "./styles.lazy.css";

styles.use();
// 要移除 styles 时你可以调用
// styles.unuse();
```

**component-with-css-modules.js**

```js
import styles from "./styles.lazy.css";

styles.use();

const divElement = document.createElement("div");
divElement.className = styles.locals["my-class"];
```

导入的对象的 `locals` 属性保存着所有的 locals (class names)。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.lazy\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.lazy\.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "lazyStyleTag" } },
          "css-loader",
        ],
      },
    ],
  },
};
```

此 loader 插入的 style 效果如下：


```html
<style>
  .foo {
    color: red;
  }
</style>
<style>
  .bar {
    color: blue;
  }
</style>
```

#### `lazySingletonStyleTag` {#lazysingletonstyletag}

在必要时，使用 `<style></style>` 把 style 插入的 DOM 中。

推荐 lazy style 遵循使用 `.lazy.css` 作为后缀的命名约定，`style-loader` 基本用法是使用 `.css` 作为文件后缀（其他文件也一样，比如：`.lazy.less` 和 `.less`）。

当使用 `lazySingletonStyleTag` 时，`style-loader` 将惰性插入 styles，在需要使用 styles 时可以通过 `style.use()` / `style.unuse()` 使 style 可用。

> ⚠️ Source maps 不起作用

> ⚠️ 调用 `unuse` 多于 `use` 时，其表现会不确定。因此，请不要这么做。

**component.js**

```js
import styles from "./styles.css";

styles.use();
// 要移除 styles 时你可以调用
// styles.unuse();
```

**component-with-css-modules.js**

```js
import styles from "./styles.lazy.css";

styles.use();

const divElement = document.createElement("div");
divElement.className = styles.locals["my-class"];
```

导入的对象的 `locals` 属性保存着所有的 locals (class names)。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.lazy\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.lazy\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "lazySingletonStyleTag" },
          },
          "css-loader",
        ],
      },
    ],
  },
};
```

此 loader 生成的代码如下：

```html
<style>
  .foo {
    color: red;
  }
  .bar {
    color: blue;
  }
</style>
```

<<<<<<< HEAD
#### `linkTag` {#linktag}
=======
#### `lazyAutoStyleTag`

Works the same as a [`lazyStyleTag`](#lazystyletag), but if the code is executed in IE6-9, turns on the [`lazySingletonStyleTag`](#lazysingletonstyletag) mode.

#### `linkTag`
>>>>>>> b3ce25d6670851b05ede7bf57623de457e983a63

使用多个 `<link rel="stylesheet" href="path/to/file.css">` 将 styles 插入到 DOM 中。

> ℹ️ 此 loader 会在运行时使用 JavaScript 动态地插入 `<link href="path/to/file.css" rel="stylesheet">`。要静态插入 `<link href="path/to/file.css" rel="stylesheet">` 时请使用[MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/)。

```js
import "./styles.css";
import "./other-styles.css";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.link\.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "linkTag" } },
          { loader: "file-loader" },
        ],
      },
    ],
  },
};
```

此 loader 生成的代码如下：

```html
<link rel="stylesheet" href="path/to/style.css" />
<link rel="stylesheet" href="path/to/other-styles.css" />
```

### `attributes` {#attributes}

Type: `Object`
Default: `{}`

如果配置了 `attributes`，`style-loader` 将会在 `<style>` / `<link>` 上绑定指定的 `attributes` 以及它们的值。

**component.js**

```js
import style from "./file.css";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { attributes: { id: "id" } } },
          { loader: "css-loader" },
        ],
      },
    ],
  },
};
```

```html
<style id="id"></style>
```

### `insert` {#insert}

Type: `String|Function`
Default: `head`

默认情况下，除非指定 `insert`，否则 `style-loader` 会把 `<style>` / `<link>` 添加到页面的 `<head>` 标签尾部。

这会使得 `style-loader` 创建的 CSS 比 `<head>` 标签内已经存在的 CSS 拥有更高的优先级。
当默认行为不能满足你的需求时，你可以使用其他值，但我们不推荐这么做。

如果你指定 [iframe](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement) 作为插入的目标时，请确保你有足够的访问权限，styles 将会被插入到 content document 的 head 标签中。

#### `String` {#string}

配置 styles 插入 DOM 的自定义 [query selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: "body",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
};
```

`<style>` / `<link>` 元素将会被插入到 `body` 标签底部。

#### `Function` {#function}

允许覆盖默认行为并把 styles 插入到任意位置。

> ⚠ 不要忘了这个函数会在浏览器中调用，由于不是所有浏览器都支持最新的 ECMA 特性，如：`let`，`const`，`allow function expression` 等，我们推荐只使用 ECMA 5 特性，但这取决于你想要支持的浏览器版本。

> ⚠ 不要忘了版本较旧的浏览器中某些 DOM 方法并不可用，所以我们推荐只使用 [DOM core level 2 properties](https://caniuse.com/#search=dom%20core)，但这取决于想要支持的浏览器版本。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: function insertAtTop(element) {
                var parent = document.querySelector("head");
                // eslint-disable-next-line no-underscore-dangle
                var lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;

                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                // eslint-disable-next-line no-underscore-dangle
                window._lastElementInsertedByStyleLoader = element;
              },
            },
          },
          "css-loader",
        ],
      },
    ],
  },
};
```

在 `head` 标签顶部插入styles。

<<<<<<< HEAD
### `base` {#base}
=======
### `styleTagTransform`

Type: `Function`
Default: `undefined`

Transform tag and css when insert 'style' tag into the DOM.

> ⚠ Do not forget that this code will be used in the browser and not all browsers support latest ECMA features like `let`, `const`, `arrow function expression` and etc, we recommend use only ECMA 5 features, but it is depends what browsers you want to support
> ⚠ Do not forget that some DOM methods may not be available in older browsers, we recommended use only [DOM core level 2 properties](https://caniuse.com/#search=dom%20core), but it is depends what browsers you want to support

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "styleTag",
              styleTagTransform: function (css, style) {
                // Do something ...
                style.innerHTML = `${css}.modify{}\n`;

                document.head.appendChild(style);
              },
            },
          },
          "css-loader",
        ],
      },
    ],
  },
};
```

### `base`
>>>>>>> b3ce25d6670851b05ede7bf57623de457e983a63

这个配置主要是作为使用 [DllPlugin](https://robertknight.me.uk/posts/webpack-dll-plugins/) 时出现 [css clashes](https://github.com/webpack-contrib/style-loader/issues/163) 问题时的解决方案。`base` 允许你通过指定一个比 _DllPlugin1_ 使用的 css 模块 id 大的值，来避免应用程序中的 css (或者 DllPlugin2 的 css) 被 DllPlugin1 中的 css 覆盖问题。比如：

**webpack.dll1.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

**webpack.dll2.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { base: 1000 } },
          "css-loader",
        ],
      },
    ],
  },
};
```

**webpack.app.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { base: 2000 } },
          "css-loader",
        ],
      },
    ],
  },
};
```

### `esModule` {#esmodule}

Type: `Boolean`
Default: `true`

默认情况下，`style-loader` 生成使用 ES 模块语法的 JS 模块。在某些情况下使用 ES 模块语法更好，比如：[module concatenation](/plugins/module-concatenation-plugin/) 和 [tree shaking](/guides/tree-shaking/) 时。

你可以使用下面的配置启用 CommonJS 模块语法：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "style-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
### `modules` {#modules}

类型：`Object`
默认值：`undefined`

配置 CSS 模块。

#### `namedExport` {#namedexport}

类型：`Boolean`
默认值：`false`

启用/禁用本地 ES 模块的命名导出功能。
=======
## Examples

### Recommend

For `production` builds it's recommended to extract the CSS from your bundle being able to use parallel loading of CSS/JS resources later on.
This can be achieved by using the [mini-css-extract-plugin](/plugins/mini-css-extract-plugin/), because it creates separate css files.
For `development` mode (including `webpack-dev-server`) you can use `style-loader`, because it injects CSS into the DOM using multiple <style></style> and works faster.

> i Do not use together `style-loader` and `mini-css-extract-plugin`.

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
};
```

### Named export for CSS Modules
>>>>>>> b3ce25d6670851b05ede7bf57623de457e983a63

> ⚠ 本地命名导出时，会将其名称转换为 `camelCase` 的形式。

> ⚠ 并且不允许在 css 的 class 名中使用 JavaScript 的保留字。

<<<<<<< HEAD
> ⚠ 在 `css-loader` 和 `style-loader` 中，选项 `esModule` 和 `modules.namedExport` 应启用。
=======
> ⚠ Options `esModule` and `modules.namedExport` in `css-loader` should be enabled.
>>>>>>> b3ce25d6670851b05ede7bf57623de457e983a63

**styles.css**

```css
.foo-baz {
  color: red;
}
.bar {
  color: blue;
}
```

**index.js**

```js
import { fooBaz, bar } from "./styles.css";

console.log(fooBaz, bar);
```

你可以使用如下方法为 ES 模块启用命名导出功能：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: true,
              },
            },
          },
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
## 示例 {#examples}

### 推荐 {#recommend}

推荐 `production` 环境的构建将 CSS 从你的 bundle 中分离出来，这样可以使用 CSS/JS 文件的并行加载。
这可以通过使用 `mini-css-extract-plugin` 来实现，因为它可以创建单独的 CSS 文件。
对于 `development` 模式（包括 `webpack-dev-server`），你可以使用 [style-loader](/loaders/style-loader/)，因为它可以使用多个 <style></style> 标签将 CSS 插入到 DOM 中，并且反应会更快。

> i 不要同时使用 `style-loader` 与 `mini-css-extract-plugin`。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
};
```

### Source maps {#sourcemap}
=======
### Source maps
>>>>>>> b3ce25d6670851b05ede7bf57623de457e983a63

因此，想要生成 source map，则需将 style-loader 之前执行 loader 的 `sourceMap` 选项设置为`true`。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
};
```

### Nonce {#nonce}

有两种方式使用 `nonce`：

- 使用 `attributes` 选项
- 使用 `__webpack_nonce__` 变量

> ⚠ `attributes` 拥有比 `__webpack_nonce__` 更高的优先级

#### `attributes` {#attributes}

**component.js**

```js
import "./style.css";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              attributes: {
                nonce: "12345678",
              },
            },
          },
          "css-loader",
        ],
      },
    ],
  },
};
```

此 loader 生成代码如下：

```html
<style nonce="12345678">
  .foo {
    color: red;
  }
</style>
```

#### `__webpack_nonce__` {#__webpack_nonce__}

**create-nonce.js**

```js
__webpack_nonce__ = "12345678";
```

**component.js**

```js
import "./create-nonce.js";
import "./style.css";
```

使用 `require` 的示例：

**component.js**

```js
__webpack_nonce__ = "12345678";

require("./style.css");
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

此 loader 生成代码如下：

```html
<style nonce="12345678">
  .foo {
    color: red;
  }
</style>
```

#### Insert styles at top {#insert-styles-at-top}

在 `head` 标签顶部插入 style。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: function insertAtTop(element) {
                var parent = document.querySelector("head");
                var lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;

                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                window._lastElementInsertedByStyleLoader = element;
              },
            },
          },
          "css-loader",
        ],
      },
    ],
  },
};
```

#### 在目标元素前插入 style {#insert-styles-before-target-element}

在 `#id` 元素前面插入 style。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: function insertBeforeAt(element) {
                const parent = document.querySelector("head");
                const target = document.querySelector("#id");

                const lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;

                if (!lastInsertedElement) {
                  parent.insertBefore(element, target);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                window._lastElementInsertedByStyleLoader = element;
              },
            },
          },
          "css-loader",
        ],
      },
    ],
  },
};
```

## Contributing {#contributing}

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/style-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/style-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/style-loader.svg
[npm-url]: https://npmjs.com/package/style-loader
[node]: https://img.shields.io/node/v/style-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/style-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/style-loader
[tests]: https://github.com/webpack-contrib/style-loader/workflows/style-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/style-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/style-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/style-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=style-loader
[size-url]: https://packagephobia.now.sh/result?p=style-loader
