"use strict";

// grab .css files from ssg run
const fs = require("node:fs");

module.exports = function findFilesInDist(fileSuffixes = []) {
  const filesInDist = fs.readdirSync("./dist");
  return fileSuffixes.length
    ? filesInDist.filter((file) =>
        fileSuffixes.find((suffix) => file.endsWith(suffix)),
      )
    : [];
};
