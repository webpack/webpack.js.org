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

// The service worker precaches the whole site (`cache.addAll` in its install
// handler) before it activates. Going offline mid-precache aborts it, so the
// worker never activates and the next navigation has nothing to serve. Wait
// for an activated worker before cutting the network.
const waitForServiceWorkerReady = () => {
  cy.log("**wait for the service worker to finish precaching**");
  // Poll the registration until an activated worker exists — that only
  // happens after the install handler's precache completes. The 60s timeout
  // on `.invoke` is what the retried `.should` inherits (precaching the whole
  // site takes longer than the default 4s assertion budget).
  cy.window()
    .its("navigator.serviceWorker")
    .invoke({ timeout: 60000 }, "getRegistration")
    .should((registration) => {
      expect(registration, "service worker registration").to.exist;
      expect(registration.active, "active service worker").to.exist;
      expect(registration.active.state).to.eq("activated");
    });
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

      waitForServiceWorkerReady();

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
