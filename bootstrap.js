const antwar = require('antwar');

const environment = process.env.npm_lifecycle_event || 'build';

// Patch Babel env to make HMR switch work
process.env.BABEL_ENV = environment;

antwar[environment]({
  environment,
  antwar: require('./antwar.config'),
  webpack: function () {
    return require('./webpack.config')(environment)
  }
}).catch(function (err) {
  console.error(err);

  process.exit(1);
});
