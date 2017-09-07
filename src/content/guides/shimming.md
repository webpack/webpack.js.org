---
title: Shimming
sort: 13
contributors:
  - pksjce
  - jhnns
  - simon04
  - jeremenichelli
related:
  - title: Reward modern browser users script
    url: https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7#c665
  - title: useBuiltIns in babel-preset-env
    url: https://github.com/babel/babel-preset-env#usebuiltins
---

The `webpack` compiler can understand modules written as ES2015 modules, CommonJS or AMD. However, some third party libraries may expect global dependencies (e.g. `$` for `jQuery`). The libraries might also create globals which need to be exported. These "broken modules" are one instance where _shimming_ comes into play.

Another instance where _shimming_ can be useful is when you want to [polyfill](https://en.wikipedia.org/wiki/Polyfill) browser functionality to support more users. In this case, you may only want to deliver those polyfills to the browsers that need patch (i.e. load them on demand).

The following article will walk through both of these use cases.

T> For simplicity, this guide stems from the examples in [Getting Started](/guides/getting-started). Please make sure you are familiar with the setup there before moving on.

W> __We don't recommend using globals for everything!__ The whole concept behind webpack is to allow more modular front-end development. This means writing isolated modules that are well contained and do not rely on hidden dependencies (e.g. globals). Please only use these features as a last resort.


## Shimming Globals

Let's start with the first use case of shimming global variables. Before we do anything let's take another look at our project:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

Remember that `lodash` package we were using? For demonstration purposes, let's say we wanted to instead provide this as a global throughout our application. To do this, we can use the `ProvidePlugin`.

The [`ProvidePlugin`](/plugins/provide-plugin) makes a package available as a variable in every module compiled through webpack. If webpack sees that variable used, it will include the given package in the final bundle. Let's go ahead by removing the `import` statement for `lodash` and instead providing it via the plugin:

__src/index.js__

``` diff
- import _ from 'lodash';
-
  function component() {
    var element = document.createElement('div');

-   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
-   }
+   },
+   plugins: [
+     new webpack.ProvidePlugin({
+       lodash: 'lodash'
+     })
+   ]
  };
```

What we've essentially done here is tell webpack...

> If you encounter at least one instance of the variable `lodash`, include the `lodash` package and provide it to the modules that need it.

If we run a build, we should still see the same output:

``` bash
TODO: Include output
```

We can also use the `ProvidePlugin` to expose a single export of a module by configuring it with an "array path" (e.g. `[module, child, ...children?]`). So let's we only wanted to provide the `join` method from `lodash` wherever it's invoked:

__src/index.js__

``` diff
  function component() {
    var element = document.createElement('div');

-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.ProvidePlugin({
-       lodash: 'lodash'
+       join: ['lodash', 'join']
      })
    ]
  };
```

This would go nicely with [Tree Shaking](/guides/tree-shaking) as the rest of the `lodash` library should get dropped.


## Granular Shimming

Some legacy modules rely on `this` being the `window` object. Let's update our `index.js` so this is the case:

``` diff
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');
+
+   // Assume we are in the context of `window`
+   this.alert('Hmmm, this probably isn\'t a great idea...')

    return element;
  }

  document.body.appendChild(component());
```

This becomes a problem when the module is executed in a CommonJS context where `this` is equal to `module.exports`. In this case you can override `this` using the [`imports-loader`](/loaders/imports-loader/):

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: require.resolve('index.js'),
+         use: 'imports-loader?this=>window'
+       }
+     ]
+   },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```


## Global Exports

Let's say a library creates a global variable that it expects its consumers to use. We can add a small module to our setup to demonstrate this:

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- globals.js
  |- /node_modules
```

__src/globals.js__

``` js
var file = 'blah.txt';
var helpers = {
  test: function() { console.log('test something'); },
  parse: function() { console.log('parse something'); }
}
```

