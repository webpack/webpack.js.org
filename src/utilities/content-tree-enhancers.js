const fs = require('fs');
const frontMatter = require('front-matter');
const remark = require('remark');
const slug = require('remark-slug');

// TODO: Extract these to separate packages
const extractAnchors = require('./remark-extract-anchors');

function enhance(tree, options) {
  // delete `./` root directory on node
  const dir = options.dir.replace(/^(\.\/)/gm, '');

  tree.url = tree.path
    // delete `.md` extensions
    .replace(tree.extension, '')
    // delete source content directory
    .replace(dir, '')
    // remove `index` for root urls
    .replace(/\/index$/, '')
    // replace empty strings with `/`
    .replace(/^$/, '/')
    // delete trailing dots for node
    .replace(/^(\.)/g, '');

  if (tree.type === 'file') {
    let anchors = [];
    let content = fs.readFileSync(tree.path, 'utf8');
    let { attributes } = frontMatter(content);

    // remove underscore from fetched files
    if (tree.name[0] === '_') {
      tree.name = tree.name.replace('_', '');
      tree.url = tree.url.replace('_', '');
    }

    remark()
      .use(slug)
      .use(extractAnchors, { anchors })
      .process(content, (err) => {
        if (err) {
          throw err;
        }
      });

    tree.anchors = anchors;

    Object.assign(tree, attributes);
  }
}

function filter(item) {
  return item.name !== 'images';
}

function sort(a, b) {
  let group1 = (a.group || '').toLowerCase();
  let group2 = (b.group || '').toLowerCase();

  if (group1 < group2) return -1;
  if (group1 > group2) return 1;
  if (a.sort && b.sort) return a.sort - b.sort;

  else return 0;
}

function restructure(item, options) {
    enhance(item, options);

   if (item.children) {
     item.children.forEach(child => restructure(child, options));

     item.children.filter(filter);
     item.children.sort(sort);
   }

   return item;
}

module.exports = {
  enhance,
  filter,
  restructure,
  sort
}
