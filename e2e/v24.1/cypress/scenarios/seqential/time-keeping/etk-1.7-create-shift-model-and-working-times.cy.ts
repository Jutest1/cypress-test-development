import { app, sidebar, commonLocators, cnt } from "cypress/locators";
import { _common, _timekeepingPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const TIME_SYMBOL_CODE = 'TS-CODE-' + Cypress._.random(0, 999);
const TIME_SYMBOL_DESC = 'TS-DESC-' + Cypress._.random(0, 999);
const SHIFT_MOD_DESC = 'SHIFT-DESC-' + Cypress._.random(0, 999);
const WORKING_TIME_DESC = 'WT-DESC-' + Cypress._.random(0, 999);

let CONTAINERS_TIME_SYMBOLS, CONTAINERS_SHIFT_MODELS, CONTAINERS_WORKING_TIMES;
let CONTAINER_COLUMNS_TIME_SYMBOLS, CONTAINER_COLUMNS_SHIFT_MODELS, CONTAINER_COLUMNS_WORKING_TIMES;
let TIME_SYMBOLS_PARAMETERS: DataCells, SHIFT_MODELS_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS_1: DataCells, WORKING_TIMES_PARAMETERS_2: DataCells, WORKING_TIMES_PARAMETERS_3: DataCells, WORKING_TIMES_PARAMETERS_4: DataCells;

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.7 | Create Shift model and Working Times");

describe("ETK- 1.7 | Create Shift model and Working Times", () => {
    before(function () {
        cy.fixture("time-keeping/etk-1.7-create-shift-model-and-working-times.json").then((data) => {
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
})

