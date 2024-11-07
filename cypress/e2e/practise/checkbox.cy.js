/// <reference types="cypress" />

describe('verify input fields', () => {
 
  it('verify check and uncheck check boxes',{tags:"@payment"} ,() => {
    cy.visit('https://practice.expandtesting.com/checkboxes')    
    cy.get('#checkboxes .form-check-input').check()
    cy.get('.form-check .form-check-input').eq(1).uncheck()
    cy.get('#checkboxes .form-check-input').should('be.checked');
    cy.get('.form-check .form-check-input').eq(1).should('not.be.checked');
    
  })


})
