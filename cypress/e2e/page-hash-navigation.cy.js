"use strict";

describe("Page hash navigation", () => {
  it("scrolls to the hash target element", () => {
    cy.visit("/guides/getting-started/#basic-setup");

    cy.location("hash").should("include", "basic-setup");

    cy.get("h2, h3", { timeout: 10000 }).should("exist");
  });
});
