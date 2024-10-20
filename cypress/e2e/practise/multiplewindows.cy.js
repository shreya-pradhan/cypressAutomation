/// <reference types="cypress" />

describe('verify input fields', () => {
 
  it('verify multiple tabs', () => {
    cy.visit('https://practice.expandtesting.com/windows')   
     cy.get('div.row>a').invoke('removeAttr', 'target').click()
     cy.get('h1').should('have.text','Example of a new window page for Automation Testing Practice')
    
     
    })
  
    it.only('should display all 6 steps of the scientific method ', () => {
      cy.visit('https://practice.expandtesting.com/spies-stubs-clocks')
      cy.clock()
      cy.get('#discoverScientificMethod').click()
      cy.tick(60000)
      cy.get('[data-testid="step-1"]').should('be.visible').and('contain', '1. Ask a Question')
      cy.get('[data-testid="step-2"]').should('be.visible').and('contain', '2. Do Background Research');
      cy.get('[data-testid="step-3"]').should('be.visible').and('contain', '3. Construct a Hypothesis');
      cy.get('[data-testid="step-4"]').should('be.visible').and('contain', '4. Test Your Hypothesis');  
      cy.get('[data-testid="step-5"]').should('be.visible').and('contain', '5. Analyze Your Data and Draw a Conclusion');
      cy.get('[data-testid="step-6"]').should('be.visible').and('contain', '6. Communicate Your Results');



    })

    it.skip('should display all 6 steps of the scientific method with a controlled clock', () => {
      cy.visit('https://practice.expandtesting.com/spies-stubs-clocks')
      cy.clock()
      cy.get('#discoverScientificMethod').click()
      cy.tick(60000)
      cy.tick(2000);
      cy.get('[data-testid="step-1"]').should('be.visible').and('contain', 'Step 2: Do Background Research')
      cy.get('[data-testid="step-2"]').should('be.visible').and('contain', 'Step 2: Do Background Research');

    // Continue advancing the clock for the remaining steps
    cy.tick(2000);
    cy.get('[data-testid="step-3"]').should('be.visible').and('contain', 'Step 2: Do Background Research').should('be.visible').and('contain', 'Step 3: Construct a Hypothesis');

    cy.tick(2000);
    cy.get('[data-testid="step-4"]').should('be.visible').and('contain', 'Step 2: Do Background Research').should('be.visible').and('contain', 'Step 4: Test Your Hypothesis');

    cy.tick(2000);
    cy.get('[data-testid="step-5"]').should('be.visible').and('contain', 'Step 2: Do Background Research').should('be.visible').and('contain', 'Step 5: Analyze the Data');

    cy.tick(2000);
    cy.get('[data-testid="step-6"]').should('be.visible').and('contain', 'Step 2: Do Background Research').should('be.visible').and('contain', 'Step 6: Draw a Conclusion');



    })
  
       
  })
