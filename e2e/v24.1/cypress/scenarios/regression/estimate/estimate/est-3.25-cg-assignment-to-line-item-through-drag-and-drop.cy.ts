import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { cnt, tile, app, btn,sidebar,commonLocators } from "cypress/locators";

const ALLURE = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION2 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION3 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS:DataCells;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS1:DataCells;
let LINE_ITEM_PARAMETERS2:DataCells;
let LINE_ITEM_PARAMETERS3:DataCells;
let CONTAINERS_COST_GROUP;
let CONTAINER_COLUMNS_COST_GROUP;
let CONTAINER_COLUMNS_LINE_ITEM_COST_GROUP;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.25 | CG assignment to line items through drag and drop");
describe("EST- 3.25 | CG assignment to line items through drag and drop", () => {
  before(function () {
    cy.fixture("estimate/est-3.25-cg-assignment-to-line-item-through-drag-and-drop.json").then((data) => {
      this.data = data;
        CONTAINER_COLUMNS_LINE_ITEM_COST_GROUP = this.data.CONTAINER_COLUMNS.LINE_ITEM_COST_GROUP
        CONTAINERS_COST_GROUP = this.data.CONTAINERS.COST_GROUP;
        CONTAINER_COLUMNS_COST_GROUP = this.data.CONTAINER_COLUMNS.COST_GROUP
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE;
              ESTIMATE_PARAMETERS = {
                          [app.GridCells.CODE]: ESTIMATE_CODE,
                          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
              }
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
  it("TC - Create new line items record", function () {
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
  it("TC - Select all Line Item records and Assign selected CG to selected records using Drag and Drop.", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_COSTGROUP,app.FooterTab.COST_GROUP,2);
       _common.setup_gridLayout(cnt.uuid.ESTIMATE_COSTGROUP,CONTAINER_COLUMNS_COST_GROUP)
    });
    _estimatePage.selectdata_fromCostGroupContainer(cnt.uuid.ESTIMATE_COSTGROUP,CONTAINERS_COST_GROUP.CATALOG_NUMBER);
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_BOQS,btn.ToolBar.ICO_TREE_EXPAND_ALL);
    _estimatePage.dragDrop_CGToLineitem(CONTAINERS_COST_GROUP.CODE);
    cy.SAVE();
    _common.waitForLoaderToDisappear();
  });
  it("TC -  Verify CG gets Assigned to the Line Items.", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
       _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM_COST_GROUP)
    });
    _common.assert_cellData(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_GROUP_LIC_DIN276_2018_12,CONTAINERS_COST_GROUP.CODE);
  });
});
