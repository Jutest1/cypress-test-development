import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';


const PAY_GROUP_CODE='PAY-' + Cypress._.random(0, 999);
const PAY_GROUP_DESC='PAY-D' + Cypress._.random(0, 999);

const SHIFT_MOD_DESC='SHIFT-' + Cypress._.random(0, 999);
const TIME_SYMBOL_CODE='T-SYB-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC='T-SYB-D-' + Cypress._.random(0, 999);
const TIME_SYMBOL_CODE_OVERTIME='T-SYB-OT-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC_OVERTIME='T-SYB-OTD-' + Cypress._.random(0, 999);
const TIME_SYMBOL_CODE_RECUP='T-SYB-RCUP-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC_RECUP='T-SYB-RCUPDES-' + Cypress._.random(0, 999);

const WORKING_TI_MOD_DESC='WTM-11-' + Cypress._.random(0, 999);
const TK_GROUP_CODE='TK-' + Cypress._.random(0, 999);
const TK_GROUP_DESC='TK-D' + Cypress._.random(0, 999);
const EMPLOYEE_CODE='EMP-' + Cypress._.random(0, 999);
const EMPLOYEE_DESC='EMP-D' + Cypress._.random(0, 999);
const PERIOD_CODE='PR-' + Cypress._.random(0, 999);
const PERIOD_DESC='PR-D' + Cypress._.random(0, 999);
const EXCEPTIONS_DESC = 'EXCEP-DESC' + Cypress._.random(0, 999);

const WORKING_TIME_DESC = 'WT-DESC-' + Cypress._.random(0, 999);


const ALLURE = Cypress.Allure.reporter.getInterface();

let PAYMENT_GROUP_PARAMETERS:DataCells
let CONTAINER_COLUMNS_PAYMENT_GROUPS
let CONTAINER_COLUMNS_TIME_SYMBOLS;
let CONTAINERS_TIME_SYMBOLS;
let TIME_SYMBOLS_PARAMETERS:DataCells,TIME_SYMBOLS_PARAMETERS1:DataCells,EXCEPTIONS_PARAMETERS:DataCells,TIME_SYMBOLS_PARAMETERS2:DataCells
let  CONTAINERS_SHIFT_MODELS, CONTAINERS_WORKING_TIMES;
let  CONTAINER_COLUMNS_SHIFT_MODELS, CONTAINER_COLUMNS_WORKING_TIMES;
let  SHIFT_MODELS_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS_1: DataCells, WORKING_TIMES_PARAMETERS_2: DataCells, WORKING_TIMES_PARAMETERS_3: DataCells, WORKING_TIMES_PARAMETERS_4: DataCells;


let  CONTAINER_COLUMNS_WORKING_TIME_MODELS,CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS
let CONTAINERS_WORKING_TIME_MODELS,CONTAINERS_WORKING_TIME_MODEL_DAYS,CONTAINER_COLUMNS_OVERTIME_CALCULATION_PARAMETERS
let WORKING_TIME_MODELS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_1:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_2:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_3:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_4:DataCells


let EMPLOYEES_PARAMETERS:DataCells,PERIODS_PARAMETERS:DataCells,TIMEKEEPING_GROUPS_PARAMETERS:DataCells
let CONTAINERS_EMPLOYEES,CONTAINERS_PERIODS,CONTAINERS_COMPANY,CONTAINER_EXCEPTIONS,CONTAINER_COLUMNS_EXCEPTIONS
let CONTAINER_COLUMNS_TIMEKEEPING_GROUPS,CONTAINER_COLUMNS_EMPLOYEES,CONTAINER_COLUMNS_PERIODS


ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.26 | Calculate overtime for vacation");

