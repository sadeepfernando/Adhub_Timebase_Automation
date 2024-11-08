class giniePage{

    getCheckBox(){
        return cy.get('#checkbox-id');
    }

    getPayNowBtn(){
        return cy.get('.sc-cidDSM.jPqdFG');
    }
}

export default  giniePage;