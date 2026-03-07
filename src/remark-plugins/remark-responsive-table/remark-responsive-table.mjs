// this plugin was first based on https://github.com/montogeek/remark-responsive-tables
import { toString } from "mdast-util-to-string";
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
              // td in th could be empty
              dataTh: th.children.length > 0 ? toString(th) : "",
            },
          };
        }
      }
    }

    visit(tree, "table", visitor);
  };
}
