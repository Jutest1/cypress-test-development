import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';

const PRJ_NO = "PR-TK-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR-TK-" + Cypress._.random(0, 999)
const CU_MAIN_01 = "RNMAIN-CU-" + Cypress._.random(0, 999)
const CU_SUB_01 = 'SUB-CU1-' + Cypress._.random(0, 999);
const CU_SUB_02 = 'SUB-CU2-' + Cypress._.random(0, 999);
const ACTIONS_CODE = 'ACT-' + Cypress._.random(0, 999);
const ACTIONS_DESC = 'ACTD-' + Cypress._.random(0, 999);
const ACTION_TY='ATY-' + Cypress._.random(0, 999);
const BASE_RATE='BA-' + Cypress._.random(0, 999);
const SURCHANGE_RATE='SR-' + Cypress._.random(0, 999);
const PAY_GROUP_CODE='PAY-' + Cypress._.random(0, 999);
const PAY_GROUP_DESC='PAY-' + Cypress._.random(0, 999);
const COMMENT_TEXT='TEXT-' + Cypress._.random(0, 9999);
const SHIFT_MOD_DESC='SHIFT-' + Cypress._.random(0, 999);
const TIME_SYMBOL_CODE='T-SYB-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC='T-SYB-' + Cypress._.random(0, 999);
const WORKING_TI_MOD_DESC='WTM-' + Cypress._.random(0, 999);
const TK_GROUP_CODE='TK-' + Cypress._.random(0, 999);
const TK_GROUP_DESC='TK-' + Cypress._.random(0, 999);
const EMPLOYEE_CODE='EMP-' + Cypress._.random(0, 999);
const EMPLOYEE_DESC='EMP-' + Cypress._.random(0, 999);
const PERIOD_CODE='PR-' + Cypress._.random(0, 999);
const PERIOD_DESC='PR-' + Cypress._.random(0, 999);
const CREW_CODE='CREW-' + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let PROJECT_PARAMETERS: DataCells, CONTROLLING_UNIT_MAIN_PARAMETERS_1: DataCells,CONTROLLING_UNIT_SUB_PARAMETERS_1: DataCells,ACTIONS_PARAMETERS:DataCells,CONTROLLING_UNIT_SUB_PARAMETERS_2: DataCells,EMPLOYEES_PARAMETERS:DataCells,PERIODS_PARAMETERS:DataCells,TIMEKEEPING_RESULTS_PARAMETERS:DataCells,WORKING_TIMES_PARAMETERS_1:DataCells,WORKING_TIMES_PARAMETERS_2:DataCells,WORKING_TIMES_PARAMETERS_3:DataCells,WORKING_TIMES_PARAMETERS_4:DataCells, CREW_RECORDING_PARAMETERS:DataCells
let CONTAINERS_CONTROLLING_UNITS,CONTAINER_COLUMNS_CONTROLLING_UNITS,CONTAINER_COLUMNS_ACTIONS,CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_WORKING_TIME_MODELS,CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS,CONTAINER_COLUMNS_TIMEKEEPING_RESULTS,CONTAINER_COLUMNS_CREW_RECORDINGS,CONTAINER_COLUMNS_TRANSACTIONS
let CONTAINERS_ACTIONS,CONTAINERS_DATA_TYPES,CONTAINERS_PROJECT,CONTAINERS_PAYMENT_GROUP_RATES,CONTAINERS_SHIFT_MODELS,CONTAINERS_WORKING_TIMES,CONTAINERS_TIME_SYMBOLS,CONTAINERS_WORKING_TIME_MODELS,CONTAINERS_WORKING_TIME_MODEL_DAYS,CONTAINERS_EMPLOYEES,CONTAINERS_PERIODS,CONTAINERS_TIMEKEEPING_RESULTS,CONTAINERS_COMPANY,CONTAINERS_TRANSACTIONS,CONTAINERS_PAYMENT_GROUP_SURCHARGE
let PAYMENT_GROUP_PARAMETERS:DataCells,PAYMENT_GROUP_RATE_PARAMETERS:DataCells,SHIFT_MODELS_PARAMETERS:DataCells,WORKING_TIMES_PARAMETERS:DataCells,TIME_SYMBOLS_PARAMETERS:DataCells,ACCOUNT_ALLOCATION_RULES_PARAMETERS:DataCells,WORKING_TIME_MODELS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS:DataCells,TIMEKEEPING_GROUPS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_1:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_2:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_3:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_4:DataCells,PAYMENT_GROUP_SURCHARGE_PARAMETERS:DataCells
let CONTAINER_COLUMNS_PAYMENT_GROUPS,CONTAINER_COLUMNS_PAYMENT_GROUP_RATES,CONTAINER_COLUMNS_SHIFT_MODELS,CONTAINER_COLUMNS_WORKING_TIMES,CONTAINER_COLUMNS_TIME_SYMBOLS,CONTAINER_COLUMNS_ACCOUNT_ALLOCATION_RULES,CONTAINER_COLUMNS_TIMEKEEPING_GROUPS,CONTAINER_COLUMNS_EMPLOYEES,CONTAINER_COLUMNS_PERIODS,CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.46 | Generate Timekeeping result with Surcharge quantity 20 action TK-TR0021");

