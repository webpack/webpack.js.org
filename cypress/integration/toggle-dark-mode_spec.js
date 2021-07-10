describe('Toggle dark mode', () => {
  it('should toggle .dark class for html element', () => {
    cy.visit('/');

    const selector = '[data-testid="hello-darkness"]';

    cy.get(selector).click();
    cy.get('html').should('have.class', 'dark');

    cy.get(selector).click();
    cy.get('html').should('not.have.class', 'dark');
  });
});
