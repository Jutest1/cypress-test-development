import AppLayout from "cypress/locators/app-layout";
import { _modalView, _rfqPage, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage } from "cypress/pages";
import { tile, cnt, app } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const ReqCode = "ReqCode";
const PROJ_N = "PRJ" + Cypress._.random(0, 999);
const PROJNAME = "PRO" + Cypress._.random(0, 999);
const CLERKNAME = "HS";
const Req_Owner = "FI";
const CostTotal = "CostTotal";
const ReqClerkName = "ReqClerkName";
const requisitionItemsTotal = "requisitionItemsTotal";
const requisitionItemsQuantity = "requisitionItemsQuantity";
const Req_Desc = "Req_Desc" + Cypress._.random(0, 999);
allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM- 2.7 | Create contract, for a selected requisition (Hence RFQ)");
describe("PCM- 2.7 | Create contract, for a selected requisition (Hence RFQ)", () => {
  beforeEach(function () {
    cy.fixture("pcm/pcm-2.7-create-contract-for-a-selected-requisition.json").then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("pcm/pcm-2.7-create-contract-for-a-selected-requisition.json").then((data) => {
      this.data = data;
      const standerdInputs = this.data.Prerequisites.SidebarInputs;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      // _common.openSidebarOption(standerdInputs.Search).delete_pinnedItem();
      // _common.search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();

      _common.create_newRecord(cnt.uuid.Projects);
      _projectPage.enterRecord_toCreateProject(PROJ_N, PROJNAME, CLERKNAME);
      cy.SAVE();
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar("standard", PROJ_N).pinnedItem();

    });
  });
  /*  after(() => {
     cy.LOGOUT();
   }); */
  it("TC - Create new Estimate having line item ", function () {
    const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
    const resourceInputs = this.data.Estimate.ResourceInputs;
    const footer = this.data.Inputs.footerOptions;
    const estimateGrid = this.data.columns.column_headers;
    const Column_EstLineItems = this.data.Column_EstLineItems.column_LineItemsheaders;

    _common.openTab(app.tabBar.estimate).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, estimateInputs.description, estimateInputs.rubricCategory, estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    cy.wait(2000);

    _common.openTab(app.tabBar.estimateLineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, Column_EstLineItems)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(estimateInputs.LineItem1, estimateInputs.Quantity, estimateInputs.Uom);
    cy.SAVE();
  });

  it("TC - Add Resource for selected line item", function () {
    const sidebar = this.data.Inputs.SidebarOptions;
    const resourceInputs = this.data.Estimate.ResourceInputs;
    const Column_EstResLineItems = this.data.Column_ResLineItems.Column_ResItems;
    const budgetInput = this.data.GenerateBudget.BudgetInputs;
    _common.openTab(app.tabBar.estimateLineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 4);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, Column_EstResLineItems)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateMaterialResource(resourceInputs.shortKey, resourceInputs.code);
    _common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, resourceInputs.Quantity);
    cy.SAVE();
    cy.wait(2000);
    cy.REFRESH_CONTAINER();
    cy.wait(2000);
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
    cy.wait(2000);
    _common.select_allContainerData(cnt.uuid.RESOURCES);
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, sidebar.GenerateBudgetfromDJC);
    cy.wait(2000);
    _estimatePage.generate_BudgetForLineItem(budgetInput.XFactor, budgetInput.EstimateScope, budgetInput.EstimateScopeIndex, budgetInput.BugetFrom, budgetInput.BugetFromIndex)
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, CostTotal)
  });
  it("TC - Create Material Package from Estimate", function () {
    const sidebar = this.data.Inputs.SidebarOptions;
    const wizard = this.data.Inputs.wizardOptions;
    const packageInputs = this.data.Package.criteria;
    const status = this.data.Inputs.statusOption;
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, wizard.CreateMaterialPackage);
    _estimatePage.enterRecord_toCreatePackage_wizard(packageInputs.MaterialandCostCode);
    cy.SAVE();
    cy.wait(10000);
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, wizard.ChangePackageStatus);
    _common.changeStatus_fromModal(status.InProgress);
    cy.SAVE();
    cy.wait(5000);
  });
  it("TC - Create Requisition from Package", function () {
    const sidebar = this.data.Inputs.SidebarOptions;
    const wizard = this.data.Inputs.wizardOptions;
    const status = this.data.Inputs.statusOption;
    const goTo = this.data.Inputs.gotoButtons;
    const requisitionItemsGrid = this.data.requisition_ColumnHeaders.Items_ColumnHeaders;
    const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers;

    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, wizard.CreateRequisition);
    _modalView.findModal().acceptButton(goTo.Requisition);
    cy.wait(1000)
    _common.openTab(app.tabBar.Main).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid);
      _validate.set_ColumnAtTop([requisitionGrid.code,requisitionGrid.structure,requisitionGrid.projectfk,requisitionGrid.ProjectFkProjectName,requisitionGrid.businesspartnerfk,requisitionGrid.description,requisitionGrid.clerkreqfk,requisitionGrid.clerkprcfk,requisitionGrid.ClerkReqFkDescription],cnt.uuid.REQUISITIONS)
    });
    _common.maximizeContainer(cnt.uuid.REQUISITIONS)
    _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, Req_Desc)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_REQ_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, Req_Owner)
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_PRC_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, CLERKNAME)
    cy.SAVE();
    _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.gridCells.RequisitionOwnerDescription, ReqClerkName)
    _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, ReqCode)
    cy.SAVE();
    _common.minimizeContainer(cnt.uuid.REQUISITIONS)

    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, wizard.ChangeRequisitionStatus);
    _common.changeStatus_fromModal(status.Approved);
    cy.SAVE();
    cy.wait(1000);
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS, status.Approved);
    _common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, requisitionItemsGrid);
		});
    _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
    _common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.QUANTITY_SMALL, requisitionItemsQuantity)
    _common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.TOTAL, requisitionItemsTotal)

  });
  it("TC - Create RfQ from Requisition", function () {
    const sidebar = this.data.Inputs.SidebarOptions;
    const wizard = this.data.Inputs.wizardOptions;
    const status = this.data.Inputs.statusOption;
    const suplier = this.data.Quote.BusinessPartner;
    const goTo = this.data.Inputs.gotoButtons;
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, wizard.CreateRfQ);
    cy.SAVE();
    cy.wait(5000);
    _rfqPage.fromWizard_CreateRequestForCode([suplier.BusinessPartner1, suplier.BusinessPartner2]);
    _modalView.findModal().acceptButton(goTo.RfQ);
    _common.openTab(app.tabBar.RFQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.Request_for_Quote, app.FooterTab.RFQ, 2)
    })
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, wizard.ChangeRfQStatus);
    _common.changeStatus_fromModal(status.Published);
    cy.SAVE();
    cy.wait(1000);
  });
  it("TC - Create Quote for multiple suppliers from RfQ", function () {
    const sidebar = this.data.Inputs.SidebarOptions;
    const wizard = this.data.Inputs.wizardOptions;
    const suplier = this.data.Quote.BusinessPartner;
    const goTo = this.data.Inputs.gotoButtons;
    _common.openSidebarOption(sidebar.wizard1);
    _common.search_fromSidebar(sidebar.wizard2, wizard.CreateQuote);
    _rfqPage.fromWizard_CreateQuote([suplier.BusinessPartner1, suplier.BusinessPartner2]);
    _modalView.findModal().acceptButton(goTo.Quote);
    cy.SAVE();
  });
  it("TC - Quote the Prices for the supliers in Quote's items Container", function () {
    const quote = this.data.Quote.Price;
    const suplier = this.data.Quote.BusinessPartner;
    const material = this.data.Estimate.ResourceInputs;
    const Column_Quotesitems = this.data.Column_QuotesLineItems.Column_QuotesItems
    _common.openTab(app.tabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.Quotes_Iems, app.FooterTab.PACKAGEITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.Quotes_Iems, Column_Quotesitems)
    });
    cy.wait(2000)
    cy.REFRESH_CONTAINER();
    cy.wait(3000)
    _common.search_inSubContainer(cnt.uuid.Quotes, suplier.BusinessPartner1, 1)
    cy.wait(2000)
    cy.REFRESH_CONTAINER();
    cy.wait(3000)
    _common.search_inSubContainer(cnt.uuid.Quotes_Iems, material.code, 2)
    _common.enterRecord_inNewRow(cnt.uuid.Quotes_Iems,  app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT, quote.materialsup1);
    cy.SAVE();
    cy.wait(6000);
    _rfqPage.get_QuantityPriceTotalFromItemsQuote(suplier.BusinessPartner1)
    _common.search_inSubContainer(cnt.uuid.Quotes, suplier.BusinessPartner2, 1)
    cy.wait(2000)
    cy.REFRESH_CONTAINER();
    cy.wait(3000)
    _common.search_inSubContainer(cnt.uuid.Quotes_Iems, material.code, 2)
    _common.enterRecord_inNewRow(cnt.uuid.Quotes_Iems,  app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT, quote.materialsup2);
    cy.SAVE();
    cy.wait(6000);
  });

  it("TC - Navigate to Price Comparision & create the contract to BP", function () {
    const goTo = this.data.Inputs.gotoButtons;
    const suplier = this.data.Quote.BusinessPartner;
    const SidebarOptions = this.data.Inputs.SidebarOptions;
    const wizardOptions = this.data.Inputs.wizardOptions;
    const statusOption = this.data.Inputs.statusOption;
    _common.maximizeContainer(cnt.uuid.Quotes)
    _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.Quotes, SidebarOptions.PriceComparison);
    _common.openTab(app.tabBar.PriceComparison).then(() => {
      _common.setDefaultView(app.tabBar.PriceComparison)
      cy.wait(1000)
      _common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISON_V1, app.FooterTab.PRICE_COMPARISON_ITEM, 2);
    });
    _common.maximizeContainer(cnt.uuid.PRICE_COMPARISON_V1)
    cy.REFRESH_CONTAINER();
    _rfqPage.createContractForLineItemOnly("Grand Total", suplier.BusinessPartner1);
    cy.wait(2000);
    _modalView.findModal().acceptButton(goTo.contract);
    cy.wait(2000);
    _common.openSidebarOption(SidebarOptions.wizard1);
    _common.search_fromSidebar(SidebarOptions.wizard2, wizardOptions.ChangeContractStatus);
    _common.changeStatus_fromModal(statusOption.Approved);
    cy.SAVE();

  });
  it("TC - Verify Requisitions values", function () {
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
    })
    _common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DESCRIPTION, Req_Desc)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_REQ_FK, Req_Owner)
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.gridCells.RequisitionOwnerDescription, Cypress.env("ReqClerkName"))
    _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.REQ_HEADER_FK, Cypress.env("ReqCode"))

  });
  it("TC - Verify Quantity Price Total From Item Contract", function () {
    const Column_Quotesitems = this.data.Column_ContractLineItems.Column_ContractItems
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.itemsContract, app.FooterTab.PACKAGEITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.itemsContract, Column_Quotesitems)
      _validate.set_ColumnAtTop([Column_Quotesitems.price, Column_Quotesitems.quantity, Column_Quotesitems.basuomfk, Column_Quotesitems.total], cnt.uuid.itemsContract)
    });
    _common.maximizeContainer(cnt.uuid.itemsContract)
    _rfqPage.verify_QuantityPriceTotalFromItemsContract(Cypress.env("Items Quantity Adolf Koch"), Cypress.env("Items Price Adolf Koch"), Cypress.env("Items Total Adolf Koch"));
    _common.assert_cellData_insideActiveRow(cnt.uuid.itemsContract, app.GridCells.BUDGET_TOTAL, Cypress.env("CostTotal"))
    _common.minimizeContainer(cnt.uuid.itemsContract)
  });



  it("TC - Verify total container should be calculated", function () {
    const SidebarOptions = this.data.Inputs.SidebarOptions;
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTAL, 0)
      //_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, contractsColumn);
    })
    cy.wait(2000)
    _common.search_inSubContainer(cnt.uuid.CONTRACT_TOTALS, SidebarOptions.ProcurementBudget)
    _common.select_rowInContainer(cnt.uuid.CONTRACT_TOTALS)
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, Cypress.env("CostTotal"))
  });


  it("TC - Verify Requistion Status Had Been Change To Orderd;", function () {
    const SidebarOptions = this.data.Inputs.SidebarOptions;
    const status = this.data.Inputs.statusOption;
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
    });
    _common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
    _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.PROCUREMENTCONTRACT, SidebarOptions.Requisition);
    _common.openTab(app.tabBar.Main).then(() => {
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
    });
    _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS, status.Ordered);

  });
});
/* 1.it should check reqquistion status,only approval status can run create contract wiard; //!completed
2.after wizard to create contract , it should check whether subcontainer ger records from requistion;   // cancel
3.after wizard to create contract, it should check whether the requistion status had been change to orderd; //!completed
4.after wizard to create contract, it should check whether header container fields had inherit value from requistion;  ..?
5.after wizard to create contract, it should check whether con_header.req_header_fk had been set value from select req_header.id;   
6.after wizard to create contract, the total container should be calculated. */ //!completed