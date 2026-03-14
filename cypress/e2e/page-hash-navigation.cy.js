"use strict";

describe("Page hash navigation", () => {
  it("scrolls to the hash target element", () => {
    cy.visit("/guides/getting-started/#basic-setup");

    cy.location("hash").should("eq", "#basic-setup");

    cy.get("#basic-setup", { timeout: 10000 }).should("be.visible");
  });
});
