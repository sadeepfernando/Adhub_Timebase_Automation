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
        scheduleAdd.getFromDate().type(today)
        scheduleAdd.getToDate().type(tomorrowDate)
        scheduleAdd.getNextBtn().click({force:true})
        cy.url().should('include','https://adhub.lk/custom-schedule/time-based-schedule')

    });

   
})


describe('Advertising Details page',()=>{
     
    beforeEach('scheduleAdvertisement',()=>{
        cy.scheduleTheAdvertisement()

        // cy.fixture('dynamicUrl').then((data)=>{
        //     cy.visit(data.url)
        // })
        
    })


    it('Visibilty of UI elements', () => {
            
                addDetails.getChannel()
                addDetails.getStartTime().should('be.visible')
                addDetails.getEndTime().should('be.visible')
                addDetails.getCommercialName().should('be.visible')
                addDetails.getLanguage().should('be.visible')
                addDetails.getDealType().should('be.visible')
                addDetails.getCategory().should('be.visible')
                addDetails.getDuration().should('be.visible')
                addDetails.getScheduleBtn().should('be.visible')
            });
 
  

    it('functionality of add to schedule button with filled fields', () => {

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
        addDetails.getSuccessMessage().should('be.visible')
        .and('contain','Advertisement added to the schedule successfully')
        addDetails.getSpotsConatiner().should('be.visible')
        addDetails.getCommercialContainer().should('be.visible')
        })
        
    });

    //TODO's : Check for empty inputs fields

})

describe('Spots container functionality',()=>{


    beforeEach('navigate To spots container',()=>{
        cy.scheduleTheAdvertisement();
        cy.AdvertisementDetails();
    })

    xit('Verify the functionality of  "+" button', () => {
        
        addDetails.getPlusIcon().click()
        cy.url().should('contain','https://adhub.lk/custom-schedule')
    });

    xit('Functionality of delete icon', () => {
        addDetails.getDeleteIcon().click()
    });

    it('Functionality of spots', () => {
        
        addDetails.getTodaySpot().click().clear().type('4')
        addDetails.clickingTheSpotsConatiner()
        addDetails.getTommorrowDateSpot().click().clear().type('4')
        addDetails.clickingTheSpotsConatiner()
        addDetails.CommercialContainerAfterSpots().should('be.visible')
        addDetails.getAddToCartBtn().click({force:true})
        addDetails.getAddToCartConfirmation().should('be.visible')
        
    });


    it('Fuctionality of the add to cart btn', () => {
        
        addDetails.getTodaySpot().click().clear().type('4')
        addDetails.clickingTheSpotsConatiner()
        addDetails.getTommorrowDateSpot().click().clear().type('4')
        addDetails.clickingTheSpotsConatiner()
        addDetails.CommercialContainerAfterSpots().should('be.visible')
        addDetails.getAddToCartBtn().click({force:true})
        addDetails.getAddToCartConfirmation().should('be.visible')
        addDetails.getConfirmationYesBtn().click()
        cy.url().should('contain','https://adhub.lk/custom-schedule/view-my-cart')
        
    });
})

describe('view cart page functionality',()=>{

    beforeEach('navigation',()=>{
        cy.scheduleTheAdvertisement();
        cy.AdvertisementDetails();
        cy.spotConatiner();
    })

    it('Proceed to checkout btn functionality', () => {
        cartDetails.getProceedToCheckoutBtn().click()
        cy.url().should('contain','https://adhub.lk/payment-option/payment-options-sc?')
        
    });
})


describe('payment options page functionality',()=>{

    beforeEach('navigation',()=>{
        cy.scheduleTheAdvertisement();
        cy.AdvertisementDetails();
        cy.spotConatiner();
        cy.viewCartProceed();
    })

    it('functionality of the payment options next btn', () => {
        paymentMethods.getVisaMethod().click()
        paymentMethods.getNextBtn().click()
    });
})

describe('Ginie Payment page',()=>{
    beforeEach('navigation',()=>{
        cy.scheduleTheAdvertisement();
        cy.AdvertisementDetails();
        cy.spotConatiner();
        cy.viewCartProceed();
        cy.PaymentMethodSelection();
    })

    it('Check box ticking', () => {
        
        ginieIntegration.getCheckBox().click()
        ginieIntegration.getPayNowBtn().click()
        cy.url().should('include','https://transaction.uat.geniebiz.lk')

    });
})

describe('Card details page',()=>{
    
    beforeEach('navigation',()=>{
        cy.scheduleTheAdvertisement();
        cy.AdvertisementDetails();
        cy.spotConatiner();
        cy.viewCartProceed();
        cy.PaymentMethodSelection();
        cy.ginieProceed();
    })

    it('functionality of Pay btn', () => {

        cy.getShadowElement(cardDetails.getCardName(), 'input').type(user.cardName);
        cy.getShadowElement(cardDetails.getCardNumber(), 'input').type(user.cardNumber);
        cy.getShadowElement(cardDetails.getExpireDate(), 'input').type(user.expireDate);
        cy.getShadowElement(cardDetails.getCardCvv(), 'input').type(user.CVV);
        cy.getShadowElement(cardDetails.getPayBtn(), 'button').click();
    });
})

