/**
 * Walk the given tree of content
 *
 * @param {object}   tree     - Any node in the content tree
 * @param {function} callback - Run on every descendant as well as the given `tree`
 */
export const WalkContent = (tree, callback) => {
  callback(tree);

  if ( tree.children ) {
    tree.children.forEach(child => {
      WalkContent(child, callback);
    });
  }
};

/**
 * Deep flatten the given `tree`s child nodes
 *
 * @param  {object} tree - Any node in the content tree
 * @return {array}       - A flattened list of leaf node descendants
 */
export const FlattenContent = tree => {
  if ( tree.children ) {
    return tree.children.reduce((flat, item) => {
      return flat.concat(
        Array.isArray(item.children) ? FlattenContent(item) : item
      );
    }, []);

  } else return [];
};

/**
 * Find an item within the given `tree`
 *
 * @param  {object}   tree - Any node in the content tree
 * @param  {function} test - A callback to find any leaf node in the given `tree`
 * @return {object}        - The first leaf node that passes the `test`
 */
export const FindInContent = (tree, test) => {
  let list = FlattenContent(tree);

  return list.find(test);
};

/**
 * Get top-level sections
 *
 * @param  {object} tree - Any node in the content tree
 * @return {array}       - Immediate children of the given `tree` that are directories
 */
export const ExtractSections = tree => {
  return tree.children.filter(item => item.type === 'directory');
};

/**
 * Get all markdown pages
 *
 * @param  {object} tree - Any node in the content tree
 * @return {array}       - All markdown descendants of the given `tree`
 */
export const ExtractPages = tree => {
  return FlattenContent(tree).filter(item => item.extension === '.md');
};
