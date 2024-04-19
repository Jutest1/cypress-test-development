import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from "cypress/pages";
import { app, tile, cnt } from "cypress/locators";
import { EST_HEADER } from "cypress/pages/variables";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.21 | Split line item by resources");

describe("EST- 1.21 | Split line item by resources", () => {
  beforeEach(function () {
    cy.fixture(
      "estimate/est-1.21-split-line-item-by-resources.json"
    ).then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );

    cy.fixture(
      "estimate/est-1.21-split-line-item-by-resources.json"
    ).then((data) => {
      this.data = data;
      const standerdInputs = this.data.Prerequisites.SidebarInputs;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  it("TC - Create New Estimate Header", function () {
    const estimateInputs = this.data.Prerequisites.CreateEstimate;
    const estheadergrid = this.data.Column_Headers.EstimateHeader_Column;

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, estheadergrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubicCategory, estimateInputs.estimateType);
    _estimatePage.textOfEstimateCode();
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC - Create New Line Item Record", function () {
    const lineItemInput = this.data.Prerequisites.CreateNewLineItem;
    const requiredColumns = this.data.Column_Headers.EstimateLineItem_Column;
    Cypress.env("lineItemDesc", lineItemInput.description + Cypress._.random(0, 999));

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, requiredColumns);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(Cypress.env("lineItemDesc"), lineItemInput.quantity1, lineItemInput.uom);
    cy.SAVE();
  });

  it("TC - Create New Record In Resource For Cost Code", function () {
    const resourceInputs = this.data.Prerequisites.CreateNewResource;
    const requiredColumns = this.data.Column_Headers.ResourceHeader_Column;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, requiredColumns);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    for (let i = 0; i < 3; i++) {
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code, resourceInputs.quantity);
      cy.SAVE()
      cy.wait(2000)
    }
  });

  it("Verify the wizard functionality for split line item by resources", function () {
    const standerdInputs = this.data.Prerequisites.SidebarInputs;
    const splitLineItemInputs = this.data.Prerequisites.SplitLineItem;
    const resourceInputs = this.data.Prerequisites.CreateNewResource;

    _common.openSidebarOption(standerdInputs.searchType1)
    _common.search_fromSidebar(standerdInputs.Wizard, splitLineItemInputs.splitLineItem)
    _estimatePage.splitLineItem_byResources(splitLineItemInputs.radio1, splitLineItemInputs.splitMethod, splitLineItemInputs.radio2)
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
    _estimatePage.verify_splitLineItem_byResource(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, resourceInputs.description)


  })
});



