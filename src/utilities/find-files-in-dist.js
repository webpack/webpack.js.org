// grab .css files from ssg run
const fs = require('fs');

module.exports = function (fileSuffixes = []) {
  const filesInDist = fs.readdirSync('./dist');
  return fileSuffixes.length
    ? filesInDist.filter((file) =>
        fileSuffixes.find((suffix) => file.endsWith(suffix))
      )
    : [];
};
