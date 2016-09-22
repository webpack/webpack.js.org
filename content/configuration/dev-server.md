---
title: DevServer
contributors:
  - sokra
  - gregvenech
---

?> Description...

### `devServer`

`object`

This set of options is picked up by [webpack-dev-server]() and can be used to change it's behavior in various ways. Here's a simple example that gzips and serves everything from our `/dist` directory:

```js
devServer: {
  contentBase: "dist/",
  compress: true,
  port:9000
}
```

When the server is started, there will be a message prior to the list of resolved modules:

```bash
http://localhost:9000/
webpack result is served from /build/
content is served from dist/
```

that will give some background on where the server is located and what it's serving.


### `devServer.contentBase`

`string` `array`

Tell the server where to serve content from. [`output.publicPath`](#output-publicpath) will also be used to determine where the bundles should be served from.

```js
contentBase: "path/to/dist/"
```

?> Add more details/examples, for example how is an array handled? Absolute or relative paths both allowed? Recommended?


### `devServer.hot`

`boolean`

Enable webpack's [Hot Module Replacement]() feature:

```js
hot: true
```

?> Add various other steps needed for this to work. (From my experience, and the current docs it looks like other steps are needed here - not like in the cmd line where it's just a flag)


### `devServer.inline`

`boolean`

Toggle between the dev-server's [two different modes](). By default the application will be served in an `<iframe>` under a notification bar with messages about the build (this is called *iframe mode*). To switch to *inline mode*:

```js
inline: true
```

and see the application rendered normally with build messages in the browser console.

T> Inline mode is recommended when using [Hot Module Replacement]().


### `devServer.historyApiFallback`

`boolean` `object`

When using the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History), the `index.html` page will likely have be served in place of any `404` responses. Enable this by passing:

```js
historyApiFallback: true
```

By passing an object, this behavior can be controlled further using options like `rewrites`:

```js
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
```

?> Are other options available besides `rewrites`?


### `devServer.compress`

`boolean`

Enable [gzip compression](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/) for everything served:

```js
compress: true
```


### `devServer.port`

`number`

Specify a port number to listen for requests on:

```js
port: 8080
```
