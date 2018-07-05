// const visit = require('unist-util-visit');
// var remark = require('remark');
// var parse = require('remark-parse');
// var html = require('remark-html');
// var stringify = require('remark-stringify');
// var fs = require('fs');

// var file = fs.readFileSync('./src/content/api/node.md', { encoding: 'utf8' });

// remark()
//   .use(parse)
//   .use(jsWithLinks)
//   .use(html)
//   .process(file, function(err, file) {
//     if (file) {
//       console.log('----------------');
//       console.log(file.contents);
//       console.log('----------------');
//     }
//   });

// module.exports = jsWithLinks;

// function jsWithLinks(options) {
//   return function transformer(tree, file) {
//     visit(tree, 'code', visitor);

//     function visitor(node) {
//       console.log(node)
//       remark()
//         .use(function() {
//           return function t(tr) {
//             // tr.children.forEach(ch => console.log(ch))
//           };
//         })
//         .use(html)
//         .process(node.value, (err, file) => {
//           // console.log('file')
//           // console.log(file)
//           // console.log(node.value)
//           // return file.contents;
//           node.value = file.toString()
//         });

//         // console.log(node)
//     }

//     // console.log('t',transformed);
//   };
// }

// function logType(tree) {
//   console.log(JSON.stringify(tree, null, 2));
// }

module.exports = jslinks;

jslinks.displayName = 'jslinks';
jslinks.aliases = [];

function jslinks(Prism) {
  Prism.languages.jslinks = Prism.languages.extend('javascript', {});

  // Prism.hooks.add('wrap', function(env) {
    // if (env.type === 'comment') {
    //   env.content = env.content.value.replace(/\[([^[\]]+?)\]\((.+?)\)/g, match => {
    //     match = /\[([^[\]]+?)\]\((.+?)\)/.exec(match);
    //     return `\x3Ca class="code-link" href="${match[2]}"\x3E${match[1]}\x3C/a\x3E`;
    //   });

      // console.log(code)

      // env.content.value = env.content.value.replace(/&#x3C;/g, '<')

      // env.content.value = code;
    // }
  // });
}
