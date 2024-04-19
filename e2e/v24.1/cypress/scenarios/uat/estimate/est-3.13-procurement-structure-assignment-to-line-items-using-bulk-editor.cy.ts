import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView, _validate } from "cypress/pages";
import { cnt, tile, app, commonLocators } from "cypress/locators";

const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

const CONFIG_NAME = "CONFIG_NAME-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 3.13 | Procurement structure assignment to line items using bulk editor");
describe("EST- 3.13 | Procurement structure assignment to line items using bulk editor", () => {
  beforeEach(function () {
    cy.fixture("estimate/est-3.13-procurement-structure-assignment-to-line-items-using-bulk-editor.json").then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("estimate/est-3.13-procurement-structure-assignment-to-line-items-using-bulk-editor.json").then((data) => {
      this.data = data;
      /* Pre-Conditions */

      const StandardInputs = this.data.Prerequisites.SidebarInputs;
      const estimateInputs = this.data.Prerequisites.EstimatePageInputs;
      const lineitemInputs = this.data.CreateNewLineItemRecord.LineItemsInputs;
      const esthLIgrid = this.data.Columns.Column_EstLI;
      const estheadergrid = this.data.Columns.Column_Estheader;

      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(StandardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE,estheadergrid)

      });
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      cy.wait(2000);
      _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE,EST_DESC,estimateInputs.CreateEstimate.rubicCategory,estimateInputs.CreateEstimate.estimateType);
      cy.SAVE();
      _common.openTab(app.TabBar.ESTIMATE);
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
      _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,esthLIgrid)
        _validate.set_ColumnAtTop([esthLIgrid.descriptioninfo,esthLIgrid.basuomfk,esthLIgrid.quantity,esthLIgrid.prcstructurefk],cnt.uuid.ESTIMATE_LINEITEMS)
      });
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC+"-1", lineitemInputs.quantity1, lineitemInputs.uom1);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC+"-2", lineitemInputs.quantity2, lineitemInputs.uom2);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC+"-3", lineitemInputs.quantity3, lineitemInputs.uom3);
      cy.SAVE();
    });
  });

  after(() => {
    cy.LOGOUT();
  });
  /* Select all record and assign Procurement structure using bulk editor in line item container */

  it("TC - Select all record and assing procurement structure using bulk editor in line item container", function () {
    const CreateNewRule=this.data.CreateNewRule
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.bulkEditor_CreateNewRule(cnt.uuid.ESTIMATE_LINEITEMS, CONFIG_NAME,CreateNewRule);
    cy.SAVE;
    cy.wait(2000)
    cy.REFRESH_CONTAINER();
  });

  /* Validation - Verify bulk edited records */

  it("TC - Verify bulk edited records", function () {
    const ReferenceNumberInput = this.data.CreateBoQItemRecordInBulkEditor.ReferenceNumberInput;
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.verify_bulkEditRecords(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.PRC_STRUCTURE_FK,ReferenceNumberInput.BoQNumber);
    cy.SAVE();
  });
});
