// cypress/e2e/check-sub-navigation.cy.js

describe('Sub Navigation', () => {
  beforeEach(() => {
    cy.viewport(1280, 720); // Set consistent viewport size for desktop view
  });

  describe('Desktop Navigation', () => {
    it('should show sub navigation on documentation pages', () => {
      cy.visit('/concepts/');

      // Check if header exists
      cy.get('header').should('exist').and('be.visible');

      // Verify sub-navigation exists and is visible
      cy.get('[data-testid="sub-navigation"]')
        .should('exist')
        .and('be.visible');

      // Verify sub-navigation links are properly styled
      cy.get('[data-testid="sub-navigation"] a')
        .should('have.length.at.least', 1)
        .first()
        .should('have.class', 'text-blue-400');
    });

    it('should not show sub navigation on home page', () => {
      cy.visit('/');

      // Wait for page load and any animations
      cy.wait(1000);

      // Verify sub-navigation is not present
      cy.get('[data-testid="sub-navigation"]').should('not.exist');
    });

    it('should highlight active sub navigation item', () => {
      cy.visit('/concepts/');

      // Get the first sub-nav link and verify it becomes active when clicked
      cy.get('[data-testid="sub-navigation"] a')
        .first()
        .click()
        .should('have.class', '!text-black');
    });

    it('should show language dropdown', () => {
      cy.visit('/concepts/');

      // Verify language dropdown exists
      cy.get('[role="combobox"]').should('exist').and('be.visible');
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport(375, 667); // Set mobile viewport
    });

    it('should show hamburger menu on mobile', () => {
      cy.visit('/concepts/');

      // Verify hamburger button exists
      cy.get('button')
        .first()
        .should('be.visible')
        .find('svg')
        .should('have.class', 'fill-current');
    });

    it('should hide desktop navigation on mobile', () => {
      cy.visit('/concepts/');

      // Verify desktop nav is hidden
      cy.get('nav').first().should('have.class', 'hidden');
    });
  });
});
