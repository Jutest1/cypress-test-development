/// <reference types="cypress" />

import { preLoading } from "./integration/index";
import Login from "../pages/login/login-page";
import { btn, app, cnt, commonLocators } from "../locators";
import { _common, _mainView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { EST_HEADER } from "cypress/pages/variables";

const LoginPage = new Login();

// Custom reusable commands
Cypress.Commands.add("login", (username: string, password: string) => {
  LoginPage.typeUsername(username);
  Cypress.env("USER_NAME",username)
  LoginPage.typePassword(password);
  LoginPage.clickLogin();
});

Cypress.Commands.add("selectUILanguage", (UILanguageClass: string) => {
  LoginPage.selectUILanguage(UILanguageClass);
});

Cypress.Commands.add("selectDataLanguage", (DataLanguageClass: string) => {
  LoginPage.selectDataLanguage(DataLanguageClass);
});

Cypress.Commands.add("selectCompany", (parent: string, child: string) => {
  LoginPage.selectCompany(parent, child);
  LoginPage.selectContinue();
});

Cypress.Commands.add("SAVE", () => {
  return cy.get(`[class*='${app.Layouts.TOOLBAR_WH_ICONS}'] [class$='${btn.NavBar.SAVE}']`).should("exist").click();
});

Cypress.Commands.add("REFRESH_CONTAINER", () => {
  cy.get(`div.${app.Layouts.TOOLBAR_WH_ICONS} button.${btn.NavBar.REFRESH}`).should("exist").click();
  cy.wait(3000);
});

Cypress.Commands.add("REFRESH_SELECTED_ENTITIES", () => {
  cy.get(`div.${app.Layouts.TOOLBAR_WH_ICONS} button.${btn.NavBar.REFRESH_SELECTED_SELECTION}`).click();
  cy.wait(3000);
});

Cypress.Commands.add("LOGOUT", () => {
  cy.wait(2000);
  cy.get(`.menu .menu-button`).should("exist").click();
  cy.get(`.menu .dropdown-menu .ico-logout`).should("exist").last().click({ force: true });
});

Cypress.Commands.add("SETTINGS", () => {
  cy.wait(2000);
  cy.get(`.menu .menu-button`).should("exist").click();
  cy.get(`.menu .dropdown-menu .ico-settings`).should("exist").last().click({ force: true });
});

Cypress.Commands.add("GO_TO_HOME_PAGE", () => {
  return cy.get(`#mainheader > img`).first().click({ force: true });
});

Cypress.Commands.add("preLoading", preLoading);

/* Cypress.Commands.add("GO_TO_HOME_PAGE", () => {
  return cy.get(`[class='logo cursor-pointer']`).click();
}); */

Cypress.Commands.add("switchCompany", (parent: string, child: string) => {
  LoginPage.switch_CompanyInternally(parent, child);
  LoginPage.selectContinue();
});

Cypress.Commands.add("CREATE_ESTIMATE", (container_UUID: string, data: DataCells) => {
  //! This piece of code will enter estimate code when application is not generating code automatically.
  if (data[app.GridCells.CODE]) {
    _mainView
      .findModuleClientArea()
      .findAndShowContainer(container_UUID)
      .findGrid()
      .findActiveRow()
      .findCell(app.GridCells.CODE, EST_HEADER)
      .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
      .invoke("val")
      .then(function (codeVal: string) {
        if (codeVal == "") {
          _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE], EST_HEADER);
          Cypress.env("EST_CODE", data[app.GridCells.CODE]);
        } else {
          Cypress.env("EST_CODE", codeVal);
        }
      });
  }
  if (data[app.GridCells.DESCRIPTION_INFO]) {
    _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO], EST_HEADER);
  }
  if (data[app.GridCells.RUBRIC_CATEGORY_FK]) {
    _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, data[app.GridCells.RUBRIC_CATEGORY_FK], EST_HEADER);
  }
  if (data[app.GridCells.EST_TYPE_FK]) {
    _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.EST_TYPE_FK, commonLocators.CommonKeys.LIST, data[app.GridCells.EST_TYPE_FK], EST_HEADER);
  }
  //! This piece of code will enter new estimate code when the duplicate estimate code added.
  cy.get("body").then(($body) => {
    if ($body.find("[class*='invalid-cell']").length > 0) {
      let estCode = data[app.GridCells.CODE] + Cypress._.random(0, 100);
      _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, estCode, EST_HEADER);
      Cypress.env("EST_CODE", estCode);
    }
  });
});

