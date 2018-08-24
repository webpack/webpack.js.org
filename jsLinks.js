module.exports = jslinks;

jslinks.displayName = "jslinks";
jslinks.aliases = [];

function jslinks(Prism) {
  Prism.languages["js-with-links-with-details"] = Prism.languages.extend("javascript", {
    keyword: {
      pattern: /<[a-z]+>(.|\n)*?<\/[a-z]+>/gi,
      greedy: true,
      inside: {
        rest: Prism.languages.js
      }
    }
  });
}
