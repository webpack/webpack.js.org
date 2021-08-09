const fs = require('fs');
const path = require('path');
const os = require('os');
const front = require('front-matter');

// root path
const rootPath = path.join('src', 'content');
const outFileName = 'printable.md';

console.info(
  'Concatenating *.md files of each content directory to create chapter-wide help files to be used for printing'
);

// getDirectoryRecursive() recursively walks through all sub directories of the provided path
// concatenates the .md files content in each directory, sorted by their FrontMatter sort
// attribute, and creates a compound MarkDown file named by using the directory name,
// prefixed by an underscore and suffixed by '_all.md' from the concatenated content
// in the corresponding directory.
function getDirectoryRecursive(basePath) {
  console.log(`Processing: ${basePath}`);

  // create destination file name of compound file
  const targetFilePath = path.join(basePath, outFileName);

  // list current working directory
  fs.readdir(basePath, function (err, fileNames) {
    if (err) throw err;

    let fileContents = [];

    for (let file of fileNames) {
      const fullPath = path.join(basePath, file);

      // if the directory entry is a directory, recurse into that directory
      if (fs.statSync(fullPath).isDirectory()) {
        getDirectoryRecursive(fullPath);
      } else if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx')) {
        fileContents[fileContents.length] = front(
          fs.readFileSync(fullPath).toString()
        );
      }
    }

    // sort MarkDown files by FrontMatter 'sort' attribute (QuickSort)
    for (let i = 0; i < fileContents.length - 1; ++i)
      for (let j = i + 1; j < fileContents.length; ++j) {
        const left = fileContents[i].attributes;
        const right = fileContents[j].attributes;

        if (
          left.sort > right.sort ||
          (left.sort == right.sort && left.title > right.title)
        ) {
          [fileContents[i], fileContents[j]] = [
            fileContents[j],
            fileContents[i],
          ];
        }
      }

    // write compound target file
    const targetFile = fs.createWriteStream(targetFilePath);

    targetFile.write(`---
title: Printable
sort: 999
contributors:
  - webpack
---

    `);

    targetFile.on('error', (error) => {
      throw error;
    });

    for (let file of fileContents) {
      // use FrontMatter 'title' attribute as main heading of target file
      targetFile.write(os.EOL + os.EOL + '# ' + file.attributes.title + os.EOL);
      targetFile.write(file.body);
    }

    targetFile.end();
  });
}

getDirectoryRecursive(rootPath);

// end message
process.on('exit', () =>
  console.info(
    `Successfully created "${outFileName}" files in each directory within ${rootPath}`
  )
);
