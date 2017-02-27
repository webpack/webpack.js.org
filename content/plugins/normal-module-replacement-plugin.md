---
title: NormalModuleReplacementPlugin
contributors:
  - gonzoyumo
---
## Install

The `NormalModuleReplacementPlugin` is a built-in webpack plugin.


## Usage

``` javascript
new webpack.NormalModuleReplacementPlugin(resourceRegExp, newResource)
```

The `NormalModuleReplacementPlugin` allows you to replace resources that match `resourceRegExp` with `newResource`. If `newResource` is relative, it is resolved relative to the previous resource. If `newResource` is a function, it is expected to overwrite the request attribute of the supplied resource.

This can be useful for allowing different behaviour between builds.

## Basic example

Replace a specific module when building for a [development environment](/guides/production-build).


Say you have a config file `some/path/config.development.module.js` and a special version for production in `some/path/config.production.module.js`

Just add the following plugin when building for production:

``` javascript
new webpack.NormalModuleReplacementPlugin(
  /some\/path\/config\.development\.js/,
  './config.production.js'
);
```

## Advanced example

Conditional build depending on an [specified environment](/configuration/configuration-types).

Say you want a configuration with specific values for different build targets.

``` javascript
module.exports = function(env) {
  var appTarget = env.APP_TARGET || 'VERSION_A';
  return {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/(.*)-APP_TARGET(\.*)/, function(resource) {
        resource.request = resource.request.replace(/-APP_TARGET/, `-${appTarget}`);
      })
    ]
  }
  
}
```

Create the two config files:

**app/config-VERSION_A.js:**
``` javascript
export default {
  title : 'I am version A'
}
```
**app/config-VERSION_B.js:**
``` javascript
export default {
  title : 'I am version B'
}
```
Then import that config using the keyword you're looking for in the regexp:

``` javascript
import config from 'app/config-APP_TARGET';
console.log(config.title);
```

And now you just get the right config imported depending on which target you're building for:

``` shell
webpack --env.APP_TARGET VERSION_A
=> 'I am version A'

webpack --env.APP_TARGET VERSION_B
=> 'I am version B'

```
