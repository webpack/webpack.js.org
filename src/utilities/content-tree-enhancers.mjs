import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import {remark} from 'remark';
import slug from '../../src/remark-plugins/remark-slug/index.mjs';
import extractAnchors from 'remark-extract-anchors';
import remarkHtml from 'remark-html';
import frontmatter from 'remark-frontmatter';
import gfm from 'remark-gfm';
import emoji from 'remark-emoji';
import remarkRemoveHeadingId from '../remark-plugins/remark-remove-heading-id/index.mjs';

export const enhance = (tree, options) => {
  // delete `./` root directory on node
  const dir = path.normalize(options.dir).replace(/^(\.\/)/gm, '');

  tree.url = tree.path
    // delete `.mdx` extensions
    .replace(tree.extension, '')
    // delete source content directory
    .replace(dir, '')
    // Normalize url for Windows
    .replace(/\\/g, '/')
    // remove `index` for root urls
    .replace(/\/index$/, '')
    // replace empty strings with `/`
    .replace(/^$/, '/')
    // delete trailing dots for node
    .replace(/^(\.)/g, '')
    // add trailing slash if missing
    .replace(/\/?$/, '/');

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
      .use(frontmatter)
      .use(gfm)
      .use(emoji)
      .use(extractAnchors, { anchors, levels: 3 })
      .use(remarkRemoveHeadingId)
      .use(remarkHtml)
      .process(content, (err) => {
        if (err) {
          throw err;
        }
      });

    tree.anchors = anchors;

    Object.assign(
      tree,
      {
        path: tree.path.replace(/\\/g, '/'),
      },
      attributes
    );
  }
};

export const filter = () => true;

export const sort = (a, b) => {
  let group1 = (a.group || '').toLowerCase();
  let group2 = (b.group || '').toLowerCase();

  if (group1 < group2) return -1;
  if (group1 > group2) return 1;
  if (a.sort && b.sort) return a.sort - b.sort;

  let aTitle = (a.title || '').toLowerCase();
  let bTitle = (b.title || '').toLowerCase();
  if (aTitle < bTitle) return -1;
  if (aTitle > bTitle) return 1;

  return 0;
};

export function restructure(item, options) {
  enhance(item, options);

  if (item.children) {
    item.children.forEach((child) => restructure(child, options));

    item.children.filter(filter);
    item.children.sort(sort);
  }

  return item;
}
