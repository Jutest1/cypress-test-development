import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt } from 'cypress/locators';
const allure = Cypress.Allure.reporter.getInterface();

const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const BOQ_STRCU_DESC2 = 'BOQ-STRC-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.24 | Update only AQ quantities of BOQ item from respective line item quantities');

describe('EST- 1.24 | Update only AQ quantities of BOQ item from respective line item quantities', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-1.24-update-only-AQ-quantities-of-BOQ-item-from-respective-line-item-quantities.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('estimate/est-1.24-update-only-AQ-quantities-of-BOQ-item-from-respective-line-item-quantities.json').then((data) => {
			this.data = data;
			const standardInputs = this.data.Prerequisites.SidebarInputs;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption('Search').delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create new BoQ header and BoQ structure', function () {
		const boqPageColumns = this.data.CreateNewBoQStructure.ColumnHeaders;
		const boQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
		_common.openTab(app.tabBar.BoQs).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
		cy.SAVE();
		_boqPage.textOfBoQCode();
		_common.clickOn_toolbarButton(cnt.uuid.BOQS);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqPageColumns);
		});
		_boqPage.enterRecord_toCreateBoQStructure(BOQ_STRCU_DESC2, boQStructureInputs.quantity, boQStructureInputs.unitRate, boQStructureInputs.uom);
	});

	it('TC - Create new estimate', function () {
		const EstimateInputs = this.data.EstimatePageInputs.CreateEstimate;
		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const requireColumns = this.data.EstimatePageInputs.ColumnHeaders;
		_common.openSidebarOption(standardInputs.searchby).search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, requireColumns);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, EstimateInputs.rubicCategory, EstimateInputs.estimateType);
		_estimatePage.textOfEstimateCode();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
	});

	it('TC - generate line item from BoQ by wizard and update line item', function () {
		const requireColumns = this.data.GenrateLineItemFromBoQ.Column_Headers;
		const LineItemInputs = this.data.GenrateLineItemFromBoQ.EditLineItem;
		const LineItemSidebar = this.data.GenrateLineItemFromBoQ.sidebarInputs;
		const UpdateEstimate = this.data.GenrateLineItemFromBoQ.updateEstimate;

		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, requireColumns);
		});
		_common.openSidebarOption(LineItemSidebar.searchBy).search_fromSidebar(LineItemSidebar.Wizard, LineItemSidebar.genarateLineItems);
		_boqPage.generate_LineItemBySendingInputValue();

		_estimatePage.edit_GenratedLineItem(LineItemInputs.boqRelation, null, LineItemInputs.aqQuantity, null);
		_common.openSidebarOption(LineItemSidebar.searchBy).search_fromSidebar(LineItemSidebar.Wizard, LineItemSidebar.UpdateEstimate);
		_estimatePage.updateEstimateFromProjectmodified(UpdateEstimate.checkboxLabelName);
	});

	it('TC - Verify updated AQquantity of BoQ structure', function () {
		const boqPageColumns = this.data.CreateNewBoQStructure.ColumnHeaders;
		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const verifyBoQStructureValue = this.data.GenrateLineItemFromBoQ.EditLineItem;

		cy.REFRESH_CONTAINER();
		_common.openSidebarOption(standardInputs.searchby).search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);
		cy.wait(2000);
		_common.openSidebarOption('Search').delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();

		_common.openTab(app.tabBar.BoQs).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_boqPage.selectBoQ(cnt.uuid.BOQS);
		_common.clickOn_toolbarButton(cnt.uuid.BOQS);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqPageColumns);
		});
		_boqPage.verifyUpdated_quantityOfBoQ(null, verifyBoQStructureValue.aqQuantity);
	});
});
