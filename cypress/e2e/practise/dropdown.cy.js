/// <reference types="cypress" />

describe('verify input fields', () => {
 
  it('verify check and uncheck check boxes', () => {
    cy.visit('https://practice.expandtesting.com/dropdown')    
    cy.get('#dropdown').select('Option 2')
    cy.get('.form-control').select('50')
    cy.get('#country').select('Nepal')

    //assertion 
    cy.get('#dropdown').contains('Option 2').should('have.attr', 'selected');
    cy.get('.form-control').should('have.value', '50');
    cy.get('#country').contains('Nepal').should('have.attr', 'selected');
    
  })


})
