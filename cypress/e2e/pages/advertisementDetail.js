class advertisementDetails{

   
    getChannel(){
        return cy.get('#selectChannel')
    }

    getStartTime(){
        return cy.get('#startTime')
    }

    getEndTime(){
        return cy.get('#endTime')
    }

    getCommercialName(){
        return cy.get('#commercialName')
    }

    getLanguage(){
        return cy.get('#language')
    }

    getDealType(){
        return cy.get('#dealType')
    }

    getCategory(){
        return cy.get('#category')
    }

    getDuration(){
        return cy.get('#duration')
    }

    getScheduleBtn(){
        return cy.get('#add-to-schedule')
    }

    getSuccessMessage(){
        return cy.get('.toast-message')
    }

    getSpotsConatiner(){
        return cy.get('#spots_container')
    }

    getCommercialContainer(){
        return cy.get('#commercials_container')
    }

    getTodaySpot(){
        const today = new Date().toISOString().slice(0,10);
        
       
        return cy.get(`[id^="cse_"][id*="@${today}"]`)

    }

    getTommorrowDateSpot(){
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        const tomorrowDate = tomorrow.toISOString().slice(0,10);
        return cy.get(`[id^="cse_"][id*="@${tomorrowDate}"]`)
    }

    getDeleteIcon(){
        return cy.xpath('//i[@class="fs-5 fa fa-trash-o text-danger"]')
    }

    getPlusIcon(){
        return cy.get('.add-new.d-flex.justify-content-center.align-items-center')
    }

    clickingTheSpotsConatiner(){
        return  cy.get('#tab0 > .table-responsive').click()
    }

    CommercialContainerAfterSpots(){
        return cy.get('#checkout_container > :nth-child(1)')
    }

    getAddToCartBtn(){
        return cy.get('#add-to-cart-btn')
    }

    getAddToCartConfirmation(){
        return cy.get('#emptyFileModal > .modal-dialog > .modal-content > .modal-body')
    }

    getConfirmationYesBtn(){
        return cy.get('#yes-button')
    }
}

export default advertisementDetails;