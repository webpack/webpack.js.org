---
title: 入口和上下文
contributors:
  - sokra
  - skipjack
---

?> TODO: Short description

## `context`

`string`

The base directory, an **absolute path**, for resolving entry points and loaders from configuration.

``` js
context: path.resolve(__dirname, "app")
```

By default the current directory is used, but it's recommended to pass a value in your configuration. This makes your configuration independent from CWD.

---

## `entry`

`string | [string] | object { <key>: string | [string] }`

The point or points to enter the application. At this point the application starts executing. If an array is passed all items will be executed.

A dynamically loaded module is **not** an entry point.

Simple rule: one entry point per HTML page. SPA: one entry point, MPA: multiple entry points.

```js
entry: {
  home: "./home.js",
  about: "./about.js",
  contact: "./contact.js"
}
```

When combining with the [`output.library`](/configuration/output#output-library) option: If an array is passed only the last item is exported.
