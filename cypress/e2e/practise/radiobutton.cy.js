/// <reference types="cypress" />

describe('verify input fields', () => {
 
  it('verify check and uncheck check boxes', () => {
    cy.visit('https://practice.expandtesting.com/radio-buttons')    
    cy.get('.card-header').contains('Select your favorite color:').find('~div.card-body #red').check()
    
    cy.get('.card-header').contains('Select your favorite sport:').find('~div.card-body #basketball').check()

    //assertion
    cy.get('.card-header').contains('Select your favorite color:').find('~div.card-body #red').should('be.checked');
    cy.get('.card-header').contains('Select your favorite sport:').find('~div.card-body #basketball').should('be.checked');
    
  })

  
})
