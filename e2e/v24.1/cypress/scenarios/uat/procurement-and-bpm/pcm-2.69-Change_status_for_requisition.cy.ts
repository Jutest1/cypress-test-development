import { tile, generic, app, cnt } from 'cypress/locators';
import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementPage } from 'cypress/pages';

const allure = Cypress.Allure.reporter.getInterface();
allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.69 | Change status for requisition');

describe('PCM- 2.69 | Change status for requisition', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.69-create-requisition.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('pcm/pcm-2.69-create-requisition.json').then((data) => {
			this.data = data;
			const standardInputs = this.data.Prerequisites.SidebarInputs;

			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		});
	});
  after(() => {
		cy.LOGOUT();
	});
	it('TC - Verify creation requisition record and change requisition status', function () {
		const sideBarAction = this.data.sidebarInputs.sidebar;
		const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers;
		const requisitionPageInputs = this.data.requisition_Page.requisitionInputs;
		const createRequisitionInputs = this.data.requisitionPage.createRequisition;
		const requsitionParamter: DataCells = {
			[commonLocators.CommonLabels.CONFIGURATION]: createRequisitionInputs.configuration,
		};
		_common.openSidebarOption(sideBarAction.quickStart);
		_common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.requisition);
		cy.wait(1000);
		_common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid);
		});

		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		//_package.enterData_ToCreateRequisition(createRequisitionInputs.configuration)
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, requsitionParamter);

		cy.SAVE();
		cy.wait(3000);
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, app.InputFields.INPUT_GROUP_CONTENT, requisitionPageInputs.structureCode);
		cy.wait(1000);
		_mainView.findModuleClientArea().select_popupItem('grid', requisitionPageInputs.structureCode);
		_common.selectCellInSubContainer(cnt.uuid.REQUISITIONS, app.GridCells.PROJECT_FK_PROJECT_NAME);
		cy.wait(1000);
		cy.SAVE();

		_common.openSidebarOption(sideBarAction.wizard);
		_common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.requisitionOption);
		_common.changeStatus_fromModal(sideBarAction.requisitionStatus);
		cy.wait(2000);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS, sideBarAction.requisitionStatus);
	});

	it('TC - Verify creation multiple requisition record and change status of multiple requisition', function () {
		const sideBarAction = this.data.sidebarInputs.sidebar;
		const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers;
		const createRequisitionInputs = this.data.requisitionPage.createRequisition;
		const requsitionParamter: DataCells = {
			[commonLocators.CommonLabels.CONFIGURATION]: createRequisitionInputs.configuration,
		};

		_common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid);
		});

		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		//_package.enterData_ToCreateRequisition(createRequisitionInputs.configuration)
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, requsitionParamter);

		cy.SAVE();
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		// _package.enterData_ToCreateRequisition(createRequisitionInputs.configuration)
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, requsitionParamter);

		cy.SAVE();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, 'Date Received');
		_common.select_allContainerData(cnt.uuid.REQUISITIONS);

		_common.openSidebarOption(sideBarAction.wizard);
		_common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.requisitionOption);
		_common.changeStatus_ofMultipleRecord_inWizard(sideBarAction.requisitionStatus);
		cy.wait(2000);
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.gridCells.REQUISITION_STATUS, sideBarAction.requisitionStatus);
	});

	it('TC - Verify message added to history of requisition', function () {
		const sideBarAction = this.data.sidebarInputs.sidebar;
		const requisitionGrid = this.data.requisition_ColumnHeaders.column_headers;
		const createRequisitionInputs = this.data.requisitionPage.createRequisition;
		const requsitionParamter: DataCells = {
			[commonLocators.CommonLabels.CONFIGURATION]: createRequisitionInputs.configuration,
		};
		_common.openTab(app.tabBar.Main).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, requisitionGrid);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		//_package.enterData_ToCreateRequisition(createRequisitionInputs.configuration)
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, requsitionParamter);

		cy.SAVE();

		_common.openSidebarOption(sideBarAction.wizard);
		_common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.requisitionOption);
		_modalView.findModal().findModalBody().findTextAreaInModal(app.InputFields.DOMAIN_TYPE_REMARK).type(sideBarAction.remark);
		_common.changeStatus_fromModal(sideBarAction.requisitionStatus);
		_common.openSidebarOption(sideBarAction.wizard);
		_common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.requisitionOption);
		_modalView.findModal().acceptButton('History');
		cy.wait(2000);
		_validate.validate_Text_In_Modal(app.gridCells.REMARK, sideBarAction.remark);
		_modalView.findModal().acceptButton('Close');
	});
	
});
