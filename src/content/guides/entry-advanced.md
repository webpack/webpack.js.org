---
title: Advanced entry
sort: 25
contributors:
  - EugeneHlushko
---

## Multiple file types per entry

It is possible to provide different types of files when using an array of values for [entry](/configuration/entry-context/#entry) to achieve separate bundles for CSS and JavaScript (and other) files in applications that are not using `import` for styles in JavaScript (pre Single Page Applications or different reasons).

Let's make an example. We have a PHP application with two page types: home and account. The home page has different layout and non-sharable JavaScript with the rest of the application (account page). We want to output `home.js` and `home.css` from our application files for the home page and `account.js` and `account.css` for account page.

First let's create a directory, initialize npm, [install webpack locally](/guides/installation/#local-installation), and install these dependencies:

``` bash
npm install --save-dev style-loader css-loader sass-loader sass webpack mini-css-extract-plugin
```

Now we'll create the following files and their contents:

__home.js__

```javascript
console.log('home page type');
```

__home.scss__

```scss
// home page individual styles
```

__account.js__

```javascript
console.log('account page type');
```

__account.scss__

```scss
// account page individual styles
```

We will use [`MiniCssExtractPlugin`](/plugins/mini-css-extract-plugin/) in `production` mode for css as a best practice.

__webpack.config.js__

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: ['./home.js', './home.scss'],
    account: ['./account.js', './account.scss'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
```

Running webpack with above configuration, this run on windows system.

```bash
set NODE_ENV=production

npx webpack
```

will output into `./dist` as we did not specify different output path. `./dist` directory will now contain four files:

- home.js
- home.css
- account.js
- account.css
