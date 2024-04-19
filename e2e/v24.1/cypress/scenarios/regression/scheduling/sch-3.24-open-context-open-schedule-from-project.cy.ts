import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _schedulePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const SCHEDULE_ACTDESC = "SA-" + Cypress._.random(0, 999);
const SCHEDULE_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULE_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);

let MODAL_PROJECTS;
let CONTAINER_COLUMNS_SCHEDULES, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_SCHEDULE, CONTAINERS_ACTIVITY_STRUCTURE;

let PROJECTS_PARAMETERS: DataCells, SCHEDULE_PARAMETERS: DataCells, SCHEDULE_ACTIVITY_PARAMETERS: DataCells;

ALLURE.epic("SCHEDULING")
ALLURE.feature("Scheduling")
ALLURE.story("SCH- 3.24 | Open Context Open Schedule from Project")

describe("SCH- 3.24 | Open Context Open Schedule from Project", () => {
    
    before(function () {
        cy.fixture("scheduling/sch-3.24-open-context-open-schedule-from-project.json").then((data) => {
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
                [app.GridCells.DESCRIPTION]: SCHEDULE_ACTDESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
                [app.GridCells.UOM]: CONTAINERS_ACTIVITY_STRUCTURE.UoM,
            };
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        });
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new project", function () {
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
        _common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.PROJECT_NO, 'ProjectNo');
    });

    it("TC - Create new schedule header ", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.waitForLoaderToDisappear();
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2)
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES, SCHEDULE_PARAMETERS);
        cy.SAVE();
        _common.saveCellDataToEnv(cnt.uuid.SCHEDULES, app.GridCells.CODE, 'Schedule_Header_Name');
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear();
    });

    it("TC - Add activity structure ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(ACTIVITY_STRUCTURE_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UoM);
        cy.SAVE();
        _common.waitForLoaderToDisappear();
    });

    it("TC - Assert the schedule header & project number in schedule activity structure", function () {
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.SCHEDULE_FK, Cypress.env('Schedule_Header_Name'));
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINERS_ACTIVITY_STRUCTURE.UoM);
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PROJECT_FK, Cypress.env('ProjectNo'));
    });

});      