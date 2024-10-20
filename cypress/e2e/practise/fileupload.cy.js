/// <reference types="cypress" />

describe('verify input fields', () => {
 
  it('verify check and uncheck check boxes', () => {
    cy.visit('https://practice.expandtesting.com/upload')    
    cy.get('input[type=file]')
  .selectFile('cypress/fixtures/image.png')
    cy.get('.btn-primary').click()
    cy.contains('File Uploaded!')
    
  })


})
