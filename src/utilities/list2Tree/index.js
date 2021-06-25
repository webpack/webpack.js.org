const findTopLevel = require('./findTopLevel');
/**
 *
 * @param {.map(anchor => ({
      ...anchor,
      menuTitle: anchor.title.replace(new RegExp(`${title}.`, 'i'), '')
    }))} anchors
 * @param {*} topLevel
 */
/**
 * @param {string} parent the parent menu text for anchors
 * @param {*} anchors a list of ordered anchors in the page
 * @param {number} topLevel the root level in anchor
 */
function list2Tree(parent, anchors, topLevel = findTopLevel(anchors)) {
  if (anchors.length === 0) return [];
  if (anchors.length > 0) {
    const cache = [];
    anchors.forEach((anchor) => {
      if (anchor.level === topLevel) {
        cache.push([anchor]);
      } else {
        cache[cache.length - 1].push(anchor);
      }
    });
    return cache.map((c) => {
      if (c.length > 1) {
        const [hd, ...others] = c;
        return {
          ...hd,
          title2: hd.title.replace(new RegExp(`${parent}\\.`, 'i'), ''),
          children: list2Tree(hd.title, others, findTopLevel(others)),
        };
      } else {
        return {
          ...c[0],
          title2: c[0].title.replace(new RegExp(`${parent}\\.`, 'i'), ''),
        };
      }
    });
  }
}

module.exports = list2Tree;
