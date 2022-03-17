Cypress.Commands.add('isNotInViewport', (element) => {
  cy.get(element).then(($el) => {
    // we won't have horizontal scollbar
    const rect = $el[0].getBoundingClientRect();
    if (rect.top < 0) {
      expect(rect.bottom).to.be.lessThan(0);
    } else {
      expect(rect.top).to.be.at.least(0);
    }
  });
});

Cypress.Commands.add('isInViewport', (element) => {
  cy.get(element).then(($el) => {
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.at.least(0);
    expect(rect.left).to.be.at.least(0);
  });
});
