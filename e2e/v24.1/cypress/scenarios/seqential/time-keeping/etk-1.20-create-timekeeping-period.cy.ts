import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';


const TK_GROUP_CODE='TK-' + Cypress._.random(0, 999);
const TK_GROUP_DESC='TK-' + Cypress._.random(0, 999);
const PERIOD_CODE='PR-' + Cypress._.random(0, 999);
const PERIOD_DESC='PR-' + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let PERIODS_PARAMETERS:DataCells
let CONTAINERS_PERIODS,CONTAINERS_COMPANY
let TIMEKEEPING_GROUPS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_TIMEKEEPING_GROUPS,CONTAINER_COLUMNS_PERIODS

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.20 | Create timekeeping period");

describe("ETK- 1.20 | Create timekeeping period", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.20-create-timekeeping-period.json").then((data) => {
            this.data = data;
           
            CONTAINERS_COMPANY=this.data.CONTAINERS.COMPANY
            CONTAINER_COLUMNS_TIMEKEEPING_GROUPS=this.data.CONTAINER_COLUMNS.TIMEKEEPING_GROUPS
            TIMEKEEPING_GROUPS_PARAMETERS={
                [app.GridCells.CODE]: TK_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TK_GROUP_DESC
            },
            
            CONTAINER_COLUMNS_PERIODS=this.data.CONTAINER_COLUMNS.PERIODS
            CONTAINERS_PERIODS=this.data.CONTAINERS.PERIODS
            PERIODS_PARAMETERS={
                [app.GridCells.CODE]: PERIOD_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PERIOD_DESC,
                [app.GridCells.START_DATE]:_common.getDate(CONTAINERS_PERIODS.START_DATE),
                [app.GridCells.END_DATE_SMALL]:_common.getDate(CONTAINERS_PERIODS.END_DATE,1),
                [app.GridCells.TIME_KEEPING_GROUP_FK]:TK_GROUP_CODE,
                [app.GridCells.PAYROLL_YEAR]:CONTAINERS_PERIODS.PAY_YEAR
            }            
           
        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        
    });
    
    it("TC - Search for companies and create Timekeeping Groups", function () {
        _common.waitForLoaderToDisappear()
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
        _common.waitForLoaderToDisappear()
    })
   
    it("TC - Create Time-Keeping Periods", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIMEKEEPING_PERIOD)
        _common.openTab(app.TabBar.PERIOD).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PERIOD, app.FooterTab.PERIODS, 0);
            _common.setup_gridLayout(cnt.uuid.PERIOD, CONTAINER_COLUMNS_PERIODS)
        })
       _common.waitForLoaderToDisappear()
       _common.clear_subContainerFilter(cnt.uuid.PERIOD)
       _common.waitForLoaderToDisappear()
       _common.create_newRecord(cnt.uuid.PERIOD)
       _timekeepingPage.enterRecord_toCreatePeriods(cnt.uuid.PERIOD,PERIODS_PARAMETERS) 
       cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.search_inSubContainer(cnt.uuid.PERIOD,PERIOD_CODE)
        cy.wait(1000) // Required wait to execute the Result
        _common.assert_cellData(cnt.uuid.PERIOD,app.GridCells.CODE,PERIOD_CODE)
        
    })
   
})
    after(() => {
        cy.LOGOUT();
    });
