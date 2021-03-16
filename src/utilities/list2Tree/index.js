const findTopLevel = require('./findTopLevel');
function list2Tree(anchors, topLevel = findTopLevel(anchors)) {
  if (anchors.length === 0) return [];
  if (anchors.length > 1) {
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
          children: list2Tree(others, findTopLevel(others)),
        };
      } else {
        return c[0];
      }
    });
  } else {
    return anchors;
  }
}

module.exports = list2Tree;
