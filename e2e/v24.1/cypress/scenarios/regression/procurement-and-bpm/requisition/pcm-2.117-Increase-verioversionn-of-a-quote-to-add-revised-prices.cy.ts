import { tile, app, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _rfqPage, _procurementPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

import { PACKAGE_TOTAL_TRANSLATION } from 'cypress/pages/variables';
const allure = Cypress.Allure.reporter.getInterface();
let REQUISITION_PARAMETERS: DataCells;
let REQUISITION_ITEM_PARAMETER: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINERS_REQUISITION_ITEMS;
let CONTAINER_COLUMNS_REQUISITION_ITEMS;
let CONTAINERS_REQUISITION_TOTALS;
let CONTAINER_COLUMNS_REQUISITION_TOTALS;
let CONTAINER_COLUMNS_QUOTES;
let CONTAINER_COLUMNS_BIDDERS;
let CONTAINER_COLUMNS_QUOTES_ITEMS;
let MODAL_VERSION
let CONTAINERS_QUOTES_ITEMS;
allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.117 | Increase version of a quote, to add revised prices');

describe('PCM- 2.117 | Increase version of a quote, to add revised prices', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.117-Increase-verioversionn-of-a-quote-to-add-revised-prices.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('pcm/pcm-2.117-Increase-verioversionn-of-a-quote-to-add-revised-prices.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
			CONTAINER_COLUMNS_REQUISITION_ITEMS = this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
			CONTAINERS_REQUISITION_ITEMS = this.data.CONTAINERS.REQUISITION_ITEMS;
			CONTAINER_COLUMNS_REQUISITION_TOTALS = this.data.CONTAINER_COLUMNS.REQUISITION_TOTALS
			CONTAINERS_REQUISITION_TOTALS = this.data.CONTAINERS.REQUISITION_TOTALS;
			REQUISITION_PARAMETERS = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
			}
			REQUISITION_ITEM_PARAMETER = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE,
				[app.GridCells.QUANTITY]: CONTAINERS_REQUISITION_ITEMS.QUANTITY,
			};
			CONTAINER_COLUMNS_BIDDERS = this.data.CONTAINER_COLUMNS.BIDDERS
			CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
			CONTAINER_COLUMNS_QUOTES_ITEMS = this.data.CONTAINER_COLUMNS.QUOTES_ITEMS

			CONTAINERS_QUOTES_ITEMS = this.data.CONTAINERS.QUOTES_ITEMS;
			MODAL_VERSION = this.data.CONTAINERS.MODAL_VERSION;


		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Verify creation requisition record and assign business partner', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		cy.wait(1000);//required waits
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000);//required waits
		_common.maximizeContainer(cnt.uuid.REQUISITIONS)
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK)
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.BUSINESS_PARTNER_NAME)
		cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
		_common.minimizeContainer(cnt.uuid.REQUISITIONS)
	});

	it('TC - Verify creation requisition items record and add material', function () {
		cy.wait(1000);//required waits
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONITEMS);

		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.REQUISITIONITEMS);

		cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS);
		});
		_common.select_rowHasValue(cnt.uuid.REQUISITION_TOTALS, "Total");
		cy.wait(500);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET, "NET_VALUE");
	});

	it('TC - Change requisition status and create request for quote', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
		cy.SAVE();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
		_common.waitForLoaderToDisappear()
		cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
		_rfqPage.createRFQInRequisitionFromWizard(CONTAINERS_REQUISITION.BUSINESS_PARTNER_NAME);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 0);
			_common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDERS);
		});
		_common.select_rowInContainer(cnt.uuid.BIDDERS)
		_common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BUSINESS_PARTNER_NAME);
		cy.wait(1000);//required waits;
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTALS, 0);
			_common.setup_gridLayout(cnt.uuid.RFQ_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS);
		});
		_common.assert_cellData_insideActiveRow(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET, Cypress.env('NET_VALUE'));
	});

	it('TC - Create Quote from RfQ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);

		_rfqPage.fromWizard_CreateQuoteAndverifyBPSearch([CONTAINERS_REQUISITION.BUSINESS_PARTNER_NAME]);
		_modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE);
		_common.waitForLoaderToDisappear()
	});
	it('TC - Verify Quote and Increased Version Of Quote', function () {
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.BIDDERS, 0);
			_common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES);
		});
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, MODAL_VERSION.VERSION_1);
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BUSINESS_PARTNER_NAME);

		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTES_ITEMS);
		});
		_common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE);
		_common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTES_ITEMS.PRICE_1);
		cy.SAVE();
		cy.REFRESH_SELECTED_ENTITIES();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.INCREASE_QUOTE_VERSION);
		cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BUSINESS_PARTNER_NAME);
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.QUOTE_VERSION, MODAL_VERSION.VERSION_2);
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 0);
		});
		_common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.MDC_MATERIAL_FK, CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.QUANTITY_SMALL, CONTAINERS_REQUISITION_ITEMS.QUANTITY);
		_common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTES_ITEMS.PRICE_2);
		cy.SAVE();
		cy.REFRESH_SELECTED_ENTITIES();
		cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
		cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithCaret(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRC_PRICE_CONDITION_FK, commonLocators.CommonKeys.LIST, CONTAINERS_QUOTES_ITEMS.PRICE_CONDITION);
		cy.SAVE();
		cy.wait(1000)//required waits
      _common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
		_validate.assert_cellData_not_equal(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, CONTAINERS_QUOTES_ITEMS.PRICE_1);
	});
});
