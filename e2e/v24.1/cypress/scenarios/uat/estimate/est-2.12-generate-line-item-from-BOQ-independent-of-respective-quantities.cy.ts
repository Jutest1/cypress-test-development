import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();

const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const BOQ_STRCU_DESC2 = 'BOQ-STRC-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);

allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 2.12 | Generate a line item having a quantity analogous to BOQ item quantity');

describe('EST- 2.12 | Generate a line item having a quantity analogous to BOQ item quantity', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-2.12-generate-line-item-from-BOQ-independent-of-respective-quantities.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('estimate/est-2.12-generate-line-item-from-BOQ-independent-of-respective-quantities.json').then((data) => {
			this.data = data;
			const standardInputs = this.data.Prerequisites.SidebarInputs;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption('Search').delete_pinnedItem().search_fromSidebar(standardInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	it('TC - Create new BoQ header and BoQ structure', function () {
		const boqPageColumns = this.data.CreateNewBoQStructure.ColumnHeaders;
		const boQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
		_common.openTab(app.tabBar.BoQs).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
		});
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BOQS).findGrid().findTextInput(app.inputFields.filterInput).clear();
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
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES);

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
		cy.wait(2000)
	});

	it('TC - generate line item from BoQ by wizard and update line item', function () {
		const requireColumns = this.data.GenrateLineItemFromBoQ.Column_Headers;
		const LineItemSidebar = this.data.GenrateLineItemFromBoQ.sidebarInputs;
		const StructureTypeInputs = this.data.GenrateLineItemFromBoQ.structureTypeInputs;

		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, requireColumns);
		});
		_estimatePage.clicking_Estimation_Configuration_Dialog_Button(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.change_EstQtyRelation_For_Schedule(StructureTypeInputs.structureType, StructureTypeInputs.estQtyRelation);
		_common.openSidebarOption(LineItemSidebar.searchBy).search_fromSidebar(LineItemSidebar.Wizard, LineItemSidebar.genarateLineItems);
		_boqPage.generate_LineItemBySendingInputValue();
	});

	it('TC - Verify AQquantity analogous to BOQ item quantity', function () {
		const boQStructureInputs = this.data.CreateNewBoQStructure.BoQStructureInputs;
		cy.wait(2000);
		_estimatePage.verify_LineItemElement_NotEquals(app.GridCells.QUANTITY_TARGET, boQStructureInputs.quantity);
	});
});
