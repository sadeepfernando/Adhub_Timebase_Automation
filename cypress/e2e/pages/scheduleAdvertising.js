class scheduleAdvertising{

    getTitle(){
        return cy.get('.text-center')
    }

    getFromDate(){
        return cy.get('#from_date')
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