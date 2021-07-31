/**
 * based on https://github.com/montogeek/remark-custom-blockquotes
 */

import { visit } from 'unist-util-visit';
module.exports = function customAsides(
  options = {
    mapping: {},
  }
) {
  const { mapping } = options;
  return function transformer(tree) {
    // looking for `paragraph` node
    visit(tree, 'paragraph', visitor);
    function visitor(node) {
      const { children } = node;
      const textNode = children[0].value;

      // could be link/etc.
      if (!textNode) return;

      // looking for mapping in the beginning
      const className = mapping[textNode.substr(0, 2)];
      // >This is a joke <- ignore this
      // >T hi there
      const hasPostfixWhitespace = textNode.indexOf(' ') === 2;
      if (className && hasPostfixWhitespace) {
        // use `aside` element instead of `blockquote`
        // which I believe is more suitable as per https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
        node.data = {
          hName: 'aside',
          hProperties: {
            className,
          },
        };

        // remove custom characters from paragraph
        node.children = [
          {
            type: 'heading',
            depth: 6,
            data: {
              // see https://github.com/syntax-tree/mdast-util-to-hast#hname
              // add a className to heading
              hProperties: {
                className: `${className}__prefix`,
              },
            },
            children: [
              {
                type: 'text',
                value: `${className}`,
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                ...children[0],
                value: children[0].value.slice(3),
              },
              ...children.slice(1),
            ],
          },
        ];
      }
    }
  };
};
