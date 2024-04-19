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
const ACT_STR_ROOT_CHILD = "ROOTCHILD_DESC-" + Cypress._.random(0, 999);ACT_STR_ROOT_CHILD

let SCHEDULE_PARAMETERS:DataCells;
let SCHEDULE_ACTIVITY_PARAMETERS:DataCells
let ACTIVITY_STRUCTURE_DESC;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_PERFORMANCE_RULES;
let  CONTAINERS_PERFORMANCE_RULES;
let PLANNED_START
let PLANNED_FINISH
let UNITCOLOUMN

ALLURE.epic("SCHEDULING");
ALLURE.feature("Type of duration Calculation");
ALLURE.story("SCH- 3.49 | Fixed Unit: Change in Productivity and Fixed Quantity ");

describe("SCH- 3.49 | Fixed Unit: Change in Productivity and Fixed Quantity ", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.49-fixed-unit-change-in-productivity-and-fixed-Quantity.json").then((data) => {
        this.data = data
        CONTAINER_COLUMNS_PERFORMANCE_RULES= this.data.CONTAINER_COLUMNS.PERFORMANCE_RULES
         CONTAINERS_ACTIVITY_STRUCTURE= this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINERS_PERFORMANCE_RULES = this.data.CONTAINERS.PERFORMANCE_RULES
         UNITCOLOUMN = this.data.CONTAINER_COLUMNS.UNIT
         PLANNED_START = _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
		 PLANNED_FINISH = _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL,2)


        SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
        };
        SCHEDULE_ACTIVITY_PARAMETERS = {
            [app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_DESC,

        };
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
    it("TC - Define 'Template Activity Properties'.", function () {
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
       _common.edit_dropdownCellWithCaret(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.TASK_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.FIXED_UNITS)
        cy.wait(1000)//Wait is needed to load
        _common.edit_dropdownCellWithInput(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.QUANTITY_UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_RULES.UOM)
         cy.wait(1000)//Wait is needed to load
        _common.edit_dropdownCellWithInput(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.PERF1UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_RULES.UOM1)
         cy.wait(1000)//Wait is needed to load
        _common.select_dropdownCellWithInput_basedOnIndex_forDiv(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.PERF2UOM_FK,1,app.InputFields.INPUT_GROUP_CONTENT,commonLocators.CommonKeys.DAY)
        _common.enterRecord_inNewRow(cnt.uuid.TEMPLATE_ACTIVITY,app.GridCells.SCHEDULE_PRODUCTIVITY,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PERFORMANCE_RULES.QUANTITY)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.minimizeContainer(cnt.uuid.TEMPLATE_ACTIVITY)
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
           _schedulePage.enterDataTo_CreateScheduleActivity(ACT_STR_ROOT_CHILD, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UOM,PLANNED_START,PLANNED_FINISH)
           cy.SAVE()
           _common.waitForLoaderToDisappear()
            _common.edit_dropdownCellWithInput(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.SCHEDULE_TEMPLATE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,AGA_CODE)
           cy.wait(2000)
           _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,SCH_ACTDESC)
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    });
    it("TC - Verify UOM", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE,app.FooterTab.ACTIVITY_STRUCTURE)
         });
         _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PERF1UOM_FK,CONTAINERS_PERFORMANCE_RULES.UOM1)
    });
    it("TC - Verify  Duration = (Fixed Quantity/ Changed Productivity)", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE,app.FooterTab.ACTIVITY_STRUCTURE)
         });
         _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
       
         _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.PLANNED_DURATION, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PERFORMANCE_RULES.PLANNED_DURATION)
         cy.wait(1000)
         cy.SAVE()
         _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDivisionOfTwoValuesAnd_ComapreWithThirdValue(cnt.uuid.ACTIVITY_STRUCTURE,CONTAINERS_PERFORMANCE_RULES.SCHEDULE_QUANTITY,CONTAINERS_PERFORMANCE_RULES.PLANNED_DURATION,app.GridCells.SCHEDULE_PRODUCTIVITY)
         _common.minimizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
    });


     after(() => {
     cy.LOGOUT();
    })
    
})
