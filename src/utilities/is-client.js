// Guard against ReferenceError in non-browser/SSR environments
// and use a consistent ESM default export.
const isClient =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export default isClient;
