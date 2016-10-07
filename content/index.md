**index.js**

```js
const foo = require('./foo.js')

foo.bar()
```

**foo.js**

```js
module.exports = {
  bar: function () {
    //
  }
}
```

## Bundle your [modules](/concepts/modules) with webpack.

**webpack.config.js**

```javascript
  module.exports = {
    entry: './index.js',
    output: {
      path: 'bundle.js'
    }
  };
```

## It's really that simple, [get started](/get-started) now!
