---
title: 컨셉
sort: 1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - johnstew
---

<!--*webpack* is a _module bundler_ for modern JavaScript applications. When webpack processes your application, it recursively builds a _dependency graph_ that includes every module your application needs, then packages all of those modules into a small number of _bundles_ - often only one - to be loaded by the browser.-->
*웹팩*은 모던 자바스크립트 앱을 위한 _모듈 번들러_ 입니다. 웹팩이 당신의 프로젝트를 진행시킬 때, 당신의 어플리케이션이 필요로 하고 있는 모든 모듈을 포함하는 _의존성 그래프_ 를 재귀적으로 빌드합니다. 그런 다음 모든 모듈을 브라우저에서 로드할 수 있는 작은 수의 _번들_ - 대개는 한개 정도 - 에 패키지화합니다.

<!--It is [incredibly configurable](/configuration), but to get started you only need to understand **Four Core Concepts**: entry, output, loaders, and plugins.-->
이것을 통해 당신은 [놀랍게 구성](/configuration)할 수 있습니다. 그러나 시작하기 위해서 당신은 entry, output, loaders, plugins 이 **4가지 코어 개념**을 이해할 필요가 있습니다.

<!--This document is intended to give a **high-level** overview of these concepts, while providing links to detailed concept specific use-cases.-->
이 문서는 세부적인 개념의 특정 사용 사례에 대한 링크를 제공하며, 핵심 개념들에 대한 **높은 수준**의 개요를 제공하기 위해 의도되었습니다.

<!--## Entry-->
## 엔트리

<!--webpack creates a graph of all of your application's dependencies. The starting point of this graph is known as an _entry point_. The _entry point_ tells webpack _where to start_ and follows the graph of dependencies to know _what to bundle_. You can think of your application's _entry point_ as the **contextual root** or **the first file to kick off your app**.-->
웹팩은 당신의 어플리케이션의 모든 의존성을 그래프화합니다. 이 그래프의 시작점은 _엔트리 포인트_ 로 알려져 있습니다. _엔트리 포인트_ 는 _시작 위치가 어디있는지_, 의존성 그래프를 따라 _무엇을 번들할 것인지_ 웹팩에 전달합니다. 당신은 당신의 어플리케이션 _엔트리 포인트_ 를 **문맥적인 시작 위치** 또는 **당신의 앱을 시작하는 첫 번째 파일** 로 생각할 수 있습니다.

<!--In webpack we define _entry points_ using the `entry` property in our [webpack configuration object](/configuration).-->
[웹팩 설정 객체](/configuration)안에서, 우리는 _엔트리 포인트_ 를 `entry` 프로퍼티를 사용하여 정의할 수 있습니다.

<!--The simplest example is seen below:-->
가장 간단한 예제는 다음과 같습니다.

**webpack.config.js**

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

<!--There are multiple ways to declare your `entry` property that are specific to your application's needs.-->
당신의 어플리케이션의 필요에 따라 `entry` 프로퍼티를 선언할 수 있는 다양한 방법이 있습니다.

<!--[Learn more!](/concepts/entry-points)-->
[더 배우기!](/concepts/entry-points)

<!--## Output-->
## 아웃풋

<!--Once you've bundled all of your assets together, you still need to tell webpack **where** to bundle your application. The webpack `output` property tells webpack **how to treat bundled code**.-->
일단 당신의 모든 에셋을 번들하면, 당신은 당신의 어플리케션에서 **어디에** 번들링한 파일을 위치시킬 것인지 웹팩에게 알릴 필요가 있습니다. 웹팩 `output` 프로퍼티가 웹팩에게 **번들링된 코드를 어떻게 취급할 것인지** 알립니다.

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

<!--In the example above, we use the `output.filename` and the `output.path` properties to tell webpack the name of our bundle and where we want it to be emitted to.-->
위 예제에서, 우리는 웹팩에게 번들 파일 이름을 알리고 어디로 보내야 하는지를 알리기 위해  `output.filename` 과  `output.path` 프로퍼티를 사용합니다.

<!--You may see the term **emitted** or **emit** used throughout our documentation and [plugin API](/api/plugins). This is a fancy term for "produced or discharged".-->
T> 아마 당신은 이 용어를 문서와 [플러그인 API](/api/plugins) 전반에 걸쳐 **사용된 모습**을 볼 수 있습니다. 이 용어는 생산 또는 ‘생산됨 또는 방출됨’에 대한 멋진 용어입니다.

<!--The `output` property has [many more configurable features](/configuration/output), but let's spend some time understanding some of the most common use cases for the `output` property.-->
`output` 프로퍼티는 [더 많은 설정 기능](/configuration/output)들을 갖고 있습니다. 하지만 여기서는 `output` 프로퍼티의 일반적인 사용 사례에 대해 이해하도록 합시다.

<!--[Learn more!](/concepts/output)-->
[더 배우기!](/concepts/output)

<!--## Loaders-->
## 로더

