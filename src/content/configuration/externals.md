---
title: Externals
sort: 13
contributors:
  - sokra
  - skipjack
  - pksjce
---

The `externals` configuration option provides a way of excluding dependencies from the output bundles. Instead, the created bundle relies on that dependency to be present in the consumer's environment. This feature is typically most useful to __library developers__, however there are a variety of applications for it.

T> __consumer__ here is any end user application that includes the library that you have bundled using webpack.


## `externals`

`string` `array` `object` `function`  `regex`

__Prevent bundling__ of certain `import`ed packages and instead retrieve these *external dependencies* at runtime.

For example, to include [jQuery](https://jquery.com/) from a CDN instead of bundling it:

__index.html__

``` html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```

__webpack.config.js__

``` js
externals: {
  jquery: 'jQuery'
}
```

This leaves any dependent modules unchanged, i.e. the code shown below will still work:

``` js
import $ from 'jquery';

$('.my-element').animate(...);
```

The bundle with external dependencies can be used in various module contexts, such as [CommonJS, AMD, global and ES2015 modules](/concepts/modules). The external library may be available in any of these forms:

- __root__: The library should be available as a global variable (e.g. via a script tag).
- __commonjs__: The library should be available as a CommonJS module.
- __commonjs2__: Similar to the above but where the export is `module.exports.default`.
- __amd__: Similar to `commonjs` but using AMD module system.

The following syntaxes are accepted...


### string

See the example above. The property name `jquery` indicates that the module `jquery` in `import $ from 'jquery'` should be excluded. In order to replace this module, the value `jQuery` will be used to retrieve a global `jQuery` variable. In other words, when a string is provided it will be treated as `root` (defined above and below).


### array

``` js
externals: {
  subtract: ['./math', 'subtract']
}
```

`subtract: ['./math', 'subtract']` converts to a parent child construct, where `./math` is the parent module and your bundle only requires the subset under `subtract` variable.


### object

``` js
externals : {
  react: 'react'
}

// or

externals : {
  lodash : {
    commonjs: "lodash",
    amd: "lodash",
    root: "_" // indicates global variable
  }
}

// or

externals : {
  subtract : {
    root: ["math", "subtract"]
  }
}
```

This syntax is used to describe all the possible ways that an external library can be available. `lodash` here is available as `lodash` under AMD and CommonJS module systems but available as `_` in a global variable form. `subtract` here is available via the property `subtract` under the global `math` object (e.g. `window['math']['subtract']`).


### function

It might be useful to define your own function to control the behavior of what you want to externalize from webpack. [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals), for example, excludes all modules from the `node_modules` directory and provides some options to, for example, whitelist packages.

It basically comes down to this:

``` js
externals: [
  function(context, request, callback) {
    if (/^yourregex$/.test(request)){
      return callback(null, 'commonjs ' + request);
    }
    callback();
  }
],
```

The `'commonjs ' + request` defines the type of module that needs to be externalized.


### regex

Every dependency that matches the given regular expression will be excluded from the output bundles.

``` js
externals: /^(jquery|\$)$/i
```

In this case any dependency named `jQuery`, capitalized or not, or `$` would be externalized.


For more information on how to use this configuration, please refer to the article on [how to author a library](/guides/author-libraries).
