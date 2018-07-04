const visit = require('unist-util-visit');
var remark = require('remark');
var parse = require('remark-parse');
var html = require('remark-html');
var fs = require('fs');

var file = fs.readFileSync('./src/content/plugins/index.md', { encoding: 'utf8' });

remark()
  .use(parse)
  .use(md)
  .use(html)
  .process(file, function(err, file) {
    if (file) {
      console.log(file.contents);
    }
  });

module.exports = md;

function addClassName(node, className) {
  node.data = {};
  node.data.hProperties = {};

  node.data.hProperties.className = className;
}

function md(options) {
  return function transformer(tree, file) {
    let headers;

    visit(tree, 'tableRow', visitor);

    function visitor(node, index, parent) {
      if (node.type === 'tableRow' && index === 0) {
        // thead
        headers = node.children.map(header => header.children[0].value);
      }

      if (index !== 0) {
        node.children[0].children = [
          {
            type: 'div',
            children: headers.map(header => {
              return {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    value: header
                  }
                ]
              };
            }),
            data: {
              hProperties: {
                className: 'titles'
              }
            }
          },
          {
            type: 'div',
            children: [
              {
                type: 'paragraph',
                children: [
                  ...node.children[0].children,
                  {
                    type: 'paragraph',
                    children: node.children[1].children,
                    data: {
                      hProperties: {
                        className: 'description mobile'
                      }
                    }
                  }
                ]
              }
            ],
            data: {
              hProperties: {
                className: 'content'
              }
            }
          }
        ];

        node.children[1] = {
          ...node.children[1],
          data: {
            hProperties: {
              className: 'description desktop'
            }
          }
        };
      }
    }
  };
}

function logType(tree) {
  console.log(JSON.stringify(tree, null, 2));
}
