import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';
import common from 'mocha/lib/interfaces/common';


const PAY_GROUP_CODE='PAY-' + Cypress._.random(0, 999);
const PAY_GROUP_DESC='PAY-' + Cypress._.random(0, 999);
const SHIFT_MOD_DESC='SHIFT-' + Cypress._.random(0, 999);
const TK_GROUP_CODE='TK-' + Cypress._.random(0, 999);
const TK_GROUP_DESC='TK-' + Cypress._.random(0, 999);
const EMPLOYEE_CODE='EMP-' + Cypress._.random(0, 999);
const EMPLOYEE_DESC='EMP-' + Cypress._.random(0, 999);


const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_SHIFT_MODELS,CONTAINERS_EMPLOYEES,CONTAINERS_COMPANY
let PAYMENT_GROUP_PARAMETERS:DataCells,SHIFT_MODELS_PARAMETERS:DataCells,TIMEKEEPING_GROUPS_PARAMETERS:DataCells,CONTAINER_COLUMNS_PAYMENT_GROUPS,CONTAINER_COLUMNS_SHIFT_MODELS,CONTAINER_COLUMNS_TIMEKEEPING_GROUPS,CONTAINER_COLUMNS_EMPLOYEES,EMPLOYEES_PARAMETERS:DataCells

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.16 | Create Employee ");

describe("ETK- 1.16 | Create Employee ", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.16-create-employee.json").then((data) => {
            this.data = data;

           
            CONTAINER_COLUMNS_PAYMENT_GROUPS=this.data.CONTAINER_COLUMNS.PAYMENT_GROUPS_LIST
            PAYMENT_GROUP_PARAMETERS = {
                [app.GridCells.CODE]:PAY_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PAY_GROUP_DESC
            },

            CONTAINERS_COMPANY=this.data.CONTAINERS.COMPANY
            CONTAINER_COLUMNS_TIMEKEEPING_GROUPS=this.data.CONTAINER_COLUMNS.TIMEKEEPING_GROUPS
            TIMEKEEPING_GROUPS_PARAMETERS={
                [app.GridCells.CODE]: TK_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TK_GROUP_DESC
            },

            CONTAINER_COLUMNS_SHIFT_MODELS=this.data.CONTAINER_COLUMNS.SHIFT_MODELS
            CONTAINERS_SHIFT_MODELS=this.data.CONTAINERS.SHIFT_MODELS
            SHIFT_MODELS_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]: SHIFT_MOD_DESC,
                [app.GridCells.CALENDAR_FK]: CONTAINERS_SHIFT_MODELS.CALENDAR
            },
           
            CONTAINER_COLUMNS_EMPLOYEES=this.data.CONTAINER_COLUMNS.EMPLOYEES
            CONTAINERS_EMPLOYEES=this.data.CONTAINERS.EMPLOYEES
            EMPLOYEES_PARAMETERS={
                [app.GridCells.CODE]: EMPLOYEE_CODE,
                [app.GridCells.DESCRIPTION_INFO]:EMPLOYEE_DESC,
                [app.GridCells.START_DATE]: _common.getDate(CONTAINERS_EMPLOYEES.START_DATE),
                [app.GridCells.SHIFT_FK]:SHIFT_MOD_DESC,
                [app.GridCells.TIME_KEEPING_GROUP_FK]:TK_GROUP_CODE,
                [app.GridCells.PAYMENT_GROUP_FK]:PAY_GROUP_DESC,
                [app.GridCells.GENERATE_RECORDING]:CONTAINERS_EMPLOYEES.CHECKBOX,
                [app.GridCells.IS_CREW_LEADER]:CONTAINERS_EMPLOYEES.CHECKBOX
                
            }
           
        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
       
    });

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

    it("TC - Search for companies and create Timekeeping Groups", function () {
    
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
    })
    
    it("TC - Create Shift model", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.SHIFT_MODEL)
        _common.openTab(app.TabBar.SHIFT_MODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SHIFT_MODELS, app.FooterTab.SHIFT_MODELS, 0);
            _common.setup_gridLayout(cnt.uuid.SHIFT_MODELS, CONTAINER_COLUMNS_SHIFT_MODELS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.SHIFT_MODELS)
        _timekeepingPage.enterRecord_toShiftModal(cnt.uuid.SHIFT_MODELS,SHIFT_MODELS_PARAMETERS)
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
       _common.edit_containerCell(cnt.uuid.EMPLOYEES,app.GridCells.FIRST_NAME,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_EMPLOYEES.FIRST_NAME)
       _common.edit_containerCell(cnt.uuid.EMPLOYEES,app.GridCells.FAMILY_NAME,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_EMPLOYEES.FAMILY_NAME)
       cy.SAVE()
       _common.search_inSubContainer(cnt.uuid.EMPLOYEES,EMPLOYEE_CODE)
       _common.waitForLoaderToDisappear()
       cy.wait(1000) // Required wait to get result
       _common.assert_cellData(cnt.uuid.EMPLOYEES,app.GridCells.CODE,EMPLOYEE_CODE)
       _common.assert_cellData(cnt.uuid.EMPLOYEES,app.GridCells.DESCRIPTION_INFO,EMPLOYEE_DESC)

    })
   
})
    after(() => {
        cy.LOGOUT();
    });
