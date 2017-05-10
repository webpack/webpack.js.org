---
title: 플러그인
sort: 8
contributors:
  - sokra
  - skipjack
  - yatharthk
---

<!--The `plugins` option is used to customize the webpack build process in a variety of ways. webpack comes with a variety built-in plugins available under `webpack.[plugin-name]`. See [this page](/plugins) for a list of plugins and documentation but note that there are a lot more out in the community.-->
`플러그인` 옵션은 웹팩 빌드 과정을 다양한 방법으로 맞춤화하기 위해 사용됩니다. 웹팩은 `webpack.[플러그인-이름]`으로 사용 가능한 다양한 내장 플러그인을 갖고 있습니다. 플러그인 목록과 문서를 보려면 이 [페이지](/plugins)를 확인해주세요. 또한 커뮤니티에 더 많은 정보가 있음을 참조해주세요.

<!--Note: This page only discusses using plugins, however if you are interested in writing your own please visit [Writing a Plugin](/development/how-to-write-a-plugin/).-->
T> 중요: 이 페이지는 플러그인 사용에 대해서만 설명합니다. 만약 당신만의 플러그인을 작성하는데 관심이 있다면 [플러그인 작성](/development/how-to-write-a-plugin/)을 방문해주세요.

<!--## `plugins`-->
## `플러그인`

<!--`array`-->
`배열`

<!--A list of webpack plugins. For example, when multiple bundles share some of the same dependencies, the `CommonsChunkPlugin` could be useful to extract those dependencies into a shared bundle to avoid duplication. This could be added like so:-->
웹팩 플러그인의 목록을 예로 든다면, 다수의 번들이 몇몇 같은 의존성들을 공유할 때, 각 번들마다 같은 의존성이 복제됨을 방지하기 위해 `CommonsChunkPlugin`이 유용하게 사용될 수 있습니다. 함께 사용되는 번들로 공유하고 있는 의존성들을 추출하는 작업을 진행합니다. 이렇게 추가할 수 있습니다.

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    ...
  })
_]_
```

<!--A more complex example, using multiple plugins, might look something like this:-->
여러 플러그인들을 사용하는 복잡한 예시는 다음과 같이 보일 수 있습니다.

```js
var webpack = require('webpack')
// importing plugins that do not come by default in webpack
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

// adding plugins to your configuration
plugins: [
  // build optimization plugins
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].min.js',
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
  }),
  new ExtractTextPlugin({
    filename: 'build.min.css',
    allChunks: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // compile time plugins
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // webpack-dev-server enhancement plugins
  new DashboardPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]
```
