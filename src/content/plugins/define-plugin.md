---
title: DefinePlugin
group: webpack
contributors:
  - simon04
  - rouzbeh84
  - byzyk
  - EugeneHlushko
  - smonusbonus
---

The `DefinePlugin` allows you to create global constants which can be configured at **compile** time. This can be useful for allowing different behavior between development builds and production builds. If you perform logging in your development build but not in the production build you might use a global constant to determine whether logging takes place. That's where `DefinePlugin` shines, set it and forget it rules for development and production builds.

```javascript
new webpack.DefinePlugin({
  // Definitions...
});
```

## Usage

Each key passed into `DefinePlugin` is an identifier or multiple identifiers joined with `.`.

- If the value is a string it will be used as a code fragment.
- If the value isn't a string, it will be stringified (including functions).
- If the value is an object all keys are defined the same way.
- If you prefix `typeof` to the key, it's only defined for typeof calls.

The values will be inlined into the code allowing a minification pass to remove the redundant conditional.

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

W> When defining values for `process` prefer `'process.env.NODE_ENV': JSON.stringify('production')` over `process: { env: { NODE_ENV: JSON.stringify('production') } }`. Using the latter will overwrite the `process` object which can break compatibility with some modules that expect other values on the process object to be defined.

T> Note that because the plugin does a direct text replacement, the value given to it must include **actual quotes** inside of the string itself. Typically, this is done either with alternate quotes, such as `'"production"'`, or by using `JSON.stringify('production')`.

```javascript
if (!PRODUCTION) {
  console.log('Debug info');
}

if (PRODUCTION) {
  console.log('Production log');
}
```

After passing through webpack with no minification results in:

```javascript
if (!true) {
  console.log('Debug info');
}
if (true) {
  console.log('Production log');
}
```

and then after a minification pass results in:

```javascript
console.log('Production log');
```

## Feature Flags

Enable/disable features in production/development build using [feature flags](https://en.wikipedia.org/wiki/Feature_toggle).

```javascript
new webpack.DefinePlugin({
  NICE_FEATURE: JSON.stringify(true),
  EXPERIMENTAL_FEATURE: JSON.stringify(false),
});
```

## Service URLs

Use a different service URL in production/development builds:

```javascript
new webpack.DefinePlugin({
  SERVICE_URL: JSON.stringify('https://dev.example.com'),
});
```

## Runtime values via `runtimeValue`

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
