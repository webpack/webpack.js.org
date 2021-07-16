describe('Detect sub navigation', () => {
  it('should show sub navigation', () => {
    cy.visit('/concepts/');

    const selector = '[data-testid="sub-navigation"]';

    cy.get(selector).should('exist');
  });

  it('should not show sub navigation', () => {
    cy.visit('/');

    const selector = '[data-testid="sub-navigation"]';

    cy.get(selector).should('not.exist');
  });
});
