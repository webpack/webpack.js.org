export default (tree) => {
  let paths = [];

  const crawl = (node) => {
    if ('url' in node) {
      paths.push(node.url);
    }

    if ('children' in node) {
      node.children.map(crawl);
    }
  };

  tree.children.map(crawl);

  return paths;
};
