describe('Search', () => {
  it('should visit entry page', () => {
    cy.visit('/concepts/');
    cy.get('.DocSearch').click();
    cy.get('#docsearch-input').type('roadmap');
    cy.get('.DocSearch-Hits').should('be.visible');
  });
});
