---
title: Entry and Context
contributors:
  - sokra
  - gregvenech
---

?> TODO: Short description

### `context`

`string`

The base directory, an absolute path, for resolving entry points.

```js
context: path.resolve(__dirname, ‘src’)
```

---

### `entry`

`string` `array` `object`

The point or points to enter the application. 

```js
entry: {
  home: ‘./home.js’,
  about: ‘./about.js’,
  contact: ‘./contact.js’
}
```

?> Add more details on passing a string/array and how this will affect bundle names