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
const SURCHANGE_RATE='SR-' + Cypress._.random(0, 999);
const BASE_RATE='BA-' + Cypress._.random(0, 999);
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



const ALLURE = Cypress.Allure.reporter.getInterface();

let PROJECT_PARAMETERS: DataCells, CONTROLLING_UNIT_MAIN_PARAMETERS_1: DataCells,CONTROLLING_UNIT_SUB_PARAMETERS_1: DataCells,ACTIONS_PARAMETERS:DataCells,CONTROLLING_UNIT_SUB_PARAMETERS_2: DataCells,EMPLOYEES_PARAMETERS:DataCells,PERIODS_PARAMETERS:DataCells,TIMEKEEPING_RESULTS_PARAMETERS:DataCells,WORKING_TIMES_PARAMETERS_1:DataCells,WORKING_TIMES_PARAMETERS_2:DataCells,WORKING_TIMES_PARAMETERS_3:DataCells,WORKING_TIMES_PARAMETERS_4:DataCells, CREW_RECORDING_PARAMETERS:DataCells
let CONTAINERS_CONTROLLING_UNITS,CONTAINER_COLUMNS_CONTROLLING_UNITS,CONTAINER_COLUMNS_ACTIONS,CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_WORKING_TIME_MODELS,CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS,CONTAINER_COLUMNS_TIMEKEEPING_RESULTS,CONTAINER_COLUMNS_CREW_RECORDINGS,CONTAINER_COLUMNS_TRANSACTIONS
let CONTAINERS_ACTIONS,CONTAINERS_DATA_TYPES,CONTAINERS_PROJECT,CONTAINERS_PAYMENT_GROUP_RATES,CONTAINERS_SHIFT_MODELS,CONTAINERS_WORKING_TIMES,CONTAINERS_TIME_SYMBOLS,CONTAINERS_WORKING_TIME_MODELS,CONTAINERS_WORKING_TIME_MODEL_DAYS,CONTAINERS_EMPLOYEES,CONTAINERS_PERIODS,CONTAINERS_TIMEKEEPING_RESULTS,CONTAINERS_COMPANY,CONTAINERS_TRANSACTIONS,CONTAINERS_PAYMENT_GROUP_SURCHARGE
let PAYMENT_GROUP_PARAMETERS:DataCells,PAYMENT_GROUP_RATE_PARAMETERS:DataCells,SHIFT_MODELS_PARAMETERS:DataCells,WORKING_TIMES_PARAMETERS:DataCells,TIME_SYMBOLS_PARAMETERS:DataCells,ACCOUNT_ALLOCATION_RULES_PARAMETERS:DataCells,WORKING_TIME_MODELS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS:DataCells,TIMEKEEPING_GROUPS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_1:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_2:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_3:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_4:DataCells,PAYMENT_GROUP_SURCHARGE_PARAMETERS:DataCells
let CONTAINER_COLUMNS_PAYMENT_GROUPS,CONTAINER_COLUMNS_PAYMENT_GROUP_RATES,CONTAINER_COLUMNS_SHIFT_MODELS,CONTAINER_COLUMNS_WORKING_TIMES,CONTAINER_COLUMNS_TIME_SYMBOLS,CONTAINER_COLUMNS_ACCOUNT_ALLOCATION_RULES,CONTAINER_COLUMNS_TIMEKEEPING_GROUPS,CONTAINER_COLUMNS_EMPLOYEES,CONTAINER_COLUMNS_PERIODS,CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE
ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.2 | Create payment group, payment group surcharge and payment group rates");

describe("ETK- 1.2 | Create payment group, payment group surcharge and payment group rates", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.2-create-payment-group-payment-group-surcharge-and-payment-group-rates.json").then((data) => {
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
            },

            CONTAINER_COLUMNS_PAYMENT_GROUP_SURCHARGE=this.data.CONTAINER_COLUMNS.PAYMENT_GROUP_SURCHARGE
            CONTAINERS_PAYMENT_GROUP_SURCHARGE=this.data.CONTAINERS.PAYMENT_GROUP_SURCHARGE
            PAYMENT_GROUP_SURCHARGE_PARAMETERS={
                [app.GridCells.CONTROLLING_UNIT_FK]: CU_SUB_02,
                [app.GridCells.SURCHARGE_TYPE_FK]: SURCHANGE_RATE,
                [app.GridCells.COMMENT_TEXT]: COMMENT_TEXT,
                [app.GridCells.RATE]:CONTAINERS_PAYMENT_GROUP_SURCHARGE.RATE
            },
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
            }
        
           
        })

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()

    }) 
          
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
        _common.assert_cellData(cnt.uuid.PAYMENT_GROUPS_LIST,app.GridCells.DESCRIPTION_INFO,PAY_GROUP_DESC)
    })
   
})
   
    after(() => {
        cy.LOGOUT();
    });
