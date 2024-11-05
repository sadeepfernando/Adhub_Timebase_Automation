class adhublogin{


    getUsername(){
        return cy.get('.form-group.mb-3 > .form-control')
    }

    getPassword(){
        return cy.get('#password')
    }

    getSubmitBtn(){
        return  cy.get('#signin-with-credentials > .row > .btn')
    }

    getPasswordMasking(){
        return cy.get('#eye-icon')
    }

    getCheckbox(){
        return cy.get('[name="remember-me"]')
    }

    getForgotPassword(){
        return cy.get('.gray')
    }

    getRetailConnection(){
        return cy.get('#log-using-retailer-id')
    }

    getTimeBaseAdds(){
        return cy.get(':nth-child(4) > .row > :nth-child(3) > a > .card')
    }
}

export default adhublogin;