// grab .css files from ssg run
const fs = require('fs');

module.exports = function (endsWith = false) {
    const filesInDist = fs.readdirSync('./dist');
    return endsWith
        ? filesInDist.filter((item) => item.endsWith(endsWith))
        : filesInDist;
};