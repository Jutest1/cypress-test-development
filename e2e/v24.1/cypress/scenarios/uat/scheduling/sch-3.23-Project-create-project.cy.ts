import { btn,tile, app, cnt } from "cypress/locators";
import {_salesPage,_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = 'PRC' + Cypress._.random(0, 999);
const PRJ_NAME = 'TEST-PRJ-' + Cypress._.random(0, 9999);
const CLERK_NAME = 'HS';
const SCH_CODE = "SCH-" + Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACTDESC = "SA-" + Cypress._.random(0, 999);

allure.epic("SCHEDULING");
allure.feature("Project");
allure.story("SCH- 3.23 | Create Project");

describe("SCH- 3.23 | Create Project ", () => {

    beforeEach(function () {
        cy.fixture("scheduling/sch-3.7-create-activities-from-the-activity-group-template-and-create-dependencies.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));
        cy.fixture("scheduling/sch-3.7-create-activities-from-the-activity-group-template-and-create-dependencies.json").then((data) => {
            this.data = data
            const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.tabBar.project).then(() => {
				_common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
			});
            _common.clear_subContainerFilter(cnt.uuid.Projects)
			_common.create_newRecord(cnt.uuid.Projects);
			_projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
			cy.SAVE();
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
            _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem().search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
        });
    });
    after(() => {
        cy.LOGOUT();
      });

    it("TC - Create new schedule header and activity record.", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const SCHEDULING_COLUMN = this.data.CreateSchedules.ColumnHeaders;
        _common.openTab(app.tabBar.scheduling).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES,2);
        _common.setup_gridLayout(cnt.uuid.SCHEDULES, SCHEDULING_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(SCH_DESC,SCH_CODE);
        cy.SAVE();
       _common.edit_dropdownCellWithCaret(cnt.uuid.SCHEDULES,app.gridCells.PERFORMANCE_SHEET,STANDARDINPUTS.list,"Germany")
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
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,SCH_ACTDESC)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    });
     it("TC - Verify Created project in scheduling", function () {
        const LOCATION_FOOTER = this.data.CreateActivityStructure.Footer
        const ACTIVITY_COLUMN = this.data.CreateActivityStructure.ColumnHeaders;
        _common.openTab(app.tabBar.Planning).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, LOCATION_FOOTER.FooterTab)
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_COLUMN)
        });
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PROJECT_FK,PRJ_NO)
     });
     
    
  
});