"use strict";

const sizes = ["iphone-6", "macbook-15"];

describe("Scroll Test", () => {
  for (const size of sizes) {
    it(`scroll to top when accessing new page on ${size}`, () => {
      cy.viewport(size);
      cy.visit("/guides/getting-started");
      // scroll to Contributors section
      cy.get('[data-testid="contributors"]').scrollIntoView();

      cy.isNotInViewport('[id="الإعداد-الأساسي"]');

      cy.visit("/guides/build-performance/");
      cy.isNotInViewport('[data-testid="contributors"]');
    });
    it(`scroll to fragment when accessing new page with fragment on ${size}`, () => {
      cy.viewport(size);
      cy.visit("/guides/getting-started");
      cy.get('[data-testid="contributors"]').scrollIntoView();

      cy.visit(`/guides/build-performance/${encodeURI("#التطوير")}`);
      // since we lazy load notification bar now, #التطوير element is a little out of viewport now
      cy.isInViewport('[id="الترجمة-في-الذاكرة"]');
      cy.isNotInViewport('[id="عام"]');
    });
  }
});
