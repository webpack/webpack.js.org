const sizes = ['iphone-6', 'macbook-15'];
describe('Scroll Test', () => {
  sizes.forEach((size) => {
    it(`scroll to top when accessing new page on ${size}`, () => {
      cy.viewport(size);
      cy.visit('/guides/getting-started');
      // scroll to Contributors section
      cy.get('[data-testid="contributors"]').scrollIntoView();

      cy.isNotInViewport('#basic-setup');

      cy.visit('/guides/build-performance/');
      cy.isNotInViewport('[data-testid="contributors"]');
    });
    it(`scroll to fragment when accessing new page with fragment on ${size}`, () => {
      cy.viewport(size);
      cy.visit('/guides/getting-started');
      cy.get('[data-testid="contributors"]').scrollIntoView();

      cy.visit('/guides/build-performance/#development');
      // since we lazy load notification bar now, #development element is a little out of viewport now
      cy.isInViewport('#compile-in-memory');
      cy.isNotInViewport('#general');
    });
  });
});
