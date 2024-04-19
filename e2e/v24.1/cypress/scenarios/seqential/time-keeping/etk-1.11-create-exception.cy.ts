import { app, commonLocators, sidebar, cnt } from "cypress/locators";
import { _common, _timekeepingPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const TIME_SYMBOL_CODE = 'TIME-SYMB-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC = 'TIME-SYMB-DESC-' + Cypress._.random(0, 999);
const SHIFT_MOD_DESC = 'SHIFT-DESC-' + Cypress._.random(0, 999);
const EXCEPTIONS_DESC = 'EXCEP-DESC' + Cypress._.random(0, 999);

let CONTAINERS_TIME_SYMBOLS, CONTAINERS_SHIFT_MODELS, CONTAINER_EXCEPTIONS;
let CONTAINER_COLUMNS_TIME_SYMBOLS, CONTAINER_COLUMNS_SHIFT_MODELS, CONTAINER_COLUMNS_EXCEPTIONS;
let TIME_SYMBOLS_PARAMETERS: DataCells, SHIFT_MODELS_PARAMETERS: DataCells, EXCEPTIONS_PARAMETERS: DataCells, EXCEPTIONS_PARAMETERS_1: DataCells;

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.11 | Create Exception");

describe("ETK- 1.11 | Create Exception", () => {
    before(function () {
        cy.fixture("time-keeping/etk-1.11-create-exception.json").then((data) => {
            this.data = data;
            CONTAINERS_TIME_SYMBOLS = this.data.CONTAINERS.TIME_SYMBOLS
            CONTAINER_COLUMNS_TIME_SYMBOLS = this.data.CONTAINER_COLUMNS.TIME_SYMBOLS
            TIME_SYMBOLS_PARAMETERS = {
                [app.GridCells.CODE]: TIME_SYMBOL_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TIME_SYMBOL_DESC,
                [app.GridCells.IS_OFF_DAY]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_VACATION]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.TIME_SYMBOL_TYPE_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_TYPE,
                [app.GridCells.TIME_SYMBOL_GROUP_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_GROUP,
                [app.GridCells.VALUATION_PERCENT]: CONTAINERS_TIME_SYMBOLS.VALUATION_PERCENT,
                [app.GridCells.IS_TIME_ALLOCATION]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.VALUATION_RATE]: CONTAINERS_TIME_SYMBOLS.VALUATION_RATE,
            }
            CONTAINER_COLUMNS_SHIFT_MODELS = this.data.CONTAINER_COLUMNS.SHIFT_MODELS
            CONTAINERS_SHIFT_MODELS = this.data.CONTAINERS.SHIFT_MODELS
            SHIFT_MODELS_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: SHIFT_MOD_DESC,
                [app.GridCells.CALENDAR_FK]: CONTAINERS_SHIFT_MODELS.CALENDAR
            }
            CONTAINER_EXCEPTIONS = this.data.CONTAINERS.EXCEPTIONS
            CONTAINER_COLUMNS_EXCEPTIONS = this.data.CONTAINER_COLUMNS.EXCEPTIONS
            EXCEPTIONS_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: EXCEPTIONS_DESC,
                [app.GridCells.EXCEPT_DATE]: CONTAINER_EXCEPTIONS.EXCEPT_DATE,
                [app.GridCells.TIME_SYMBOL_FK]: TIME_SYMBOL_CODE,
            }
            EXCEPTIONS_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION_INFO]: EXCEPTIONS_DESC,
                [app.GridCells.EXCEPT_DATE]: CONTAINER_EXCEPTIONS.EXCEPT_DATE_1,
                [app.GridCells.TIME_SYMBOL_FK]: TIME_SYMBOL_CODE,
            }
        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    });
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create time symbols", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIME_SYSBOLS)
        _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_6)
            _common.select_tabFromFooter(cnt.uuid.TIME_SYMBOLS, app.FooterTab.TIME_SYMBOLS);
            _common.setup_gridLayout(cnt.uuid.TIME_SYMBOLS, CONTAINER_COLUMNS_TIME_SYMBOLS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_TIME_SYMBOLS.isoffday, CONTAINER_COLUMNS_TIME_SYMBOLS.valuationpercent, CONTAINER_COLUMNS_TIME_SYMBOLS.isvacation, CONTAINER_COLUMNS_TIME_SYMBOLS.istimeallocation, CONTAINER_COLUMNS_TIME_SYMBOLS.valuationrate,], cnt.uuid.TIME_SYMBOLS)
        })
        _common.maximizeContainer(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateTimeSymbols(TIME_SYMBOLS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.TIME_SYMBOLS)
    })

    it("TC - Create shift model", function () {
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
    })

    it("TC - Create exception", function () {
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
        _common.create_newRecord(cnt.uuid.EXCEPTIONS)
        _timekeepingPage.enterRecord_toCreateExceptions(cnt.uuid.EXCEPTIONS, EXCEPTIONS_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
})

