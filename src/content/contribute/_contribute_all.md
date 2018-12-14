

# Contribute

The people who contribute to webpack do so for the love of open source, our users and ecosystem, and most importantly, pushing the web forward together. Because of our [Open Collective](https://opencollective.com/webpack) model for funding and transparency, we are able to funnel support and funds through contributors, dependent projects, and the contributor and core teams. To make a donation, simply click the button below...

<div align="center">
  <a href="https://opencollective.com/webpack/donate" target="_blank">
    <img src="https://opencollective.com/webpack/donate/button@2x.png?color=blue" width=300 />
  </a>
</div>

But what is the return on the investment?


## Developers

The biggest core feature we'd like to provide is enjoyable development experience. Developers like you can help by contributing to rich and vibrant documentation, issuing pull requests to help us cover niche use cases, and to help sustain what you love about webpack.

### How Can I Help?

Anybody can help by doing any of the following:

- Ask your employer to use webpack in projects.
- Help us write and maintain the content on this site (see the [writer's guide](/writers-guide)).
- Contribute to the [core repository](https://github.com/webpack/webpack).
- Become a backer or sponsor on [open collective](https://opencollective.com/webpack#support).

### Encouraging Employers

You can ask your employer to improve your workflow by leveraging webpack: an all-in-one tool for fonts, images and image optimization, and json. Explain to them how webpack will attempt to bundle your code and assets the best it can for the smallest file size, leading to speedier sites and applications.

### Your Contributions

Contributing to webpack is not contributing to an exclusive club. You as a developer are contributing to the overall health of downstream projects. Hundreds, if not thousands, of projects depend on webpack and contributing will make the ecosystem better for all users.

The remainder of this section of the site is dedicated to developers such as yourself who would like to become a part of our ever-growing community:

- [Writing a Loader](./writing-a-loader)
- [Writing a Plugin](./writing-a-plugin)
- [Plugin Patterns](./plugin-patterns)
- [Release Process](./release-process)


## Executives

CTO's, VPs, and owners can help too!

<!-- add slides here regarding monetary value/dev time/tooling -->

webpack is an all-in-one tool for bundling your code. It can handle fonts, images, data and more with the help of community-driven plugins and loaders. Having all of your assets be handled by one tool is immensely helpful, as you or your team can spend less time making sure a machine with many moving parts is working correctly and more time building your product.

### Sponsorship

Aside from monetary assistance, companies can support webpack by:

- Providing developers that are not actively working on a project.
- Contributing computing power for improved CI and regression testing.

You can also encourage your developers to contribute to the ecosystem by open-sourcing webpack loaders, plugins and other utilities. And, as mentioned above, we would greatly appreciate any help increasing our CI/CD infrastructure.

### Anyone Else

To anyone else who is interested in helping our mission -- e.g. venture capitalists, government entities, digital agencies, etc. -- we would love for you to work with us, one of the top npm packages, to improve your product! Please don't hesitate to reach out with questions.

<!-- add slides here -->


# Writer's Guide

The following sections contain all you need to know about editing and formatting the content within this site. Make sure to do some research before starting your edits or additions. Sometimes the toughest part is finding where the content should live and determining whether or not it already exists.


## Process

1. Check related issue if an article links to one.
2. Hit `edit` and expand on the structure.
3. PR changes.


## YAML Frontmatter

Each article contains a small section at the top written in [YAML Frontmatter](https://jekyllrb.com/docs/frontmatter/):

``` yaml
---
title: My Article
group: My Sub-Section
sort: 3
contributors:
  - [github username]
related:
  - title: Title of Related Article
    url: [url of related article]
---
```

Let's break these down:

- `title`: The name of the article.
- `group`: The name of the sub-section
- `sort`: The order of the article within its section (or) sub-section if it is present.
- `contributors`: A list of GitHub usernames who have contributed to this article.
- `related`: Any related reading or useful examples.

Note that `related` will generate a __Further Reading__ section at the bottom of the page and `contributors` will yield a __Contributors__ section below it. If you edit an article and would like recognition, don't hesitate to add your GitHub username to the `contributors` list.


## Article Structure

1. Brief Introduction - a paragraph or two so you get the basic idea about the what and why.
2. Outline Remaining Content – how the content will be presented.
3. Main Content - tell what you promised to tell.
4. Conclusion - tell what you told and recap the main points.


## Typesetting

- webpack should always be written in lower-case letters. Even at the beginning of a sentence. ([source](https://github.com/webpack/media#name))
- loaders are enclosed in backticks and [kebab-cased](https://en.wikipedia.org/w/index.php?title=Kebab_case): `css-loader`, `ts-loader`, …
- plugins are enclosed in backticks and [camel-cased](https://en.wikipedia.org/wiki/Camel_case): `BannerPlugin`, `NpmInstallWebpackPlugin`, …
- Use "webpack 2" to refer to a specific webpack version (~~"webpack v2"~~)
- Use ES5; ES2015, ES2016, … to refer to the ECMAScript standards (~~ES6~~, ~~ES7~~)


## Formatting

### Code

__Syntax: \`\`\`javascript … \`\`\`__

```javascript
function foo () {
  return 'bar';
}

foo();
```

### Lists

- Boo
- Foo
- Zoo

Lists should be ordered alphabetically.

### Tables

Parameter   | Explanation                                      | Input Type | Default Value
----------- | ------------------------------------------------ | ---------- |--------------
--debug     | Switch loaders to debug mode                     | boolean    | false
--devtool   | Define source map type for the bundled resources | string     | -
--progress  | Print compilation progress in percentage         | boolean    | false

Tables should also be ordered alphabetically.

### Configuration Properties

The [configuration](/configuration) properties should be ordered alphabetically as well:

- `devServer.compress`
- `devServer.contentBase`
- `devServer.hot`

### Quotes

#### Blockquote

__Syntax: \>__

> This is a blockquote.

#### Tip

__Syntax: T\>__

T> This is a tip.

__Syntax: W\>__

W> This is a warning.

__Syntax: ?\>__

?> This is a todo.


# Writing a Loader

A loader is a node module that exports a function. This function is called when a resource should be transformed by this loader. The given function will have access to the [Loader API](/api/loaders/) using the `this` context provided to it.


## Setup

Before we dig into the different types of loaders, their usage, and examples, let's take a look at the three ways you can develop and test a loader locally.

To test a single loader, you can simply use `path` to `resolve` a local file within a rule object:

__webpack.config.js__

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve('path/to/loader.js'),
            options: {/* ... */}
          }
        ]
      }
    ]
  }
};
```

To test multiple, you can utilize the `resolveLoader.modules` configuration to update where webpack will search for loaders. For example, if you had a local `/loaders` directory in your project:

__webpack.config.js__

```js
module.exports = {
  //...
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  }
};
```

Last but not least, if you've already created a separate repository and package for your loader, you could [`npm link`](https://docs.npmjs.com/cli/link) it to the project in which you'd like to test it out.


## Simple Usage

When a single loader is applied to the resource, the loader is called with only one parameter -- a string containing the content of the resource file.

Synchronous loaders can simply `return` a single value representing the transformed module. In more complex cases, the loader can return any number of values by using the `this.callback(err, values...)` function. Errors are either passed to the `this.callback` function or thrown in a sync loader.

The loader is expected to give back one or two values. The first value is a resulting JavaScript code as string or buffer. The second optional value is a SourceMap as JavaScript object.


## Complex Usage

When multiple loaders are chained, it is important to remember that they are executed in reverse order -- either right to left or bottom to top depending on array format.

- The last loader, called first, will be passed the contents of the raw resource.
- The first loader, called last, is expected to return JavaScript and an optional source map.
- The loaders in between will be executed with the result(s) of the previous loader in the chain.

So, in the following example, the `foo-loader` would be passed the raw resource and the `bar-loader` would receive the output of the `foo-loader` and return the final transformed module and a source map if necessary.

__webpack.config.js__

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          'bar-loader',
          'foo-loader'
        ]
      }
    ]
  }
};
```


## Guidelines

The following guidelines should be followed when writing a loader. They are ordered in terms of importance and some only apply in certain scenarios, read the detailed sections that follow for more information.

- Keep them __simple__.
- Utilize __chaining__.
- Emit __modular__ output.
- Make sure they're __stateless__.
- Employ __loader utilities__.
- Mark __loader dependencies__.
- Resolve __module dependencies__.
- Extract __common code__.
- Avoid __absolute paths__.
- Use __peer dependencies__.

### Simple

Loaders should do only a single task. This not only makes the job of maintaining each loader easier, but also allows them to be chained for usage in more scenarios.

### Chaining

Take advantage of the fact that loaders can be chained together. Instead of writing a single loader that tackles five tasks, write five simpler loaders that divide this effort. Isolating them not only keeps each individual loader simple, but may allow for them to be used for something you hadn't thought of originally.

Take the case of rendering a template file with data specified via loader options or query parameters. It could be written as a single loader that compiles the template from source, executes it and returns a module that exports a string containing the HTML code. However, in accordance with guidelines, a simple `apply-loader` exists that can be chained with other open source loaders:

- `jade-loader`: Convert template to a module that exports a function.
- `apply-loader`: Executes the function with loader options and returns raw HTML.
- `html-loader`: Accepts HTML and outputs a valid JavaScript module.

T> The fact that loaders can be chained also means they don't necessarily have to output JavaScript. As long as the next loader in the chain can handle its output, the loader can return any type of module.

### Modular

Keep the output modular. Loader generated modules should respect the same design principles as normal modules.

### Stateless

Make sure the loader does not retain state between module transformations. Each run should always be independent of other compiled modules as well as previous compilations of the same module.

### Loader Utilities

Take advantage of the [`loader-utils`](https://github.com/webpack/loader-utils) package. It provides a variety of useful tools but one of the most common is retrieving the options passed to the loader. Along with `loader-utils`, the [`schema-utils`](https://github.com/webpack-contrib/schema-utils) package should be used for consistent JSON Schema based validation of loader options. Here's a brief example that utilizes both:

__loader.js__

```js
import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
};

export default function(source) {
  const options = getOptions(this);

  validateOptions(schema, options, 'Example Loader');

  // Apply some transformations to the source...

  return `export default ${ JSON.stringify(source) }`;
}
```

### Loader Dependencies

If a loader uses external resources (i.e. by reading from filesystem), they __must__ indicate it. This information is used to invalidate cacheable loaders and recompile in watch mode. Here's a brief example of how to accomplish this using the `addDependency` method:

__loader.js__

```js
import path from 'path';

export default function(source) {
  var callback = this.async();
  var headerPath = path.resolve('header.js');

  this.addDependency(headerPath);

  fs.readFile(headerPath, 'utf-8', function(err, header) {
    if(err) return callback(err);
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

T> If the language only accepts relative urls (e.g. `url(file)` always refers to `./file`), you can use the `~` convention to specify references to installed modules (e.g. those in `node_modules`). So, in the case of `url`, that would look something like `url('~some-library/image.jpg')`.

### Common Code

Avoid generating common code in every module the loader processes. Instead, create a runtime file in the loader and generate a `require` to that shared module.

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

So you've written a loader, followed the guidelines above, and have it set up to run locally. What's next? Let's go through a simple unit testing example to ensure our loader is working the way we expect. We'll be using the [Jest](https://facebook.github.io/jest/) framework to do this. We'll also install `babel-jest` and some presets that will allow us to use the `import` / `export` and `async` / `await`. Let's start by installing and saving these as a `devDependencies`:

``` bash
npm install --save-dev jest babel-jest babel-preset-env
```

__.babelrc__

```json
{
  "presets": [[
    "env",
    {
      "targets": {
        "node": "4"
      }
    }
  ]]
}
```

Our loader will process `.txt` files and simply replace any instance of `[name]` with the `name` option given to the loader. Then it will output a valid JavaScript module containing the text as it's default export:

__src/loader.js__

```js
import { getOptions } from 'loader-utils';

export default function loader(source) {
  const options = getOptions(this);

  source = source.replace(/\[name\]/g, options.name);

  return `export default ${ JSON.stringify(source) }`;
}
```

We'll use this loader to process the following file:

__test/example.txt__

``` text
Hey [name]!
```

Pay close attention to this next step as we'll be using the [Node.js API](/api/node) and [`memory-fs`](https://github.com/webpack/memory-fs) to execute webpack. This lets us avoid emitting `output` to disk and will give us access to the `stats` data which we can use to grab our transformed module:

``` bash
npm install --save-dev webpack memory-fs
```

__test/compiler.js__

```js
import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, '../src/loader.js'),
          options: {
            name: 'Alice'
          }
        }
      }]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) reject(err);

      resolve(stats);
    });
  });
};
```

T> In this case, we've inlined our webpack configuration but you can also accept a configuration as a parameter to the exported function. This would allow you to test multiple setups using the same compiler module.

And now, finally, we can write our test and add an npm script to run it:

__test/loader.test.js__

```js
import compiler from './compiler.js';

test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('example.txt');
  const output = stats.toJson().modules[0].source;

  expect(output).toBe('export default "Hey Alice!\\n"');
});
```

__package.json__

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

With everything in place, we can run it and see if our new loader passes the test:

``` bash
 PASS  test/loader.test.js
  ✓ Inserts name and outputs JavaScript (229ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.853s, estimated 2s
Ran all test suites.
```

It worked! At this point you should be ready to start developing, testing, and deploying your own loaders. We hope that you'll share your creations with the rest of the community!


# Writing a Plugin

Plugins expose the full potential of the webpack engine to third-party developers. Using staged build callbacks, developers can introduce their own behaviors into the webpack build process. Building plugins is a bit more advanced than building loaders, because you'll need to understand some of the webpack low-level internals to hook into them. Be prepared to read some source code!

## Creating a Plugin

A plugin for webpack consists of

- A named JavaScript function.
- Defines `apply` method in its prototype.
- Specifies an [event hook](/api/compiler-hooks/) to tap into.
- Manipulates webpack internal instance specific data.
- Invokes webpack provided callback after functionality is complete.

```javascript
// A JavaScript class.
class MyExampleWebpackPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        console.log('This is an example plugin!');
        console.log('Here’s the `compilation` object which represents a single build of assets:', compilation);

        // Manipulate the build using the plugin API provided by webpack
        compilation.addModule(/* ... */);

        callback();
      }
    );
  }
}
```

## Basic plugin architecture

Plugins are instantiated objects with an `apply` method on their prototype. This `apply` method is called once by the webpack compiler while installing the plugin. The `apply` method is given a reference to the underlying webpack compiler, which grants access to compiler callbacks. A simple plugin is structured as follows:

```javascript
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      console.log('Hello World!');
    });
  }
}

module.exports = HelloWorldPlugin;
```

Then to use the plugin, include an instance in your webpack config `plugins` array:

```javascript
// webpack.config.js
var HelloWorldPlugin = require('hello-world');

module.exports = {
  // ... config settings here ...
  plugins: [new HelloWorldPlugin({ options: true })]
};
```

## Compiler and Compilation

Among the two most important resources while developing plugins are the `compiler` and `compilation` objects. Understanding their roles is an important first step in extending the webpack engine.

```javascript
class HelloCompilationPlugin {
  apply(compiler) {
    // Tap into compilation hook which gives compilation as argument to the callback function
    compiler.hooks.compilation.tap('HelloCompilationPlugin', compilation => {
      // Now we can tap into various hooks available through compilation
      compilation.hooks.optimize.tap('HelloCompilationPlugin', () => {
        console.log('Assets are being optimized.');
      });
    });
  }
}

module.exports = HelloCompilationPlugin;
```

The list of hooks available on the `compiler`, `compilation`, and other important objects, see the [plugins API](/api/plugins/) docs.

## Async event hooks

Some plugin hooks are asynchronous. To tap into them, we can use `tap` method which will behave in synchronous manner or use one of `tapAsync` method or `tapPromise` method which are asynchronous methods.

### tapAsync

When we use `tapAsync` method to tap into plugins, we need to call the callback function which is supplied as the last argument to our function.

```javascript
class HelloAsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('HelloAsyncPlugin', (compilation, callback) => {
      // Do something async...
      setTimeout(function() {
        console.log('Done with async work...');
        callback();
      }, 1000);
    });
  }
}

module.exports = HelloAsyncPlugin;
```

#### tapPromise

When we use `tapPromise` method to tap into plugins, we need to return a promise which resolves when our asynchronous task is completed.

```javascript
class HelloAsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapPromise('HelloAsyncPlugin', compilation => {
      // return a Promise that resolves when we are done...
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          console.log('Done with async work...');
          resolve();
        }, 1000);
      });
    });
  }
}

module.exports = HelloAsyncPlugin;
```

## Example

Once we can latch onto the webpack compiler and each individual compilations, the possibilities become endless for what we can do with the engine itself. We can reformat existing files, create derivative files, or fabricate entirely new assets.

Let's write a simple example plugin that generates a new build file called `filelist.md`; the contents of which will list all of the asset files in our build. This plugin might look something like this:

```javascript
class FileListPlugin {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      // Create a header string for the generated file:
      var filelist = 'In this build:\n\n';

      // Loop through all compiled assets,
      // adding a new line item for each filename.
      for (var filename in compilation.assets) {
        filelist += '- ' + filename + '\n';
      }

      // Insert this list into the webpack build as a new file asset:
      compilation.assets['filelist.md'] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        }
      };

      callback();
    });
  }
}

module.exports = FileListPlugin;
```

## Different Plugin Shapes

A plugin can be classified into types based on the event hooks it taps into. Every event hook is pre-defined as synchronous or asynchronous or waterfall or parallel hook and hook is called internally using call/callAsync method. The list of hooks that are supported or can be tapped into are generally specified in this.hooks property.

For example:-

```javascript
this.hooks = {
  shouldEmit: new SyncBailHook(['compilation'])
};
```

It represents that the only hook supported is `shouldEmit` which is a hook of `SyncBailHook` type and the only parameter which will be passed to any plugin that taps into `shouldEmit` hook is `compilation`.

Various types of hooks supported are :-

### Synchronous Hooks

- __SyncHook__

    - Defined as `new SyncHook([params])`
    - Tapped into using `tap` method.
    - Called using `call(...params)` method.

- __Bail Hooks__

    - Defined using `SyncBailHook[params]`
    - Tapped into using `tap` method.
    - Called using `call(...params)` method.

  In these type of hooks, each of the plugin callbacks will be invoked one after the other with the specific `args`. If any value is returned except undefined by any plugin, then that value is returned by hook and no further plugin callback is invoked. Many useful events like `optimizeChunks`, `optimizeChunkModules` are SyncBailHooks.

- __Waterfall Hooks__

    - Defined using `SyncWaterfallHook[params]`
    - Tapped into using `tap` method.
    - Called using `call( ... params)` method

  Here each of the plugins are called one after the other with the arguments from the return value of the previous plugin. The plugin must take the order of its execution into account.
  It must accept arguments from the previous plugin that was executed. The value for the first plugin is `init`. Hence at least 1 param must be supplied for waterfall hooks. This pattern is used in the Tapable instances which are related to the webpack templates like `ModuleTemplate`, `ChunkTemplate` etc.

### Asynchronous Hooks

- __Async Series Hook__

    - Defined using `AsyncSeriesHook[params]`
    - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
    - Called using `callAsync( ... params)` method

  The plugin handler functions are called with all arguments and a callback function with the signature `(err?: Error) -> void`. The handler functions are called in order of registration. `callback` is called after all the handlers are called.
  This is also a commonly used pattern for events like `emit`, `run`.

- __Async waterfall__ The plugins will be applied asynchronously in the waterfall manner.

    - Defined using `AsyncWaterfallHook[params]`
    - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
    - Called using `callAsync( ... params)` method

  The plugin handler functions are called with the current value and a callback function with the signature `(err: Error, nextValue: any) -> void.` When called `nextValue` is the current value for the next handler. The current value for the first handler is `init`. After all handlers are applied, callback is called with the last value. If any handler passes a value for `err`, the callback is called with this error and no more handlers are called.
  This plugin pattern is expected for events like `before-resolve` and `after-resolve`.

- __Async Series Bail__

    - Defined using `AsyncSeriesBailHook[params]`
    - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
    - Called using `callAsync( ... params)` method

  someMethod() {
  // Call a hook:
  this.hooks.compilation.call();

- __Async Parallel__

    - Defined using `AsyncParallelHook[params]`
    - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
    - Called using `callAsync( ... params)` method

- __Async Series Bail__

    - Defined using `AsyncSeriesBailHook[params]`
    - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
    - Called using `callAsync( ... params)` method


# Plugin Patterns

Plugins grant unlimited opportunity to perform customizations within the webpack build system. This allows you to create custom asset types, perform unique build modifications, or even enhance the webpack runtime while using middleware. The following are some features of webpack that become useful while writing plugins.

## Exploring assets, chunks, modules, and dependencies

After a compilation is sealed, all structures within the compilation may be traversed.

```javascript
class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      // Explore each chunk (build output):
      compilation.chunks.forEach(chunk => {
        // Explore each module within the chunk (built inputs):
        chunk.modules.forEach(module => {
          // Explore each source file path that was included into the module:
          module.fileDependencies.forEach(filepath => {
            // we've learned a lot about the source structure now...
          });
        });

        // Explore each asset filename generated by the chunk:
        chunk.files.forEach(filename => {
          // Get the asset source for each file generated by the chunk:
          var source = compilation.assets[filename].source();
        });
      });

      callback();
    });
  }
}
module.exports = MyPlugin;
```

- `compilation.modules`: An array of modules (built inputs) in the compilation. Each module manages the build of a raw file from your source library.
- `module.fileDependencies`: An array of source file paths included into a module. This includes the source JavaScript file itself (ex: `index.js`), and all dependency asset files (stylesheets, images, etc) that it has required. Reviewing dependencies is useful for seeing what source files belong to a module.
- `compilation.chunks`: An array of chunks (build outputs) in the compilation. Each chunk manages the composition of a final rendered assets.
- `chunk.modules`: An array of modules that are included into a chunk. By extension, you may look through each module's dependencies to see what raw source files fed into a chunk.
- `chunk.files`: An array of output filenames generated by the chunk. You may access these asset sources from the `compilation.assets` table.

### Monitoring the watch graph

While running webpack middleware, each compilation includes a `fileDependencies` array (what files are being watched) and a `fileTimestamps` hash that maps watched file paths to a timestamp. These are extremely useful for detecting what files have changed within the compilation:

```javascript
class MyPlugin {
  constructor() {
    this.startTime = Date.now();
    this.prevTimestamps = {};
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      var changedFiles = Object.keys(compilation.fileTimestamps).filter(
        watchfile => {
          return (
            (this.prevTimestamps[watchfile] || this.startTime) <
            (compilation.fileTimestamps[watchfile] || Infinity)
          );
        }
      );

      this.prevTimestamps = compilation.fileTimestamps;
      callback();
    });
  }
}

module.exports = MyPlugin;
```

You may also feed new file paths into the watch graph to receive compilation triggers when those files change. Simply push valid file paths into the `compilation.fileDependencies` array to add them to the watch. Note: the `fileDependencies` array is rebuilt in each compilation, so your plugin must push its own watched dependencies into each compilation to keep them under watch.

## Changed chunks

Similar to the watch graph, it's fairly simple to monitor changed chunks (or modules, for that matter) within a compilation by tracking their hashes.

```javascript
class MyPlugin {
  constructor() {
    this.chunkVersions = {};
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      var changedChunks = compilation.chunks.filter(chunk => {
        var oldVersion = this.chunkVersions[chunk.name];
        this.chunkVersions[chunk.name] = chunk.hash;
        return chunk.hash !== oldVersion;
      });
      callback();
    });
  }
}

module.exports = MyPlugin;
```


# Release Process

The release process for deploying webpack is actually quite painless. Read through the following steps, so you have a clear understanding of how it's done.


## Pull Requests

When merging pull requests into the `master` branch, select the _Create Merge Commit_ option.


## Releasing

```sh
npm version patch && git push --follow-tags && npm publish
npm version minor && git push --follow-tags && npm publish
npm version major && git push --follow-tags && npm publish
```

_This will increment the package version, commits the changes, cuts a __local tag__, push to github & publish the npm package._

After that go to the github [releases page](https://github.com/webpack/webpack/releases) and write a Changelog for the new tag.


# Debugging

When contributing to the core repo, writing a loader/plugin, or even just working on complex project, debugging tools can be central to your workflow. Whether the problem is slow performance on a large project or an unhelpful traceback, the following utilities can make figuring it out less painful.

- The [`stats` data](/api/stats) made available through [Node](/api/node#stats-object) and the [CLI](/api/cli#common-options).
- Chrome __DevTools__ via `node-nightly` and the latest Node.js versions.


## Stats

Whether you want to sift through [this data](/api/stats) manually or use a tool to process it, the `stats` data can be extremely useful when debugging build issues. We won't go in depth here as there's an [entire page](/api/stats) dedicated to its contents, but know that you can use it to find the following information:

- The contents of every module.
- The modules contained within every chunk.
- Per module compilation and resolving stats.
- Build errors and warnings.
- The relationships between modules.
- And much more...

On top of that, the official [analyze tool](https://github.com/webpack/analyse) and [various others](/guides/code-splitting#bundle-analysis) will accept this data and visualize it in various ways.


## DevTools

While [`console`](https://nodejs.org/api/console.html) statements may work well in simpler scenarios, sometimes a more robust solution is needed. As most front-end developers already know, Chrome DevTools are a life saver when debugging web applications, _but they don’t have to stop there_. As of Node v6.3.0+, developers can use the built-in `--inspect` flag to debug a node program in DevTools.

This gives you the power to easily create breakpoints, debug memory usage, expose and examine objects in the console, and much more. In this short demo, we'll utilize the [`node-nightly`](https://github.com/hemanth/node-nightly) package which provides access to the latest and greatest inspecting capabilities.

W> The `--inspect` interface has been available since v6.3.0 so feel to try it out with your local version, but be warned that certain features and flags may differ from the ones in this demo.

Let's start by installing it globally:

``` bash
npm install --global node-nightly
```

Now, we'll need to run it once to finish the installation:

``` bash
node-nightly
```

Now, we can simply use `node-nightly` along with the `--inspect` flag to start our build in any webpack-based project. Note that we cannot run NPM `scripts`, e.g. `npm run build`, so we'll have specify the full `node_modules` path:

``` bash
node-nightly --inspect ./node_modules/webpack/bin/webpack.js
```

Which should output something like:

``` bash
Debugger listening on ws://127.0.0.1:9229/c624201a-250f-416e-a018-300bbec7be2c
For help see https://nodejs.org/en/docs/inspector
```

Now jump to `chrome://inspect` in the browser and you should see any active scripts you've inspected under the _Remote Target_ header. Click the "inspect" link under each script to open a dedicated debugger or the _Open dedicated DevTools for Node_ link for a session that will connect automatically. You can also check out the [NiM extension](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj), a handy Chrome plugin that will automatically open a DevTools tab every time you `--inspect` a script.

We recommend using the `--inspect-brk` flag which will break on the first statement of the script allowing you to go through the source to set breakpoints and start/stop the build as you please. Also, don't forget that you can still pass arguments to the script. For example, if you have multiple configuration files you could pass `--config webpack.prod.js` to specify the configuration you'd like to debug.
