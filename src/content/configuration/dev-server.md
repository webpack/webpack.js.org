---
title: 开发服务器(DevServer)
sort: 11
contributors:
  - sokra
  - skipjack
  - spacek33z
  - charlespwd
  - orteth01
  - byzyk
  - EugeneHlushko
  - Yiidiir
  - Loonride
  - dmohns
  - EslamHiko
  - digitaljohn
  - bhavya9107
  - wizardofhogwarts
  - jamesgeorge007
  - g100g
  - anikethsaha
  - snitin315
---

[webpack-dev-server](https://github.com/webpack/webpack-dev-server) 可用于快速开发应用程序。请查阅 [开发指南](/guides/development/) 开始使用。

当前页面记录了影响 `webpack-dev-server` (简写: `dev-server`)配置的选项。

T> 与 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 兼容的配置项后面 🔑 标记。

## 开发服务器(`devServer`) {#devserver}

`object`

通过 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的这些配置，能够以多种方式改变其行为。这是一个简单的示例，利用 `gzips` 压缩 `dist/` 目录当中的所有内容并提供一个本地服务(serve)：

**webpack.config.js**

```javascript
var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
```

当服务(`server`)启动后，在解析模块列表之前输出一条消息：

```bash
http://localhost:9000/
webpack output is served from /build/
Content not from webpack is served from /path/to/dist/
```

这里将会给出服务启动位置以及内容的一些基本信息。

如果你通过 Node.js API 使用 dev-server，则 `devServer` 中的配置选项将被忽略。但可以将配置选项作为第二个参数传入：`new WebpackDevServer(compiler，{...})`。[此示例](https://github.com/webpack/webpack-dev-server/tree/master/examples/api/simple)展示了如何通过 Node.js API 使用 webpack-dev-server。

W> 使用 `WebpackDevServer` 时，不能使用第二个 `compiler` 参数（一个回调）。

W> 请注意，当[导出多个配置对象](/configuration/configuration-types/#exporting-multiple-configurations)时，只会使用 `devServer` 的第一个配置选项，并将其应用于所有的配置当中。

T> 如果你碰到了问题，请将路由导航至 `/webpack-dev-server` 将会为你展示服务文件的位置。例如： `http://localhost:9000/webpack-dev-server`。

T> 如果你需要要手动重新编译 `bundle`，将路由导航至 `/invalidate` 使当前编译的 `bundle` 无效，并通过 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware#invalidate) 为你重新编译。根据你的配置，URL 可能看起来像 `http://localhost:9000/invalidate`。

T> 当启动本地服务的时候 HTML 模板是必须提供的，通常是 `index.html`。确保将脚本引用添加到 HTML 中，webpack-dev-server 不会自动注入它们。

### Usage via CLI {#usage-via-cli}

你可以通过 CLI 调用 webpack-dev-server，方式是：

```bash
npx webpack serve
```

CLI 配置项列表可以在 [这里](https://github.com/webpack/webpack-cli/blob/master/SERVE-OPTIONS.md) 查询。

## `devServer.after` {#devserverafter}

`function (app, server, compiler)`

提供自定义中间件，当 `devServer` 服务器内部的
所有中间件执行完成之后执行

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    after: function (app, server, compiler) {
      // do fancy stuff
    },
  },
};
```

## `devServer.allowedHosts` {#devserverallowedhosts}

`[string]`

该选项允许将允许访问开发服务器的服务列入白名单。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    allowedHosts: [
      'host.com',
      'subdomain.host.com',
      'subdomain2.host.com',
      'host2.com',
    ],
  },
};
```

模仿 django 的`ALLOWED_HOSTS`，用 `.` 作为子域通配符。`.host.com` 会与 `host.com`，`www.host.com` 以及 `host.com` 等其他任何其他子域匹配。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    // this achieves the same effect as the first example
    // with the bonus of not having to update your config
    // if new subdomains need to access the dev server
    allowedHosts: ['.host.com', 'host2.com'],
  },
};
```

要将这个选项与 CLI 一起使用，请按照如下所示传入 `--allowed-hosts`。

```bash
npx webpack serve --entry ./entry/file --output-path ./output/path --allowed-hosts .host.com --allowed-hosts host2.com
```

## `devServer.before` {#devserverbefore}

`function (app, server, compiler)`

提供了一个在 `devServer` 内部的
所有中间件执行之前的自定义执行函数。
例：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    before: function (app, server, compiler) {
      app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
  },
};
```

