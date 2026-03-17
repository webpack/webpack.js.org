"use strict";

describe("Page hash navigation", () => {
  it("scrolls to the element specified by the hash", () => {
    cy.visit("/guides/getting-started/#basic-setup");

    cy.location("hash").should("eq", "#basic-setup");

    cy.get("#basic-setup", { timeout: 10000 })
      .should("exist")
      .then(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.lessThan(200);
      });
  });
});
