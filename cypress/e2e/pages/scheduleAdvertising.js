class scheduleAdvertising{

    visitScheduleAddPage(){
        return cy.visit('https://adhub.lk/custom-schedule')
    }

    getTitle(){
        return cy.get('.text-center').should('be.visible')
    }

    getFromDate(){
        return cy.get('#from_date').should('be.visible')
    }

    getToDate(){
        return cy.get('#to_date')
    }

    getHomeBtn(){
        return cy.get('.col-lg-4 > .btn-pink-outline')
    }

    getNextBtn(){
        return cy.get('#cs_save_time_based')
    }

    getChannelInputField(){
        return cy.get('.select2-selection')
    }

    getErrorMessage(){
        return cy.get('.toast-message')
    }

    getChannelListError(){
        return cy.get('#channel_list-error')
    }

    getFromDateError(){
        return cy.get('#from_date-error')
    }

    getToDateError(){
        return cy.get('#to_date-error')
    }

}

export default scheduleAdvertising;