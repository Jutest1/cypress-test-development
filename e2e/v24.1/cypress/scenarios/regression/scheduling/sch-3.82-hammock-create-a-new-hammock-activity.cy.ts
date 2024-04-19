import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _schedulePage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


let PROJECTS_PARAMETERS: DataCells, SCHEDULE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_SCHEDULES, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_PROJECT, CONTAINERS_ACTIVITY_STRUCTURE;

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCHE-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCHE-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PR" + Cypress._.random(0, 999);
const PRJ_NAME = "PR_NAME-" + Cypress._.random(0, 9999);
const DESC_1 = "DESC" + Cypress._.random(0, 9999);
const DESC_2 = "DESC" + Cypress._.random(0, 9999);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Create a new Hammock Activity");
ALLURE.story("SCH 3.82 | Hammock - Create a new Hammock Activity");

describe("SCH 3.82 | Hammock - Create a new Hammock Activity", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.82-hammock-create-a-new-hammock-activity.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT

            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME,
            }
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
            _common.select_tabFromFooter(cnt.uuid.HAMMOCK, app.FooterTab.HAMMOCK, 1);
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.quantity,CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.plannedstart,CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.plannedfinish,CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.plannedduration,CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.description,CONTAINER_COLUMNS_ACTIVITY_STRUCTURE.quantityuomfk],cnt.uuid.ACTIVITY_STRUCTURE)
        });
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(DESC_1, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0], CONTAINERS_ACTIVITY_STRUCTURE.UOM[0], _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL), _common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL, 5))
        _schedulePage.enterDataTo_CreateScheduleActivity(DESC_2, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0], CONTAINERS_ACTIVITY_STRUCTURE.UOM[0], _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL), _common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL, 10))
        cy.SAVE()
    });

    it("TC - Convert & verify activity type into Hammock", function () {
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, DESC_1)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE, btn.IconButtons.ICO_TASK_TO_HAMMOCK)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE, btn.IconButtons.ICO_TASK_TO_HAMMOCK)
        _validate.verify_isIconPresent(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_HAMMOCK);
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    })

    it("TC- Create Hammock and Assert the Hammock activity", function () {
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, DESC_1)
        _common.create_newRecord(cnt.uuid.HAMMOCK)
        _common.edit_dropdownCellWithInput(cnt.uuid.HAMMOCK,app.GridCells.ACTIVITY_MEMBER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,DESC_2)
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.HAMMOCK)
        _common.select_rowHasValue(cnt.uuid.HAMMOCK, "20")
        _common.assert_forNumericValues(cnt.uuid.HAMMOCK,app.GridCells.ACTIVITY_MEMBER_FK,"20")
    })
})