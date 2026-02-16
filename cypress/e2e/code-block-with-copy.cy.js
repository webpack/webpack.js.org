"use strict";

const visitWithClipboardSpy = (url) => {
  // Load page with a controllable clipboard implementation for this test run.
  cy.visit(url, {
    onBeforeLoad(win) {
      Object.defineProperty(win, "isSecureContext", {
        value: true,
        configurable: true,
      });

      Object.defineProperty(win.navigator, "clipboard", {
        value: {
          writeText: () => Promise.resolve(),
        },
        configurable: true,
      });
    },
  });

  // Stub clipboard writes so tests can assert exact copied text.
  cy.window().then((win) => {
    cy.stub(win.navigator.clipboard, "writeText")
      .as("clipboardWriteText")
      .resolves();
  });
};

const getFirstWebpackConfigBlock = (aliasName) => {
  cy.contains("strong", "webpack.config.js")
    .first()
    .parent()
    .next(".code-block-wrapper")
    .as(aliasName);
};

describe("CodeBlockWithCopy", () => {
  it("copies diff code blocks without removed lines or diff prefixes", () => {
    visitWithClipboardSpy("/guides/output-management/");

    // Select the first webpack.config.js diff example and its copy wrapper.
    getFirstWebpackConfigBlock("diffCodeBlock");

    // Trigger copy for that specific diff code block.
    cy.get("@diffCodeBlock").find("code.language-diff").should("exist");
    cy.get("@diffCodeBlock").find("button.copy-button").click();

    // Assert copied output strips diff markers and removed lines.
    cy.get("@clipboardWriteText").should("have.been.calledOnce");
    cy.get("@clipboardWriteText").then((clipboardWriteText) => {
      const [copiedText] = clipboardWriteText.getCall(0).args;

      expect(copiedText).to.include("entry: {");
      expect(copiedText).to.include("index: './src/index.js',");
      expect(copiedText).to.include("print: './src/print.js',");
      expect(copiedText).to.include("filename: '[name].bundle.js',");

      expect(copiedText).to.not.include("entry: './src/index.js',");
      expect(copiedText).to.not.include("filename: 'bundle.js',");
      expect(copiedText).to.not.match(/^[+-]/m);
    });
  });

  it("copies non-diff code blocks without altering content", () => {
    visitWithClipboardSpy("/concepts/");

    // Select the first webpack.config.js example and its copy wrapper.
    getFirstWebpackConfigBlock("standardCodeBlock");

    // Capture the rendered source text and trigger copy from this non-diff snippet.
    cy.get("@standardCodeBlock").find("code.language-diff").should("not.exist");
    cy.get("@standardCodeBlock")
      .find("code")
      .invoke("text")
      .as("expectedCopiedText");
    cy.get("@standardCodeBlock").find("button.copy-button").click();

    // Assert copied output is unchanged for regular code blocks.
    cy.get("@clipboardWriteText").should("have.been.calledOnce");
    cy.get("@clipboardWriteText").then((clipboardWriteText) => {
      const [copiedText] = clipboardWriteText.getCall(0).args;

      cy.get("@expectedCopiedText").then((expectedCopiedText) => {
        expect(copiedText).to.eq(expectedCopiedText);
        expect(copiedText).to.include("module.exports = {");
        expect(copiedText).to.include('entry: "./path/to/my/entry/file.js",');
      });
    });
  });
});
