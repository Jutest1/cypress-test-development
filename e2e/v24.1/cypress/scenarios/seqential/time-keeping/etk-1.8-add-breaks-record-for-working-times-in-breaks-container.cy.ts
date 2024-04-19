import { app, sidebar, commonLocators, cnt } from "cypress/locators";
import { _common, _timekeepingPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const TIME_SYMBOL_CODE = 'TS-CODE-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC = 'TS-DESC-' + Cypress._.random(0, 999);
const SHIFT_MOD_DESC = 'SHIFT-DESC-' + Cypress._.random(0, 999);
const WORKING_TIME_DESC = 'WT-DESC-' + Cypress._.random(0, 999);

let CONTAINERS_TIME_SYMBOLS, CONTAINERS_SHIFT_MODELS, CONTAINERS_WORKING_TIMES, CONTAINERS_BREAK_TIME;
let CONTAINER_COLUMNS_TIME_SYMBOLS, CONTAINER_COLUMNS_SHIFT_MODELS, CONTAINER_COLUMNS_WORKING_TIMES, CONTAINER_COLUMNS_BREAK;
let TIME_SYMBOLS_PARAMETERS: DataCells, SHIFT_MODELS_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS_1: DataCells, WORKING_TIMES_PARAMETERS_2: DataCells, WORKING_TIMES_PARAMETERS_3: DataCells, BREAK_PARAMETER: DataCells;

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.8 | Add Break Record for Working Times");

describe("ETK- 1.8 | Add Break Record for Working Times", () => {
    before(function () {
        cy.fixture("time-keeping/etk-1.8-add-breaks-record-for-working-times-in-breaks-container.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_TIME_SYMBOLS = this.data.CONTAINER_COLUMNS.TIME_SYMBOLS
            CONTAINERS_TIME_SYMBOLS = this.data.CONTAINERS.TIME_SYMBOLS
            TIME_SYMBOLS_PARAMETERS = {
                [app.GridCells.CODE]: TIME_SYMBOL_CODE,
                [app.GridCells.DESCRIPTION_INFO]: TIME_SYMBOL_DESC,
                [app.GridCells.IS_PRESENCE]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
                [app.GridCells.IS_PRODUCTIVE]: CONTAINERS_TIME_SYMBOLS.CHECKBOX,
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
            }
            CONTAINERS_BREAK_TIME = this.data.CONTAINERS.BREAK
            CONTAINER_COLUMNS_BREAK = this.data.CONTAINER_COLUMNS.BREAK
            BREAK_PARAMETER = {
                [app.GridCells.BREAK_START]: CONTAINERS_BREAK_TIME.BREAKSTART,
                [app.GridCells.BREAK_END]: CONTAINERS_BREAK_TIME.BREAKEND

            };

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
        _common.minimizeContainer(cnt.uuid.WORKING_TIME)

        _common.getText_fromCell(cnt.uuid.WORKING_TIME,app.GridCells.DURATION).then(($DURATION1) => {
           Cypress.env("DURATION1",($DURATION1.text()))
        _common.waitForLoaderToDisappear()
        })        
    })

    it("TC - Create Break Record", function () {
        _common.openTab(app.TabBar.SHIFT_MODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BREAK, app.FooterTab.BREAKS, 0)
           _common.setup_gridLayout(cnt.uuid.BREAK, CONTAINER_COLUMNS_BREAK)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.BREAK)
        _common.create_newRecord(cnt.uuid.BREAK)
        _timekeepingPage.enterRecord_toCreateBreak(cnt.uuid.BREAK,BREAK_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BREAK)
        _common.getText_fromCell(cnt.uuid.BREAK,app.GridCells.DURATION).then(($DURATION2) => {
           Cypress.env("DURATION2",($DURATION2.text()))
        _common.waitForLoaderToDisappear()
        })
        _common.getText_fromCell(cnt.uuid.BREAK,app.GridCells.BREAK_START).then(($BREAKSTART) => {
            Cypress.env("BREAKSTART",($BREAKSTART.text()))
         _common.waitForLoaderToDisappear()
         })
         _common.getText_fromCell(cnt.uuid.BREAK,app.GridCells.BREAK_END).then(($BREAKEND) => {
            Cypress.env("BREAKEND",($BREAKEND.text()))
         _common.waitForLoaderToDisappear()
         })

    })
    
    it("TC - Assertion of BreakStart,BreakEnd and Duration", function () {
        _common.assert_cellData(cnt.uuid.WORKING_TIME,app.GridCells.BREAK_FROM,Cypress.env("BREAKSTART"))
        _common.assert_cellData(cnt.uuid.WORKING_TIME,app.GridCells.BREAK_TO,Cypress.env("BREAKEND"))
        _validate.verify_isRecordSubstractTwoValues(cnt.uuid.WORKING_TIME,Cypress.env("DURATION1"),Cypress.env("DURATION2"),app.GridCells.DURATION)
        
    })
})

