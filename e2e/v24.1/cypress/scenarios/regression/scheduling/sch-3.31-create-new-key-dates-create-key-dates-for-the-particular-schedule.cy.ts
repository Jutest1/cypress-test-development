import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _schedulePage, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const SCHEDULE_ACT_DESC = "SA-" + Cypress._.random(0, 999);
const SCHEDULE_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULE_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);
const LOCATION_CODE = "LOC-CODE-" + Cypress._.random(0, 999);
const LOCATION_DESC = "LOC-DESC-" + Cypress._.random(0, 999);
const KEY_DATES_TEXT = "TEXT-VALUE-" + Cypress._.random(0, 999);

let MODAL_PROJECTS;

let CONTAINER_COLUMNS_SCHEDULES, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_LOCATIONS, CONTAINER_COLUMNS_KEY_DATES;

let CONTAINERS_SCHEDULE, CONTAINERS_ACTIVITY_STRUCTURE, CONTAINERS_LOCATIONS, CONTAINER_KEY_DATES;

let PROJECTS_PARAMETERS: DataCells, SCHEDULE_PARAMETERS: DataCells, SCHEDULE_ACTIVITY_PARAMETERS: DataCells;

ALLURE.epic("SCHEDULING")
ALLURE.feature("Scheduling")
ALLURE.story("SCH- 3.31 | Create new Key Dates Create key dates for the particular Schedule.")

describe("SCH- 3.31 | Create new Key Dates Create key dates for the particular Schedule.", () => {

    before(function () {
        cy.fixture("scheduling/sch-3.31-create-new-key-dates-create-key-dates-for-the-particular-schedule.json").then((data) => {
            this.data = data;
            MODAL_PROJECTS = this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
            }
            CONTAINERS_SCHEDULE = this.data.CONTAINERS.SCHEDULE
            CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
            CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
            CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
            SCHEDULE_PARAMETERS = {
                [app.GridCells.CODE]: SCHEDULE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCHEDULE_DESC,
            };
            SCHEDULE_ACTIVITY_PARAMETERS = {
                [app.GridCells.DESCRIPTION]: SCHEDULE_ACT_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
                [app.GridCells.UOM]: CONTAINERS_ACTIVITY_STRUCTURE.UoM,
            };
            CONTAINER_COLUMNS_LOCATIONS = this.data.CONTAINER_COLUMNS.LOCATIONS
            CONTAINERS_LOCATIONS = this.data.CONTAINERS.LOCATIONS
            CONTAINER_COLUMNS_KEY_DATES = this.data.CONTAINER_COLUMNS.KEY_DATES
            CONTAINER_KEY_DATES = this.data.CONTAINERS.KEY_DATES
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        });
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new project & pinned the project", function () {
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear();
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        _common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.PROJECT_NO, "ProjectNo");
    });

    it("TC - Create new schedule header", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.waitForLoaderToDisappear();
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2)
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES, SCHEDULE_PARAMETERS);
        cy.SAVE();
        _common.saveCellDataToEnv(cnt.uuid.SCHEDULES, app.GridCells.CODE, "Schedule_Header_Name");
    });

    it("TC - Create new key dates record", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TIME_LINES, app.FooterTab.KEY_DATES, 2)
            _common.setup_gridLayout(cnt.uuid.TIME_LINES, CONTAINER_COLUMNS_KEY_DATES)
        });
        _common.clear_subContainerFilter(cnt.uuid.TIME_LINES);
        _common.create_newRecord(cnt.uuid.TIME_LINES);
        _common.edit_containerCell(cnt.uuid.TIME_LINES, app.GridCells.DATE, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL));
        _common.edit_containerCell(cnt.uuid.TIME_LINES, app.GridCells.END_DATE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL, 3));
        _common.edit_containerCell(cnt.uuid.TIME_LINES, app.GridCells.TEXT, app.InputFields.DOMAIN_TYPE_DESCRIPTION, KEY_DATES_TEXT);
        _common.edit_containerCell(cnt.uuid.TIME_LINES, app.GridCells.REMARK, app.InputFields.DOMAIN_TYPE_REMARK, CONTAINER_KEY_DATES.REMARK);
        _common.set_cellCheckboxValue(cnt.uuid.TIME_LINES, app.GridCells.IS_ACTIVE, commonLocators.CommonKeys.CHECK);
        cy.SAVE();
    });

    it("TC - Create location record", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 1)
            _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATIONS)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION);
        _common.create_newRecord(cnt.uuid.PROJECT_LOCATION);
        _estimatePage.enterRecord_toCreateLocation(LOCATION_CODE, LOCATION_DESC);
        _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATIONS.QUANTITYFACTOR1);
        cy.SAVE();
        _common.saveCellDataToEnv(cnt.uuid.PROJECT_LOCATION, app.GridCells.CODE, "Location_Description");
    });

    it("TC - Create activity structure and add location to it", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.search_inSubContainer(cnt.uuid.SCHEDULES, Cypress.env("Schedule_Header_Name"));
        _common.select_rowInSubContainer(cnt.uuid.SCHEDULES);
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES, btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE);
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterDataTo_CreateScheduleActivity(ACTIVITY_STRUCTURE_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UoM);
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.LOCATION_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("Location_Description"));
        _common.edit_dropdownCellWithCaret(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.ACTIVITY_PRESENTATION_FK, CommonLocators.CommonKeys.LIST, CommonLocators.CommonKeys.DOWNWARDS);
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE);
        _common.waitForLoaderToDisappear();
        cy.SAVE();
        _common.edit_dropdownCellWithCaret(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.ACTIVITY_PRESENTATION_FK, CommonLocators.CommonKeys.LIST, CommonLocators.CommonKeys.DOWNWARDS);
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE);
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.SCHEDULE_FK, Cypress.env("Schedule_Header_Name"));
    });

    it("TC - Go to LOB tab & assert location , activity present in activity structure", function () {
        _common.openTab(app.TabBar.LOB).then(() => {
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 1);
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE);
            _common.set_columnAtTop([CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.activitypresentationfk, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.locationfk], cnt.uuid.ACTIVITY_STRUCTURE);
        })
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE);
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINERS_ACTIVITY_STRUCTURE.UoM);
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.LOCATION_FK, Cypress.env("Location_Description"));
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.ACTIVITY_PRESENTATION_FK, CommonLocators.CommonKeys.DOWNWARDS);
    });
    
});  