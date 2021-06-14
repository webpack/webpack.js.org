---
title: Writing a Loader
sort: 2
contributors:
  - asulaiman
  - michael-ciniawsky
  - byzyk
  - anikethsaha
  - jamesgeorge007
  - chenxsan
---

A loader is a node module that exports a function. This function is called when a resource should be transformed by this loader. The given function will have access to the [Loader API](/api/loaders/) using the `this` context provided to it.

## Setup

Before we dig into the different types of loaders, their usage, and examples, let's take a look at the three ways you can develop and test a loader locally.

To test a single loader, you can use `path` to `resolve` a local file within a rule object:

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve('path/to/loader.js'),
            options: {
              /* ... */
            },
          },
        ],
      },
    ],
  },
};
```

To test multiple, you can utilize the `resolveLoader.modules` configuration to update where webpack will search for loaders. For example, if you had a local `/loaders` directory in your project:

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  //...
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
};
```

By the way, if you've already created a separate repository and package for your loader, you could [`npm link`](https://docs.npmjs.com/cli/link) it to the project in which you'd like to test it out.

T> You can use [`webpack-defaults` package](https://github.com/webpack-contrib/webpack-defaults) to generate boilerplate code necessary to start writing your loader.

## Simple Usage

When a single loader is applied to the resource, the loader is called with only one parameter – a string containing the content of the resource file.

Synchronous loaders can `return` a single value representing the transformed module. In more complex cases, the loader can return any number of values by using the `this.callback(err, values...)` function. Errors are either passed to the `this.callback` function or thrown in a sync loader.

The loader is expected to give back one or two values. The first value is a resulting JavaScript code as string or buffer. The second optional value is a SourceMap as JavaScript object.

## Complex Usage

When multiple loaders are chained, it is important to remember that they are executed in reverse order – either right to left or bottom to top depending on array format.

- The last loader, called first, will be passed the contents of the raw resource.
- The first loader, called last, is expected to return JavaScript and an optional source map.
- The loaders in between will be executed with the result(s) of the previous loader in the chain.

In the following example, the `foo-loader` would be passed the raw resource and the `bar-loader` would receive the output of the `foo-loader` and return the final transformed module and a source map if necessary.

**webpack.config.js**

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['bar-loader', 'foo-loader'],
      },
    ],
  },
};
```

## Guidelines

The following guidelines should be followed when writing a loader. They are ordered in terms of importance and some only apply in certain scenarios, read the detailed sections that follow for more information.

- Keep them **simple**.
- Utilize **chaining**.
- Emit **modular** output.
- Make sure they're **stateless**.
- Employ **loader utilities**.
- Mark **loader dependencies**.
- Resolve **module dependencies**.
- Extract **common code**.
- Avoid **absolute paths**.
- Use **peer dependencies**.

### Simple

Loaders should do only a single task. This not only makes the job of maintaining each loader easier, but also allows them to be chained for usage in more scenarios.

### Chaining

Take advantage of the fact that loaders can be chained together. Instead of writing a single loader that tackles five tasks, write five simpler loaders that divide this effort. Isolating them not only keeps each individual loader simple, but may allow for them to be used for something you hadn't thought of originally.

Take the case of rendering a template file with data specified via loader options or query parameters. It could be written as a single loader that compiles the template from source, executes it and returns a module that exports a string containing the HTML code. However, in accordance with guidelines, an `apply-loader` exists that can be chained with other open source loaders:

- `pug-loader`: Convert template to a module that exports a function.
- `apply-loader`: Executes the function with loader options and returns raw HTML.
- `html-loader`: Accepts HTML and outputs a valid JavaScript module.

T> The fact that loaders can be chained also means they don't necessarily have to output JavaScript. As long as the next loader in the chain can handle its output, the loader can return any type of module.

### Modular

Keep the output modular. Loader generated modules should respect the same design principles as normal modules.

### Stateless

Make sure the loader does not retain state between module transformations. Each run should always be independent of other compiled modules as well as previous compilations of the same module.

### Loader Utilities

Take advantage of the [`loader-utils`](https://github.com/webpack/loader-utils) package. It provides a variety of useful tools but one of the most common is retrieving the options passed to the loader. Along with `loader-utils`, the [`schema-utils`](https://github.com/webpack-contrib/schema-utils) package should be used for consistent JSON Schema based validation of loader options. Here's a brief example that utilizes both:

**loader.js**

```js
import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

export default function (source) {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'Example Loader',
    baseDataPath: 'options',
  });

  // Apply some transformations to the source...

  return `export default ${JSON.stringify(source)}`;
}
```

### Loader Dependencies

If a loader uses external resources (i.e. by reading from filesystem), they **must** indicate it. This information is used to invalidate cacheable loaders and recompile in watch mode. Here's a brief example of how to accomplish this using the `addDependency` method:

**loader.js**

```js
import path from 'path';

