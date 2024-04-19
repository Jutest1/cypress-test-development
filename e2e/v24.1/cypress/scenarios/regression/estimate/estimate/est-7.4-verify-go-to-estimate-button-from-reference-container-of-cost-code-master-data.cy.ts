import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _projectPage, _estimatePage,_wicpage,_boqPage, _mainView, _modalView, _schedulePage, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

const EST_CODE = "EST_CODE-" + Cypress._.random(0, 999);
const EST_DESC = "EST_DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_DESC-" + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINERS_COST_CODES;
let CONTAINER_COLUMNS_COST_CODES;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let RESOURCE_PARAMETERS: DataCells;
let  LINEITEM_PARAMETERS:DataCells

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 7.4 | Verify go to estimate button from reference container of cost code master data");

describe("EST- 7.4 | Verify go to estimate button from reference container of cost code master data", () => {

  before(function () {
    cy.fixture("estimate/est-7.4-verify-go-to-estimate-button-from-reference-container-of-cost-code-master-data.json").then((data) => {
        this.data = data;
        CONTAINERS_COST_CODES= this.data.CONTAINERS.COST_CODES
        CONTAINER_COLUMNS_COST_CODES= this.data.CONTAINER_COLUMNS.COST_CODES
        CONTAINER_COLUMNS_RESOURCE= this.data.CONTAINER_COLUMNS.RESOURCE
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
        CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
        CONTAINERS_RESOURCE= this.data.CONTAINERS.RESOURCE
        CONTAINERS_ESTIMATE=this.data.CONTAINERS.ESTIMATE

        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: EST_CODE,
          [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        },
        RESOURCE_PARAMETERS = {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
          [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        },
        LINEITEM_PARAMETERS = {
          [app.GridCells.LINE_ITEM_DESCRIPTION_INFO]: LINE_ITEM_DESC
        }
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
    });
  
  it("TC - Create Estimate and Line Item", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.maximizeContainer(cnt.uuid.ESTIMATE)
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM)
      })
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,LINE_ITEM_DESC)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  })
  it("TC - Verify assign resource to line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
    _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE)
    })
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    cy.SAVE();
  });
  it("TC - Assign Details stack to references", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
    _common.openTab(app.TabBar.COST_CODES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COST_CODES, 1);
      _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
    });
    _common.clear_subContainerFilter(cnt.uuid.COST_CODES);
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.DESCRIPTION)
    _common.select_rowHasValue(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.DESCRIPTION);
    _common.getText_fromCell(cnt.uuid.COST_CODES,app.GridCells.RATE).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("RATE", $ele1.text())
      cy.log(Cypress.env("RATE"))
    })
    _common.openTab(app.TabBar.COST_CODES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.REFERENCES, app.FooterTab.REFERENCES, 2);
    });
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.REFERENCES,"Project/"+Cypress.env('PROJECT_NUMBER')+"/"+Cypress.env("EST_CODE"))
    _common.waitForLoaderToDisappear()
    _estimatePage.selectLineItem_fromCellPopUpMenu(cnt.uuid.REFERENCES,app.GridCells.DETAILS_STACK,LINEITEM_PARAMETERS)
    _common.waitForLoaderToDisappear()
    _common.goToModule_inPopUpActiveRow(app.GridCells.REF_LINE_ITEM_CODE)
    _common.waitForLoaderToDisappear()  
  });
  it("TC - Verify resource description and cost per unit", function () {
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        _common.waitForLoaderToDisappear()
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
      _common.waitForLoaderToDisappear()
    _common.assert_cellData(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,CONTAINERS_COST_CODES.DESCRIPTION)  
    _common.waitForLoaderToDisappear()
    _common.assert_cellData(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,Cypress.env("RATE"))  
  })
  })
  after(() => {
    cy.LOGOUT();
  });