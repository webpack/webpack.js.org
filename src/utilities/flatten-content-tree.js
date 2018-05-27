const flattenContentTree = (tree) => {
  const entries = tree.children;

  let flatPaths = [];

  entries.map(entry => {
    // push root url if present
    if ('url' in entry) {
      flatPaths.push(entry.url)
    }

    // push children children urls
    if ('children' in entry) {
      entry.children.map(child => {
        if ('url' in child) {
          flatPaths.push(child.url)
        }
      })
    }
  });

  return flatPaths
}

module.exports = flattenContentTree