export default function (source) {
  var callback = this.async();
  var headerPath = path.resolve('header.js');

  this.addDependency(headerPath);

  fs.readFile(headerPath, 'utf-8', function (err, header) {
    if (err) return callback(err);
    callback(null, header + '\n' + source);
  });
}
```

### Module Dependencies

Depending on the type of module, there may be a different schema used to specify dependencies. In CSS for example, the `@import` and `url(...)` statements are used. These dependencies should be resolved by the module system.

This can be done in one of two ways:

- By transforming them to `require` statements.
- Using the `this.resolve` function to resolve the path.

The `css-loader` is a good example of the first approach. It transforms dependencies to `require`s, by replacing `@import` statements with a `require` to the other stylesheet and `url(...)` with a `require` to the referenced file.

In the case of the `less-loader`, it cannot transform each `@import` to a `require` because all `.less` files must be compiled in one pass for variables and mixin tracking. Therefore, the `less-loader` extends the less compiler with custom path resolving logic. It then takes advantage of the second approach, `this.resolve`, to resolve the dependency through webpack.

T> If the language only accepts relative urls (e.g. `url(file)` always refers to `./file`), you can use the `~` convention to specify references to installed modules (e.g. those in `node_modules`). In the case of `url`, that would look something like `url('~some-library/image.jpg')`.

### Common Code

Avoid generating common code in every module the loader processes. Instead, create a runtime file in the loader and generate a `require` to that shared module:

**src/loader-runtime.js**

```js
const { someOtherModule } = require('./some-other-module');

module.exports = function runtime(params) {
  const x = params.y * 2;

  return someOtherModule(params, x);
};
```

**src/loader.js**

```js
import runtime from './loader-runtime.js';

export default function loader(source) {
  // Custom loader logic

  return `${runtime({
    source,
    y: Math.random(),
  })}`;
}
```

### Absolute Paths

Don't insert absolute paths into the module code as they break hashing when the root for the project is moved. There's a [`stringifyRequest`](https://github.com/webpack/loader-utils#stringifyrequest) method in `loader-utils` which can be used to convert an absolute path to a relative one.

### Peer Dependencies

If the loader you're working on is a simple wrapper around another package, then you should include the package as a `peerDependency`. This approach allows the application's developer to specify the exact version in the `package.json` if desired.

For instance, the `sass-loader` [specifies `node-sass`](https://github.com/webpack-contrib/sass-loader/blob/master/package.json) as peer dependency like so:

```json
{
  "peerDependencies": {
    "node-sass": "^4.0.0"
  }
}
```

## Testing

So you've written a loader, followed the guidelines above, and have it set up to run locally. What's next? Let's go through a unit testing example to ensure our loader is working the way we expect. We'll be using the [Jest](https://jestjs.io/) framework to do this. We'll also install `babel-jest` and some presets that will allow us to use the `import` / `export` and `async` / `await`. Let's start by installing and saving these as a `devDependencies`:

```bash
npm install --save-dev jest babel-jest @babel/core @babel/preset-env
```

**babel.config.js**

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

Our loader will process `.txt` files and replace any instance of `[name]` with the `name` option given to the loader. Then it will output a valid JavaScript module containing the text as its default export:

**src/loader.js**

```js
import { getOptions } from 'loader-utils';

export default function loader(source) {
  const options = getOptions(this);

  source = source.replace(/\[name\]/g, options.name);

  return `export default ${JSON.stringify(source)}`;
}
```

We'll use this loader to process the following file:

**test/example.txt**

```bash
Hey [name]!
```

Pay close attention to this next step as we'll be using the [Node.js API](/api/node) and [`memfs`](https://github.com/streamich/memfs) to execute webpack. This lets us avoid emitting `output` to disk and will give us access to the `stats` data which we can use to grab our transformed module:

```bash
npm install --save-dev webpack memfs
```

**test/compiler.js**

```js
import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.txt$/,
          use: {
            loader: path.resolve(__dirname, '../src/loader.js'),
            options,
          },
        },
      ],
    },
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      resolve(stats);
    });
  });
};
```

T> In this case, we've inlined our webpack configuration but you can also accept a configuration as a parameter to the exported function. This would allow you to test multiple setups using the same compiler module.

And now, finally, we can write our test and add an npm script to run it:

**test/loader.test.js**

```js
/**
 * @jest-environment node
 */
import compiler from './compiler.js';

test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('example.txt', { name: 'Alice' });
  const output = stats.toJson({ source: true }).modules[0].source;

  expect(output).toBe('export default "Hey Alice!\\n"');
});
```

**package.json**

```json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "testEnvironment": "node"
  }
}
```

With everything in place, we can run it and see if our new loader passes the test:

```bash
 PASS  test/loader.test.js
  ✓ Inserts name and outputs JavaScript (229ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.853s, estimated 2s
Ran all test suites.
```

It worked! At this point you should be ready to start developing, testing, and deploying your own loaders. We hope that you'll share your creations with the rest of the community!
