import { app, commonLocators, tile, sidebar, cnt } from "cypress/locators";
import { _common, _timekeepingPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const TIME_SYMBOL_CODE = 'CODE-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC = 'DESC-' + Cypress._.random(0, 999);
const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_TIME_SYMBOLS;
let CONTAINERS_TIME_SYMBOLS;
let TIME_SYMBOLS_PARAMETERS: DataCells;

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.24 | Create a Time symbol for recuperation time");

describe("ETK- 1.24 | Create a Time symbol for recuperation time", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.24-create-time-symbol-for-recuperation-time.json").then((data) => {
            this.data = data;


            CONTAINER_COLUMNS_TIME_SYMBOLS = this.data.CONTAINER_COLUMNS.TIME_SYMBOLS
            CONTAINERS_TIME_SYMBOLS = this.data.CONTAINERS.TIME_SYMBOLS
            TIME_SYMBOLS_PARAMETERS = {
                [app.GridCells.CODE]: TIME_SYMBOL_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TIME_SYMBOL_DESC,
                [app.GridCells.IS_PRESENCE]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_TIME_ACCOUNT]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_OVERTIME]: commonLocators.CommonKeys.CHECK,
                [app.GridCells.TIME_SYMBOL_TYPE_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_TYPE,
                [app.GridCells.TIME_SYMBOL_GROUP_FK]: CONTAINERS_TIME_SYMBOLS.TIME_SYMBOL_GROUP
            }

        })

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()

    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create Time symbols for Recuperation time", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIME_SYSBOLS)
        _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.TIME_SYMBOLS, app.FooterTab.TIME_SYMBOLS);
            _common.setup_gridLayout(cnt.uuid.TIME_SYMBOLS, CONTAINER_COLUMNS_TIME_SYMBOLS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_TIME_SYMBOLS.timesymbolgroupfk, CONTAINER_COLUMNS_TIME_SYMBOLS.timesymboltypefk, CONTAINER_COLUMNS_TIME_SYMBOLS.isovertime, CONTAINER_COLUMNS_TIME_SYMBOLS.istimeaccount, CONTAINER_COLUMNS_TIME_SYMBOLS.ispresence, CONTAINER_COLUMNS_TIME_SYMBOLS.descriptioninfo, CONTAINER_COLUMNS_TIME_SYMBOLS.code], cnt.uuid.TIME_SYMBOLS)

        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIME_SYMBOLS)
        _common.waitForLoaderToDisappear()
        _timekeepingPage.enterRecord_toCreateTimeSymbols(TIME_SYMBOLS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it("TC - Verify Time Symbol Record is Saved Successfully", function () {
        _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.TIME_SYMBOLS, app.FooterTab.TIME_SYMBOLS);

        })
        _common.select_rowHasValue(cnt.uuid.TIME_SYMBOLS, TIME_SYMBOL_CODE)
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.TIME_SYMBOLS, app.GridCells.CODE, TIME_SYMBOL_CODE)


    })

})


