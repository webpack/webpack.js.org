describe('Search', () => {
  it('should visit entry page', () => {
    cy.visit('/');
    cy.get('.DocSearch').click();
    cy.get('.DocSearch-input').type('entry points{enter}');
    cy.url().should('include', '/concepts/entry-points/');
  });
});
