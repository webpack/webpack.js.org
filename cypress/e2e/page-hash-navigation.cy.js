"use strict";

describe("Page hash navigation", () => {
  it("scrolls to the element specified by the hash", () => {
    cy.visit(`/guides/getting-started/${encodeURI("#الإعداد-الأساسي")}`);

    cy.location("hash").then((hash) => {
      expect(decodeURIComponent(hash)).to.equal("#الإعداد-الأساسي");
    });

    cy.get('[id="الإعداد-الأساسي"]', { timeout: 10000 })
      .should("exist")
      .then(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.lessThan(200);
      });
  });
});
