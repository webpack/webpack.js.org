const refractor = require('refractor/core.js');
const visit = require('unist-util-visit');
const languages = require('prism-languages');

var remark = require('remark');
var parse = require('remark-parse');
var htmlRemark = require('remark-html');

refractor.register(require('refractor/lang/bash.js'));
refractor.register(require('refractor/lang/diff.js'));
refractor.register(require('refractor/lang/yaml.js'));
refractor.register(require('refractor/lang/json.js'));
refractor.register(require('refractor/lang/typescript.js'));
refractor.register(require('refractor/lang/nginx.js'));
refractor.register(require('refractor/lang/ruby.js'));
refractor.register(require('./js-with-links.js'));

// var fs = require('fs');

// var file = fs.readFileSync('./src/content/api/node.md', { encoding: 'utf8' });

// remark()
//   .use(parse)
//   .use(attacher)
//   .use(htmlRemark)
//   .process(file, function(err, file) {
//     if (err) throw err;
//     if (file) {
//       console.log('************************************');
//       console.log(file.contents);
//       console.log('----------------');
//       fs.writeFileSync('./index.html', file.contents);
//     }
//   });

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
        data.hChildren = refractor.highlight(node.value, lang);

        for (let index = 0; index < data.hChildren.length; index++) {
          const element = data.hChildren[index];

          if (element.properties && element.properties.className.includes('comment')) {
            const { value } = element.children[0];

            let match = /\[([^[\]]+?)\]\((.+?)\)/.exec(value);

            if (match !== null) {
              const [, text, url] = match;

              element.children = [
                {
                  type: 'text',
                  value: '//'
                },
                {
                  type: 'text',
                  value: ' '
                },
                {
                  type: 'element',
                  tagName: 'a',
                  properties: {
                    href: url,
                    className: ['code-link']
                  },
                  children: [
                    {
                      type: 'text',
                      value: text
                    }
                  ]
                }
              ];
            }
          }
        }

        node.children = [node.data.hChildren];
      } catch (e) {
        if (!languages[lang]) {
          console.warn('Prism does not support this language: ', lang);
        } else {
          console.warn('Prism failed to highlight: ', e);
        }
      }

      data.hProperties = data.hProperties || {};
      data.hProperties.className = ['hljs', ...(data.hProperties.className || []), `language-${lang}`];
    }
  };
}

module.exports = attacher;
