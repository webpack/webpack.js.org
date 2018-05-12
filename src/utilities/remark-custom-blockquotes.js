const visit = require('unist-util-visit');

module.exports = function customBlockquotes(options) {
  let { mapping } = options
  let quotes = Object.keys(mapping);

  return function transformer(tree, file) {
    visit(tree, 'paragraph', visitor);

    function visitor(node) {
      const { children } = node;
      const textNode = children[0].value;

      if ( !textNode ) return;

      const className = mapping[textNode.substr(0, 2)]

      if ( className ) {
        node.type = 'blockquote';
        node.data = {
          hName: 'blockquote',
          hProperties: {
            className
          }
        };

        node.children = [
          {
            type: 'paragraph',
            children: [
              {
                ...children[0],
                value: children[0].value.slice(3)
              },
              ...children.slice(1)
            ]
          }
        ];
      }
    }
  }
}
