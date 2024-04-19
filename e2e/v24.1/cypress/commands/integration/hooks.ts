

export function _preLoading(username: string, password: string, companyName: string, companyDomian: string){
    const LOGIN_SET_NUMBER = Cypress._.random(1, 20); // Randomly select a set number
    const CREDENTIALS = Cypress.env(`LoginSet${LOGIN_SET_NUMBER}`);
    cy.clearAllCookies()
    cy.visit('/loginPage');
    cy.login(CREDENTIALS.username, CREDENTIALS.password);
    cy.wait(3000)
    cy.selectUILanguage("English (en)");
    cy.selectDataLanguage("English (en)");
    cy.selectCompany(Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
};