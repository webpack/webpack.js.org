import Badge from './components/Badge/Badge';
import LinkComponent from './components/mdxComponents/Link';
import StackBlitzPreview from './components/StackBlitzPreview/StackBlitzPreview';

/** @returns {import('mdx/types.js').MDXComponents} */
export function useMDXComponents() {
  return {
    a: LinkComponent,
    Badge: Badge,
    StackBlitzPreview: StackBlitzPreview,
  };
}
