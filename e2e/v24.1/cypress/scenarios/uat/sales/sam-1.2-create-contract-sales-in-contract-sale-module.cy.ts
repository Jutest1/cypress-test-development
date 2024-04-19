import { tile, cnt, app } from "cypress/locators";
import AppLayout from "cypress/locators/app-layout";
import { _common, _projectPage, _salesPage } from "cypress/pages";


const allure = Cypress.Allure.reporter.getInterface();

allure.epic("SALES");
allure.feature("Sales - Contract");
allure.story("SAM- 1.2 | Create contract sales in contract sales module");

describe("SAM- 1.2 | Create contract sales in contract sales module", () => {
  before(() => {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
  });
  
  
  it("TC - Create new record in contract module", () => {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar("standard",Cypress.env('PROJECT_NUMBER')).pinnedItem();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar("quickstart", "Contract Sales");
    _common.openTab(AppLayout.tabBar.Contracts)
    _common.create_newRecord(cnt.uuid.CONTACTS);
    _salesPage.enterRecord_toCreateContract("Contract Description","Adolf Koch", Cypress.env('PROJECT_NUMBER'));
  
  })
    

  it("TC - Verify Net Amount Of Contract", () => {
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.CONTACTS,app.FooterTab.CONTRACTS)
    })
     //_salesPage.verify_Net_Amount_Of_Contract();
  });

  it("TC - Verify value of final price, quantity, contract sales", () => {
    _common.openTab(app.tabBar.contractBOQ);
    _common.select_tabFromFooter(cnt.uuid.CONTACTS, "Contracts");
    _salesPage.verifyValue_of_finalprice_quantity_contractsales("Project BoQ", "Contract sales");

  });

  after(()=>{
    cy.LOGOUT();
  })
});
