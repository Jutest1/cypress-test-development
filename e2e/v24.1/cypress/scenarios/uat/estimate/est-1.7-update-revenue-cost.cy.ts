import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from "cypress/pages";
import { app, tile, cnt, btn } from "cypress/locators";

const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.7 | Update Revenue (Cost)");

describe("EST- 1.7 | Update Revenue (Cost)", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-1.7-update-revenue-cost.json").then((data) => {
            this.data = data;
        });
    });
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("estimate/est-1.7-update-revenue-cost.json").then((data) => {
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

    it("TC - Precondition create BOQ header and BOQ structure", function () {
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

    it("TC - Precondition create Estimate header", function () {
        const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
        const estimateGrid = this.data.columns.column_headers;
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, " ")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubricCategory, estimateInputs.estimateType);
        cy.SAVE();
        cy.wait(1000)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    });

    it("TC - Precondition generate BOQ line item", function () {
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
        const resourcesGrid = this.data.columns.resourceColumn_headers;

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
        });
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

    it("TC - Precondition create BID and update BID status", function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const CreateBidFromWizard = this.data.BidFromWizard.BidFromWizardInput;
        cy.wait(2000)
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateBid);
        _common.waitForLoaderToDisappear()
        cy.wait(5000)
        _estimatePage.enterRecord_toCreate_BID_from_Wizard(CreateBidFromWizard.description, CreateBidFromWizard.businesspartner);
        _estimatePage.structure_Setting_BOQ(CreateBidFromWizard.structureType);
        _modalView.acceptButton("Go to Bid")
        cy.wait(2000)
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

    it("TC - Precondition create contract and update contract status", function () {
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const CreateContractrecord = this.data.CreateContract.CreateContractInput;
        const ContractStatus = this.data.CreateContract.ContractStatus;
        cy.wait(5000)
        console.log(Cypress.env("BID-CODE") )
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateContract);
        _estimatePage.enterRecord_toCreateContract(CreateContractrecord.rubricCategory);
        cy.wait(5000)
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
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

    it("TC - Update revenue (Cost) and verify updated revenue", function () {
        const standardInputs = this.data.Prerequisites.SidebarInputs;
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
        const wizardInputs = this.data.SidebarOptions.wizardInputs;
        const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers;
        const updateRevenuePage = this.data.updateRevenue.updateRevenueInputs
        _common.openSidebarOption(sidebarInputs.Quickstart);
        _common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.modulename);
        cy.wait(5000)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE);
        });
        _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
        _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        cy.wait(5000)

        _common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_DESC)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        cy.wait(5000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        cy.wait(5000)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openSidebarOption(sidebarInputs.wizard1);
        _common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.UpdateRevenue);
        _estimatePage.updateRevenue(updateRevenuePage.updateRevenueRadio,1,updateRevenuePage.distributeByRadio,0)
        cy.wait(5000)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
            _validate.set_ColumnAtTop([lineItemGrid.revenue,lineItemGrid.costtotal],cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _estimatePage.verify_UpdateRevenue("Cost")
    });
});