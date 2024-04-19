import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';
import common from 'mocha/lib/interfaces/common';


const PAY_GROUP_CODE='PAY-' + Cypress._.random(0, 999);
const PAY_GROUP_DESC='PAY-' + Cypress._.random(0, 999);
const EMPLOYEE_CODE='EMP-' + Cypress._.random(0, 999);
const EMPLOYEE_DESC='EMP-' + Cypress._.random(0, 999);
const TIMEKEEPING_DESC='TKD-' + Cypress._.random(0, 999);


const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_EMPLOYEES,CONTAINERS_DATA_TYPES
let PAYMENT_GROUP_PARAMETERS:DataCells,CONTAINER_COLUMNS_PAYMENT_GROUPS,CONTAINER_COLUMNS_EMPLOYEES,EMPLOYEES_PARAMETERS:DataCells

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.17 | Create Timekeeping Type in customizing module ");

describe("ETK- 1.17 | Create Timekeeping Type in customizing module ", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.17-create-timekeeping-type-in-customizing-module.json").then((data) => {
            this.data = data;

            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_PAYMENT_GROUPS=this.data.CONTAINER_COLUMNS.PAYMENT_GROUPS_LIST
            PAYMENT_GROUP_PARAMETERS = {
                [app.GridCells.CODE]:PAY_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PAY_GROUP_DESC
            },

            CONTAINER_COLUMNS_EMPLOYEES=this.data.CONTAINER_COLUMNS.EMPLOYEES
            CONTAINERS_EMPLOYEES=this.data.CONTAINERS.EMPLOYEES
            EMPLOYEES_PARAMETERS={
                [app.GridCells.CODE]: EMPLOYEE_CODE,
                [app.GridCells.DESCRIPTION_INFO]:EMPLOYEE_DESC,
                [app.GridCells.PAYMENT_GROUP_FK]:PAY_GROUP_DESC,
            }
           
        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
       
    });

    it("TC - Create Data records", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIMEKEEPING_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIMEKEEPING_TYPE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1);
        })
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS,app.GridCells.TIMESHEET_CONTEXT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_DATA_TYPES.Timesheet_Context)
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TIMEKEEPING_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_LIVE,CONTAINERS_DATA_TYPES.CHECKBOX[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS,TIMEKEEPING_DESC)
        cy.wait(1000) // Required wait to execute the Result
        _common.assert_cellData(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,TIMEKEEPING_DESC)
        _common.waitForLoaderToDisappear()
        
    })

    it("TC - Create Payment Groups", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PAYMENT_GROUPS)
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUPS_LIST, app.FooterTab.PAYMENT_GROUPS_LIST, 0);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUPS_LIST, CONTAINER_COLUMNS_PAYMENT_GROUPS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUPS_LIST)
        _timekeepingPage.enterRecord_toPaymentGroup(cnt.uuid.PAYMENT_GROUPS_LIST,PAYMENT_GROUP_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
    })

    it("TC - Create Employees", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.EMPLOYEE)
        _common.openTab(app.TabBar.EMPLOYEE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EMPLOYEES, app.FooterTab.EMPLOYEES, 0);
            _common.setup_gridLayout(cnt.uuid.EMPLOYEES, CONTAINER_COLUMNS_EMPLOYEES)
        })
       _common.waitForLoaderToDisappear()
       cy.REFRESH_CONTAINER()
       _common.waitForLoaderToDisappear()
       _common.create_newRecord(cnt.uuid.EMPLOYEES);
       _timekeepingPage.enterRecord_toCreateEmployees(cnt.uuid.EMPLOYEES,EMPLOYEES_PARAMETERS) 
       cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.clickOn_cellHasValue(cnt.uuid.EMPLOYEES,app.GridCells.DESCRIPTION_INFO,EMPLOYEE_DESC)
       _common.edit_dropdownCellWithCaret(cnt.uuid.EMPLOYEES,app.GridCells.GROUP_FK,commonLocators.CommonKeys.LIST,TIMEKEEPING_DESC)
       cy.SAVE()
       _common.search_inSubContainer(cnt.uuid.EMPLOYEES,EMPLOYEE_CODE)
       _common.waitForLoaderToDisappear()
       _common.select_rowInSubContainer(cnt.uuid.EMPLOYEES)
       cy.wait(1000) // Required wait to get result
       _common.assert_cellData(cnt.uuid.EMPLOYEES,app.GridCells.GROUP_FK,TIMEKEEPING_DESC)
    })
   
})
    after(() => {
        cy.LOGOUT();
    });
