import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, btn,commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import CommonLocators from 'cypress/locators/common-locators';
import Buttons from 'cypress/locators/buttons';

const SCH_CODE = "SCH-" + Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACTDESC = "SA-" + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let SCHEDULE_PARAMETERS:DataCells;
let CONTAINERS_SCHEDULE;
let CONTAINER_COLUMNS_SCHEDULES;
let SCHEDULE_ACTIVITY_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;

ALLURE.epic("SCHEDULING");
ALLURE.feature("Project");
ALLURE.story("SCH- 3.23 | Create Project");

describe("SCH- 3.23 | Create Project ", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.23-Project-create-project.json").then((data) => {
            this.data = data
            CONTAINERS_SCHEDULE = this.data.CONTAINERS.SCHEDULE
            CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
            CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
            CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
            SCHEDULE_PARAMETERS = {
                [app.GridCells.CODE]: SCH_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCH_DESC,
            };
			SCHEDULE_ACTIVITY_PARAMETERS = {
				[app.GridCells.DESCRIPTION]: SCH_ACTDESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
				[app.GridCells.PLANNED_START]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START),
                [app.GridCells.PLANNED_FINISH]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_FINISH,5),
                [app.GridCells.PLANNED_DURATION]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_DURATION,5),
			};
    
        });

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
   })
    it("TC - Create new schedule header and activity record.", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES,2);
        _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        cy.SAVE();
       _common.edit_dropdownCellWithCaret(cnt.uuid.SCHEDULES,app.GridCells.PERFORMANCE_SHEET,CommonLocators.CommonKeys.LIST,CONTAINERS_SCHEDULE.COUNTRY)
    });
    it("TC - Add activity structure ", function () {
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,Buttons.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE,CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });
     it("TC - Verify Created project in scheduling", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE,CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PROJECT_FK,Cypress.env('PROJECT_NUMBER'))
     });
     after(() => {
        cy.LOGOUT();
        })
})