---
title: istanbul-instrumenter-loader
source: https://raw.githubusercontent.com/webpack-contrib/istanbul-instrumenter-loader/master/README.md
edit: https://github.com/webpack-contrib/istanbul-instrumenter-loader/edit/master/README.md
---
## Install

```bash
npm install --save-dev istanbul-instrumenter-loader
# or
yarn add --dev istanbul-instrumenter-loader
```

## Usage

#### References

* [Loaders](https://webpack.js.org/concepts/loaders/)
* [karma-webpack](https://github.com/webpack/karma-webpack)
* [karma-coverage-istanbul-reporter](https://github.com/mattlewis92/karma-coverage-istanbul-reporter)

#### Project structure

Let's say you have the following:

```
├── src/
│   └── components/
│       ├── bar/
│       │   └── index.js
│       └── foo/
│           └── index.js
└── test/
    └── src/
        └── components/
            └── foo/
                └── index.js
```

To create a code coverage report for all components (even for those for which you have no tests yet) you have to require all the 1) sources and 2) tests. Something like it's described in ["alternative usage" of karma-webpack](https://github.com/webpack/karma-webpack#alternative-usage):

#### test/index.js

```js
// require all `project/test/src/components/**/index.js`
const testsContext = require.context('./src/components/', true, /index\.js$/);

testsContext.keys().forEach(testsContext);

// require all `project/src/components/**/index.js`
const componentsContext = require.context('../src/components/', true, /index\.js$/);

componentsContext.keys().forEach(componentsContext);
```

This file will be the only entry point for Karma.

#### karma.conf.js

```js
config.set({
    …
    files: [
        'test/index.js'
    ],
    preprocessors: {
        'test/index.js': 'webpack'
    },
    webpack: {
        …
        module: {
            rules: [
                // instrument only testing sources with Istanbul
                {
                    test: /\.js$/,
                    include: path.resolve('src/components/'),
                    loader: 'istanbul-instrumenter-loader'
                }
            ]
        }
        …
    },
    reporters: [ 'progress', 'coverage-istanbul' ],
    coverageIstanbulReporter: {
        reports: [ 'text-summary' ],
        fixWebpackSourcePaths: true
    },
    …
});
```

#### With babel
You must run the instrumentation as a post step:
```js
{
    test: /\.js$|\.jsx$/,
    enforce: 'post',
    use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
    exclude: /node_modules|\.spec\.js$/,
}
```

#### Options
The loader supports all options supported by [istanbul-lib-instrument](https://github.com/istanbuljs/istanbuljs/blob/master/packages/istanbul-lib-instrument/api.md#instrumenter).

## Contributing

Don't hesitate to create a pull request. Every contribution is appreciated. In development you can start the tests by calling `npm test`.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/266822?v=3&s=150">
        </br>
        <a href="https://github.com/deepsweet">Kir Belevich</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/istanbul-instrumenter-loader.svg
[npm-url]: https://npmjs.com/package/istanbul-instrumenter-loader

[node]: https://img.shields.io/node/v/istanbul-instrumenter-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/istanbul-instrumenter-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/istanbul-instrumenter-loader

[tests]: http://img.shields.io/travis/webpack-contrib/istanbul-instrumenter-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/istanbul-instrumenter-loader

[cover]: https://codecov.io/gh/webpack-contrib/istanbul-instrumenter-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/istanbul-instrumenter-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
