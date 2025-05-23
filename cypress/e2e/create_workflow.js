// <reference types="cypress"/>

it('login test', function(){
    cy.visit('http://localhost:8000/')
    
    cy.get('#_username').type('leaneo@leaneo.com')
    cy.get('#_password').type('01089999Ww!')
    cy.get('#_login').click()

    cy.get('#formulaires').click();
    cy.wait(1000);


    // Thêm mới Workflows
    cy.get('[data-cy="btn-add-workflow"]', { timeout: 10000 })
        .wait(1000)
        .should('be.visible')
        .click({ force: true })
    cy.randomString(10).then((text) => {
        cy.get('[data-cy="edition-workflow-name"]').type(text);
    });
    cy.wait(1000)
    cy.get('[class="v-color-picker__color"]').first().click();
    cy.get('#edition-workflow-validate').click();

    cy.wait(1000);
    //Thêm mới Tableau de bord
    cy.get('[data-cy="tableau-creation__btn"]', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });
    

    

 
});



