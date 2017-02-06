---
title: Entry and Context
sort: 4
contributors:
  - sokra
  - skipjack
  - tarang9211
---

The entry object is where webpack looks to start building the bundle. The context is an absolute string to the directory that contains the entry files.

## `context`

`string`

The base directory, an **absolute path**, for resolving entry points and loaders from configuration.

``` js
context: path.resolve(__dirname, "app")
```

By default the current directory is used, but it's recommended to pass a value in your configuration. This makes your configuration independent from CWD (current working directory).

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
