---
title: DevServer
sort: 9
contributors:
  - sokra
  - skipjack
  - spacek33z
  - charlespwd
---

webpack-dev-server can be used to quickly develop an application. See the ["How to Develop?"](/guides/development) to get started.

This page describes the options that affect the behavior of webpack-dev-server (short: dev-server).

T> Options that are compatible with [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) have 🔑 next to them.

## `devServer`

`object`

This set of options is picked up by [webpack-dev-server](https://github.com/webpack/webpack-dev-server) and can be used to change its behavior in various ways. Here's a simple example that gzips and serves everything from our `dist/` directory:

```js
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000
}
```

When the server is started, there will be a message prior to the list of resolved modules:

```bash
http://localhost:9000/
webpack result is served from /build/
content is served from dist/
```

that will give some background on where the server is located and what it's serving.

If you're using dev-server through the Node.js API, the options in `devServer` will be ignored. Pass the options as a second parameter instead: `new WebpackDevServer(compiler, {...})`. [See here](https://github.com/webpack/webpack-dev-server/blob/master/examples/node-api-simple/server.js) for an example of how to use webpack-dev-server through the Node.js API.


## `devServer.clientLogLevel`

`string`

When using *inline mode*, the console in your DevTools will show you messages e.g. before reloading, before an error or when Hot Module Replacement is enabled. This may be too verbose.

You can prevent all these messages from showing, by using this option:

```js
clientLogLevel: "none"
```

Possible values are `none`, `error`, `warning` or `info` (default).

Note that the console will *always* show bundle errors and warnings. This option only effects the message before it.


## `devServer.compress`

`boolean`

Enable [gzip compression](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/) for everything served:

```js
compress: true
```


## `devServer.contentBase`

`boolean` `string` `array`

Tell the server where to serve content from. This is only necessary if you want to serve static files. [`devServer.publicPath`](#devserver-publicpath-) will be used to determine where the bundles should be served from, and takes precedence.

By default it will use your current working directory to serve content, but you can modify this to another directory:

```js
contentBase: path.join(__dirname, "public")
```

Note that it is recommended to use an absolute path.

It is also possible to serve from multiple directories:

```js
contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]
```

To disable `contentBase`:

```js
contentBase: false
```


## `devServer.filename` 🔑

`string`

This option lets you reduce the compilations in **lazy mode**.
By default in **lazy mode**, every request results in a new compilation. With `filename`, it's possible to only compile when a certain file is requested.

If `output.filename` is set to `bundle.js` and `filename` is used like this:

```js
lazy: true,
filename: "bundle.js"
```

It will now only compile the bundle when `/bundle.js` is requested.

T> `filename` has no effect when used without **lazy mode**.


## `devServer.headers` 🔑

`object`

Adds headers to all requests:

```js
headers: {
  "X-Custom-Foo": "bar"
}
```


## `devServer.historyApiFallback`

`boolean` `object`

When using the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History), the `index.html` page will likely have to be served in place of any `404` responses. Enable this by passing:

```js
historyApiFallback: true
```

By passing an object this behavior can be controlled further using options like `rewrites`:

```js
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
```

When using dots in your path (common with Angular), you may need to use the `disableDotRule`:

```js
historyApiFallback: {
  disableDotRule: true
}
```

For more options and information, see the [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) documentation.


## `devServer.host` - CLI only

`string`

Specify a host to use. By default this is `localhost`. If you want your server to be accessible externally, specify it like this:

```js
host: "0.0.0.0"
```


## `devServer.hot`

`boolean`

Enable webpack's Hot Module Replacement feature:

```js
hot: true
```

T> Note that you must also include a `new webpack.HotModuleReplacementPlugin()` to fully enable HMR. See the [HMR concepts page](/concepts/hot-module-replacement) for more information.


## `devServer.hotOnly` - CLI only

`boolean`

Enables Hot Module Replacement (see [`devServer.hot`](#devserver-hot)) without page refresh as fallback in case of build failures.

```js
hotOnly: true
```


## `devServer.https`

`boolean` `object`

By default dev-server will be served over HTTP. It can optionally be served over HTTP/2 with HTTPS:

```js
https: true
```

With the above setting a self-signed certificate is used, but you can provide your own:

```js
https: {
  key: fs.readFileSync("/path/to/server.key"),
  cert: fs.readFileSync("/path/to/server.crt"),
  ca: fs.readFileSync("/path/to/ca.pem"),
}
```

This object is passed straight to Node.js HTTPS module, so see the [HTTPS documentation](https://nodejs.org/api/https.html) for more information.


## `devServer.inline` - CLI only

`boolean`

Toggle between the dev-server's two different modes. By default the application will be served with *inline mode* enabled. This means that a script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console.

It is also possible to use **iframe mode**, which uses an `<iframe>` under a notification bar with messages about the build. To switch to **iframe mode**:

```js
inline: false
```

T> Inline mode is recommended when using Hot Module Replacement.


## `devServer.lazy` 🔑

`boolean`

When `lazy` is enabled, the dev-server will only compile the bundle when it gets requested. This means that webpack will not watch any file changes. We call this **lazy mode**.

```js
lazy: true
```

T> `watchOptions` will have no effect when used with **lazy mode**.

T> If you use the CLI, make sure **inline mode** is disabled.


## `devServer.noInfo` 🔑

`boolean`

With `noInfo` enabled, messages like the webpack bundle information that is shown when starting up and after each save, will be hidden. Errors and warnings will still be shown.

```js
noInfo: true
```

## `devServer.overlay`

`boolean` `object`

Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors:

```js
overlay: true
```

If you want to show warnings as well as errors: 

```js
overlay: {
  warnings: true,
  errors: true
}
```

## `devServer.port` - CLI only

`number`

Specify a port number to listen for requests on:

```js
port: 8080
```


## `devServer.proxy`

`object`

Proxying some URLs can be useful when you have a separate API backend development server and you want to send API requests on the same domain.

The dev-server makes use of the powerful [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) package. Checkout its [documentation](https://github.com/chimurai/http-proxy-middleware#options) for more advanced usages.

With a backend on `localhost:3000`, you can use this to enable proxying:

```js
proxy: {
  "/api": "http://localhost:3000"
}
```

A request to `/api/users` will now proxy the request to `http://localhost:3000/api/users`.

If you don't want `/api` to be passed along, we need to rewrite the path:

```js
proxy: {
  "/api": {
    target: "http://localhost:3000",
    pathRewrite: {"^/api" : ""}
  }
}
```

A backend server running on HTTPS with an invalid certificate will not be accepted by default. If you want to, modify your config like this:

```js
proxy: {
  "/api": {
    target: "https://other-server.example.com",
    secure: false
  }
}
```

Sometimes you don't want to proxy everything. It is possible to bypass the proxy based on the return value of a function.

In the function you get access to the request, response and proxy options. It must return either `false` or a path that will be served instead of continuing to proxy the request.

E.g. for a browser request, you want to serve a HTML page, but for an API request you want to proxy it. You could do something like this:

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


## `devServer.progress` - CLI only

`boolean`

Output running progress to console.


## `devServer.public` - CLI only

`string`

When using *inline mode* and you're proxying dev-server, the inline client script does not always know where to connect to. It will try to guess the URL of the server based on `window.location`, but if that fails you'll need to use this.

For example, the dev-server is proxied by nginx, and available on `myapp.test`:

```js
public: "myapp.test:80"
```


## `devServer.publicPath` 🔑

`string`

The bundled files will be available in the browser under this path.

Imagine that the server is running under `http://localhost:8080` and `output.filename` is set to `bundle.js`. By default the `publicPath` is `"/"`, so your bundle is available as `http://localhost:8080/bundle.js`.

The `publicPath` can be changed so the bundle is put in a directory:

```js
publicPath: "/assets/"
```

The bundle will now be available as `http://localhost:8080/assets/bundle.js`.

T> Make sure `publicPath` always starts and ends with a forward slash.

It is also possible to use a full URL. This is necessary for Hot Module Replacement.

```js
publicPath: "http://localhost:8080/assets/"
```

The bundle will also be available as `http://localhost:8080/assets/bundle.js`.

T> It is recommended that `devServer.publicPath` is the same as `output.publicPath`.


## `devServer.quiet` 🔑

`boolean`

With `quiet` enabled, nothing except the initial startup information will be written to the console. This also means that errors or warnings from webpack are not visible.

```js
quiet: true
```

## `devServer.setup`

`function`

Here you can access the Express app object and add your own custom middleware to it.
For example, to define custom handlers for some paths:
     
```js
setup(app){
  app.get('/some/path', function(req, res) {
    res.json({ custom: 'response' });
  });
}
```


## `devServer.staticOptions`

It is possible to configure advanced options for serving static files from `contentBase`. See the [Express documentation](http://expressjs.com/en/4x/api.html#express.static) for the possible options. An example:

```js
staticOptions: {
  redirect: false
}
```

T> This only works when using `contentBase` as a `string`.


## `devServer.stats` 🔑

`string` `object`

This option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you want some bundle information, but not all of it.

To show only errors in your bundle:

```js
stats: "errors-only"
```

For more information, see the [**stats documentation**](/configuration/stats).

T> This option has no effect when used with `quiet` or `noInfo`.


## `devServer.watchContentBase`

`boolean`

Tell the server to watch the files served by the `devServer.contentBase` option. File changes will trigger a full page reload.

```js
watchContentBase: true
```

It is disabled by default.


## `devServer.watchOptions` 🔑

`object`

Control options related to watching the files.

webpack uses the file system to get notified of file changes. In some cases this does not work. For example, when using Network File System (NFS). [Vagrant](https://www.vagrantup.com/) also has a lot of problems with this. In these cases, use polling:

```js
watchOptions: {
  poll: true
}
```

If this is too heavy on the file system, you can change this to an integer to set the interval in milliseconds.

See [WatchOptions](/configuration/watch) for more options.
