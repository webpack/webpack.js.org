describe('Search', () => {
  it('should visit entry page', () => {
    cy.visit('/concepts/');
    cy.get('.DocSearch').click();
    cy.get('#docsearch-input').type('roadmap');
    cy.wait(100);
    cy.get('#docsearch-item-0').click();
    cy.url().should('include', '/blog/2020-12-08-roadmap-2021/');
  });
});