## `devServer.bonjour` {#devserverbonjour}

`boolean = false`

这个配置用于在启动时通过 [ZeroConf](http://www.zeroconf.org/) 网络广播你的开发服务器，用于服务发现。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    bonjour: true,
  },
};
```

通过命令行使用

```bash
npx webpack serve --bonjour
```

## `devServer.clientLogLevel` {#devserverclientloglevel}

`string = 'info': 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none' | 'warning'`

W> `none` 和 `warning` 将在下一个主要版本中弃用。

当使用 _inline mode_ 时， DevTools 会输出信息，例如：重新加载之前，出错之前或 [Hot Module Replacement](/concepts/hot-module-replacement/) 被开启时。

`devServer.clientLogLevel` 可能会导致日志过于冗余，你可以通过将其设置为 `'silent'` 来关闭日志。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    clientLogLevel: 'silent',
  },
};
```

通过命令行使用

```bash
npx webpack serve --client-log-level silent
```

## `devServer.compress` {#devservercompress}

`boolean`

为每个静态文件开启 [gzip compression](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/)：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    compress: true,
  },
};
```

通过命令行使用

```bash
npx webpack serve --compress
```

## `devServer.contentBase` {#devservercontentbase}

`boolean: false` `string` `[string]` `number`

告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。[`devServer.publicPath`](#devserverpublicpath-) 将用于确定 bundle 的来源，并具有优先级高于 contentBase。

T> 建议使用绝对路径。

默认情况下，它将使用当前的工作目录来提供内容。 要禁用 `contentBase` ，请将其设置为 `false` 。

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
```

如果想使用 [`contentBasePublicPath`](#devservercontentbasepublicpath) 在多个 URL 上提供静态内容，也可以从多个目录提供服务：

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'assets'),
    ],
  },
};
```

通过命令行使用

```bash
npx webpack serve --content-base ./path/to/content/dir
```

## `devServer.contentBasePublicPath` {#devservercontentbasepublicpath}

`string = '/'` `[string]`

告诉服务器使用哪个 URL 服务 `devServer.contentBase` 静态内容。如果有一个文件 `assets/manifest.json` ，它将在 `/serve-content-base-at-this-url/manifest.json` 中提供。

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'assets'),
    contentBasePublicPath: '/serve-content-base-at-this-url',
  },
};
```

如果在 [`contentBase`](#devservercontentbase) 中设置了多个静态文件夹，请提供一个字符串数组。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    contentBase: [contentBasePublic, contentBaseOther],
    contentBasePublicPath: [contentBasePublicPath, contentBasePublicOtherPath],
  },
};
```

## `devServer.disableHostCheck` {#devserverdisablehostcheck}

`boolean`

当将此项配置设置为 `true` 时，将会跳过 host 检查。**这是不推荐的**因为不检查host的应用容易受到DNS重新绑定攻击。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    disableHostCheck: true,
  },
};
```

通过命令行使用

```bash
npx webpack serve --disable-host-check
```

## `devServer.filename` 🔑 {#devserverfilename-}

`string`

此选项可以减少在 [lazy 模式](#devserverlazy-)中的编译操作。
默认情况下，在 [lazy 模式](#devserverlazy-)中，每个请求都触发新的编译。使用 `filename` 仅当请求某个文件时才可执行编译。

如果 [`output.filename`](/configuration/output/#outputfilename) 设置为`'bundle.js'`，则使用 `devServer.filename` 如下：

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    lazy: true,
    filename: 'bundle.js',
  },
};
```

