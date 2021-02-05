const sizes = ['iphone-6', 'macbook-15'];
describe('Scroll Test', () => {
  sizes.forEach((size) => {
    it(`scroll to top when accessing new page on ${size}`, () => {
      cy.viewport(size);
      cy.visit('/guides/getting-started');
      // scroll to Contributors section
      cy.get('.contributors__section').scrollIntoView();

      cy.isNotInViewport('#basic-setup');

      cy.visit('/guides/build-performance/');
      cy.isNotInViewport('.contributors__section');
    });
    it(`scroll to fragment when accessing new page with fragment on ${size}`, () => {
      cy.viewport(size);
      cy.visit('/guides/getting-started');
      cy.get('.contributors__section').scrollIntoView();

      cy.visit('/guides/build-performance/#development');
      cy.isInViewport('#development');
      cy.isNotInViewport('#general');
    });
  });
});
