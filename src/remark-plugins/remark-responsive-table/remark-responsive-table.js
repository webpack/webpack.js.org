// this plugin was first based on https://github.com/montogeek/remark-responsive-tables
import { visit } from 'unist-util-visit';
module.exports = function remarkResponsiveTable() {
  return function transformer(tree) {
    visit(tree, 'table', visitor);
    function visitor(node) {
      const [thead, ...tbody] = node.children;
      tbody.forEach((tr) => {
        tr.children.forEach((td, index) => {
          if (td.children.length === 0) {
            td.children = [
              {
                type: 'text',
                value: '-', // set value to `-` for blank cell
              },
            ];
          }
          // wrap all children in <span />
          td.children = [
            {
              type: 'paragraph',
              children: td.children,
              data: {
                hName: 'span',
              },
            },
          ];
          // set data-th
          const th = thead.children[index];
          td.data = {
            hProperties: {
              dataTh:
                // td in th could be empty
                th.children.length > 0 ? th.children[0].value : '',
              // FIXME what if td in th contains complex markdown??
              // e.g. "`code` and something else", then data-th would be wrong.
            },
          };
        });
      });
    }
  };
};
