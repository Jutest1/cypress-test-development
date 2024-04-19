import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _schedulePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const SCHEDULE_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULE_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "MAIN-ACT-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_P1 = "ACT-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_P2 = "ACT-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_P3 = "ACT-DESC-" + Cypress._.random(0, 999);

let MODAL_PROJECTS;

let CONTAINER_COLUMNS_SCHEDULES, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_PREDECESSORS, CONTAINER_COLUMNS_SUCCESORS;

let CONTAINERS_SCHEDULE, CONTAINERS_ACTIVITY_STRUCTURE, CONTAINERS_PREDECESSORS, CONTAINERS_SUCCESORS;

let PROJECTS_PARAMETERS: DataCells, SCHEDULE_PARAMETERS: DataCells, SCHEDULE_ACTIVITY_PARAMETERS_1: DataCells, SCHEDULE_ACTIVITY_PARAMETERS_2: DataCells, SCHEDULE_ACTIVITY_PARAMETERS_3: DataCells;

ALLURE.epic("SCHEDULING")
ALLURE.feature("Predecessors and Successors")
ALLURE.story("SCH- 3.54 | predecessors and successors- Creation of predecessors and successors by selecting 2 activity records in activity structure")

describe("SCH- 3.54 | predecessors and successors- Creation of predecessors and successors by selecting 2 activity records in activity structure", () => {

    before(function () {

        cy.fixture("scheduling/sch-3.54-creation-of-predecessors-and-successors-by-selecting-2-activity-records-in-activity-structure.json").then((data) => {
            this.data = data;
            MODAL_PROJECTS = this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
            };
            CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
            CONTAINERS_SCHEDULE = this.data.CONTAINERS.SCHEDULES
            SCHEDULE_PARAMETERS = {
                [app.GridCells.CODE]: SCHEDULE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCHEDULE_DESC,
            };
            CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
            CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
            SCHEDULE_ACTIVITY_PARAMETERS_1 = {
                [app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_P1,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
            };
            SCHEDULE_ACTIVITY_PARAMETERS_2 = {
                [app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_P2,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
            };
            SCHEDULE_ACTIVITY_PARAMETERS_3 = {
                [app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_P3,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
            };
            CONTAINERS_PREDECESSORS = this.data.CONTAINERS.PREDECESSORS
            CONTAINER_COLUMNS_PREDECESSORS = this.data.CONTAINER_COLUMNS.PREDECESSORS
            CONTAINERS_SUCCESORS = this.data.CONTAINERS.SUCCESORS
            CONTAINER_COLUMNS_SUCCESORS = this.data.CONTAINER_COLUMNS.SUCCESORS
        }).then(() => {
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
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem()
    });
    it("TC - Create new schedule header", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES, SCHEDULE_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear();
    });
    it("TC - Add activities in activity structure", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.minimizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(ACTIVITY_STRUCTURE_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UoM);
        cy.SAVE();
        _common.waitForLoaderToDisappear();
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.CODE, commonLocators.CommonKeys.ROOT)
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE, SCHEDULE_ACTIVITY_PARAMETERS_1)
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE, SCHEDULE_ACTIVITY_PARAMETERS_2)
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE, SCHEDULE_ACTIVITY_PARAMETERS_3)
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINERS_ACTIVITY_STRUCTURE.UoM);
        _common.saveCellDataToEnv(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.CODE, "MAIN_ACTIVITY_CODE");
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINERS_ACTIVITY_STRUCTURE.UoM);
        _common.saveCellDataToEnv(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION, "MAIN_ACTIVITY_DESCRIPTION");
    })
    it("TC - Add predecessors record and assert successor, successor-description(main) and predecessor-description", function () {
        _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION, ACTIVITY_STRUCTURE_DESC)
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.FooterTab.PREDECESSORS, 1);
            _common.setup_gridLayout(cnt.uuid.RELATIONSHIP_PREDECESSOR, CONTAINER_COLUMNS_PREDECESSORS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PREDECESSORS.childactivityfk, CONTAINER_COLUMNS_PREDECESSORS.successordesc, CONTAINER_COLUMNS_PREDECESSORS.predecessordesc], cnt.uuid.RELATIONSHIP_PREDECESSOR)
        })
        _common.clear_subContainerFilter(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        _common.maximizeContainer(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        _common.create_newRecord(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        _common.edit_dropdownCellWithInput(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.GridCells.PARENT_ACTIVITY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PREDECESSORS.PARENT)
        _common.select_rowInContainer(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.GridCells.CHILD_ACTIVITY_FK, Cypress.env("MAIN_ACTIVITY_CODE"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.GridCells.SUCCESSOR_DESC, Cypress.env("MAIN_ACTIVITY_DESCRIPTION"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.GridCells.PREDECESSOR_DESC, ACTIVITY_STRUCTURE_P1)
        _common.minimizeContainer(cnt.uuid.RELATIONSHIP_PREDECESSOR)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });
    it("TC - Add successors record and assert parent, predecessor-description(main) and successor-description", function () {
        _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION, ACTIVITY_STRUCTURE_DESC)
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RELATIONSHIP_SUCCESSOR, app.FooterTab.SUCCESORS, 2);
            _common.setup_gridLayout(cnt.uuid.RELATIONSHIP_SUCCESSOR, CONTAINER_COLUMNS_SUCCESORS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_SUCCESORS.childactivityfk, CONTAINER_COLUMNS_SUCCESORS.predecessordesc, CONTAINER_COLUMNS_SUCCESORS.successordesc], cnt.uuid.RELATIONSHIP_SUCCESSOR)
        })
        _common.clear_subContainerFilter(cnt.uuid.RELATIONSHIP_SUCCESSOR)
        _common.maximizeContainer(cnt.uuid.RELATIONSHIP_SUCCESSOR)
        _common.create_newRecord(cnt.uuid.RELATIONSHIP_SUCCESSOR)
        _common.edit_dropdownCellWithInput(cnt.uuid.RELATIONSHIP_SUCCESSOR, app.GridCells.CHILD_ACTIVITY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SUCCESORS.SUCCESOR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.RELATIONSHIP_SUCCESSOR)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RELATIONSHIP_SUCCESSOR, app.GridCells.PARENT_ACTIVITY_FK, Cypress.env("MAIN_ACTIVITY_CODE"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.RELATIONSHIP_SUCCESSOR, app.GridCells.PREDECESSOR_DESC, Cypress.env("MAIN_ACTIVITY_DESCRIPTION"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.RELATIONSHIP_SUCCESSOR, app.GridCells.SUCCESSOR_DESC, ACTIVITY_STRUCTURE_P2)
        _common.minimizeContainer(cnt.uuid.RELATIONSHIP_SUCCESSOR)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })
});      