module.exports = jslinks;

jslinks.displayName = "jslinks";
jslinks.aliases = ["js-with-links"];

function jslinks(Prism) {
  Prism.languages["js-with-links"] = Prism.languages.extend("javascript");
  Prism.languages["js-with-links-with-details"] = Prism.languages.extend("javascript", {
    keyword: {
      // pattern: /<[a-z]+>(.|\n)*?<\/[a-z]+>/gi, // <mode>
      // pattern: /<[a-z]+ url=\"([^\"]+)\">(.|\n)*?<\/[a-z]+>/gi, <mode url="">
      // pattern: /<([a-z]+ \"([^\"]+)\")>(.|\n)*?<\/[a-z]+>/gi, // <mode "url">
      pattern: /<([a-z]+) \"([^\"]+)\">(.|\n?)*<\/\1>/gi, // <mode "url"> with backrefence
      greedy: true,
      inside: {
        tag: {
          pattern: /(<default>|<\/default>)/,
          greedy: true,
          inside: {
            rest: Prism.languages.js
          }
        },
        rest: Prism.languages.js
      }
    }
  });
}
