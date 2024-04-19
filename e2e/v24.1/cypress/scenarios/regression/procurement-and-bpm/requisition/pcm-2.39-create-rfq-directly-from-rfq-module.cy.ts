import { tile, app, cnt, sidebar, commonLocators } from 'cypress/locators';
import { _common, _estimatePage, _mainView, _modalView, _package, _procurementPage, _projectPage, _rfqPage, _validate } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
var material_resource1, material_resource2, material_price1, material_price2;
var req_code = 'req_code';
var req_code1 = 'req_code1';
var price1 = 'price';
var price2 = 'price';
var price3 = 'price';
var material_price1: any = 0.0;
var material_price2: any = 0.0;
var actual_price: any = 0.0;
var total_price: any = 0.0;
let REQUISITION_PARAMETERS: DataCells;
let REQUISITION_ITEM_PARAMETER: DataCells;
let REQUISITION_PARAMETERS_2: DataCells;
let REQUISITION_ITEM_PARAMETER_2: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINERS_REQUISITION_ITEMS;
let CONTAINER_COLUMNS_REQUISITION_ITEMS;
let CONTAINERS_REQUEST_FOR_QUOTE;
let CONTAINER_COLUMNS_REQUEST_FOR_QUOTE;
let CONTAINERS_REQUISITION_TOTALS;
let CONTAINER_COLUMNS_REQUISITION_TOTALS;
let PROJECTS_PARAMETERS: DataCells
const PROJECT_NO = "RP" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
let CONTAINERS_PROCUREMENTCONTRACT;
let CONTAINER_COLUMNS_PROCUREMENTCONTRACT;
allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 2.39 | Create rfq directly from rfq module');

