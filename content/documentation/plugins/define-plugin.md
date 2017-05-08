---
title: DefinePlugin
contributors:
  - simon04
  - rouzbeh84
---

``` javascript
new webpack.DefinePlugin(definitions)
```

The `DefinePlugin` allows you to create global constants which can be configured at **compile** time. This can be useful for allowing different behavior between development builds and release builds. If you perform logging in your development build but not in the release build you might use a global constant to determine whether logging takes place. That's where `DefinePlugin` shines, set it and forget it rules for development and release builds.

**Example:**

``` javascript
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify("5fa3b9"),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: "1+1",
  "typeof window": JSON.stringify("object")
})
```

``` javascript
console.log("Running App version " + VERSION);
if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");
```

T> Note that because the plugin does a direct text replacement, the value given to it must include **actual quotes** inside of the string itself. Typically, this is done either with either alternate quotes, such as `'"production"'`, or by using `JSON.stringify('production')`.

Each key passed into `DefinePlugin` is an identifier or multiple identifiers joined with `.`.

* If the value is a string it will be used as a code fragment.
* If the value isn't a string, it will be stringified (including functions).
* If the value is an object all keys are defined the same way.
* If you prefix `typeof` to the key, it's only defined for typeof calls.

The values will be inlined into the code allowing a minification pass to remove the redundant conditional.

**Example:**

``` javascript
if (!PRODUCTION) {
  console.log('Debug info')
}
if (PRODUCTION) {
  console.log('Production log')
}
```

After passing through webpack with no minification results in:

``` javascript
if (!true) {
  console.log('Debug info')
}
if (true) {
  console.log('Production log')
}
```

and then after a minification pass results in:

``` javascript
console.log('Production log')
```

## Use Case: Feature Flags

Enable/disable features in production/development build using [feature flags](https://en.wikipedia.org/wiki/Feature_toggle).

```javascript
new webpack.DefinePlugin({
  'NICE_FEATURE': JSON.stringify(true),
  'EXPERIMENTAL_FEATURE': JSON.stringify(false)
})
```

## Use Case: Service URLs

Use a different service URL in production/development builds:

```javascript
new webpack.DefinePlugin({
  'SERVICE_URL': JSON.stringify("http://dev.example.com")
})
```
