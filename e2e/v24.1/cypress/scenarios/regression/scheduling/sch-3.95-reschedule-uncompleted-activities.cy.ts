import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
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

const ALLURE = Cypress.Allure.reporter.getInterface();

const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);
const PROJECT_NO = "PROJECT_NO-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PROJECT_DESC-" + Cypress._.random(0, 999);
const UNIT_DESC = "UNI-DESC-" + Cypress._.random(0, 999);
const UNIT_DESC1 = "UNI-DESC1-" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT = "U" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT1 = "M" + Cypress._.random(0, 999);
const CALENDAR_CODE = "CALE-CODE-" + Cypress._.random(0, 99);
const CALENDAR_DESC = "CALE-DESC-" + Cypress._.random(0, 99);
const ACTIVITY_STRUCTURE_DESC2 = "ACT-DESC-" + Cypress._.random(0, 999);


ALLURE.epic("SCHEDULING");
ALLURE.feature("Line Of Balance");
ALLURE.story("SCH- 3.6 | Project module - Create a calendar for schedule and verify planned finish date ");

describe("SCH- 3.6 | Project module - Create a calendar for schedule and verify planned finish date ", () => {

    before(function () {
        cy.fixture("scheduling/sch-3.6-create-a-calendar-for-schedule-and-verify-planned-finish-date.json").then((data) => {
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
				[app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
				[app.GridCells.PLANNED_START]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START),
                [app.GridCells.PLANNED_FINISH]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_FINISH,5),
                [app.GridCells.PLANNED_DURATION]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_DURATION,5),
			};
            SCHEDULE_ACTIVITY_PARAMETERS2 = {
				[app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_DESC2,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
				[app.GridCells.PLANNED_START]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START),
                [app.GridCells.PLANNED_FINISH]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_FINISH,10),
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
it("TC - Search and select unit Hour", function () { 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.UNIT);
    _common.openTab(app.TabBar.UNIT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
    _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, CONTAINER_COLUMNS_UNIT)
    });
    _common.create_newRecord(cnt.uuid.UNITSOFMEASUREMENT);
    _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_DESC)
    _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UNIT_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_OF_MEASUREMENT)
    cy.SAVE();
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,UNIT_DESC);
    _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UOM_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_UNIT.TYPE)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
});
it("TC - Search and select unit Day", function () { 
    _common.create_newRecord(cnt.uuid.UNITSOFMEASUREMENT);
    _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_DESC1)
    _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UNIT_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_OF_MEASUREMENT1)
    cy.SAVE();
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,UNIT_DESC1);
    _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UOM_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_UNIT.TYPE1)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()    
});
it("TC - Create Calender ", function () { 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.CALENDAR);
    _common.openTab(app.TabBar.CALENDER).then(() => {
    _common.setDefaultView(app.TabBar.CALENDER)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.SCHEDULE, app.FooterTab.CALENDARS, 2);
    _common.setup_gridLayout(cnt.uuid.SCHEDULE,CONTAINER_COLUMNS_CALENDAR)

    });
    _common.create_newRecord(cnt.uuid.SCHEDULE)
    _common.maximizeContainer(cnt.uuid.SCHEDULE)
    _common.enterRecord_inNewRow(cnt.uuid.SCHEDULE,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,CALENDAR_CODE)
    _common.enterRecord_inNewRow(cnt.uuid.SCHEDULE,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CALENDAR_DESC)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULE,app.GridCells.BAS_UOM_HOUR_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,UNIT_DESC)
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULE,app.GridCells.BAS_UOM_DAY_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,UNIT_DESC1)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
}); 
it("TC - Navigate back to the created project and change the calender.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.PROJECT);     
        _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
        _common.maximizeContainer(cnt.uuid.PROJECTS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROJECTS, app.GridCells.CALENDAR_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CALENDAR_CODE);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.CALENDAR_FK,CONTAINER_CALENDAR.CALENDAR );
        _common.minimizeContainer(cnt.uuid.PROJECTS)
});
it("TC -  Create new Schedule with new calender  ", function () {
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
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CALENDAR_FK,app.InputFields.INPUT_GROUP_CONTENT,CALENDAR_CODE)
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_DURATION,app.InputFields.INPUT_GROUP_CONTENT,"5")
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_FINISH,_common.getDate("incremented",4))
        _common.minimizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
});
it("TC -  Create new Schedule with calender DE verify the duration ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
        });
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CALENDAR_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,"DE")
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_DURATION,app.InputFields.INPUT_GROUP_CONTENT,"10")
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _validate.calculatePlannedFinish(cnt.uuid.ACTIVITY_STRUCTURE,"excludeweekend",9,"05/02/2024")
        _common.minimizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
});
     
after(() => {
cy.LOGOUT();
})
})