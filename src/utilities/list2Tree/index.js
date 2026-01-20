"use strict";

const findTopLevel = require("./findTopLevel");

/**
 * @param {string} parent the parent menu text for anchors
 * @param {*} anchors a list of ordered anchors in the page
 * @param {number} topLevel the root level in anchor
 */
function list2Tree(parent, anchors, topLevel = findTopLevel(anchors)) {
  if (anchors.length === 0) return [];
  if (anchors.length > 0) {
    const cache = [];
    for (const anchor of anchors) {
      if (anchor.level === topLevel) {
        cache.push([anchor]);
      } else {
        cache[cache.length - 1].push(anchor);
      }
    }
    return cache.map((item) => {
      if (item.length > 1) {
        const [hd, ...others] = item;
        return {
          ...hd,
          title2: hd.title.replace(new RegExp(`^${parent}\\.`, "i"), ""),
          children: list2Tree(hd.title, others, findTopLevel(others)),
        };
      }
      return {
        ...item[0],
        title2: item[0].title.replace(new RegExp(`^${parent}\\.`, "i"), ""),
      };
    });
  }
}

module.exports = list2Tree;
