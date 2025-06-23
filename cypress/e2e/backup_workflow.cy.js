import { PREFIX_NAME } from "../../../constants/general";

const accounts = Cypress.config("accounts");

const urlDefault = "/formulaires";

const retries = {
  runMode: 3,
  openMode: 1,
};

describe("Test CRUD workflow model", { retries }, () => {
  Cypress.session.clearAllSavedSessions();
  beforeEach(() => {
    cy.loginLeaneoV2(
      accounts.utilisateur.userName,
      accounts.utilisateur.password
    );
    cy.intercept("GET", "/api/v2/permission/get*").as("apiGetPermission");
    cy.visit(urlDefault);
    cy.wait("@apiGetPermission");
  });

  it("should CRUD workflow when sub menu is closed", () => {
    const createName = `${PREFIX_NAME} - WF_${Date.now()}`;
    const updateName = `${PREFIX_NAME} - WF_2_${Date.now()}`;
    cy.get("#edition-create-workflow").click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-name]").type(createName);
      cy.get("input[data-cy=edition-workflow-name]").blur();
      cy.get("input[data-cy=edition-workflow-user-color]").check({
        force: true,
      });
    });
    cy.get("#edition-workflow-validate").click();
    cy.get("#edition-workflow-list > div").then((items) => {
      expect(items.length).to.be.greaterThan(0);
      cy.get("#edition-workflow-form").should("not.exist");
    });
    cy.contains('DIV[id^="workflow"] SPAN', createName)
      .scrollIntoView()
      .should("be.visible");

    // Update name workflow
    cy.contains('DIV[id^="workflow"]', createName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', createName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=properties]")
      .click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-name]").clear().type(updateName);
      cy.get("input[data-cy=edition-workflow-name]").blur();
    });
    cy.get("#edition-workflow-validate").click();
    cy.get("div[data-cy=notification]")
      .first()
      .children("div")
      .first()
      .should("contain", "Modifié avec succès.");
    cy.contains('DIV[id^="workflow"] SPAN', updateName)
      .scrollIntoView()
      .should("be.visible");

    // Update color workflow
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=color]")
      .click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-user-color]").parent().click();
      cy.get("div[data-cy=edition-workflow-color]")
        .children("div")
        .first()
        .children("div")
        .first()
        .children("div")
        .first()
        .children("div")
        .first()
        .click();
    });
    cy.get("#edition-workflow-validate").click();
    cy.get("div[data-cy=notification]")
      .first()
      .children("div")
      .first()
      .should("contain", "Modifié avec succès.");

    // Remove workflow
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=remove]")
      .click();
    cy.get("div[data-cy=confirm-card]")
      .children(".v-card__actions")
      .children("button[data-cy=delete]")
      .click();
    cy.contains(
      "div[data-cy=notification] div",
      "Supprimé avec succès."
    ).should("be.visible");
  });

  it("should CRUD workflow with user color", () => {
    const createName = `${PREFIX_NAME} - WF_${Date.now()}`;
    const updateName = `${PREFIX_NAME} - WF_2_${Date.now()}`;
    cy.get("#edition-create-workflow").click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-name]").type(createName);
      cy.get("input[data-cy=edition-workflow-name]").blur();
      cy.get("input[data-cy=edition-workflow-user-color]").check({
        force: true,
      });
    });
    cy.intercept("POST", "/api/v2/workflow/create").as("apiCreateWorkflow");

    cy.get("#edition-workflow-validate").click();
    cy.wait("@apiCreateWorkflow").then((resCreateWorkflow) => {
      expect(resCreateWorkflow.response.statusCode).eq(201);
      cy.get("#edition-workflow-list > div").then((items) => {
        expect(items.length).to.be.greaterThan(0);
        cy.get("#edition-workflow-form").should("not.exist");
      });
      cy.contains('DIV[id^="workflow"] SPAN', createName)
        .scrollIntoView()
        .should("be.visible");

      // Update name workflow
      cy.contains('DIV[id^="workflow"]', createName)
        .scrollIntoView()
        .should("be.visible")
        .trigger("mouseenter")
        .last()
        .click();
      cy.contains('DIV[id^="workflow"]', createName)
        .scrollIntoView()
        .should("be.visible")
        .children("#menu-actions")
        .first()
        .click();
      cy.get("div[data-cy=edition-workflow-list-item-menu]")
        .children("div[data-cy=properties]")
        .click();
      cy.get("#edition-workflow-form").within(() => {
        cy.get("input[data-cy=edition-workflow-name]").clear().type(updateName);
        cy.get("input[data-cy=edition-workflow-name]").blur();
      });
      cy.get("#edition-workflow-validate").click();
      cy.get("div[data-cy=notification]")
        .first()
        .children("div")
        .first()
        .should("contain", "Modifié avec succès.");
      cy.contains('DIV[id^="workflow"] SPAN', updateName)
        .scrollIntoView()
        .should("be.visible");

      // Update color workflow
      cy.contains('DIV[id^="workflow"]', updateName)
        .scrollIntoView()
        .should("be.visible")
        .trigger("mouseenter")
        .last()
        .click();
      cy.contains('DIV[id^="workflow"]', updateName)
        .scrollIntoView()
        .should("be.visible")
        .children("#menu-actions")
        .first()
        .click();
      cy.get("div[data-cy=edition-workflow-list-item-menu]")
        .children("div[data-cy=color]")
        .click();
      cy.get("#edition-workflow-form").within(() => {
        cy.get("input[data-cy=edition-workflow-user-color]").parent().click();
        cy.get("div[data-cy=edition-workflow-color]")
          .children("div")
          .first()
          .children("div")
          .first()
          .children("div")
          .first()
          .children("div")
          .first()
          .click();
      });
      cy.get("#edition-workflow-validate").click();
      cy.get("div[data-cy=notification]")
        .first()
        .children("div")
        .first()
        .should("contain", "Modifié avec succès.");

      // Remove workflow
      cy.contains('DIV[id^="workflow"]', updateName)
        .scrollIntoView()
        .should("be.visible")
        .trigger("mouseenter")
        .last()
        .click();
      cy.contains('DIV[id^="workflow"]', updateName)
        .scrollIntoView()
        .should("be.visible")
        .children("#menu-actions")
        .first()
        .click();
      cy.get("div[data-cy=edition-workflow-list-item-menu]")
        .children("div[data-cy=remove]")
        .click();
      cy.get("div[data-cy=confirm-card]")
        .children(".v-card__actions")
        .children("button[data-cy=delete]")
        .click();
      cy.contains(
        "div[data-cy=notification] div",
        "Supprimé avec succès."
      ).should("be.visible");
    });
  });

  it("should CRUD workflow with step color", () => {
    const createName = `${PREFIX_NAME} - WF_${Date.now()}`;
    const updateName = `${PREFIX_NAME} - WF_2_${Date.now()}`;
    const updateNameStep = `${PREFIX_NAME} - SWF_2_${Date.now()}`;
    cy.get("#edition-create-workflow").click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-name]").type(createName);
      cy.get("input[data-cy=edition-workflow-step-color]").check({
        force: true,
      });
    });
    cy.get("input[data-cy=edition-workflow-step-color]").should("be.checked");
    cy.get("input[data-cy=edition-workflow-user-color]").should(
      "not.be.checked"
    );
    // check empty color board
    cy.get("div[data-cy=edition-workflow-color]")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("div")
      .each(($event) => {
        expect(
          0,
          $event
            .children("div")
            .first()
            .children("div")
            .first()
            .children("span").length
        );
      });
    cy.get("#edition-workflow-validate").click();
    cy.get("#edition-workflow-list > div").then((items) => {
      expect(items.length).to.be.greaterThan(0);
      cy.get("#edition-workflow-form").should("not.exist");
    });
    cy.contains('DIV[id^="workflow"] SPAN', createName)
      .scrollIntoView()
      .should("be.visible");

    const nth = 1;
    cy.get(`[data-cy="workflow-stepper"] .root:nth-child(${nth})`)
      .trigger("mouseenter")
      .get('[data-cy="workflow-stepper"] #menu-actions [data-cy="button-menu"]')
      .click();
    cy.get('#inspire  .v-menu__content [data-cy="button-rename"]').click();
    cy.get("div[data-cy=edition-stepper-color]")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("div")
      .first()
      .children("div")
      .first()
      .click();
    cy.get(".v-dialog .v-btn")
      .contains("VALIDER", { matchCase: false })
      .click();

    // Update name workflow
    cy.contains('DIV[id^="workflow"]', createName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', createName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=properties]")
      .click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-name]").clear().type(updateName);
      cy.get("input[data-cy=edition-workflow-name]").blur();
    });
    cy.get("#edition-workflow-validate").click();
    cy.get("div[data-cy=notification]")
      .first()
      .children("div")
      .first()
      .should("contain", "Modifié avec succès.");

    // Update step color workflow
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=color]")
      .click();
    cy.get("input[data-cy=edition-workflow-user-color]").should(
      "not.be.checked"
    );
    cy.get("input[data-cy=edition-workflow-step-color]").should("be.checked");
    cy.get("#edition-workflow-cancel").click();

    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get(`[data-cy="workflow-stepper"] .root:nth-child(${nth})`)
      .trigger("mouseenter", { force: true })
      .get('[data-cy="workflow-stepper"] #menu-actions [data-cy="button-menu"]')
      .click();
    cy.get('#inspire  .v-menu__content [data-cy="button-rename"]').click();
    cy.get("input[data-cy=nom-step]")
      .should("be.visible")
      .should("not.be.disabled")
      .type("{selectall}{backspace}")
      .type(updateNameStep)
      .blur();
    cy.get(".v-color-picker__swatches > div")
      .children(".v-color-picker__swatch")
      .eq(1)
      .children(".v-color-picker__color")
      .eq(1)
      .click();
    cy.get(".v-dialog .v-btn")
      .contains("VALIDER", { matchCase: false })
      .click();

    // Remove workflow
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=remove]")
      .click();
    cy.get("div[data-cy=confirm-card]")
      .children(".v-card__actions")
      .children("button[data-cy=delete]")
      .click();
    cy.contains(
      "div[data-cy=notification] div",
      "Supprimé avec succès."
    ).should("be.visible");
  });

  it("should CRUD workflow with workflow color", () => {
    const createName = `${PREFIX_NAME} - WF_${Date.now()}`;
    const updateName = `${PREFIX_NAME} - WF_2_${Date.now()}`;
    // Create workflow
    cy.get("#edition-create-workflow").click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-name]").type(createName);
      cy.get("input[data-cy=edition-workflow-user-color]").parent().click();
      cy.get("div[data-cy=edition-workflow-color]")
        .children("div")
        .first()
        .children("div")
        .first()
        .children("div")
        .first()
        .children("div")
        .first()
        .click();
    });
    cy.get("#edition-workflow-validate").click();
    cy.get("#edition-workflow-list > div").then((items) => {
      expect(items.length).to.be.greaterThan(0);
      cy.get("#edition-workflow-form").should("not.exist");
    });
    cy.contains('DIV[id^="workflow"] SPAN', createName)
      .scrollIntoView()
      .should("be.visible");

    const nth = 1;
    cy.get(`[data-cy="workflow-stepper"] .root:nth-child(${nth})`)
      .trigger("mouseenter")
      .get('[data-cy="workflow-stepper"] #menu-actions [data-cy="button-menu"]')
      .click();
    cy.get('#inspire  .v-menu__content [data-cy="button-rename"]').click();
    cy.get("div[data-cy=edition-stepper-color]").should("not.exist");
    cy.get(".v-dialog .v-btn")
      .contains("ANNULER", { matchCase: false })
      .click();

    // Update workflow
    cy.contains('DIV[id^="workflow"]', createName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', createName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=properties]")
      .click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-name]").clear().type(updateName);
      cy.get("input[data-cy=edition-workflow-name]").blur();
    });
    cy.get("#edition-workflow-validate").click();
    cy.get("div[data-cy=notification]")
      .first()
      .children("div")
      .first()
      .should("contain", "Modifié avec succès.");
    cy.contains('DIV[id^="workflow"] SPAN', updateName)
      .scrollIntoView()
      .should("be.visible");

    // Update color workflow
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=color]")
      .click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-user-color]")
        .parent()
        .should("not.be.visible");
      cy.get(".v-color-picker__swatches > div")
        .children(".v-color-picker__swatch")
        .eq(1)
        .children(".v-color-picker__color")
        .eq(0)
        .click();
    });
    cy.get("#edition-workflow-validate").click();
    cy.get("div[data-cy=notification]")
      .first()
      .children("div")
      .first()
      .should("contain", "Modifié avec succès.");

    // Remove workflow
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .trigger("mouseenter")
      .last()
      .click();
    cy.contains('DIV[id^="workflow"]', updateName)
      .scrollIntoView()
      .should("be.visible")
      .children("#menu-actions")
      .first()
      .click();
    cy.get("div[data-cy=edition-workflow-list-item-menu]")
      .children("div[data-cy=remove]")
      .click();
    cy.get("div[data-cy=confirm-card]")
      .children(".v-card__actions")
      .children("button[data-cy=delete]")
      .click();
    cy.contains(
      "div[data-cy=notification] div",
      "Supprimé avec succès."
    ).should("be.visible");
  });

  it("should CRUD workflow without name", () => {
    const createName = `${PREFIX_NAME} - WF_${Date.now()}`;
    cy.get("#edition-create-workflow").click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-name]").type(createName);
      cy.get("input[data-cy=edition-workflow-user-color]").parent().click();
    });
    cy.get("#edition-workflow-validate").should("be.disabled");
  });

  it("should CRUD workflow without color", () => {
    cy.get("#edition-create-workflow").click();
    cy.get("#edition-workflow-form").within(() => {
      cy.get("input[data-cy=edition-workflow-user-color]").parent().click();
      cy.get("div[data-cy=edition-workflow-color]")
        .children("div")
        .first()
        .children("div")
        .first()
        .children("div")
        .first()
        .children("div")
        .first()
        .click();
    });
    cy.get("#edition-workflow-validate").should("be.disabled");
  });

  it("should close workflow dialog", () => {
    cy.get("#edition-create-workflow").click();
    cy.get("#edition-workflow-cancel").click();
    cy.get("#edition-workflow-form").should("not.exist");
  });

  after(() => {
    cy.removeWorkflowByName(`${PREFIX_NAME} - WF_`);
    cy.removeWorkflowByName(`${PREFIX_NAME} - WF_2_`);
  });
});
