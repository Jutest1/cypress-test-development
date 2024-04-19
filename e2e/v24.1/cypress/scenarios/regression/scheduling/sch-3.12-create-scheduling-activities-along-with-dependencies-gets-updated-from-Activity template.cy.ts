import { btn,tile, app, cnt,sidebar,commonLocators } from "cypress/locators";
import {_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";
import Sidebar from 'cypress/locators/sidebar';
import CommonLocators from "cypress/locators/common-locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACTDESC = "SA-" + Cypress._.random(0, 999);
const AG_CODE = "AG_CODE-" + Cypress._.random(0, 999);
const AG_DESC = "AG_DESC-" + Cypress._.random(0, 999);
const AGA_CODE = "AGA_CODE-" + Cypress._.random(0, 999);
const AGA_DESC = "AGA_DESC-" + Cypress._.random(0, 999);
const PER_CODE = "PER_CODE-" + Cypress._.random(0, 999);
const PER_DESC = "PER_DESC-" + Cypress._.random(0, 999);
const ACT_DESC = "ACT_DESC-" + Cypress._.random(0, 999);
const PROJECT_NO="PRJ-SCH" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);

let CONTAINERS_EVENT;
let SCHEDULE_PARAMETERS:DataCells;
let SCHEDULE_ACTIVITY_PARAMETERS:DataCells
let ACTIVITY_STRUCTURE_DESC;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_PERFORMANCE_RULES;
let  CONTAINERS_PERFORMANCE_RULES;
let UPDATE_PERFORMANCE_RULES
let PROJECTS_PARAMETERS:DataCells

ALLURE.epic("SCHEDULING");
ALLURE.feature("Activity group template");
ALLURE.story("SCH- 3.12 | Create scheduling activities along with dependencies gets updated from Activity template ");

