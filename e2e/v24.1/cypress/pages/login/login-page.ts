import { commonLocators, btn } from "cypress/locators";

export class LoginPage {
  elements = {
    usernameInput: () => cy.get("#username"),
    passwordInput: () => cy.get("#password"),
    loginBtn: () => cy.get("#loginbutton"),
    treeHead: () => cy.get("[class*='tree-branch-head']"),
    companyFlex: () => cy.get("#company-scroller"),
    treeItems: () => cy.get("[class*='tree-label flex-element']"),
    continue: () => cy.get("[class*='ok btn']"),
  };

  typeUsername(username: string) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password: string) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.loginBtn().click();
  }

  selectCompany(parentCompany: string, childCompany: string) {
    this.elements.companyFlex().then((company) => {
      const cmpy = cy.wrap(company, { timeout: 30000, log: true }).contains("li", parentCompany, { timeout: 30000 });
      if (cmpy) {
        cmpy.then((data) => {
          if (data.hasClass("tree-expanded")) {
            cmpy.get("treeitem").contains(childCompany).dblclick();
          } else {
            cmpy.find('[class*="tree-branch-head"]', { timeout: 30000 }).click().get("treeitem", { timeout: 30000 }).contains(childCompany).click();
          }
        });
      }
    });
  }

  selectUILanguage(UILanguageClass: string) {
    cy.wait(500);
    cy.get(".modal-body .platform-form-group div.platform-form-col [data-ng-model='uiLangOptions.selectedUiLang']", { timeout: 20000 }).first().click({ force: true });
    cy.wait(500);
    cy.get("div.popup-content").within(()=>{
        cy.get("li").each(($li)=>{
            const lang:string= $li.text();
            if(UILanguageClass === lang){
              cy.wait(500);
              cy.log("UI language is matched....")
              cy.wrap($li).click();
              return false;
            }
        })
      })
  }

  selectDataLanguage(DataLanguageClass: string) {
    cy.wait(500);
    cy.get(".modal-body .platform-form-group div.platform-form-col [data-ng-model='dataLangOptions.selectedDataLang']", { timeout: 20000 }).first().click({ force: true });
    cy.wait(500);
    cy.get("div.popup-content").within(()=>{
      cy.get("li").each(($li)=>{
          const lang:string= $li.text();
          if(DataLanguageClass === lang){
            cy.wait(500);
            cy.log("Data language is matched....")
            cy.wrap($li).click();
            return false;
          }
      })
    })
  }

  selectContinue() {
    this.elements.continue().click();
  }


    /* switch company internally */
  switch_CompanyInternally(parentCompany:string,childCompany:string)
{
  cy.get(`[class*="${commonLocators.CommonElements.MENU}"]`)
    .find(`button.${btn.NavBar.MENU_BUTTON}`)
    .click({force:true})
  cy.get(`button.${btn.IconButtons.ICO_COMPANY}`).click({force:true})
  this.elements.companyFlex().then((company) => {
    const cmpy = cy
        .wrap(company, {timeout: 30000, log: true})
        .contains("li", parentCompany, {timeout: 30000});
    if (cmpy) {
        cmpy.then((data) => {
            if (data.hasClass("tree-expanded")) {
                cmpy.get("treeitem").contains(childCompany).click({force:true});
            } else {
                cmpy.find('[class*="tree-branch-head"]', {timeout: 30000})
                    .click()
                    .get("treeitem", {timeout: 30000})
                    .contains(childCompany)
                    .click({force:true});
            }
        });
    }
});
}
}

export default LoginPage;
