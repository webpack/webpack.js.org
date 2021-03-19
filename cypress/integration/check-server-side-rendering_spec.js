describe('server side rendered page', () => {
  it('should find meta description', () => {
    cy.visit('/guides/getting-started/');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Learn how to get started with webpack quick'
    );
  });

  it('should find html tag with lang', () => {
    cy.visit('/');
    cy.get('html[lang="en"]');
  });

  it('should find meta charset', () => {
    cy.visit('/');
    cy.get('meta[charset="utf-8"]');
  });
});
