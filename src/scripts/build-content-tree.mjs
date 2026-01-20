// ./build-content-tree source output
// ./build-content-tree "./src/content" ".src/_content.json"
import fs from "node:fs";
import path from "node:path";
import directoryTree from "directory-tree";

// Import Utils
import { restructure } from "../utilities/content-tree-enhancers.mjs";

// if (require.main === module) {
//   main();
// } else {
//   module.exports = buildContentTree;
// }

function buildContentTree(source, output) {
  if (!source) {
    return console.error("build-content-tree: you must provide a source path");
  }
  if (!output) {
    return console.error(
      "build-content-tree: you must provide a output file name",
    );
  }

  let content = directoryTree(source, {
    extensions: /\.(md|mdx)/,
    attributes: ["size", "type", "extension"],
  });

  content = restructure(content, {
    dir: source,
  });

  fs.writeFileSync(
    path.resolve(output),
    JSON.stringify(content, null, 2),
    (error) => {
      if (error) {
        console.log("scripts/build-content-tree", error);
      } else {
        console.log(`Successfully built content tree file at ${output}`);
      }
    },
  );
}

function main() {
  const [, , source, output] = process.argv;

  buildContentTree(source, output);
}

main();
