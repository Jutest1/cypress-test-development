import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';

const TIME_SYMBOL_CODE='T-SYB-C-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC='T-SYB-D-' + Cypress._.random(0, 999);
const WORKING_TI_MOD_DESC='WTM-11-' + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_TIME_SYMBOLS
let CONTAINERS_TIME_SYMBOLS,CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS;
let TIME_SYMBOLS_PARAMETERS:DataCells
let CONTAINERS_WORKING_TIME_MODELS,CONTAINER_COLUMNS_WORKING_TIME_MODELS,CONTAINER_COLUMNS_OVERTIME_CALCULATION_PARAMETERS
let WORKING_TIME_MODELS_PARAMETERS:DataCells,OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS:DataCells,OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS1:DataCells,OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS2:DataCells
ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.13 | Create overtime calculation parameter details");

describe("ETK- 1.13 | Create overtime calculation parameter details", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.13-create-overtime-calculation-parameter-details.json").then((data) => {
            this.data = data;
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
            CONTAINERS_WORKING_TIME_MODELS=this.data.CONTAINERS.WORKING_TIME_MODELS
            CONTAINER_COLUMNS_WORKING_TIME_MODELS=this.data.CONTAINER_COLUMNS.WORKING_TIME_MODELS
            WORKING_TIME_MODELS_PARAMETERS={
                [app.GridCells.IS_DEFAULT]: CONTAINERS_WORKING_TIME_MODELS.CHECKBOX,
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TI_MOD_DESC
            }
            CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS=this.data.CONTAINERS.OVERTIME_CALCULATION_PARAMETERS_DETAILS
            CONTAINER_COLUMNS_OVERTIME_CALCULATION_PARAMETERS=this.data.CONTAINER_COLUMNS.OVERTIME_CALCULATION_PARAMETERS
            OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS={
                [commonLocators.CommonKeys.VALUE]:CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS.LIMITS,
                [commonLocators.CommonKeys.WEEKLY_LIMIT]: CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS.WEEKLY,
                [commonLocators.CommonKeys.MONTHLY_LIMIT]:CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS.MONTHLY,
                }
            OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS1={
                [commonLocators.CommonKeys.VALUE]:CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS.TIME_SYMBOL_LIMITS,
                [commonLocators.CommonKeys.TIME_SYMBOL_BEFORE_DAILY_LIMIT]:TIME_SYMBOL_CODE,
                }
            OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS2={
                [commonLocators.CommonKeys.VALUE]:CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS.TIME_SYMBOL_SAVING_LIMITS,
                [commonLocators.CommonKeys.TIME_SYMBOL_FOR_HRS_OVER_SAVING_LIMIT]:TIME_SYMBOL_CODE
            }
        })

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()

    }) 
    it("TC - Create Time symbols for Regular Work and for overtime", function () {
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
    it("TC - Create Working time model and add overtime calculation parameter details", function () {
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
        _common.openTab(app.TabBar. WORKTIMEMODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.OVERTIME_CALCULATION_PARAMETER_DETAILS, app.FooterTab.OVERTIME_CALCULATION_PARAMETERS_DETAILS, 0);
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.OVERTIME_CALCULATION_PARAMETER_DETAILS)
        _timekeepingPage.enterRecord_toCreateOvertimeCalculationParameterDetails(cnt.uuid.OVERTIME_CALCULATION_PARAMETER_DETAILS,OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateOvertimeCalculationParameterDetails(cnt.uuid.OVERTIME_CALCULATION_PARAMETER_DETAILS,OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS1)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateOvertimeCalculationParameterDetails(cnt.uuid.OVERTIME_CALCULATION_PARAMETER_DETAILS,OVERTIME_CALCULATION_PARAMETERS_DETAILS_PARAMETERS2)
        cy.SAVE()      
    })
    it("TC -Calculate overtime and verify overtime record generated ", function () {
        _common.openTab(app.TabBar. WORKTIMEMODEL).then(() => {
           _common.select_tabFromFooter(cnt.uuid.OVERTIME_CALCULATION_PARAMETERS, app.FooterTab.OVERTIME_CALCULATION_PARAMETER, 1);
           _common.setup_gridLayout(cnt.uuid.OVERTIME_CALCULATION_PARAMETERS, CONTAINER_COLUMNS_OVERTIME_CALCULATION_PARAMETERS)
        })
        _common.maximizeContainer(cnt.uuid.OVERTIME_CALCULATION_PARAMETERS)
        _common.select_rowHasValue(cnt.uuid.OVERTIME_CALCULATION_PARAMETERS,TIME_SYMBOL_CODE)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.OVERTIME_CALCULATION_PARAMETERS,app.GridCells.WEEKLY_LIMIT,CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS.WEEKLY+".000")
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.OVERTIME_CALCULATION_PARAMETERS,app.GridCells.MONTHLY_LIMIT,CONTAINERS_OVERTIME_CALCULATION_PARAMETERS_DETAILS.MONTHLY+".000")
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.OVERTIME_CALCULATION_PARAMETERS,app.GridCells.TIME_SYMBOL_BDL1_FK_DESCRIPTION,TIME_SYMBOL_DESC)
        _common.minimizeContainer(cnt.uuid.OVERTIME_CALCULATION_PARAMETERS)
    })
})
   
    after(() => {
        cy.LOGOUT();
    });
