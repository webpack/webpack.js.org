---
title: Targets
sort: 10
contributors:
  - TheLarkInn
  - rouzbeh84
  - johnstew
---

Because JavaScript can be written for both server and browser, webpack offers multiple deployment _targets_ that you can set in your webpack [configuration](/configuration).

W> The webpack `target` property is not to be confused with the `output.libraryTarget` property. For more information see [our guide](/concepts/output) on the `output` property.

## Usage

To set the `target` property, you simply set the target value in your webpack config:

**webpack.config.js**

```javascript
module.exports = {
  target: 'node'
};
```

In the example above, using `node` webpack will compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks and not touch any built in modules like `fs` or `path`).

Each _target_ has a variety of deployment/environment specific additions, support to fit its needs. See what [targets are available](/configuration/target).

?>Further expansion for other popular target values

## Multiple Targets

Although webpack does **not** support multiple strings being passed into the `target` property, you can create an isomorphic library by bundling two separate configurations:

**webpack.config.js**

```javascript
var path = require('path');
var serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
  //…
};

var clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  }
  //…
};

module.exports = [ serverConfig, clientConfig ];
```

The example above will create a `lib.js` and `lib.node.js` file in your `dist` folder.

## Resources

As seen from the options above there are multiple different deployment _targets_ that you can choose from. Below is a list of examples, and resources that you can refer to.

### Bundle Output Comparison

  **[compare-webpack-target-bundles](https://github.com/TheLarkInn/compare-webpack-target-bundles)**: A great resource for testing and viewing different webpack _targets_. Also great for bug reporting.

?> Need to find up to date examples of these webpack targets being used in live code or boilerplates.
