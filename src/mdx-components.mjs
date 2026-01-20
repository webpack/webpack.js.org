import Badge from "./components/Badge/Badge.jsx";
import CodeBlockWithCopy from "./components/CodeBlockWithCopy/CodeBlockWithCopy.jsx";
import StackBlitzPreview from "./components/StackBlitzPreview/StackBlitzPreview.jsx";
import LinkComponent from "./components/mdxComponents/Link.jsx";

/** @returns {import('mdx/types.js').MDXComponents} */
export function useMDXComponents() {
  return {
    a: LinkComponent,
    Badge,
    StackBlitzPreview,
    pre: CodeBlockWithCopy,
  };
}
