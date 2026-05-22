"use strict";

describe("Page hash navigation", () => {
  it("scrolls to the element specified by the hash", () => {
    const hash = encodeURI("#الإعداد-الأساسي");

    cy.visit(`/guides/getting-started/${hash}`);

    cy.location("hash").then((locationHash) => {
      expect(locationHash).to.equal(hash);
    });

    cy.get(`[id="${hash.slice(1)}"]`, { timeout: 10000 })
      .should("exist")
      .then(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.lessThan(200);
      });
  });
});
