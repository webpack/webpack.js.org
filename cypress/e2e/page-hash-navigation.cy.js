describe("Page hash navigation", () => {
  it("scrolls to element when hash is present", () => {
    cy.visit("/concepts/entry-points/#single-entry-shorthand");

    cy.get("#single-entry-shorthand")
      .should("exist")
      .then(($el) => {
        expect($el[0].getBoundingClientRect().top).to.be.lessThan(200);
      });
  });
});