<!--The goal is to have all of the assets in your project to be **webpack's** concern and not the browser's. (This doesn't mean that they all have to be bundled together). webpack treats [every file (.css, .html, .scss, .jpg, etc.) as a module](/concepts/modules). However, webpack **only understands JavaScript**.-->
우리 목표는 당신의 프로젝트안에 모든 에셋이 브라우저가 아닌 **웹팩**에 관심을 갖도록하는 것입니다. ( 이 문장은 모든 에셋이 함께 번들되는 것과는 다른 의미를 갖습니다. ) 웹팩은 [모든 파일(.css, .html, .scss, .jpg, 등)을 모듈로](/concepts/modules) 취급하며 **오직 자바스크립트만을 이해**합니다.

<!--**Loaders in webpack _transform these files into modules_ as they are added to your dependency graph.**-->
**웹팩의 로더는 의존성 그래프에 파일들이 추가될 때마다 그 파일들을 모듈로 변환합니다.**

<!--At a high level, they have two purposes in your webpack config.-->
로더는 당신의 웹팩 설정에서 두 가지를 제안합니다.

<!--1. Identify what files should be transformed by a certain loader. (`test` property)-->
1. 현재 로더에 의해 어떤 파일을 변환할 것인지 확인합니다. ( `test` 프로퍼티 )
<!--2. Transform that file so that it can be added to your dependency graph (and eventually your bundle). (`use` property)-->
2. 당신의 의존성 그래프에 추가되기 위해 파일들을 변환합니다. ( 결국 당신의 번들에도 추가됩니다. ). ( `use` 프로퍼티 )

**webpack.config.js**

```javascript
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;
```

<!--The configuration above has defined a `rules` property for a single module with two required properties: `test` and `use`. This tells webpack's compiler the following:-->
위 설정은 필수적인 프로퍼티 ( `test` 와 `use` ) 들을 갖고있는 단일 모듈로  `rules` 프로퍼티를 정의했습니다. 위 설정은 웹팩의 컴파일러에게 이렇게 알립니다.

<!--"Hey webpack compiler, when you come across a path that resolves to a '.js' or '.jsx' file inside of a `require()`/`import` statement, **use** the `babel-loader` to transform it before you add it to the bundle".-->
> "웹팩 컴파일러! , `require()` / `import` 문안에서 '.js' 또는 '.jsx' 파일로 해석되는 경로를 발견하면, 번들에 추가하기 전에 변형시키기 위해 `babel-loader` 를 **사용**해야돼!"

<!--It is important to remember when defining rules in your webpack config, you are defining them under `module.rules` and not `rules`. However webpack will yell at you when doing this incorrectly.-->
W> 당신의 웹팩 설정에서 rules 를 정의할 때, `rules` 가 아닌 `module.rules` 안에 프로퍼티들을 정의해야함을 명심하십시오. 웹팩은 당신이 `module.rules` 가 아닌 `rules` 로 정의할 경우 당신에게 경고를 알릴 것 입니다.

<!--There are more specific properties to define on loaders that we haven't yet covered.-->
여기에 아직 우리가 다루지 않았던 더 다양한 로더의 프로퍼티들이 있습니다.

<!--[Learn more!](/concepts/loaders)-->
[더 배우기!](/concepts/loaders)

<!--## Plugins-->
## 플러그인

<!--Since Loaders only execute transforms on a per-file basis, `plugins` are most commonly used (but not limited to) performing actions and custom functionality on "compilations" or "chunks" of your bundled modules [(and so much more)](/concepts/plugins). The webpack Plugin system is [extremely powerful and customizable](/api/plugins).-->
로더는 파일 단위로만 변환을 실행하기 때문에, `플러그인` [(플러그인 더 보기)](/concepts/plugins)이 번들된 모듈의 ‘컴파일’이나 ‘청크’에 액션과 커스텀 기능을 대부분 수행하게 됩니다. (그러나 이에 국한되지 않음) 웹팩의 플러그인 시스템은 매우 강력하고 맞춤 설정을 할 수 있습니다.

<!--In order to use a plugin, you just need to `require()` it and add it to the `plugins` array. Most plugins are customizable via options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it with `new`.-->
플러그인을 사용하기 위해서, 당신은 단지 `require()`이 필요합니다. 그리고 `플러그인`을 담은 배열을 추가해주세요. 대부분 플러그인들은 옵션을 통해 맞춤 설정을 할 수 있습니다. 당신은 다양한 목적을 위해 설정안에서 한 플러그인을 여러번 사용할 수 있기 때문에, `new` 와 함께 플러그인 인스턴스를 생성할 필요가 있습니다.

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //npm을 통해 설치됨
const webpack = require('webpack'); //내장 플러그인에 접근하기 위해
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

<!--There are many plugins that webpack provides out of the box! Check out our [list of plugins](/plugins) for more information.-->
여기에 웹팩이 즉시 제공하는 많은 플러그인이 있습니다. 더 많은 정보를 보기 위해 [플러그인 리스트](/plugins)를 확인해보세요.

<!--Using plugins in your webpack config is straight-forward, however there are many use-cases that are worth discussing further.-->
웹팩 설정안에서 플러그인을 사용하는 것은 간단하지만, 여기에 토론 할만한 가치가 있는 더 많은  플러그인 사용 예제가 있습니다.

<!--[Learn more!](/concepts/plugins)-->
[더 배우기!](/concepts/plugins)