现在它将仅在请求 `/bundle.js` 时编译该捆绑软件。

T> 当不使用 [lazy 模式](#devserverlazy-)时，`filename` 不会生效.

## `devServer.headers` 🔑 {#devserverheaders-}

`object`

为所有请求添加响应标头：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    headers: {
      'X-Custom-Foo': 'bar',
    },
  },
};
```

## `devServer.historyApiFallback` {#devserverhistoryapifallback}

`boolean = false` `object`

当使用 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 时, 所有的 `404` 请求都会响应 `index.html` 的内容。 将 `devServer.historyApiFallback` 设为 `true`开启：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    historyApiFallback: true,
  },
};
```

通过传递对象，可以使用配置选项诸如 `rewrites`:

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/views/landing.html' },
        { from: /^\/subpage/, to: '/views/subpage.html' },
        { from: /./, to: '/views/404.html' },
      ],
    },
  },
};
```

在路径中使用点时（与 Angular 相同），可能需要使用 `disableDotRule`：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
```

通过命令行使用

```bash
npx webpack serve --history-api-fallback
```

有关更多选项和信息，请参见 [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) 文档。

## `devServer.host` {#devserverhost}

`string = 'localhost'`

指定要使用的 host。如果你希望服务器可从外部访问，请按以下方式进行配置：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    host: '0.0.0.0',
  },
};
```

通过命令行使用

```bash
npx webpack serve --host 0.0.0.0
```

## `devServer.hot` {#devserverhot}

`boolean`

启用 webpack 的 [Hot Module Replacement](/concepts/hot-module-replacement/) 功能：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    hot: true,
  },
};
```

T> 请注意，要完全启用 HMR ，需要 [`webpack.HotModuleReplacementPlugin`](/plugins/hot-module-replacement-plugin/)。如果使用 --hot 选项启动 `webpack` 或 `webpack-dev-server`，该插件将自动添加，因此你可能不需要将其添加到 `webpack.config.js` 中。有关更多信息，请参见 [HMR 概览章节](/concepts/hot-module-replacement/)。

## `devServer.hotOnly` {#devserverhotonly}

`boolean`

启用热模块替换（请参见 [`devServer.hot`](#devserverhot) ），而无需页面刷新作为构建失败时的回退。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    hotOnly: true,
  },
};
```

通过命令行使用

```bash
npx webpack serve --hot-only
```

## `devServer.http2` {#devserverhttp2}

`boolean = false`

使用 [spdy](https://www.npmjs.com/package/spdy) 提供 HTTP/2 服务。对于 Node 10.0.0 及更高版本，此选项将被忽略，因为 spdy 在这些版本中已被破坏。一旦 [Express](https://expressjs.com/) 支持，开发服务器将迁移到 Node 内置的 HTTP/2。

如果未将 `devServer.http2` 显式设置为 false ，则在启用 [`devServer.https`](#devserverhttps) 时将默认为 true 。 如果启用 `devServer.http2`，但服务器无法通过 HTTP/2 提供服务，则服务器默认为 HTTPS。

HTTP/2 带有自签名证书：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    http2: true,
  },
};
```

通过 [https](#devserverhttps) 配置你自己的证书文件:

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    http2: true,
    https: {
      key: fs.readFileSync('/path/to/server.key'),
      cert: fs.readFileSync('/path/to/server.crt'),
      ca: fs.readFileSync('/path/to/ca.pem'),
    },
  },
};
```

通过命令行使用

```bash
npx webpack serve --http2
```

要通过CLI使用自己的证书，请使用以下选项

```bash
npx webpack serve --http2 --key ./path/to/server.key --cert ./path/to/server.crt --cacert ./path/to/ca.pem
```

## `devServer.https` {#devserverhttps}

`boolean` `object`

默认情况下，开发服务器将通过HTTP提供服务。可以选择使用HTTPS通过HTTP/2提供服务：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    https: true,
  },
};
```

