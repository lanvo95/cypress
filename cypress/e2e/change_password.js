// <reference types="cypress"/>

// it('login test', function(){
//     cy.visit('http://localhost:8000/')
    
//     cy.contains('Oublié').click()
//     cy.get('#input-6').type('leaneo@leaneo.com')
//     cy.wait(4000)
//     cy.contains('valider').click()
// })

describe("change password test", () => {
    const namespace = "yournamespace";
    const testEmailAddress = `test${new Date().getTime()}@leaneo.com`;

    it('send mail to change password', () => {
        cy.visit('http://localhost:8000/')
        cy.contains('Oublié').click()
        cy.get('#input-6').type(testEmailAddress)
        cy.contains('valider').click()

    it("Gets a password reset email", () => {
    cy.mailiskSearchInbox(namespace, {
      to_addr_prefix: testEmailAddress,
      subject_includes: "password",
    }).then((response) => {
      expect(response.data).to.not.be.empty;
      const email = response.data[0];
      expect(email.subject).to.equal("La réception du mail peut prendre quelques minutes. N’hésitez pas à vérifier dans vos spam.");
      resetLink = email.text.match(/.(https:\/\/localhost:8000\/reset_password\/.*)>\n*/)[1];
      expect(resetLink).to.not.be.undefined;
    });
  })
    })
})


