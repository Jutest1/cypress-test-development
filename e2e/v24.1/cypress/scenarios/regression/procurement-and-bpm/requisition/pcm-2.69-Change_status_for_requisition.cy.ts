import { tile, app, cnt, commonLocators, sidebar, btn } from 'cypress/locators';
import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';
import common from 'mocha/lib/interfaces/common';

const allure = Cypress.Allure.reporter.getInterface();
allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.69 | Change status for requisition');
let REQUISITION_PARAMETERS: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;

describe('PCM- 2.69 | Change status for requisition', () => {


	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('pcm/pcm-2.69-create-requisition.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
			REQUISITION_PARAMETERS = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
			}
		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Verify creation requisition record and change requisition status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.STRUCTRECODE);
		cy.wait(1000);
		_mainView.select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_REQUISITION.STRUCTRECODE);
		cy.wait(1000);
		cy.SAVE();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		cy.wait(1000)
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK, commonLocators.CommonKeys.APPROVED);
	});

	it('TC - Verify creation multiple requisition record and change status of multiple requisition', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});

		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		cy.SAVE();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, sidebar.SideBarOptions.DATA_RECEIVED);
		_common.select_allContainerData(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.REQ_STATUS_FK, commonLocators.CommonKeys.APPROVED);
	});

	it('TC - Verify message added to history of requisition', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED, CONTAINERS_REQUISITION.REMARK)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.waitForLoaderToDisappear()
		_modalView.findModal().acceptButton(btn.ButtonText.HISTORY);
		cy.wait(2000);
		_validate.validate_Text_In_Modal(app.GridCells.REMARK, CONTAINERS_REQUISITION.REMARK);
		_modalView.findModal().acceptButton(btn.ButtonText.CLOSE);
	});

});
