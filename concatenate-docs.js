// start message
console.info("\x1b[0m\x1b[36mConcatenating help files of each directory to create chapter-wide help files to be used for printing help ...\x1b[0m");

// ------ various includes ------
const fs = require("fs");
const path = require("path");
const os = require("os");
const front = require("front-matter");

// root path
const rootPath = path.join("src", "content");

/*	getDirectoryRecursive() recursively walks through
		all sub directories of the provided root path,
		concatenates the MarkDown files' content in
		each directory, sorted by their FrontMatter sort
		attribute, and creates a compound MarkDown file
		named by using the directory name, prefixed by an
		underscore and suffixed by "_all.md" from the
		concatenated content in the corresponding directory.
*/
(function getDirectoryRecursive(basePath)
{
	// log current working directory
	console.log("\x1b[0m\x1b[32m  " + basePath + "\x1b[0m");

	// create destination file name of compound file
	const targetFilePath = path.join(basePath, `${basePath.substr(rootPath.length).replace(/[/\\]/, "_")}_all.md`);

	if (fs.existsSync(targetFilePath)) fs.unlinkSync(targetFilePath);		// delete target file if it already exists

	fs.readdir(basePath, function (err, fileNames)	// list current working directory
	{
		if (err) throw err;

		let fileContents = [];

		for (let file of fileNames)		// for each directory entry ...
		{
			const fullPath = path.join(basePath, file);

			if (fs.statSync(fullPath).isDirectory()) getDirectoryRecursive(fullPath);		// if the directory entry is a directory, recurse into that directory
			else if (fullPath.endsWith(".md"))	// if the directory entry is a MarkDown file, add it to the list of files to be processed
			{
				let fc = fileContents[fileContents.length] = front(fs.readFileSync(fullPath).toString());

				if (!fc.attributes.sort) --fileContents.length;		// only include files providing a FrontMatter "sort" attribute
			}
		}

		// sort MarkDown files by FrontMatter "sort" attribute (QuickSort)
		for (let i = 0;i < fileContents.length - 1;++i)
			for (let j = i + 1;j < fileContents.length;++j)
			{
				const left = fileContents[i].attributes, right = fileContents[j].attributes;

				if (left.sort > right.sort
					|| left.sort == right.sort && left.title > right.title)
					[fileContents[i], fileContents[j]] = [fileContents[j], fileContents[i]];
			}

		// write compound target file
		const targetFile = fs.createWriteStream(targetFilePath);

		targetFile.on("error", (error) => { throw error; });

		for (let file of fileContents)
		{
			targetFile.write(os.EOL + os.EOL + "# " + file.attributes.title + os.EOL);	// use FrontMatter "title" attribute as main heading of target file
			targetFile.write(file.body);
		}

		targetFile.end();
	});
})(rootPath);

// end message
process.on("exit", () => { console.info("\x1b[0m\x1b[36mSuccessfully created \"_all.md\" help files in each directory within \"" + rootPath + "\".\x1b[0m"); });