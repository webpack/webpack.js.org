describe('notification popup', () => {
  it('should pop up on first visit', () => {
    const element = '.notification-bar';
    cy.visit('/');
    cy.get(element).should('have.length', 1);

    cy.get('.notification-bar__close').click();
    cy.get(element).should('have.length', 0);

    cy.reload();
    cy.get(element).should('have.length', 0);
  });
});
