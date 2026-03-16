"use strict";

describe("Search", () => {
  beforeEach(() => {
    // Mock Algolia search request
    cy.intercept("POST", "https://*.algolia.net/**", {
      statusCode: 200,
      body: {
        results: [
          {
            hits: [
              {
                url: "/concepts/",
                title: "Roadmap",
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
    cy.get(".DocSearch-Hits").should("be.visible");
  });
});
