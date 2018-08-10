const util = require('util');

const refractor = require('refractor/core.js');
const languages = require('prism-languages');

var remark = require('remark');
var parse = require('remark-parse');
var htmlRemark = require('remark-html');

const visit = require('unist-util-visit');
var inspect = require('unist-util-inspect');
var findAllBetween = require('unist-util-find-all-between');

refractor.register(require('./jsLinks.js'));

var fs = require('fs');

var file = fs.readFileSync(__dirname + '/' + 'source.md', { encoding: 'utf8' });

remark()
  .use(parse)
  .use(attacher)
  .use(htmlRemark)
  .process(file, function(err, file) {
    if (err) throw err;
    if (file) {
      fs.writeFileSync(
        './index.html',
        `<link rel="stylesheet" href="https://unpkg.com/prismjs@1.15.0/themes/prism-dark.css" />
      <link rel="stylesheet" href="https://unpkg.com/prismjs@1.15.0/themes/prism.css" />` + file.contents
      );
    }
  });

function isElement(tree, tag, closeTag = false) {
  const openTag = closeTag ? '</' : '<';

  let open = tree.children[0].children[0].children[0].value === openTag;
  let tagMatch = tree.children[0].children[1].value === tag;
  let close = tree.children[1].children[0].value === '>';

  return open && tagMatch && close;
}

function getDetails(tree, close = false) {
  const tag = close ? '</details>' : '<details>';
  if (tree.properties.className.includes('keyword') && tree.children[0].value === tag) {
    return tree;
  }
}

function getSummary(tree, close = false) {
  const tag = close ? '</summary>' : '<summary>';
  if (tree.properties.className.includes('keyword') && tree.children[0].value === tag) {
    return tree;
  }
}

function getChildren(tree, index) {
  return tree;
}

function isElement(tree) {
  return tree.type === 'element';
}

function isKeyword(tree) {
  return tree.properties.className.includes('keyword');
}

function attacher({ include, exclude } = {}) {
  return function transformer(tree, file) {
    visit(tree, 'code', visitor);

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
        code = refractor.highlight(node.value, lang);

        const newTree = {
          type: 'root',
          children: code
        };

        let detailsStart = code
          .filter(isElement)
          .filter(isKeyword)
          .filter(tr => {
            return tr.children[0].value === '<details>';
          });

        let detailsEnd = code
          .filter(isElement)
          .filter(isKeyword)
          .filter(tr => {
            return tr.children[0].value === '</details>';
          });

        let summaryStart = code
          .filter(isElement)
          .filter(isKeyword)
          .filter(tr => {
            return tr.children[0].value === '<summary>';
          });

        let summaryEnd = code
          .filter(isElement)
          .filter(isKeyword)
          .filter(tr => {
            return tr.children[0].value === '</summary>';
          });

        const summaryTrees = detailsStart.map((_, i) => {
          return findAllBetween(newTree, summaryStart[i], summaryEnd[i]);
        });

        const detailsTree = detailsStart.map((_, i) => {
          return findAllBetween(newTree, detailsStart[i], detailsEnd[i]);
        });

        const detailsStartIndexes = detailsStart.map((_, i) => {
          return newTree.children.indexOf(detailsStart[i]);
        });

        console.log(inspect(detailsTree[1]))

        let prevCount = 0;

        detailsStart.forEach((_, i) => {
          prevCount += !detailsTree[i - 1] ? 0 : detailsTree[i - 1].length + 1;
          newTree.children.splice(detailsStartIndexes[i] - prevCount + i, detailsTree[i].length + 1, ...[{ type: 'text', value: `${detailsStartIndexes[i]}` }])
        });

        const cleanDetailsTrees = detailsStart.map((_, i) => {
          return detailsTree[i].splice(summaryTrees[i].length + 3)
        })

        const newDetailsTrees = detailsStart.map((_, i) => {
          return {
            type: 'element',
            tagName: 'details',
            properties: {
              open: false
            },
            children: [
              {
                type: 'element',
                tagName: 'summary',
                children: summaryTrees[i].splice(1)
              },
              ...cleanDetailsTrees[i]
            ]
          }
        })

        // console.log(util.inspect(newTree.children.map((e, i) => ({ [i]: e})), { depth: 4, maxArrayLength: 300 }))

        detailsStart.forEach((_, i) => {
          let insertPosition = newTree.children.findIndex(d => parseInt(d.value, 10) === detailsStartIndexes[i])

          newTree.children.splice(insertPosition, 1)
          newTree.children.splice(insertPosition, 0, newDetailsTrees[i])
        })

        // console.log(util.inspect(newTree.children.map((e, i) => ({ [i]: e})), { depth: 4, maxArrayLength: 300 }))

        // console.log(newTree.children)

        data.hChildren = newTree.children;
      } catch (e) {
        console.log(e);
        throw e;
      }

      data.hProperties = data.hProperties || {};
      data.hProperties.className = ['hljs', ...(data.hProperties.className || []), `language-${lang}`];
    }
  };
}

module.exports = attacher;
