import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';
import common from 'mocha/lib/interfaces/common';



const TK_GROUP_CODE='TK-' + Cypress._.random(0, 999);
const TK_GROUP_DESC='TK-' + Cypress._.random(0, 999);
const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_COMPANY
let TIMEKEEPING_GROUPS_PARAMETERS:DataCells,CONTAINER_COLUMNS_TIMEKEEPING_GROUPS

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.15 | Create timekeeping group for employee in company module ");

describe("ETK- 1.15 | Create timekeeping group for employee in company module ", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.15-create-timekeeping-group-for-employee-in-company-module.json").then((data) => {
            this.data = data;

            CONTAINERS_COMPANY=this.data.CONTAINERS.COMPANY
            CONTAINER_COLUMNS_TIMEKEEPING_GROUPS=this.data.CONTAINER_COLUMNS.TIMEKEEPING_GROUPS
            TIMEKEEPING_GROUPS_PARAMETERS={
                [app.GridCells.CODE]: TK_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TK_GROUP_DESC
            }

        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
       
    });

    it("TC - Search for companies and create Timekeeping Groups in Company Module", function () {
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY)
        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
        })
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.COMPANIES)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.COMPANIES,CONTAINERS_COMPANY.RIB)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COMPANIES,CONTAINERS_COMPANY.RIB)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TIMEKEEPING_GROUP, app.FooterTab.TIMEKEEPING_GROUPS, 1);
            _common.setup_gridLayout(cnt.uuid.TIMEKEEPING_GROUP, CONTAINER_COLUMNS_TIMEKEEPING_GROUPS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIMEKEEPING_GROUP)
        _timekeepingPage.enterRecord_toCreateTimekeepingGroups(cnt.uuid.TIMEKEEPING_GROUP,TIMEKEEPING_GROUPS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.TIMEKEEPING_GROUP,TK_GROUP_CODE)
        cy.wait(1000) // Required wait to execute the Result
        _common.assert_cellData(cnt.uuid.TIMEKEEPING_GROUP,app.GridCells.CODE,TK_GROUP_CODE)
        _common.assert_cellData(cnt.uuid.TIMEKEEPING_GROUP,app.GridCells.DESCRIPTION_INFO,TK_GROUP_DESC)
    })
    
})
    after(() => {
        cy.LOGOUT();
    });
