import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _schedulePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


let PROJECTS_PARAMETERS: DataCells, SCHEDULE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_SCHEDULES, CONTAINER_COLUMNS_PREDECESSORS, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_PROJECT, CONTAINERS_ACTIVITY_STRUCTURE, CONTAINERS_PREDECESSORS;

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCHE-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCHE-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Verify fix lag time value");
ALLURE.story("SCH - 3.55 | fix lag time value' Activities Planned duration based on Un-checked calendar");

describe("SCH - 3.55 | fix lag time value' Activities Planned duration based on Un-checked calendar", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.55-fix-lag-time-value-activities-planned-duration-based-on-un-checked-calendar.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT

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

    it("TC - Add activities in activity structure", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.setDefaultView(app.TabBar.PLANNING, commonLocators.CommonKeys.DEFAULT)
            _common.set_containerLayoutUnderEditView(commonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(CONTAINERS_ACTIVITY_STRUCTURE.ACTDESC[0], CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0], CONTAINERS_ACTIVITY_STRUCTURE.UOM[0], _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL), _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
        _schedulePage.enterDataTo_CreateScheduleActivity(CONTAINERS_ACTIVITY_STRUCTURE.ACTDESC[1], CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0], CONTAINERS_ACTIVITY_STRUCTURE.UOM[0], _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL), _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
        cy.SAVE()
    });

    it("TC - Add predecessors record", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RELATIONSHIP_PREDECESSOR, app.FooterTab.PREDECESSORS, 1);
            _common.setup_gridLayout(cnt.uuid.RELATIONSHIP_PREDECESSOR, CONTAINER_COLUMNS_PREDECESSORS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PREDECESSORS.fixlagtime, CONTAINER_COLUMNS_PREDECESSORS.parentactivityfk], cnt.uuid.RELATIONSHIP_PREDECESSOR)
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
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify Planned duration in root activity header", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINERS_ACTIVITY_STRUCTURE.ACTDESC[2])
        _common.assert_activeRow_cellDataByContent_inContainer(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_DURATION, "5")
    })

})