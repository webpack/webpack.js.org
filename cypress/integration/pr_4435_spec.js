// set scrollBehavior to false
// because we don't want cypress to scroll itself
describe('Open page in new tab', { scrollBehavior: false }, () => {
  it('should not scroll to top', () => {
    cy.visit('/concepts/plugins/', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'scrollTo');
      },
    });
    // there's one call in Page.jsx when componentDidMount
    cy.window().then((win) => {
      expect(win.scrollTo).to.be.calledOnce;
    });

    const selector = '.sidebar-item__title[href="/concepts/plugins/"]';

    // we click the menu
    cy.get(selector).click();
    cy.window().then((win) => {
      console.log('click the menu');
      expect(win.scrollTo).to.be.calledTwice;
    });

    if (Cypress.platform === 'darwin') {
      cy.get(selector).click({
        metaKey: true,
      });
      // no scrollTo should be called
      cy.window().then((win) => {
        expect(win.scrollTo).to.be.calledTwice;
      });
    } else if (Cypress.platform === 'win32' || Cypress.platform === 'linux') {
      // win32, linux
      cy.get(selector).click({
        ctrlKey: true,
      });
      // no scrollTo should be called
      cy.window().then((win) => {
        expect(win.scrollTo).to.be.calledTwice;
      });
    }

    // we click the menu again
    cy.get(selector).click();
    cy.window().then((win) => {
      expect(win.scrollTo).to.be.calledThrice;
    });
  });
});
