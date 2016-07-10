'use strict';

var marked = require('marked');

module.exports = function(markdown) {
    this.cacheable();

    return marked(markdown);
};
