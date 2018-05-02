/**
 * Walk the given tree of content
 *
 * @param {object}   tree     - ...
 * @param {function} callback - ...
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
 * @param  {object} tree - ...
 * @return {array}       - ...
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
 * @param  {object}   tree - ...
 * @param  {function} test - ...
 * @return {object}        - ...
 */
export const FindInContent = (tree, test) => {
  let list = FlattenContent(tree);

  return list.find(test);
};
