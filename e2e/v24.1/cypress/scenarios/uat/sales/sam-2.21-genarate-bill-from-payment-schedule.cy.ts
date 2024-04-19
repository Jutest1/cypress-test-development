import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _billPage } from "cypress/pages";

const allure = Cypress.Allure.reporter.getInterface();

allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 2.21 | Genarate bill from payment schedule");

    describe("SAM- 2.21 | Genarate bill from payment schedule", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-2.21-genarate-bill-from-payment-schedule.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));

    cy.fixture("sam/sam-2.21-genarate-bill-from-payment-schedule.json").then((data) => {
      this.data = data;
      const standardInputs = this.data.Prerequisites.SidebarInputs;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

  it("TC - Create new BoQ header and BoQ structure", function () {
    const BoQInputs = this.data.CreateNewBoq.CreateBoQ;
    const BoQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const BoqheaderGridinput = this.data.columns_Boqheader.column_Boqsheaders;
    const BoqstruGridinput = this.data.columns_Boqstructure.column_Boqstructure;
    Cypress.env("boqStructuredes", BoQStructureInputs.description + Cypress._.random(0, 999));
    _common.openTab(app.tabBar.BoQs).then(() => {
      cy.wait(2000)
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, BoqheaderGridinput)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(BoQInputs.newCode);
    cy.SAVE();
    _boqPage.textOfBoQCode();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 1);
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BoqstruGridinput)
    });
    _boqPage.enterRecord_toCreateBoQStructure(Cypress.env("boqStructuredes"), BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom);
    cy.SAVE();
  });

  it("TC - Create new estimate", function () {
    const EstimateInputs = this.data.EstimatePageInputes.CreateEstimate;
    const standardInputs = this.data.Prerequisites.SidebarInputs;
    const estimateGrid = this.data.columns.column_headers;
  
     _common.openSidebarOption(standardInputs.searchby)
    _common.search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);
    _common.openTab(app.TabBar.ESTIMATE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE,app.FooterTab.ESTIMATE,2)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EstimateInputs.newCode, EstimateInputs.description, EstimateInputs.rubicCategory, EstimateInputs.estimateType);
    _estimatePage.textOfEstimateCode();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC - Generate line item and assign resource to it", function () {
    const LineItemInputs = this.data.CreateNewLineItemRecord.SidebarInputs;
    _common.openSidebarOption(LineItemInputs.Wizard).search_fromSidebar(LineItemInputs.Wizard1, LineItemInputs.genarateLineItems);
    _boqPage.generate_LineItemBySendingInputValue();
    const resourceInputs = this.data.ResourceRecord.CreateNewResource;
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
    cy.SAVE();
  });

  it("TC - Create new sales bid from wizard and change status", function () {
    const bidinput = this.data.CreateBidRecord.CreateNewBid;
    const budgetInput = this.data.GenerateBudget.BudgetInputs;

    _common.openSidebarOption(budgetInput.wizard1)
    _common.search_fromSidebar(budgetInput.wizard2, budgetInput.GenerateBudget)
    _estimatePage.generate_BudgetForLineItem("2", "Entire Estimate", 0, "Base Cost Total", 2);
    _bidPage.createBidRecord_byWizardOption(bidinput.description, bidinput.businessPartner, bidinput.sourceLead);
    _bidPage.changeStatus_BidRecord();
  });

  it("TC - Create contract sales - change status and create bill", function () {
    const contractInputs = this.data.CreateContractRecord.CreateNewContract;
    const billInputs = this.data.CreateBillRecord.CreateNewBill;
    _common.openSidebarOption(contractInputs.Wizard);
    _common.search_fromSidebar(contractInputs.Wizard1, contractInputs.CreateContract);
    _saleContractPage.createContractRecord_byWizardOptions(contractInputs.createContractCase, contractInputs.description, contractInputs.customer, null);
    _saleContractPage.changeStatus_ContractRecord();
    _saleContractPage.selectContract();
    _salesPage.create_BillFromWizard("WIP", billInputs.RecordOption, billInputs.descInfo, billInputs.type);
    _modalView.acceptButton("Go to Bill")
   
  });

  it("TC - Go to contract sales and generate payment schedule in contract", function () {
    const paymentincontract = this.data.GenaratePaymentInContract.ScheduleInContractInput;
    const Column_paymentschInputs = this.data.columns_paymentstructure.column_wippaymentstructure

    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILL)
    })
    _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.BILLS, paymentincontract.contractSales);
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PAYMENT_SCHEDULE_V1, app.FooterTab.PAYMENTSCHEDULE);
    _common.setup_gridLayout(cnt.uuid.PAYMENT_SCHEDULE_V1,Column_paymentschInputs)
   });
   cy.wait(1000)
   _saleContractPage.selectContract()
    _saleContractPage.generate_Payment_Schedule_In_Contract(paymentincontract.paymentSchedule, paymentincontract.startDate, paymentincontract.endDate, paymentincontract.radioButton, paymentincontract.scheduleTarget);
  });

  it("TC - generate bill from payment schedule", function () {
    const billincontract = this.data.GenarateBillInContract.BillInContractInput;
    _saleContractPage.generate_Bill_From_Payment_Schedule(billincontract.code, billincontract.billSchedule);
  });

  it("TC - Verify bill amount net from payment schedule", function () {
    const paymentincontract = this.data.GenaratePaymentInContract.ScheduleInContractInput;
    const billincontract = this.data.GenarateBillInContract.BillInContractInput;
    const Column_BILLInputs = this.data.columns_billstructure.column_billBoqstructure
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.BILL_BOQ,app.FooterTab.BOQs)
    _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
    _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, Column_BILLInputs)
  });
 
    _saleContractPage.verify_Bill_From_Payment_Schedule(paymentincontract.contractSales, billincontract.code);
  });

  after(() => {
    cy.LOGOUT();
  });
});
