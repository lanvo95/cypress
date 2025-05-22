/// <reference types="cypress"/>

it("open web",() => {
    cy.visit("https://course.letskodeit.com/practice");
    cy.get("#bmwradio").click();
    cy.get("#name").type("sample text");
});

it("todo mvc", () => {
    cy.visit("https://todomvc.com/examples/react/#/");
    cy.get(".new-todo").type("task #110 {enter}");
});