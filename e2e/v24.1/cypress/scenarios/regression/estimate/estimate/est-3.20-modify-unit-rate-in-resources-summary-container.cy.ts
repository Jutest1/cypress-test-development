import { _common, _estimatePage, _package, _validate } from "cypress/pages";
import { app, tile, cnt,sidebar,commonLocators,btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION2 = "LINE_ITEM-DESC1-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION3 = "LINE_ITEM-DESC1-" + Cypress._.random(0, 999);


let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let LINE_ITEM_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS;
let CONTAINERS_RESOURCE2;
let LINE_ITEM_PARAMETERS2:DataCells;
let LINE_ITEM_PARAMETERS3:DataCells;
let CONTAINER_COLUMNS_RESOURCE_SUMMARY;
let CONTAINERS_RESOURCE_SUMMARY;


ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.20 | Modify unit rate in resources summary container");
describe("EST- 3.20 | Modify unit rate in resources summary container", () => {
  before(function () {
    cy.fixture("estimate/est-3.20-modify-unit-rate-in-resources-summary-container.json").then((data) => {
      this.data = data;
      CONTAINERS_RESOURCE2 = this.data.CONTAINERS.RESOURCE2;
      CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE;
      CONTAINER_COLUMNS_RESOURCE_SUMMARY=this.data.CONTAINER_COLUMNS.RESOURCE_SUMMARY;
      CONTAINERS_RESOURCE_SUMMARY=this.data.CONTAINERS.RESOURCE_SUMMARY;

      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                        [app.GridCells.CODE]: ESTIMATE_CODE,
                        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
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
            RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE2.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE2.CODE,
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

  it("TC - Create new line item record and cost code resource", function () {
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
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
      });
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        _common.waitForLoaderToDisappear();
        _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE);
      });
      _common.maximizeContainer(cnt.uuid.RESOURCES)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
      _common.minimizeContainer(cnt.uuid.RESOURCES)
      _common.waitForLoaderToDisappear()
      cy.SAVE();
  });

  it("TC - Create second line item record and cost code resource", function () {
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS2);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.waitForLoaderToDisappear();
      _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();

  });

  it("TC - Create third line item record cost code resource", function () {
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS3);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.waitForLoaderToDisappear();
      _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
  });

  it("TC - Update adjust costunit in resource summary container", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES_SUMMARY, app.FooterTab.RESOURCES_SUMMARY, 9);
      _common.setup_gridLayout(cnt.uuid.RESOURCES_SUMMARY, CONTAINER_COLUMNS_RESOURCE_SUMMARY)
    });
    _estimatePage.update_adjustCostUnit_in_ResourceSummary(LINE_ITEM_DESCRIPTION3, CONTAINERS_RESOURCE2.CODE, CONTAINERS_RESOURCE_SUMMARY.ADJ_COST_UNIT);
  });

  it("TC - Verify adjust costunit in line items containers costunit field", function () {
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_UNIT,CONTAINERS_RESOURCE_SUMMARY.ADJ_COST_UNIT);
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
  });

  it("TC - Verify updated costunit in line resource costunit field", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 7);
    })
   _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION3);
   _common.maximizeContainer(cnt.uuid.RESOURCES);
   _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE2.CODE);
   _common.assert_cellData(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,CONTAINERS_RESOURCE2.COST_UNIT);
   _common.minimizeContainer(cnt.uuid.RESOURCES);
  });
});
