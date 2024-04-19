import { _common, _estimatePage, _validate } from "cypress/pages";
import { app, sidebar,btn,commonLocators,tile, cnt } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const LOCATION_CODE = "LC-" + Cypress._.random(0, 999);
const LOCATION_DESC = "PUNE-" + Cypress._.random(0, 999);
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
let CONTAINER_COLUMNS_LOCATIONS;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.28 | Location assignment to line items through drag and drop");

describe("EST- 3.28 | Location assignment to line items through drag and drop", () => {
  before(function () {
    cy.fixture("estimate/est-3.28- location-assignment-to-line-items-through-drag-and-drop.json").then((data) => {
      this.data = data;
        CONTAINER_COLUMNS_LOCATIONS = this.data.CONTAINER_COLUMNS.LOCATIONS
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

  it("TC - Create locations record", function () {
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 1);
      _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION,CONTAINER_COLUMNS_LOCATIONS)
    });
    _common.create_newRecord(cnt.uuid.PROJECT_LOCATION);
    _estimatePage.enterRecord_toCreateLocation( LOCATION_CODE,LOCATION_DESC);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  })
  
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
      
  it("TC - drag and drop location to line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATELOCATION,app.FooterTab.LOCATIONS,4);
      _common.setup_gridLayout(cnt.uuid.ESTIMATELOCATION,CONTAINER_COLUMNS_LOCATIONS)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATELOCATION)
    _common.search_inSubContainer(cnt.uuid.ESTIMATELOCATION,LOCATION_CODE);
    _common.waitForLoaderToDisappear()
    _estimatePage.dragDrop_locationToLineItem(LOCATION_CODE);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
  });

  it("TC - verify location is assigned to line item", function () {
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _common.assert_cellData(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK,LOCATION_CODE);
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  });
});
