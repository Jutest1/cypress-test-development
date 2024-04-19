import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { any } from "cypress/types/bluebird";

const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS_COST_CODE: DataCells, RESOURCE_PARAMETERS_MATERIAL: DataCells, RESOURCE_PARAMETERS_ASSEMBLY: DataCells,RESOURCE_PARAMETERS_2 : DataCells,RESOURCE_PARAMETERS_3 : DataCells;
let CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINER_COLUMNS_ESTIMATE, CONTAINERS_RESOURCE, CONTAINER_COLUMNS_RESOURCE, CONTAINER_COLUMNS_LINE_ITEM;

allure.epic("ESTIMATE");
allure.feature("Line Item");
allure.story("EST- 1.4 | Add Resources to Line item manually");

describe("EST- 1.4 | Add Resources to Line item manually", () => {
  before(function () {
    cy.fixture("estimate/est-1.4-add-resources-to-line-item-manually.json")
      .then((data) => {
        this.data = data;

        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
        CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
        CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
        CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
        CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE;

        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        };
        LINE_ITEM_PARAMETERS = {
          [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        };

        RESOURCE_PARAMETERS_COST_CODE = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[0],
        };
        RESOURCE_PARAMETERS_MATERIAL = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[1],
        };
        RESOURCE_PARAMETERS_ASSEMBLY = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[2],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[2],
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[2],
        };
        RESOURCE_PARAMETERS_2 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[3],
        };
        RESOURCE_PARAMETERS_3 = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[3],
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[2],
        };
      })
      .then(() => {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear();
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        _common.waitForLoaderToDisappear();
      });
  });

  it("TC - Create new estimate", function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE);
      _common.waitForLoaderToDisappear();
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear();
  });
  it("TC - Create new line item with quantity", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM);
      _common.waitForLoaderToDisappear();
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);

    });
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS);
  });
  it("TC - Assign resource to the line item", function () {
    _common.waitForLoaderToDisappear();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES);
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_COST_CODE);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_MATERIAL);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_ASSEMBLY);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.waitForLoaderToDisappear();
    _common.create_newSubRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
    _common.waitForLoaderToDisappear();
    cy.SAVE();
    _common.select_allContainerData(cnt.uuid.RESOURCES)
    _common.clickOn_toolbarButton(cnt.uuid.RESOURCES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
  });

  it("TC - Verify resources with the line item cost total", function () {
    _validate.verify_costTotalOfResources_WithLineItemCostTotal();
  });

  after(() => {
    cy.LOGOUT();
  });
});
