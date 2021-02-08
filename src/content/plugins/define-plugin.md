---
title: DefinePlugin
contributors:
  - simon04
  - rouzbeh84
  - byzyk
  - EugeneHlushko
  - smonusbonus
---

`DefinePlugin` 允许在 **编译时** 创建配置的全局常量，这在需要区分开发模式与生产模式进行不同的操作时，非常有用。例如，如果想在开发构建中进行日志记录，而不在生产构建中进行，就可以定义一个全局常量去判断是否记录日志。这就是 `DefinePlugin` 的发光之处，设置好它，就可以忘掉开发环境和生产环境的构建规则。

```javascript
new webpack.DefinePlugin({
  // 定义...
});
```

## Usage {#usage}

传递给 `DefinePlugin` 的每个键都是一个标识符或多个以 `.` 连接的标识符。

- 如果该值为字符串，它将被作为代码片段来使用。
- 如果该值不是字符串，则将被转换成字符串（包括函数方法）。
- 如果值是一个对象，则它所有的键将使用相同方法定义。
- 如果键添加 `typeof` 作为前缀，它会被定义为 typeof 调用。

这些值将内联到代码中，从而允许通过代码压缩来删除冗余的条件判断。

```javascript
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
});
```

```javascript
console.log('Running App version ' + VERSION);
if (!BROWSER_SUPPORTS_HTML5) require('html5shiv');
```

W> 在为 `process` 定义值时，`'process.env.NODE_ENV': JSON.stringify('production')` 会比 `process: { env: { NODE_ENV: JSON.stringify('production') } }` 更好，后者会覆盖 `process` 对象，这可能会破坏与某些模块的兼容性，因为这些模块会在 process 对象上定义其他值。

T> 请注意，由于本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个 **实际的引号** 。通常，可以使用类似 `'"production"'` 这样的替换引号，或者直接用 `JSON.stringify('production')`。

```javascript
if (!PRODUCTION) {
  console.log('Debug info');
}

if (PRODUCTION) {
  console.log('Production log');
}
```

未经 webpack 压缩过的代码：

```javascript
if (!true) {
  console.log('Debug info');
}
if (true) {
  console.log('Production log');
}
```

经过压缩后：

```javascript
console.log('Production log');
```

## Feature Flags {#feature-flags}

使用 [feature flags](https://en.wikipedia.org/wiki/Feature_toggle) 在生产/开发构建中可以启用/禁用项目的不同特性。

```javascript
new webpack.DefinePlugin({
  NICE_FEATURE: JSON.stringify(true),
  EXPERIMENTAL_FEATURE: JSON.stringify(false),
});
```

## Service URL {#service-urls}

在生产或开发构建中使用不同的服务 URL：

```javascript
new webpack.DefinePlugin({
  SERVICE_URL: JSON.stringify('https://dev.example.com'),
});
```

## Runtime values via `runtimeValue` {#runtime-values-via-runtimevalue}

`function (getterFunction, [string]) => getterFunction()`

It is possible to define variables with values that rely on files and will be re-evaluated when such files change in the file system. This means webpack will rebuild when such watched files change.

Arguments:

- The first argument of the `webpack.DefinePlugin.runtimeValue` is a `function` that should return the value to be assigned to the definition.
- The second argument is an array of file paths to watch for. Pass `true` instead of `[string]` here to flag the module as uncacheable.

```javascript
const fileDep = path.resolve(__dirname, 'sample.txt');

new webpack.DefinePlugin({
  BUILT_AT: webpack.DefinePlugin.runtimeValue(Date.now, [fileDep]),
});
```

The value of `BUILT_AT` would be the time at which the `'sample.txt'` was last updated in the file system, e.g. `1597953013291`.
