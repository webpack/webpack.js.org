---
title: EnvironmentPlugin
contributors:
  - simon04
  - einarlove
  - rouzbeh84
  - byzyk
---

The `EnvironmentPlugin` is shorthand for using the [`DefinePlugin`](/plugins/define-plugin) on [`process.env`](https://nodejs.org/api/process.html#process_process_env) keys.

## Usage

The `EnvironmentPlugin` accepts either an array of keys or an object mapping its keys to their default values.

```javascript
new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']);
```

This is equivalent to the following `DefinePlugin` application:

```javascript
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
});
```

T> Not specifying the environment variable raises an "`EnvironmentPlugin` - `${key}` environment variable is undefined" error.

## Usage with default values

Alternatively, the `EnvironmentPlugin` supports an object, which maps keys to their default values. The default value for a key is taken if the key is undefined in `process.env`.

```javascript
new webpack.EnvironmentPlugin({
  NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
  DEBUG: false
});
```

W> Variables coming from `process.env` are always strings.

T> Unlike [`DefinePlugin`](/plugins/define-plugin), default values are applied to `JSON.stringify` by the `EnvironmentPlugin`.

T> Default values of `null` and `undefined` behave differently. Use `undefined` for variables that _must_ be provided during bundling, or `null` if they are optional.

W> If an environment variable is not found during bundling and no default value was provided, webpack will throw an error instead of a warning.

__Example:__

Let's investigate the result when running the previous `EnvironmentPlugin` configuration on a test file `entry.js`:

```javascript
if (process.env.NODE_ENV === 'production') {
  console.log('Welcome to production');
}
if (process.env.DEBUG) {
  console.log('Debugging output');
}
```

When executing `NODE_ENV=production webpack` in the terminal to build, `entry.js` becomes this:

```javascript
if ('production' === 'production') { // <-- 'production' from NODE_ENV is taken
  console.log('Welcome to production');
}
if (false) { // <-- default value is taken
  console.log('Debugging output');
}
```

Running `DEBUG=false webpack` yields:

```javascript
if ('development' === 'production') { // <-- default value is taken
  console.log('Welcome to production');
}
if ('false') { // <-- 'false' from DEBUG is taken
  console.log('Debugging output');
}
```

## Use Case: Git Version

The following `EnvironmentPlugin` configuration provides `process.env.GIT_VERSION` (such as "v5.4.0-2-g25139f57f") and `process.env.GIT_AUTHOR_DATE` (such as "2020-11-04T12:25:16+01:00") corresponding to the last Git commit of the repository:

```javascript
const child_process = require('child_process');
function git(command) {
  return child_process.execSync(`git ${command}`, { encoding: 'utf8' }).trim();
}

new webpack.EnvironmentPlugin({
  GIT_VERSION: git('describe --always'),
  GIT_AUTHOR_DATE: git('log -1 --format=%aI'),
});
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
});
```
