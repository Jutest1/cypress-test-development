import { _common, _estimatePage, _mainView, _modalView, _sidebar, _validate } from "cypress/pages";
import { app, tile, cnt } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();

const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LI-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC2 = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 3.3 | Update line item quantities from PES");
describe("EST- 3.3 | Update line item quantities from PES", () => {
  beforeEach(function () {
    cy.fixture("estimate/est-3.3-Update-Line-item-quantities-From-PES.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("estimate/est-3.3-Update-Line-item-quantities-From-PES.json").then((data) => {
      this.data = data;
      const StandardInputs = this.data.Prerequisites.SidebarInputs;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(StandardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC - Create estimate header and go to estimate", function () {
    const estimateInputs = this.data.Prerequisites.EstimatePageInputs;
    const requireColumns = this.data.Prerequisites.ColumnHeaders;
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE,requireColumns)
    });
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.CreateEstimate.rubicCategory, estimateInputs.CreateEstimate.estimateType);
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC - Create line item", function () {
    const lineitemInputs = this.data.CreateNewLineItemRecord.LineItemsInputs;
    const requireColumns = this.data.CreateNewLineItemRecord.ColumnHeaders;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,requireColumns)
    });   
     _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC, lineitemInputs.quantity1, lineitemInputs.uom);
    cy.SAVE();
  });

  it("TC - Assign resource to line item", function () {
    const resourceInputs = this.data.CreateNewResource.CostCodeResourceInput;
    const resourceColumns = this.data.CreateNewResource.resourceColumns;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
      _common.setup_gridLayout(cnt.uuid.RESOURCES,resourceColumns)
      })
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateMaterialResource(resourceInputs.ShortKey, resourceInputs.Code,"1");
    cy.SAVE();
  });

  it("TC - Create material package include cost code checkbox using wizard", function () {
    const StandardInputs = this.data.Prerequisites.SidebarInputs;
    const packageInputs = this.data.CreateMaterialPkg.SelectCriteria;
    _common.openSidebarOption(StandardInputs.Wizard).search_fromSidebar(StandardInputs.wizard, StandardInputs.CreateUpdateMaterialPackage);
    _estimatePage.enterRecord_toCreatePackage_wizard(packageInputs.MaterialCostCode);
  });

  it("TC - Change status of the package", function () {
    const StandardInputs = this.data.Prerequisites.SidebarInputs;
    const PackageInputs = this.data.Package.PackageStatus;
    _common.openSidebarOption(StandardInputs.Wizard).search_fromSidebar(StandardInputs.wizard, StandardInputs.ChangePackageStatus);
    _common.changeStatus_fromModal(PackageInputs.Status);
  });

  it("TC - Create new contract record", function () {
    cy.SAVE();
    const StandardInputs = this.data.Prerequisites.SidebarInputs;
    const PartnerInput = this.data.BusinessPartner.SelectPartner;
    _common.openSidebarOption(StandardInputs.Wizard).search_fromSidebar(StandardInputs.wizard, StandardInputs.ContractCreation);
    _estimatePage.create_contractFrom_package(PartnerInput.PartnerName);
  });

  it("TC - Assign controlling unit to contract", function () {
    const ControllingunitInputs = this.data.ControllingUnit.SelectCU;
    const contractsColumns = this.data.ControllingUnit.ColumnHeaders;
    cy.wait(5000)
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
      _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT,contractsColumns)
      })
    _estimatePage.assignControllingUnit_toContract(ControllingunitInputs.CUName);
    cy.SAVE();
  });

  it("TC - Change contract status", function () {
    cy.REFRESH_CONTAINER();
    const StandardInputs = this.data.Prerequisites.SidebarInputs;
    const ContractInputs = this.data.Contract.ContractStatus;
    _common.openSidebarOption(StandardInputs.Wizard).search_fromSidebar(StandardInputs.wizard, StandardInputs.ChangeContractStatus);
    _estimatePage.verifyChange_contractStatus(ContractInputs.Status);
    cy.wait(3000);
    cy.REFRESH_CONTAINER();
  });

  it("TC - Create PES", function () {
    const StandardInputs = this.data.Prerequisites.SidebarInputs;
    const PESInputs = this.data.Prerequisites.SidebarInputs;
    _common.openSidebarOption(StandardInputs.Wizard).search_fromSidebar(StandardInputs.wizard, PESInputs.CreatePES);
    _estimatePage.verify_CreatePESandGoToPES();
  });

  it("TC - Enter quantity in Item", function () {
    const PESInputQuantity = this.data.PESPage.PESQuantity;
    _estimatePage.enter_quantityInItemFromPES(PESInputQuantity.Quantity);
    cy.SAVE();
  });

  it("TC - Update line Item quantities from PES", function () {
    const StandardInputs = this.data.Prerequisites.SidebarInputs;
    const FooterInputs = this.data.LineItemPage.FooterInput;
    _common.openSidebarOption(StandardInputs.QuickStart).search_fromSidebar(StandardInputs.quickStart, StandardInputs.estimateModule);
    _common.openSidebarOption(StandardInputs.Wizard).search_fromSidebar(StandardInputs.wizard, StandardInputs.UpdateLineItemQuantities);
    _estimatePage.update_LineItem_Quantity_FromPES()
    cy.wait(500).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.LINE_ITEM_QUANTITIES, app.FooterTab.LINE_ITEM_QUANTITY);

    })
  });
});
