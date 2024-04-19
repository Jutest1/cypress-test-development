import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from 'cypress/pages';
import { app, tile, cnt } from "cypress/locators";

const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.30 | Generate Budget (Base Cost Total)');

describe('EST- 1.30 | Generate Budget (Base Cost Total)', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-1.30-generate-budget-base-cost-total.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('estimate/est-1.30-generate-budget-base-cost-total.json').then((data) => {
			this.data = data;
			const standardInputs = this.data.Prerequisites.SidebarInputs;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption(standardInputs.Search).delete_pinnedItem();
			_common.search_fromSidebar(standardInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create BOQ header and BOQ structure', function () {
		const BoQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const boqColumn = this.data.Headers.Column_BoQHeaders;
		const boqStructureColumn = this.data.Headers.Column_BoQStruct;

		_common.openTab(app.tabBar.BoQs).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, boqColumn);
		});
		_common.search_inSubContainer(cnt.uuid.BOQS, ' ');
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
		cy.SAVE();
		_boqPage.textOfBoQCode();
		_common.clickOn_toolbarButton(cnt.uuid.BOQS);
		cy.wait(2000);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqStructureColumn);
		});
		_common.search_inSubContainer(cnt.uuid.BOQ_STRUCTURES, ' ');
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES);
		_boqPage.enterRecord_toCreateBoQStructure(BoQStructureInputs.boqOutLineSpecification, BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom);
		cy.wait(2000);
		cy.SAVE();
		_common.openSidebarOption('Quick Start');
		_common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.modulename);
	});

	it('TC - Create Estimate header', function () {
		const estimateInputs = this.data.Estimate.EstimateHeaderInputs;
		const estimateColumn = this.data.Headers.Column_Estimate;

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateColumn);
		});
		_common.search_inSubContainer(cnt.uuid.ESTIMATE, ' ');
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubricCategory, estimateInputs.estimateType);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
	});

	it('TC - Generate BOQ line item and create Resource', function () {
		const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
		const wizardInputs = this.data.SidebarOptions.wizardInputs;
		const ResourceInput = this.data.CreateResource.CreateResourceInput;
		const estimateLineItemColumn = this.data.Headers.Column_EstimateLineItem;
		const resoruceColumn = this.data.Headers.Column_Resource;
		const budgetInput = this.data.GenerateBudget.BudgetInput;

		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, estimateLineItemColumn);
		});
		_common.openSidebarOption(sidebarInputs.wizard1);
		_common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateLineItem);
		_boqPage.generate_LineItemBySendingInputValue();

		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, resoruceColumn);
		});
		_common.search_inSubContainer(cnt.uuid.RESOURCES, ' ');
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(ResourceInput.shorttKey, ResourceInput.code);
		cy.SAVE();
		cy.wait(2000);
		cy.SAVE();
		_common.openSidebarOption(sidebarInputs.wizard1);
		_common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateBudgetfromDJC);
		_estimatePage.generate_BudgetForLineItem(budgetInput.XFactor, budgetInput.EstimateScope, budgetInput.EstimateScopeIndex, budgetInput.BugetFrom, budgetInput.BugetFromIndex);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
		});
	});
	it('TC - Create BID and update BID status', function () {
		const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
		const wizardInputs = this.data.SidebarOptions.wizardInputs;
		const CreateBidFromWizard = this.data.BidFromWizard.BidFromWizardInput;
		const bidColumn = this.data.Headers.Column_Bids;

		cy.wait(2000);
		_common.openSidebarOption(sidebarInputs.wizard1);
		_common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.CreateBid);
		cy.wait(4000) // This wait required

		_estimatePage.enterRecord_toCreate_BID_from_Wizard(CreateBidFromWizard.description, CreateBidFromWizard.businesspartner);
		_estimatePage.structure_Setting_BOQ(CreateBidFromWizard.structureType);
		_common.clickOn_modalFooterButton('Go to Bid');
		cy.wait(2000);
		_common.openTab(app.TabBar.BID).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 2);
			_common.setup_gridLayout(cnt.uuid.BIDS, bidColumn);
		});
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.openSidebarOption(sidebarInputs.wizard1);
		_common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.ChangeBidStatus);
		_estimatePage.change_BID_Status();
		_common.openTab(app.TabBar.BID).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
		});
	});

	it('TC - Generate base cost', function () {
		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
		const wizardInputs = this.data.SidebarOptions.wizardInputs;
		_common.openSidebarOption('Quick Start');
		_common.search_fromSidebar(standardInputs.searchTypeQuick, standardInputs.modulename);
		cy.wait(2000);
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE);
		});
		_common.search_inSubContainer(cnt.uuid.ESTIMATE, EST_DESC);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE);
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
		cy.wait(2000);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
		});
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, ' ');
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
		cy.wait(2000);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
		});
		_common.openSidebarOption(sidebarInputs.wizard1);
		_common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateUpdateBaseCost);
		_estimatePage.generateUpdateBaseCost('Entire Estimate', 'Generate Base Cost', 0, 0);
		cy.wait(2000);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
		});
	});

	it('TC - Verify Budget gets calculated based on Base Cost Total and x factor', function () {
		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const sidebarInputs = this.data.SidebarOptions.SidebarInputs;
		const wizardInputs = this.data.SidebarOptions.wizardInputs;
		const budgetInput = this.data.GenerateBudget.BudgetInputs;

		_common.openSidebarOption(sidebarInputs.wizard1);
		_common.search_fromSidebar(sidebarInputs.wizard2, wizardInputs.GenerateBudgetfromDJC);
		_estimatePage.generate_BudgetForLineItem(budgetInput.XFactor, budgetInput.EstimateScope, budgetInput.EstimateScopeIndex, budgetInput.BugetFrom, budgetInput.BugetFromIndex);
		cy.wait(2000);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
		});
		_estimatePage.verify_Budget(budgetInput.BugetFrom, budgetInput.XFactor, cnt.uuid.ESTIMATE_LINEITEMS);
	});
});
