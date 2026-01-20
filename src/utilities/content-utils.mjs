/**
 * Walk the given tree of content
 *
 * @param {object}   tree     - Any node in the content tree
 * @param {function} callback - Run on every descendant as well as the given `tree`
 */
export const walkContent = (tree, callback) => {
  callback(tree);

  if (tree.children) {
    for (const child of tree.children) {
      walkContent(child, callback);
    }
  }
};

/**
 * Deep flatten the given `tree`s child nodes
 *
 * @param  {object} tree - Any node in the content tree
 * @return {array}       - A flattened list of leaf node descendants
 */
export const flattenContent = (tree) => {
  if (tree.children) {
    return tree.children.reduce(
      (flat, item) => [
        ...flat,
        ...(Array.isArray(item.children) ? flattenContent(item) : [item]),
      ],
      [],
    );
  }
  return [];
};

/**
 * Find an item within the given `tree`
 *
 * @param  {object}   tree - Any node in the content tree
 * @param  {function} test - A callback to find any leaf node in the given `tree`
 * @return {object}        - The first leaf node that passes the `test`
 */
export const findInContent = (tree, test) => {
  const list = flattenContent(tree);

  return list.find(test);
};

/**
 * Get top-level sections
 *
 * @param  {object} tree - Any node in the content tree
 * @return {array}       - Immediate children of the given `tree` that are directories
 */
export const extractSections = (tree) =>
  tree.children.filter((item) => item.type === "directory");

/**
 * Get all markdown pages
 *
 * @param  {object} tree - Any node in the content tree
 * @return {array}       - All markdown descendants of the given `tree`
 */
export const extractPages = (tree) =>
  flattenContent(tree).filter(
    (item) => item.extension === ".md" || item.extension === ".mdx",
  );

/**
 * Retrieve the page title from the given `tree` based on the given `path`
 *
 * @param  {object} tree - Any node in the content tree
 * @param  {string} path - The pathname (aka route) for which to find a title
 * @return {string}      - The title specified by that page or a fallback
 */
export const getPageTitle = (tree, path) => {
  const page = findInContent(tree, (item) => item.url === path);

  // non page found
  if (!page) return "webpack";

  if (page) {
    if (path.includes("/printable")) {
      return "Combined printable page | webpack";
    }
    if (path === "/") return page.title || "webpack";
    return `${page.title} | webpack`;
  }
};

export const getPageDescription = (tree, path) => {
  const page = findInContent(tree, (item) => item.url === path);
  if (!page) return undefined;
  if (path.includes("/printable")) return "";

  return page.description || "";
};
