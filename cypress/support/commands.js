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
// Cypress.Commands.add('login', (email, password) => { ... })
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

import adhublogin from "../e2e/pages/adhubLogin"
import scheduleAdvertising from '../e2e/pages/scheduleAdvertising';
import advertisementDetails from "../e2e/pages/advertisementDetail";

const today = new Date().toISOString().slice(0,10);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+1);
const tomorrowDate = tomorrow.toISOString().slice(0,10);

const scheduleAdd = new scheduleAdvertising();
const login_pom = new adhublogin();
const addDetails = new advertisementDetails();

Cypress.Commands.add('userLogin',()=>{

    cy.fixture('userData').then((user)=>{

        cy.session('LoginSession',()=>{
            cy.visit('https://adhub.lk/sign-in')
            login_pom.getUsername().type(user.username)
            login_pom.getPassword().type(user.password)
            login_pom.getSubmitBtn().click({force:true})
            login_pom.getTimeBaseAdds().click()

        })
    })
})


 
Cypress.Commands.add('navigateToAddDetail',()=>{
    
    cy.fixture('userData').then((user)=>{

        cy.session('selectChannelSession',()=>{
            cy.userLogin();
            scheduleAdd.visitScheduleAddPage()
            scheduleAdd.getChannelInputField().type(user.Channel+"{enter}")
            scheduleAdd.getFromDate().type(today)
            scheduleAdd.getToDate().type(tomorrowDate)
            scheduleAdd.getNextBtn().click({force:true})
            cy.url().then((url)=>{
                cy.visit(url);
            })
            
            
        })
    })
})

Cypress.Commands.add('addDetails',()=>{
    const addDetails = new advertisementDetails()

    
    cy.fixture('userData').then((data)=>{
        addDetails.getChannel().select(data.channel)
        addDetails.getStartTime().select(data.startTime)
        addDetails.getEndTime().select(data.endTime)
        addDetails.getCommercialName().type(data.commercialName)
        addDetails.getLanguage().type('English{enter}')
        addDetails.getDealType().select('TVC')
        addDetails.getCategory().select('Beverages')
        addDetails.getDuration().select('30')
        addDetails.getScheduleBtn().click()
        addDetails.getSuccessMessage().should('be.visible')
        .and('contain','Advertisement added to the schedule successfully')
        addDetails.getSpotsConatiner().should('be.visible')
        addDetails.getCommercialContainer()
    })
})
