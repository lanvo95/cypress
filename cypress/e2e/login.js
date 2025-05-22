// <reference types="cypress"/>

it('login test', function(){
    cy.visit('http://localhost:8000/')
    
    cy.get('#_username').type('leaneo@leaneo.com')
    cy.get('#_password').type('01089999Ww!')
    cy.get('#_login').click()
})