import { visit } from "unist-util-visit";

export default function remarkRemoveHeadingId() {
  return function transformer(ast) {
    function visitor(node) {
      if (node.data && node.data.id) {
        delete node.data.id;
      }
      if (node.data && node.data.hProperties && node.data.hProperties.id) {
        delete node.data.hProperties.id;
      }
    }

    visit(ast, "heading", visitor);
  };
}
