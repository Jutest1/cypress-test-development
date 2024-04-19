import { tile, sidebar, app, cnt, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _package, _rfqPage, _validate, _modalView } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const DOC_DESC_1 = "D-DESC-1-" + Cypress._.random(0, 999);
const DOC_DESC_2 = "D-DESC-2-" + Cypress._.random(0, 999);
const DOC_DESC_3 = "D-DESC-3-" + Cypress._.random(0, 999);

let CONTAINERS_BIDDERS, CONTAINERS_PROJECT_DOCUMENT;

let CONTAINER_COLUMNS_RFQ, CONTAINER_COLUMNS_BIDDERS, CONTAINER_COLUMNS_PROJECT_DOCUMENT;

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('Quote');
ALLURE.story('PCM- 2.246 | Change project document status in quote');

describe('PCM- 2.246 | Change project document status in quote', () => {

	before(function () {

		cy.fixture('pcm/pcm-2.246-change_project_document_status_in_quote.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
			CONTAINER_COLUMNS_BIDDERS = this.data.CONTAINER_COLUMNS.BIDDERS
			CONTAINERS_BIDDERS = this.data.CONTAINERS.BIDDERS
			CONTAINER_COLUMNS_PROJECT_DOCUMENT = this.data.CONTAINER_COLUMNS.PROJECT_DOCUMENT
			CONTAINERS_PROJECT_DOCUMENT = this.data.CONTAINERS.PROJECT_DOCUMENT

		}).then(() => {
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
			cy.REFRESH_CONTAINER()
			cy.SAVE()
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Verify creation of RFQ record ,change its status and create quote', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0)
			_common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
		})
		_common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.select_activeRowInContainer(cnt.uuid.REQUEST_FOR_QUOTE)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 1)
			_common.setup_gridLayout(cnt.uuid.BIDDERS, CONTAINER_COLUMNS_BIDDERS)
		})
		_common.clear_subContainerFilter(cnt.uuid.BIDDERS)
		_common.create_newRecord(cnt.uuid.BIDDERS)
		_package.addBusinessPartnerToRequisition(cnt.uuid.BIDDERS, CommonLocators.CommonLabels.ASSIGN_BUSINESS_PARTNER, CONTAINERS_BIDDERS.BUSINESS_PARTNER)
		cy.SAVE()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
		_common.changeStatus_fromModal(CommonLocators.CommonKeys.PUBLISHED);
		cy.SAVE();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
		_rfqPage.create_quote_fromWizard([CONTAINERS_BIDDERS.BUSINESS_PARTNER], [CommonLocators.CommonKeys.CHECK])
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_QUOTE)
	});

	it('TC - Verify creation of project document record and change status of it', function () {
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
		})
		_common.clear_subContainerFilter(cnt.uuid.QUOTES)
		_common.getText_fromCell(cnt.uuid.QUOTES, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env("QUOTE_CODE", $ele1.text())
			cy.log(Cypress.env("QUOTE_CODE"))
		})
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 1);
			_common.setup_gridLayout(cnt.uuid.PROJECT_DOCUMENTS, CONTAINER_COLUMNS_PROJECT_DOCUMENT)
			_common.set_columnAtTop([CONTAINER_COLUMNS_PROJECT_DOCUMENT.prjdocumentstatusfk], cnt.uuid.PROJECT_DOCUMENTS)
		})
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
		})
		cy.then(() => {
			_common.search_inSubContainer(cnt.uuid.QUOTES, Cypress.env("QUOTE_CODE"))
			_common.select_rowHasValue(cnt.uuid.QUOTES, Cypress.env("QUOTE_CODE"))
		})
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 1);
		})
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS)
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		_common.waitForLoaderToDisappear()
		_common.edit_containerCell(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, DOC_DESC_1);
		cy.SAVE();
		_common.search_inSubContainer(cnt.uuid.PROJECT_DOCUMENTS, CommonLocators.CommonKeys.NEW);
		_common.select_allContainerData(cnt.uuid.PROJECT_DOCUMENTS);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
		_common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, CommonLocators.CommonKeys.APPROVED);
	})

	it('TC - Verify creation of multiple project document record and change status of it', function () {
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS)
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		_common.waitForLoaderToDisappear()
		_common.edit_containerCell(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, DOC_DESC_2);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.PROJECT_DOCUMENTS, CommonLocators.CommonKeys.NEW);
		_common.select_allContainerData(cnt.uuid.PROJECT_DOCUMENTS);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
		_common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS);
		_common.search_inSubContainer(cnt.uuid.PROJECT_DOCUMENTS, DOC_DESC_2);
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, CommonLocators.CommonKeys.APPROVED);
	});

	it('TC - Verify message added to history of project document in quote', function () {
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROJECT_DOCUMENTS)
		_common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS);
		_common.waitForLoaderToDisappear()
		_common.edit_containerCell(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, DOC_DESC_3);
		cy.SAVE();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
		_common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED, CONTAINERS_PROJECT_DOCUMENT.REMARK);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, DOC_DESC_3);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
		_common.clickOn_modalFooterButton(btn.ButtonText.HISTORY)
		_validate.validate_Text_In_Modal(app.GridCells.REMARK, CONTAINERS_PROJECT_DOCUMENT.REMARK);
		_common.clickOn_modalFooterButton(btn.ButtonText.CLOSE)
	});
	
});
