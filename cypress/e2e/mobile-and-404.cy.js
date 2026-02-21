"use strict";

describe("Mobile Sidebar", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/concepts/");
  });

  it("should toggle the mobile sidebar visibility", () => {
    cy.get(".sidebar-mobile").should(
      "not.have.class",
      "sidebar-mobile--visible",
    );

    cy.get('button[aria-label="Toggle navigation menu"]').click();
    cy.get(".sidebar-mobile").should("have.class", "sidebar-mobile--visible");

    cy.get(".sidebar-mobile__close").click();
    cy.get(".sidebar-mobile").should(
      "not.have.class",
      "sidebar-mobile--visible",
    );
  });

  it("should close sidebar when clicking outside", () => {
    cy.get('button[aria-label="Toggle navigation menu"]').click();
    // Click to the right of the 300px wide sidebar
    cy.get("body").click(350, 500, { force: true });
    cy.get(".sidebar-mobile").should(
      "not.have.class",
      "sidebar-mobile--visible",
    );
  });
});
