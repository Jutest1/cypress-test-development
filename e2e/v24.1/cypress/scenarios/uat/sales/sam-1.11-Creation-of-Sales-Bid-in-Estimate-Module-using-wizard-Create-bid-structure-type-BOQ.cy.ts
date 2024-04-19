import { tile, app, cnt } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage,_package } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();

allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.11 | Creation of sales bid in estimate module using wizard 'Create bid' & structure type: BOQ");
describe("SAM- 1.11 | Creation of sales bid in estimate module using wizard 'Create bid' & structure type: BOQ", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-1.11-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-BOQ.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.11-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-BOQ.json").then((data) => {
      this.data = data;
      const standardInputs = this.data.Prerequisites.SidebarInputes;
      const BoQPageInputs = this.data.BoQCreation.BoQPageInputs;
      Cypress.env("BoQCode", BoQPageInputs.boqdescription + Cypress._.random(0, 999));
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openSidebarOption(standardInputs.search).delete_pinnedItem();
      _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  it("TC - Create new BoQ record", function () {
    const boqPageInputs = this.data.BoQCreation.BoQPageInputs;
    const boqGrid = this.data.boq_ColumnHeaders.column_Headers;
    const boqStructureGrid = this.data.boqStructure_ColumnHeaders.column_Headers;
    _common.openTab(app.tabBar.BoQs).then(() => {
      _common.setup_gridLayout(cnt.uuid.BOQS, boqGrid)
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    cy.wait(1000);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(Cypress.env("BoQCode"));
    cy.SAVE();
    _boqPage.textOfBoQCode();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    cy.wait(1000)
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqStructureGrid)
    });
    _boqPage.enterRecord_toCreateBoQStructure(boqPageInputs.description, boqPageInputs.quantity, boqPageInputs.unitRate, boqPageInputs.uom);
    cy.REFRESH_CONTAINER()
    _boqPage.assignRecordLevalToBoQStructure(boqPageInputs.recordingLevel);
    cy.SAVE();
  });

  it("TC - Create new estimate record", function () {
    const estimateInputs = this.data.EstimateHeader.EstimateHeaderInputs;
    const estimateGrid = this.data.estimate_ColumnHeaders.column_headers
    const sideBarAction = this.data.sidebarInputs.sideBar
    _common.openSidebarOption(sideBarAction.quickstart);
    _common.search_fromSidebar(sideBarAction.quickstart1, sideBarAction.ModuleName);
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    cy.wait(2000);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, estimateInputs.description, estimateInputs.rubric, estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC - Verify generate line item wizards option", function () {
    const sidebarInputes = this.data.VerifygeneratelineItem.SidebarInputes;
    const bidInputs = this.data.BidCreation.bidInputs;
    const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.openSidebarOption(sidebarInputes.wizard1)
    _common.search_fromSidebar(sidebarInputes.wizard2, sidebarInputes.GenerateLineItem)
    _boqPage.generate_LineItemBySendingInputValue()
    _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_SMALL, bidInputs.quantity)
    cy.SAVE()
  });

  it("TC - Verify assign resource to line item", function () {
    const resourceInputs = this.data.AssignResources.resourceInputs
    const resourcesGrid = this.data.resources_ColumnHeaders.column_headers;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      cy.wait(2000)
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
    cy.SAVE();
  });
  it("TC -Generate budget from wizard and verify budget field of line item", function () {
    const GenrateBudgetInput = this.data.EstimateHeader.GenrateBudgetInput
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar("wizard","Generate Budget from DJC")
    _package.generate_BudgetForLineItem(GenrateBudgetInput.X_Factor)

})

  it("TC - Create new sales bid", function () {
    const bidInputs = this.data.BidCreation.bidInputs
    cy.SAVE();
    cy.wait(10000);
    cy.REFRESH_CONTAINER();
    cy.wait(10000);
    cy.SAVE();
    _bidPage.createBidRecord_byWizardOption(bidInputs.description, bidInputs.businessPartner, bidInputs.sourceLead);
  });

  it("TC - Verify net amount and BoQ structure ", function () {
    const bidInputs = this.data.BidCreation.bidInputs;
    const bidGrid = this.data.bid_Columns.column_Headers
    cy.wait(2000)
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      _common.setup_gridLayout(cnt.uuid.BIDS, bidGrid)
  });
    _bidPage.verifying_Bid_Net_Amount();
    _common.openTab(app.tabBar.bidBoQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 0);
    });
    _bidPage.verifyBidQuantity_inBoQStructure(bidInputs.quantity);
  });

  after(() => {
    cy.LOGOUT();
  });
});
