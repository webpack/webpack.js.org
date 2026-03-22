"use strict";

const visitWithClipboardSpy = (url) => {
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

  cy.window().then((win) => {
    cy.stub(win.navigator.clipboard, "writeText")
      .as("clipboardWriteText")
      .resolves();
  });
};

const getFirstWebpackConfigBlock = (aliasName) => {
  cy.get(".group")
    .filter((i, el) => el.querySelector("code"))
    .first()
    .as(aliasName);
};

describe("CodeBlockWithCopy", () => {
  it("copies diff code blocks without removed lines or diff prefixes", () => {
    visitWithClipboardSpy("/guides/output-management/");

    cy.contains("h1", "Output Management", { timeout: 10000 }).should("exist");

    getFirstWebpackConfigBlock("diffCodeBlock");

    cy.get("@diffCodeBlock").find("code").should("exist");

    cy.get("@diffCodeBlock")
      .find('button[aria-label="Copy code to clipboard"]')
      .should("exist")
      .click();

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

    cy.contains("h1", "Concepts", { timeout: 10000 }).should("exist");

    getFirstWebpackConfigBlock("standardCodeBlock");

    cy.get("@standardCodeBlock").find("code").should("exist");

    cy.get("@standardCodeBlock")
      .find("code")
      .invoke("text")
      .as("expectedCopiedText");

    cy.get("@standardCodeBlock")
      .find('button[aria-label="Copy code to clipboard"]')
      .should("exist")
      .click();

    cy.get("@clipboardWriteText").should("have.been.calledOnce");

    cy.get("@clipboardWriteText").then((clipboardWriteText) => {
      const [copiedText] = clipboardWriteText.getCall(0).args;

      cy.get("@expectedCopiedText").then((expectedCopiedText) => {
        expect(copiedText).to.eq(expectedCopiedText);
        expect(copiedText).to.include("export default {");
        expect(copiedText).to.include('entry: "./path/to/my/entry/file.js",');
      });
    });
  });
});
