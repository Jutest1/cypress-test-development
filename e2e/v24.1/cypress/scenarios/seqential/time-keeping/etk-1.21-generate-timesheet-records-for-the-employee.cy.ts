import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';


const PAY_GROUP_CODE='PAY-' + Cypress._.random(0, 999);
const PAY_GROUP_DESC='PAY-' + Cypress._.random(0, 999);
const COMMENT_TEXT='TEXT-' + Cypress._.random(0, 9999);
const SHIFT_MOD_DESC='SHIFT-' + Cypress._.random(0, 999);
const TIME_SYMBOL_CODE='TI-SYMB-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC='TI-SYMB-' + Cypress._.random(0, 999);
const WORKING_TI_MOD_DESC='WTM-' + Cypress._.random(0, 999);
const TK_GROUP_CODE='TK-' + Cypress._.random(0, 999);
const TK_GROUP_DESC='TK-' + Cypress._.random(0, 999);
const EMPLOYEE_CODE='EMP-' + Cypress._.random(0, 999);
const EMPLOYEE_DESC='EMP-' + Cypress._.random(0, 999);
const PERIOD_CODE='PR-' + Cypress._.random(0, 999);
const PERIOD_DESC='PR-' + Cypress._.random(0, 999);
const CREW_CODE='CREW-' + Cypress._.random(0, 999);

const WORKING_TIME_DESC = 'WT-DESC-' + Cypress._.random(0, 999);


const ALLURE = Cypress.Allure.reporter.getInterface();

let PAYMENT_GROUP_PARAMETERS:DataCells
let CONTAINER_COLUMNS_PAYMENT_GROUPS
let CONTAINER_COLUMNS_TIME_SYMBOLS;
let CONTAINERS_TIME_SYMBOLS;
let TIME_SYMBOLS_PARAMETERS:DataCells;
let  CONTAINERS_SHIFT_MODELS, CONTAINERS_WORKING_TIMES;
let  CONTAINER_COLUMNS_SHIFT_MODELS, CONTAINER_COLUMNS_WORKING_TIMES;
let  SHIFT_MODELS_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS_1: DataCells, WORKING_TIMES_PARAMETERS_2: DataCells, WORKING_TIMES_PARAMETERS_3: DataCells, WORKING_TIMES_PARAMETERS_4: DataCells;


let  CONTAINER_COLUMNS_WORKING_TIME_MODELS,CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS
let CONTAINERS_WORKING_TIME_MODELS,CONTAINERS_WORKING_TIME_MODEL_DAYS
let WORKING_TIME_MODELS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_1:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_2:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_3:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_4:DataCells


let EMPLOYEES_PARAMETERS:DataCells,PERIODS_PARAMETERS:DataCells,TIMEKEEPING_GROUPS_PARAMETERS:DataCells
let CONTAINERS_EMPLOYEES,CONTAINERS_PERIODS,CONTAINERS_COMPANY

let CONTAINER_COLUMNS_TIMEKEEPING_GROUPS,CONTAINER_COLUMNS_EMPLOYEES,CONTAINER_COLUMNS_PERIODS


ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.21 | Generate timesheet records for the employee");

