// this plugin was first based on https://github.com/montogeek/remark-responsive-tables
import { visit } from "unist-util-visit";

export default function remarkResponsiveTable() {
  return function transformer(tree) {
    function visitor(node) {
      const [thead, ...tbody] = node.children;
      for (const tr of tbody) {
        for (const [index, td] of tr.children.entries()) {
          if (td.children.length === 0) {
            td.children = [
              {
                type: "text",
                value: "-", // set value to `-` for blank cell
              },
            ];
          }
          // wrap all children in <span />
          td.children = [
            {
              type: "paragraph",
              children: td.children,
              data: {
                hName: "span",
              },
            },
          ];
          // set data-th
          const th = thead.children[index];
          td.data = {
            hProperties: {
              dataTh:
                // td in th could be empty
                th.children.length > 0 ? th.children[0].value : "",
              // FIXME what if td in th contains complex markdown??
              // e.g. "`code` and something else", then data-th would be wrong.
            },
          };
        }
      }
    }

    visit(tree, "table", visitor);
  };
}
