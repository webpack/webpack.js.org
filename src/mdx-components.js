import Badge from './components/Badge/Badge';
import LinkComponent from './components/mdxComponents/Link';
import StackBlitzPreview from './components/StackBlitzPreview/StackBlitzPreview';
import CodeBlockWithCopy from './components/CodeBlockWithCopy/CodeBlockWithCopy';

/** @returns {import('mdx/types.js').MDXComponents} */
export function useMDXComponents() {
  return {
    a: LinkComponent,
    Badge: Badge,
    StackBlitzPreview: StackBlitzPreview,
    pre: CodeBlockWithCopy,
  };
}
