import { sidebar, commonLocators, app, cnt } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const CALENDAR_CODE = "CAL-CODE" + Cypress._.random(0, 99);
const CALENDAR_DESC = "CAL-DESC" + Cypress._.random(0, 99);

let CONTAINER_COLUMNS_CALENDAR, CONTAINER_COLUMNS_UNIT;

let CONTAINER_CALENDAR, CONTAINERS_UNIT;

ALLURE.epic("CUSTOMER DEFECTS");
ALLURE.feature("Mainka Defects");
ALLURE.story("MD- 26887 | Unable to select a unit in the Calendar module");

describe("MD- 26887 | Unable to select a unit in the Calendar module", () => {

    before(function () {
        cy.fixture("customer-defects/md-26887-unable-to-select-a-unit-in-the-calendar-module.json").then((data) => {
            this.data = data;
            CONTAINER_CALENDAR = this.data.CONTAINERS.CALENDAR;
            CONTAINER_COLUMNS_CALENDAR = this.data.CONTAINER_COLUMNS.CALENDAR;
            CONTAINER_COLUMNS_UNIT = this.data.CONTAINER_COLUMNS.UNIT;
            CONTAINERS_UNIT = this.data.CONTAINERS.UNIT;
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Update UOM type in unit module for hour", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.UNIT)
        _common.openTab(app.TabBar.UNIT).then(() => {
            _common.setDefaultView(app.TabBar.UNIT)
            _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 0)
            _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, CONTAINER_COLUMNS_UNIT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.maximizeContainer(cnt.uuid.UNITSOFMEASUREMENT)
        _common.search_inSubContainer(cnt.uuid.UNITSOFMEASUREMENT, CONTAINERS_UNIT.UNIT_DESCRIPTION[0])
        _common.select_rowHasValue(cnt.uuid.UNITSOFMEASUREMENT, CONTAINERS_UNIT.UNIT_DESCRIPTION[0])
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.UOM_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_UNIT.TYPE[1])
        _common.set_cellCheckboxValue(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.IS_BASE, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Update UOM type in unit module for days", function () {
        _common.search_inSubContainer(cnt.uuid.UNITSOFMEASUREMENT, CONTAINERS_UNIT.UNIT_DESCRIPTION[1])
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.DESCRIPTION_INFO, CONTAINERS_UNIT.UNIT_DESCRIPTION[1])
        _common.select_activeRowInContainer(cnt.uuid.UNITSOFMEASUREMENT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.UOM_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_UNIT.TYPE[2])
        _common.set_cellCheckboxValue(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.IS_BASE, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Navigate to calender & create new record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.CALENDAR)
        _common.openTab(app.TabBar.CALENDER).then(() => {
            _common.setDefaultView(app.TabBar.CALENDER)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.SCHEDULE, app.FooterTab.CALENDARS, 2)
            _common.setup_gridLayout(cnt.uuid.SCHEDULE, CONTAINER_COLUMNS_CALENDAR)
        });
        _common.create_newRecord(cnt.uuid.SCHEDULE)
        _common.maximizeContainer(cnt.uuid.SCHEDULE)
        _common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CALENDAR_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CALENDAR_DESC)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULE, app.GridCells.BAS_UOM_HOUR_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CALENDAR.TYPE[0])
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULE, app.GridCells.BAS_UOM_DAY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CALENDAR.TYPE[1])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify the created calender record", function () {
        _common.maximizeContainer(cnt.uuid.SCHEDULE)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.SCHEDULE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.SCHEDULE, app.GridCells.DESCRIPTION_INFO, CALENDAR_DESC)
    });

});
