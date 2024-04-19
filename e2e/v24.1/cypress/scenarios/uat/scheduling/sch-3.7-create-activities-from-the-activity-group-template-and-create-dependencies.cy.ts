import { btn,tile, app, cnt } from "cypress/locators";
import {_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = 'PRC' + Cypress._.random(0, 999);
const PRJ_NAME = 'TEST-PRJ-' + Cypress._.random(0, 9999);
const CLERK_NAME = 'HS';
const SCH_CODE = "SCH-" + Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACTDESC = "SA-" + Cypress._.random(0, 999);
const AG_CODE = "AG_CODE-" + Cypress._.random(0, 999);
const AG_DESC = "AG_DESC-" + Cypress._.random(0, 999);
const AGA_CODE = "AGA_CODE-" + Cypress._.random(0, 999);
const AGA_DESC = "AGA_DESC-" + Cypress._.random(0, 999);
const PER_CODE = "PER_CODE-" + Cypress._.random(0, 999);
const PER_DESC = "PER_DESC-" + Cypress._.random(0, 999);

allure.epic("SCHEDULING");
allure.feature("Activity Template");
allure.story("SCH- 3.7 | Create activities from the activity group template and create dependencies ");

describe("SCH- 3.7 | Create activities from the activity group template and create dependencies ", () => {

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
        });
    });
    after(() => {
        cy.LOGOUT();
      });

      it("TC - create new Activity Group(s)", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.ActivityGroupsTemplates);
       cy.REFRESH_CONTAINER()
       _common.waitForLoaderToDisappear()
       _common.clear_subContainerFilter(cnt.uuid.ActivityGroupsTemplates)
       _common.create_newRecord(cnt.uuid.ActivityGroupsTemplates)
       _common.enterRecord_inNewRow(cnt.uuid.ActivityGroupsTemplates,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AG_CODE)
       _common.enterRecord_inNewRow(cnt.uuid.ActivityGroupsTemplates,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AG_DESC)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
      });

      it("TC -  Define 'Template Activity Properties'.", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.ActivityTemplates);
       cy.REFRESH_CONTAINER()
       _common.waitForLoaderToDisappear()
       _common.openTab(app.tabBar.ActivityTemplates).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Activity_Groups, app.FooterTab.ACTIVITY_GROUP);
        _common.clear_subContainerFilter(cnt.uuid.Activity_Groups)
        _common.maximizeContainer(cnt.uuid.Activity_Groups)
        _common.search_inSubContainer(cnt.uuid.Activity_Groups,AG_DESC)
        _common.minimizeContainer(cnt.uuid.Activity_Groups)
        });
       _common.openTab(app.tabBar.ActivityTemplates).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Template_Activity, app.FooterTab.TEMPLATE_ACTIVITY);
        });
        _common.clear_subContainerFilter(cnt.uuid.Template_Activity)
        _common.create_newRecord(cnt.uuid.Template_Activity)
        _common.enterRecord_inNewRow(cnt.uuid.Template_Activity,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AGA_CODE)
       _common.enterRecord_inNewRow(cnt.uuid.Template_Activity,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AGA_DESC)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
      });

     it("TC -  Define Performance Rules  and Performance sheet for an Activity", function () {
        const PERCOLOUMN = this.data.CreatePerformancerules.Performancerules;
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        _common.openTab(app.tabBar.ActivityTemplates).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Performance_Rules, app.FooterTab.PERFORMANCE_RULES);
        _common.setup_gridLayout(cnt.uuid.Performance_Rules, PERCOLOUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.Performance_Rules)
        _common.create_newRecord(cnt.uuid.Performance_Rules)
        _common.enterRecord_inNewRow(cnt.uuid.Performance_Rules,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,PER_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.Performance_Rules,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PER_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.Performance_Rules,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,"50")
         cy.wait(1000)
        _common.edit_dropdownCellWithInput(cnt.uuid.Performance_Rules,app.gridCells.UOM_1,STANDARDINPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,"10M3")
        _common.edit_dropdownCellWithInput(cnt.uuid.Performance_Rules,app.gridCells.UOM_2,STANDARDINPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,"BAG")
        cy.wait(1000)
        _common.edit_dropdownCellWithCaret(cnt.uuid.Performance_Rules,app.gridCells.PERFORMANCE_SHEET,STANDARDINPUTS.list,"Germany")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
     });

    it("TC - Create new schedule header and activity record.", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const SCHEDULING_COLUMN = this.data.CreateSchedules.ColumnHeaders;
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.Project);
        _common.openTab(app.tabBar.scheduling).then(() => {
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
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
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
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.gridCells.SCHEDULE_TEMPLATE,STANDARDINPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,AGA_CODE)
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,SCH_ACTDESC)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    });
     it("TC - Verify productivity", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const LOCATION_FOOTER = this.data.CreateActivityStructure.Footer
        _common.openTab(app.tabBar.Planning).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, LOCATION_FOOTER.FooterTab)
         });
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.gridCells.SCHEDULE_PRODUCTIVITY,STANDARDINPUTS.Productivityvalue)

     });
     it("TC - Verify UOM", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const LOCATION_FOOTER = this.data.CreateActivityStructure.Footer
        _common.openTab(app.tabBar.Planning).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, LOCATION_FOOTER.FooterTab)
         });
         _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.gridCells.SCHEDULE_UOM1,STANDARDINPUTS.uom1)

     });

  
});