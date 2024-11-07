/// <reference types="cypress" />

describe('Test related to tables', () => {
  
  it('verify CPU Usage for chrome browser', () => {
    cy.visit('https://practice.expandtesting.com/dynamic-table')

    let colIndex;
    cy.wait(3000)
       // Find the column index for 'CPU'
    cy.get('.table-striped thead th').contains('CPU').invoke('index').then((index) => {
      colIndex = index;
      cy.log(colIndex)
       // Find the row that contains 'Chrome' and get the CPU column value
    cy.get('.table-striped tbody tr').contains('Chrome').parent('tr').find('>td').eq(colIndex).then(($cell) => {
      const cpuValue = $cell.text().trim();
      cy.get('#chrome-cpu').invoke("text").then((text) => { 
        const value = text.trim().split(':')[1].trim();
        expect(value).to.equal(cpuValue); 
      });
    });
    });
  })

  it('verify table headers',()=>{
            
        cy.visit('https://practice.expandtesting.com/tables');
    
        const expectedHeaders = ['Last Name', 'First Name', 'Email','Due','Web Site','Action'];
           
        cy.get('table#table1 thead>tr th') 
          .should('have.length', expectedHeaders.length) // Check the number of headers
          .each((header, index) => {
            cy.wrap(header).should('have.text', expectedHeaders[index]); // Check each header text
          });
      });
  it('verify columns are sorted',()=>{
            
        cy.visit('https://practice.expandtesting.com/tables');
    
        const expectedHeaders = ['Last Name', 'First Name', 'Email','Due','Web Site','Action'];
           
       cy.get('table#table1 thead tr th:nth-of-type(2)').click()
        cy.get('table#table1 tbody tr td:nth-of-type(2)') 
          .then(($items) => {
            const itemsArray = $items.toArray().map(item => item.innerText.trim());

            const sortedArray = [...itemsArray].sort();
            expect(itemsArray).to.deep.equal(sortedArray);
            
            
          });
      });
  
  it('verify table correct',{ tags: 'smoke' },()=>{
        let excelFilePath='cypress/fixtures/Book1.xlsx'

        cy.task('readexcel',  excelFilePath ).then((excelArray) => {
          console.log(excelArray)
      
          // Visit the webpage containing the table
          cy.visit('https://practice.expandtesting.com/tables');
    
          // Extract UI data as an array of arrays
          cy.get('table#table1 tbody tr').then(($rows) => {
            const uiArray = [];
    
            $rows.each((index, row) => {
              const cells = Cypress.$(row).find('td');
              const rowData = [
                Cypress.$(cells[0]).text().trim(),  // Last Name
                Cypress.$(cells[1]).text().trim(),  // First Name
                Cypress.$(cells[2]).text().trim(),  // Email
                Cypress.$(cells[3]).text().trim(),  // Due
                Cypress.$(cells[4]).text().trim()   // Web Site
              ];
    
              uiArray.push(rowData);  // Add row data to array
            });
    
            console.log(uiArray)
            expect(uiArray).to.deep.equal(excelArray);
          });
        });
     
})

})
