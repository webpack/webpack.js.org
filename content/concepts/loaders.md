---
title: Loaders
sort: 2
contributors:
  - manekinekko
---

## What are loaders?

Loaders are transformations that are applied on a resource file of your application. They are functions (running in Node.js) that take the source of a resource file as the parameter and return the new source.

For example, you can use loaders to tell webpack to load TypeScript or JSX.

### Loader features

* Loaders can be chained. They are applied in a pipeline to the resource. The final loader is expected to return JavaScript; each other loader can return source in arbitrary format, which is passed to the next loader.
* Loaders can be synchronous or asynchronous.
* Loaders run in Node.js and can do everything that's possible there.
* Loaders accept query parameters. This can be used to pass configuration to the loader.
* Loaders can be bound to extensions / RegExps in the configuration.
* Loaders can be published / installed through `npm`.
* Normal modules can export a loader in addition to the normal `main` via `package.json` `loader`.
* Loaders can access the configuration.
* Plugins can give loaders more features.
* Loaders can emit additional arbitrary files.

If you are interested in some loader examples head off to the [list of loaders](./).

## Resolving loaders

Loaders are [[resolved similar to modules | resolving]]. A loader module is expected to export a function and to be written in node.js compatible JavaScript. In the common case you manage loaders with npm, but you can also have loaders as files in your app.

### Referencing loaders

By convention, though not required, loaders are usually named as `XXX-loader`, where `XXX` is the context name. For example, `json-loader`.

You may reference loaders by its full (actual) name (e.g. `json-loader`), or by its shorthand name (e.g. `json`).

The loader name convention and precedence search order is defined by [`resolveLoader.moduleTemplates`](http://webpack.github.io/docs/configuration.html#resolveloader-moduletemplates) within the webpack configuration API.

Loader name conventions may be useful, especially when referencing them within `require()` statements; see usage below.

### Installing loaders

If the loader is available on npm you can install the loader via:

```sh
$ npm install xxx-loader --save
```

or

```sh
$ npm install xxx-loader --save-dev
```
## Usage

There are multiple ways to use loaders in your app:

* explicit in the `require` statement
* configured via configuration
* configured via CLI

### loaders in `require`

> **Note:** Avoid using this, if at all possible, if you intend your scripts to be environment agnostic (node.js and browser). Use the *configuration* convention for specifying loaders (see next section).

It's possible to specify the loaders in the `require` statement (or `define`, `require.ensure`, etc.). Just separate loaders from resource with `!`. Each part is resolved relative to the current directory.

It's possible to overwrite any loaders in the configuration by prefixing the entire rule with `!`.

**some-node-script.js**

```javascript
require("./loader!./dir/file.txt");
// => uses the file "loader.js" in the current directory to transform
//    "file.txt" in the folder "dir".

require("jade!./template.jade");
// => uses the "jade-loader" (that is installed from npm to "node_modules")
//    to transform the file "template.jade"
//    If configuration has some transforms bound to the file, they will still be applied.

require("!style!css!less!bootstrap/less/bootstrap.less");
// => the file "bootstrap.less" in the folder "less" in the "bootstrap"
//    module (that is installed from github to "node_modules") is
//    transformed by the "less-loader". The result is transformed by the
//    "css-loader" and then by the "style-loader".
//    If configuration has some transforms bound to the file, they will not be applied.
```


### Configuration

You can bind loaders to a RegExp via [configuration](./configuration):

**webpack.config.js**

```javascript
{
	module: {
		rules: [
			{ test: /\.jade$/, loader: "jade" },
			// => "jade" loader is used for ".jade" files

			{ test: /\.css$/, loader: "style!css" },
			// => "style" and "css" loader is used for ".css" files
			// Alternative syntax:
			{ test: /\.css$/, use: ["style", "css"] },
		]
	}
}
```

### CLI

You can bind loaders to an extension via [CLI](./cli):

```sh
$ webpack --module-bind jade --module-bind 'css=style!css'
```

This uses the loader "jade" for ".jade" files and the loaders "style" and "css" for ".css" files.

### Query parameters

Loader can be passed query parameters via a query string (just like in the web). The query string is appended to the loader with `?`. i.e. `url-loader?mimetype=image/png`.

Note: The format of the query string is up to the loader. See format in the loader documentation. Most loaders accept parameters in the normal query format (`?key=value&key2=value2`) and as JSON object (`?{"key":"value","key2":"value2"}`).

#### in `require`

```javascript
require("url-loader?mimetype=image/png!./file.png");
```

#### Configuration

**webpack.config.js**

```javascript
{ test: /\.png$/, loader: "url-loader?mimetype=image/png" }
```

or

**webpack.config.js**

```javascript
{
	test: /\.png$/,
	loader: "url-loader",
	query: { mimetype: "image/png" }
}
```


#### CLI

```sh
webpack --module-bind "png=url-loader?mimetype=image/png"
```
