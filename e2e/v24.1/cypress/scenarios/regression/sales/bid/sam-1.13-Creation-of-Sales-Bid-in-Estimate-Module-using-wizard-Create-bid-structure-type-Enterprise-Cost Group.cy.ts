import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package } from "cypress/pages";
import { tile, app, cnt, sidebar, btn, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-Test-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let MODAL_GENERATE_BUDGET;

let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BIDS;

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let MODAL_CREATE_BID
let CONTAINERS_LINE_ITEM
let CONTAINER_COLUMNS_COST_GROUP
let CONTAINERS_COST_GROUP
allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.13 | Creation of Sales Bid in Estimate Module using wizard Create bid structure type Enterprise - Cost Group");
describe("SAM- 1.13 | Creation of Sales Bid in Estimate Module using wizard Create bid structure type Enterprise - Cost Group", () => {
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.13-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-Enterprise-Cost Group.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BIDS
      MODAL_CREATE_BID = this.data.MODALS.CREATE_BID
      MODAL_GENERATE_BUDGET = this.data.MODALS.GENERATE_BUDGET;

      CONTAINERS_COST_GROUP = this.data.CONTAINERS.COST_GROUP
      CONTAINER_COLUMNS_COST_GROUP = this.data.CONTAINER_COLUMNS.COST_GROUP
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      };
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

      GENERATE_LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: CONTAINERS_COST_GROUP.CATALOG_NUMBER
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  });

  it('TC - Create new estimate record', function () {
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
  });

  it("TC - Verify select cost group", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_COSTGROUP, app.FooterTab.COSTGROUP, 1);
      _common.waitForLoaderToDisappear()
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_COST_GROUP)
    });
    _estimatePage.selectdata_fromCostGroupContainer(cnt.uuid.ESTIMATE_COSTGROUP, CONTAINERS_COST_GROUP.CATALOG_NUMBER);
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_COSTGROUP, btn.ToolBar.ICO_TREE_EXPAND_ALL);
    cy.SAVE();
  });

  it("TC - Verify generate line items", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.QUANTITY)

    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it("TC - Verify assign resource to line item", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("COST_UNIT", $ele1.text())
    })

  });

  it("TC - Create new sales bid", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
    _bidPage.createBidRecord_byWizardOptions(/* MODAL_CREATE_BID.MAIN_BID */"Main Bid With Cost Group", BID_DESC, MODAL_CREATE_BID.BUSINESS_PARTNER, MODAL_CREATE_BID.STRUCTURE_TYPE);
  });

  it("TC - Verify BoQ structure quantity", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
      _common.setup_gridLayout(cnt.uuid.BIDS, CONTAINER_COLUMNS_BIDS)
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.BIDS, BID_DESC)
      _common.waitForLoaderToDisappear()
    })
    _bidPage.verifying_Bid_Net_Amount()
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs, 0);
      _common.select_rowInSubContainer(cnt.uuid.BIDBOQS)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _common.select_rowHasValue(cnt.uuid.BIDBOQSTRUCTURE, "Grundstückswert")
    cy.wait(1000)//required wait  
    _common.waitForLoaderToDisappear()
    _common.assert_forNumericValues(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_LINE_ITEM.QUANTITY)
  });

  it("TC - Verify net amount to grand total", function () {
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });

    _common.assert_forNumericValues(cnt.uuid.BIDS, app.GridCells.AMOUNT_NET, Cypress.env("COST_UNIT"))

  });

  after(() => {
    cy.LOGOUT();
  });
});
