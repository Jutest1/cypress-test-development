import { app, sidebar, commonLocators, cnt } from "cypress/locators";
import { _common, _timekeepingPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const SHIFT_MOD_DESC = 'SHIFT-DESC-' + Cypress._.random(0, 999);
const WORKING_TIME_DESC = 'WT-DESC-' + Cypress._.random(0, 999);

let CONTAINERS_SHIFT_MODELS, CONTAINERS_WORKING_TIMES, CONTAINERS_BREAK_TIME;
let CONTAINER_COLUMNS_SHIFT_MODELS, CONTAINER_COLUMNS_WORKING_TIMES, CONTAINER_COLUMNS_BREAK;
let SHIFT_MODELS_PARAMETERS: DataCells, WORKING_TIMES_PARAMETERS: DataCells, BREAK_PARAMETER: DataCells;

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.22 | Add Breaks record for Working times in breaks container outside of working hours");

describe("ETK- 1.22 | Add Breaks record for Working times in breaks container outside of working hours", () => {
    before(function () {
        cy.fixture("time-keeping/etk-1.22-add-breaks-records-for-working-times-in-breaks-container-outside-of-working-hours.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_SHIFT_MODELS = this.data.CONTAINER_COLUMNS.SHIFT_MODELS
            CONTAINERS_SHIFT_MODELS = this.data.CONTAINERS.SHIFT_MODELS
            SHIFT_MODELS_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: SHIFT_MOD_DESC,
                [app.GridCells.CALENDAR_FK]: CONTAINERS_SHIFT_MODELS.CALENDAR
            }
            CONTAINER_COLUMNS_WORKING_TIMES = this.data.CONTAINER_COLUMNS.WORKING_TIMES
            CONTAINERS_WORKING_TIMES = this.data.CONTAINERS.WORKING_TIMES
            WORKING_TIMES_PARAMETERS = {
                [app.GridCells.ACRONYM]: CONTAINERS_WORKING_TIMES.ACRONYM,
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TIME_DESC,
                [app.GridCells.WEEK_DAY_FK]: CONTAINERS_WORKING_TIMES.WEEKDAY,
                [app.GridCells.FROM_TIME]: CONTAINERS_WORKING_TIMES.FROMTIME,
                [app.GridCells.TO_TIME]: CONTAINERS_WORKING_TIMES.TOTIME,
                [app.GridCells.DURATION]: CONTAINERS_WORKING_TIMES.DURATION,
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

    it("TC - Create working times", function () {
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
    })

    it("TC - Create break record", function () {
        _common.openTab(app.TabBar.SHIFT_MODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BREAK, app.FooterTab.BREAKS, 0)
            _common.setup_gridLayout(cnt.uuid.BREAK, CONTAINER_COLUMNS_BREAK)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.BREAK)
        _common.create_newRecord(cnt.uuid.BREAK)
        _timekeepingPage.enterRecord_toCreateBreak(cnt.uuid.BREAK, BREAK_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.BREAK)
        _common.saveCellDataToEnv(cnt.uuid.BREAK, app.GridCells.BREAK_START, "BREAKSTART")
        _common.saveCellDataToEnv(cnt.uuid.BREAK, app.GridCells.BREAK_END, "BREAKEND")
        _common.saveCellDataToEnv(cnt.uuid.WORKING_TIME, app.GridCells.DURATION, "Duration_WT")
    })

    it("TC - Assertion of break-start, break-end and duration", function () {
        _common.assert_cellData(cnt.uuid.WORKING_TIME, app.GridCells.BREAK_FROM, Cypress.env("BREAKSTART"))
        _common.assert_cellData(cnt.uuid.WORKING_TIME, app.GridCells.BREAK_TO, Cypress.env("BREAKEND"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.WORKING_TIME, app.GridCells.DURATION, Cypress.env("Duration_WT"));
    })
})

