/// <reference types="cypress" />

describe('verify input fields', () => {
 
  it('verify check and uncheck check boxes',{tags:"@smoke"}, () => {
    cy.visit('https://practice.expandtesting.com/bmi')    
     let weight=70;
     let height =190;
     let heightInMeters=height/100;

    
      cy.get('.btn-primary').click().then(()=>{
        let bmi= Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
        let category;
      if (bmi < 18.5) {
        category = 'Underweight';
      } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal';
      } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
      } else {
        category = 'Obesity';
      }
        
        
        cy.wrap(bmi).then(()=>{
          cy.get('#BMI').should('have.text',`Your BMI is ${bmi.toFixed(1)} kg/m2 (${category})`)

      })
     

     })
     

    
  })


})
