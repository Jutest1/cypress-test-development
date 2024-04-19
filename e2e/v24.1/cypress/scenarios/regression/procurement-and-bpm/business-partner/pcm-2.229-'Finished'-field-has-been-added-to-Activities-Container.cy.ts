import { app, btn, cnt, commonLocators, sidebar, tile } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import Sidebar from "cypress/locators/sidebar";
import { _common, _estimatePage, _validate, _mainView, _procurementContractPage, _package, _modalView, _procurementPage, _rfqPage, _businessPartnerPage } from "cypress/pages";
import _ from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface();

const BP_CODE = 'BP-CODE-' + Cypress._.random(0, 9999);
const BP_NAME = 'BP-' + Cypress._.random(0, 9999);
const BRANCH_NAME = 'BR-' + Cypress._.random(0, 9999);
let CONTAINERS_BUSINESSPARTNER;
let CONTAINER_COLUMNS_BUSINESSPARTNER;
let CONTAINERS_BRANCHES;
let CONTAINER_COLUMNS_BRANCHES;
let CONTAINERS_ACTIVITIES_BUSINESSPARTNER;
let CONTAINER_COLUMNS_ACTIVITIES_BUSINESSPARTNER;
allure.epic("PROCUREMENT AND BPM");
allure.feature("Business Partner");
allure.story("PCM- 2.229 | 'Finished' field has been added to Activities Container");

describe("PCM- 2.229 | 'Finished' field has been added to Activities Container", () => {


	before(function () {
		cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"))
		cy.fixture("procurement-and-bpm/pcm-2.229-'Finished'-field-has-been-added-to-Activities-Container.json").then((data) => {
			this.data = data;
			CONTAINERS_BUSINESSPARTNER = this.data.CONTAINERS.BUSINESSPARTNER;
			CONTAINERS_BRANCHES = this.data.CONTAINERS.BRANCHES;
			CONTAINER_COLUMNS_BUSINESSPARTNER = this.data.CONTAINER_COLUMNS.BUSINESSPARTNER
			CONTAINER_COLUMNS_BRANCHES = this.data.CONTAINER_COLUMNS.BRANCHES
			CONTAINERS_ACTIVITIES_BUSINESSPARTNER = this.data.CONTAINERS.ACTIVITIES_BUSINESSPARTNER;
			CONTAINER_COLUMNS_ACTIVITIES_BUSINESSPARTNER = this.data.CONTAINER_COLUMNS.ACTIVITIES_BUSINESSPARTNER

			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
			_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BUSINESS_PARTNER)
		})
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Creation Of Record in Business Partner', function () {
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.setDefaultView(app.TabBar.BUSINESS_PARTNERS)
			_common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
			_common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESSPARTNER)
		});
		_common.clear_subContainerFilter(cnt.uuid.BUSINESS_PARTNERS)
		_common.clickOn_toolbarButton(cnt.uuid.BUSINESS_PARTNERS, btn.ToolBar.ICO_REC_NEW)
		_businessPartnerPage.enterRecord_toCreateBusinessPartner(BP_CODE, BP_NAME, CONTAINERS_BUSINESSPARTNER.STREET_NAME, CONTAINERS_BUSINESSPARTNER.ZIP_CODE, CONTAINERS_BUSINESSPARTNER.CITY_NAME, CONTAINERS_BUSINESSPARTNER.COUNTRY_NAME);
		cy.SAVE()
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
			_common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, CONTAINER_COLUMNS_BRANCHES)
		})
		_common.clear_subContainerFilter(cnt.uuid.SUBSIDIARIES)
		_common.create_newRecord(cnt.uuid.SUBSIDIARIES)
		_common.edit_containerCell(cnt.uuid.SUBSIDIARIES, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, BRANCH_NAME)
		_businessPartnerPage.enterRecord_toCreateBusinessPartnerBranch(CONTAINERS_BRANCHES.STREET_NAME, CONTAINERS_BRANCHES.ZIP_CODE, CONTAINERS_BRANCHES.CITY_NAME, CONTAINERS_BRANCHES.COUNTRY_NAME)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BANKS, app.FooterTab.BANKS, 2);
		});
		_common.delete_recordInContainer_ifRecordExists(cnt.uuid.BANKS)
		cy.wait(1000)
		_common.create_newRecord(cnt.uuid.BANKS);
		_common.edit_dropdownCellWithCaret(cnt.uuid.BANKS, app.GridCells.BANK_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_BUSINESSPARTNER.BANK_TYPE);
		_common.enterRecord_inNewRow(cnt.uuid.BANKS, app.GridCells.ACCOUNT_NO, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_BUSINESSPARTNER.ACCOUNT_NO);
		cy.SAVE();

		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ACTIVITIES_BUSINESSPARTNER, app.FooterTab.ACTIVITIES);
			_common.setup_gridLayout(cnt.uuid.ACTIVITIES_BUSINESSPARTNER, CONTAINER_COLUMNS_ACTIVITIES_BUSINESSPARTNER)
		});
		_common.delete_recordInContainer_ifRecordExists(cnt.uuid.ACTIVITIES_BUSINESSPARTNER)
		cy.wait(1000)
		_common.create_newRecord(cnt.uuid.ACTIVITIES_BUSINESSPARTNER);
		_common.edit_dropdownCellWithCaret(cnt.uuid.ACTIVITIES_BUSINESSPARTNER, app.GridCells.ACTIVITY_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_ACTIVITIES_BUSINESSPARTNER.TYPE);
		_common.enterRecord_inNewRow(cnt.uuid.ACTIVITIES_BUSINESSPARTNER, app.GridCells.ACTIVITY_DATE, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate("current"))
		_common.enterRecord_inNewRow(cnt.uuid.ACTIVITIES_BUSINESSPARTNER, app.GridCells.CLERK_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ACTIVITIES_BUSINESSPARTNER.CLARK)
		_common.enterRecord_inNewRow(cnt.uuid.ACTIVITIES_BUSINESSPARTNER, app.GridCells.REMINDER_START_DATE, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate("current"))
		_common.enterRecord_inNewRow(cnt.uuid.ACTIVITIES_BUSINESSPARTNER, app.GridCells.REMINDER_END_DATE, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate("incremented", 5))
		cy.SAVE();

	})
})