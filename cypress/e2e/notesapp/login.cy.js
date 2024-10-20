/// <reference types="cypress" />

const cypress = require("cypress");

describe('log into notes app', () => {
  beforeEach(() => {
        cy.visit('https://practice.expandtesting.com/notes/app/login')
  })

  it.skip('verify user gets logged in with valid credentials', () => {
    
    cy.get('#email').type('shreya19.sp@gmail.com')
    cy.get('#password').type('Test123$$')
    cy.get('[data-testid=login-submit]').click()
  })

  it.skip('should log in using the API', () => {

            
        const credentials = {"email":"shreya19.sp@gmail.com","password":"Test123$$"}
        cy.request({
          method: 'POST',
          url: 'https://practice.expandtesting.com/notes/api/users/login', // Replace with your API endpoint
          body: credentials,
          headers: {
            'Content-Type': 'application/json' 
          }
        }).then((response) => {
          expect(response.status).to.eq(200); 
          const token = response.body.data.token;
          //cy.setCookie('token', token);
          cy.window().then((window) => {
            window.localStorage.setItem('token', token);
             // Replace 'keyName' and 'value' as needed
          }).then(()=>{
            cy.visit('https://practice.expandtesting.com/notes/app')
          })
          
          
        });
      });

  
  it.skip('should log in using the API', () => {

        url=Cypress.env('url')
        username = Cypress.env('user_name')
        password = Cypress.env('user_password')
        const credentials = {email:`${username}`,password:`${password}`}
        cy.request({
          method: 'POST',
          url: url, // Replace with your API endpoint
          body: credentials,
          headers: {
            'Content-Type': 'application/json' 
          }
        }).then((response) => {
          expect(response.status).to.eq(200); 
          const token = response.body.data.token;
          //cy.setCookie('token', token);
          cy.window().then((window) => {
            window.localStorage.setItem('token', token);
             // Replace 'keyName' and 'value' as needed
          }).then(()=>{
            cy.visit('https://practice.expandtesting.com/notes/app')
          })
          
          
        });
      });
    });
    