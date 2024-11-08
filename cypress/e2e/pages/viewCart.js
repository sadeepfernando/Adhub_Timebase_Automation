class viewCart{

    getProceedToCheckoutBtn(){
        return cy.get('#checkout-cart-btn')
    }

    getBackToHomeBtn(){
        return cy.get('.col-lg-6 > .btn-pink-outline')
    }

}

export default viewCart;