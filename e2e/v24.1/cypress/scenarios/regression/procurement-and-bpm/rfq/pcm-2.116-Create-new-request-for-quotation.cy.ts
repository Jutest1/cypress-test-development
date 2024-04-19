import { tile, app, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _common, _projectPage, _rfqPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package, _procurementConfig } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';
import { PACKAGE_TOTAL_TRANSLATION } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();

let PRJ_NO = "PRJ" + Cypress._.random(0, 999);
let PRJ_NAME = "TEST-" + PRJ_NO;
let CLERK_NAME = "HS";

const REQUISITIONS_CODE = "REQUISITIONS_CODE"
const BOQCODE = 'BoQ_' + Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let CREATEPROJECT_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_PACKAGE;
let CONTAINERS_QUOTE;

let REQUEST_FOR_QUOTE_PARAMETERS:DataCells;


allure.epic('PROCUREMENT AND BPM');
allure.feature('RFQ');
allure.story('PCM- 2.116 | Create new request for quotation');
describe('PCM- 2.116 | Create new request for quotation', () => {
	before(function () {
		cy.fixture('pcm/pcm-2.116-Create-new-request-for-quotation.json').then((data) => {
			this.data = data;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
			CONTAINERS_QUOTE= this.data.CONTAINERS.QUOTE
			CREATEPROJECT_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
				[commonLocators.CommonLabels.NAME]: PRJ_NAME,
				[commonLocators.CommonLabels.CLERK]: CLERK_NAME
			}
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
			};
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
			}
			REQUEST_FOR_QUOTE_PARAMETERS = {
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_QUOTE.BUSINESS_PARTNER_1,CONTAINERS_QUOTE.BUSINESS_PARTNER_2],
			}
		});
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		_common.openDesktopTile(tile.DesktopTiles.PROJECT);

	});
	it('TC - Create new project', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.create_newRecord(cnt.uuid.PROJECTS);
		_projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.wait(2000) // required wait
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
		_common.waitForLoaderToDisappear()
	})
	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create new estimate record', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
	});

	it("TC- Create new Line item record", function () {

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it("TC - Create new record in resource", function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create material package and change package status', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
		_package.enterRecord_toCreatePackage_wizard(CONTAINERS_PACKAGE.CRITERIA)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 2)
		})
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
		_procurementConfig.changeProcurementConfiguration_FromWizard(CONTAINERS_PACKAGE.CONFIGURATION, btn.ButtonText.YES);
		_package.changeStatus_ofPackage_inWizard()
	});

	it('TC - Create requisition from material package and change requisition status', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_REQUISITION)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.select_rowInContainer(cnt.uuid.REQUISITIONS);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE,REQUISITIONS_CODE)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.waitForLoaderToDisappear()
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
	});

	it('TC - Create RFQ from requisition', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
		_common.waitForLoaderToDisappear()
		_rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
		_common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_RFQ)
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify requisition status in RFQ and bidders in RFQ', function () {
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITIONS, 2);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_IN_RFQ, app.GridCells.REQ_HEADER_FK, REQUISITIONS_CODE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_IN_RFQ, app.GridCells.REQ_STATUS, CONTAINERS_QUOTE.REQ_STATUS);
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS, 2);
		});
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.BIDDERS, CONTAINERS_QUOTE.BUSINESS_PARTNER_1);
		_common.select_dataFromSubContainer(cnt.uuid.BIDDERS, CONTAINERS_QUOTE.BUSINESS_PARTNER_1);
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.BIDDERS)
		_common.waitForLoaderToDisappear()
		_common.select_dataFromSubContainer(cnt.uuid.BIDDERS, CONTAINERS_QUOTE.BUSINESS_PARTNER_2);
	})
})

