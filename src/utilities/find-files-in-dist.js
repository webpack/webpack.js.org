"use strict";

// grab .css files from ssg run
import fs from "node:fs";

export default function findFilesInDist(fileSuffixes = []) {
  const filesInDist = fs.readdirSync("./dist");
  return fileSuffixes.length
    ? filesInDist.filter((file) =>
        fileSuffixes.find((suffix) => file.endsWith(suffix)),
      )
    : [];
};