describe("ETK- 1.26 | Calculate overtime for vacation", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.26-calculate-overtime-for-vacation.json").then((data) => {
            this.data = data;
            
            CONTAINER_COLUMNS_PAYMENT_GROUPS=this.data.CONTAINER_COLUMNS.PAYMENT_GROUPS_LIST
            PAYMENT_GROUP_PARAMETERS = {
                [app.GridCells.CODE]:PAY_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PAY_GROUP_DESC
            }

            CONTAINER_COLUMNS_TIME_SYMBOLS=this.data.CONTAINER_COLUMNS.TIME_SYMBOLS
            CONTAINERS_TIME_SYMBOLS=this.data.CONTAINERS.TIME_SYMBOLS
            CONTAINER_COLUMNS_OVERTIME_CALCULATION_PARAMETERS=this.data.CONTAINER_COLUMNS.OVERTIME_CALCULATION_PARAMETERS
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

            TIME_SYMBOLS_PARAMETERS1={
                [app.GridCells.CODE]: TIME_SYMBOL_CODE_OVERTIME,
                [app.GridCells.DESCRIPTION_INFO]: TIME_SYMBOL_DESC_OVERTIME,
                [app.GridCells.IS_PRESENCE]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.IS_PRODUCTIVE]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.IS_OVERTIME]:CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.IS_WTM_RELEVANT]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.VALUATION_PERCENT]: CONTAINERS_TIME_SYMBOLS.VAL_PERCENTAGE,
                [app.GridCells.VALUATION_RATE]: CONTAINERS_TIME_SYMBOLS.VAL_RATE,
                [app.GridCells.TIME_SYMBOL_TYPE_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_TYPE,
                [app.GridCells.TIME_SYMBOL_GROUP_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_GROUP_OT              
            }

            TIME_SYMBOLS_PARAMETERS2={
                [app.GridCells.CODE]: TIME_SYMBOL_CODE_RECUP,
                [app.GridCells.DESCRIPTION_INFO]: TIME_SYMBOL_DESC_RECUP,
                [app.GridCells.IS_OVERTIME]:CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.IS_TIME_ACCOUNT]:commonLocators.CommonKeys.CHECKBOX,
                [app.GridCells.VALUATION_PERCENT]: CONTAINERS_TIME_SYMBOLS.VAL_PERCENTAGE,
                [app.GridCells.VALUATION_RATE]: CONTAINERS_TIME_SYMBOLS.VAL_RATE,
                [app.GridCells.TIME_SYMBOL_TYPE_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_TYPE,
                [app.GridCells.TIME_SYMBOL_GROUP_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_GROUP_OT              
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
            CONTAINERS_PERIODS=this.data.CONTAINERS.PERIODS
            CONTAINER_EXCEPTIONS = this.data.CONTAINERS.EXCEPTIONS
            CONTAINER_COLUMNS_EXCEPTIONS = this.data.CONTAINER_COLUMNS.EXCEPTIONS
            EXCEPTIONS_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: EXCEPTIONS_DESC,
                [app.GridCells.EXCEPT_DATE]:_common.getDate(CONTAINERS_PERIODS.END_DATE,1),
                [app.GridCells.TIME_SYMBOL_FK]: TIME_SYMBOL_CODE,
            }
            CONTAINERS_WORKING_TIME_MODELS=this.data.CONTAINERS.WORKING_TIME_MODELS
            CONTAINER_COLUMNS_WORKING_TIME_MODELS=this.data.CONTAINER_COLUMNS.WORKING_TIME_MODELS
            CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS=this.data.CONTAINER_COLUMNS.WORKING_TIME_MODEL_DAYS
            CONTAINERS_WORKING_TIME_MODEL_DAYS=this.data.CONTAINERS.WORKING_TIME_MODEL_DAYS

            WORKING_TIME_MODELS_PARAMETERS={
                [app.GridCells.IS_DEFAULT]: CONTAINERS_WORKING_TIME_MODELS.CHECKBOX,
                [app.GridCells.WEEK_ENDS_ON]:CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[4],
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TI_MOD_DESC
            },
           
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
                [app.GridCells.START_DATE]: CONTAINERS_EMPLOYEES.START_DATE,
                [app.GridCells.SHIFT_FK]:SHIFT_MOD_DESC,
                [app.GridCells.TIME_KEEPING_GROUP_FK]:TK_GROUP_CODE,
                [app.GridCells.PAYMENT_GROUP_FK]:PAY_GROUP_DESC,
                [app.GridCells.GENERATE_RECORDING]:CONTAINERS_EMPLOYEES.CHECKBOX,
                [app.GridCells.IS_CREW_LEADER]:CONTAINERS_EMPLOYEES.CHECKBOX
            },
            CONTAINER_COLUMNS_PERIODS=this.data.CONTAINER_COLUMNS.PERIODS
          
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
   
    it("TC - Create Time symbols for Regular Work, Recuperation Time and for overtime", function () {
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

        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateTimeSymbols(TIME_SYMBOLS_PARAMETERS1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateTimeSymbols(TIME_SYMBOLS_PARAMETERS2)
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

        _common.openTab(app.TabBar.SHIFT_MODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EXCEPTIONS, app.FooterTab.EXCEPTIONS);
            _common.setup_gridLayout(cnt.uuid.EXCEPTIONS, CONTAINER_COLUMNS_EXCEPTIONS)
        })
        _common.maximizeContainer(cnt.uuid.EXCEPTIONS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.EXCEPTIONS)
        _timekeepingPage.enterRecord_toCreateExceptions(cnt.uuid.EXCEPTIONS, EXCEPTIONS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        


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
        _common.edit_containerCell(cnt.uuid.WORKING_TIME_MODEL_DAYS,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WORKING_TIME_MODEL_DAYS.VALID_FROM)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_1)
        _common.edit_containerCell(cnt.uuid.WORKING_TIME_MODEL_DAYS,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WORKING_TIME_MODEL_DAYS.VALID_FROM)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_2)
        _common.edit_containerCell(cnt.uuid.WORKING_TIME_MODEL_DAYS,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WORKING_TIME_MODEL_DAYS.VALID_FROM)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_3)
        _common.edit_containerCell(cnt.uuid.WORKING_TIME_MODEL_DAYS,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WORKING_TIME_MODEL_DAYS.VALID_FROM)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_4)
        _common.edit_containerCell(cnt.uuid.WORKING_TIME_MODEL_DAYS,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WORKING_TIME_MODEL_DAYS.VALID_FROM)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create overtime calculation parameter details", function () {
       
        _common.openTab(app.TabBar.WORKTIMEMODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WORKING_TIME_MODEL_DETAILS, app.FooterTab.OVERTIME_CALCULATION_PARAMETER, 1);
            _common.setup_gridLayout(cnt.uuid.WORKING_TIME_MODEL_DETAILS,CONTAINER_COLUMNS_OVERTIME_CALCULATION_PARAMETERS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_OVERTIME_CALCULATION_PARAMETERS.timesymbolasl1fk],cnt.uuid.WORKING_TIME_MODEL_DETAILS)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.WORKING_TIME_MODEL_DETAILS)
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DETAILS)
        _common.waitForLoaderToDisappear()
    
        _common.edit_dropdownCellWithInput(cnt.uuid.WORKING_TIME_MODEL_DETAILS,app.GridCells.TIME_SYMBOL_ASL_1_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,TIME_SYMBOL_CODE_OVERTIME)
        _common.waitForLoaderToDisappear()

        _common.edit_dropdownCellWithInput(cnt.uuid.WORKING_TIME_MODEL_DETAILS,app.GridCells.TIME_SYMBOL_BD_L1_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,TIME_SYMBOL_CODE_RECUP)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.WORKING_TIME_MODEL_DETAILS,app.GridCells.TIME_SYMBOL_RECAP_BL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,TIME_SYMBOL_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.WORKING_TIME_MODEL_DETAILS)
        
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
        _common.waitForLoaderToDisappear()
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
       _common.maximizeContainer(cnt.uuid.EMPLOYEES)
       _common.clear_subContainerFilter(cnt.uuid.EMPLOYEES)
       _common.waitForLoaderToDisappear()
       _common.create_newRecord(cnt.uuid.EMPLOYEES);
       _common.waitForLoaderToDisappear()
       _timekeepingPage.enterRecord_toCreateEmployees(cnt.uuid.EMPLOYEES,EMPLOYEES_PARAMETERS) 
       cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.minimizeContainer(cnt.uuid.EMPLOYEES)
       _common.openTab(app.TabBar.EMPLOYEE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.EMPLOYEE_WORKING_TIME_MODEL, app.FooterTab.EMPLOYEE_WORKING_TIME_MODEL, 1);
        })
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.EMPLOYEE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EMPLOYEES, app.FooterTab.EMPLOYEES, 0);
        })
       _common.waitForLoaderToDisappear()
       _common.clear_subContainerFilter(cnt.uuid.EMPLOYEES)
       _common.search_inSubContainer(cnt.uuid.EMPLOYEES,EMPLOYEE_CODE);
       _common.waitForLoaderToDisappear()
       _common.select_rowInSubContainer(cnt.uuid.EMPLOYEES)

       _common.openTab(app.TabBar.EMPLOYEE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.EMPLOYEE_WORKING_TIME_MODEL, app.FooterTab.EMPLOYEE_WORKING_TIME_MODEL, 0);
         })
         _common.select_rowInContainer(cnt.uuid.EMPLOYEE_WORKING_TIME_MODEL)
        _common.edit_dropdownCellWithInput(cnt.uuid.EMPLOYEE_WORKING_TIME_MODEL,app.GridCells.EMPLOYEE_WORKING_TIME_MODEL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,WORKING_TI_MOD_DESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.EMPLOYEE_WORKING_TIME_MODEL,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_EMPLOYEES.START_DATE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue(cnt.uuid.EMPLOYEE_WORKING_TIME_MODEL,app.GridCells.EMPLOYEE_WORKING_TIME_MODEL_FK,WORKING_TI_MOD_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.EMPLOYEE_WORKING_TIME_MODEL,app.GridCells.VALID_FROM,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_EMPLOYEES.START_DATE)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue(cnt.uuid.EMPLOYEE_WORKING_TIME_MODEL,app.GridCells.EMPLOYEE_WORKING_TIME_MODEL_FK,WORKING_TI_MOD_DESC)
        cy.SAVE()

       

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

    it("TC -Verify generate timesheet record in employee sheets and edit totime in employee reports", function () {
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
       _common.edit_containerCell(cnt.uuid.EMPLOYEE_REPORT,app.GridCells.TO_TIME_PART_TIME,app.InputFields.DOMAIN_TYPE_TIME,CONTAINERS_WORKING_TIMES.BREAKTO[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC -Calculate overtime and verify overtime record generated ", function () {
        
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CALCULATE_OVERTIME);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _validate.validate_Text_message_In_PopUp("new records were generated in report successfully!")
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)

        _common.openTab(app.TabBar.REVIEW_RECORDINGS).then(() => {
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
        
       
    })
})
   
    after(() => {
        cy.LOGOUT();
    });
