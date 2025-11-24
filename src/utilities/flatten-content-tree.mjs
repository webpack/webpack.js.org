export default (tree) => {
  let paths = [];

  const crawl = (node) => {
    if ('url' in node) {
      paths.push(node.url);
    }

    if ('children' in node) {
      node.children.forEach(crawl);
    }
  };

  if (Array.isArray(tree.children)) {
    tree.children.forEach(crawl);
  }

  return paths;
};
