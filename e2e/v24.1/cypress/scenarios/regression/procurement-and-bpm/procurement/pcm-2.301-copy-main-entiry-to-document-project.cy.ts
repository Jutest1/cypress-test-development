import { _common, _copyMainEntryToDocumentProject, _mainView, _modalView } from 'cypress/pages';
import { app, cnt} from 'cypress/locators';

const allure = Cypress.Allure.reporter.getInterface();
allure.epic('PROCUREMENT AND BPM');
allure.feature('Procurement');
allure.story('PCM- 2.301 | copy main entiry to document project');

let DEFAULT_VIEW;
let WIZARD;
let DOCUMENT_VALUE;

let CONTAINER_COLUMNS_PACKAGE_DOCUMENT_PROJECT;
let CONTAINER_COLUMNS_PACKAGE_HEADER;
let CONTAINER_COLUMNS_REQUISITION_HEADER;
let CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT;
let CONTAINER_COLUMNS_RFQ_DOCUMENT_PROJECT;
let CONTAINER_COLUMNS_QUOTE_DOCUMENT_PROJECT;
let CONTAINER_COLUMNS_CONTRACT_DOCUMENT_PROJECT;
let CONTAINER_COLUMNS_PES_DOCUMENT_PROJECT;
let CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT;

describe('PCM- 2.301 | copy main entiry to document project', () => {
	before(function () {
		cy.fixture('pcm/pcm-2.301-copy-main-entiry-to-document-project.json')
			.then((data) => {
				this.data = data;
				DEFAULT_VIEW = this.data.CONTAINERS.DEFAULT_VIEW;
				WIZARD = this.data.CONTAINERS.WIZARD;
				DOCUMENT_VALUE = this.data.CONTAINERS.DOCUMENT_VALUE;

				CONTAINER_COLUMNS_PACKAGE_HEADER = this.data.CONTAINER_COLUMNS.PACKAGE_HEADER;
				CONTAINER_COLUMNS_PACKAGE_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.PACKAGE_DOCUMENT_PROJECT;
				CONTAINER_COLUMNS_REQUISITION_HEADER = this.data.CONTAINER_COLUMNS.REQUISITION_HEADER;
				CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.REQUISITION_DOCUMENT_PROJECT;
				CONTAINER_COLUMNS_RFQ_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.RFQ_DOCUMENT_PROJECT;
				CONTAINER_COLUMNS_QUOTE_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.QUOTE_DOCUMENT_PROJECT;
				CONTAINER_COLUMNS_CONTRACT_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.CONTRACT_DOCUMENT_PROJECT;
				CONTAINER_COLUMNS_PES_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.PES_DOCUMENT_PROJECT;
				CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.INV_DOCUMENT_PROJECT;
			})
			.then(() => {
				cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			});
	});
	after(() => {
		cy.LOGOUT();
	});

	it('package module：create document project with data config and check whether it had inherit project/structure/schedule/activity/business partner from header container', function () {
		_copyMainEntryToDocumentProject.openModuleFromQuickStart('Package');
		_copyMainEntryToDocumentProject.searchWithCodeFromSideBar(DOCUMENT_VALUE.PACKAGECODE);
		cy.wait(2000);
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE, DEFAULT_VIEW.PAKCAGE_VIEW);
			cy.wait(2000);
			_common.clear_subContainerFilter(cnt.uuid.PACKAGE);
			cy.wait(2000);
			_common.waitForLoaderToDisappear();
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, 'Documents Project');
			cy.wait(2000);
			_copyMainEntryToDocumentProject.setGridLayout_all_to_right(cnt.uuid.PROJECT_DOCUMENTS);
		});
		cy.wait(2000);
		_common.maximizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(500);
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(5000);
		//vilify value in pop up dialog when click new button
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PROJECTFK, CONTAINER_COLUMNS_PACKAGE_DOCUMENT_PROJECT.prjprojectfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.SCHEDULE, CONTAINER_COLUMNS_PACKAGE_DOCUMENT_PROJECT.psdschedulefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.ACTIVITY, CONTAINER_COLUMNS_PACKAGE_DOCUMENT_PROJECT.psdactivityfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.BUSINESSPARTNERFK, CONTAINER_COLUMNS_PACKAGE_DOCUMENT_PROJECT.bpdbusinesspartnerfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.STRUCTUREFK, CONTAINER_COLUMNS_PACKAGE_DOCUMENT_PROJECT.prcstructurefk, 'lookup', 0);
		_common.clickOn_modalFooterButton('OK');
		cy.wait(5000);
		//vilify value after create to container
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_PROJECT_FK, DOCUMENT_VALUE.PROJECTFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_STRUCTURE_FK, DOCUMENT_VALUE.STRUCTUREFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_SCHEDULE_FK, DOCUMENT_VALUE.SCHEDULE);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_ACTIVITY, DOCUMENT_VALUE.ACTIVITY);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.BPD_BUSINESS_PARTNER_FK, DOCUMENT_VALUE.BUSINESSPARTNERFK);
		_common.minimizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(5000);
	});

	it('Requisition module：create document project with data config and check whether it had inherit project/structure/business/package/cu/catalog from header container', function () {
		_copyMainEntryToDocumentProject.openModuleFromQuickStart('Requisition');
		_copyMainEntryToDocumentProject.searchWithCodeFromSideBar(DOCUMENT_VALUE.REQCODE);
		cy.wait(3000);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.waitForLoaderToDisappear();
			cy.wait(2000);
			_common.setDefaultView(app.TabBar.MAIN, DEFAULT_VIEW.REQ_VIEW);
			cy.wait(2000);
			_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
			cy.wait(2000);
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, 'Documents Project');
			cy.wait(2000);
			_copyMainEntryToDocumentProject.setGridLayout_all_to_right(cnt.uuid.PROJECT_DOCUMENTS);
		});
		cy.wait(2000);
		_common.maximizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(5000);
		//vilify value in pop up dialog when click new button
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PROJECTFK, CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT.prjprojectfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.STRUCTUREFK, CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT.prcstructurefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.CONTROLLINGUNITFK, CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT.mdccontrollingunitfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.BUSINESSPARTNERFK, CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT.bpdbusinesspartnerfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PACKAGECODE, CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT.prcpackagefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.MATERIALCATALOGFK, CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT.mdcmaterialcatalogfk, 'lookup', 0);
		_common.clickOn_modalFooterButton('OK');
		cy.wait(5000);
		//vilify value after create to container
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_PROJECT_FK, DOCUMENT_VALUE.PROJECTFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_STRUCTURE_FK, DOCUMENT_VALUE.STRUCTUREFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, DOCUMENT_VALUE.CONTROLLINGUNITFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.MDC_MATERIAL_CATALOG_FK, DOCUMENT_VALUE.MATERIALCATALOGFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.BPD_BUSINESS_PARTNER_FK, DOCUMENT_VALUE.BUSINESSPARTNERFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_PACKAGE_FK, DOCUMENT_VALUE.PACKAGECODE);
		_common.minimizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(5000);
	});

	it('rfq module：create document project with data config and check whether it had inherit project', function () {
		_copyMainEntryToDocumentProject.openModuleFromQuickStart('RfQ');
		_copyMainEntryToDocumentProject.searchWithCodeFromSideBar(DOCUMENT_VALUE.RFQCODE);
		cy.wait(3000);
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.waitForLoaderToDisappear();
			cy.wait(2000);
			_common.setDefaultView(app.TabBar.RFQ, DEFAULT_VIEW.RFQ_VIEW);
			cy.wait(2000);
			_common.waitForLoaderToDisappear();
			_common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE);
			cy.wait(2000);
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, 'Documents Project');
			cy.wait(2000);
			_copyMainEntryToDocumentProject.setGridLayout_all_to_right(cnt.uuid.PROJECT_DOCUMENTS);
		});
		cy.wait(2000);
		_common.maximizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(5000);
		//vilify value in pop up dialog when click new button
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PROJECTFK, CONTAINER_COLUMNS_REQUISITION_DOCUMENT_PROJECT.prjprojectfk, 'lookup', 0);
		_common.clickOn_modalFooterButton('OK');
		cy.wait(5000);
		//vilify value after create to container
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_PROJECT_FK, DOCUMENT_VALUE.PROJECTFK);
		_common.minimizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(5000);
	});

	it('quote module：create document project with data config and check whether it had inherit project,business partner ,rfq,', function () {
		_copyMainEntryToDocumentProject.openModuleFromQuickStart('Quote');
		_copyMainEntryToDocumentProject.searchWithCodeFromSideBar(DOCUMENT_VALUE.QTNCODE);
		cy.wait(3000);
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.waitForLoaderToDisappear();
			cy.wait(2000);
			_common.setDefaultView(app.TabBar.QUOTES, DEFAULT_VIEW.QTN_VIEW);
			cy.wait(2000);
			_common.waitForLoaderToDisappear();
			_common.clear_subContainerFilter(cnt.uuid.QUOTES);
			cy.wait(2000);
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, 'Documents Project');
			_copyMainEntryToDocumentProject.setGridLayout_all_to_right(cnt.uuid.PROJECT_DOCUMENTS);
		});
		cy.wait(2000);
		_common.maximizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(5000);
		//vilify value in pop up dialog when click new button
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PROJECTFK, CONTAINER_COLUMNS_QUOTE_DOCUMENT_PROJECT.prjprojectfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.BUSINESSPARTNERFK, CONTAINER_COLUMNS_QUOTE_DOCUMENT_PROJECT.bpdbusinesspartnerfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.RFQCODE, CONTAINER_COLUMNS_QUOTE_DOCUMENT_PROJECT.rfqfk, 'lookup', 0);
		_common.clickOn_modalFooterButton('OK');
		cy.wait(5000);
		//vilify value after create to container
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_PROJECT_FK, DOCUMENT_VALUE.PROJECTFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.BPD_BUSINESS_PARTNER_FK, DOCUMENT_VALUE.BUSINESSPARTNERFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.RFQ_HEADER_FK, DOCUMENT_VALUE.RFQCODE);
		_common.minimizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(5000);
	});

	it('contract module：create document project with data config and check whether it had inherit project,business partner ,package,controlling unit,structure,material catalog', function () {
		_copyMainEntryToDocumentProject.openModuleFromQuickStart('Contract');
		_copyMainEntryToDocumentProject.searchWithCodeFromSideBar(DOCUMENT_VALUE.CONCODE);
		cy.wait(3000);
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT, DEFAULT_VIEW.CON_VIEW);
			cy.wait(2000);
			_common.waitForLoaderToDisappear();
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, 'Contracts');
			_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT);
			cy.wait(2000);
			_common.waitForLoaderToDisappear();
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, 'Documents Project');
			cy.wait(2000);
			_copyMainEntryToDocumentProject.setGridLayout_all_to_right(cnt.uuid.PROJECT_DOCUMENTS);
		});
		cy.wait(2000);
		_common.maximizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(5000);
		//vilify value in pop up dialog when click new button
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PROJECTFK, CONTAINER_COLUMNS_CONTRACT_DOCUMENT_PROJECT.prjprojectfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.STRUCTUREFK, CONTAINER_COLUMNS_CONTRACT_DOCUMENT_PROJECT.prcstructurefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.CONTROLLINGUNITFK, CONTAINER_COLUMNS_CONTRACT_DOCUMENT_PROJECT.mdccontrollingunitfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.BUSINESSPARTNERFK, CONTAINER_COLUMNS_CONTRACT_DOCUMENT_PROJECT.bpdbusinesspartnerfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PACKAGECODE, CONTAINER_COLUMNS_CONTRACT_DOCUMENT_PROJECT.prcpackagefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.MATERIALCATALOGFK, CONTAINER_COLUMNS_CONTRACT_DOCUMENT_PROJECT.mdcmaterialcatalogfk, 'lookup', 0);
		_common.clickOn_modalFooterButton('OK');
		cy.wait(5000);
		//vilify value after create to container
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_PROJECT_FK, DOCUMENT_VALUE.PROJECTFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_STRUCTURE_FK, DOCUMENT_VALUE.STRUCTUREFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, DOCUMENT_VALUE.CONTROLLINGUNITFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.MDC_MATERIAL_CATALOG_FK, DOCUMENT_VALUE.MATERIALCATALOGFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.BPD_BUSINESS_PARTNER_FK, DOCUMENT_VALUE.BUSINESSPARTNERFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_PACKAGE_FK, DOCUMENT_VALUE.PACKAGECODE);
		_common.minimizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(5000);
	});

	it('pes module：create document project with data config and check whether it had inherit project,business partner ,package,controlling unit,structure,material catalog,contract', function () {
		_copyMainEntryToDocumentProject.openModuleFromQuickStart('PES');
		_copyMainEntryToDocumentProject.searchWithCodeFromSideBar(DOCUMENT_VALUE.PESCODE);
		cy.wait(3000);
		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
			_common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET, DEFAULT_VIEW.PES_VIEW);
			cy.wait(2000);
			_common.waitForLoaderToDisappear();
			_common.select_tabFromFooter(cnt.uuid.HEADERS, 'Headers');
			_common.clear_subContainerFilter(cnt.uuid.HEADERS);
			cy.wait(2000);
			_common.waitForLoaderToDisappear();
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, 'Documents Project');
			cy.wait(2000);
			_copyMainEntryToDocumentProject.setGridLayout_all_to_right(cnt.uuid.PROJECT_DOCUMENTS);
		});
		cy.wait(5000);
		_common.maximizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(3000);
		//vilify value in pop up dialog when click new button
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PROJECTFK, CONTAINER_COLUMNS_PES_DOCUMENT_PROJECT.prjprojectfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.STRUCTUREFK, CONTAINER_COLUMNS_PES_DOCUMENT_PROJECT.prcstructurefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.BUSINESSPARTNERFK, CONTAINER_COLUMNS_PES_DOCUMENT_PROJECT.bpdbusinesspartnerfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PACKAGECODE, CONTAINER_COLUMNS_PES_DOCUMENT_PROJECT.prcpackagefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.CONCODE, CONTAINER_COLUMNS_PES_DOCUMENT_PROJECT.conheaderfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.CONTROLLINGUNITFK, CONTAINER_COLUMNS_PES_DOCUMENT_PROJECT.mdccontrollingunitfk, 'lookup', 0);
		_common.clickOn_modalFooterButton('OK');
		cy.wait(5000);
		//vilify value after create to container
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_PROJECT_FK, DOCUMENT_VALUE.PROJECTFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_STRUCTURE_FK, DOCUMENT_VALUE.STRUCTUREFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, DOCUMENT_VALUE.CONTROLLINGUNITFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.BPD_BUSINESS_PARTNER_FK, DOCUMENT_VALUE.BUSINESSPARTNERFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_PACKAGE_FK, DOCUMENT_VALUE.PACKAGECODE);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.CON_HEADER_FK, DOCUMENT_VALUE.CONCODE);
		_common.minimizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(5000);
	});

	it('invoice module：create document project with data config and check whether it had inherit project,business partner ,package,controlling unit,structure,material catalog,contract,pes', function () {
		_copyMainEntryToDocumentProject.openModuleFromQuickStart('Invoice');
		_copyMainEntryToDocumentProject.searchWithCodeFromSideBar(DOCUMENT_VALUE.INVCODE);
		cy.wait(3000);
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.setDefaultView(app.TabBar.INVOICES, DEFAULT_VIEW.INV_VIEW);
			_common.waitForLoaderToDisappear();
			cy.wait(2000);
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, 'Invoices');
			_common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER);
			cy.wait(2000);
			_common.waitForLoaderToDisappear();
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, 'Documents Project');
			cy.wait(2000);
			_copyMainEntryToDocumentProject.setGridLayout_all_to_right(cnt.uuid.PROJECT_DOCUMENTS);
		});
		cy.wait(2000);
		_common.maximizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(5000);
		//vilify value in pop up dialog when click new button
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PROJECTFK, CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT.prjprojectfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.STRUCTUREFK, CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT.prcstructurefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.BUSINESSPARTNERFK, CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT.bpdbusinesspartnerfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PACKAGECODE, CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT.prcpackagefk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.CONCODE, CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT.conheaderfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.PESCODE, CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT.pesheaderfk, 'lookup', 0);
		_copyMainEntryToDocumentProject.getTextFrom_ModalInput(DOCUMENT_VALUE.CONTROLLINGUNITFK, CONTAINER_COLUMNS_INVOICE_DOCUMENT_PROJECT.mdccontrollingunitfk, 'lookup', 0);
		_common.clickOn_modalFooterButton('OK');
		cy.wait(5000);
		//vilify value after create to container
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.DOCUMENT_PROJECT_FK, DOCUMENT_VALUE.PROJECTFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_STRUCTURE_FK, DOCUMENT_VALUE.STRUCTUREFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, DOCUMENT_VALUE.CONTROLLINGUNITFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.BPD_BUSINESS_PARTNER_FK, DOCUMENT_VALUE.BUSINESSPARTNERFK);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PRC_PACKAGE_FK, DOCUMENT_VALUE.PACKAGECODE);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.CON_HEADER_FK, DOCUMENT_VALUE.CONCODE);
		_copyMainEntryToDocumentProject.getCellValueOfDocumentProject(app.GridCells.PES_HEADER_FK, DOCUMENT_VALUE.PESCODE);
		_common.minimizeContainer(cnt.uuid.PROJECT_DOCUMENTS);
		cy.wait(1000);
		cy.SAVE();
		cy.wait(5000);
	});
});

