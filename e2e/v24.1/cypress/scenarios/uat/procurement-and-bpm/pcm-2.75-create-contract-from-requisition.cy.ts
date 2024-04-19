import { tile, app, cnt, generic, btn } from 'cypress/locators';
import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _rfqPage, _procurementPage } from 'cypress/pages';

import { PACKAGE_TOTAL_TRANSLATION } from 'cypress/pages/variables';
const allure = Cypress.Allure.reporter.getInterface();
var InvoiceCOde = 'InvoiceCOde';
var NetValue = 'NetValue';
var requisitionName = 'requisitionName';
var requisitionID = 'requisitionID';
var ItemUoM = 'ItemUoM';
var ItemTotal = 'ItemTotal';
var ItemPrice = 'ItemPrice';

allure.epic('PROCUREMENT AND BPM');
allure.feature('Contract');
allure.story('PCM-2.75 | Create contract from requisition');

describe('PCM-2.75 | Create contract from requisition', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.75-create-contract-from-requisition.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('pcm/pcm-2.75-create-contract-from-requisition.json').then((data) => {
			this.data = data;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			const standerdInputs = this.data.Prerequisites.SidebarInputs;
			/* Open desktop should be called in before block */
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.tabBar.project).then(() => {
				_common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS);
			});

			_common.openSidebarOption(standerdInputs.search).delete_pinnedItem();
			_common.search_fromSidebar(standerdInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	after(() => {
		cy.LOGOUT();
	});
	it('TC - Verify creation requisition record', function () {
		const sideBarAction = this.data.sidebarInputs.sidebar;
		const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers;
		const createRequisitionInputs = this.data.requisitionPage.createRequisition;
		const requsitionParamter: DataCells = {
			[commonLocators.CommonLabels.CONFIGURATION]: createRequisitionInputs.configuration,
		};
		_common.openSidebarOption(sideBarAction.quickStart);
		_common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.requisition);
		cy.wait(1000);
		_common.setDefaultView(app.tabBar.Main);
		_common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);

			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		//_package.enterData_ToCreateRequisition(createRequisitionInputs.configuration)
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, requsitionParamter);

		cy.SAVE();
		cy.wait(3000);
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, 'grid', app.InputFields.INPUT_GROUP_CONTENT, 'Material');
		cy.wait(2000);
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, 'Service Material');
		cy.SAVE();
		cy.wait(1000);
		_common.minimizeContainer(cnt.uuid.REQUISITIONS);
	});

	it('TC - Verify creation requisition items record and add material', function () {
		const requisitionItemsGrid = this.data.requisition_ColumnHeaders.Items_ColumnHeaders;
		const requisitionTotalsGrid = this.data.requisition_ColumnHeaders.Totals_ColumnHeaders;
		const createRequisitionItemInputs = this.data.requisitionPage.createRequisitionItem;
		const createRequisitionInputs = this.data.requisitionPage.createRequisition;
		const REQUISTION_ITEM_PARAMETER: DataCells = {
			[app.GridCells.MDC_MATERIAL_FK]: createRequisitionItemInputs.materialCode,
			[app.GridCells.QUANTITY_SMALL]: createRequisitionItemInputs.quantity,
		};
		cy.wait(1000);
		_common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, requisitionItemsGrid);
		});
		_validate.set_ColumnAtTop([requisitionItemsGrid.price, requisitionItemsGrid.total, requisitionItemsGrid.quantity, requisitionItemsGrid.mdcmaterialfk, requisitionItemsGrid.basuomfk], cnt.uuid.REQUISITIONITEMS);
		_common.maximizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISTION_ITEM_PARAMETER);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(1000);
		_common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRICE_SMALL, ItemPrice);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.BAS_UOM_FK, ItemUoM);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.TOTAL, ItemTotal);
		_common.minimizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.Requisition_Totals, app.FooterTab.TOTALS, 0);
			_common.setup_gridLayout(cnt.uuid.Requisition_Totals, requisitionTotalsGrid);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.Requisition_Totals, app.GridCells.TRANSLATED, createRequisitionInputs.total, PACKAGE_TOTAL_TRANSLATION);
		cy.wait(500);
		_common.getTextfromCell(cnt.uuid.Requisition_Totals, app.GridCells.VALUE_NET);
		_common.saveCellDataToEnv(cnt.uuid.Requisition_Totals, app.GridCells.VALUE_NET, NetValue);
	});

	it('TC - Verify Change requisition status', function () {
		const sideBarAction = this.data.sidebarInputs.sidebar;
		_common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.openSidebarOption(sideBarAction.wizard);
		_common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.requisitionOption);
		_common.changeStatus_fromModal(sideBarAction.requisitionStatus);
		cy.wait(2000);
		cy.SAVE();
		cy.REFRESH_SELECTED_ENTITIES();
		_common.selectCellInSubContainer(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS, sideBarAction.requisitionStatus);
	});

	it('TC - Create Contract from requisition wizard', function () {
		const sideBarAction = this.data.sidebarInputs.sidebar;
		const Column_Contract = this.data.columns.Column_Contract;
		const createRequisitionInputs = this.data.requisitionPage.createRequisition;
		_common.openSidebarOption(sideBarAction.wizard);
		_common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.createcontract);
		cy.wait(2000);
		_validate.verify_isButtonDisabled(btn.ButtonText.NEXT);
		cy.wait(500);
		_package.create_ContractfromPackage(createRequisitionInputs.bpValue);
		cy.wait(4000);
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
			_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, Column_Contract);
		});
		cy.wait(2000);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.REQ_HEADER_FK, requisitionID);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DESCRIPTION, requisitionName);
	});

	it('TC - verify create contract relate fields inherit from requisition', function () {
		const contractitemGrid = this.data.requisition_ColumnHeaders.Items_ColumnHeaders;
		const Column_Contract = this.data.columns.Column_Contract;
		const createRequisitionItemInputs = this.data.requisitionPage.createRequisitionItem;
		const createRequisitionInputs = this.data.requisitionPage.createRequisition;
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, Column_Contract);
		});
		cy.REFRESH_SELECTED_ENTITIES();
		_validate.set_ColumnAtTop([Column_Contract.reqheaderfk, Column_Contract.businesspartnerfk, Column_Contract.description], cnt.uuid.PROCUREMENTCONTRACT);
		cy.REFRESH_SELECTED_ENTITIES();
		_common.selectCellInSubContainer(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(2000);
		_common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(requisitionID));
		cy.wait(2000);
		cy.REFRESH_CONTAINER()
		cy.wait(2000);
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK, createRequisitionInputs.bpValue);
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, contractitemGrid);
		});
		_validate.set_ColumnAtTop([contractitemGrid.price, contractitemGrid.total, contractitemGrid.quantity, contractitemGrid.mdcmaterialfk, contractitemGrid.basuomfk], cnt.uuid.ITEMSCONTRACT);
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT);
		cy.REFRESH_SELECTED_ENTITIES();
		cy.wait(1000);
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, createRequisitionItemInputs.materialCode);
		cy.wait(1000);
		cy.REFRESH_SELECTED_ENTITIES();
		cy.wait(1000);
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT);
		cy.wait(1000);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, createRequisitionItemInputs.quantity);
		cy.SAVE();
		_common.assert_cellData_by_contain(cnt.uuid.ITEMSCONTRACT, app.GridCells.QUANTITY_SMALL, createRequisitionItemInputs.quantity);
		_common.assert_cellData_by_contain(cnt.uuid.ITEMSCONTRACT, app.GridCells.BAS_UOM_FK, Cypress.env(ItemUoM));
		_common.assert_cellData_by_contain(cnt.uuid.ITEMSCONTRACT, app.GridCells.TOTAL, Cypress.env(ItemTotal));
		_common.assert_cellData_by_contain(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_SMALL, Cypress.env(ItemPrice));
	});

	it('TC - verify calculations', function () {
		const requisitionTotalsGrid = this.data.requisition_ColumnHeaders.Totals_ColumnHeaders;
		const createRequisitionInputs = this.data.requisitionPage.createRequisition;
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTRACT_TOTALS, app.FooterTab.TOTALS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTRACT_TOTALS, requisitionTotalsGrid);
		});
		cy.REFRESH_SELECTED_ENTITIES();
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONTRACT_TOTALS, app.GridCells.TRANSLATED, createRequisitionInputs.total, PACKAGE_TOTAL_TRANSLATION);
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_TOTALS, app.GridCells.VALUE_NET, Cypress.env(NetValue));
	});
	it('TC - verify Requisition Attributes', function () {
		const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers;
		const sideBarAction = this.data.sidebarInputs.sidebar;
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 2);
		});
		cy.REFRESH_SELECTED_ENTITIES();
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.PROCUREMENTCONTRACT, 'Requisition(1)');
		_common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 2);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid);
		});
		_validate.set_ColumnAtTop([requisitionGrid.description, requisitionGrid.code], cnt.uuid.REQUISITIONS);
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS, sideBarAction.requisitionStatusOrdered);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS, sideBarAction.requisitionStatusOrdered);
		cy.wait(3000);
		_common.selectCellInSubContainer(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(requisitionID));
		_common.selectCellInSubContainer(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, Cypress.env(requisitionName));
	});
});
