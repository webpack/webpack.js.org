/**
 * Find the minimum level in the anchors
 */
module.exports = function findTopLevel(anchors = []) {
  if (anchors.length === 0) return;
  let result = 99;
  for (const anchor of anchors) {
    if (anchor.level < result) {
      result = anchor.level;
    }
  }
  return result;
};
