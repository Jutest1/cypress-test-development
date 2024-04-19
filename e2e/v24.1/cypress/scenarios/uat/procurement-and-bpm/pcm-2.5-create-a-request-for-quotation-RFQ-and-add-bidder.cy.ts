import { _common, _estimatePage, _rfqPage } from "cypress/pages";
import { app, tile, cnt } from "cypress/locators";
import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
const allure = Cypress.Allure.reporter.getInterface();

allure.epic("PROCUREMENT AND BPM");
allure.feature("Procurement");
allure.story("PCM- 2.5 | Create a request for quotation RFQ and add bidder")

const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE_ITEM_DESC_" + Cypress._.random(0, 999);

describe('PCM- 2.5 | Create a request for quotation RFQ and add bidder', () => {

  beforeEach(function () {
    cy.fixture("procurement-and-bpm/pcm-2.5-create-a-request-for-quotation-RFQ-and-add-bidder.json").then((data) => {
      this.data = data
    })
  })

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("procurement-and-bpm/pcm-2.5-create-a-request-for-quotation-RFQ-and-add-bidder.json").then((data) => {
      this.data = data
      const standerdInputs = this.data.Prerequisites.SidebarInputes
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })
  });
  // after(() => {
  // 	cy.LOGOUT();
  // });
  it('TC - Create new estimate', function () {
    const EstimateInputs = this.data.EstimatePageInputes.CreateEstimate
    const requireColumns = this.data.EstimatePageInputes.ColumnHeaders;

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, "Estimate")
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, requireColumns)
    })
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE)
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, EstimateInputs.rubicCategory, EstimateInputs.estimateType);
    _estimatePage.textOfEstimateCode();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    cy.wait(2000)
  });

  it('TC - Create line item and assign resource to it', function () {
    const LineItemInputs = this.data.CreateNewLineItemRecord.CreateLineItem
    const requireColumns = this.data.CreateNewLineItemRecord.ColumnHeaders;
    const resourceInputs = this.data.ResourceRecord.CreateNewResource
    const resourcesGrid = this.data.ResourceRecord.column_headers;
    const ResourceData = this.data.ResourceRecord.Footers;

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, "Line Items")
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, requireColumns)
    })
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC, LineItemInputs.quantity, LineItemInputs.uom)
    cy.SAVE()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, ResourceData.FootersTab, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
    })
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code)
    cy.SAVE();
  });

  it('TC - Create material package include cost code checkbox using wizard', function () {
    const SidebarForMaterial = this.data.CreateMaterialPkg.SidebarInputs
    const packageInputs = this.data.CreateMaterialPkg.SelectCriteria
    _common.openSidebarOption(SidebarForMaterial.Wizard).search_fromSidebar(SidebarForMaterial.Wizard1, SidebarForMaterial.CreateUpdateMaterialPackage);
    _estimatePage.enterRecord_toCreatePackage_wizard(packageInputs.MaterialCostCode)
    _common.openSidebarOption(SidebarForMaterial.Wizard).search_fromSidebar(SidebarForMaterial.Wizard1, SidebarForMaterial.changeStatus);
    _common.changeStatus_fromModal(SidebarForMaterial.status)
  });

  it('TC - Create requisition from wizard and change status', function () {
    const sidebarRequisition = this.data.CreateRequisitionInputs.SidebarInputes
    _common.openSidebarOption(sidebarRequisition.Wizard).search_fromSidebar(sidebarRequisition.Wizard1, sidebarRequisition.CreateRequisition);
    _common.clickOn_modalFooterButton(sidebarRequisition.requisition);
    _common.openSidebarOption(sidebarRequisition.Wizard).search_fromSidebar(sidebarRequisition.Wizard1, sidebarRequisition.ChangeStatus);
    _common.changeStatus_fromModal(sidebarRequisition.Status)
    cy.wait(2000)
    _common.openTab(app.tabBar.Main).then(() => {
      _common.select_tabFromFooter(cnt.uuid.Requisition_Totals, app.FooterTab.TOTALS, 1);
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.Requisition_Totals, app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
    _common.getText_fromCell(cnt.uuid.Requisition_Totals, app.GridCells.GROSS).then(($RFQ_GrossTotal) => {
      Cypress.env("RFQ_GrossTotal", $RFQ_GrossTotal.text())
    })
  });

  it('TC - Verify requisition status, only requisition status is approved, it can create a rfq', function () {

    const sidebarRequisition = this.data.CreateRequisitionInputs.SidebarInputes

    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS, sidebarRequisition.Status)
  });

  it('TC - Verify the bp which is choose in the bp search dialog is shown in bidder container of rfq', function () {
    const sidebarQuote = this.data.CreateRequestForQuote.SidebarInputes
    const CreateRequestForQuote = this.data.CreateRequestForQuote.CreateQuoteInputes
    _common.openSidebarOption(sidebarQuote.Wizard).search_fromSidebar(sidebarQuote.Wizard1, sidebarQuote.CreateRRequestForQuote);
    _rfqPage.createRequestForCode_fromWizard("Business Partner", CreateRequestForQuote.BusinessPartner, CreateRequestForQuote.ProcumentStructure)
    _common.clickOn_modalFooterButton(sidebarQuote.gotorfq)
  });

  it('TC - Verify check the bp which is choose in the bp search dialog is shown in bidder container of rfq', function () {
    const CreateRequestForQuote = this.data.CreateRequestForQuote.CreateQuoteInputes

    _common.openTab(app.tabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1);
    })
    _common.select_rowInContainer(cnt.uuid.BIDDERS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CreateRequestForQuote.BusinessPartner)

  });

  it('TC - Verify the totals in rfq is same as in requisition', function () {
    _common.openTab(app.tabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 1);
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.RFQ_TOTALS, app.GridCells.TRANSLATED, "Total", PACKAGE_TOTAL_TRANSLATION)
    cy.wait(500).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.RFQ_TOTALS, app.GridCells.GROSS, Cypress.env("RFQ_GrossTotal"))
    })
  });

})