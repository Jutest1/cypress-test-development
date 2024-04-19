import { commonLocators, app, tile, sidebar, cnt, btn } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _schedulePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


let PROJECTS_PARAMETERS: DataCells, SCHEDULE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_SCHEDULES, CONTAINER_COLUMNS_PREDECESSORS, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_CALENDAR, CONTAINER_COLUMNS_UNIT, CONTAINER_COLUMNS_PROJECT;
let CONTAINERS_PROJECT, CONTAINERS_ACTIVITY_STRUCTURE, CONTAINERS_PREDECESSORS, CONTAINERS_CALENDAR, CONTAINERS_UNIT;

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCHE-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCHE-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CALENDAR_CODE = "CALE-CODE-" + Cypress._.random(0, 99);
const CALENDAR_DESC = "CALE-DESC-" + Cypress._.random(0, 99);
const UNIT_DESC = "UNI-DESC-" + Cypress._.random(0, 999);
const UNIT_DESC1 = "UNI-DESC1-" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT = "U" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT1 = "M" + Cypress._.random(0, 999);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Verify fix lag time value");
ALLURE.story("SCH - 3.56 | fix lag time value Activities Planned duration based on checked calendar");

describe("SCH - 3.56 | fix lag time value Activities Planned duration based on checked calendar", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.56-fix-lag-time-value-activities-planned-duration-based-on-checked-calendar.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT
            CONTAINERS_CALENDAR = this.data.CONTAINERS.CALENDAR
            CONTAINER_COLUMNS_CALENDAR = this.data.CONTAINER_COLUMNS.CALENDAR
            CONTAINER_COLUMNS_UNIT = this.data.CONTAINER_COLUMNS.UNIT
            CONTAINERS_UNIT = this.data.CONTAINERS.UNIT
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            }
            CONTAINERS_PREDECESSORS = this.data.CONTAINERS.PREDECESSORS
            CONTAINER_COLUMNS_PREDECESSORS = this.data.CONTAINER_COLUMNS.PREDECESSORS
            CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
            CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
            CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE

            SCHEDULE_PARAMETERS = {
                [app.GridCells.CODE]: SCHEDULES_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
            };
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    })

    after(() => {
        cy.LOGOUT();
    })
    it("TC - Search and select unit Hour", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.UNIT);
        _common.openTab(app.TabBar.UNIT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
            _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, CONTAINER_COLUMNS_UNIT)
        });
        _common.create_newRecord(cnt.uuid.UNITSOFMEASUREMENT);
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, UNIT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.UNIT_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, UNIT_OF_MEASUREMENT)
        cy.SAVE();
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, UNIT_DESC);
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.UOM_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_UNIT.TYPE)
        cy.SAVE();
    });

    it("TC - Search and select unit Day", function () {
        _common.create_newRecord(cnt.uuid.UNITSOFMEASUREMENT);
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, UNIT_DESC1)
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.UNIT_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, UNIT_OF_MEASUREMENT1)
        cy.SAVE();
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, UNIT_DESC1);
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT, app.GridCells.UOM_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_UNIT.TYPE1)
        cy.SAVE();
    });

    it("TC - Create Calender ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, Sidebar.SideBarOptions.CALENDAR);
        _common.openTab(app.TabBar.CALENDER).then(() => {
            _common.setDefaultView(app.TabBar.CALENDER)
            _common.select_tabFromFooter(cnt.uuid.SCHEDULE, app.FooterTab.CALENDARS, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULE, CONTAINER_COLUMNS_CALENDAR)
        });
        _common.create_newRecord(cnt.uuid.SCHEDULE)
        _common.maximizeContainer(cnt.uuid.SCHEDULE)
        _common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CALENDAR_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CALENDAR_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULE, app.GridCells.BAS_UOM_HOUR_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, UNIT_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULE, app.GridCells.BAS_UOM_DAY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, UNIT_DESC1)
        cy.SAVE()
        _common.select_activeRowInContainer(cnt.uuid.SCHEDULE)
        _common.saveCellDataToEnv(cnt.uuid.SCHEDULE, app.GridCells.CODE, "CalendarCode")
    });

    it("TC - Create New Project, assign calendar to Project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        cy.SAVE();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
        _common.set_columnAtTop([CONTAINER_COLUMNS_PROJECT.calendarfk], cnt.uuid.PROJECTS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROJECTS, app.GridCells.CALENDAR_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CalendarCode"))
        cy.SAVE();
    })

    it("TC - Create new schedule header", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.create_newRecord(cnt.uuid.SCHEDULES)
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES, SCHEDULE_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES, btn.ToolBar.ICO_GO_TO)
    });

    it("TC - Add activities in activity structure", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.setDefaultView(app.TabBar.PLANNING, commonLocators.CommonKeys.DEFAULT)
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.calendarfk, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.plannedduration], cnt.uuid.ACTIVITY_STRUCTURE)
        });
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(CONTAINERS_ACTIVITY_STRUCTURE.ACTDESC[0], CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0], CONTAINERS_ACTIVITY_STRUCTURE.UOM[0], _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL), _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
        _schedulePage.enterDataTo_CreateScheduleActivity(CONTAINERS_ACTIVITY_STRUCTURE.ACTDESC[1], CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0], CONTAINERS_ACTIVITY_STRUCTURE.UOM[0], _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL), _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.CALENDAR_FK, Cypress.env("CalendarCode"))
        cy.SAVE()
    });

    it("TC - Add predecessors record", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.FooterTab.PREDECESSORS, 1);
            _common.setup_gridLayout(cnt.uuid.RELATIONSHIP_PREDECESSOR, CONTAINER_COLUMNS_PREDECESSORS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PREDECESSORS.fixlagtime, CONTAINER_COLUMNS_PREDECESSORS.parentactivityfk, CONTAINER_COLUMNS_PREDECESSORS.usecalendar], cnt.uuid.RELATIONSHIP_PREDECESSOR)
        });
        _common.clear_subContainerFilter(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINERS_ACTIVITY_STRUCTURE.ACTDESC[0])
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.FooterTab.PREDECESSORS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        _common.create_newRecord(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        _common.edit_dropdownCellWithInput(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.GridCells.PARENT_ACTIVITY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PREDECESSORS.PARENT_ACT)
        cy.SAVE()
        _common.edit_containerCell(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.GridCells.FIX_LAG_TIME, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PREDECESSORS.DURATION)
        cy.SAVE()
        _common.edit_containerCell(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.GridCells.FIX_LAG_TIME, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PREDECESSORS.DURATION)
        cy.SAVE()
        _common.set_cellCheckboxValue(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.GridCells.USE_CALENDAR, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
    });

    it("TC - Verify Planned duration in root activity header", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINERS_ACTIVITY_STRUCTURE.ACTDESC[2])
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_DURATION, "7")
    })

})