"use strict";

// cspell:ignore multicompiler
describe("Responsive Markdown tables", () => {
  for (const width of [320, 375, 410]) {
    it(`keeps MultiCompiler hook types inside their cells at ${width}px`, () => {
      cy.viewport(width, 900);
      cy.visit("/api/node/");
      cy.get("#multicompiler-hooks")
        .parent()
        .nextAll("table")
        .first()
        .as("hooks");
      cy.get("@hooks")
        .find("td")
        .each(($cell) => {
          const [cell] = $cell;
          expect(cell.scrollWidth).to.be.at.most(cell.clientWidth + 1);
        });
      cy.get("@hooks").find("td span").should("contain", "AsyncSeriesHook");
    });
  }

  it("keeps the desktop table layout", () => {
    cy.viewport(1280, 900);
    cy.visit("/api/node/");
    cy.get(".markdown table thead").first().should("be.visible");
    cy.get(".markdown table td")
      .first()
      .should("have.css", "display", "table-cell");
  });
});
