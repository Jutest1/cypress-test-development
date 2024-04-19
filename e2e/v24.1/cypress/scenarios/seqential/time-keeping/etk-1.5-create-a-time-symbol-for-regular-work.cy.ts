import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';
import _ from 'cypress/types/lodash';



const TIME_SYMBOL_CODE='TI-SYMB-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC='TI-SYMB-' + Cypress._.random(0, 999);
const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_TIME_SYMBOLS;
let CONTAINERS_TIME_SYMBOLS;
let TIME_SYMBOLS_PARAMETERS:DataCells;

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.5 | Create a Time symbol for Regular work");

describe("ETK- 1.5 | Create a Time symbol for Regular work", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.5-create-a-time-symbol-for-regular-work.json").then((data) => {
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
            
        })

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
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

    it("Verify Time Symbol Record is Saved Successfully",function(){
        _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.TIME_SYMBOLS, app.FooterTab.TIME_SYMBOLS);
            _common.setup_gridLayout(cnt.uuid.TIME_SYMBOLS, CONTAINER_COLUMNS_TIME_SYMBOLS)
        })
        _common.assert_cellData(cnt.uuid.TIME_SYMBOLS,app.GridCells.CODE,TIME_SYMBOL_CODE)
        _common.assert_cellData(cnt.uuid.TIME_SYMBOLS,app.GridCells.DESCRIPTION_INFO,TIME_SYMBOL_DESC)

    })

})
   
    after(() => {
        cy.LOGOUT();
    });
