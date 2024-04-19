import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt } from 'cypress/locators';
const allure = Cypress.Allure.reporter.getInterface();

const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESC = 'LINE_ITEM-DESC-' + Cypress._.random(0, 999);
const BOQ_STRCU_DESC2 = 'BOQ-STRC-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 3.16 | Transfer quantities to BOQ relation - to structure');

describe('EST- 3.16 | Transfer quantities to BOQ relation - to structure', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-3.16-transfer-quantities-to-BOQ-test-each-relation-to-structure.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('estimate/est-3.16-transfer-quantities-to-BOQ-test-each-relation-to-structure.json').then((data) => {
			this.data = data;
			const standardInputs = this.data.Prerequisites.SidebarInputs;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption('Search').delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
		/* Open desktop should be called in before block */
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create new BoQ header and BoQ structure', function () {
		const BoQInputs = this.data.CreateNewBoq.CreateBoQ;
		const boqPageColumns = this.data.CreateNewBoQStructure.ColumnHeaders;
		const BoQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
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
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqPageColumns);
		});
		_boqPage.enterRecord_toCreateBoQStructure(BOQ_STRCU_DESC2, BoQStructureInputs.quantity, BoQStructureInputs.unitRate, BoQStructureInputs.uom);
		cy.SAVE;
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

	it('TC - Create new line item and update BoQ quantities from wizard', function () {
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		const LineItemInputs = this.data.CreateNewLineItemRecord.SidebarInputs;
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.openSidebarOption(LineItemInputs.Wizard).search_fromSidebar(LineItemInputs.Wizard1, LineItemInputs.genarateLineItems);
		_boqPage.generate_LineItemBySendingInputValue();
		_common.openSidebarOption(LineItemInputs.Wizard);
	});

	it('TC - Verify line item aq quantity with boq quantity and edit line item', function () {
		const LineItemInputs = this.data.EditLineItemRecord.EditLineItem;
		const LineItemSidebar = this.data.EditLineItemRecord.SidebarInputs;
		_estimatePage.verify_lineItemElement(app.GridCells.QUANTITY_TARGET, LineItemInputs.aqQuantity);
		_estimatePage.edit_GenratedLineItem(LineItemInputs.boqRelation, LineItemInputs.quantity, LineItemInputs.aqQuantity1);
		_common.openSidebarOption(LineItemSidebar.Wizard).search_fromSidebar(LineItemSidebar.Wizard1, LineItemSidebar.updateEstimate);
		_estimatePage.update_BoQQuantity(LineItemSidebar.updateFromBoQ);
	});

	it('TC - Verify updated aq quantity of BoQ structure', function () {
		const VerifyBoQStructureInputs = this.data.verifyBoQStructure.verifyBoQStructureInput;
		const standardInputs = this.data.Prerequisites.SidebarInputs;
		const boqColumns = this.data.verifyBoQStructure.ColumnHeaders;
		_common.openSidebarOption(standardInputs.searchby).search_fromSidebar(standardInputs.Quickstart, standardInputs.ModuleName);
		_common.openTab(app.tabBar.BoQs).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, boqColumns);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_boqPage.selectBoQ(cnt.uuid.BOQS);
		_common.clickOn_toolbarButton(cnt.uuid.BOQS);
		_estimatePage.verify_BoQaqQuantity(VerifyBoQStructureInputs.aqQuantity);
	});
});
