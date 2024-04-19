import { _common, _estimatePage, _validate, _mainView, _boqPage } from "cypress/pages";
import { app, tile, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

let RESOURCE_PARAMETERS:DataCells
let RESOURCE_PARAMETERS_1:DataCells

let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 2.1 | Generating line items And Assigning Resources Manually");

describe("EST- 2.1 | Generating line items And Assigning Resources Manually", () => {

  before(function () {

    cy.fixture("estimate/est-2.1-generating-line-items-and-assiging-resources-manually.json")
      .then((data) => {
        this.data = data;
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
              ESTIMATE_PARAMETERS = {
                          [app.GridCells.CODE]: ESTIMATE_CODE,
                          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
              }
              
              CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
              CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
              LINE_ITEM_PARAMETERS = {
                          [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                          [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
              };
              
              CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
              CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
              RESOURCE_PARAMETERS = {
                          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
              };

              RESOURCE_PARAMETERS_1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_1,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
              };
      })
      .then(() => {
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
      });
  });

  after(()=>{
    cy.LOGOUT();
  })

  it('TC - Create new estimate record', function () {
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
  });

  it("TC - Create new line item record and verify created line item", function () {
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
      });
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)

      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION)
  });

  it("TC - Create new record in resource for Cost Code And verify Created Cost Code resource", function () {
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
      _common.maximizeContainer(cnt.uuid.RESOURCES)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
      _common.minimizeContainer(cnt.uuid.RESOURCES)
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()

      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      });
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.search_inSubContainer(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE)
      _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES,app.GridCells.CODE,CONTAINERS_RESOURCE.CODE)
  });

  it("TC - Create new record in resource for Material resource And verify Created Material resource", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_1);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.search_inSubContainer(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE_1)
    _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE_1)
    _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES,app.GridCells.CODE,CONTAINERS_RESOURCE.CODE_1)
  });

});
