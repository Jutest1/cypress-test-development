import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();

const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESC = 'LINE_ITEM-DESC-' + Cypress._.random(0, 999);
const BOQ_STRCU_DESC2 = 'BOQ-STRC-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.22 | Update BOQ Quantities From Line Item');

describe('EST- 1.22 | Update BOQ Quantities From Line Item', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-1.22-update-BOQ-quantities-from-line-item.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('estimate/est-1.22-update-BOQ-quantities-from-line-item.json').then((data) => {
			this.data = data;
			const standardInputs = this.data.Prerequisites.SidebarInputs;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption('Search').delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	it('TC - Create new BoQ header and BoQ structure', function () {
		const BoQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
		const boqColumns = this.data.createNewBoQ.ColumnHeaders;
		const boqStructureColumns = this.data.CreateNewBoQStructure.ColumnHeaders;

		_common.openTab(app.tabBar.BoQs).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, boqColumns);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
		cy.SAVE();
		_boqPage.textOfBoQCode(app.GridCells.BRIEF_INFO);

		_common.clickOn_toolbarButton(cnt.uuid.BOQS);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqStructureColumns);
		});
		_boqPage.enterRecord_toCreateBoQStructure(BOQ_STRCU_DESC2, BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom);
	});

	it('TC - Create new estimate header', function () {
		const EstimateInputs = this.data.EstimatePageInputs.CreateEstimate;
		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const requireColumns = this.data.EstimatePageInputs.ColumnHeaders;
		_common.openSidebarOption(standardInputs.searchby).search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, requireColumns);
		});
		cy.REFRESH_CONTAINER()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, EstimateInputs.rubicCategory, EstimateInputs.estimateType);
		_estimatePage.textOfEstimateCode();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
	});

	it('TC - Generate line item from BOQ by wizard and update BoQ quantities from wizard', function () {
		const requireColumns = this.data.EditLineItemRecord.ColumnHeaders;
		const LineItemInputs = this.data.EditLineItemRecord.EditLineItem;
		const LineItemSidebar = this.data.EditLineItemRecord.SidebarInputs;
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, requireColumns);
		});
		_common.openSidebarOption(LineItemSidebar.Wizard).search_fromSidebar(LineItemSidebar.searchType, LineItemSidebar.genarateLineItems);
		_boqPage.generate_LineItemBySendingInputValue();
		cy.wait(1000) // This is required
		_estimatePage.edit_GenratedLineItem(LineItemInputs.boqRelation, LineItemInputs.quantity, LineItemInputs.aqQuantity, LineItemInputs.wqQuantity);
		_common.selectActiveRow_inContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		cy.wait(1000) // This is required
		cy.SAVE()
		_common.openSidebarOption(LineItemSidebar.Wizard).search_fromSidebar(LineItemSidebar.searchType, LineItemSidebar.updateEstimate);
		_estimatePage.updateEstimateFromProjectmodified(LineItemSidebar.updateFromBoQ);
		cy.wait(1000) // This is required
	});

	it('TC - Verify updated quantity of BoQ structure - to structure AQ', function () {
		const verifyBoQStructureValue = this.data.VerifyBoQStructure.verifyBoQStructureInput;
		const LineItemInputs = this.data.EditLineItemRecord.EditLineItem;

		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const boqColumns = this.data.VerifyBoQStructure.ColumnHeaders;
		cy.REFRESH_CONTAINER();
		_common.openSidebarOption(standardInputs.searchby).search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);
		_common.openTab(app.tabBar.BoQs).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.search_inSubContainer(cnt.uuid.BOQS, Cypress.env('boqOutlineSpec'));
		_common.clickOn_toolbarButton(cnt.uuid.BOQS);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqColumns);
		});
		_boqPage.verifyUpdated_quantityOfBoQ(LineItemInputs.wqQuantity, LineItemInputs.aqQuantity);
	});

	after(() => {
		cy.LOGOUT();
	});
});
