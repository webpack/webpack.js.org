import Badge from './components/Badge/Badge';
import LinkComponent from './components/mdxComponents/Link';
import StackBlitzPreview from './components/StackBlitzPreview/StackBlitzPreview';
import CodeBlock from './components/CodeBlock/CodeBlock';

/** @returns {import('mdx/types.js').MDXComponents} */
export function useMDXComponents() {
  return {
    a: LinkComponent,
    Badge: Badge,
    StackBlitzPreview: StackBlitzPreview,
    pre: CodeBlock,
  };
}
