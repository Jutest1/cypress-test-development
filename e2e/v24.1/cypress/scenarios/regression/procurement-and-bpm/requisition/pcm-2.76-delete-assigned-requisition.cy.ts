import { _common, _estimatePage, _projectPage, _validate, _mainView, _boqPage, _bidPage, _materialPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _rfqPage, _procurementPage } from 'cypress/pages';
import { app, tile, cnt, btn, sidebar, commonLocators } from 'cypress/locators';
import _ from 'cypress/types/lodash';
import { DataCells } from 'cypress/pages/interfaces';
const allure = Cypress.Allure.reporter.getInterface();
const REQDEC = 'REQDEC-' + Cypress._.random(0, 999);
let REQUISITION_PARAMETERS: DataCells;
let REQUISITION_ITEM_PARAMETERS: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINERS_REQUISITION_ITEM;
let CONTAINERS_PROCUREMENT_BOQ;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION_ITEM;
allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.76 | Delete assigned requisition');
describe('PCM- 2.76 | Delete assigned requisition', () => {
	beforeEach(function () {
		cy.fixture('procurement-and-bpm/pcm-2.76-delete-assigned-requisition.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('procurement-and-bpm/pcm-2.76-delete-assigned-requisition.json').then((data) => {
			this.data = data;
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
			CONTAINERS_REQUISITION_ITEM = this.data.CONTAINERS.REQUISITION_ITEM;
			CONTAINERS_PROCUREMENT_BOQ = this.data.CONTAINERS.PROCUREMENT_BOQ

			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINER_COLUMNS_REQUISITION_ITEM = this.data.CONTAINER_COLUMNS.REQUISITION_ITEM
			REQUISITION_PARAMETERS = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
				[app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_REQUISITION.BP
			};

			REQUISITION_ITEM_PARAMETERS = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEM.MATERIAL_NO,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_REQUISITION_ITEM.QUANTITY,
			};
		});

		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create requisition for respective project', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});

		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, REQDEC);
		cy.wait(500);
		cy.SAVE();
	});

	it('TC - Create requisition item for respective project', function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEM);
		});
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);

		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()

	});

	it('TC - Create RFQ ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);

		_common.waitForLoaderToDisappear()
		_rfqPage.createRFQInRequisitionFromWizard(CONTAINERS_REQUISITION.BP);

		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.setDefaultView(app.TabBar.RFQ)
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITIONS, 1);
			_common.waitForLoaderToDisappear()
		});
	});

	it('TC - Delete requisition item for respective RFQ', function () {
		_common.openTab(app.TabBar.RFQ).then(() => {
			cy.wait(1000);
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITIONS, 1);
		});
		_common.search_inSubContainer(cnt.uuid.REQUISITION_IN_RFQ, REQDEC);
		cy.wait(500);
		_common.delete_recordFromContainer(cnt.uuid.REQUISITION_IN_RFQ);
		_validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_IN_RFQ, REQDEC);
		cy.SAVE();
	});

	it('TC -change status and create quote and verify delete requisition ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
		_common.waitForLoaderToDisappear()
		_common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
		_common.waitForLoaderToDisappear()
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
		_rfqPage.create_quote_fromWizard([CONTAINERS_REQUISITION.BP], [commonLocators.CommonKeys.CHECK])
		_common.waitForLoaderToDisappear()
		_modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE);
		cy.wait(2000);
	});

	it('TC - Verify deleted requisition in quote and RFQ ', function () {
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.setDefaultView(app.TabBar.QUOTES);
			cy.wait(1000);
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS_FOR_QUOTE, app.FooterTab.REQUISITIONS, 2);
		});
		cy.wait(2000);
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS_FOR_QUOTE);
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS_FOR_QUOTE, REQDEC);
		_validate.verify_isRecordDeleted(cnt.uuid.REQUISITIONS_FOR_QUOTE, REQDEC);
		cy.wait(2000);
		_common.openTab(app.TabBar.QUOTES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES, 0)
		})
		_common.clickOn_goToButton_toSelectModule(cnt.uuid.QUOTES, sidebar.SideBarOptions.RFQ);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITIONS, 1);
			cy.wait(2000);
		});
		_common.search_inSubContainer(cnt.uuid.REQUISITION_IN_RFQ, REQDEC);
		_validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_IN_RFQ, REQDEC);
	});
});
