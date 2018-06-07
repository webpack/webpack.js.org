const fs = require('fs');
const FrontMatter = require('front-matter');
const remark = require('remark');
const slug = require('remark-slug');

// TODO: Extract these to separate packages
const ExtractAnchors = require('remark-extract-anchors');

module.exports = function(item, options) {
  item.url = item.path
    .replace(item.extension, '')
    .replace(options.dir, '')
    .replace(/\/index$/, '')
    .replace(/^$/, '/');

  if (item.type === 'file') {
    let anchors = [];
    let content = fs.readFileSync(item.path, 'utf8');
    let { attributes } = FrontMatter(content);

    // remove underscore from fetched files
    if (item.name[0] === '_') {
      item.name = item.name.replace('_', '');
      item.url = item.url.replace('_', '');
    }

    remark()
      .use(slug)
      .use(ExtractAnchors, { anchors })
      .process(content, (err, file) => {
        if (err) {
          throw err;
        }
      });

    item.anchors = anchors;

    Object.assign(item, attributes);
  }
}