Cypress.Commands.add("calculatePercentageAndSave", () => {
  cy.readFile("./results.json").then((inputData) => {
    const { passed, failed, tests } = inputData.totals;
    const passedPercentage = (passed / tests) * 100;

    const outputData = {
      passedPercentage,
    };

    cy.writeFile("./output-results.json", outputData);
  });

  Cypress.Commands.add("CREATE_ESTIMATE", (container_UUID: string, data: DataCells) => {
    //! This piece of code will enter estimate code when application is not generating code automatically.
    if (data[app.GridCells.CODE]) {
      _mainView
        .findModuleClientArea()
        .findAndShowContainer(container_UUID)
        .findGrid()
        .findActiveRow()
        .findCell(app.GridCells.CODE, EST_HEADER)
        .findTextInput(app.InputFields.DOMAIN_TYPE_CODE)
        .invoke("val")
        .then(function (codeVal: string) {
          if (codeVal == "") {
            _common.enterRecord_inNewRow(container_UUID, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, data[app.GridCells.CODE], EST_HEADER);
            Cypress.env("EST_CODE", data[app.GridCells.CODE]);
          } else {
            Cypress.env("EST_CODE", codeVal);
          }
        });
    }
    if (data[app.GridCells.DESCRIPTION_INFO]) {
      _common.enterRecord_inNewRow(container_UUID, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, data[app.GridCells.DESCRIPTION_INFO], EST_HEADER);
    }
    if (data[app.GridCells.RUBRIC_CATEGORY_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, data[app.GridCells.RUBRIC_CATEGORY_FK], EST_HEADER);
    }
    if (data[app.GridCells.EST_TYPE_FK]) {
      _common.edit_dropdownCellWithCaret(container_UUID, app.GridCells.EST_TYPE_FK, commonLocators.CommonKeys.LIST, data[app.GridCells.EST_TYPE_FK], EST_HEADER);
    }
    //! This piece of code will enter new estimate code when the duplicate estimate code added.
    cy.get("body").then(($body) => {
      if ($body.find("[class*='invalid-cell']").length > 0) {
        let estCode = data[app.GridCells.CODE] + Cypress._.random(0, 100);
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, estCode, EST_HEADER);
        Cypress.env("EST_CODE", estCode);
      }
    });
  });

  Cypress.Commands.add("uploadFile", (fileName: string) => {
    // Stub the onUpload() function to prevent its default behavior
    // cy.window().then((win: any) => { // Explicitly type win as any
    //     cy.stub(win, "onUpload").as("uploadStub");
    // });

    // Locate the element that triggers the file upload
    cy.get('[data-ng-click="onUpload()"]').as("uploadButton");

    // Trigger click event on the upload button
    cy.get("@uploadButton").click();

    // Wait for the onUpload() function to be called
    cy.wait("@uploadStub").then(() => {
        // Add your logic here to handle the file upload process triggered by onUpload()
        // This may involve using cy.fixture() to read the file content and simulate the upload process
        cy.fixture(fileName).then((fileContent: any) => { // Explicitly type fileContent as any
            // For demonstration, you can log the file content
            cy.log("File content:", fileContent);

            // Add further logic to handle the file upload process
            // For example, you might send the file content to a server endpoint
        });
    });
});



});

declare global {
  namespace Cypress {
    interface Chainable {
      uploadFile: (fileName:string) => Chainable<any>
      login: (username: string, password: string) => Chainable<any>;
      selectUILanguage: (UILanguageClass: string) => Chainable<any>;
      selectDataLanguage: (DataLanguageClass: string) => Chainable<any>;
      selectCompany: (parent: string, child: string) => Chainable<any>;
      SAVE(): Chainable<any>;
      LOGOUT(): Chainable<any>;
      SETTINGS(): Chainable<any>;
      //GO_TO_HOME_PAGE(): Chainable<any>;
      REFRESH_CONTAINER(): Chainable<any>;
      REFRESH_SELECTED_ENTITIES(): Chainable<any>;
      GO_TO_HOME_PAGE(): Chainable<any>;
      preLoading: (username: string, password: string, parentCompany: string, childCompany: string) => Chainable<any>;
      switchCompany: (parent: string, child: string) => Chainable<any>;
      calculatePercentageAndSave(): Chainable<any>;
      CREATE_ESTIMATE: (container_UUID: string, data: DataCells) => Chainable<any>;
    }
  }
}
