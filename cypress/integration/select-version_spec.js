describe('Select the version of documentation', () => {
  it('should go to v4', () => {
    cy.visit('/concepts/');
    // close notification bar
    cy.get('.notification-bar__close').click();
    cy.get('select[name="version-selector"]').select('4');
    cy.url().should('include', 'v4.webpack.js.org');
    cy.url().should('include', '/concepts');
  });
});
