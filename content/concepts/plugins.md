---
title: 플러그인
sort: 5
contributors:
  - TheLarkInn
  - jhnns
  - rouzbeh84
  - johnstew
---

<!--**Plugins** are the [backbone](https://github.com/webpack/tapable) of webpack. webpack itself is built on the **same plugin system** that you use in your webpack configuration!-->
**플러그인**은 웹팩의 [뼈대](https://github.com/webpack/tapable)입니다. 웹팩 자체도 당신이 사용하고 있는 웹팩 설정과 같은 플러그인 시스템을 기반으로 되어있습니다.

<!--They also serve the purpose of doing **anything else** that a [loader](/concepts/loaders) cannot do.-->
플러그인은 또한 [로더](/concepts/loaders)가 할 수 없는 일들을 할 수 있도록 돕습니다.

<!--## Anatomy-->
## 구조

<!--A webpack **plugin** is a JavaScript object that has an [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) property. This `apply` property is called by the webpack compiler, giving access to the **entire** compilation lifecycle.-->
웹팩 **플러그인**은 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 프로퍼티를 갖고있는 자바스크립트 객체입니다. 이 `apply` 프로퍼티는 웹팩 컴파일러를 불러오며, **전체** 컴파일 생명주기에 대한 접근 권한을 부여합니다.

**ConsoleLogOnBuildWebpackPlugin.js**

```javascript
function ConsoleLogOnBuildWebpackPlugin() {

};

ConsoleLogOnBuildWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('run', function(compiler, callback) {
    console.log("The webpack build process is starting!!!");

    callback();
  });
};
```

<!--As a clever JavaScript developer you may remember the `Function.prototype.apply` method. Because of this method you can pass any function as plugin (`this` will point to the `compiler`). You can use this style to inline custom plugins in your configuration.-->
T> 영리한 자바스크립트 개발자는 `Function.prototype.apply` 메서드를 기억할 것입니다. 이 메서드 때문에 당신은 어떤 함수든 플러그인으로 (`this`는 `컴파일러`를 가리킬 것입니다.) 전달할 수 있습니다. 당신은 인라인 스타일의 커스텀 플러그인을 당신의 웹팩 설정에 사용할 수 있습니다.

## 사용

<!--Since **plugins** can take arguments/options, you must pass a `new` instance to the `plugins` property in your webpack configuration.-->
**플러그인**은 인수 / 옵션을 취할 수 있기 때문에, 웹팩 설정안에서 당신은 `new` 인스턴스를 `플러그인` 프로퍼티에 넘겨야 합니다.


<!--Depending on how you are using webpack, there are multiple ways to use plugins.-->
당신이 웹팩을 어떻게 사용하냐에 따라서, 플러그인을 사용하는 방법에는 여러가지가 있을 것입니다..

<!--### Configuration-->
### 설정

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //npm을 통해 설치됨
const webpack = require('webpack'); //내장 플러그인을 접근하기 위해
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```


<!--### Node API-->
### 노드 API

<!-- Even when using the Node API, users should pass plugins via the `plugins` property in the configuration. Using `compiler.apply` should not be the recommended way.-->
?> 노드 API를 사용해야 하는 경우에도, 웹팩 설정에서 `플러그인` 프로퍼티를 통해 플러그인을 전달해야 합니다. `compiler.apply`의 사용은 권장하는 방법이 아닙니다.

**some-node-script.js**

```javascript
  const webpack = require('webpack'); //to access webpack runtime
  const configuration = require('./webpack.config.js');

  let compiler = webpack(configuration);
  compiler.apply(new webpack.ProgressPlugin());

  compiler.run(function(err, stats) {
    // ...
  });
```

<!--Did you know: The example seen above is extremely similar to the [webpack runtime itself!](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292) There are lots of great usage examples hiding in the [webpack source code](https://github.com/webpack/webpack) that you can apply to your own configurations and scripts!-->
T> 알고있나요: 위에 나온 예제는 [웹팩 런타임](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292)과 매우 유사합니다. [웹팩 소스코드](https://github.com/webpack/webpack)안에 당신만의 웹팩 프로젝트 설정과 스크립트에 사용될 수 있는 훌륭한 사용 예제가 많이 있습니다.

