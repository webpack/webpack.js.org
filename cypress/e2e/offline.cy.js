"use strict";

// https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/server-communication__offline/cypress/integration/offline-spec.js

const goOffline = () => {
  cy.log("**go offline**")
    .then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.enable",
      }),
    )
    .then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.emulateNetworkConditions",
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      }),
    );
};

const goOnline = () => {
  // disable offline mode, otherwise we will break our tests :)
  cy.log("**go online**")
    .then(() =>
      // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.emulateNetworkConditions",
        params: {
          offline: false,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      }),
    )
    .then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.disable",
      }),
    );
};

describe("offline", () => {
  describe("site", { browser: "!firefox" }, () => {
    // make sure we get back online, even if a test fails
    // otherwise the Cypress can lose the browser connection
    beforeEach(goOnline);
    afterEach(goOnline);

    it("shows /migrate/ page", () => {
      const url = "/migrate/";
      const text = "Migrate";

      cy.visit(url);
      cy.get("h1").contains(text);

      // DIAGNOSTIC: capture why the worker is/ isn't active (temporary).
      cy.window({ timeout: 65000 })
        .its("navigator.serviceWorker")
        .invoke({ timeout: 65000 }, "getRegistration")
        .should((reg) => {
          const state = {
            hasReg: Boolean(reg),
            installing: reg && reg.installing && reg.installing.state,
            waiting: reg && reg.waiting && reg.waiting.state,
            active: reg && reg.active && reg.active.state,
          };
          expect(
            reg && reg.active,
            `SW diag: ${JSON.stringify(state)}`,
          ).to.have.property("state", "activated");
        });

      goOffline();

      cy.visit(url);
      cy.get("h1").contains(text);

      // click `guides` link
      cy.get('a[title="guides"]').click();
      cy.get("h1").contains("Guides");
    });

    it("open print dialog when accessing /printable url", () => {
      const url = "/migrate/printable";
      cy.visit(url, {
        onBeforeLoad: (win) => {
          cy.stub(win, "print");
        },
      });
      cy.window().then((win) => {
        expect(win.print).to.be.calledOnce;
      });
    });
  });
});
