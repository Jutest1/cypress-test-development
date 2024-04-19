import { tile, app, cnt, commonLocators, sidebar, btn } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _modalView, _rfqPage, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
var QuoteCOde = 'QuoteCOde';
var SuplierNo = 'SuplierNo';
var packageNo = 'packageNo';
var CONTRACT_BRANCH = 'CONTRACT_BRANCH';
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let PACKAGE;
let QUOTE;
let CONTAINER_COLUMNS_QUOTES
let CONTAINER_COLUMNS_QUOTES_ITEM
let CONTAINER_COLUMNS_CONTRACT
let CONTRACT_PARAMETERS : DataCells;
let REQUEST_FOR_QUOTE_PARAMETERS:DataCells;
allure.epic('PROCUREMENT AND BPM');
allure.feature('Contract');
allure.story('PCM- 2.122 | Create contract for selected supplier (Price Comparison-Material)');
describe('PCM- 2.122 | Create contract for selected supplier (Price Comparison-Material)', () => {

	before(function () {
		cy.fixture('procurement-and-bpm/pcm-2.122-Create-contract-for-selected-supplier.json').then((data) => {
			this.data = data;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			PACKAGE = this.data.CONTAINERS.PACKAGE
			QUOTE = this.data.CONTAINERS.QUOTE
			CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
			CONTAINER_COLUMNS_QUOTES_ITEM = this.data.CONTAINER_COLUMNS.QUOTES_ITEM
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			};
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
			};
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCE.SHORTKEY,
				[app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE,
				[app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY
			}
			CONTRACT_PARAMETERS = {
				[app.GridCells.BUSINESS_PARTNER_FK_SMALL]: QUOTE.BUSINESS_PARTNER_2,
				[app.GridCells.PROJECT_FK]: Cypress.env('PROJECT_NUMBER'),
			}
			REQUEST_FOR_QUOTE_PARAMETERS = {
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: [QUOTE.BUSINESS_PARTNER_1,QUOTE.BUSINESS_PARTNER_2],
			}
		});
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create new Estimate header and line item record', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_REC_NEW);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS, btn.ToolBar.ICO_REC_NEW);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
		cy.SAVE();
	});

	it('TC - Add Resource for selected line item', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_REC_NEW);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
	});

	it('TC - Create Material Package from Estimate', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_estimatePage.enterRecord_toCreatePackage_wizard(PACKAGE.MATERIAL_AND_COSTCODE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Requisition from Package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create RfQ from Requisition', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
		_rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Quote for multiple suppliers from RfQ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
		_rfqPage.create_quote_fromWizard([QUOTE.BUSINESS_PARTNER_1, QUOTE.BUSINESS_PARTNER_2], ['check', 'check']);
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_QUOTE)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it("TC - Quote the Prices for the supliers in Quote's items Container", function () {
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 2);
			_common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_2);
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.PACKAGEITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTES_ITEM);
		});
		_common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
		_common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT,QUOTE.PRICE_1);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 2);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_1);
		_common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS);
		_common.edit_containerCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, QUOTE.PRICE_2);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Change Status Of Quote', function () {
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 2);
		});
		_common.select_allContainerData(cnt.uuid.QUOTES);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_2);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_1);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED);
	});

	it('TC - verify price comparision and goto contract', function () {
		_common.maximizeContainer(cnt.uuid.QUOTES);
		_common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, 'Price Comparison(1)');
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PRICE_COMPARISON_V1, app.FooterTab.PRICE_COMPARISON_ITEM, 2);
		});
		_common.maximizeContainer(cnt.uuid.PRICE_COMPARISON_V1);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_saleContractPage.create_contractInPriceComparison_fromWizard(CONTRACT_PARAMETERS);
		_common.waitForLoaderToDisappear()
	});

	it('TC - verify Contract Attributes', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE_QUOTATION, QuoteCOde);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PACKAGE_FK, packageNo);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.SUPPLIER_FK, SuplierNo);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.SUBSIDIARY_FK, CONTRACT_BRANCH);
	});

	it('TC - verify Quotation Attributes', function () {
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.clickOn_goToButton_toSelectModule(cnt.uuid.PROCUREMENTCONTRACT, 'Quote(1)');
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 2);
			_common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES);
		});
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasUniqueValue(cnt.uuid.QUOTES, app.GridCells.CODE, Cypress.env(QuoteCOde));
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.SUPPLIER_FK, Cypress.env(SuplierNo));
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.PACKAGE_NUMBER, Cypress.env(packageNo));
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.SUBSIDIARY_FK, Cypress.env(CONTRACT_BRANCH));
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.BUSINESS_PARTNER_FK, QUOTE.BUSINESS_PARTNER_1);
		_common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES, app.GridCells.CODE, Cypress.env(QuoteCOde));
	});
});
