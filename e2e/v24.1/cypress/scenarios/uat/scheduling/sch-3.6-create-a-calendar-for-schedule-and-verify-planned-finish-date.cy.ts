import { btn,tile, app, cnt } from "cypress/locators";
import {_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = 'PRC' + Cypress._.random(0, 999);
const PRJ_NAME = 'TEST-PRJ-' + Cypress._.random(0, 9999);
const CLERK_NAME = 'HS';
const SCH_CODE = "SCH-" + Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACTDESC = "SA-" + Cypress._.random(0, 999);
const CAL_CODE = "CAL-CODE-" + Cypress._.random(0, 999);
const CAL_DESC = "SCH-DESC-" + Cypress._.random(0, 999);

allure.epic("SCHEDULING");
allure.feature("Line Of Balance");
allure.story("SCH- 3.6 | Project module - Create a calendar for schedule and verify planned finish date ");

describe("SCH- 3.6 | Project module - Create a calendar for schedule and verify planned finish date ", () => {

    beforeEach(function () {
        cy.fixture("scheduling/sch-3.6-create-a-calendar-for-schedule-and-verify-planned-finish-date.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));
        cy.fixture("scheduling/sch-3.6-create-a-calendar-for-schedule-and-verify-planned-finish-date.json").then((data) => {
            this.data = data
            const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.tabBar.project).then(() => {
				_common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
			});
			_common.create_newRecord(cnt.uuid.Projects);
			_projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
			cy.SAVE();
        });
    });
    after(() => {
        cy.LOGOUT();
      });
  
    it("TC - Create new schedule header and activity record.", function () {
        const ActivityStructureInputs = this.data.CreateActivityStructure.ActivityStructureInputs;
        const SCHEDULING_COLUMN = this.data.CreateSchedules.ColumnHeaders;
        _common.openTab(app.tabBar.scheduling).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, SCHEDULING_COLUMN)
        });
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(SCH_DESC,SCH_CODE);
        cy.SAVE();
     
    });
    it("TC - Add activity structure ", function () {
        const ACTIVITY_STRUCTURE_INPUT = this.data.CreateActivityStructure.ActivityStructureInputs;
        const LOCATION_FOOTER = this.data.CreateActivityStructure.Footer
        const ACTIVITY_COLUMN = this.data.CreateActivityStructure.ColumnHeaders;
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.Planning).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, LOCATION_FOOTER.FooterTab)
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _estimatePage.enterRecord_toScheduleActivity_withAddingRoot(ACTIVITY_STRUCTURE_INPUT.description1, ACTIVITY_STRUCTURE_INPUT.quantity, ACTIVITY_STRUCTURE_INPUT.uom, _validate.getDate("current"), _validate.getDate("incremented", 10));
		cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.edit_containerCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_DURATION, "10")
        cy.SAVE();
        _common.waitForLoaderToDisappear()
         _common.saveCellDataToEnv(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_DURATION,"PlannedDuration")

    });
    it("TC - Search and select unit Hour", function () { 
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const UNITCOLOUMN = this.data.CreateUnit.UnitColumnHeaders;
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.Unit);
        _common.openTab(app.tabBar.UNIT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT,2);
        _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, UNITCOLOUMN)
        });
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType,STANDARDINPUTS.Hour)
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.gridCells.UNIT_TYPE,STANDARDINPUTS.list,STANDARDINPUTS.Type)
    });
    it("TC - Search and select unit Day", function () { 
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const UNITCOLOUMN = this.data.CreateUnit.UnitColumnHeaders;
        _common.openTab(app.tabBar.UNIT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
        _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, UNITCOLOUMN)
        });
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType,STANDARDINPUTS.Day)
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.gridCells.UNIT_TYPE,STANDARDINPUTS.list,STANDARDINPUTS.Type1)
    });
    it("TC - Create Calender ", function () { 
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.Calendar);
        _common.openTab(app.tabBar.CALENDER).then(() => {
        _common.setDefaultView(app.tabBar.CALENDER)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.Schedule, app.FooterTab.CALENDARS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.Schedule)
        _common.create_newRecord(cnt.uuid.Schedule)
        _common.maximizeContainer(cnt.uuid.Schedule)
        _common.enterRecord_inNewRow(cnt.uuid.Schedule,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,CAL_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.Schedule,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CAL_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.Schedule,app.gridCells.UNIT_HOUR,STANDARDINPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,STANDARDINPUTS.Hour)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Schedule,app.gridCells.UNIT_DAY,STANDARDINPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,STANDARDINPUTS.Day)
        cy.SAVE()
    }); 
    it("TC - Navigate back to the created project and change the calender.", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.Project);
     
        _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType,PRJ_NO)
        _common.maximizeContainer(cnt.uuid.Projects)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Projects, app.gridCells.CALENDAR)
        _common.edit_dropdownCellWithInput(cnt.uuid.Projects, app.gridCells.CALENDAR, STANDARDINPUTS.grid, app.InputFields.INPUT_GROUP_CONTENT, CAL_CODE);
        cy.SAVE();
        cy.wait(2000);
        _common.saveCellDataToEnv(cnt.uuid.Projects, app.gridCells.CALENDAR, STANDARDINPUTS.Calendar);
        _common.minimizeContainer(cnt.uuid.Projects)
    });
    it("TC - Change the schedule calender and verify the created new calender  ", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const ACTIVITY_STRUCTURE_INPUT = this.data.CreateActivityStructure.ActivityStructureInputs;
        const LOCATION_FOOTER = this.data.CreateActivityStructure.Footer
        const ACTIVITY_COLUMN = this.data.CreateActivityStructure.ColumnHeaders;
        const SCHEDULING_COLUMN = this.data.CreateSchedules.ColumnHeaders;
        _common.openTab(app.tabBar.scheduling).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, SCHEDULING_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
        _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULES, app.gridCells.CALENDAR, STANDARDINPUTS.grid, app.InputFields.INPUT_GROUP_CONTENT, CAL_CODE);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES);
        _common.openTab(app.tabBar.Planning).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, LOCATION_FOOTER.FooterTab)
         _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_COLUMN)
        });
        _estimatePage.enterRecord_toScheduleActivity_withAddingRoot(ACTIVITY_STRUCTURE_INPUT.description2, ACTIVITY_STRUCTURE_INPUT.quantity, ACTIVITY_STRUCTURE_INPUT.uom, _validate.getDate("current"), _validate.getDate("incremented", 10));
		cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_DURATION, "10")
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_by_contain(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_DURATION, Cypress.env("PlannedDuration"))  
    
    });
  
});