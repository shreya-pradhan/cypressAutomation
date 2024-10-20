/// <reference types="cypress" />
import { Notes } from "../../pages/notespage";



describe('log into notes app', () => {

  let editnotes;
  let createapibody;
  let mockresponse;
    const notespage = new Notes()
    beforeEach(() => {
      var appurl=Cypress.env('url')
      cy.login()
      cy.visit(appurl)
      cy.fixture('editnotes.json').then((data) => {
        editnotes = data; // Assign the JSON object to the variable
      });

      cy.fixture('createnotes.json').then((data) => {
        createapibody = data; // Assign the JSON object to the variable
      });
      cy.fixture('mocknotes.json').then((data) => {
        mockresponse = data; // Assign the JSON object to the variable
      });
        
    })

    it.only('mock notes reponse',()=>{
      cy.intercept('https://practice.expandtesting.com/notes/api/notes',{
        body:mockresponse
      }).as('mockednotesreponse')
      cy.reload()

    })
  
    it('create a new note', () => {
        notespage.ClickOnAddNotesButton()
        notespage.AddTitlefornotes('notes1')
        notespage.AddDescriptionfornotes('new notes')
        notespage.ClickOnCreateNotesButton()
      
    })

    it('edit a new note and delete it from ui', () => {
      
        // const addnotesbody = {
        //     title: "title before editing",
        //     description: "description before editing ",
        //     category: "Home",
        //     completed: false
        //   };
    const token = window.localStorage.getItem('token');
    cy.log('Retrieved Token:', token)
    cy.fixture('createnotes.json').then((addnotesbody)=>{
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

    })
     
        cy.wait(5000)
        cy.fixture('editnotes.json').then((fixture)=>{
        notespage.ClickOnEditButton()
        notespage.AddTitlefornotes(fixture.title)
        notespage.AddDescriptionfornotes(fixture.description)
        notespage.ClickOnSaveButton()
        notespage.verifynotesname(fixture.title)
        notespage.deleteNotesByName(fixture.description)
        
      
    })
  })


    it('edit a new note and delete it from API', () => {
        let noteid;
        
    const token = window.localStorage.getItem('token');
    cy.log('Retrieved Token:', token)
    cy.request({
                method: 'POST',
                url: 'https://practice.expandtesting.com/notes/api/notes/', // Replace with your API endpoint
                body: createapibody,
                headers: {
                  'Content-Type': 'application/json' ,
                  'x-auth-token':token
                }
                   
              }).then((response) => {
                expect(response.status).to.eq(200); 
                 noteid=response.body.data.id
                cy.log(noteid)
             
               cy.reload()
               cy.pause()
               
                notespage.ClickOnEditButton()
                notespage.AddTitlefornotes(editnotes.title)
                notespage.AddDescriptionfornotes(editnotes.description)
              
                notespage.ClickOnSaveButton().then(()=>{
                    cy.request({
                        method: 'DELETE',
                        url: `https://practice.expandtesting.com/notes/api/notes/${noteid}`, // Replace with your API endpoint
                        headers: {
                          'Content-Type': 'application/json' ,
                          'x-auth-token':token
                        }
                           
                      }).then((response) => {
                        expect(response.status).to.eq(200); 
                                              
                      })
                      cy.request({
                        method: 'GET',
                        url: `https://practice.expandtesting.com/notes/api/notes`, // Replace with your API endpoint
                        headers: {
                          'Content-Type': 'application/json' ,
                          'x-auth-token':token
                        }
                           
                      }).then((response) => {
                          expect(response.body.message).to.be.equal('No notes found')
                                              
                      })
                               
                
                })

              })  
    
    })

    it('search a note and edit it', () => {
      let noteid;
      
  const token = window.localStorage.getItem('token');
  cy.log('Retrieved Token:', token)
  cy.request({
              method: 'POST',
              url: 'https://practice.expandtesting.com/notes/api/notes/', // Replace with your API endpoint
              body: createapibody,
              headers: {
                'Content-Type': 'application/json' ,
                'x-auth-token':token
              }
                 
            }).then((response) => {
              expect(response.status).to.eq(200); 
               noteid=response.body.data.id
              cy.log(noteid)
             cy.intercept('https://practice.expandtesting.com/notes/api/notes').as('getallnotes')
             cy.reload()
            cy.wait('@getallnotes').then(()=>{
              notespage.ClickOnEditButton()
              notespage.AddTitlefornotes(editnotes.title)
              notespage.AddDescriptionfornotes(editnotes.description)
            
              notespage.ClickOnSaveButton().then(()=>{
                  cy.request({
                      method: 'DELETE',
                      url: `https://practice.expandtesting.com/notes/api/notes/${noteid}`, // Replace with your API endpoint
                      headers: {
                        'Content-Type': 'application/json' ,
                        'x-auth-token':token
                      }
                         
                    }).then((response) => {
                      expect(response.status).to.eq(200); 
                                            
                    })
                    cy.request({
                      method: 'GET',
                      url: `https://practice.expandtesting.com/notes/api/notes`, // Replace with your API endpoint
                      headers: {
                        'Content-Type': 'application/json' ,
                        'x-auth-token':token
                      }
                         
                    }).then((response) => {
                        expect(response.body.message).to.be.equal('No notes found')
                                            
                    })
                             
              
              })

            })
             
              

            })  
  
  })
  

      });
      