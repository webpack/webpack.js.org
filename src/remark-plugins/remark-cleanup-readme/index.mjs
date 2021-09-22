import { visit } from 'unist-util-visit';
// remove items other than paragraphs in div[align="center"]
// e.g., logo, title and so on.
// see the original version at https://github.com/webpack/webpack.js.org/blob/webpack-4/src/utilities/process-readme.js#L71
export default function remarkCleanupReadme() {
  return function transformer(tree) {
    visit(tree, 'mdxJsxFlowElement', visitor);
    function visitor(node) {
      const alignAttribute = node.attributes.find(
        (attribute) =>
          attribute.name === 'align' && attribute.value === 'center'
      );
      if (alignAttribute) {
        const paragraphs = node.children.filter(
          (child) =>
            child.type === 'paragraph' ||
            (child.type === 'mdxJsxFlowElement' && child.name === 'p')
        );
        node.children = paragraphs;
      }
    }
  };
}
