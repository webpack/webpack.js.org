---
title: 开发中 Server(DevServer)
sort: 9
contributors:
  - sokra
  - skipjack
  - spacek33z
  - charlespwd
---

webpack-dev-server 能够用于快速开发应用程序。请查看[“如何开发？”](/guides/development)入门。

此页面描述影响 webpack-dev-server(简写为：dev-server) 行为的选项。

T> 与 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 兼容的选项旁边有 🔑。

## `devServer`

`object`

通过来自 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的这些选项，能够用多种方式改变其行为。这里有一个简单的例子，所有来自 `dist/` 目录的文件都做 gzip 压缩和提供为服务：

```js
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000
}
```

当服务器启动时，在解析模块列表之前会有一条消息：

```bash
http://localhost:9000/
webpack result is served from /build/
content is served from dist/
```

这将给出一些背景知识，就能知道服务器的访问位置，并且知道服务已启动。

如果你通过 Node.js API 来使用 dev-server， `devServer` 中的选项将被忽略。将选项作为第二个参数传入： `new WebpackDevServer(compiler, {...})`。关于如何通过 Node.js API 使用 webpack-dev-server 的示例，请[查看此处](https://github.com/webpack/webpack-dev-server/blob/master/examples/node-api-simple/server.js)。


## `devServer.clientLogLevel`

`string`

当使用*内联模式(inline mode)*时，在开发工具(DevTools)的控制台(console)将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时。这可能显得很繁琐。

你可以阻止所有这些消息显示，使用这个选项：

```js
clientLogLevel: "none"
```

可能的值有 `none`, `error`, `warning` 或者 `info`（默认值）。

注意，控制台将*始终*显示 bundle 的错误和警告。这个选项只影响它之前的消息。


## `devServer.compress`

`boolean`

一切服务都启用[gzip 压缩](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/)：

```js
compress: true
```


## `devServer.contentBase`

`boolean` `string` `array`

告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。[`devServer.publicPath`](#devserver-publicpath-) 将用于确定应该从哪里提供 bundle，并且此选项优先。

默认情况下，将使用当前工作目录作为提供内容的目录，但是你可以修改为其他目录：

```js
contentBase: path.join(__dirname, "public")
```

注意，推荐使用绝对路径。

但是也可以从多个目录提供内容：

```js
contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]
```

禁用 `contentBase`：

```js
contentBase: false
```


## `devServer.filename` 🔑

`string`

在**惰性模式**中，此选项可减少编译。
默认在**惰性模式**，每个请求结果都会产生全新的编译。使用 `filename`，可以只在某个文件时被请求时编译。

如果 `output.filename` 设置为 `bundle.js` ，`filename` 使用如下：

```js
lazy: true,
filename: "bundle.js"
```

现在只有在请求 `/bundle.js` 时候，才会编译 bundle。

T> `filename` 在不使用**惰性加载**时没有效果。


## `devServer.headers` 🔑

`object`

在所有请求中添加首部内容：

```js
headers: {
  "X-Custom-Foo": "bar"
}
```


## `devServer.historyApiFallback`

`boolean` `object`

当使用[HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History)，任意的 `404` 响应可以提供为 `index.html` 页面。通过传入以下启用：

```js
historyApiFallback: true
```

通过传入一个对象，比如使用 `rewrites` 这个选项，此行为可进一步地控制：

```js
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
```

当路径中使用点(dot)（常见于 Angular），你可能需要使用 `disableDotRule`：

```js
historyApiFallback: {
  disableDotRule: true
}
```

更多选项和信息，查看 [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) 文档。


## `devServer.host` - 只用在命令行工具(CLI)

`string`

指定使用一个 host。默认是 `localhost`。如果你希望服务器外部可访问，指定如下：

```js
host: "0.0.0.0"
```


## `devServer.hot`

`boolean`

启用 webpack 的模块热替换特性：

```js
hot: true
```

?> Add various other steps needed for this to work. (From my experience, and the current docs it looks like other steps are needed here - not like in the cmd line where it's just a flag)


## `devServer.hotOnly` - CLI only

`boolean`

Enables Hot Module Replacement (see [`devServer.hot`](#devserver-hot)) without page refresh as fallback in case of build failures.

```js
hotOnly: true
```


## `devServer.https`

`boolean` `object`

默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务：

```js
https: true
```

使用以下设置自签名证书，但是你可以提供自己的：

```js
https: {
  key: fs.readFileSync("/path/to/server.key"),
  cert: fs.readFileSync("/path/to/server.crt"),
  ca: fs.readFileSync("/path/to/ca.pem"),
}
```

此对象直接传递到 Node.js HTTPS 模块，所以更多信息请查看 [HTTPS 文档](https://nodejs.org/api/https.html)。


## `devServer.inline` - 只用在命令行工具(CLI)

`boolean`

在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用*内联模式(inline mode)*。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。

也可以使用 **iframe 模式**，它在通知栏下面使用 `<iframe>` 标签，包含了关于构建的消息。切换到 **iframe 模式**：

```js
inline: false
```

T> 当使用模块热替换时，建议使用内联模式(inline mode)。


## `devServer.lazy` 🔑

`boolean`

当启用 `lazy` 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“**惰性模式**”。

```js
lazy: true
```

T> `watchOptions` 在使用**惰性模式**时无效。

T> 如果使用命令行工具(CLI)，请确保**内联模式(inline mode)**被禁用。


## `devServer.noInfo` 🔑

`boolean`

启用 `noInfo` 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。

```js
noInfo: true
```


## `devServer.port` - 只用在命令行工具(CLI)

`number`

指定要监听请求的端口号：

```js
port: 8080
```


## `devServer.proxy`

`object`

如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

dev-server 使用了非常强大的 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 包。更多高级用法，请查阅其[文档](https://github.com/chimurai/http-proxy-middleware#options)。

在 `localhost:3000` 上有后端服务的话，你可以这样启用代理：

```js
proxy: {
  "/api": "http://localhost:3000"
}
```

请求到 `/api/users` 现在会被代理到请求 `http://localhost:3000/api/users`。

如果你不想始终传递 `/api` ，则需要重写路径：

```js
proxy: {
  "/api": {
    target: "http://localhost:3000",
    pathRewrite: {"^/api" : ""}
  }
}
```

默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下：

```js
proxy: {
  "/api": {
    target: "https://other-server.example.com",
    secure: false
  }
}
```

有时你不想代理所有的请求。可以基于一个函数的返回值绕过代理。

在函数中你可以访问请求体、响应体和代理选项。必须返回 `false` 或路径，来跳过代理请求。

例如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理。你可以这样做：

```js
proxy: {
  "/api": {
    target: "http://localhost:3000",
    bypass: function(req, res, proxyOptions) {
      if (req.headers.accept.indexOf("html") !== -1) {
        console.log("Skipping proxy for browser request.");
        return "/index.html";
      }
    }
  }
}
```


## `devServer.public` - 只用在命令行工具(CLI)

`string`

当使用*内联模式(inline mode)*并代理 dev-server 时，内联的客户端脚本并不总是知道要连接到什么地方。它会尝试根据 `window.location` 来猜测服务器的 URL，但是如果失败，你需要这样。

例如，dev-server 被代理到 nginx，并且在 `myapp.test` 上可用：

```js
public: "myapp.test:80"
```


## `devServer.publicPath` 🔑

`string`

此路径下的打包文件可在浏览器中访问。

假设服务器运行在 `http://localhost:8080` 并且 `output.filename` 被设置为 `bundle.js`。默认 `publicPath` 是 `"/"`，所以你的包(bundle)可以通过 `http://localhost:8080/bundle.js` 访问。

可以修改 `publicPath`，将 bundle 放在一个目录：

```js
publicPath: "/assets/"
```

你的包现在可以通过 `http://localhost:8080/assets/bundle.js` 访问。

T> 确保 `publicPath` 总是以斜杠(/)开头和结尾。

也可以使用一个完整的 URL。这是模块热替换所必需的。

```js
publicPath: "http://localhost:8080/assets/"
```

bundle 可以通过 `http://localhost:8080/assets/bundle.js` 访问。

T> `devServer.publicPath` 和 `output.publicPath` 一样被推荐。


## `devServer.quiet` 🔑

`boolean`

启用 `quiet` 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。

```js
quiet: true
```


## `devServer.staticOptions`

可以从 `contentBase` 提供的静态文件来配置高级选项。可用的选项请查看 [Express 文档](http://expressjs.com/en/4x/api.html#express.static)。一个例子：

```js
staticOptions: {
  redirect: false
}
```

T> 只在 `contentBase` 是一个`字符串`时有效。


## `devServer.stats` 🔑

`string` `object`

此选项允许你精确控制 bundle 信息展示。这可以是一个很好的中间层，如果你想要只展示某些 bundle 信息，但不是所有的信息。

只展示 bunlde 中的错误：

```js
stats: "errors-only"
```

更多信息，请查看 [**stats 文档**](/configuration/stats)。

T> 使用 `quiet` 或 `noInfo` 时，此选项无效。


## `devServer.watchContentBase`

`boolean`

告诉服务器监视那些通过 `devServer.contentBase` 选项提供的文件。文件改动将触发整个页面重新加载。

```js
watchContentBase: true
```

默认被禁用。


## `devServer.watchOptions` 🔑

`object`

与监视文件相关的控制选项。

webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。[Vagrant](https://www.vagrantup.com/) 也有很多问题。在这些情况下，请使用轮询：

```js
watchOptions: {
  poll: true
}
```

如果这对文件系统来说太重了的话，你可以修改间隔时间（以毫秒为单位），将其设置为一个整数。

查看 [WatchOptions](/configuration/watch) 更多选项。

***

> 原文：https://webpack.js.org/configuration/dev-server/