import { _common, _estimatePage, _validate } from "cypress/pages";
import { app, tile, cnt } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();

const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const BOQ_STRCU_DESC2 = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 3.22 | Generating budget for general cost line item");

describe("EST- 3.22 | Generating budget for general cost line item", () => {
  beforeEach(function () {
    cy.fixture("estimate/est-3.22-generating-budget-for-general-cost-line-item.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));

    cy.fixture("estimate/est-3.22-generating-budget-for-general-cost-line-item.json").then((data) => {
      this.data = data;

      const StandardInputs = this.data.Prerequisites.SidebarInputs;
      const estimateInputs = this.data.Prerequisites.EstimatePageInputs;
      // const estheadergrid = this.data.Column_Grids.Column_Estheader;

      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(StandardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        // _common.setup_gridLayout(cnt.uuid.ESTIMATE,estheadergrid);

      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.CreateEstimate.rubicCategory, estimateInputs.CreateEstimate.estimateType);
      cy.SAVE();
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create new line item record", function () {
    const lineitemInputs = this.data.CreateNewLineItemRecord.LineItemsInputs;
    const lineitemData = this.data.CreateNewLineItemRecord.Footers;
    // const estLIgrid = this.data.Column_Grids.Column_EstLI;

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      // _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,estLIgrid);
    });
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC + "-1", lineitemInputs.quantity, lineitemInputs.uom);
    cy.SAVE();
  });

  it("TC - Create new record in resource for cost code", function () {
    const ResourceData = this.data.CreateNewResource.Footers;
    const ResourceInputs = this.data.CreateNewResource.ResourceInput;
    // const estResourcegrid = this.data.Column_Grids.Column_EstResources;

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      // _common.setup_gridLayout(cnt.uuid.RESOURCES,estResourcegrid);

    });
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(ResourceInputs.ShortKey, ResourceInputs.Code);
    cy.SAVE();
  });

  it("TC - Generation of budget for general cost line item", function () {
    const SidebarOption = this.data.GenerationOfBudget.SidebarOption;
    const SidebarInputs = this.data.GenerationOfBudget.SidebarInputs;
    const LIGrid = this.data.lineItem_ColumnHeaders.columnHeaders;
    //
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
       _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,LIGrid);
       _validate.set_ColumnAtTop(["General Cost"],cnt.uuid.ESTIMATE_LINEITEMS)
    });
    _estimatePage.checked_LineItemForGeneratingBudget(cnt.uuid.ESTIMATE_LINEITEMS, app.gridCells.GENERAL_COST);
    cy.SAVE();
    _common.openSidebarOption(SidebarOption.OpenWizard).search_fromSidebar(SidebarInputs.Wizard, SidebarInputs.WizardOption);
    _estimatePage.verify_generateBudgetForLineItem();
    _estimatePage.verify_resourceCostUnitOriginal_And_BudgetLineItemValue(cnt.uuid.RESOURCES);
  });
});
