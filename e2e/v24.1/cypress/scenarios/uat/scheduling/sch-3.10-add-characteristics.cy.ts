
import { btn,tile, app, cnt } from "cypress/locators";
import {_procurementPage,_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";

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
const EVENT_DESC = "EVENT_DESC-" + Cypress._.random(0, 999);
const PER_DESC = "PER_DESC-" + Cypress._.random(0, 999);
const CHARGROUP = "CHARGROUP-" + Cypress._.random(0, 9999);
const CHAR = "CHAR-" + Cypress._.random(0, 9999);
const CHAR_DESC = "CHAR_DESC-" + Cypress._.random(0, 9999);


allure.epic("SCHEDULING");
allure.feature("Activity Template");
allure.story("SCH- 3.10 | Add Characteristics");

describe("SCH- 3.10 | Add Characteristics", () => {

    beforeEach(function () {
        cy.fixture("scheduling/sch-3.10-add-characteristics.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"),Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"));
        cy.fixture("scheduling/sch-3.10-add-characteristics.json").then((data) => {
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

      it("TC- Create Characteristic Group ,Characteristic and Characteristic Sections", function () {
          const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
          const COLUMN_CHAR=this.data.Headers.Column_Characteristic
          const COLUMN_CHAR_GROUP=this.data.Headers.Column_Characteristic_Group
          const COLUMN_CHAR_GROUP_SEC=this.data.Headers.Column_Characteristic_Sections
          const CHAR_SECTION = this.data.Characteristics_Sections
          _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.Characteristics);
          _common.openTab(app.tabBar.Characteristic_Group).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_GROUPS, app.FooterTab.CHARACTERISTIC_GROUP, 0);
          _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_GROUPS,COLUMN_CHAR_GROUP)
          });
          _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
          _common.select_allContainerData(cnt.uuid.CHARACTERISTIC_GROUPS)
          _common.collapseAll(cnt.uuid.CHARACTERISTIC_GROUPS)
          _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_GROUPS)
          _common.create_newRecord(cnt.uuid.CHARACTERISTIC_GROUPS)
          _procurementPage.enterRecord_ToCreateCharacteristicGroups(CHARGROUP)
          cy.SAVE()
          _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_GROUPS)
          _common.openTab(app.tabBar.Characteristic_Group).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP, app.FooterTab.CHARATERISTICS, 1);
            _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_CHAR_GROUP,COLUMN_CHAR)
          });
          _common.clear_subContainerFilter(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
          _common.create_newRecord(cnt.uuid.CHARACTERISTIC_CHAR_GROUP)
          _procurementPage.enterRecord_ToCreateCharacteristicForCharGroups(CHAR,CHAR_DESC,STANDARDINPUTS.Percent)
          cy.SAVE()
          _common.openTab(app.tabBar.Characteristic_Group).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CHARACTERISTIC_SECTIONS, app.FooterTab.CHARACTERISTIC_SECTIONS, 2);
            _common.setup_gridLayout(cnt.uuid.CHARACTERISTIC_SECTIONS,COLUMN_CHAR_GROUP_SEC)
          });
          _common.maximizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
          _procurementPage.characteristicsSections(CHAR_SECTION)
          cy.SAVE()
          _common.minimizeContainer(cnt.uuid.CHARACTERISTIC_SECTIONS)
      })
      it("TC- Create new Activity Group(s)", function () {
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
      it("TC- Define 'Template Activity Properties'.", function () {
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
      it("TC- Define Characteristic", function () {
          const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
          _common.openTab(app.tabBar.ActivityTemplates).then(() => {
          _common.select_tabFromFooter(cnt.uuid.Template_Characteristics, app.FooterTab.TEMPLATE_CHARACTERISTICS);
          });
          _common.create_newRecord(cnt.uuid.Template_Characteristics)
          _procurementPage.enterRecord_ToCreateCharacteristics(cnt.uuid.Template_Characteristics,CHAR,STANDARDINPUTS.Char_value,app.InputFields.INPUT_GROUP_CONTENT)
          cy.SAVE()
          cy.REFRESH_CONTAINER()
          _common.waitForLoaderToDisappear()
      });
      it("TC- Create new schedule header and activity record.", function () {
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
        _common.edit_dropdownCellWithCaret(cnt.uuid.SCHEDULES,app.gridCells.PERFORMANCE_SHEET,STANDARDINPUTS.list,STANDARDINPUTS.PerformanceSheet)
      });
      it("TC- Add activity structure ", function () {
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
        _estimatePage.enterRecord_toScheduleActivity_withAddingRoot(ACTIVITY_STRUCTURE_INPUT.description1, ACTIVITY_STRUCTURE_INPUT.quantity, ACTIVITY_STRUCTURE_INPUT.uom, _validate.getDate(STANDARDINPUTS.current), _validate.getDate(STANDARDINPUTS.incremented, STANDARDINPUTS.Value));
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.gridCells.SCHEDULE_TEMPLATE,STANDARDINPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,AGA_CODE)
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,SCH_ACTDESC)
        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
      });
      it("TC- Verify the Created characteristics ", function () {
         const LOCATION_FOOTER = this.data.CreateActivityStructure.Footer
        _common.openTab(app.tabBar.Planning).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Schedule_Characteristics, LOCATION_FOOTER.Cha_tab)
        });
        _common.assert_cellData_by_contain(cnt.uuid.Schedule_Characteristics,app.GridCells.DESCRIPTION,CHAR_DESC)
      });  
});
