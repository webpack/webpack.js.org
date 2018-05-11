var remark = require('remark');
var slug = require('remark-slug');
var visit = require('unist-util-visit');

module.exports = function getAnchors(content) {
  let anchors = [];

  remark()
    .use(slug)
    .use(pl)
    .process(content, (err, file) => {
      if (err) {
        throw err;
      }
    });

  function pl() {
    return function transformer(ast) {
      visit(ast, 'heading', visitor);
    };

    function visitor(node) {
      anchors.push({
        title: node.children[0].value,
        id: node.data.id
      });
    }
  }

  return anchors;
};
