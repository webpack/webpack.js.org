const visit = require('unist-util-visit');
module.exports = function responsiveTable() {
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
          td.data = {
            hProperties: {
              dataTh: thead.children[index].children[0].value || '-',
            },
          };
        });
      });
    }
  };
};
