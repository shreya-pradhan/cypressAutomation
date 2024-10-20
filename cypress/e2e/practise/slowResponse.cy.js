/// <reference types="cypress" />

describe('verify input fields', () => {
 
  it('verify intercept', () => {
    cy.intercept('GET', 'https://practice.expandtesting.com/slow-external').as('slowExternal');
    cy.visit('https://practice.expandtesting.com/slow')    
    cy.wait('@slowExternal').then(()=>{
      cy.get('.alert-info').should('have.text','The slow task has finished. Thanks for waiting!')

    })
  })     

  it.only('mock response', () => {
    cy.intercept('GET', 'https://practice.expandtesting.com/slow-external',{
      statusCode: 200,
      body : 'The slow task has not finished. Thanks for waiting!'
    }).as('mockApi');
    cy.visit('https://practice.expandtesting.com/slow')    
    cy.wait('@mockApi').then(()=>{
      cy.get('.alert-info').should('have.text','The slow task has finished. Thanks for waiting!')

    })
  }) 

  it('verify wait with timeout', () => {
    cy.visit('https://practice.expandtesting.com/slow')    
    
      cy.get('.alert-info',{timeout:9000}).should('have.text','The slow task has finished. Thanks for waiting!')

    
  })     

  it('verify wait with static time', () => {
    cy.visit('https://practice.expandtesting.com/slow')   
      cy.wait(10000).then(()=>{
        cy.get('.alert-info').should('have.text','The slow task has finished. Thanks for waiting!')

      })
    
       

    
  }) 
})