describe("SCH- 3.12 | Create scheduling activities along with dependencies gets updated from Activity template ", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.12-create-scheduling-activities-along-with-dependencies-gets-updated-from-Activity template.json").then((data) => {
        this.data = data
        CONTAINERS_EVENT= this.data.CONTAINERS.EVENT
        CONTAINER_COLUMNS_PERFORMANCE_RULES= this.data.CONTAINER_COLUMNS.PERFORMANCE_RULES
         CONTAINERS_ACTIVITY_STRUCTURE= this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINERS_PERFORMANCE_RULES = this.data.CONTAINERS.PERFORMANCE_RULES
         UPDATE_PERFORMANCE_RULES= this.data.CONTAINERS.UPDATE_PERFORMANCE_RULES
         
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
       })
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
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

      it("TC - create new Activity Group(s)", function () {
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
         _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.ACTIVITY_GROUPS_TEMPLATES);       
         cy.REFRESH_CONTAINER()
         _common.waitForLoaderToDisappear()
         _common.clear_subContainerFilter(cnt.uuid.ACTIVITYGROUPSTEMPLATES)
         _common.create_newRecord(cnt.uuid.ACTIVITYGROUPSTEMPLATES)
         _common.enterRecord_inNewRow(cnt.uuid.ACTIVITYGROUPSTEMPLATES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AG_CODE)
         _common.enterRecord_inNewRow(cnt.uuid.ACTIVITYGROUPSTEMPLATES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AG_DESC)
         cy.SAVE()
        _common.waitForLoaderToDisappear()
      });
      it("TC -  Define 'Template Activity Properties'.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.ACTIVITY_TEMPLATES);       
       cy.REFRESH_CONTAINER()
       _common.waitForLoaderToDisappear()
       _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_GROUPS, app.FooterTab.ACTIVITY_GROUPS);
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_GROUPS)
        _common.maximizeContainer(cnt.uuid.ACTIVITY_GROUPS)
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_GROUPS,AG_DESC)
        _common.minimizeContainer(cnt.uuid.ACTIVITY_GROUPS)
       _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.TEMPLATE_ACTIVITY, app.FooterTab.ACTIVITIES);
        });
        _common.clear_subContainerFilter(cnt.uuid.TEMPLATE_ACTIVITY)
        _common.create_newRecord(cnt.uuid.TEMPLATE_ACTIVITY)
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AGA_CODE)
       _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AGA_DESC)
       cy.SAVE()
       _common.waitForLoaderToDisappear()
      });
      it("TC -  Define Performance Rules  and Performance sheet for an Activity", function () {
        _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PERFORMANCE_RULES, app.FooterTab.PERFORMANCE_RULES);
        _common.setup_gridLayout(cnt.uuid.PERFORMANCE_RULES, CONTAINER_COLUMNS_PERFORMANCE_RULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.PERFORMANCE_RULES)
        _common.create_newRecord(cnt.uuid.PERFORMANCE_RULES)
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,PER_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PER_DESC)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PERFORMANCE_RULES.QUANTITY)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PERFORMANCE_RULES,app.GridCells.UOM_1,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_RULES.UOM1)
        _common.edit_dropdownCellWithInput(cnt.uuid.PERFORMANCE_RULES,app.GridCells.UOM_2,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PERFORMANCE_RULES.UOM2)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.PERFORMANCE_RULES,app.GridCells.PERFORMANCE_SHEET,commonLocators.CommonKeys.LIST,CONTAINERS_PERFORMANCE_RULES.COUNTRY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
      });
      it("TC - Create new schedule header and activity record.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.PROJECT);    

        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
      });
      it("TC - Add activity structure ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
         _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
         _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(ACT_DESC,UPDATE_PERFORMANCE_RULES.SCHEDULES_QUANTITY, UPDATE_PERFORMANCE_RULES.UOM2)
		_common.waitForLoaderToDisappear()
		 cy.SAVE()
		_common.waitForLoaderToDisappear()
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
         cy.SAVE();
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_TEMPLATE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,AGA_CODE)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,SCH_ACTDESC)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
      });
      it("TC - Verify productivity", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
         });
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_PRODUCTIVITY,CONTAINERS_PERFORMANCE_RULES.PRODUCTIVITY_VALUE)
      });
      it("TC - Verify UOM", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE,app.FooterTab.ACTIVITY_STRUCTURE)
         });
         _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PERF1UOM_FK,CONTAINERS_PERFORMANCE_RULES.UOM1)
      });
      it("TC - Navigate back and update 'Template Activity Properties'.", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.ACTIVITY_TEMPLATES);       
        cy.REFRESH_CONTAINER()
       _common.waitForLoaderToDisappear()
       _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_GROUPS, app.FooterTab.ACTIVITY_GROUPS);
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_GROUPS)
        _common.maximizeContainer(cnt.uuid.ACTIVITY_GROUPS)
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_GROUPS,AG_DESC)
        _common.minimizeContainer(cnt.uuid.ACTIVITY_GROUPS)
       _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.TEMPLATE_ACTIVITY, app.FooterTab.ACTIVITIES);
        });
        _common.clear_subContainerFilter(cnt.uuid.TEMPLATE_ACTIVITY)
        _common.select_rowHasValue(cnt.uuid.TEMPLATE_ACTIVITY,AGA_DESC)
      });
      it("TC - Update  Performance Rules  and Performance sheet for an Activity", function () {
            _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PERFORMANCE_RULES, app.FooterTab.PERFORMANCE_RULES);
            _common.setup_gridLayout(cnt.uuid.PERFORMANCE_RULES, CONTAINER_COLUMNS_PERFORMANCE_RULES)
            });
            _common.clear_subContainerFilter(cnt.uuid.PERFORMANCE_RULES)
            _common.select_rowHasValue(cnt.uuid.PERFORMANCE_RULES,PER_CODE)
            _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,PER_CODE)
            _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PER_DESC)
            _common.waitForLoaderToDisappear()
            _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,UPDATE_PERFORMANCE_RULES.QUANTITY)
            _common.waitForLoaderToDisappear()
            _common.edit_dropdownCellWithInput(cnt.uuid.PERFORMANCE_RULES,app.GridCells.UOM_1,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, UPDATE_PERFORMANCE_RULES.UOM1)
            _common.edit_dropdownCellWithInput(cnt.uuid.PERFORMANCE_RULES,app.GridCells.UOM_2,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,UPDATE_PERFORMANCE_RULES.UOM2)
            _common.waitForLoaderToDisappear()
            _common.edit_dropdownCellWithCaret(cnt.uuid.PERFORMANCE_RULES,app.GridCells.PERFORMANCE_SHEET,commonLocators.CommonKeys.LIST,UPDATE_PERFORMANCE_RULES.COUNTRY)
            cy.SAVE()
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
      });
      it("TC - Create new schedule header and activity record.", function () {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.PROJECT);    
            _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
            _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
            _common.select_rowHasValue(cnt.uuid.SCHEDULES,SCHEDULES_DESC)
            _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
            _common.waitForLoaderToDisappear()
      });
      it("TC - Add  new activity structure for new record ", function () {
            _common.openTab(app.TabBar.PLANNING).then(() => {
             _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
            });
            cy.REFRESH_CONTAINER()
            _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
           _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
           _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
           _common.waitForLoaderToDisappear()
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_TEMPLATE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,AGA_CODE)
            _common.waitForLoaderToDisappear()
            _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,SCH_ACTDESC)
            cy.SAVE()
            _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
      });
      it("TC - Verify updated productivity", function () {
            _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
             });
            _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_PRODUCTIVITY,UPDATE_PERFORMANCE_RULES.PRODUCTIVITY_VALUE)
      });
      it("TC - Verify update UOM", function () {
            _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE,app.FooterTab.ACTIVITY_STRUCTURE)
             });
             _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PERF1UOM_FK,UPDATE_PERFORMANCE_RULES.UOM1)
    
      });

     after(() => {
        cy.LOGOUT();
        })
  
});