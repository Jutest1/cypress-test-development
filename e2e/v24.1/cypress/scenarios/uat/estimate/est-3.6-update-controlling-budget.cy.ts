import { tile, app, cnt, btn } from 'cypress/locators';
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _procurementConfig, _validate, _controllingUnit } from 'cypress/pages';
const allure = Cypress.Allure.reporter.getInterface();
const COUNTUNIT = 'COUNTUNIT-' + Cypress._.random(0, 999);

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 3.6 | Update controlling budget');
describe('EST- 3.6 | Update controlling budget', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-3.6-update-controlling-budget.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('estimate/est-3.6-update-controlling-budget.json').then((data) => {
			this.data = data;
			const standerdInputs = this.data.Prerequisites.SidebarInputs;
			/* Open desktop should be called in before block */
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption(standerdInputs.Search).delete_pinnedItem();
			_common.search_fromSidebar(standerdInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});
	after(() => {
		cy.LOGOUT();
	});

	// ** Precondition adding controlling unit**//
	it('TC - Adding controlling unit to project', function () {
		const standerdInputs = this.data.Prerequisites.SidebarInputs;
		const ModuleSearch = this.data.ModuleSearch.SearchInputs;
		const CUInputs = this.data.Cunitinput.SearchInputs;
		const controllingunit = this.data.Controllingunit_columns.Controllingunit_headers;
		_common.openSidebarOption(ModuleSearch.searchby).search_fromSidebar(ModuleSearch.Quickstart, ModuleSearch.Controllingunit);
		// _common.openSidebarOption(standerdInputs.Search);
		// _common.search_fromSidebar(standerdInputs.searchType, standerdInputs.ProjectName);
		_common.openSidebarOption(standerdInputs.Search).delete_pinnedItem();
		_common.search_fromSidebar(standerdInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		cy.wait(2000); //** NEED TIME TO LOAD APPLICATION  */
		_common.openTab(app.tabBar.controllingStructure).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, controllingunit);
		});
		_common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT);
		_controllingUnit.create_ControllingUnit(COUNTUNIT, CUInputs.Quantity, CUInputs.UOM);
		cy.SAVE();
		cy.wait(2000); //** NEED TIME TO LOAD APPLICATION  */
		cy.REFRESH_CONTAINER();
		cy.wait(2000); //** NEED TIME TO LOAD APPLICATION  */
		_common.openSidebarOption(ModuleSearch.searchby).search_fromSidebar(ModuleSearch.Quickstart, ModuleSearch.Projectsearch);
		_common.openSidebarOption(standerdInputs.Search);
	});

	it('TC - Create new estimate record', function () {
		const estimateInputs = this.data.EstimateHeader.EstimateHeaderInputs;
		const estimateGrid = this.data.columns.column_headers;
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, estimateInputs.description, estimateInputs.rubric, estimateInputs.estimateType);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
	});

	it('TC - Generate line item wizards option', function () {
		const sidebarInputes = this.data.VerifygeneratelineItem.SidebarInputes;
		const Column_EstLineItems = this.data.Column_EstLineItems.column_LineItemsheaders;
		const leadingselectionoption = this.data.leadingstructureoption.structureInput;

		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, Column_EstLineItems);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.clicking_Estimation_Configuration_Dialog_Button(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.change_EstQtyRelation_For_Schedule(leadingselectionoption.searchType, leadingselectionoption.structureType);
		cy.wait(1000);
		_common.openSidebarOption(sidebarInputes.wizard1);
		_common.search_fromSidebar(sidebarInputes.wizard2, sidebarInputes.GenerateLineItem);
		_boqPage.generate_LineItemBycode(sidebarInputes.Controllingunit);
		cy.wait(3000).then(() => {
			//** Immediate save with wait   */
			cy.SAVE();
		});
	});

	it('TC -Assign resource to line item', function () {
		const resourceInputs = this.data.AssignResources.resourceInputs;
		const Column_EstResLineItems = this.data.Column_ResLineItems.Column_ResItems;
		_common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 4);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, Column_EstResLineItems);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
		cy.wait(4000); //** NEED TIME TO LOAD APPLICATION  */
		cy.SAVE();
		cy.wait(4000); //** NEED TIME TO LOAD APPLICATION  */
	});

	it('TC - Create new sales bid', function () {
		const bidInputs = this.data.BidCreation.bidInputs;
		const BoqstruGridinput = this.data.columns_Boqstructure.column_Boqstructure;
		const sidebarInputes = this.data.VerifygeneratelineItem.SidebarInputes;
		_common.openSidebarOption(sidebarInputes.wizard1);
		_common.search_fromSidebar(sidebarInputes.wizard2, sidebarInputes.CreateBid);
		_estimatePage.enterRecord_toCreate_BID_from_Wizard(bidInputs.description, bidInputs.businessPartner);
		_estimatePage.structureSetting_inControllingUnit(bidInputs.sourceLead);
		_common.clickOn_modalFooterButton(btn.buttonText.GoTOBid);
		cy.wait(2000);
		_common.openTab(app.TabBar.BID).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS);
		});
		_common.clear_subContainerFilter(cnt.uuid.BIDS);
		_common.openTab(app.tabBar.bidBoQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BIDBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 3);
			_common.setup_gridLayout(cnt.uuid.BIDBOQSTRUCTURE, BoqstruGridinput);
		});
		_bidPage.verifyBidQuantity_inBoQStructure(bidInputs.quantity);
		_bidPage.changeStatus_BidRecord();
	});

	it('TC - Create Sales Contract using Wizard option', function () {
		const contractstruGridinput = this.data.columns_Bidboqstructure.column_Boqstructure;
		const contractInputs = this.data.ContractCreation.contractInput;
		const sidebarInputes = this.data.VerifygeneratelineItem.SidebarInputes;
		_common.openSidebarOption(sidebarInputes.wizard1);
		_common.search_fromSidebar(sidebarInputes.wizard2, sidebarInputes.CreateContract);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT);
		cy.wait(3000); //** NEED TIME TO LOAD APPLICATION  */
		_common.openTab(app.TabBar.CONTRACTS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 1);
		});
		_common.openTab(app.tabBar.contractBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.contractSales_BoQs, app.FooterTab.BOQ_STRUCTURE, 1);
		});
		_common.openTab(app.tabBar.contractBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 1);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, contractstruGridinput);
		});
		_saleContractPage.verifyContractQuantity_inBoQStructure(contractInputs.quantity, contractInputs.finalPrice);
	});

	it('TC - Navigate back to estimate and GenerateBudget with UpdateControllingBudge', function () {
		const sidebarInputes = this.data.VerifygeneratelineItem.SidebarInputes;
		const ModuleSearch = this.data.ModuleSearch.SearchInputs;
		cy.wait(1000);
		_common.openSidebarOption(ModuleSearch.searchby).search_fromSidebar(ModuleSearch.Quickstart, sidebarInputes.Estimatesearch);
		cy.wait(2000);
		_common.openSidebarOption(sidebarInputes.wizard1);
		_common.search_fromSidebar(sidebarInputes.wizard2, sidebarInputes.GenerateBudgetfromDJC);
		cy.wait(1000);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		cy.wait(1000);
		_common.openSidebarOption(sidebarInputes.wizard1);
		_common.search_fromSidebar(sidebarInputes.wizard2, sidebarInputes.UpdateControllingBudget);
		cy.wait(1000);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
	});

	it('TC - verify estimate cost total with UpdateControllingBudge ', function () {
		const ModuleSearch = this.data.ModuleSearch.SearchInputs;
		const standerdInputs = this.data.Prerequisites.SidebarInputs;
		const sidebarInputes = this.data.VerifygeneratelineItem.SidebarInputes;
		const controllingunit = this.data.Controllingunit_columns.Controllingunit_headers;
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, COUNTUNIT);
		_common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL);
		_common.openSidebarOption(ModuleSearch.searchby).search_fromSidebar(ModuleSearch.Quickstart, ModuleSearch.Controllingunit);
		_common.openSidebarOption(standerdInputs.Search);
		_common.search_fromSidebar(standerdInputs.searchType, standerdInputs.ProjectName);
		cy.wait(2000); //** NEED TIME TO LOAD APPLICATION  */
		_common.openTab(app.tabBar.controllingStructure).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, controllingunit);
		});
		_common.search_inSubContainer(cnt.uuid.CONTROLLING_UNIT, COUNTUNIT);
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.BUDGET, sidebarInputes.Verifytotal);
	});
});
