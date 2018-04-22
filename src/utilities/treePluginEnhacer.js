const fs = require('fs');
const FrontMatter = require('front-matter');

module.exports = function(item, options) {
  item.url = item.path
    .replace(item.extension, '')
    .replace(options.dir, '')
    .replace(/\/index$/, '')
    .replace(/^$/, '/');

  if (item.type === 'file') {
    // remove underscore from fetched files
    if (item.name[0] === '_') {
      item.name = item.name.replace('_', '');
      item.url = item.url.replace('_', '');
    }

    let content = fs.readFileSync(item.path, 'utf8');
    let { attributes } = FrontMatter(content);

    Object.assign(item, attributes);
    item.anchors = []; // TODO: Add actual anchors
  }
}
