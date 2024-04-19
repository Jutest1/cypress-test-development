import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package, _validate } from "cypress/pages";
import { tile, app, cnt } from "cypress/locators";
import Buttons from "cypress/locators/buttons";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const LOCATION1 = "LOC-01-" + Cypress._.random(0, 999);
const LOCATION2 = "LOC-02-" + Cypress._.random(0, 999);
const LOCATION1_DESC = "NASHIK-" + Cypress._.random(0, 999);
const LOCATION2_DESC = "PUNE-" + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.14 | Creation of sales bid in estimate module using wizard 'Create bid' & structure type : location");
describe("SAM- 1.14 | Creation of sales bid in estimate module using wizard 'Create bid' & structure type : location", () => {

  beforeEach(function () {
    cy.fixture("sam/sam-1.14-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-Location.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.14-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-Location.json").then((data) => {
      this.data = data;
      const standardInputs = this.data.Prerequisites.SidebarInputes;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
      _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  it("TC - Create new location record", function () {
    const LocationInput = this.data.CreateLocation.LocationInputs
    const locationGrid = this.data.CreateLocation.column_locationheaders

    _common.openTab(app.tabBar.project).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 3);
      _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, locationGrid)
    });
    _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
    _estimatePage.enterRecord_toCreateLocation(LOCATION1, LOCATION1_DESC)
    cy.SAVE()
    _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, LocationInput.quanityFactor1)
    cy.SAVE()
    _common.getText_fromCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("LOC01_Quantity", $ele1.text())
      cy.log(Cypress.env("LOC01_Quantity"))
    })
    cy.wait(2000)
    _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
    _estimatePage.enterRecord_toCreateLocation(LOCATION2, LOCATION2_DESC)
    cy.SAVE()
    _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, LocationInput.quanityFactor2)
    cy.SAVE()
    _common.getText_fromCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("LOC02_Quantity", $ele1.text())
      cy.log(Cypress.env("LOC02_Quantity"))
    })
  });

  it("TC - Create new estimate record", function () {
    const estimateInputs = this.data.EstimateHeader.EstimateHeaderInputs;
    const estimateGrid = this.data.EstimateHeader.column_estimateheaders

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    cy.wait(3000);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, estimateInputs.description + Cypress._.random(0, 999), estimateInputs.rubric, estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC - Verify create line items", function () {
    const lineitemInputs = this.data.CreateLineItem.LineItemInpute;
    const estimateGrid = this.data.CreateLineItem.column_lineitemheaders;

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, estimateGrid)
      _validate.set_ColumnAtTop([estimateGrid.prjlocationfk],cnt.uuid.ESTIMATE_LINEITEMS)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(lineitemInputs.description1, lineitemInputs.quantity1, lineitemInputs.uom)
    _estimatePage.assign_LocationCode_To_Line_Items(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, LOCATION1)
    cy.SAVE()
    cy.REFRESH_CONTAINER()
    cy.wait(2000)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(lineitemInputs.description2, lineitemInputs.quantity2, lineitemInputs.uom)
    _estimatePage.assign_LocationCode_To_Line_Items(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, LOCATION1)
    cy.SAVE()
    cy.REFRESH_CONTAINER()
    cy.wait(2000)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.enterRecord_toCreateLineItem(lineitemInputs.description3, lineitemInputs.quantity3, lineitemInputs.uom)
    _estimatePage.assign_LocationCode_To_Line_Items(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, LOCATION2)
    cy.SAVE()
    cy.REFRESH_CONTAINER()
    cy.wait(2000)
  });

  it("TC - Verify assign resource to line item", function () {
    const resourceInputs = this.data.AssignResources.resourceInputs;
    const lineitemInputs = this.data.CreateLineItem.LineItemInpute;
    const resourceGrid = this.data.AssignResources.column_resourceheaders

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, resourceGrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description1)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
    cy.SAVE();
    cy.wait(2000)
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description2)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
    cy.SAVE();
    cy.wait(2000)
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description3)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
    cy.SAVE();
    cy.wait(2000)
  });

  it("TC -Generate budget from wizard and verify budget field of line item", function () {
    const SidebarInputs = this.data.Prerequisites.SidebarInputes
    const GenrateBudgetInput = this.data.EstimateHeader.GenrateBudgetInput

    _common.openSidebarOption(SidebarInputs.wizard1)
    _common.search_fromSidebar(SidebarInputs.wizard2, GenrateBudgetInput.Genrate_Budget)
    _package.generate_BudgetForLineItem(GenrateBudgetInput.X_Factor)
  })

  it("TC - Create new sales bid", function () {
    const bidInputs = this.data.BidCreation.bidInputs;
    const lineitemInputs = this.data.CreateLineItem.LineItemInpute;
    const sideBarAction = this.data.sidebarInputs.sideBar

    _package.select_dataFromSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, lineitemInputs.description1);
    cy.wait(1000)
    _common.openSidebarOption(sideBarAction.wizard);
    _common.search_fromSidebar(sideBarAction.Wizard1, sideBarAction.createBid);
    _bidPage.enter_record_in_create_bid(bidInputs.description, bidInputs.businessPartner);
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT);
    _bidPage.select_structure_type(bidInputs.sourceLead);
    _bidPage.uncheck_checkbox(bidInputs.structure_checkbox);
    _common.clickOn_modalFooterButton(Buttons.buttonText.Execute);

  });

  it("TC - Verify net amount and BoQ structure ", function () {
    const bidGrid = this.data.BidCreation.column_bidheaders
    const boqGrid = this.data.BidCreation.column_boqheaders

    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      _common.setup_gridLayout(cnt.uuid.BIDS, bidGrid)
    });
    _bidPage.verifying_Bid_Net_Amount();
    _common.openTab(app.tabBar.bidBoQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID, boqGrid)
    });
    _common.select_rowHasValue(cnt.uuid.BIDBOQSTRUCTURE, LOCATION1_DESC)
    cy.wait(1000).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("LOC01_Quantity"))
    })
    _common.select_rowHasValue(cnt.uuid.BIDBOQSTRUCTURE, LOCATION2_DESC)
    cy.wait(1000).then(() => {
      _common.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, Cypress.env("LOC02_Quantity"))

    })
  });


  after(() => {
    cy.LOGOUT();
  });

});