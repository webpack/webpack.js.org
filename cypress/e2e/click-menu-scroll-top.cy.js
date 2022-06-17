describe('Click menu', () => {
  it('scroll to top when menu clicked', () => {
    cy.visit('/concepts/modules/');
    // scroll to Contributors section
    // note that there's no hash in url
    cy.get('[data-testid="contributors"]').scrollIntoView();

    const selector = '.sidebar-item__title[href="/concepts/modules/"]';

    cy.get(selector).click();
    cy.window().then((win) => {
      expect(win.scrollY).to.equal(0);
    });
  });
});
