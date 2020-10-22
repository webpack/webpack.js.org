describe('Print Section', () => {
  it('should open print dialog', () => {
    cy.visit('/migrate/printable/', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'print');
      },
    });
    cy.window().then((win) => {
      expect(win.print).to.be.calledOnce;
    });
  });
});