根据上述配置，将使用自签名证书，但是你也可以提供自己的证书：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    https: {
      key: fs.readFileSync('/path/to/server.key'),
      cert: fs.readFileSync('/path/to/server.crt'),
      ca: fs.readFileSync('/path/to/ca.pem'),
    },
  },
};
```

该对象直接传递到 Node.js HTTPS 模块，因此请参阅 [HTTPS documentation](https://nodejs.org/api/https.html) 以获取更多信息。

通过命令行使用

```bash
npx webpack serve --https
```

要通过 CLI 使用自己的证书，请使用以下选项

```bash
npx webpack serve --https --key ./path/to/server.key --cert ./path/to/server.crt --cacert ./path/to/ca.pem
```

## `devServer.index` {#devserverindex}

`string`

设置 index 文件的文件名。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    index: 'index.html',
  },
};
```

## `devServer.injectClient` {#devserverinjectclient}

`boolean = false` `function (compilerConfig) => boolean`

向 `devServer` 注入一个客户端。设置 `devServer.injectClient` 值为 `true` 时，会向服务注入客户端。也可以设置条件注入函数：

```javascript
module.exports = {
  //...
  devServer: {
    injectClient: (compilerConfig) => compilerConfig.name === 'only-include',
  },
};
```

## `devServer.injectHot` {#devserverinjecthot}

`boolean = false` `function (compilerConfig) => boolean`

告诉 `devServer` 注入热模块替换。设置 `devServer.injectHot` 值为 `true` 时，会始终注入。也可以设置条件注入函数：

```javascript
module.exports = {
  //...
  devServer: {
    hot: true,
    injectHot: (compilerConfig) => compilerConfig.name === 'only-include',
  },
};
```

W> 使用前请确保 [`devServer.hot`](#devserverhot) 的值设置为 `true`，因为 `devServer.injectHot` 仅适用于 HMR。

## `devServer.inline` {#devserverinline}

`boolean`

在开发服务器的两种不同模式之间切换。默认情况下，应用程序将启用 __inline模式__。这意味着将在 bundle 中插入脚本以进行实时重新加载，并且构建消息将出现在浏览器控制台中。

也可以使用 **iframe模式**，它在通知栏下使用带有有关构建消息的`<iframe>`。 切换到 **iframe模式**：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    inline: false,
  },
};
```

通过命令行使用

```bash
npx webpack serve --inline
```

请注意在 CLI 中没有方法禁用它。

T> 对于 [Hot Module Replacement](/plugins/hot-module-replacement-plugin/) ，建议使用串联模式，因为它包含来自 websocket 的 HMR 触发器。 轮询模式可以用作替代方法，但需要附加的入口点`'webpack/hot/poll?1000'`。

## `devServer.lazy` 🔑 {#devserverlazy-}

`boolean`

启用 `devServer.lazy` 时，开发服务器仅在收到请求时才编译捆绑软件。 这意味着webpack将不会监视任何文件更改。 我们称这种方式为“懒惰模式(**lazy mode**)”。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    lazy: true,
  },
};
```

通过命令行使用

```bash
npx webpack serve --lazy
```

T> [`watchOptions`](#devserverwatchoptions-) 不会有任何副作用当使用 **lazy mode** 时。

T> 如果是通过命令行使用, 请确保 **inline mode** 处于禁用状态。

## `devServer.liveReload` {#devserverlivereload}

`boolean = true`

默认情况下，检测到文件更改时，开发服务器将重新加载/刷新页面。 必须禁用 [`devServer.hot`](#devserverhot) 选项或必须启用 [`devServer.watchContentBase`](#devserverwatchcontentbase) 选项，才能使 liveReload 生效。 通过将其设置为 false 来禁用 devServer.liveReload：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    liveReload: false,
  },
};
```

通过命令行使用

```bash
npx webpack serve --liveReload
```

请注意在 CLI 中没有方法禁用它。

W> 热更新只适用于 web 相关的 [targets](/configuration/target/#string)，例如：`web`、`webworker`、`electron-renderer` 和 `node-webkit`。

## `devServer.mimeTypes` 🔑 {#devservermimetypes}

`object`

允许 dev-server 注册自定义的mime类型。
该对象被传递到底层的 `webpack-dev-middleware`。
有关使用说明，请参见 [documentation](https://github.com/webpack/webpack-dev-middleware#mimetypes) 。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    mimeTypes: { 'text/html': ['phtml'] },
  },
};
```

