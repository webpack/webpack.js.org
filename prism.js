const util = require("util");

const refractor = require("refractor/core.js");
const languages = require("prism-languages");

var remark = require("remark");
var parse = require("remark-parse");
var htmlRemark = require("remark-html");

const visit = require("unist-util-visit");
var inspect = require("unist-util-inspect");
var find = require("unist-util-find");
var findAllBetween = require("unist-util-find-all-between");

refractor.register(require("./jsLinks.js"));
refractor.register(require("refractor/lang/json"));

var fs = require("fs");

var file = fs.readFileSync(__dirname + "/src/content/configuration/" + "index.mdx", { encoding: "utf8" });

remark()
  .use(parse)
  .use(attacher)
  .use(htmlRemark)
  .process(file, function(err, file) {
    if (err) throw err;
    if (file) {
      fs.writeFileSync(
        "./index.html",
        `<link rel="stylesheet" href="https://webpack.js.org/142727ee4bde248bb419.css" />
      <div class="page__content">` +
          file.contents +
          `</div>`
      );
    }
  });

function attacher({ include, exclude } = {}) {
  return transformer;

  function transformer(tree, file) {
    visit(tree, "code", visitor);

    function visitor(node) {
      const { lang } = node;

      if (!lang || (include && !~include.indexOf(lang)) || (exclude && ~exclude.indexOf(lang))) {
        return;
      }

      let { data } = node;

      if (!data) {
        node.data = data = {};
      }

      try {
        data.hChildren = refractor.highlight(node.value, lang);
        data.hChildren.forEach(node => {
          if (node.properties && node.properties.className.includes("keyword")) {
            if (node.children[1]) {
              node.properties.componentname = node.children[1].value.trim();
            }
            if (node.children[2]) {
              node.properties.url = node.children[2].children[0].value.replace(/"/g, "");
            }
          }
        });
      } catch (e) {
        throw e;
      }

      data.hProperties = data.hProperties || {};
      data.hProperties.className = ["hljs", ...(data.hProperties.className || []), `language-${lang}`];
    }
  }
}

module.exports = attacher;
