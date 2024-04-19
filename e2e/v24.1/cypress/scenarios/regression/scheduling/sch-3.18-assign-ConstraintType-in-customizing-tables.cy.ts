import { _assembliesPage, _boqPage,_common,_schedulePage, _estimatePage, _mainView, _modalView, _sidebar, _validate } from "cypress/pages";
import { app, btn, cnt, commonLocators, sidebar, tile } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_DATA_TYPES;

ALLURE.epic("SCHEDULING");
ALLURE.feature("Customizing Tables");

ALLURE.story("SCH- 3.18 | Assign 'Schedule Method' in customizing tables");
describe("SCH- 3.18 | Assign 'Schedule Method' in customizing tables", () => {
  
    before(function () {
        cy.fixture("scheduling/sch-3.18-assign-ConstraintType-in-customizing-tables.json").then((data) => {
            this.data = data;
            CONTAINERS_DATA_TYPES= this.data.CONTAINERS.DATA_TYPES
        });
          cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    }); 

    it("TC - Navigate to customizing", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_DATA_TYPES.CONSTRAINT_TYPES)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,CONTAINERS_DATA_TYPES.CONSTRAINT_TYPES)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);   
        })
    })
    it("TC - Assertion 1 Verify the  No Constraint under Constraint Types ", function () {
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES,CONTAINERS_DATA_TYPES.NO_CONSTRAINT)
        _common.select_rowHasValue(cnt.uuid.INSTANCES,CONTAINERS_DATA_TYPES.NO_CONSTRAINT)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,CONTAINERS_DATA_TYPES.NO_CONSTRAINT)
        _common.set_cellCheckboxValue(cnt.uuid.INSTANCES,app.GridCells.IS_DEFAULT,"check")
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.select_allContainerData(cnt.uuid.INSTANCES)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })
    after(() => {
    cy.LOGOUT();
    })
});