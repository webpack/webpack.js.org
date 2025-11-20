// https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/server-communication__offline/cypress/integration/offline-spec.js

const goOffline = () => {
  cy.log('**go offline**')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.enable',
      });
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      });
    });
};

const goOnline = () => {
  // disable offline mode, otherwise we will break our tests :)
  cy.log('**go online**')
    .then(() => {
      // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: false,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      });
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.disable',
      });
    });
};

describe('offline', () => {
  describe('site', { browser: '!firefox' }, () => {
    // make sure we get back online, even if a test fails
    // otherwise the Cypress can lose the browser connection
    beforeEach(goOnline);
    afterEach(goOnline);

    it('shows /migrate/ page', () => {
      const url = '/migrate/';
      const text = 'Migrate';

      cy.visit(url);
      cy.get('h1').contains(text);

      goOffline();

      cy.visit(url);
      cy.get('h1').contains(text);

      // click `guides` link
      cy.get('a[title="guides"]').click();
      cy.get('h1').contains('Guides');
    });

    it('open print dialog when accessing /printable url', () => {
      const url = '/migrate/printable';
      cy.visit(url, {
        onBeforeLoad: (win) => {
          cy.stub(win, 'print');
        },
      });
      cy.window().then((win) => {
        expect(win.print).to.be.calledOnce;
      });
    });
  });
});
