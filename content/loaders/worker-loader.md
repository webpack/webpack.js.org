---
title: worker-loader
source: https://raw.githubusercontent.com/webpack/worker-loader/master/README.md
edit: https://github.com/webpack/worker-loader/edit/master/README.md
---
# webpack的worker loader

## 使用

[文档：使用loaders](http://webpack.github.io/docs/using-loaders.html)

导入worker文件：

``` javascript
// main.js
var MyWorker = require("worker-loader!./file.js");

var worker = new MyWorker();
worker.postMessage({a: 1});
worker.onmessage = function(event) {...};
worker.addEventListener("message", function(event) {...});
```

您还可以使用inline参数将worker作为blob内联：

``` javascript
var MyWorker = require("worker-loader?inline!./file.js");
```


worker文件可以像任何其他文件一样导入依赖关系：

``` javascript
// file.js
var _ = require('lodash')

var o = {foo: 'foo'}

_.has(o, 'foo') // true
```

如果你配置了babel-loader，你甚至可以使用ES6模块：

``` javascript
// file.js
import _ from 'lodash'

let o = {foo: 'foo'}

_.has(o, 'foo') // true
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/worker-loader/
