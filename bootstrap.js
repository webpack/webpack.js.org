const antwar = require('antwar');
const webpack = require('./webpack.config');
const configuration = require('./antwar.config');

// Patch Babel env to make HMR switch work
process.env.BABEL_ENV = process.env.npm_lifecycle_event;

antwar({
  configuration,
  environment: process.env.npm_lifecycle_event,
  webpack
}).catch(function (err) {
  console.error(err);
});
