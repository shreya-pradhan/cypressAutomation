/// <reference types="cypress" />
import { Notes } from "../../pages/notespage";



describe('log into notes app', () => {
    const notespage = new Notes()
    beforeEach(() => {
      cy.login('shreya19.sp@gmail.com','Test123$$')
        
    })
  
    it('create a new note', () => {
        cy.get('.btn').contains('Add Note').click()
        cy.get('#title').clear().type('note')
        cy.get('#description').clear().type('notedescription')
        cy.get('.btn').contains('Edit').click({force:true})
      
    })

    it('edit a new note', () => {
     
      

        cy.wait(5000)
        notespage.ClickOnEditButton()
        cy.get('#title').clear().type('notesedited')
        cy.get('#description').clear().type('notedescription')
        cy.get('.btn').contains('Save').click({force:true})
    })

    it.only('edit and delete new note', () => {
     
        const addnotesbody = {
                title: "title before editing",
                description: "description before editing ",
                category: "Home",
                completed: false
              };
        const token = window.localStorage.getItem('token');
        cy.log('Retrieved Token:', token)
        cy.request({
                    method: 'POST',
                    url: 'https://practice.expandtesting.com/notes/api/notes/', // Replace with your API endpoint
                    body: addnotesbody,
                    headers: {
                      'Content-Type': 'application/json' ,
                      'x-auth-token':token
                    }
                       
                  }).then((response) => {
                    expect(response.status).to.eq(200); 
                  })   

        cy.wait(5000)
        notespage.ClickOnEditButton()
        cy.get('#title').clear().type('notesedited')
        cy.get('#description').clear().type('notedescription')
        cy.get('.btn').contains('Save').click({force:true})
        
    })
  
    
    });
      