describe('PCM- 2.39 | Create rfq directly from rfq module', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.39-create-rfq-directly-from-rfq-module.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.39-create-rfq-directly-from-rfq-module.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
			CONTAINER_COLUMNS_REQUISITION_ITEMS = this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
			CONTAINERS_REQUISITION_ITEMS = this.data.CONTAINERS.REQUISITION_ITEMS;
			CONTAINER_COLUMNS_REQUEST_FOR_QUOTE = this.data.CONTAINER_COLUMNS.REQUEST_FOR_QUOTE
			CONTAINERS_REQUEST_FOR_QUOTE = this.data.CONTAINERS.REQUEST_FOR_QUOTE;
			CONTAINERS_REQUISITION_TOTALS = this.data.CONTAINERS.REQUISITION_TOTALS;
			CONTAINER_COLUMNS_REQUISITION_TOTALS = this.data.CONTAINER_COLUMNS.REQUISITION_TOTALS;
			REQUISITION_PARAMETERS = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
			}
			REQUISITION_PARAMETERS_2 = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
			}

			REQUISITION_ITEM_PARAMETER = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_REQUISITION_ITEMS.QUANTITY,
				[app.GridCells.IS_FREE_QUANTITY]: commonLocators.CommonKeys.CHECK,
			};
			REQUISITION_ITEM_PARAMETER_2 = {
				[app.GridCells.MDC_MATERIAL_FK]: CONTAINERS_REQUISITION_ITEMS.MATERIAL_CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_REQUISITION_ITEMS.QUANTITY,
				[app.GridCells.IS_FREE_QUANTITY]: commonLocators.CommonKeys.CHECK,
			};

			PROJECTS_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
				[commonLocators.CommonLabels.NAME]: PROJECT_DESC,
				[commonLocators.CommonLabels.CLERK]: CLERK
			}

			CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT
			CONTAINERS_PROCUREMENTCONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT;

			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.setDefaultView(app.TabBar.PROJECT)
				_common.waitForLoaderToDisappear()
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.clear_subContainerFilter(cnt.uuid.PROJECTS)
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
			_common.waitForLoaderToDisappear()
			cy.SAVE();
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create Requisition1', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000)
		_common.maximizeContainer(cnt.uuid.REQUISITIONS)
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "M")

		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK)
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.BUSINESS_PARTNER_NAME)
		cy.wait(1000)
		cy.SAVE()
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
		cy.SAVE();
		_common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env(req_code, $ele1.text());
			material_resource1 = Cypress.env(req_code);
		});
		_common.minimizeContainer(cnt.uuid.REQUISITIONS)


		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS)
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.maximizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.minimizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS);
		});
		_common.select_rowHasValue(cnt.uuid.REQUISITION_TOTALS, "Total");
		cy.wait(500);
		_common.saveCellDataToEnv(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET, "NetValue");

		_common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env(price1, $ele1.text());
			material_price1 = parseFloat(Cypress.env(price1));
			cy.log(material_price1);
		});

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
		cy.SAVE();
	});

	it('TC - Create Requisition2', function () {

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.maximizeContainer(cnt.uuid.REQUISITIONS)
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS_2);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "M")
		_common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK)
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.BUSINESS_PARTNER_NAME)
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		cy.SAVE()
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, 'Service Material');
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.getText_fromCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env(req_code1, $ele1.text());
			material_resource2 = Cypress.env(req_code1);
		});
		_common.minimizeContainer(cnt.uuid.REQUISITIONS)
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
		_common.maximizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
		_package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISITION_ITEM_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.minimizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS);
		});
		_common.select_rowHasValue(cnt.uuid.REQUISITION_TOTALS, "Total");
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.getText_fromCell(cnt.uuid.REQUISITION_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env(price2, $ele1.text());
			material_price2 = parseFloat(Cypress.env(price2));
			cy.log(material_price2);
		});
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
	});

	it('TC - Create RFQ', function () {
		actual_price = parseFloat(material_price1) + parseFloat(material_price2);
		cy.log('Actual Price');
		cy.log(actual_price);

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
		cy.wait(1000);
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.setDefaultView(app.TabBar.RFQ);
			_common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ)
			_common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_REQUEST_FOR_QUOTE);
			_common.waitForLoaderToDisappear()
			cy.wait(1000) //required Waits
		});
		_common.maximizeContainer(cnt.uuid.REQUEST_FOR_QUOTE);
		_common.search_inSubContainer(cnt.uuid.REQUEST_FOR_QUOTE, ' ');
		_common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE);
		_common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.REQUEST_FOR_QUOTE);

		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_IN_RFQ, app.FooterTab.REQUISITION)
			_common.waitForLoaderToDisappear()
		});
		_common.create_newRecord(cnt.uuid.REQUISITION_IN_RFQ);
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_IN_RFQ, app.GridCells.REQ_HEADER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env(req_code));
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		cy.SAVE()
	});

	it('TC - Assignment of Requisition in RFQ', function () {

		_common.create_newRecord(cnt.uuid.REQUISITION_IN_RFQ);
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_IN_RFQ, app.GridCells.REQ_HEADER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env(req_code1));
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.setDefaultView(app.TabBar.RFQ);
			_common.waitForLoaderToDisappear()
			cy.wait(1000) //required Waits
			_common.select_tabFromFooter(cnt.uuid.RFQ_TOTALS, app.FooterTab.TOTAL, 4);
		});
		_common.select_rowHasValue(cnt.uuid.RFQ_TOTALS, "Total");
		_common.getText_fromCell(cnt.uuid.RFQ_TOTALS, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env(price3, $ele1.text());
			total_price = parseFloat(Cypress.env(price3));
			cy.log(total_price);
			expect(total_price).equals(actual_price);
		});
		_common.openTab(app.TabBar.RFQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BIDDERS, app.FooterTab.BIDDERS)
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.maximizeContainer(cnt.uuid.BIDDERS);
		_common.select_rowInContainer(cnt.uuid.BIDDERS)
		_common.clear_subContainerFilter(cnt.uuid.BIDDERS)
		_common.assert_cellData_insideActiveRow(cnt.uuid.BIDDERS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BUSINESS_PARTNER_NAME);
		_common.maximizeContainer(cnt.uuid.BIDDERS);
	});
});
