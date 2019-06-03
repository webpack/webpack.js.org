const fs = require('fs');
const path = require('path');
const os = require('os');
const front = require('front-matter');

// root path
const rootPath = path.join('src', 'content');

console.info('Concatenating *.md files of each content directory to create chapter-wide help files to be used for printing');

// getDirectoryRecursive() recursively walks through all sub directories of the provided path
// concatenates the .md files content in each directory, sorted by their FrontMatter sort
// attribute, and creates a compound MarkDown file named by using the directory name,
// prefixed by an underscore and suffixed by '_all.md' from the concatenated content
// in the corresponding directory.
function getDirectoryRecursive(basePath) {
	console.log(`Processing: ${basePath}`);

	// create destination file name of compound file
	const targetFilePath = path.join(basePath, `${basePath.substr(rootPath.length).replace(/[/\\]/, '_')}_all.md`);

	// TODO: maybe clean those in the pre-build and remove this
	if (fs.existsSync(targetFilePath)) {
		fs.unlinkSync(targetFilePath);
	}

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
				let fc = fileContents[fileContents.length] = front(fs.readFileSync(fullPath).toString());

				// only include files providing a FrontMatter 'sort' attribute
				if (!fc.attributes.sort) --fileContents.length;
			}
		}

		// sort MarkDown files by FrontMatter 'sort' attribute (QuickSort)
		for (let i = 0; i < fileContents.length - 1; ++i)
			for (let j = i + 1; j < fileContents.length; ++j) {
				const left = fileContents[i].attributes;
				const right = fileContents[j].attributes;

				if (left.sort > right.sort || left.sort == right.sort && left.title > right.title) {
					[fileContents[i], fileContents[j]] = [fileContents[j], fileContents[i]];
				}
			}

		// write compound target file
		const targetFile = fs.createWriteStream(targetFilePath);

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
  console.info(`Successfully created "_all.md" files in each directory within ${rootPath}`)
);
