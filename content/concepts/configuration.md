---
title: Configuration
sort: 6
contributors:
- TheLarkInn
- simon04
---

You may have noticed that few webpack configurations look exactly alike. This is because **webpack's configuration file is a JavaScript file that exports an object.** This object is then processed by webpack based upon its defined properties.

Because it's a standard Node.js CommonJS module, you **can do the following**:

* import other files via `require(...)`
* use utilities on npm via `require(...)`
* use JavaScript control flow expressions i. e. the `?:` operator
* use constants or variables for often used values
* write and execute functions to generate a part of the configuration

Use these features when appropriate.

While they are technically feasible, **the following practices should be avoided**:

* Access CLI arguments, when using the webpack CLI (instead write your own CLI, or [use `--env`](/configuration/configuration-types/))
* Export non-deterministic values (calling webpack twice should result in the same output files)
* Write long configurations (instead split the configuration into multiple files)

T> The most important part to take away from this document is that there are many different ways to format and style your webpack configuration. The key is to stick with something consistent that you and your team can understand and maintain.

The following examples below describe how webpack's configuration object can be both expressive and configurable because _it is code_:

## The Simplest Configuration

**webpack.config.js**

```javascript
var path = require('path');

module.exports = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

## Multiple Targets

_See_: [Exporting multiple configurations](/configuration/configuration-types/#exporting-multiple-configurations)

## Using other Configuration Languages

webpack accepts configuration files written in multiple programming and data languages.

_See_: [Configuration Languages](/configuration/configuration-languages/)
