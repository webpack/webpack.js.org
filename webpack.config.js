// Use Babel to transpile all future requires
require('babel-register');

// Transpile and export the dev configuration
module.exports = require('./config/dev-config.js').default;
