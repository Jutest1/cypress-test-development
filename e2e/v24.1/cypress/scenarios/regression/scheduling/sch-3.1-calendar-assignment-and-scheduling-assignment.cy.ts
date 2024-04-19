import {_projectPage, _assembliesPage, _boqPage,_common,_schedulePage, _estimatePage, _mainView, _modalView, _sidebar, _validate } from "cypress/pages";
import { app, btn, cnt, commonLocators, sidebar, tile } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO="PRJ-SCH" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES;
let CONTAINER_COLUMNS_COMPANY;
let CONTAINER_COLUMNS_CALENDAR
let PROJECTS_PARAMETERS 

ALLURE.epic("SCHEDULING");
ALLURE.feature("Company");

ALLURE.story("SCH- 3.1 | Calendar assignment and scheduling assignment");
describe("SCH- 3.1 | Calendar assignment and scheduling assignment", () => {
  
    before(function () {
        cy.fixture("scheduling/sch-3.1-calendar-assignment-and-scheduling-assignment.json").then((data) => {
            this.data = data;
            CONTAINERS_DATA_TYPES= this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_COMPANY =this.data.CONTAINER_COLUMNS.COMPANY
            CONTAINER_COLUMNS_CALENDAR = this.data.CONTAINER_COLUMNS.CALENDAR
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:"SmiJ"
            }
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
    it("TC - Verify the Calender is default ", function () { 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.CALENDAR);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CALENDER).then(() => {
        _common.setDefaultView(app.TabBar.CALENDER)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.SCHEDULE, app.FooterTab.CALENDARS, 2);
        _common.setup_gridLayout(cnt.uuid.SCHEDULE,CONTAINER_COLUMNS_CALENDAR)

        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULE)
        _common.search_inSubContainer(cnt.uuid.SCHEDULE,CONTAINERS_DATA_TYPES.CALENDAR_CODE)
       _common.assert_cellData_insideActiveRow(cnt.uuid.SCHEDULE,app.GridCells.CODE,CONTAINERS_DATA_TYPES.CALENDAR_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.SCHEDULE,app.GridCells.IS_DEFAULT,"check")
    });
    it('TC - Create project and verify the default calender', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);		
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.setDefaultView(app.TabBar.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        cy.SAVE();          
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECTS,app.GridCells.CALENDAR_FK,CONTAINERS_DATA_TYPES.CALENDAR_CODE)
    })
    after(() => {
    cy.LOGOUT();
    })
});