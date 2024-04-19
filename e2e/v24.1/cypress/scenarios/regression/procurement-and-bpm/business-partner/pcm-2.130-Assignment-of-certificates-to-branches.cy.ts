import { app, cnt, btn, sidebar, commonLocators } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import CommonLocators from 'cypress/locators/common-locators';
import { _modalView, _procurementPage, _procurementContractPage, _common, _estimatePage, _businessPartnerPage, _mainView, _materialPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const BP_CODE = 'BP-CODE-' + Cypress._.random(0, 999);
const BUSINESS_PARTNER_NAME = 'BP-' + Cypress._.random(0, 999);

let CONTAINERS_BUSINESS_PARTNERS;
let CONTAINER_COLUMNS_BUSINESS_PARTNERS;
let CONTAINERS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT

allure.epic('PROCUREMENT AND BPM');
allure.feature('Business Partner');
allure.story('PCM- 2.130 | Assignment of certificate to branches');
describe('PCM- 2.130 | Assignment of certificate to branches', () => {
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.130-Add-certificate-to-branches.json').then((data) => {
			this.data = data;
			CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINERS_BUSINESS_PARTNERS = this.data.CONTAINERS.BUSINESS_PARTNERS;
            CONTAINER_COLUMNS_BUSINESS_PARTNERS = this.data.CONTAINER_COLUMNS.BUSINESS_PARTNERS
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create new business partner and add bank ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER)
		cy.wait(2000)  //required wait to load page
        _common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
            _common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNERS);
        });
        _common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS);
        _common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS);
        _businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BUSINESS_PARTNER_NAME, CONTAINERS_BUSINESS_PARTNERS.STREET, CONTAINERS_BUSINESS_PARTNERS.ZIP_CODE, CONTAINERS_BUSINESS_PARTNERS.CITY, CONTAINERS_BUSINESS_PARTNERS.COUNTRY)
        cy.SAVE()
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BANKS, app.FooterTab.BANKS, 2);
		});
		_common.create_newRecord(cnt.uuid.BANKS);
		_common.edit_dropdownCellWithCaret(cnt.uuid.BANKS, app.GridCells.BANK_TYPE_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_BUSINESS_PARTNERS.BANK_TYPE);
		_common.enterRecord_inNewRow(cnt.uuid.BANKS, app.GridCells.IBAN, app.InputFields.DOMAIN_TYPE_IBAN, CONTAINERS_BUSINESS_PARTNERS.I_BAN);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 2);
		});
		_common.create_newRecord(cnt.uuid.SUBSIDIARIES);
		_businessPartnerPage.enterRecord_toCreateBusinessPartnerBranch(CONTAINERS_BUSINESS_PARTNERS.STREET, CONTAINERS_BUSINESS_PARTNERS.ZIP_CODE, CONTAINERS_BUSINESS_PARTNERS.CITY, CONTAINERS_BUSINESS_PARTNERS.COUNTRY);
		cy.SAVE();
	});

	it('TC - Create procurement contract and contract Item', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT)
		cy.wait(2000) //required wait to load page
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT)
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
		_materialPage.enterRecord_toCreateContract(BUSINESS_PARTNER_NAME)
		_common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(2000) //required wait to load page
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 1);
		});
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_common.edit_dropdownCellWithInput(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.MATERIAL_NO);
		cy.SAVE();
		cy.wait(2000);  //required wait to load page
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
		});
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('CONTRACTCODE', $ele1.text());
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)
	});

	it('TC - Add certificate to business partner', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER)
		cy.wait(2000) //required wait to load page
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
			_common.select_tabFromFooter(cnt.uuid.BP_CERTIFICATE, app.FooterTab.BP_CERTIFICATE, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.BP_CERTIFICATE);
		_common.create_newRecord(cnt.uuid.BP_CERTIFICATE);
		_common.edit_dropdownCellWithInput(cnt.uuid.BP_CERTIFICATE, app.GridCells.CON_HEADER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('CONTRACTCODE'));
		cy.SAVE();
		cy.wait(2000); //required wait to load page
		_common.clickOn_toolbarButton(cnt.uuid.BP_CERTIFICATE,Buttons.ToolBar.ICO_ADD_CUSTOMER_COMPANY)
		cy.wait(2000); //required wait to load page
		_modalView.findModalBody().findButton(btn.ToolBar.ICO_REC_NEW).clickIn();
		_modalView.findModalBody().findTextInput(app.InputFields.INPUT_GROUP_CONTENT).eq(0).type(CONTAINERS_BUSINESS_PARTNERS.CITY);
		_modalView.select_popupItem(commonLocators.CommonKeys.GRID, CONTAINERS_BUSINESS_PARTNERS.CITY);
		_modalView.acceptButton('OK');
	});
});
