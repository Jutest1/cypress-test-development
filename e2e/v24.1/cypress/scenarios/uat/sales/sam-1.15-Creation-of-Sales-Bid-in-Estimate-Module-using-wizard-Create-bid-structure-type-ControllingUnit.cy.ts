import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _controllingUnit, _package } from "cypress/pages";
import { tile, app, cnt } from "cypress/locators";
import { randomNo } from "cypress/commands/integration";

const allure = Cypress.Allure.reporter.getInterface();
allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.15 | Creation of sales bid in estimate module using wizard create bid structure type :controlling unit");
describe("SAM- 1.15 | Creation of sales bid in estimate module using wizard create bid structure type :controlling unit", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-1.15-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-ControllingUnit.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.15-Creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-structure-type-ControllingUnit.json").then((data) => {
      this.data = data;
      const standardInputs = this.data.Prerequisites.SidebarInputs;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
      _common.create_newRecord(cnt.uuid.Projects);
      _projectPage.enterRecord_toCreateProject(`prj${randomNo}`, `test project1${randomNo}`,standardInputs.clerkName);
      cy.SAVE();
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar("standard", `prj${randomNo}`).pinnedItem();
    });
  });

    it("TC - Create new controlling unit", function () {
        const SidebarInputs = this.data.Prerequisites.SidebarInputs
        const ControllingUnitInputs = this.data.CreateControllingUnit.ControllingUnitInputs
        const requireColumns = this.data.CreateControllingUnit.ColumnHeaders;
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(SidebarInputs.searchTypeQuick, SidebarInputs.ModuleNameControlling);
        _common.openTab(app.tabBar.ControllingStructure).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
          _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT,requireColumns)
        });
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
         cy.REFRESH_CONTAINER()
         _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT);
         cy.SAVE()
         _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(ControllingUnitInputs.description)
        _common.edit_containerCell(cnt.uuid.CONTROLLING_UNIT, app.GridCells.QUANTITY_SMALL, ControllingUnitInputs.quantity)
        _common.edit_containerCell(cnt.uuid.CONTROLLING_UNIT, app.GridCells.UOM_FK, ControllingUnitInputs.uom)
        
        _mainView
            .select_popupItem('grid', ControllingUnitInputs.uom)   
            _modalView.findCheckbox_inCell(app.gridCells.INVOICING).uncheck()
        cy.SAVE()
        
    });
    it("TC - Create new estimate record", function () {
        const SidebarInputs = this.data.Prerequisites.SidebarInputs
        const estimateInputs = this.data.EstimateHeader.EstimateHeaderInputs
        const requireColumns = this.data.EstimateHeader.ColumnHeaders;
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(SidebarInputs.searchTypeQuick,SidebarInputs.ModuleNameProject );
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE,requireColumns)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        cy.wait(3000);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, estimateInputs.description + Cypress._.random(0, 999), estimateInputs.rubric, estimateInputs.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    });
 
    
    it("TC - Verify generate line items from wizard", function () {
        const SidebarInputs=this.data.VerifygeneratelineItem.SidebarInputs
        const bidInputs = this.data.BidCreation.bidInputs
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.openSidebarOption(SidebarInputs.wizard1)
        _common.search_fromSidebar(SidebarInputs.wizard2, SidebarInputs.GenerateLineItem)   
        _boqPage.generate_LineItemBycode(bidInputs.sourceLead)
         cy.SAVE()
    });

  it("TC - Verify assign resource to line item", function () {
    const resourceInputs = this.data.AssignResources.resourceInputs;
    const resourcesGrid = this.data.AssignResources.column_headers;
    const ResourceData = this.data.AssignResources.Footers;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, ResourceData.FootersTab,3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
      })
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES)
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
    cy.SAVE();
  });
  it("TC - Generate budget from wizard and verify budget field of line item", function () {

    const SidebarInputs = this.data.VerifygeneratelineItem.SidebarInputs
    const GenrateBudgetInput = this.data.EstimateHeader.GenrateBudgetInput
    _common.openSidebarOption(SidebarInputs.wizard1)
    _common.search_fromSidebar(SidebarInputs.wizard2,GenrateBudgetInput.Genrate_Budget)
    _package.generate_BudgetForLineItem(GenrateBudgetInput.X_Factor)

})

  it("TC - Create new sales bid", function () {
    const bidInputs = this.data.BidCreation.bidInputs;
    _bidPage.enter_record_in_create_bid(bidInputs.description, bidInputs.businessPartner);
    _modalView.findModal().acceptButton(btn.ButtonText.NEXT);
    cy.wait(2000)
    _bidPage.select_structure_type(bidInputs.sourceLeadBid);
    _bidPage.uncheck_checkbox(bidInputs.structure_checkbox);
    _modalView.findModal().acceptButton(Buttons.buttonText.Execute);
    _bidPage.getCode_fromBIDModal("MODAL_BID_CODE")
    _modalView.acceptButton("Go to Bid")
  });

  it("TC - Verify net amount and BoQ structure quantity", function () {
    const ControllingUnitInputs = this.data.CreateControllingUnit.ControllingUnitInputs;
    const BidsColumns = this.data.CreateControllingUnit.BidsColumns;
    cy.wait(10000);
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      _common.setup_gridLayout(cnt.uuid.BIDS, BidsColumns)
    });
    cy.REFRESH_CONTAINER()
    cy.wait(3000)
    _common.search_inSubContainer(cnt.uuid.BIDS,Cypress.env("MODAL_BID_CODE"))
    _bidPage.verifying_Bid_Net_Amount();
    _bidPage.verify_Bid_netQuantyto_LI_GrandTotal(ControllingUnitInputs.description);
  });
  after(() => {
    cy.LOGOUT();
  });
});
