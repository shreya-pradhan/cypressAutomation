export class Notes{
    
    addNoteButton = '.btn-primary';
     title='#title';
     description='#description';
     deleteCard='div.row div.card';
     confirmdelete='.btn-danger';
     editNotesButton='.btn';
     notecardsheader='[data-testid=note-card] div[data-testid=note-card-title]'
     availablenotes='[data-testid=note-card]'
     confirmdeletenotes ='[data-testid=note-delete-confirm]'

    
    
      ClickOnAddNotesButton = () =>{
       cy.get(this.addNoteButton).contains('Add Note').click()
     }
     
       AddTitlefornotes = (notetitle) =>{
       cy.get(this.title).clear().type(notetitle)
     }
     
       AddDescriptionfornotes = (notedescription) =>{
           cy.get( this.description).clear().type(notedescription)
     }
     
       ClickOnCreateNotesButton = () =>{
           cy.get( this.addNoteButton).contains('Create').click()
     }
     
       ClickOnDeleteNotesButton = () =>{
           cy.get( this.deleteCard).contains('Delete').click()
         cy.wait(3000);
     }
     
       ClickOnConfirmDeleteButton = () =>{
           cy.get( this.confirmdelete).contains('Delete').click({force:true})
     }
     
       ClickOnEditButton = () =>{
           cy.get( this.editNotesButton).contains('Edit').click({force:true})
        }
        ClickOnSaveButton = () =>{
           return cy.get( this.editNotesButton).contains('Save').click({force:true})
        }

        getnotes = () =>{
          cy.get( this.notecards)
      }

      verifynotesname=(expectedname, index=0)=>{
        cy.get(this.notecardsheader).eq(index).should('have.text',expectedname)
      }

      deleteNotesByName=(name)=>{
        cy.get(this.notecardsheader).contains(name).parent('div [data-testid=note-card]').find('.card-footer button[data-testid=note-delete]').click().then(()=>{
          cy.get(this.confirmdeletenotes).click()

        })

      }

      deleteNotesUsingAPI=(id)=>{

      }
     
        

}