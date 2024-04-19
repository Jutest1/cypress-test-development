import { tile, app, cnt, sidebar, commonLocators } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _common, _estimatePage, _projectPage, _procurementContractPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from 'cypress/pages';

const allure = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_CONTRACT

allure.epic('PROCUREMENT AND BPM');
allure.feature('Contract');
allure.story('PCM- 2.95 | Change status for item in contract');

describe('PCM- 2.95 | Change status for item in contract', () => {
	before(function () {

		cy.fixture('pcm/pcm-2.95-change_status_for_item_in_contract.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_CONTRACT = this.data.CONTAINERS.CONTRACT
		});
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar("standard", Cypress.env("PROJECT_NUMBER")).pinnedItem();
	});

	// after(() => {
	// 	cy.LOGOUT();
	// });

	it('TC - Verify creation contract record ,contract item record and change contract item status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
		_materialPage.enterRecord_toCreateContract(CONTAINER_CONTRACT.BUSINESS_PARTNER)		
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.STRUCTURE_CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CONTRACT.STRUCTURE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT);
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CONTRACT.UOM);
		cy.SAVE();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS_FOR_ITEM);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.DELIVERED)
        _common.waitForLoaderToDisappear()
		cy.wait(2000)
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRC_ITEM_STATUS_FK, commonLocators.CommonKeys.DELIVERED)	
	});

	it('TC - Verify creation of multiple contract item record and change status of it', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
		});
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CONTRACT.UOM);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CONTRACT.UOM);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, commonLocators.CommonKeys.RECORDED);
		_common.select_allContainerData(cnt.uuid.ITEMSCONTRACT);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS_FOR_ITEM);
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.DELIVERED)
        _common.waitForLoaderToDisappear()
		cy.wait(2000)
		_common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRC_ITEM_STATUS_FK,commonLocators.CommonKeys.DELIVERED);
	});

	it('TC - Verify message added to history of item in contract', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0);
		});
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CONTRACT.UOM);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS_FOR_ITEM);
		_common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PROCESSED, CONTAINER_CONTRACT.REMARK)
        _common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		cy.wait(2000)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_STATUS_FOR_ITEM);
		cy.wait(2000)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.HISTORY)
		cy.wait(2000)
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasValue_fromModal(app.GridCells.NEW_STATUS, commonLocators.CommonKeys.PROCESSED)
        _common.assert_cellDataByContent_fromModal(app.GridCells.REMARK, CONTAINER_CONTRACT.REMARK)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.CLOSE)
	});
});
