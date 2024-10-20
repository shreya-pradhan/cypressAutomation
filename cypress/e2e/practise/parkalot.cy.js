/// <reference types="cypress" />

describe('Verify Input Fields', () => {
  const HOURLY_RATE = 2;
  const LONG_TERM_GARAGE_DAILY_RATE = 12;
  const LONG_TERM_SURFACE_DAILY_RATE = 10;
  const LONG_TERM_GARAGE_WEEKLY_RATE = 72;
  const LONG_TERM_SURFACE_WEEKLY_RATE = 60;
  const PARKING_TYPES = ['Long-Term Garage Parking', 'Long-Term Surface Parking'];

  function calculateFare(hr, day, week, type) {
    cy.log(type)
    let dailyRate = type ==='Long-Term Garage Parking'? LONG_TERM_GARAGE_DAILY_RATE : LONG_TERM_SURFACE_DAILY_RATE;
    let weeklyRate = type === 'Long-Term Garage Parking'? LONG_TERM_GARAGE_WEEKLY_RATE : LONG_TERM_SURFACE_WEEKLY_RATE;
    cy.log(`weekly cost = ${weeklyRate*week}`)
    cy.log(`daily cost = ${day*dailyRate}`)
    cy.log(`hourly cost = ${HOURLY_RATE*hr}`)
    let totalcost= weeklyRate*week+day*dailyRate+HOURLY_RATE*hr
    cy.log(`hourly ${hr}`)
    cy.log(`days ${day}`)
    cy.log(`week ${week}`)
    return totalcost
  
  }

  it('verify hourly cost', () => {
    cy.visit('https://practice.expandtesting.com/webpark');

    // Select a random parking type
    const randomType = PARKING_TYPES[Math.floor(Math.random() * PARKING_TYPES.length)];

    cy.get('#parkingLot').select(randomType).then(() => {
      // Generate current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      const options = { hour: '2-digit', minute: '2-digit', hour12: false };
      const formattedTime = currentDate.toLocaleTimeString('en-GB', options);
      
      // Generate a random exit time
      const randomHoursToAdd = Math.floor(Math.random() * 23)+1;
      cy.log(randomHoursToAdd)
      const newTime = new Date(currentDate.getTime() + randomHoursToAdd * 60 * 60 * 1000);
      const formattedNewTime = newTime.toLocaleTimeString('en-GB', options);

      // Fill in the entry and exit details
      cy.log(formattedDate)
      cy.log(formattedTime)
      cy.log(formattedNewTime)
      cy.get('#entryDate').clear().type(formattedDate);
      cy.get('#entryTime').clear().type(formattedTime);
      cy.get('#exitDate').clear().type(formattedDate)
        cy.get('#exitTime').clear().type(formattedNewTime);
    
      // Calculate cost and verify the result
      const hourlyCost = calculateFare(randomHoursToAdd, 0, 0, randomType); // Assume randomHoursToAdd represents the hours for the cost calculation
      cy.get('#calculateCost').click().then(() => {
        cy.get('#resultValue').should('contain', hourlyCost);
           
      });
    });
  });


  it('verify daily cost', () => {
    cy.visit('https://practice.expandtesting.com/webpark');

    // Select a random parking type
    const randomType = PARKING_TYPES[Math.floor(Math.random() * PARKING_TYPES.length)];
    const type=PARKING_TYPES[randomType]

    cy.get('#parkingLot').select(randomType).then(() => {
      // Generate current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      const options = { hour: '2-digit', minute: '2-digit', hour12: false };
      const formattedTime = currentDate.toLocaleTimeString('en-GB', options);
      
      const randomDaysToAdd = Math.floor(Math.random() * 30)+1
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + randomDaysToAdd);
      const formattedNewDate = newDate.toISOString().split('T')[0];
      

      // Fill in the entry and exit details
      cy.log(formattedDate)
      cy.log(formattedTime)
      cy.log(formattedNewDate)
      cy.get('#entryDate').clear().type(formattedDate);
      cy.get('#entryTime').clear().type(formattedTime);
      cy.get('#exitDate').clear().type(formattedNewDate)
        cy.get('#exitTime').clear().type(formattedTime);
        
        const numberofweeks=Math.trunc(randomDaysToAdd/7)
        const numberofdays=Math.trunc(randomDaysToAdd%7)
        const numberofhours=Math.trunc(numberofdays/24)
        cy.log(type)
         const weeklycost=calculateFare(numberofhours,numberofdays,numberofweeks,type)
         cy.get('#calculateCost').click().then(() => {
          cy.get('#resultValue').should('contain', weeklycost);
        
        })
     
    });
  });
});
