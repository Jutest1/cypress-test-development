import { _assembliesPage, _boqPage,_common,_schedulePage, _estimatePage, _mainView, _modalView, _sidebar, _validate } from "cypress/pages";
import { app, btn, cnt, commonLocators, sidebar, tile } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_DATA_TYPES;
let CONTAINER_COLUMNS_COMPANY;

ALLURE.epic("SCHEDULING");
ALLURE.feature("Customizing Tables");

ALLURE.story("SCH- 3.22 |Assign 'Schedule Context' in customizing tables");
describe("SCH- 3.22 | Assign 'Schedule Context' in customizing tables", () => {
  
    before(function () {
        cy.fixture("scheduling/sch-3.22-assign-ScheduleContext-in-customizing-tables.json").then((data) => {
            this.data = data;
            CONTAINERS_DATA_TYPES= this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_COMPANY =this.data.CONTAINER_COLUMNS.COMPANY
        });
          cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    }); 

    it("TC - Navigate to Company", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.COMPANY);
        _common.openTab(app.TabBar.COMPANY).then(() => {
        _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
        _common.setup_gridLayout(cnt.uuid.COMPANIES,CONTAINER_COLUMNS_COMPANY)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COMPANIES,CONTAINERS_DATA_TYPES.COMPANY_NAME)
    })
    it("TC - Assertion 1 Verify the  CIS Certificate under Company ", function () {
        _common.clear_subContainerFilter(cnt.uuid.COMPANIES)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.COMPANIES,app.GridCells.SCHEDULING_CONTEXT_FK,CONTAINERS_DATA_TYPES.SCHEDULING_CONTEXT)
    })
    after(() => {
    cy.LOGOUT();
    })
});