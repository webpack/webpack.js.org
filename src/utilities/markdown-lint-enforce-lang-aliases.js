"use strict";

/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ["enforce-lang-aliases"],
  description: "Enforce short language aliases in code blocks",
  tags: ["code", "language"],
  parser: "markdownit",
  function: (params, onError) => {
    const languageMap = {
      javascript: "js",
      typescript: "ts",
    };

    const tokens = params.parsers.markdownit.tokens.filter(
      (token) => token.type === "fence",
    );

    for (const token of tokens) {
      const lang = token.info.trim().toLowerCase();

      if (Object.hasOwn(languageMap, lang)) {
        const expected = languageMap[lang];

        onError({
          lineNumber: token.lineNumber,
          detail: `Replace '${lang}' with '${expected}'`,
          fixInfo: {
            editColumn: 1,
            deleteCount: token.line.length,
            insertText: `\`\`\`${expected}`,
          },
        });
      }
    }
  },
};
