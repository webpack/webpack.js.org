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

// var tree = remark().parse('Some _emphasis_, **importance**, and `code`.');

// console.log('tree', tree)

// var parent = tree.children[0]
// var start = parent.children[0]
// var end = parent.children[parent.children.length - 1]

// console.log('parent', inspect(parent))
// console.log('start', inspect(start))
// console.log('end', inspect(end))

// console.log('between',inspect(findAllBetween(parent, start, end)))

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

        // newTree.children.splice(detailsStartIndexes[0], detailsTree[0].length + 1);
        // newTree.children.splice(detailsStartIndexes[1] - (detailsTree[0].length + 1), detailsTree[1].length + 1);
        // newTree.children.splice(detailsStartIndexes[2] - (detailsTree[0].length + 1 + detailsTree[1].length + 1), detailsTree[2].length + 1);

        let prevCount = 0;

        detailsStart.forEach((_, i) => {
          prevCount += !detailsTree[i - 1] ? 0 : detailsTree[i - 1].length + 1;
          newTree.children.splice(detailsStartIndexes[i] - prevCount, detailsTree[i].length + 1)
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

        let nextCount = 0;

        console.log(detailsStartIndexes)

        newDetailsTrees.forEach(e => {
          console.log(e.children.length + 3)
        })

        // detailsStart.forEach((_, i) => {
          newTree.children.splice(detailsStartIndexes[0], 0, newDetailsTrees[0])
          const prev = detailsStartIndexes[1] - (detailsStartIndexes[0] + newDetailsTrees[0].children.length + 4)
          newTree.children.splice(detailsStartIndexes[1] - (detailsStartIndexes[0] + newDetailsTrees[0].children.length + 4), 0, newDetailsTrees[1])
          newTree.children.splice(detailsStartIndexes[2] - (prev + detailsStartIndexes[0]), 0, newDetailsTrees[2])
        // })

        // console.log(util.inspect(newTree.children.map((e, i) => [i, e]), { depth: 4 }));

        // const summaryTree = findAllBetween(newTree, summaryStart, summaryEnd)
        // const detailsTree = findAllBetween(newTree, detailsStart, detailsEnd)

        // const dSIndex = newTree.children.indexOf(detailsStart)
        // const dEIndex = newTree.children.indexOf(detailsEnd)

        // const sSIndex = newTree.children.indexOf(summaryStart)
        // const sEIndex = newTree.children.indexOf(summaryEnd)

        // newTree.children.splice(dSIndex, detailsTree.length + 1)

        // const cleanDetailsTree = detailsTree.splice(summaryTree.length + 3)

        // const newDetailsTree = {
        //   type: 'element',
        //   tagName: 'details',
        //   children: [
        //     {
        //       type: 'element',
        //       tagName: 'summary',
        //       children: summaryTree.splice(1)
        //     },
        //     ...cleanDetailsTree
        //   ]
        // }

        // newTree.children.splice(dSIndex, 0, newDetailsTree)

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
