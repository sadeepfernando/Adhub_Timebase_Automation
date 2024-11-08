class paymentOptions{

    getVisaMethod(){
        return cy.get('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)')
    }

    getNextBtn(){
        return cy.get('#next-btn')
    }
}

export default paymentOptions;