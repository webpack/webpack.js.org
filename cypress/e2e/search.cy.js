"use strict";

describe("Search", () => {
  beforeEach(() => {
    cy.intercept("POST", "**algolia.net/**", {
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
