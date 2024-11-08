class paymentProviders{
    getCardName(){
        return cy.get('[name="cardName"]')
    }

    getCardNumber(){
        return cy.get('#pp-payment-card-number')
    }

    getExpireDate(){
        return cy.get('#pp-payment-card-expiry')
    }

    getCardCvv(){
        return cy.get('#pp-payment-card-cvv')
    }

    getPayBtn(){
        return cy.get('#pp-submit-button')
    }
}

export default paymentProviders