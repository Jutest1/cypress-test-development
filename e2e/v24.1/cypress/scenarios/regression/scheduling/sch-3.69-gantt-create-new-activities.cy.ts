import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _schedulePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

let PROJECTS_PARAMETERS: DataCells, SCHEDULE_PARAMETERS: DataCells, GANTT_PARAMETER: DataCells, GANTT_PARAMETER_2: DataCells, GANTT_PARAMETER_3: DataCells, GANTT_PARAMETER_4: DataCells;
let CONTAINER_COLUMNS_SCHEDULES, CONTAINER_COLUMNS_GANTT_TREEGRID;
let CONTAINERS_PROJECT, CONTAINERS_GANTT_TREEGRID;

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCHE-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCHE-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJ-" + Cypress._.random(0, 9999);
const DESC_NAME = "DESC-" + Cypress._.random(0, 9999);
const DESC_NAME_2 = "DESC-" + Cypress._.random(0, 9999);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Create Activity in GANTT");
ALLURE.story("SCH - 3.69 | Gantt Create new Activities");

describe("SCH - 3.69 | Gantt Create new Activities", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.69-gantt-create-new-activities.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT

            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            }
            CONTAINERS_GANTT_TREEGRID = this.data.CONTAINERS.GANTT_TREEGRID

            GANTT_PARAMETER = {
                [app.GridCells.DESCRIPTION]: DESC_NAME,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_GANTT_TREEGRID.QUANTITY,
                [app.GridCells.PLANNED_START]: CONTAINERS_GANTT_TREEGRID.PLANNED_DATE[0],
                [app.GridCells.PLANNED_FINISH]: CONTAINERS_GANTT_TREEGRID.FINISHED_DATE[0],
            };
            GANTT_PARAMETER_2 = {
                [app.GridCells.DESCRIPTION]: DESC_NAME_2,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_GANTT_TREEGRID.QUANTITY,
                [app.GridCells.PLANNED_START]: CONTAINERS_GANTT_TREEGRID.PLANNED_DATE[1],
                [app.GridCells.PLANNED_FINISH]: CONTAINERS_GANTT_TREEGRID.FINISHED_DATE[1],
            };
            GANTT_PARAMETER_3 = {

                [app.GridCells.PLANNED_START]: CONTAINERS_GANTT_TREEGRID.PLANNED_DATE[2],
                [app.GridCells.PLANNED_FINISH]: CONTAINERS_GANTT_TREEGRID.FINISHED_DATE[2],
            };
            GANTT_PARAMETER_4 = {

                [app.GridCells.PLANNED_START]: CONTAINERS_GANTT_TREEGRID.PLANNED_DATE[3],
                [app.GridCells.PLANNED_FINISH]: CONTAINERS_GANTT_TREEGRID.FINISHED_DATE[3],
            };
            CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
            CONTAINER_COLUMNS_GANTT_TREEGRID = this.data.CONTAINER_COLUMNS.GANTT_TREEGRID
            SCHEDULE_PARAMETERS = {
                [app.GridCells.CODE]: SCHEDULES_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
            };
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
    })

    after(() => {
        cy.LOGOUT();
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
        _common.waitForLoaderToDisappear()
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES, SCHEDULE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES, btn.ToolBar.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Add activities in GANTT", function () {
        _common.openTab(app.TabBar.GANTT).then(() => {
            _common.setDefaultView(app.TabBar.GANTT, commonLocators.CommonKeys.DEFAULT)
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_0)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.GANTT_TREE_GRID, app.FooterTab.GANTT_TREEGRID);
            _common.setup_gridLayout(cnt.uuid.GANTT_TREE_GRID, CONTAINER_COLUMNS_GANTT_TREEGRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.GANTT_TREE_GRID)
        _common.create_newSubRecord(cnt.uuid.GANTT_TREE_GRID);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.GANTT_TREE_GRID, GANTT_PARAMETER)
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.GANTT_TREE_GRID);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.GANTT_TREE_GRID, GANTT_PARAMETER_2)
        cy.SAVE()
    });

    it("TC - Verify Planned duration in activity", function () {
        _common.clear_subContainerFilter(cnt.uuid.GANTT_TREE_GRID)
        _common.select_rowHasValue(cnt.uuid.GANTT_TREE_GRID, DESC_NAME)
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.GANTT_TREE_GRID, app.GridCells.PLANNED_DURATION, "4")
        _common.select_rowHasValue(cnt.uuid.GANTT_TREE_GRID, DESC_NAME_2)
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.GANTT_TREE_GRID, app.GridCells.PLANNED_DURATION, "5")
    })

    it("TC - Able to Change Activity Start date and end date", function () {
        _common.clear_subContainerFilter(cnt.uuid.GANTT_TREE_GRID)
        _common.select_rowHasValue(cnt.uuid.GANTT_TREE_GRID, DESC_NAME)
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.GANTT_TREE_GRID, GANTT_PARAMETER_3)
        cy.SAVE()
        _common.select_rowHasValue(cnt.uuid.GANTT_TREE_GRID, DESC_NAME_2)
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.GANTT_TREE_GRID, GANTT_PARAMETER_4)
        cy.SAVE()
        _common.select_rowHasValue(cnt.uuid.GANTT_TREE_GRID, DESC_NAME)
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.GANTT_TREE_GRID, app.GridCells.PLANNED_DURATION, "7")
        _common.select_rowHasValue(cnt.uuid.GANTT_TREE_GRID, DESC_NAME_2)
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.GANTT_TREE_GRID, app.GridCells.PLANNED_DURATION, "13")
    })
})