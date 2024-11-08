/// <reference types = "cypress"/>


import scheduleAdvertising from "../e2e/pages/scheduleAdvertising";
import advertisementDetails from "../e2e/pages/advertisementDetail";
import viewCart from "../e2e/pages/viewCart";
import paymentOptions from "../e2e/pages/paymentOptions";
import giniePage from "../e2e/pages/giniePage";
import paymentProviders from "../e2e/pages/paymentProviders";

const scheduleAdd = new  scheduleAdvertising();
const addDetails = new advertisementDetails();
const cartDetails = new viewCart()
const paymentMethods = new paymentOptions();
const ginieIntegration = new giniePage();
const cardDetails = new paymentProviders();


let user;

beforeEach('Log to the System', ()=>{
    cy.userLogin()
    cy.visit('/custom-schedule')
    
   
    cy.fixture('userData').then((data)=>{
        user = data;
    })
})


describe('Selection channel & date page functionality', ()=>{

    const today = new Date().toISOString().slice(0,10);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    const tomorrowDate = tomorrow.toISOString().slice(0,10);

    it('Availability of UI elements ', () => {
       
        scheduleAdd.getTitle().should('be.visible')
        scheduleAdd.getChannelInputField().should('be.visible')
        scheduleAdd.getFromDate().should('be.visible')
        scheduleAdd.getToDate().should('be.visible')
        scheduleAdd.getHomeBtn().should('be.visible')
        scheduleAdd.getNextBtn().should('be.visible')

    });

    it('Verify the functionality of home btn', ()=>{

        scheduleAdd.getHomeBtn().click()
        cy.url().should('be.eq',"https://adhub.lk/home")
    })


    it('Verify the functionality of Next btn with to Date blank fields', () => {
        
        scheduleAdd.getChannelInputField().type(user.channel)
        scheduleAdd.getFromDate().type(today)
        scheduleAdd.getNextBtn().click({force:true})
        scheduleAdd.getErrorMessage().should('be.visible')
        scheduleAdd.getToDateError().should('be.visible')
    });

    it('Verify the functionality of Next btn with from Date blank fields', () => {
        
        scheduleAdd.getChannelInputField()
        scheduleAdd.getToDate().type(tomorrowDate)
        scheduleAdd.getNextBtn().click({force:true})
        scheduleAdd.getErrorMessage().should('be.visible')
        scheduleAdd.getFromDateError().should('be.visible')
    });

    it('Verify the functionality of Next btn with channel blank fields', () => {
        
        scheduleAdd.getFromDate().type(today)
        scheduleAdd.getToDate().type(tomorrowDate)
        scheduleAdd.getNextBtn().click({force:true})
        scheduleAdd.getErrorMessage().should('be.visible')
        scheduleAdd.getChannelListError().should('be.visible')
    });

    it('Next btn functionality with valid inputs', () => {
        
        scheduleAdd.getChannelInputField().type(user.channel+'{enter}')
        scheduleAdd.getChannelInputField().type(user.channel_2+'{enter}')
        scheduleAdd.getFromDate().type(today)
        scheduleAdd.getToDate().type(tomorrowDate)
        scheduleAdd.getNextBtn().click({force:true})
        cy.url().should('include','https://adhub.lk/custom-schedule/time-based-schedule')

    });

   
})