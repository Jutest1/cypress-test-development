
import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { btn,app,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import Sidebar from 'cypress/locators/sidebar';
import Buttons from 'cypress/locators/buttons';


let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let SCHEDULE_ACTIVITY_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINERS_UNIT;
let CONTAINER_COLUMNS_UNIT;
let CONTAINER_CALENDAR;
let CONTAINER_COLUMNS_CALENDAR;
let SCHEDULE_ACTIVITY_PARAMETERS2:DataCells;
let PROJECTS_PARAMETERS
let RENUMBERING_ACTIVITIES_LEVELS

const ALLURE = Cypress.Allure.reporter.getInterface();

const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const PROJECT_NO = "PROJECT_NO-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PROJECT_DESC-" + Cypress._.random(0, 999);
const ACT_STR_PARENT1 = "PARENT1-DESC-" + Cypress._.random(0, 999);
const ACT_STR_PARENT2 = "PARENT2-DESC-" + Cypress._.random(0, 99);
const ACT_STR_ROOT_CHILD = "ROOTCHILD-DESC-" + Cypress._.random(0, 999);
const ACT_STR_CHILD1 = "CHILD1-DESC-" + Cypress._.random(0, 999);


ALLURE.epic("SCHEDULING");
ALLURE.feature("Create Renumber Activities ");
ALLURE.story("SCH- 3.44 | Create Renumber Activities  ");

describe("SCH- 3.44 | Create Renumber Activities  ", () => {

    before(function () {
        cy.fixture("scheduling/sch-3.44-create-renumber-activities.json").then((data) => {
            this.data = data
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINERS_UNIT= this.data.CONTAINERS.UNIT
         CONTAINER_COLUMNS_UNIT= this.data.CONTAINER_COLUMNS.UNIT
         CONTAINER_CALENDAR = this.data.CONTAINERS.CALENDAR
         CONTAINER_COLUMNS_CALENDAR = this.data.CONTAINER_COLUMNS.CALENDAR

         PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:"SmiJ"
        }
            SCHEDULE_PARAMETERS = {
                [app.GridCells.CODE]: SCHEDULES_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
            };
			SCHEDULE_ACTIVITY_PARAMETERS = {
				[app.GridCells.DESCRIPTION]: ACT_STR_PARENT1,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
			
			};
            SCHEDULE_ACTIVITY_PARAMETERS2 = {
				[app.GridCells.DESCRIPTION]: ACT_STR_PARENT2,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,

			};

            RENUMBERING_ACTIVITIES_LEVELS = {
				[commonLocators.CommonLabels.CODE_FORMAT]: "Alphanumerical Structuring"
			};
        })
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
 })
   
it('TC - Create project', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);		
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.setDefaultView(app.TabBar.PROJECT)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
    cy.SAVE();          
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
    _common.waitForLoaderToDisappear()
})
it("TC - Create new Schedule for parent activity ", function () {
    _common.openTab(app.TabBar.SCHEDULING).then(() => {
     _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
    _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
    });
    _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
    _common.create_newRecord(cnt.uuid.SCHEDULES)
    _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
    _common.waitForLoaderToDisappear()
     cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,Buttons.IconButtons.ICO_GO_TO);
    _common.openTab(app.TabBar.PLANNING).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
    _schedulePage.enterDataTo_CreateScheduleActivity(ACT_STR_ROOT_CHILD, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UOM);//ROOT AND p1
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)//Will select all data
    _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)//Will clear all data

    _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE)//This record will  still be child 
    _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_COMMENT,ACT_STR_PARENT1)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE)//converting child as parent1 
    _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_COMMENT,ACT_STR_CHILD1)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)//Will select all data
    _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)//Will clear all data
    _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE)// creating parent 2
    _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_COMMENT,ACT_STR_PARENT2)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.RENUMBERING_ACTIVITIES);
    _common.waitForLoaderToDisappear()
    _schedulePage.enterRecord_to_set_Renumbering("Renumber Settings",RENUMBERING_ACTIVITIES_LEVELS)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
});
it("TC - Verify the Renumbering  for Created Activity for Root child", function () {
    _common.openTab(app.TabBar.PLANNING).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
    });
    _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE,ACT_STR_ROOT_CHILD)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CODE,"A")
});
it("TC - Verify the Renumbering  for Created parent 1 ", function () {
    _common.openTab(app.TabBar.PLANNING).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
    });
    _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE,ACT_STR_PARENT1)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CODE,"B")
});
it("TC - Verify the Renumbering  for Created Activity child 1 ", function () {
    _common.openTab(app.TabBar.PLANNING).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
    });
    _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE,ACT_STR_CHILD1)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CODE,"B.A")
});
it("TC - Verify the Renumbering  for Created Activity parent 2 ", function () {
    _common.openTab(app.TabBar.PLANNING).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
    });
    _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE,ACT_STR_PARENT2)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CODE,"C")
  
});
     
after(() => {
cy.LOGOUT();
})
})