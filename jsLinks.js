module.exports = jslinks;

jslinks.displayName = "jslinks";
jslinks.aliases = [];

function jslinks(Prism) {
  Prism.languages["js-with-links-with-details"] = Prism.languages.extend("javascript", {
    keyword: /(<details>|<\/details>|<summary>|<\/summary>)/
  });
}


 // for (let index = 0; index < code.length; index++) {
  // const element = code[index];
  // let detailStart;
  // let detailEnd;
  // let summaryStart;
  // let summaryEnd;

  // if (element.type === 'element') {
  //   detailStart = getDetails(element)
  //   summaryStart = getSummary(element)
  //   detailEnd = getDetails(element, true)
  //   summaryEnd = getSummary(element, true)

  //   // if(summaryStart && summaryEnd) {
  //     console.log(summaryStart, summaryEnd)
  //     // console.log({ detailStart, detailEnd, summaryStart, summaryEnd })
  //     const between = findAllBetween(node, summaryStart, summaryEnd)
  //     console.log({ between })
  //   // }
  // }
// }

// let commentSummary = code.findIndex(ele => {
//   if (ele.children) {
//     return ele.children[0].value.endsWith('</summary>');
//   }
// });

// console.log(commentSummary);

// for (let index = 0; index < code.length; index++) {
//   const element = code[index];

//   if (element.type === 'element') {
//     if (isDetails(element)) {
//       if(isSummary(code[index + 1])) {
// console.log(element)

// element.tagName = 'details'
// element.children = [
//   {
//     type: 'element',
//     tagName: 'summary',
//     children: getChildren(code, index)
//   }
// ]
// }
// }
//     if (isElement(element, 'details')) {
//       if (isElement(code[index + 1], 'summary')) {
//         console.log(inspect(element))
//         console.log(element)
//         element.children = [
//           {
//             type: 'element',
//             tagName: 'details',
//             properties: {
//               className: 'myclassname'
//             },
//             // children: [
//             //   {
//             //     type: 'text',
//             //     value: refractor.highlight(code[index + 2], 'js')
//             //   }
//             // ]
//           }
//         ];
//       }
//     }
// }
// }

// const text = code.filter(c => c.type === 'text').map(c => c.value)

// const textCode = text.map(t => refractor.highlight(t, 'js'))

// data.hChildren = code;

// console.log(code);
