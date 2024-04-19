import { _common, _estimatePage, _package, _mainView, _modalView, _sidebar, _rfqPage, _saleContractPage, _materialPage, _procurementContractPage, _validate } from 'cypress/pages';
import { app, tile, cnt, btn, sidebar, commonLocators } from 'cypress/locators';
import _ from 'cypress/types/lodash';
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const CODE = 'FRAME_CODE-' + Cypress._.random(0, 999);
const Frame_DESC = 'Frame_DESC-' + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);

let CONTRACT_PARAMETERS: DataCells;
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
let CONTAINERS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_ITEMS_CONTRACT;
let CONTAINERS_ITEMS_CONTRACT;
let CONTAINER_COLUMNS_MATERIAL_CATALOGS;
var packageCode: string;
var ContractCode: string;
var quantity: string;
let FRAMEWORK_MATERIAL_CATALOG;


allure.epic('PROCUREMENT AND BPM');
allure.feature('Contract');
allure.story('PCM- 2.106 | Generating a framework contract/agreement in contact');

describe('PCM- 2.106 | Generating a framework contract/agreement in contact', () => {
	before(function () {
		cy.fixture('pcm/pcm-2.106-generating-a-framework-contract-in-contact.json').then((data) => {
			this.data = data;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			PACKAGE = this.data.CONTAINERS.PACKAGE
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
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
			}
			CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
			CONTRACT_PARAMETERS = {
				[app.GridCells.BUSINESS_PARTNER_FK_SMALL]: CONTAINERS_CONTRACT.BUSINESS_PARTNER,
				[app.GridCells.PROJECT_FK]: Cypress.env('PROJECT_NUMBER'),
			}
			CONTAINERS_ITEMS_CONTRACT = this.data.CONTAINERS.ITEMS_CONTRACT
			CONTAINER_COLUMNS_ITEMS_CONTRACT = this.data.CONTAINER_COLUMNS.ITEMS_CONTRACT
			FRAMEWORK_MATERIAL_CATALOG = this.data.MODAL.FRAMEWORK_MATERIAL_CATALOG
			CONTAINER_COLUMNS_MATERIAL_CATALOGS = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
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

	/*   after(() => {
		cy.LOGOUT();
	}); */

	it('TC - Create New Estimate Record', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_REC_NEW);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
	});

	it('TC- Create new Line item record', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS, btn.ToolBar.ICO_REC_NEW);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		cy.SAVE();
	});

	it('TC- Assign material resource to line item', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_REC_NEW);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.RESOURCES);
		_common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL).then(($value) => {
			quantity = $value.text();
			cy.log(quantity);
		});
	});

	it('TC- Verify Create/update material Package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_estimatePage.enterRecord_toCreatePackage_wizard(PACKAGE.MATERIAL_AND_COSTCODE);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE);
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.clear_searchInSidebar()
		_common.getText_fromCell(cnt.uuid.PACKAGE, app.GridCells.CODE).then(($value) => {
			packageCode = $value.text();
			cy.log(packageCode);
		});
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEMS_CONTRACT);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, PACKAGE.VALUE);
		_common.maximizeContainer(cnt.uuid.PACKAGEITEMS);
		_common.minimizeContainer(cnt.uuid.PACKAGEITEMS);
		cy.wait(1000);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC- Create Contract from Package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		cy.wait(2000) //required wait to load page
		_saleContractPage.enterRecord_createNewContract_fromRequisition(CONTAINERS_CONTRACT.BUSINESS_PARTNER)
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
	});

	it('TC- Verify add new item in contract', function () {
		_common.openTab(app.TabBar.CONTRACT).then(function () {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
		cy.SAVE();
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($value) => {
			ContractCode = $value.text();
			cy.log(ContractCode);
		});
		_common.openTab(app.TabBar.CONTRACT).then(function () {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEMS_CONTRACT);
		});
		_common.maximizeContainer(cnt.uuid.ITEMSCONTRACT);
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_common.waitForLoaderToDisappear()
		_common.edit_containerCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS_CONTRACT.QUANTITY)
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS_CONTRACT.MATERIAL_NO)
		cy.wait(1000);
		_common.select_activeRowInContainer(cnt.uuid.ITEMSCONTRACT)
		_common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ITEMS_CONTRACT.UOM)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC- Verify Create/Update Framework Material Catalog wizard option', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.ACCEPTION);
		_materialPage.createUpdate_frameworkMaterialCatelog_fromWizard(FRAMEWORK_MATERIAL_CATALOG.NEW_CATALOG, CODE, Frame_DESC, FRAMEWORK_MATERIAL_CATALOG.TYPE, FRAMEWORK_MATERIAL_CATALOG.RUBRIC_CATEGORY, FRAMEWORK_MATERIAL_CATALOG.VALID_TO, FRAMEWORK_MATERIAL_CATALOG.VALID_FORM);
		cy.wait(1000);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MATERIAL_CATALOG).then(function () {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIAL_CATALOGS, 0);
			_common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS);
		});
		cy.REFRESH_CONTAINER();
		_common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, CODE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CON_HEADER_FK, ContractCode);
		_common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.MATERIAL_CATALOG_TYPE_FK, FRAMEWORK_MATERIAL_CATALOG.TYPE);
	});

	it('TC- Verify materials in Material module', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
		cy.wait(2000)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIAL_CATALOG_FILTER, 0);

			_common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, CODE);
			_common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK);
			cy.wait(1000);
			_common.openTab(app.TabBar.RECORDS).then(() => {
				_common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
			});
			_common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, CONTAINERS_RESOURCE.CODE);
			cy.wait(1000)
			_common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CODE, CONTAINERS_RESOURCE.CODE);
			_common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
			_common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS,CODE);
			cy.wait(1000);
			_common.assert_cellDataByContent_inContainer(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CODE, CODE);
		});
	});

	it('TC- Verify Framework contract in Contract', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
		_common.openTab(app.TabBar.CONTRACT).then(function () {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT,CONTAINER_COLUMNS_CONTRACT)
		});
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, ContractCode);
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.MATERIAL_CATALOG_FK, CODE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PURCHASE_ORDERS, CONTAINERS_CONTRACT.PURCHASE_ORDERS);
		_validate.verify_activeRowsCellCheckboxValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK);
	});
});
