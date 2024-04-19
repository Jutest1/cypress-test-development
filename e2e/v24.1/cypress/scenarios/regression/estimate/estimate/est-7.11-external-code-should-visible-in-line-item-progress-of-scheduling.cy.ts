import { _common, _estimatePage, _mainView, _modalView, _schedulePage, _sidebar, _validate } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PERFORMANCE_ACTIVITY_STRUCTURE;
let CONTAINERS_PERFORMANCE_ACTIVITY_STRUCTURE;
let  CONTAINER_COLUMNS_LINE_ITEM_PROGRESS;
let CONTAINERS_CUSTOMIZING;

const ALLURE = Cypress.Allure.reporter.getInterface();

const SCHEDULES_CODE = "CSH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "CSH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY__DESC = "AT-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = 'EST-CODE-' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 7.11 | External Code should visible in Line item progress of Scheduling");

describe("EST- 7.11 | External Code should visible in Line item progress of Scheduling", () => {

    before(function () {
      cy.fixture("estimate/est-7.11-external-code-should-visible-in-line-item-progress-of-scheduling.json").then((data) => {
      this.data = data;
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
         CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
         CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
         CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
         CONTAINER_COLUMNS_PERFORMANCE_ACTIVITY_STRUCTURE=this.data.CONTAINER_COLUMNS.PERFORMANCE_ACTIVITY_STRUCTURE
         CONTAINERS_PERFORMANCE_ACTIVITY_STRUCTURE=this.data.CONTAINERS.PERFORMANCE_ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_LINE_ITEM_PROGRESS = this.data.CONTAINER_COLUMNS.LINE_ITEM_PROGRESS
         CONTAINERS_CUSTOMIZING=this.data.CONTAINERS.CUSTOMIZING

      SCHEDULE_PARAMETERS = {
        [app.GridCells.CODE]: SCHEDULES_CODE,
        [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
      };
      ESTIMATE_PARAMETERS = {
         [app.GridCells.CODE]: ESTIMATE_CODE,
         [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
         [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
         [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        };
      LINE_ITEMS_PARAMETERS = {
         [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
         [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:SCHEDULES_DESC
        };
     })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
     });  
     it("TC - Set Progress Report Method as default", function () {
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CUSTOMIZING);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.MASTER_DATA).then(() => {
          _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 2);
          _common.waitForLoaderToDisappear()
      });
      _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
      _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_CUSTOMIZING.DATA_TYPE)
      _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_CUSTOMIZING.DATA_TYPE)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.MASTER_DATA).then(() => {
        _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_RECORDS, 2);
        _common.waitForLoaderToDisappear()
    });
    _common.select_rowHasValue(cnt.uuid.DATA_RECORDS,CONTAINERS_CUSTOMIZING.DESCRIPTION)
    _common.waitForLoaderToDisappear()
    _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS,app.GridCells.IS_DEFAULT,CONTAINERS_CUSTOMIZING.CHECHBOX)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()  
  });
    it("TC - Create new schedules headerand activity structure", function () {
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.waitForLoaderToDisappear()
            _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
            _common.waitForLoaderToDisappear()
        });
        _common.maximizeContainer(cnt.uuid.SCHEDULES)
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.create_newRecord(cnt.uuid.SCHEDULES)
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.SCHEDULES,SCHEDULES_DESC)
        _common.select_rowHasValue(cnt.uuid.SCHEDULES,SCHEDULES_DESC)
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterRecord_toCreateActivityStructure(ACTIVITY__DESC,CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,CONTAINERS_ACTIVITY_STRUCTURE.UOM)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });
    it("TC - Create new estimate", function() {
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE,app.FooterTab.ESTIMATE,2)
          _common.waitForLoaderToDisappear()
          _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
      });
    
      it("TC - Verify generate line item wizards option via schedule",function ()  {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS,app.FooterTab.LINE_ITEMS,1)
          _common.waitForLoaderToDisappear()
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(LINE_ITEMS_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EXTERNAL_CODE,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_LINE_ITEM.EXTERNAL_CODE)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
      });
      it("TC -Assign report method with percentage", function() {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
          _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
          _common.waitForLoaderToDisappear()
      });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.search_inSubContainer(cnt.uuid.SCHEDULES,SCHEDULES_DESC)
        _common.select_rowHasValue(cnt.uuid.SCHEDULES,SCHEDULES_DESC)
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCE).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE,app.FooterTab.ACTIVITY_STRUCTURE,2)
          _common.waitForLoaderToDisappear()
          _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE,CONTAINER_COLUMNS_PERFORMANCE_ACTIVITY_STRUCTURE)
        });
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE,ACTIVITY__DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE,ACTIVITY__DESC)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PROGRESS_REPORT_METHOD_FK,commonLocators.CommonKeys.LIST_EXACT,CONTAINERS_PERFORMANCE_ACTIVITY_STRUCTURE.REPORT_METHOD)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PERCENTAGE_COMPLETION,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PERFORMANCE_ACTIVITY_STRUCTURE.PERCENTAGE_COMPLETION)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PERCENTAGE_COMPLETION,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PERFORMANCE_ACTIVITY_STRUCTURE.PERCENTAGE_COMPLETION)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
      });
      it("TC -Verify External code of Line item process", function() {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PERFORMANCE).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.LINE_ITEM_PROGRESS,app.FooterTab.LINE_ITEM_PROGRESS,3)
          _common.waitForLoaderToDisappear()
          _common.setup_gridLayout(cnt.uuid.LINE_ITEM_PROGRESS, CONTAINER_COLUMNS_LINE_ITEM_PROGRESS)
        });
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.assert_cellData(cnt.uuid.LINE_ITEM_PROGRESS,app.GridCells.EXTERNAL_CODE,CONTAINERS_LINE_ITEM.EXTERNAL_CODE)  
      });
    
})
after(() => {
    cy.LOGOUT();
});