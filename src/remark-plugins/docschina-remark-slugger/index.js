'use strict';

var toString = require('mdast-util-to-string');
var visit = require('unist-util-visit');
var slugs = require('github-slugger')();

module.exports = slug;

function slug() {
  return transformer;
}

// Patch slugs on heading nodes.
function transformer(ast) {
  slugs.reset();

  visit(ast, 'heading', visitor);

  function visitor(node) {
    var data = node.data || (node.data = {});
    var props = data.hProperties || (data.hProperties = {});
    var id = props.id;

    var rawHeader = id ? id : toString(node);
    var match = /^.+(\s*\$#([a-z0-9\-_]+?)\$\s*)$/.exec(rawHeader);
    id = match ? match[2] : slugs.slug(rawHeader, true);

    if (match) {
      // Remove the custom ID part from the text node.
      var lastNode = node.children[node.children.length - 1];
      lastNode.value = lastNode.value.replace(match[1], '');
    }
    data.id = id;
    props.id = id;
  }
}