describe("ETK- 1.21 | Generate timesheet records for the employee", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.21-generate-timesheet-records-for-the-employee.json").then((data) => {
            this.data = data;
            
            CONTAINER_COLUMNS_PAYMENT_GROUPS=this.data.CONTAINER_COLUMNS.PAYMENT_GROUPS_LIST
            PAYMENT_GROUP_PARAMETERS = {
                [app.GridCells.CODE]:PAY_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PAY_GROUP_DESC
            }

            CONTAINER_COLUMNS_TIME_SYMBOLS=this.data.CONTAINER_COLUMNS.TIME_SYMBOLS
            CONTAINERS_TIME_SYMBOLS=this.data.CONTAINERS.TIME_SYMBOLS
            TIME_SYMBOLS_PARAMETERS={
                [app.GridCells.CODE]: TIME_SYMBOL_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TIME_SYMBOL_DESC,
                [app.GridCells.IS_PRESENCE]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.IS_PRODUCTIVE]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.IS_WTM_RELEVANT]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.VALUATION_PERCENT]: CONTAINERS_TIME_SYMBOLS.VAL_PERCENTAGE,
                [app.GridCells.VALUATION_RATE]: CONTAINERS_TIME_SYMBOLS.VAL_RATE,
                [app.GridCells.TIME_SYMBOL_TYPE_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_TYPE,
                [app.GridCells.TIME_SYMBOL_GROUP_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_GROUP              
            }

            CONTAINER_COLUMNS_SHIFT_MODELS = this.data.CONTAINER_COLUMNS.SHIFT_MODELS
            CONTAINERS_SHIFT_MODELS = this.data.CONTAINERS.SHIFT_MODELS
            SHIFT_MODELS_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: SHIFT_MOD_DESC,
                [app.GridCells.CALENDAR_FK]: CONTAINERS_SHIFT_MODELS.CALENDAR
            }
            CONTAINER_COLUMNS_WORKING_TIMES = this.data.CONTAINER_COLUMNS.WORKING_TIMES
            CONTAINERS_WORKING_TIMES = this.data.CONTAINERS.WORKING_TIMES
            WORKING_TIMES_PARAMETERS = {
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[0],
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TIME_DESC,
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[0],
                [app.GridCells.FROM_TIME]: CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]: CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]: TIME_SYMBOL_DESC,
                [app.GridCells.BREAK_FROM]: CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]: CONTAINERS_WORKING_TIMES.BREAKTO[0]
            }
            WORKING_TIMES_PARAMETERS_1 = {
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[1],
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TIME_DESC,
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[1],
                [app.GridCells.FROM_TIME]: CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]: CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]: TIME_SYMBOL_DESC,
                [app.GridCells.BREAK_FROM]: CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]: CONTAINERS_WORKING_TIMES.BREAKTO[0]
            }
            WORKING_TIMES_PARAMETERS_2 = {
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[2],
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TIME_DESC,
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[2],
                [app.GridCells.FROM_TIME]: CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]: CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]: TIME_SYMBOL_DESC,
                [app.GridCells.BREAK_FROM]: CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]: CONTAINERS_WORKING_TIMES.BREAKTO[0]
            }
            WORKING_TIMES_PARAMETERS_3 = {
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[3],
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TIME_DESC,
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[3],
                [app.GridCells.FROM_TIME]: CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]: CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]: TIME_SYMBOL_DESC,
                [app.GridCells.BREAK_FROM]: CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]: CONTAINERS_WORKING_TIMES.BREAKTO[0]
            }
            WORKING_TIMES_PARAMETERS_4 = {
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[4],
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TIME_DESC,
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[4],
                [app.GridCells.FROM_TIME]: CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]: CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]: TIME_SYMBOL_DESC,
                [app.GridCells.BREAK_FROM]: CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]: CONTAINERS_WORKING_TIMES.BREAKTO[0]
            }

            CONTAINERS_WORKING_TIME_MODELS=this.data.CONTAINERS.WORKING_TIME_MODELS
            CONTAINER_COLUMNS_WORKING_TIME_MODELS=this.data.CONTAINER_COLUMNS.WORKING_TIME_MODELS
            WORKING_TIME_MODELS_PARAMETERS={
                [app.GridCells.IS_DEFAULT]: CONTAINERS_WORKING_TIME_MODELS.CHECKBOX,
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TI_MOD_DESC
            },
            CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS=this.data.CONTAINER_COLUMNS.WORKING_TIME_MODEL_DAYS
            CONTAINERS_WORKING_TIME_MODEL_DAYS=this.data.CONTAINERS.WORKING_TIME_MODEL_DAYS
            WORKING_TIME_MODEL_DAYS_PARAMETERS={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[0],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS
            },
            WORKING_TIME_MODEL_DAYS_PARAMETERS_1={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[1],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS,
            },
            WORKING_TIME_MODEL_DAYS_PARAMETERS_2={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[2],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS,
            },
            WORKING_TIME_MODEL_DAYS_PARAMETERS_3={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[3],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS,
            },
            WORKING_TIME_MODEL_DAYS_PARAMETERS_4={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[4],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS,
            }

            CONTAINERS_COMPANY=this.data.CONTAINERS.COMPANY
            CONTAINER_COLUMNS_TIMEKEEPING_GROUPS=this.data.CONTAINER_COLUMNS.TIMEKEEPING_GROUPS
            TIMEKEEPING_GROUPS_PARAMETERS={
                [app.GridCells.CODE]: TK_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TK_GROUP_DESC
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
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()

    }) 
          
   

    it("TC - Create Payment Groups List and Payment Group Rate ", function () {
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
   
    it("TC - Create Time symbols for Regular Work", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIME_SYSBOLS)
        _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.TIME_SYMBOLS, app.FooterTab.TIME_SYMBOLS);
            _common.setup_gridLayout(cnt.uuid.TIME_SYMBOLS, CONTAINER_COLUMNS_TIME_SYMBOLS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateTimeSymbols(TIME_SYMBOLS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it("TC - Create shift model and working times", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.SHIFT_MODEL)
        _common.openTab(app.TabBar.SHIFT_MODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SHIFT_MODELS, app.FooterTab.SHIFT_MODELS, 0)
            _common.setup_gridLayout(cnt.uuid.SHIFT_MODELS, CONTAINER_COLUMNS_SHIFT_MODELS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.SHIFT_MODELS)
        _timekeepingPage.enterRecord_toShiftModal(cnt.uuid.SHIFT_MODELS, SHIFT_MODELS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.SHIFT_MODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WORKING_TIME, app.FooterTab.WORKING_TIMES, 1)
            _common.setup_gridLayout(cnt.uuid.WORKING_TIME, CONTAINER_COLUMNS_WORKING_TIMES)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.WORKING_TIME)
        _common.create_newRecord(cnt.uuid.WORKING_TIME)
        _timekeepingPage.enterRecord_toCreateWorkingTimes(WORKING_TIMES_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME)
        _timekeepingPage.enterRecord_toCreateWorkingTimes(WORKING_TIMES_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME)
        _timekeepingPage.enterRecord_toCreateWorkingTimes(WORKING_TIMES_PARAMETERS_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME)
        _timekeepingPage.enterRecord_toCreateWorkingTimes(WORKING_TIMES_PARAMETERS_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME)
        _timekeepingPage.enterRecord_toCreateWorkingTimes(WORKING_TIMES_PARAMETERS_4)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.WORKING_TIME)
    })

    it("TC - Create Working time model and add working time model days", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WORKING_TIME_MODEL)
        _common.openTab(app.TabBar. WORKTIMEMODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WORKING_TIME_MODELS, app.FooterTab.WORKING_TIME_MODELS, 0);
            _common.setup_gridLayout(cnt.uuid.WORKING_TIME_MODELS, CONTAINER_COLUMNS_WORKING_TIME_MODELS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODELS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModels(WORKING_TIME_MODELS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar. WORKTIMEMODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WORKING_TIME_MODEL_DAYS, app.FooterTab.WORKING_TIME_MODEL_DAYS, 1);
            _common.setup_gridLayout(cnt.uuid.WORKING_TIME_MODEL_DAYS, CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_4)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

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
    })
    it("TC - Create Periods", function () {
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
    })

    it("TC -Verify generate timesheet record", function () {
        
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_TIME_SHEET_RECORDS);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
       
    })

    it("TC -Verify generate timesheet record in employee sheets and reports", function () {
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIMEKEEPING)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        cy.wait(1000)//required wait
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.REVIEW_RECORDINGS).then(() => {
            _common.setDefaultView(app.TabBar.REVIEW_RECORDINGS,"Default")
            _common.select_tabFromFooter(cnt.uuid.CREW_RECORDING, app.FooterTab.CREW_RECORDINGS, 0);
            
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.CREW_RECORDING)
        _common.search_inSubContainer(cnt.uuid.CREW_RECORDING,SHIFT_MOD_DESC)
        _common.select_rowInContainer(cnt.uuid.CREW_RECORDING)
       
        _common.openTab(app.TabBar.REVIEW_RECORDINGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EMPLOYEE_SHEET, app.FooterTab.EMPLOYEE_SHEETS,1);
            _common.waitForLoaderToDisappear()
        })
        _common.clear_subContainerFilter(cnt.uuid.EMPLOYEE_SHEET)
        _common.select_rowInContainer(cnt.uuid.EMPLOYEE_SHEET)
        
        _common.openTab(app.TabBar.REVIEW_RECORDINGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EMPLOYEE_REPORT, app.FooterTab.EMPLOYEE_REPORTS, 1);
        })
        _common.clear_subContainerFilter(cnt.uuid.EMPLOYEE_REPORT)
        _common.assert_cellDataByContent_inContainer(cnt.uuid.EMPLOYEE_REPORT,app.GridCells.TIME_SYMBOL_FK,TIME_SYMBOL_CODE)
        
    })
})
   
    after(() => {
        cy.LOGOUT();
    });
