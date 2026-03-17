"use strict";

describe("Search", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://*.algolia.net/**", {
      statusCode: 200,
      body: {
        results: [
          {
            hits: [
              {
                url: "http://localhost:3000/concepts/",
                hierarchy: { lvl0: "Concepts" },
                objectID: "1",
              },
            ],
          },
        ],
      },
    }).as("algoliaSearch");
  });

  it("should visit entry page", () => {
    cy.visit("/concepts/");
    cy.get(".DocSearch").click();
    cy.get("#docsearch-input").type("roadmap");

    cy.get(".DocSearch-Modal").should("be.visible");
  });
});
