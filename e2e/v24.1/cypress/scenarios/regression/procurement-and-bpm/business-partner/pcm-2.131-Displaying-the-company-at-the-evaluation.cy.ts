import { app, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import CommonLocators from 'cypress/locators/common-locators';
import { _modalView, _procurementPage, _procurementContractPage, _common, _estimatePage, _businessPartnerPage, _mainView, _validate } from 'cypress/pages';

import _ from 'cypress/types/lodash';
const allure = Cypress.Allure.reporter.getInterface();
const BP_CODE = 'BP-CODE-' + Cypress._.random(0, 999);
const BP_name = 'BP-' + Cypress._.random(0, 999);
const BPEV_CODE = 'EVL_-' + Cypress._.random(0, 999);
const BPEV_NAME = 'EVL_DESC_-' + Cypress._.random(0, 999);
let CONTAINERS_BUSINESS_PARTNERS;
let CONTAINER_COLUMNS_BUSINESS_PARTNERS;
let CONTAINERS_EVALUATION;
allure.epic('PROCUREMENT AND BPM');
allure.feature('Business Partner');
allure.story('PCM- 2.131 | Displaying the company at the evaluation');
describe('PCM- 2.131 | Displaying the company at the evaluation', () => {

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.131-Displaying-the-company-at-the-evaluation.json').then((data) => {
			this.data = data;
			CONTAINERS_BUSINESS_PARTNERS = this.data.CONTAINERS.BUSINESS_PARTNERS;
			CONTAINER_COLUMNS_BUSINESS_PARTNERS = this.data.CONTAINER_COLUMNS.BUSINESS_PARTNERS
			CONTAINERS_EVALUATION = this.data.CONTAINERS.EVALUATION;

		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create new business partner ,add bank and branch', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER)

		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
			_common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNERS);
		});
		_common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS);
		_common.create_newRecord(cnt.uuid.BUSINESS_PARTNERS);
		_businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BP_name, CONTAINERS_BUSINESS_PARTNERS.STREET, CONTAINERS_BUSINESS_PARTNERS.ZIP_CODE, CONTAINERS_BUSINESS_PARTNERS.CITY, CONTAINERS_BUSINESS_PARTNERS.COUNTRY)
		cy.SAVE()
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BANKS, app.FooterTab.BANKS, 2);
		});
		_common.create_newRecord(cnt.uuid.BANKS);
		_common.edit_dropdownCellWithCaret(cnt.uuid.BANKS, app.GridCells.BANK_TYPE_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_BUSINESS_PARTNERS.BANK_TYPE);

		_common.enterRecord_inNewRow(cnt.uuid.BANKS, app.GridCells.IBAN, app.InputFields.DOMAIN_TYPE_IBAN, CONTAINERS_BUSINESS_PARTNERS.I_BAN);

		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Add evaluation to business partner and verify company', function () {

		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BP_EVALUATION, app.FooterTab.BP_EVALUATION, 2);
		})
		_common.clear_subContainerFilter(cnt.uuid.BP_EVALUATION);
		_common.create_newRecord(cnt.uuid.BP_EVALUATION);
		_businessPartnerPage.enterRecord_toCreateBusinessPartnerEvaluation(BPEV_CODE, BPEV_NAME, _common.getDate("current"), _common.getDate("incremented", 30), CONTAINERS_EVALUATION.CLERK_INPUT, CONTAINERS_EVALUATION.REMARK, Cypress.env("PROJECT_NUMBER"), CONTAINERS_EVALUATION.EVALUATION_DOCUMENT)
		cy.SAVE()

		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.BP_EVALUATION, app.GridCells.COMPANY_FK, CONTAINERS_EVALUATION.COMPANY);
		_mainView.findAndShowContainer(cnt.uuid.BP_EVALUATION).findButtonWithTitle(btn.ButtonText.EVALUATION_DETAIL).clickIn();

		_common.assert_labelValues_fromModalWithPanelGroup(commonLocators.CommonLabels.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, commonLocators.CommonLabels.BASIC_DATA, BPEV_NAME);
		_common.assert_labelValues_fromModalWithPanelGroup(commonLocators.CommonLabels.REMARKS, app.InputFields.DOMAIN_TYPE_REMARK, commonLocators.CommonLabels.RESPONSIBLE, CONTAINERS_EVALUATION.REMARK);
		_modalView.acceptButton(btn.ButtonText.OK)
	});
});
