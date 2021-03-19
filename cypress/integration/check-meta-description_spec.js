describe('meta description', () => {
  it('should exist', () => {
    cy.visit('/guides/getting-started/');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Learn how to get started with webpack quick'
    );
  });
});