## `devServer.noInfo` 🔑 {#devservernoinfo-}

`boolean = false`

告诉开发服务器禁止显示诸如 Webpack 捆绑包信息之类的消息。 错误和警告仍将显示。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    noInfo: true,
  },
};
```

## `devServer.onListening` {#devserveronlistening}

`function (server)`

提供一个选项，当 `webpack-dev-server` 开始监听端口上的连接时，执行自定义功能。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port);
    },
  },
};
```

## `devServer.open` {#devserveropen}

`boolean = false` `string` `object`

告诉 dev-server 在服务器启动后打开浏览器。 将其设置为 `true` 以打开默认浏览器。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    open: true,
  },
};
```

提供要使用的浏览器名称，而不是默认名称：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    open: 'Google Chrome',
  },
};
```

如果要在打开浏览器时使用标志，例如打开隐身窗口（ `--incognito` 标志），则可以将 `open` 设置为对象。 该对象接受所有 [open](https://www.npmjs.com/package/open) 选项，`app` 属性必须是一个数组。 数组中的第一个元素必须是浏览器名称，其他后面的元素是要使用的标志。 例如：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    open: {
      app: ['Google Chrome', '--incognito', '--other-flag'],
    },
  },
};
```

通过命令行使用

```bash
npx webpack serve --open 'Google Chrome'
```

T> 浏览器应用程序名称取决于平台。 不要在可重用模块中对其进行硬编码。 例如，`'Chrome'` 在macOS上是 `'Google Chrome'` ，在Linux上是 `'Google Chrome'` 在Windows上是 `'Chrome'` 。

## `devServer.openPage` {#devserveropenpage}

`string` `[string]`

指定打开浏览器时要浏览的页面。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    open: true,
    openPage: 'different/page',
  },
};
```

通过命令行使用

```bash
npx webpack serve --open --open-page different/page
```

W> 不要在页面前加上 `/`，因为 webpack-dev-server 会自动添加，否则浏览器将会打开像这样的 url：`http://localhost:8080//different/page`。

如果希望指定多个页面在浏览器中打开。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    open: true,
    openPage: ['different/page1', 'different/page2'],
  },
};
```

通过命令行使用

```bash
npx webpack serve --open --open-page different/page1 --open-page different/page2
```

## `devServer.overlay` {#devserveroverlay}

`boolean = false` `object: { errors boolean = false, warnings boolean = false }`

出现编译器错误或警告时，在浏览器中显示全屏覆盖。 如果只想显示编译器错误：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    overlay: true,
  },
};
```

如果要显示警告和错误：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
```

## `devServer.pfx` {#devserverpfx}

`string`

通过CLI使用时，是SSL .pfx文件的路径。 如果在选项中使用，则它应该是.pfx文件的字节流。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    pfx: './path/to/file.pfx',
  },
};
```

通过命令行使用

```bash
npx webpack serve --pfx ./path/to/file.pfx
```

## `devServer.pfxPassphrase` {#devserverpfxpassphrase}

`string`

将密码短语转换为SSL PFX文件。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    pfxPassphrase: 'passphrase',
  },
};
```

通过命令行使用

```bash
npx webpack serve --pfx-passphrase passphrase
```

## `devServer.port` {#devserverport}

`number`

指定端口号以侦听以下请求：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    port: 8080,
  },
};
```

通过命令行使用

```bash
npx webpack serve --port 8080
```

## `devServer.proxy` {#devserverproxy}

`object` `[object, function]`

当拥有单独的API后端开发服务器并且希望在同一域上发送API请求时，代理某些URL可能会很有用。

