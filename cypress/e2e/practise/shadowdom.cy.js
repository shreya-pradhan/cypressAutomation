/// <reference types="cypress" />

describe('log into notes app', () => {
  beforeEach(() => {
        cy.visit('https://practice.expandtesting.com/shadowdom')

       
  })
  
  it('verify shadow DOM element', () => {

   cy.get('#shadow-host').shadow().find('#my-btn').should('have.text','This button is inside a Shadow DOM.')

   
  })


 
})
