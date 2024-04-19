import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt } from "cypress/locators";
import { EST_HEADER } from 'cypress/pages/variables';

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESC = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.52 | Copy as a reference line item');

describe('EST- 1.52 | Copy as a reference line item', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-1.52-copy-as-a-reference-line-item.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('estimate/est-1.52-copy-as-a-reference-line-item.json').then((data) => {
			this.data = data;
			const standerdInputs = this.data.Prerequisites.SidebarInputs;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption('Search').delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	it('TC - Create new Estimate header', function () {
		const estimateInputs = this.data.Prerequisites.CreateEstimate;
		const estheadergrid = this.data.Column.estheader_Column;
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, estheadergrid);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubicCategory, estimateInputs.estimateType);
		_estimatePage.textOfEstimateCode();
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
	});

	it('TC - Create New Line Item Record', function () {
		const lineItemInput = this.data.Prerequisites.CreateNewLineItem;
		const estligrid = this.data.Column.estli_Column;
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, estligrid);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC, lineItemInput.quantity, lineItemInput.uom, null,null);
		cy.SAVE();
		cy.wait(4000);
		_common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CODE);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
	});

	it('TC - Create New Record In Resource For Cost Code', function () {
		const CostcodeInput = this.data.Prerequisites.CreateNewResource;
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(CostcodeInput.ShortKey, CostcodeInput.Code, CostcodeInput.Quantity);
		cy.SAVE();
		cy.wait(5000);
	}); 

	it('TC - Copy as a Reference Line Item ', function () {
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.copyReferenceLineItem(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		cy.SAVE();
		cy.wait(2000);
	});

	it('TC - Update quantity of resource ', function () {
		const CostcodeInput = this.data.Prerequisites.CreateNewResource;

		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CODE, Cypress.env('Text'));
		_common.select_rowInContainer(cnt.uuid.RESOURCES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, CostcodeInput.Quantity);
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, '200');
		cy.SAVE();
		cy.wait(5000);
	});
	it('TC - Verify Cost Total ', function () {
		_estimatePage.verify_referenceLineItem_with_baseLineItem(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL);
	});
});
