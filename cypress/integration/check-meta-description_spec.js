describe('meta description', () => {
  it('should exist', () => {
    cy.visit('/guides/getting-started/');
    cy.get('meta[name="description"]')
      .its('content')
      .should('eq', 'Learn how to get started with webpack quick');
  });
});