Now, while you'd likely never do this in your own source code, you may encounter a dated library you'd like to use that contains similar code to what's shown above. In this case, we can use [`exports-loader`](/loaders/exports-loader/), to export that global variable as a normal module export. For instance, in order to export `file` as `file` and `helpers.parse` as `parse`:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: require.resolve('index.js'),
          use: 'imports-loader?this=>window'
-       }
+       },
+       {
+         test: require.resolve('globals.js'),
+         use: 'exports-loader?file,parse=helpers.parse'
+       }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```

Now from within our entry script (i.e. `src/index.js`), we could `import { file, parse } from './globals.js';` and all should work smoothly.

















## `script-loader`

The [`script-loader`](/loaders/script-loader/) evaluates code in the global context, just like you would add the code into a `script` tag. In this mode, every normal library should work. `require`, `module`, etc. are undefined.

W> The file is added as string to the bundle. It is not minimized by `webpack`, so use a minimized version. There is also no dev tool support for libraries added by this loader.

Assuming you have a `legacy.js` file containing …

```javascript
GLOBAL_CONFIG = {};
```

… using the `script-loader` …

```javascript
require('script-loader!legacy.js');
```

… basically yields:

```javascript
eval("GLOBAL_CONFIG = {};");
```


## `noParse` option

When there is no AMD/CommonJS version of the module and you want to include the `dist`, you can flag this module as [`noParse`](/configuration/module/#module-noparse). Then `webpack` will just include the module without parsing it, which can be used to improve the build time.

W> Any feature requiring the AST, like the `ProvidePlugin`, will not work.

```javascript
module.exports = {
  module: {
    noParse: /jquery|backbone/
  }
};
```















## Node Built-Ins

Node built-ins, like `process`, can be polyfilled right directly from your configuration file without the use of any special loaders or plugins. See the [node configuration page](/configuration/node) for more information and examples.














## Loading polyfills on demand

It's common in web projects to include polyfills in the main bundle. This is not recommended because we are penalizing modern browsers users by making them download a bigger file with unneeded scripts.

The simplest way to mitigate this is by adding a separate entry point in your webpack config file including the polyfills your project needs.

```javascript
// webpack.config.js
module.exports = {
  entry: {
    polyfills: [
      'babel-polyfill',
      'whatwg-fetch'
    ],
    main: './src/index.js'
  }
  // ... rest of your webpack config
};
```

An alternative is to create a new entry file and manually import these packages.

```javascript
// src/polyfills.js
import 'babel-polyfill';
import 'whatwg-fetch';
```

```javascript
// webpack.config.js
module.exports = {
  entry: {
    polyfills: './src/polyfills.js',
    main: './src/index.js'
  }
  // rest of your webpack config
};
```

In your html file you need to conditionally load the `polyfills.js` file before your bundle. How you make this decision depends on the technologies and browsers you need to support.

```html
<script>
  var modernBrowser = (
    'fetch' in window &&
    'assign' in Object
  );

  var scripts = [ '/main.js' ];

  if (!modernBrowser) {
    scripts.unshift('/polyfills.js');
  }

  scripts.map(function(src) {
    var scriptElement = document.createElement('script');
    scriptElement.async = false;
    scriptElement.src = src;
    document.head.appendChild(scriptElement);
  });
</script>
```

T> Any script added dynamically like in the example above will run as soon as it's parsed, but we need our polyfill to run before our bundle. This is why we are setting `async` to `false` for each script.


### Smaller babel polyfill

`babel-preset-env` uses [browserslist](https://github.com/ai/browserslist) to transpile only what is not supported in your browsers matrix. This preset comes with the `useBuiltIns` option _(false by default)_ which converts your global `babel-polyfill` import to a more granular feature by feature import pattern like:

```javascript
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
import "core-js/modules/web.timers";
import "core-js/modules/web.immediate";
import "core-js/modules/web.dom.iterable";
```
