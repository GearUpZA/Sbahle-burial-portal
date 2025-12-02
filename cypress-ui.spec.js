// Cypress E2E test for Sbahle Burial Society main UI
// Place this file in cypress/e2e/ and run with Cypress

describe('Sbahle Burial Society UI', () => {
  beforeEach(() => {
    cy.visit('file:///C:/Users/mmaqashela/Downloads/SBS-V11%20(1)/index.html');
  });

  it('should navigate tabs with keyboard', () => {
    cy.get('.tab').first().focus().trigger('keydown', { key: 'ArrowRight' });
    cy.get('.tab').eq(1).should('be.focused');
  });

  it('should open and close modal with Escape', () => {
    cy.get('#modal').invoke('addClass', 'show');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('#modal').should('not.have.class', 'show');
  });

  it('should allow form input', () => {
    cy.get('input[type=email], input[type=text]').first().type('test@example.com').should('have.value', 'test@example.com');
  });

  it('should load members data', () => {
    cy.window().its('members').should('be.an', 'array').and('have.length.greaterThan', 0);
  });
});