开发服务器使用功能强大的 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 软件包。 查看其 [documentation](https://github.com/chimurai/http-proxy-middleware#options) 了解更多高级用法。 请注意，`http-proxy-middleware` 的某些功能不需要`target`键，例如 它的 `router` 功能，但是仍然需要在此处的配置中包含`target`，否则`webpack-dev-server` 不会将其传递给 `http-proxy-middleware`）。

使用后端在 `localhost:3000` 上，可以使用它来启用代理：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
```

现在，对 `/api/users` 的请求会将请求代理到 `http://localhost:3000/api/users`。

如果不希望传递`/api`，则需要重写路径：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
```

默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果需要，可以这样修改配置：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false,
      },
    },
  },
};
```

有时不想代理所有内容。 可以基于函数的返回值绕过代理。

在该功能中，可以访问请求，响应和代理选项。

- 返回 `null` 或 `undefined` 以继续使用代理处理请求。
- 返回 `false` 会为请求产生404错误。
- 返回提供服务的路径，而不是继续代理请求。

例如。 对于浏览器请求，想要提供 HTML 页面，但是对于 API 请求，想要代理它。 可以执行以下操作：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        },
      },
    },
  },
};
```

如果想将多个特定路径代理到同一目标，则可以使用一个或多个带有 `context` 属性的对象的数组：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: [
      {
        context: ['/auth', '/api'],
        target: 'http://localhost:3000',
      },
    ],
  },
};
```

请注意，默认情况下不会代理对 root 的请求。 要启用根代理，应将 `devServer.index` 选项指定为虚假值：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    index: '', // specify to enable root proxying
    host: '...',
    contentBase: '...',
    proxy: {
      context: () => true,
      target: 'http://localhost:1234',
    },
  },
};
```

默认情况下，代理时会保留主机头的来源，可以将 `changeOrigin` 设置为 `true` 以覆盖此行为。 在某些情况下，例如使用 [name-based virtual hosted sites](https://en.wikipedia.org/wiki/Virtual_hosting#Name-based)，它很有用。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};
```

## `devServer.progress` - CLI only {#devserverprogress---cli-only}

`boolean`

将运行进度输出到控制台。

```bash
npx webpack serve --progress
```

## `devServer.public` {#devserverpublic}

`string`

使用 _inline模式_ 并代理 dev-server 时，内联客户端脚本并不总是知道要连接到哪里。 它将尝试基于 `window.location` 猜测服务器的 URL，但是如果失败，则需要使用它。

例如，开发服务器由 nginx 代理，并在 `myapp.test` 上可用：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    public: 'myapp.test:80',
  },
};
```

通过命令行使用

```bash
npx webpack serve --public myapp.test:80
```

## `devServer.publicPath` 🔑 {#devserverpublicpath-}

`string = '/'`

捆绑的文件将在此路径下的浏览器中可用。

假设服务器在 `http://localhost:8080` 下运行，并且 [`output.filename`](/configuration/output/#outputfilename) 设置为 `bundle.js`。 默认情况下，`devServer.publicPath` 为 `'/'`，因此的捆绑软件可以作为 `http://localhost:8080/bundle.js` 获得。

更改 `devServer.publicPath` 以将捆绑软件放在特定目录下：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    publicPath: '/assets/',
  },
};
```

该捆绑包现在将以 `http://localhost:8080/assets/bundle.js` 的形式提供。

T> 确保 `devServer.publicPath` 始终以正斜杠开头和结尾。

也可以使用完整的URL。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    publicPath: 'http://localhost:8080/assets/',
  },
};
```

该捆绑包现在将以 `http://localhost:8080/assets/bundle.js` 的形式提供。

