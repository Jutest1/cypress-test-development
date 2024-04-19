import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView, _schedulePage } from "cypress/pages";
import { cnt, tile, btn,app, commonLocators,sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();


const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION2 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION3 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);

let SCHEDULE_ACTIVITY_PARAMETERS: DataCells;
let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS:DataCells;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS1:DataCells;
let LINE_ITEM_PARAMETERS2:DataCells;
let LINE_ITEM_PARAMETERS3:DataCells;
let CONTAINER_COLUMNS_ACTIVITIES;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.26 | Activity Assignment to line item through drag + drop");
describe("EST- 3.26 | Activity Assignment to line item through drag + drop", () => {
  before(function () {
    cy.fixture("estimate/est-3.26-activity-assignment-to-line-item-through-drag-and-drop.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_ACTIVITIES=this.data.CONTAINER_COLUMNS.ACTIVITIES;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE;
      CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
      CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
      CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
            
            ESTIMATE_PARAMETERS = {
                        [app.GridCells.CODE]: ESTIMATE_CODE,
                        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
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
            };
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS1 = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION1,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
            LINE_ITEM_PARAMETERS2 = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION2,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
             LINE_ITEM_PARAMETERS3 = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION3,
              [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
  }).then(()=>{
    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.setDefaultView(app.TabBar.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();    
})
})
  after(() => {
    cy.LOGOUT();
  });
      
  it("TC - Create schedule and schedule activity record", function () {
    _common.openTab(app.TabBar.SCHEDULING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
  });
  _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
  _common.create_newRecord(cnt.uuid.SCHEDULES);
  _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
  cy.SAVE();
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.SCHEDULING).then(() => {
    _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
   });
   _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
   _common.openTab(app.TabBar.PLANNING).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
   });
   _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
   _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
   _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
   cy.SAVE()
   _common.waitForLoaderToDisappear()
  })
  
  it("TC - Create new line items record", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT); 
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
      });
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS1);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS2);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS3);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
  });
  it("TC - Search and Select Activity from Activity container and Assign it to Line Item using Drag and Drop.", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_ACTIVITIES, app.FooterTab.ACTIVITIES);
    _common.setup_gridLayout(cnt.uuid.ESTIMATE_ACTIVITIES,CONTAINER_COLUMNS_ACTIVITIES)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_ACTIVITIES)
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_ACTIVITIES,ACTIVITY_STRUCTURE_DESC);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_ACTIVITIES, app.GridCells.DESCRIPTION ,ACTIVITY_STRUCTURE_DESC)
    _estimatePage.dragDrop_ActivityToLineitem(ACTIVITY_STRUCTURE_DESC);
    cy.SAVE();

  });
  it("TC - Verify Activity gets Assigned to the Line Item in Line Items container.", function () {
    _common.assert_cellData(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PSD_ACTIVITY_FK_DEC,ACTIVITY_STRUCTURE_DESC);
  });
});
