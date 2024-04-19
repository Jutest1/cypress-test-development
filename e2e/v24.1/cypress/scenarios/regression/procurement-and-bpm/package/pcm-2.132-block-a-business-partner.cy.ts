import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage, _businessPartnerPage } from 'cypress/pages';
import { app, cnt, tile, sidebar, commonLocators, btn } from 'cypress/locators';
import _ from 'cypress/types/lodash';
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BP_NAME = 'BP-' + Cypress._.random(0, 999);
let CONTAINERS_BUSINESS_PARTNER;
let CONTAINERS_ROLES
let CONTAINER_COLUMNS_BUSINESS_PARTNER

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('Package');
ALLURE.story('PCM- 2.132 | Block a Business Partner');
describe('PCM- 2.132 | Block a Business Partner', () => {	
	before(function () {
		cy.clearAllLocalStorage();
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.132-block-a-business-partner.json').then((data) => {
			this.data = data;
			CONTAINERS_BUSINESS_PARTNER=this.data.CONTAINERS.BUSINESS_PARTNER
			CONTAINERS_ROLES= this.data.CONTAINERS.ROLES
			CONTAINER_COLUMNS_BUSINESS_PARTNER=	this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER

			
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, ' ');
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
				_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
			});
			_common.openTab(app.TabBar.MASTER_DATA).then(() => {
				_common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
			});
			_common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,CONTAINERS_BUSINESS_PARTNER.ENTITY_TYPE);
			_common.waitForLoaderToDisappear()
			_common.openTab(app.TabBar.MASTER_DATA).then(() => {
				_common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
			});
			_common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.BLOCKED);
			_businessPartnerPage.select_keyIcon(cnt.uuid.INSTANCES, app.GridCells.ACCESS_RIGHT_DESCRIPTION_04_FK, 'select');
			cy.SAVE()
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
				_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ROLES);
			_common.openTab(app.TabBar.ROLES).then(() => {
				_common.select_tabFromFooter(cnt.uuid.ROLE, app.FooterTab.ROLES, 0);
			});
			_common.search_inSubContainer(cnt.uuid.ROLE, CONTAINERS_ROLES.ROLE);
			_common.openTab(app.TabBar.ROLES).then(() => {
				_common.select_tabFromFooter(cnt.uuid.ROLE_TO_RIGHTS, app.FooterTab.RIGHTS, 1);
			});
			_common.search_inSubContainer(cnt.uuid.ROLE_TO_RIGHTS, CONTAINERS_ROLES.RIGHT);
			_common.waitForLoaderToDisappear()
			_common.select_rowHasValue(cnt.uuid.ROLE_TO_RIGHTS, CONTAINERS_ROLES.RIGHT);
			_common.set_cellCheckboxValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.READ, CONTAINERS_ROLES.UNCHECKED);
			_common.set_cellCheckboxValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.WRITE, CONTAINERS_ROLES.UNCHECKED);
			_common.set_cellCheckboxValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.CREATE, CONTAINERS_ROLES.UNCHECKED);
			_common.set_cellCheckboxValue(cnt.uuid.ROLE_TO_RIGHTS, app.GridCells.DELETE, CONTAINERS_ROLES.UNCHECKED);
			cy.SAVE()
			_common.waitForLoaderToDisappear()
		});
	});
    after(() => {
		cy.LOGOUT();
	});
	it('TC - Verify Business Partner should be blocked', function () {		
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
			_common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS,CONTAINER_COLUMNS_BUSINESS_PARTNER);
		});
		_common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS);
		_common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS);		
		_common.enterRecord_inNewRow(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESS_PARTNER_NAME_1, app.InputFields.DOMAIN_TYPE_DESCRIPTION, BP_NAME);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BUSINESS_PARTNER_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BUSINESS_PARTNER_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.BLOCKED);
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, BP_NAME);
		_validate.verify_isRecordDeleted(cnt.uuid.BUSINESS_PARTNERS, BP_NAME);
	});
});
