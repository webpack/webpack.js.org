describe('Redirect on client side', () => {
  it('should redirect', () => {
    const target = '/configuration/other-options/#cache';
    cy.visit(target);

    cy.url().should('include', '/configuration/cache/');
  });
  it('should not redirect', () => {
    cy.visit('/concepts/entry-points/#multi-page-application');
    cy.url().should(
      'include',
      '/concepts/entry-points/#multi-page-application'
    );
  });
});
