import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.14 | Adding Resources to Line Items where Resource type is Assembly")

describe('EST- 1.14 | Adding Resources to Line Items where Resource Type is Assembly', () => {

  beforeEach(function () {
    cy.fixture("estimate/est-1.14-adding-resource-to-line-item-where-resource-type-is-assembly.json").then((data) => {
      this.data = data
    })
  })

  before(function () {
    cy.preLoading(
      "Admin6",
      "Winjit123",
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );

    cy.fixture("estimate/est-1.14-adding-resource-to-line-item-where-resource-type-is-assembly.json").then((data) => {
      this.data = data
      const standardInputs = this.data.Prerequisites.SidebarInputs

      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })
  });

  it('TC - Create new estimate', function () {
    const EstimateInputs = this.data.EstimatePageInputs.CreateEstimate
    const requiredColumn = this.data.EstimatePageInputs.Column_header;

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, requiredColumn);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE)
    _estimatePage.enterRecord_toCreateEstimateHeader(EstimateInputs.newCode, EstimateInputs.description, EstimateInputs.rubicCategory, EstimateInputs.estimateType);
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it('TC - Create new line item with quantity', function () {
    const lineIteminputs = this.data.LineItemInputs.LineItem
    const reqColumn = this.data.LineItemInputs.LIColumn_header;

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 1);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, reqColumn);
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(lineIteminputs.lineItemDesc, lineIteminputs.quantity, lineIteminputs.uom)
    cy.SAVE()
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, lineIteminputs.lineItemDesc)
  });

  it('TC - Assign resource to the line item', function () {
    const resourceinputs = this.data.ResourcePageInputs.createResource
    const resColumn = this.data.ResourcePageInputs.ResourceColumn_header

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, resColumn);
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateMaterialResource(resourceinputs.shortKey, resourceinputs.Assembly)
    _common.select_rowHasValue(cnt.uuid.RESOURCES, resourceinputs.shortKey)
    cy.SAVE()
  });

  it('TC - Validate Cost Total in line item ', function () {
    _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("RESOURCE_TOTAL", $ele1.text())
    })
    cy.wait(2000)
      .then(() => {
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, Cypress.env("RESOURCE_TOTAL"))
      });
  });

  after(() => {
    cy.LOGOUT();
  });

});