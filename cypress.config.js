const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');


module.exports = defineConfig({

  env: {
    grepFilterSpecs: true // Enables spec filtering based on grep
  },
  projectId: "c74uva",
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false,
    html: true,
    json: true,
    // Customize output paths if needed
    reportDir: 'cypress/reports/mochawesome',
},

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config); // Load grep plugin
      
        on('after:run', async () => {
        const jsonReport = await merge({files: ['cypress/reports/mochawesome/*.json']}); // Merges the JSON reports
        await generator.create(jsonReport,{reportDir: 'cypress/reports/mochawesome', // Output directory for the merged report
                 }) // Optional: specify a custom filename}); // Generates a single HTML report
    });


       // Register tasks
      on('task', {
        // Task to delete files from a folder
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
            console.log('All files deleted successfully'); // Debugging log
            return null;  // Success
          } else {
            console.error(`Folder does not exist: ${fullPath}`); // Debugging log
            return false;  // Folder does not exist
          }  
        },

        // Task to read Excel files
        readexcel(filePath) {
          const fullPath = path.resolve(filePath);
          const workbook = xlsx.readFile(fullPath);
          const sheetName = workbook.SheetNames[0]; // Use the first sheet
          const sheet = workbook.Sheets[sheetName];

          // Convert sheet to JSON as an array of arrays
          const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

          // Remove the header row if necessary (optional)
          jsonData.shift(); // This removes the first row (headers) if not needed in comparison

          const formattedData = jsonData.map(row => {
            // Assuming the "Due" column is the 4th column (index 3)
            row[3] = `$${parseFloat(row[3]).toFixed(2)}`; // Format as $xx.xx
            return row;
          });

          console.log('Excel data read successfully'); // Debugging log
          return formattedData;
        }
      });

      return config;
    },

    hideXHRInCommandLog: true,
    baseUrl: 'https://practice.expandtesting.com/notes/app',
  },
});