T> 建议 `devServer.publicPath` 与 [`output.publicPath`](/configuration/output/#outputpublicpath) 相同。

## `devServer.quiet` 🔑 {#devserverquiet-}

`boolean`

启用 `devServer.quiet` 后，除了初始启动信息外，什么都不会写入控制台。 这也意味着来自webpack的错误或警告是不可见的。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    quiet: true,
  },
};
```

通过命令行使用

```bash
npx webpack serve --quiet
```

## `devServer.serveIndex` {#devserverserveindex}

`boolean = true`

告诉开发服务器启用后使用 [`serveIndex`](https://github.com/expressjs/serve-index) 中间件。

[`serveIndex`](https://github.com/expressjs/serve-index) 中间件会在查看没有index.html文件的目录时生成目录列表。

```javascript
module.exports = {
  //...
  devServer: {
    serveIndex: true,
  },
};
```

## `devServer.setup` {#devserversetup}

`function (app, server)`

W> 这个选项将被 [`devServer.before`](#devserverbefore) 所**替代**，并将在 v3.0.0 中**删除**。

在这里，可以访问 Express 应用程序对象，并向其中添加自己的自定义中间件。
例如，为某些路径定义自定义处理程序：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    setup: function (app, server) {
      app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
  },
};
```

## `devServer.sockHost` {#devserversockhost}

`string`

告诉连接到 `devServer` 的客户端使用提供的套接字主机。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    sockHost: 'myhost.test',
  },
};
```

## `devServer.sockPath` {#devserversockpath}

`string = '/sockjs-node'`

连接到重装插槽的路径。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    sockPath: '/socket',
  },
};
```

通过命令行使用

```bash
npx webpack serve --sock-path /socket
```

## `devServer.sockPort` {#devserversockport}

`number` `string`

告诉连接到`devServer`的客户端使用提供的套接字端口。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    sockPort: 8080,
  },
};
```

## `devServer.staticOptions` {#devserverstaticoptions}

`object`

可以配置高级选项以从 `contentBase` 提供静态文件。 有关可能的选项，请参见 [Express documentation](http://expressjs.com/en/4x/api.html#express.static)。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    staticOptions: {
      redirect: false,
    },
  },
};
```

T> 这仅在将 [`devServer.contentBase`](#devservercontentbase) 用作字符串时有效。

## `devServer.stats` 🔑 {#devserverstats-}

`string: 'none' | 'errors-only' | 'minimal' | 'normal' | 'verbose'` `object`

此选项使可以精确控制显示哪些捆绑软件信息。 如果需要一些捆绑软件信息，但又不是全部，这可能是一个很好的中间立场。

要仅显示捆绑软件中的错误：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    stats: 'errors-only',
  },
};
```

有关更多信息，请参见 [**stats documentation**](/configuration/stats/)。

T> 与 `quiet` 或 `noInfo` 一起使用时，该选项无效。

## `devServer.stdin` - CLI only {#devserverstdin---cli-only}

`boolean`

当stdin结束时，此选项将关闭服务器。

```bash
npx webpack serve --stdin
```

## `devServer.transportMode` {#devservertransportmode}

`string = 'sockjs': 'sockjs' | 'ws'` `object`

W> `transportMode` 是一个实验性选项，这意味着其用法可能会更改，而不会发出警告。

T> 将字符串提供给d `devServer.transportMode` 是将 `devServer.transportMode.client` 和 `devServer.transportMode.server` 都设置为给定字符串值的快捷方式。

这个选项允许我们要么为客户端/服务器分别选择当前的`devServer`传输模式，要么提供定制的客户端/服务器实现。 这允许指定浏览器或其他客户端如何与`devServer`通信。

当前的默认模式是 [`'sockjs'`](https://www.npmjs.com/package/sockjs)。 此模式使用 [SockJS-node](https://github.com/sockjs/sockjs-node) 作为服务器，并使用 [SockJS-client](https://www.npmjs.com/package/sockjs-client) 在客户端上。

在下一代主要的 `devServer` 版本中，`'ws'` 模式将成为默认模式。 此模式将 [ws](https://www.npmjs.com/package/ws) 用作服务器，并在客户端上使用本机  WebSocket。

Use `'ws'` mode:

```javascript
module.exports = {
  //...
  devServer: {
    transportMode: 'ws',
  },
};
```

T> 提供自定义客户端和服务器实现时，请确保它们彼此兼容，以成功进行通信。

### `devServer.transportMode.client` {#devservertransportmodeclient}

`string` `path`

要创建自定义客户端实现，请创建一个扩展并继承 [`BaseClient`](https://github.com/webpack/webpack-dev-server/blob/master/client-src/clients/BaseClient.js).

使用`CustomServer.js`导出的类实现自定义WebSocket客户端并兼容`ws`服务端：

```javascript
module.exports = {
  //...
  devServer: {
    transportMode: {
      client: require.resolve('./CustomClient'),
      server: 'ws',
    },
  },
};
```

### `devServer.transportMode.server` {#devservertransportmodeserver}

`string` `path` `function`

要创建自定义服务器实现，请创建一个扩展并继承 [`BaseServer`](https://github.com/webpack/webpack-dev-server/blob/master/lib/servers/BaseServer.js).

使用`CustomServer.js`导出的类实现自定义WebSocket服务器并兼容`ws`客户端：

```javascript
module.exports = {
  //...
  devServer: {
    transportMode: {
      client: 'ws',
      server: require.resolve('./CustomServer'),
    },
  },
};
```

使用 `CustomServer.js` 导出的类实现自定义WebSocket服务器并兼容 `ws` 客户端：

```javascript
module.exports = {
  //...
  devServer: {
    transportMode: {
      client: 'ws',
      server: require('./CustomServer'),
    },
  },
};
```

使用自定义兼容的WebSocket客户端和服务器实现：

```javascript
module.exports = {
  //...
  devServer: {
    transportMode: {
      client: require.resolve('./CustomClient'),
      server: require.resolve('./CustomServer'),
    },
  },
};
```

## `devServer.useLocalIp` {#devserveruselocalip}

`boolean`

此选项使浏览器可以使用的本地IP打开。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    useLocalIp: true,
  },
};
```

