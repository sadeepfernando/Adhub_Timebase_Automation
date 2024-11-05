/// <reference types = "cypress"/>

import scheduleAdvertising from "./pages/scheduleAdvertising";
import advertisementDetail from "../e2e/pages/advertisementDetail";

let user;


const scheduleAdd = new scheduleAdvertising();
const addDetails = new advertisementDetail();



beforeEach('userLogin', ()=>{
    cy.userLogin()

    cy.fixture('userData').then((data)=>{
        user = data;
    })
})



xdescribe('Selection channel & date page functionality', ()=>{

    const today = new Date().toISOString().slice(0,10);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    const tomorrowDate = tomorrow.toISOString().slice(0,10);

    it('Availability of UI elements ', () => {
       
        cy.url().should('be.eq','https://adhub.lk/custom-schedule')
        scheduleAdd.getTitle()
        scheduleAdd.getChannelInputField()
        scheduleAdd.getFromDate()
        scheduleAdd.getToDate()
        scheduleAdd.getHomeBtn()
        scheduleAdd.getNextBtn()

    });

    it('Verify the functionality of home btn', ()=>{

        scheduleAdd.getHomeBtn().click()
        cy.url().should('be.eq','https://adhub.lk/home')
    })


    it('Verify the functionality of Next btn with to Date blank fields', () => {
        
        scheduleAdd.getChannelInputField()
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

    // beforeEach('navigate To AddDetail',()=>{
        
    // })

    it('Visibilty of UI elements', () => {
        cy.visit('https://adhub.lk/custom-schedule')
        cy.navigateToAddDetail();
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
        
        addDetails.getChannel().select('A Plus Kids TV')
        addDetails.getStartTime().select('14:00:00')
        addDetails.getEndTime().select('15:00:00')
        addDetails.getCommercialName().type('Coca Cola{enter}')
        addDetails.getLanguage().type('English{enter}')
        addDetails.getDealType().select('TVC')
        addDetails.getCategory().select('Beverages')
        addDetails.getDuration().select('30')
        addDetails.getScheduleBtn().click()
        addDetails.getSuccessMessage().should('be.visible')
        .and('contain','Advertisement added to the schedule successfully')
        addDetails.getSpotsConatiner().should('be.visible')
        addDetails.getCommercialContainer().should('be.visible')
    });

    //TODO's : Check for empty inputs fields

})

xdescribe('Spots container functionality',()=>{

    const today = new Date().toISOString().slice(0,10);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    const tomorrowDate = tomorrow.toISOString().slice(0,10);

    beforeEach('navigate To spots container',()=>{
        cy.navigateToAddDetail();
        cy.addDetails()
    })

    it('Verify the functionality of  "+" button', () => {
        
        addDetails.getPlusIcon().click()
        cy.url().should('contain','https://adhub.lk/custom-schedule')
    });

    it('Functionality of delete icon', () => {
        addDetails.getDeleteIcon().click()
    });

    // it('Functionality of spots', () => {
        
    //     addDetails.getTodaySpot().click().clear().type('4')
    //     addDetails.clickingTheSpotsConatiner()
    //     addDetails.getTommorrowDateSpot().click().clear().type('4')
    //     addDetails.clickingTheSpotsConatiner()
    //     addDetails.CommercialContainerAfterSpots().should('be.visible')
    // });
})

