import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _validate } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';
import { tile, app, cnt, btn, sidebar, commonLocators } from 'cypress/locators';

const allure = Cypress.Allure.reporter.getInterface();
const MATERIALPRO_CODE = 'STRU_CODE-' + Cypress._.random(0, 9999);
const PS_DESCRIPTION = "PS_DESCRIPTION-" + Cypress._.random(0, 9999);

let CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE;
let CONTAINERS_PROCUREMENT_CONFIG_HEADER;
let CONTAINER_COLUMNS_REQUISITION_CERTIFICATE;
let CONTAINER_COLUMNS_CERTIFICATE;
let CONTAINER_CERTIFICATE;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_REQUISITION;
let PROCUREMENTSTRUCTURE_PARAMETER: DataCells;
let CONTAINERS_CERTIFICATE_PARAMETERS:DataCells;

allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.129 | Delete certificate to a requisition');

describe('PCM- 2.129 | Delete certificate to a requisition', () => {

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.129-delete-certificate-to-a-requisition.json').then((data) => {
			this.data = data;
            CONTAINERS_PROCUREMENT_CONFIG_HEADER = this.data.CONTAINERS.PROCUREMENT_STRUCTURE
            CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE_COLUMN
			CONTAINER_CERTIFICATE = this.data.CONTAINERS.CERTIFICATE_INPUT
            CONTAINER_COLUMNS_CERTIFICATE = this.data.CONTAINER_COLUMNS.CERTIFICATE_COLUMN
			CONTAINER_COLUMNS_REQUISITION_CERTIFICATE = this.data.CONTAINER_COLUMNS.REQUISITION_CERTIFICATE_COLUMN
			CONTAINER_REQUISITION = this.data.CONTAINERS.REQUISITION_INPUT
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION_COLUMN

			PROCUREMENTSTRUCTURE_PARAMETER = {
                [app.GridCells.PRC_STRUCTURE_TYPE_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.TYPE,
                [app.GridCells.CODE]:MATERIALPRO_CODE,
                [app.GridCells.DESCRIPTION_INFO]:PS_DESCRIPTION,
                [app.GridCells.CLERK_REQ_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.REQ_OWNER_ROLE,
                [app.GridCells.CLERK_PRC_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.RESPONSIBLE_ROLE,
                [app.GridCells.PRC_CONFIG_HEADER_FK]:CONTAINERS_PROCUREMENT_CONFIG_HEADER.PRC_CONFIG_HEADER
            },
			CONTAINERS_CERTIFICATE_PARAMETERS={ 
				[app.GridCells.PRC_CONFIG_HEADER_FK]:CONTAINER_CERTIFICATE.CONFIG_HEADER,
                [app.GridCells.BPD_CERTIFICATE_TYPE_FK]:CONTAINER_CERTIFICATE.TYPE,
                [app.GridCells.IS_REQUIRED]:commonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_MANDATORY]:commonLocators.CommonKeys.CHECK,
				[app.GridCells.AMOUNT_SMALL]:CONTAINER_CERTIFICATE.AMOUNT,
                [app.GridCells.GUARANTEE_COST]:CONTAINER_CERTIFICATE.GURANTEE_COST
            }
			/* Open desktop should be called in before block */
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	it('TC - Create certificates for procurement structure', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTSTRUCTURE);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENTSTRUCTURE);
		});
		_common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL);
		_common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES);
		_procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENTSTRUCTURE_PARAMETER);
		cy.SAVE();
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
			_common.setup_gridLayout(cnt.uuid.CERTIFICATES, CONTAINER_COLUMNS_CERTIFICATE);
		});
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
		});
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, MATERIALPRO_CODE);
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 2);
		});
		_common.create_newRecord(cnt.uuid.CERTIFICATES);
		_procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES,CONTAINERS_CERTIFICATE_PARAMETERS);
		_common.enterRecord_inNewRow(cnt.uuid.CERTIFICATES,app.GridCells.GUARANTEE_COST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_CERTIFICATE.GURANTEE_COST)
		_common.enterRecord_inNewRow(cnt.uuid.CERTIFICATES,app.GridCells.AMOUNT_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_CERTIFICATE.AMOUNT)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create requisitions', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		cy.wait(1000) // required wait to perform OK action
		_common.clickOn_modalFooterButton(btn.ButtonText.OK); 
		cy.wait(1000) // required wait to perform OK action
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MATERIALPRO_CODE);
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_REQUISITION.BP);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify Certificate in requisition with respect to Procurement structure', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_CERTIFICATES, app.FooterTab.CERTIFICATES, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_CERTIFICATES, CONTAINER_COLUMNS_REQUISITION_CERTIFICATE);
		});
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.REQUISITION_CERTIFICATES);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CERTIFICATES, app.GridCells.BPD_CERTIFICATE_TYPE_FK, CONTAINER_CERTIFICATE.TYPE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CERTIFICATES, app.GridCells.REQUIRED_AMOUNT, CONTAINER_CERTIFICATE.AMOUNT);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CERTIFICATES, app.GridCells.GUARANTEE_COST, CONTAINER_CERTIFICATE.GURANTEE_COST);
	});
	it('TC- Delete Certificate to a Requisition', function () {
		_common.search_inSubContainer(cnt.uuid.REQUISITION_CERTIFICATES, CONTAINER_CERTIFICATE.TYPE);
		_common.waitForLoaderToDisappear()
		_common.delete_recordFromContainer(cnt.uuid.REQUISITION_CERTIFICATES);
		cy.SAVE();
		cy.REFRESH_CONTAINER();
		_validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_CERTIFICATES, CONTAINER_CERTIFICATE.Type);
	});
});

after(() => {
	cy.LOGOUT();
});
