// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//


// -- This is a parent command --
 Cypress.Commands.add('login', () => { 
    let email= Cypress.env('user_name')
    let password= Cypress.env('user_password')
    let baseUrl=Cypress.env('url')
    cy.session([email,password],()=>{
        const credentials = {email:email,password:password}
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
          cy.window().then((window) => {
            window.localStorage.setItem('token', token)
           
             // Replace 'keyName' and 'value' as needed
          })
        },
        {
            validate: () => {
              expect(localStorage.getItem("token")).to.be.not.null;
              
        }
       });
    })
  })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })