describe('Detect sub navigation', () => {
  it('should show sub navigation', () => {
    cy.visit('/concepts/');

    const selector = '[data-testid="sub-navigation"]';

    cy.get(selector).should('exist');
  });

  it('should  show sub navigation on homepage', () => {
    cy.visit('/');

    const selector = '[data-testid="sub-navigation"]';

    cy.get(selector).should('exist');
  });
});
