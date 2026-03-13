// inspired by https://github.com/montogeek/remark-refractor
function jsLinksDetails(Prism) {
  Prism.languages["js-with-links"] = Prism.languages.extend("javascript");
  Prism.languages["js-with-links-details"] = Prism.languages.extend(
    "javascript",
    {
      keyword: {
        // pattern: /<[a-z]+>(.|\n)*?<\/[a-z]+>/gi, // <mode>
        // pattern: /<[a-z]+ url=\"([^\"]+)\">(.|\n)*?<\/[a-z]+>/gi, <mode url="">
        // pattern: /<([a-z]+ \"([^\"]+)\")>(.|\n)*?<\/[a-z]+>/gi, // <mode "url">
        pattern: /<([a-z]+) "([^"]+)">(.|\n?)*<\/\1>/gi, // <mode "url"> with backreference
        greedy: true,
        inside: {
          tag: {
            pattern: /(<default>|<\/default>)/,
            greedy: true,
            inside: {
              rest: Prism.languages.js,
            },
          },
          rest: Prism.languages.js,
        },
      },
    },
  );
}
jsLinksDetails.displayName = "jslinks";
jsLinksDetails.aliases = ["js-with-links", "js-with-links-details"];

export default jsLinksDetails;
