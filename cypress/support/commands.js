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
import scheduleAdvertising from "../e2e/pages/scheduleAdvertising";
import advertisementDetails from "../e2e/pages/advertisementDetail";
import viewCart from "../e2e/pages/viewCart";
import paymentOptions from "../e2e/pages/paymentOptions";
import giniePage from "../e2e/pages/giniePage";
import paymentProviders from "../e2e/pages/paymentProviders";

const today = new Date().toISOString().slice(0,10);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+1);
const tomorrowDate = tomorrow.toISOString().slice(0,10);

const scheduleAdd = new scheduleAdvertising();
const login_pom = new adhublogin();
const addDetails = new advertisementDetails();
const cartDetails = new viewCart();
const paymentMethods = new paymentOptions();
const ginieIntegration = new giniePage();
const cardDetails = new paymentProviders();

Cypress.Commands.add('userLogin',()=>{

    cy.fixture('userData').then((user)=>{

        cy.session('LoginSession',()=>{
            cy.visit('/sign-in')
            login_pom.getUsername().type(user.username)
            login_pom.getPassword().type(user.password)
            login_pom.getSubmitBtn().click({force:true})
            login_pom.getTimeBaseAdds().click({force:true})
            cy.url().should('be.eq', 'https://adhub.lk/custom-schedule');
        })
    })
})


Cypress.Commands.add('scheduleTheAdvertisement',()=>{
    cy.fixture('userData').then((user)=>{
        scheduleAdd.getChannelInputField().type(user.channel+'{enter}')
        scheduleAdd.getFromDate().type(today)
        scheduleAdd.getToDate().type(tomorrowDate)
        scheduleAdd.getNextBtn().click({force:true})
        // cy.wait(1000)
        // cy.url().then((url)=>{
        //     cy.writeFile('cypress/fixtures/dynamicUrl.json',{url:url})
        // })
    })
})

Cypress.Commands.add('AdvertisementDetails',()=>{
    cy.fixture('userData').then((user)=>{
        addDetails.getChannel().select(user.channel)
        addDetails.getStartTime().select(user.startTime)
        addDetails.getEndTime().select(user.endTime)
        addDetails.getCommercialName().type(user.commercialName+'{enter}')
        addDetails.getLanguage().select(user.language)
        addDetails.getDealType().select(user.dealType)
        addDetails.getCategory().select(user.category)
        addDetails.getDuration().select(user.duration)
        addDetails.getScheduleBtn().click()
    })
})

Cypress.Commands.add('spotConatiner',()=>{
    cy.fixture('userData').then((user)=>{
        addDetails.getTodaySpot().click().clear().type('4')
        addDetails.clickingTheSpotsConatiner()
        addDetails.getTommorrowDateSpot().click().clear().type('4')
        addDetails.clickingTheSpotsConatiner()
        addDetails.CommercialContainerAfterSpots().should('be.visible')
        addDetails.getAddToCartBtn().click({force:true})
        addDetails.getAddToCartConfirmation().should('be.visible')
        addDetails.getConfirmationYesBtn().click()
    })
})


Cypress.Commands.add('viewCartProceed',()=>{
    cartDetails.getProceedToCheckoutBtn().click()
})

Cypress.Commands.add('PaymentMethodSelection',()=>{
    paymentMethods.getVisaMethod().click()
    paymentMethods.getNextBtn().click()
})

Cypress.Commands.add('ginieProceed',()=>{
    ginieIntegration.getCheckBox().click()
    ginieIntegration.getPayNowBtn().click()
})

Cypress.Commands.add('getShadowElement',(selector,shadowSelector)=>{
    return cy.get(selector).shadow().find(shadowSelector);
})



  