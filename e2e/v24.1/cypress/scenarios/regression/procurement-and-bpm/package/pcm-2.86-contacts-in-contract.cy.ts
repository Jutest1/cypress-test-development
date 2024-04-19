import { tile, app, cnt,sidebar, commonLocators, btn } from 'cypress/locators';
import { _common, _validate, _mainView, _sidebar,_package, _procurementContractPage, _procurementPage } from 'cypress/pages';
const allure = Cypress.Allure.reporter.getInterface();
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

var req_role = 'req_role';
var req_roletype = 'req_roletype';
var req_branch = 'req_branch';
var req_contact = 'req_contact';
var first_name = 'first_name';
var last_name = 'last_name';

let REQUISITION_PARAMETERS:DataCells;
let CONTAINERS_BUSINESS_PARTNER;
let CONTAINERS_REQUISITION;

let CONTAINERS_CONTRACT

let CONTAINER_COLUMNS_REQUISITION
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_CONTACT
let CONTAINER_COLUMNS_CONTRACT

allure.epic('PROCUREMENT AND BPM');
allure.feature('Package');
allure.story('PCM- 2.86 | Contacts in contract');

	describe('PCM- 2.86 | Contacts in contract', () => {
		before(function () {
			cy.fixture('pcm/pcm-2.86-contacts-in-contract.json').then((data) => {
				this.data = data;
				CONTAINERS_BUSINESS_PARTNER = this.data.CONTAINERS.BUSINESS_PARTNER;
				CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
				CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
			  
				CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
				CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
				CONTAINER_COLUMNS_CONTACT = this.data.CONTAINER_COLUMNS.CONTACT
				CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT


				REQUISITION_PARAMETERS = {
					[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION
				};
			});
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
		after(() => {
			cy.LOGOUT();
		});

	it('TC - Select BPM and its contacts', function () {
		
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
		_common.waitForLoaderToDisappear()
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,CONTAINERS_BUSINESS_PARTNER.PARTNERNAME)
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
			_common.setDefaultView(app.TabBar.BUSINESS_PARTNERS);
			_common.waitForLoaderToDisappear()
		});
		_common.openTab(app.TabBar.CONTACTS_BP).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTACTS_BP, app.FooterTab.BUSINESS_PARTNER, 0);
			_common.setDefaultView(app.TabBar.CONTACTS_BP);
			_common.waitForLoaderToDisappear()
		});
		_common.maximizeContainer(cnt.uuid.CONTACTS_BP);
		_common.saveCellDataToEnv(cnt.uuid.CONTACTS_BP, app.GridCells.FIRST_NAME, first_name);
		_common.saveCellDataToEnv(cnt.uuid.CONTACTS_BP, app.GridCells.FAMILY_NAME, last_name);
	});

	it('TC - Verify creation requisition record and change requisition status', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS,  CONTAINER_COLUMNS_REQUISITION);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);

		_common.clickOn_cellInSubContainer(cnt.uuid.REQUISITIONS, app.GridCells.PROJECT_FK_PROJECT_NAME);
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BUSINESS_PARTNER.PARTNERNAME);
		_common.waitForLoaderToDisappear()
		_mainView.select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_BUSINESS_PARTNER.PARTNERNAME);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_CONTACT, app.FooterTab.CONTACTS, 2);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_CONTACT, CONTAINER_COLUMNS_CONTACT);
		});

		_common.create_newRecord(cnt.uuid.REQUISITION_CONTACT);
		_common.select_rowInContainer(cnt.uuid.REQUISITION_CONTACT);
		_procurementContractPage.create_contacts(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_FK, CONTAINERS_CONTRACT.INPUTTEXT, Cypress.env(last_name));
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_ROLE_FK, req_role);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_CONTACT, app.GridCells.CONTACT_ROLE_TYPE_FK, req_roletype);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_SUBSIBIARY, req_branch);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_CONTACT, app.GridCells.BPD_CONTACT_FIRST_NAME, req_contact);

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Contract', function () {
		

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_common.clickOn_modalFooterButton(btn.ButtonText.NEXT);
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.clickOn_cellInSubContainer(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PROJECT_FK_PROJECT_NAME);
		_common.enterRecord_inNewRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BUSINESS_PARTNER_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BUSINESS_PARTNER.PARTNERNAME);
		_common.waitForLoaderToDisappear()
		_mainView.select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_BUSINESS_PARTNER.PARTNERNAME);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT);

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTRACT_CONTACT, app.FooterTab.CONTACTS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTRACT_CONTACT, CONTAINER_COLUMNS_CONTACT);
		});
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.CONTRACT_CONTACT)
		_common.delete_recordFromContainer(cnt.uuid.CONTRACT_CONTACT);
		cy.wait(2000)//required wait
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_validate.verify_isRecordDeleted(cnt.uuid.CONTRACT_CONTACT, CONTAINERS_BUSINESS_PARTNER.NAME);
		

		_common.create_newRecord(cnt.uuid.CONTRACT_CONTACT);
		_common.select_rowInContainer(cnt.uuid.CONTRACT_CONTACT);
		_common.waitForLoaderToDisappear()
		_procurementContractPage.create_contacts(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FK,  CONTAINERS_CONTRACT.INPUTTEXT, Cypress.env(last_name));
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FK)
		 _procurementContractPage.create_contacts(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FK,  CONTAINERS_CONTRACT.INPUTTEXT,CONTAINERS_BUSINESS_PARTNER.NAME2);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_whereRecordIsNotEqual(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FK, Cypress.env(last_name));
		
		_common.select_rowInContainer(cnt.uuid.CONTRACT_CONTACT);
		_procurementContractPage.create_contacts(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FK,  CONTAINERS_CONTRACT.INPUTTEXT, Cypress.env(last_name));
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FK, Cypress.env(last_name));
	});

	it('TC - Verify assertion req to contract', function () {
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_ROLE_FK, Cypress.env(req_role));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT, app.GridCells.CONTACT_ROLE_TYPE_FK, Cypress.env(req_roletype));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_SUBSIBIARY, Cypress.env(req_branch));
		_common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_CONTACT, app.GridCells.BPD_CONTACT_FIRST_NAME, Cypress.env(req_contact));
	});
});
