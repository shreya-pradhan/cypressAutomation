/// <reference types="cypress" />

describe('verify input fields', () => {
 
  it('verify file download', () => {
    const filePath = 'cypress/downloads/1729133050725_hello1.js';
    const downloadfolder='cypress/downloads';
    cy.task('deleteFile','cypress/downloads')
    cy.visit('https://practice.expandtesting.com/download')    
    cy.contains(' 1729133050725_hello1.js').click().then(()=>{
      cy.wait(3000)
      cy.readFile(filePath).should('exist');
    })
    
       
  })


})
