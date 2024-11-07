/// <reference types="cypress" />

describe('verify input fields', () => {

  function calculateFare(hr,day,week,type) {
    let hourlyrate=2;
    let dailyrate=type==='Long-Term Garage Parking'?12:10
    let weeklyrate=type==='Long-Term Garage Parking'?72:60
    let cost=0;
    if(week!=0)
    {
      cost=week*weeklyrate
    }
    else if(day!=0)
    {
      cost=dailyrate*day
    }
    else{
      cost=hourlyrate*hr
    }
  }
 
  it('verify hourly cost', () => {
    cy.visit('https://practice.expandtesting.com/webpark')    
    var parkingtypes=['Long-Term Garage Parking','Long-Term Surface Parking']
    const randomType = types[Math.floor(Math.random() * types.length)];
    var type=types[randomType]
    cy.wrap(type).then(()=>{
      cy.get('#parkingLot').select(type).then(()=>{

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const currentTime = new Date();
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedTime = currentTime.toLocaleTimeString('en-GB', options);
        const randomHoursToAdd = Math.floor(Math.random() * 12) 
        const newTime = new Date(currentTime.getTime() + randomHoursToAdd * 60 * 60 * 1000);
        const formattednewTime = newTime.toLocaleTimeString('en-GB', options);
        cy.get('#entryDate'.type(formattedDate))
        cy.get('#entryTime').type(formattedTime)
        cy.get('#exitDate').type(formattedDate)
        cy.get('#exitTime').type(formattednewTime)
        cy.get('#calculateCost').click().then(()=>{
          const hrlycost=calculateFare(randomhr,0,0)
          cy.get('#resultValue').contains(hrlycost)

        })
        
         

      
   
  })

      })
    })
    

  it('verify weekly cost', () => {
    cy.visit('https://practice.expandtesting.com/webpark')    
    var parkingtypes=['Long-Term Garage Parking','Long-Term Surface Parking']
    const randomType = types[Math.floor(Math.random() * types.length)];
    var type=types[randomType]

    // test for parking hrs 
    const randomhr = types[Math.floor(Math.random() * 24)];
    const hrlycost=calculateFare(randomhr,0,0)

     // test for parking days

     const randomdays = types[Math.floor(Math.random() * 30)];
     const numberofweeks=randomdays/7
     if(numberofweeks>0)
     {
      cost=calculateFare(0,0,numberofweeks)
     }
    else
    {
      cost=calculateFare(0,randomdays,0)
    }

        

    
  })


})
