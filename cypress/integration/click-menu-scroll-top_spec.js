describe('Click menu', () => {
  it('scroll to top when menu clicked', () => {
    cy.visit('/concepts/plugins/');
    // scroll to Contributors section
    cy.get('.contributors__section').scrollIntoView();

    const selector = '.sidebar-item__title[href="/concepts/plugins/"]';

    cy.get(selector).click();
    cy.window().then((win) => {
      expect(win.scrollY).to.equal(0);
    });
  });
});
