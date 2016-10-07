## Who said front-end code can't be modular?

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

## Bundle your modules with webpack.

**webpack.config.js**

```javascript
  module.exports = {
    entry: './index.js'
  };
```

## It's really that simple.
