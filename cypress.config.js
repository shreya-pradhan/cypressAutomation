const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deleteFile(folderPath) {
          const fullPath = path.resolve(folderPath);
          
          if (fs.existsSync(fullPath)) {
            fs.readdirSync(fullPath).forEach((file) => {
              const filePath = path.join(fullPath, file);
              try {
                fs.unlinkSync(filePath); // Delete each file
              } catch (err) {
                throw new Error(`Failed to delete file: ${filePath} - ${err.message}`);
              }
            });
            return null;  // Success
          } else 
          {
            return false;  // Folder does not exist
          }  
        }
    }),

    on('task', {
      readexcel(filePath) {
        
        const fullPath = path.resolve(filePath);
          const workbook = xlsx.readFile(fullPath);
          const sheetName = workbook.SheetNames[0]; // Use the first sheet
          const sheet = workbook.Sheets[sheetName];

          // Convert sheet to JSON as an array of arrays
          const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
         // 'header: 1' returns arrays instead of objects
          
          // Remove the header row if necessary (optional)
          jsonData.shift(); // This removes the first row (headers) if not needed in comparison

          const formattedData = jsonData.map(row => {
            // Assuming the "Due" column is the 4th column (index 3)
            row[3] = `$${parseFloat(row[3]).toFixed(2)}`; // Format as $xx.xx
            return row;
          });

          return formattedData;
         
      }
  })
      
    },
    hideXHRInCommandLog: true,
    baseUrl:'https://practice.expandtesting.com/notes/app'
      // implement node event listeners here
  },
});