describe("ETK- 1.46 | Generate Timekeeping result with Surcharge with quantity 20 action TK-TR0021", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.46-generate-timekeeping-result-with-surcharge-with-quantity-20-action.json").then((data) => {
            this.data = data;
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
            },
            CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
            CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
            CONTROLLING_UNIT_MAIN_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_MAIN_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            },
            CONTROLLING_UNIT_SUB_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_SUB_01,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            },
            CONTROLLING_UNIT_SUB_PARAMETERS_2 = {
                [app.GridCells.DESCRIPTION_INFO]: CU_SUB_02,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
            }
            CONTAINER_COLUMNS_ACTIONS = this.data.CONTAINER_COLUMNS.ACTIONS;
            CONTAINERS_ACTIONS = this.data.CONTAINERS.ACTIONS;
            ACTIONS_PARAMETERS = {
                [app.GridCells.CODE]: ACTIONS_CODE,
                [app.GridCells.DESCRIPTION]: ACTIONS_DESC,
                [app.GridCells.CONTROLLING_UNIT_FK]: CU_SUB_01,
                [app.GridCells.LOGISTIC_JOB_FK]:PRJ_NO,
                [app.GridCells.ACTION_TYPE_FK]:ACTION_TY,
                [app.GridCells.IS_ACTIVE]:CONTAINERS_ACTIONS.CHECKBOX
            },
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_PAYMENT_GROUPS=this.data.CONTAINER_COLUMNS.PAYMENT_GROUPS_LIST
            PAYMENT_GROUP_PARAMETERS = {
                [app.GridCells.CODE]:PAY_GROUP_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PAY_GROUP_DESC
            },
            CONTAINER_COLUMNS_PAYMENT_GROUP_RATES=this.data.CONTAINER_COLUMNS.PAYMENT_GROUP_RATES
            CONTAINERS_PAYMENT_GROUP_RATES=this.data.CONTAINERS.PAYMENT_GROUP_RATES
            PAYMENT_GROUP_RATE_PARAMETERS={
                [app.GridCells.CONTROLLING_UNIT_FK]: CU_SUB_02,
                [app.GridCells.SURCHARGE_TYPE_FK]: BASE_RATE,
                [app.GridCells.COMMENT_TEXT]: COMMENT_TEXT,
                [app.GridCells.RATE]:CONTAINERS_PAYMENT_GROUP_RATES.RATE
            },
            CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE=this.data.CONTAINER_COLUMNS.PAYMENT_GROUP_SURCHARGE
            CONTAINERS_PAYMENT_GROUP_SURCHARGE=this.data.CONTAINERS.PAYMENT_GROUP_SURCHARGE
            PAYMENT_GROUP_SURCHARGE_PARAMETERS={
                [app.GridCells.CONTROLLING_UNIT_FK]: CU_SUB_02,
                [app.GridCells.SURCHARGE_TYPE_FK]: SURCHANGE_RATE,
                [app.GridCells.COMMENT_TEXT]: COMMENT_TEXT,
                [app.GridCells.RATE]:CONTAINERS_PAYMENT_GROUP_SURCHARGE.RATE
            },
            CONTAINER_COLUMNS_SHIFT_MODELS=this.data.CONTAINER_COLUMNS.SHIFT_MODELS
            CONTAINERS_SHIFT_MODELS=this.data.CONTAINERS.SHIFT_MODELS
            SHIFT_MODELS_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]: SHIFT_MOD_DESC,
                [app.GridCells.CALENDAR_FK]: CONTAINERS_SHIFT_MODELS.CALENDAR
            },
            CONTAINER_COLUMNS_WORKING_TIMES=this.data.CONTAINER_COLUMNS.WORKING_TIMES
            CONTAINERS_WORKING_TIMES=this.data.CONTAINERS.WORKING_TIMES
            WORKING_TIMES_PARAMETERS={
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[0],
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[0],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]:TIME_SYMBOL_DESC,
                [app.GridCells.FROM_TIME]:CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]:CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.BREAK_FROM]:CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]:CONTAINERS_WORKING_TIMES.BREAKTO[0]
            },
            WORKING_TIMES_PARAMETERS_1={
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[1],
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[1],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]:TIME_SYMBOL_DESC,
                [app.GridCells.FROM_TIME]:CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]:CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.BREAK_FROM]:CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]:CONTAINERS_WORKING_TIMES.BREAKTO[0]
            },
            WORKING_TIMES_PARAMETERS_2={
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[2],
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[2],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]:TIME_SYMBOL_DESC,
                [app.GridCells.FROM_TIME]:CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]:CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.BREAK_FROM]:CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]:CONTAINERS_WORKING_TIMES.BREAKTO[0]
            },
            WORKING_TIMES_PARAMETERS_3={
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[3],
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[3],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]:TIME_SYMBOL_DESC,
                [app.GridCells.FROM_TIME]:CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]:CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.BREAK_FROM]:CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]:CONTAINERS_WORKING_TIMES.BREAKTO[0]
            },
            WORKING_TIMES_PARAMETERS_4={
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM[4],
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY[4],
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION[0],
                [app.GridCells.TIME_SYMBOL_FK]:TIME_SYMBOL_DESC,
                [app.GridCells.FROM_TIME]:CONTAINERS_WORKING_TIMES.FROMTIME[0],
                [app.GridCells.TO_TIME]:CONTAINERS_WORKING_TIMES.TOTIME[0],
                [app.GridCells.BREAK_FROM]:CONTAINERS_WORKING_TIMES.BREAKFROM[0],
                [app.GridCells.BREAK_TO]:CONTAINERS_WORKING_TIMES.BREAKTO[0]
            },
            CONTAINER_COLUMNS_TIME_SYMBOLS=this.data.CONTAINER_COLUMNS.TIME_SYMBOLS
            CONTAINERS_TIME_SYMBOLS=this.data.CONTAINERS.TIME_SYMBOLS
            TIME_SYMBOLS_PARAMETERS={
                [app.GridCells.CODE]: TIME_SYMBOL_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TIME_SYMBOL_DESC,
                [app.GridCells.IS_PRESENCE]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.IS_PRODUCTIVE]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.VALUATION_PERCENT]: CONTAINERS_TIME_SYMBOLS.VAL_PERCENTAGE,
                [app.GridCells.VALUATION_RATE]: CONTAINERS_TIME_SYMBOLS.VAL_RATE,
                [app.GridCells.TIME_SYMBOL_TYPE_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_TYPE,
                [app.GridCells.TIME_SYMBOL_GROUP_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_GROUP              
            },
            CONTAINER_COLUMNS_ACCOUNT_ALLOCATION_RULES=this.data.CONTAINER_COLUMNS.ACCOUNT_ALLOCATION_RULES
            ACCOUNT_ALLOCATION_RULES_PARAMETERS={
                [app.GridCells.CONTROLLING_UNIT_FK]: CU_SUB_01,
                [app.GridCells.SURCHARGE_TYPE_FK]: SURCHANGE_RATE      
            },
            CONTAINER_COLUMNS_WORKING_TIME_MODELS=this.data.CONTAINER_COLUMNS.WORKING_TIME_MODELS
            CONTAINERS_WORKING_TIME_MODELS=this.data.CONTAINERS.WORKING_TIME_MODELS
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
            },
            CONTAINER_COLUMNS_TIMEKEEPING_RESULTS=this.data.CONTAINER_COLUMNS.TIMEKEEPING_RESULTS
            CONTAINERS_TIMEKEEPING_RESULTS=this.data.CONTAINERS.TIMEKEEPING_RESULTS
            TIMEKEEPING_RESULTS_PARAMETERS={
                [app.GridCells.PROJECT_ACTION_FK]:ACTIONS_CODE,
                [app.GridCells.HOURS]:CONTAINERS_TIMEKEEPING_RESULTS.HOURS,
                [app.GridCells.TIME_SYMBOL_FK]:TIME_SYMBOL_CODE,
                [app.GridCells.RATE]:CONTAINERS_TIMEKEEPING_RESULTS.RATE,
                [app.GridCells.SHEET_FK]:EMPLOYEE_CODE
            },
            CONTAINER_COLUMNS_CREW_RECORDINGS=this.data.CONTAINER_COLUMNS.CREW_RECORDINGS
            CREW_RECORDING_PARAMETERS = {
                [app.GridCells.CODE]:CREW_CODE,
                [app.GridCells.TIME_KEEPING_PERIOD_FK]:PERIOD_CODE,
                [app.GridCells.SHIFT_FK]:SHIFT_MOD_DESC,
                [app.GridCells.EMPLOYEE_FK]:EMPLOYEE_CODE
              }
              CONTAINER_COLUMNS_TRANSACTIONS=this.data.CONTAINER_COLUMNS.TRANSACTIONS
              CONTAINERS_TRANSACTIONS=this.data.CONTAINERS.TRANSACTIONS
        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    });
    
    it("TC - Create New Project & Pin it", function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    })
    it("TC - Create Controlling Units", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN_01)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_SUB_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE).then(($C_UNIT1) => {
            Cypress.env("C_UNIT1",($C_UNIT1.text()))
        _common.waitForLoaderToDisappear()
        })
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT, CU_MAIN_01)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_SUB_PARAMETERS_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE).then(($C_UNIT2) => {
            Cypress.env("C_UNIT2",($C_UNIT2.text()))
        _common.waitForLoaderToDisappear()    
        })
    });
    it("TC - Create Data records", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.ACTION_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.ACTION_TYPE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1);
        })
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS,app.GridCells.CONTEXT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_DATA_TYPES.CONTEXT)
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ACTION_TY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIMEKEEPING_SURCHARGE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIMEKEEPING_SURCHARGE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1);
        })
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,BASE_RATE)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_STANDARDRATE,CONTAINERS_DATA_TYPES.CHECKBOX[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,SURCHANGE_RATE)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_STANDARDRATE,CONTAINERS_DATA_TYPES.CHECKBOX[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Create Actions with controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NO).pinnedItem();
        _common.waitForLoaderToDisappear() 
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ACTIONS, app.FooterTab.ACTIONS, 1);
            _common.setup_gridLayout(cnt.uuid.PROJECT_ACTIONS, CONTAINER_COLUMNS_ACTIONS)
        })
       _common.waitForLoaderToDisappear()
       _common.create_newRecord(cnt.uuid.PROJECT_ACTIONS);
       _common.waitForLoaderToDisappear()
       _timekeepingPage.enterRecord_toCreateActions(ACTIONS_PARAMETERS)
       _common.waitForLoaderToDisappear()
       cy.SAVE()
       _common.waitForLoaderToDisappear()
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
        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_RATES, app.FooterTab.PAYMENT_GROUP_RATES, 1);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUP_RATES, CONTAINER_COLUMNS_PAYMENT_GROUP_RATES)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUP_RATES)
        _timekeepingPage.enterRecord_toPaymentGroupRate(cnt.uuid.PAYMENT_GROUP_RATES,PAYMENT_GROUP_RATE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PAYMENTGROUPS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PAYMENT_GROUP_SURCHARGES, app.FooterTab.PAYMENT_GROUPS_SURCHARGES, 1);
            _common.setup_gridLayout(cnt.uuid.PAYMENT_GROUP_SURCHARGES, CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PAYMENT_GROUP_SURCHARGES)
        _timekeepingPage.enterRecord_toPaymentGroupSurcharge(cnt.uuid.PAYMENT_GROUP_SURCHARGES,PAYMENT_GROUP_SURCHARGE_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Create Time symbols and add Account allocations rules", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIME_SYSBOLS)
        _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_6)
            _common.select_tabFromFooter(cnt.uuid.TIME_SYMBOLS, app.FooterTab.TIME_SYMBOLS);
            _common.setup_gridLayout(cnt.uuid.TIME_SYMBOLS, CONTAINER_COLUMNS_TIME_SYMBOLS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateTimeSymbols(TIME_SYMBOLS_PARAMETERS)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ACCOUNT_ALLOCATION_RULES, app.FooterTab.ACCOUNT_ALLOCATION_RULES,0);
        _common.waitForLoaderToDisappear()
        _common.setup_gridLayout(cnt.uuid.ACCOUNT_ALLOCATION_RULES, CONTAINER_COLUMNS_ACCOUNT_ALLOCATION_RULES)
       })
       _common.waitForLoaderToDisappear()
       _common.create_newRecord(cnt.uuid.ACCOUNT_ALLOCATION_RULES)
       _timekeepingPage.enterRecord_toAccountAllocationRules(cnt.uuid.ACCOUNT_ALLOCATION_RULES,ACCOUNT_ALLOCATION_RULES_PARAMETERS)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
    })
   
    it("TC - Create Shift modales and Working Times", function () {
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
        _common.openTab(app.TabBar.SHIFT_MODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WORKING_TIME, app.FooterTab.WORKING_TIMES,1);
            _common.setup_gridLayout(cnt.uuid.WORKING_TIME, CONTAINER_COLUMNS_WORKING_TIMES)
        })
        _common.waitForLoaderToDisappear()
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
    it("TC -Search for Employee sheets and Create Timekeeping results", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIMEKEEPING)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.REVIEW_RECORDINGS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_2)
            _common.select_tabFromFooter(cnt.uuid.CREW_RECORDING, app.FooterTab.CREW_RECORDINGS, 0);
            _common.setup_gridLayout(cnt.uuid.CREW_RECORDING,CONTAINER_COLUMNS_CREW_RECORDINGS)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.CREW_RECORDING)
        _timekeepingPage.enterRecord_toCrewRecording(cnt.uuid.CREW_RECORDING,CREW_RECORDING_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.REVIEW_RECORDINGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.EMPLOYEE_SHEET, app.FooterTab.EMPLOYEE_SHEETS,2);
            _common.waitForLoaderToDisappear()
        })
        _common.create_newRecord(cnt.uuid.EMPLOYEE_SHEET)
        _common.edit_dropdownCellWithInput(cnt.uuid.EMPLOYEE_SHEET,app.GridCells.EMPLOYEE_FK,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT,EMPLOYEE_CODE)
        cy.SAVE()
        _common.openTab(app.TabBar.REVIEW_RECORDINGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TIMEKEEPING_RESULTS, app.FooterTab.TIMEKEEPING_RESULTS);
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.TIMEKEEPING_RESULTS, CONTAINER_COLUMNS_TIMEKEEPING_RESULTS)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.TIMEKEEPING_RESULTS)
        _common.create_newRecord(cnt.uuid.TIMEKEEPING_RESULTS)
        _timekeepingPage.enterRecord_toTimekeepingResults(cnt.uuid.TIMEKEEPING_RESULTS,TIMEKEEPING_RESULTS_PARAMETERS)
        cy.SAVE()  
        _common.minimizeContainer(cnt.uuid.TIMEKEEPING_RESULTS)
        _common.waitForLoaderToDisappear()
    })
    it("TC -Verify timekeeping period transaction result for base rate", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIMEKEEPING_PERIOD)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//wait needed to load page
        _common.clear_subContainerFilter(cnt.uuid.PERIOD)
        _common.search_inSubContainer(cnt.uuid.PERIOD,PERIOD_CODE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERIOD).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_2)
            _common.select_tabFromFooter(cnt.uuid.TRANSACTIONS, app.FooterTab.TRANSACTIONS, 1);
            _common.setup_gridLayout(cnt.uuid.TRANSACTIONS, CONTAINER_COLUMNS_TRANSACTIONS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_TRANSACTIONS.transactioncase,CONTAINER_COLUMNS_TRANSACTIONS.quantity,CONTAINER_COLUMNS_TRANSACTIONS.amount,CONTAINER_COLUMNS_TRANSACTIONS.controllingunitfk], cnt.uuid.TRANSACTIONS)
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PERIOD_TRANSACTIONS);
        _common.waitForLoaderToDisappear()
        _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.CONSOLIDATION_LEVEL,CONTAINERS_TRANSACTIONS.LEVEL,commonLocators.CommonKeys.GRID_1)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(1000)//waiting is required to load ok button
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear
        _common.maximizeContainer(cnt.uuid.TRANSACTIONS)
         _common.waitForLoaderToDisappear()
        let AMOUNT=(parseFloat(CONTAINERS_PAYMENT_GROUP_SURCHARGE.RATE)/100*parseFloat(CONTAINERS_PAYMENT_GROUP_RATES.RATE)*parseFloat(CONTAINERS_TIMEKEEPING_RESULTS.HOURS))
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.TRANSACTIONS,Cypress.env("C_UNIT1"))
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTIONS,app.GridCells.QUANTITY_SMALL,CONTAINERS_TIMEKEEPING_RESULTS.HOURS)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTIONS,app.GridCells.CONTROLLING_UNIT_FK,Cypress.env("C_UNIT1"))
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.TRANSACTIONS,app.GridCells.AMOUNT_SMALL,AMOUNT.toString())
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTIONS,app.GridCells.TRANSACTION_CASE,CONTAINERS_TRANSACTIONS.TRANSACTION_CASES[0])
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.TRANSACTIONS,Cypress.env("C_UNIT2"))
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTIONS,app.GridCells.QUANTITY_SMALL,CONTAINERS_TIMEKEEPING_RESULTS.HOURS)
        _common.waitForLoaderToDisappear()
        _common.assert_forNumericValues(cnt.uuid.TRANSACTIONS,app.GridCells.AMOUNT_SMALL,AMOUNT.toString())
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTIONS,app.GridCells.CONTROLLING_UNIT_FK,Cypress.env("C_UNIT2"))
       _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.TRANSACTIONS,app.GridCells.TRANSACTION_CASE,CONTAINERS_TRANSACTIONS.TRANSACTION_CASES[1])
        _common.minimizeContainer(cnt.uuid.TRANSACTIONS)
        })
   })
    after(() => {
        cy.LOGOUT();
    });