通过命令行使用

```bash
npx webpack serve --useLocalIp
```

## `devServer.watchContentBase` {#devserverwatchcontentbase}

`boolean`

告诉 dev-server 监听 [`devServer.contentBase`]（＃devservercontentbase）选项提供的文件。 默认情况下禁用。 启用后，文件更改将触发整个页面重新加载。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    watchContentBase: true,
  },
};
```

通过命令行使用

```bash
npx webpack serve --watch-content-base
```

## `devServer.watchOptions` 🔑 {#devserverwatchoptions-}

`object`

控制监听文件的选项。

webpack 使用文件系统来通知文件更改。 在某些情况下，这不起作用。 例如，使用网络文件系统（NFS）时。 [Vagrant](https://www.vagrantup.com/) 也有很多问题。 在这些情况下，请使用轮询：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    watchOptions: {
      poll: true,
    },
  },
};
```

如果这对文件系统负荷太重，可以将其设置为整数用以调整轮询间隔（以毫秒为单位）。

查阅 [WatchOptions](/configuration/watch/) 了解更多。

## `devServer.writeToDisk` 🔑 {#devserverwritetodisk-}

`boolean = false` `function (filePath) => boolean`

告诉 `devServer` 将产生的文件写入硬盘。 写入位置为 [output.path](/configuration/output/#outputpath) 配置的目录。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    writeToDisk: true,
  },
};
```

可以给 `devServer.writeToDisk` 传入一个函数用来筛选哪些文件需要写入硬盘。传入函数的用法和[`Array#filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 的用法一致。

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    writeToDisk: (filePath) => {
      return /superman\.css$/.test(filePath);
    },
  },
};
```

T> 有可能需要通过 `NODE_OPTIONS` 设置一些 Node.js 的标记，例如，配置 `HTTP_MAX_HEADER_SIZE`：

**package.json**

```json
{
  "scripts": "NODE_OPTIONS='--max-http-header-size=100000' webpack serve"
}
```
