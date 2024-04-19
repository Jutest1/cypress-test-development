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
const PER_CODE2 = "PER_CODE2-" + Cypress._.random(0, 999);
const PER_DESC2 = "PER_DESC2-" + Cypress._.random(0, 999);
const ACT_STR_ROOT_CHILD = "ROOTCHILD_DESC-" + Cypress._.random(0, 999);ACT_STR_ROOT_CHILD

let SCHEDULE_PARAMETERS:DataCells;
let SCHEDULE_ACTIVITY_PARAMETERS:DataCells
let ACTIVITY_STRUCTURE_DESC;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_PERFORMANCE_RULES;
let CONTAINERS_PERFORMANCE_RULES;
let PLANNED_START
let PLANNED_FINISH
let APPLY_CHECK_PERFORMANCE_PARAMETER
let MODAL_PERFORMANCE_SHEET_CHECK
let CONTAINER_COLUMNS_PERFORMANCE_ACTIVITY_STRUCTURE

ALLURE.epic("SCHEDULING");
ALLURE.feature("Performance sheet ");
ALLURE.story("SCH- 3.61 | calculate the 'Productivity' of the activity by assigning a 'performance sheet' & using the wizard 'Apply Performance sheet' in scheduling by selecting the option `Finished` ");

describe("SCH- 3.61 | calculate the 'Productivity' of the activity by assigning a 'performance sheet' & using the wizard 'Apply Performance sheet' in scheduling by selecting the option `Finished` ", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.61-calculate-Productivity-of-activity-using-wizard-selecting-option-Finished.json").then((data) => {
        this.data = data
         CONTAINER_COLUMNS_PERFORMANCE_RULES= this.data.CONTAINER_COLUMNS.PERFORMANCE_RULES
         CONTAINERS_ACTIVITY_STRUCTURE= this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINERS_PERFORMANCE_RULES = this.data.CONTAINERS.PERFORMANCE_RULES
         PLANNED_START = _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
		 PLANNED_FINISH = _common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,5)
         MODAL_PERFORMANCE_SHEET_CHECK = this.data.MODAL.APPLY_CHECK_PERFORMANCE_SHEET_WIZARD
         CONTAINER_COLUMNS_PERFORMANCE_ACTIVITY_STRUCTURE= this.data.CONTAINER_COLUMNS.PERFORMANCE_CONTAINER
       

        SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
        };
        SCHEDULE_ACTIVITY_PARAMETERS = {
            [app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_DESC,

        };
        APPLY_CHECK_PERFORMANCE_PARAMETER = {
            [commonLocators.CommonKeys.CHECKBOX]: MODAL_PERFORMANCE_SHEET_CHECK
        }

       })
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
   }) 
    

    it("TC - Create new Activity Group(s)", function () {
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
        _common.maximizeContainer(cnt.uuid.TEMPLATE_ACTIVITY)
        _common.clear_subContainerFilter(cnt.uuid.TEMPLATE_ACTIVITY)
        _common.create_newRecord(cnt.uuid.TEMPLATE_ACTIVITY)
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,AGA_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,AGA_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.TASK_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FIXED_WORK)
         cy.wait(1000)//Wait is needed to load
        _common.edit_dropdownCellWithInput(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.QUANTITY_UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_RULES.UOM)
         cy.wait(1000)//Wait is needed to load
        _common.edit_dropdownCellWithInput(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.PERF1UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_RULES.UOM1)
         cy.wait(1000)//Wait is needed to load
        _common.select_dropdownCellWithInput_basedOnIndex_forDiv(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.PERF2UOM_FK,1,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.DAY)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.minimizeContainer(cnt.uuid.TEMPLATE_ACTIVITY)
    });
    it("TC -  Define `Germany` Performance Rules  and Performance sheet for an Activity", function () {
        _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PERFORMANCE_RULES, app.FooterTab.PERFORMANCE_RULES);
        _common.setup_gridLayout(cnt.uuid.PERFORMANCE_RULES, CONTAINER_COLUMNS_PERFORMANCE_RULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.PERFORMANCE_RULES)
        _common.maximizeContainer(cnt.uuid.PERFORMANCE_RULES)
        _common.create_newRecord(cnt.uuid.PERFORMANCE_RULES)
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,PER_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PER_DESC)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,"10")
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PERFORMANCE_RULES,app.GridCells.UOM_1,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_RULES.UOM1)
        cy.wait(1000)
        _common.select_dropdownCellWithInput_basedOnIndex_forDiv(cnt.uuid.PERFORMANCE_RULES,app.GridCells.UOM_2,1,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.DAY)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.PERFORMANCE_RULES,app.GridCells.PERFORMANCE_SHEET,commonLocators.CommonKeys.LIST,CONTAINERS_PERFORMANCE_RULES.COUNTRY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PERFORMANCE_RULES)
    });
    it("TC -  Define `Finland` Performance Rules  and Performance sheet for an Activity", function () {
        _common.openTab(app.TabBar.ACTIVITY_TEMPLATES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PERFORMANCE_RULES, app.FooterTab.PERFORMANCE_RULES);
        _common.setup_gridLayout(cnt.uuid.PERFORMANCE_RULES, CONTAINER_COLUMNS_PERFORMANCE_RULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.PERFORMANCE_RULES)
        _common.maximizeContainer(cnt.uuid.PERFORMANCE_RULES)
        _common.create_newRecord(cnt.uuid.PERFORMANCE_RULES)
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,PER_CODE2)
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,PER_DESC2)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.PERFORMANCE_RULES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,"20")
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PERFORMANCE_RULES,app.GridCells.UOM_1,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_RULES.UOM1)
        cy.wait(1000)
        _common.select_dropdownCellWithInput_basedOnIndex_forDiv(cnt.uuid.PERFORMANCE_RULES,app.GridCells.UOM_2,1,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.DAY)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.PERFORMANCE_RULES,app.GridCells.PERFORMANCE_SHEET,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FINLAND)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PERFORMANCE_RULES)
    });
    it("TC -  Create new schedule header and activity record.", function () {
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
    it("TC -  Add activity structure for default ", function () {
           _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
           });
           _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
           _schedulePage.enterDataTo_CreateScheduleActivity(ACT_STR_ROOT_CHILD, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UOM)
           _common.waitForLoaderToDisappear()
           cy.SAVE();
            _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_TEMPLATE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,AGA_CODE)
            _common.waitForLoaderToDisappear()
            _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,SCH_ACTDESC)
            cy.SAVE()
            cy.REFRESH_CONTAINER()
            _common.waitForLoaderToDisappear()
            _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
          
    });
    it("TC -  Change the performance sheet in respective scheduling header ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.PROJECT); 
        _common.waitForLoaderToDisappear()   
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER'))
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.search_inSubContainer(cnt.uuid.SCHEDULES,SCHEDULES_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.SCHEDULES,app.GridCells.PERFORMANCE_SHEET,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FINLAND)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    });
    it("TC -  Set performance %  and click Finish check box", function () {
        _common.openTab(app.TabBar.PERFORMANCE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_PERFORMANCE_ACTIVITY_STRUCTURE)
        });
       _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, "m2") 
        _common.set_cellCheckboxValue(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.EXECUTION_FINISHED,"check")
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PERCENTAGE_COMPLETION,app.InputFields.INPUT_GROUP_CONTENT,"10")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
    });
    it("TC -  Apply performance sheet ", function () {
       
        _common.openTab(app.TabBar.PLANNING).then(() => {
         _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
         _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, "m2") 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.APPLY_PERFORMANCE_SHEET);
        _common.waitForLoaderToDisappear()
        _schedulePage.apply_performance_sheet_fromWizard(APPLY_CHECK_PERFORMANCE_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_PRODUCTIVITY,"20.000000")

    });
     after(() => {
     cy.LOGOUT();
    })
    
})