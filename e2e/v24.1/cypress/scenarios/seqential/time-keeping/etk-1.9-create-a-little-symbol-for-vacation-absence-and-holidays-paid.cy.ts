import { app, commonLocators, sidebar, cnt } from "cypress/locators";
import { _common, _timekeepingPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const TIME_SYMBOL_CODE = 'TIME-SYMB-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC = 'TIME-SYMB-DESC-' + Cypress._.random(0, 999);

let CONTAINERS_TIME_SYMBOLS;
let CONTAINER_COLUMNS_TIME_SYMBOLS;
let TIME_SYMBOLS_PARAMETERS: DataCells;

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.9 | Create a Time symbol for vacation, absence and holidays(Paid)");

describe("ETK- 1.9 | Create a Time symbol for vacation, absence and holidays(Paid)", () => {
    before(function () {
        cy.fixture("time-keeping/etk-1.9-create-a-little-symbol-for-vacation-absence-and-holidays-paid.json").then((data) => {
            this.data = data;
            CONTAINERS_TIME_SYMBOLS = this.data.CONTAINERS.TIME_SYMBOLS
            CONTAINER_COLUMNS_TIME_SYMBOLS = this.data.CONTAINER_COLUMNS.TIME_SYMBOLS
            TIME_SYMBOLS_PARAMETERS = {
                [app.GridCells.CODE]: TIME_SYMBOL_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TIME_SYMBOL_DESC,
                [app.GridCells.IS_OFF_DAY]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.TIME_SYMBOL_TYPE_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_TYPE,
                [app.GridCells.TIME_SYMBOL_GROUP_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_GROUP,
                [app.GridCells.VALUATION_PERCENT]: CONTAINERS_TIME_SYMBOLS.VALUATION_PERCENT
            }
        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    });
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create time symbols for vacation, absence and holidays-paid", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIME_SYSBOLS)
        _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_6)
            _common.select_tabFromFooter(cnt.uuid.TIME_SYMBOLS, app.FooterTab.TIME_SYMBOLS);
            _common.setup_gridLayout(cnt.uuid.TIME_SYMBOLS, CONTAINER_COLUMNS_TIME_SYMBOLS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_TIME_SYMBOLS.isoffday, CONTAINER_COLUMNS_TIME_SYMBOLS.valuationpercent], cnt.uuid.TIME_SYMBOLS)
        })
        _common.maximizeContainer(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateTimeSymbols(TIME_SYMBOLS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
})

