---
title: EnvironmentPlugin
contributors:
  - simon04
  - einarlove
  - rouzbeh84
---

`EnvironmentPlugin` 是一个通过 [`DefinePlugin`](/plugins/define-plugin) 来设置 [`process.env`](https://nodejs.org/api/process.html#process_process_env) 环境变量的快捷方式。

## 用法

The `EnvironmentPlugin` accepts either an array of keys.
`EnvironmentPlugin` 可以接收键数组或将键映射到其默认值的对象。（译者注：键是指要设定的环境变量名）

```javascript
new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG'])
```

上面的写法和下面这样使用 `DefinePlugin` 的效果相同：

```javascript
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
})
```

T> 使用不存在的环境变量会导致一个 "`EnvironmentPlugin` - `${key}` environment variable is undefined" 错误。

## 带默认值使用

或者，`EnvironmentPlugin` 也可以接收一个指定相应默认值的对象，如果在 `process.env` 中对应的环境变量不存在时将使用指定的默认值。

```js
new webpack.EnvironmentPlugin({
  NODE_ENV: 'development', // 除非有定义 process.env.NODE_ENV，否则就使用 'development'
  DEBUG: false
})
```

W> 从 `process.env` 中取到的值类型均为字符串。

T> 不同于 [`DefinePlugin`](/plugins/define-plugin)，默认值将被 `EnvironmentPlugin` 执行 `JSON.stringify`。

T> 如果要指定一个未设定的默认值，使用 `null` 来代替 `undefined`。

** 示例:**


让我们看一下对下面这个用来试验的文件 `entry.js` 执行前面配置的 `EnvironmentPlugin` 的结果：

```js
if (process.env.NODE_ENV === 'production') {
  console.log('Welcome to production');
}
if (process.env.DEBUG) {
  console.log('Debugging output');
}
```

当在终端执行 `NODE_ENV=production webpack` 来构建时，`entry.js` 变成了这样：

```javascript
if ('production' === 'production') { // <-- NODE_ENV 的 'production' 被带过来了
  console.log('Welcome to production');
}
if (false) { // <-- 使用了默认值
  console.log('Debugging output');
}
```

执行 `DEBUG=false webpack` 则会生成：

```javascript
if ('development' === 'production') { // <-- 使用了默认值
  console.log('Welcome to production');
}
if ('false') { // <-- DEBUG 的 'false' 被带过来了
  console.log('Debugging output');
}
```

## `DotenvPlugin`

The third-party [`DotenvPlugin`](https://github.com/mrsteele/dotenv-webpack) (`dotenv-webpack`) allows you to expose (a subset of) [dotenv variables](https://www.npmjs.com/package/dotenv):

``` bash
// .env
DB_HOST=127.0.0.1
DB_PASS=foobar
S3_API=mysecretkey
```

```javascript
 new Dotenv({
  path: './.env', // Path to .env file (this is the default)
  safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
})
```

***

> 原文：https://webpack.js.org/plugins/environment-plugin/