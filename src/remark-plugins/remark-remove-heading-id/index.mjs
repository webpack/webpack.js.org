import { visit } from 'unist-util-visit';
export default function () {
  return function transformer(ast) {
    visit(ast, 'heading', visitor);
  };
  function visitor(node) {
    if (node.data && node.data.id) {
      delete node.data.id;
    }
    if (node.data && node.data.hProperties && node.data.hProperties.id) {
      delete node.data.hProperties.id;
    }
  }
}
