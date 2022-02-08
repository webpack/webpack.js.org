// based on https://github.com/remarkjs/remark-slug/blob/8e6394c3dd6232cc9f0fb0b05e7eaf33063effa5/index.js
// to fix https://github.com/webpack/webpack.js.org/pull/5947
/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('hast').Properties} Properties
 */

import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import BananaSlug from 'github-slugger';

const slugs = new BananaSlug();

/**
 * Plugin to add anchors headings using GitHub’s algorithm.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkSlug() {
  return (tree) => {
    slugs.reset();

    visit(tree, 'heading', (node) => {
      const data = node.data || (node.data = {});
      const props = /** @type {Properties} */ (
        data.hProperties || (data.hProperties = {})
      );
      let id = props.id;

      id = id ? slugs.slug(String(id), true) : slugs.slug(toString(node));

      data.id = id;
      props.id = id;

      // insert <span id="..." /> for headings
      node.children = [
        {
          type: 'paragraph',
          data: {
            hName: 'span',
            hProperties: {
              id,
            },
          },
          children: [
            {
              type: 'text',
              value: '',
            },
          ],
        },
        ...node.children,
      ];
    });
  };
}
