import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from "cypress/pages";
import { app, tile, cnt, btn } from "cypress/locators";

const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.8 | Update Revenue (Budget)");

describe("EST- 1.8 | Update Revenue (Budget)", () => {
beforeEach(function () {
    cy.fixture("estimate/est-1.8-update-revenue-budget.json").then((data) => {
        this.data = data;
    });               
});
before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));  
    cy.fixture("estimate/est-1.8-update-revenue-budget.json").then((data) => {
        this.data = data;
        const standardInputs = this.data.Prerequisites.SidebarInputs;
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
        _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });         
})

after(() => {
    cy.LOGOUT();
})

it("TC - Create BOQ header and BOQ structure", function () {
    const BoQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const standardInputs = this.data.Prerequisites.SidebarInputs;
    const boqGrid = this.data.boq_ColumnHeaders.column_Headers;
    const boqStructureGrid = this.data.boqStructure_ColumnHeaders.column_Headers;
    _common.openTab(app.tabBar.BoQs).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
        _common.setup_gridLayout(cnt.uuid.BOQS, boqGrid)
    });
    _common.search_inSubContainer(cnt.uuid.BOQS, " ")
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
    cy.SAVE();
    _boqPage.textOfBoQCode();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    cy.wait(5000)
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
        cy.wait(2000)
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqStructureGrid)
        _validate.set_ColumnAtTop([boqStructureGrid.briefinfo,boqStructureGrid.quantity,boqStructureGrid.basuomfk,boqStructureGrid.price,boqStructureGrid.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
    });
    _boqPage.enterRecord_toCreateBoQStructure(BoQStructureInputs.boqOutLineSpecification, BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom);
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.modulename);
});

it("TC - Create Estimate header", function() {
    const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubricCategory, estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
});

it("TC - Generate BOQ line item", function () {
    const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
    const wizardInputs = this.data.SidebarOptions.wizardInputs;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
    });
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateLineItem);
    _boqPage.generate_LineItemBySendingInputValue();
});

it("TC - Create resource", function () {
    const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
    const wizardInputs = this.data.SidebarOptions.wizardInputs;
    const ResourceInput = this.data.CreateResource.CreateResourceInput;
    const budgetInput = this.data.GenerateBudget.BudgetInputs;

    _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
    _common.search_inSubContainer(cnt.uuid.RESOURCES," ")
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(ResourceInput.shorttKey, ResourceInput.code);
    cy.SAVE();
    cy.wait(10000)
    cy.SAVE();
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateBudgetfromDJC);
    _estimatePage.generate_BudgetForLineItem(budgetInput.XFactor,budgetInput.EstimateScope,budgetInput.EstimateScopeIndex,budgetInput.BugetFrom,budgetInput.BugetFromIndex)
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    });
});

it("TC - Create BID and update BID status", function () {
    const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
    const wizardInputs = this.data.SidebarOptions.wizardInputs;
    const CreateBidFromWizard = this.data.BidFromWizard.BidFromWizardInput;
    cy.wait(10000)
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateBid);
    _estimatePage.enterRecord_toCreate_BID_from_Wizard(CreateBidFromWizard.description, CreateBidFromWizard.businesspartner);
    _estimatePage.structure_Setting_BOQ(CreateBidFromWizard.structureType);
    cy.wait(10000)
    _common.clickOn_modalFooterButton(btn.buttonText.GoTOBid)
    _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 2);
    });
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.ChangeBidStatus);
    _estimatePage.change_BID_Status()
    _common.openTab(app.TabBar.BID).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
    });
});

it("TC - Create contract and update contract status", function () {
    const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
    const wizardInputs = this.data.SidebarOptions.wizardInputs;
    const CreateContractrecord = this.data.CreateContract.CreateContractInput;
    const ContractStatus = this.data.CreateContract.ContractStatus;
    cy.wait(5000)
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateContract);
    _estimatePage.enterRecord_toCreateContract(CreateContractrecord.rubricCategory);
    cy.wait(1000)
    _modalView.acceptButton("Go To Contract")
    cy.wait(5000)
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 2);
    });
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.ChangeContractStatus);
    _estimatePage.changeContractStatus(ContractStatus.Status);
    cy.wait(5000)
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS);
    });
  });

  it("TC - Generate Base Cost", function () {
    const standardInputs = this.data.Prerequisites.SidebarInputs;
    const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
    const wizardInputs = this.data.SidebarOptions.wizardInputs;
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.modulename); 
    cy.wait(5000)
    _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
    _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    cy.wait(5000)

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,EST_DESC)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    cy.wait(5000)  
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.wait(5000)
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    });
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateUpdateBaseCost);
    _estimatePage.generateUpdateBaseCost("Entire Estimate","Generate Base Cost",0,0)
    cy.wait(5000) 
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    });
});

it("TC - Verify Budget gets calculated based on Grand total", function () {
    const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
    const wizardInputs = this.data.SidebarOptions.wizardInputs;
    const budgetInput = this.data.GenerateBudget.BudgetInputs;
    const Column_Estimate_LineItem=this.data.Column_Estimate_LineItem

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.wait(5000)
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,Column_Estimate_LineItem)
    });
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateBudgetfromDJC);
    _estimatePage.generate_BudgetForLineItem(budgetInput.XFactor,budgetInput.EstimateScope,budgetInput.EstimateScopeIndex,budgetInput.BugetFrom,budgetInput.BugetFromIndex)   
    cy.wait(5000) 
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _estimatePage.verify_BudgetForLineItem(cnt.uuid.ESTIMATE_LINEITEMS,"1")
});

it("TC - Verify Revenue gets updated based on the budget under the line items container", function () {
    const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
    const wizardInputs = this.data.SidebarOptions.wizardInputs;
    const Column_Estimate_LineItem=this.data.Column_Estimate_LineItem

    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS," ")
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.wait(5000)
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
    });
    _common.openSidebarOption(sidebarInputs.wizard1);
    _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.UpdateRevenue);
    _estimatePage.updateRevenue("Selected LineItems(All concerned Line Items)",1,"Budget",1)
    cy.wait(5000) 
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,Column_Estimate_LineItem)
    });
    _estimatePage.verify_UpdateRevenue("Budget")
});
});
