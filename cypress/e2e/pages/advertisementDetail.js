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
        return cy.get('[id^="cse_"][id*="@2024-11-04"]')

    }

    getTommorrowDateSpot(){
        return cy.get('[id^="cse_"][id*="@2024-11-05"]')
    }

    getDeleteIcon(){
        return cy.xpath('//i[@class="fs-5 fa fa-trash-o text-danger"]')
    }

    getPlusIcon(){
        return cy.get('.add-new.d-flex.justify-content-center.align-items-center')
    }

    clickingTheSpotsConatiner(){
        return  cy.get('#tab0 > .table-responsive',{timeout:5000}).click()
    }

    CommercialContainerAfterSpots(){
        return cy.get('#checkout_container > :nth-child(1)')
    }
}

export default advertisementDetails;