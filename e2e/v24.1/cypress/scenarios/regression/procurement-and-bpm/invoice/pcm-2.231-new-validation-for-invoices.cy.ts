import { tile, app, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _controllingUnit, _projectPage, _procurementPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';
import { random } from 'cypress/types/lodash';

const allure = Cypress.Allure.reporter.getInterface();
const CU_DESC = 'CU_DESC' + Cypress._.random(0, 999)
const EST_DESC = "EST_DESC-" + Cypress._.random(0, 999)
const LI_DESC = "LI_DESC-" + Cypress._.random(0, 999)
const INVOICECODE = "IN-" + Cypress._.random(0, 999)

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
let PROJECTS_PARAMETERS: DataCells;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let MATERIAL_RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_PACKAGE
let CONTAINER_COLUMNS_ITEMS
let CONTAINERS_PES

let CONTAINER_COLUMNS_PROCUREMENTCONTRACT
let CONTAINERS_PROCUREMENTCONTRACT
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS: DataCells
let CONTAINERS_INVOICE
let CONTAINER_COLUMNS_INVOICEHEADER
let CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS
let CONTAINER_COLUMNS_RECONCILIATION
let CONTAINERS_REJECTIONS
let CONTAINER_COLUMNS_REJECTIONS
let CONTAINER_COLUMNS_BILLING_SCHEMA;
let CONTAINERS_INVOICE_RECONCILLIATION
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINERS_INVOICE_BILLING_SCHEMA
let CONTAINER_COLUMNS_OTHER_SERVICES, CONTAINERS_GENERALS_INVOICE, CONTAINER_COLUMNS_GENERALS_INVOICE

allure.epic('PROCUREMENT AND BPM');
allure.feature('Invoice');
allure.story('PCM- 2.231 | New validation for invoices');
describe('PCM- 2.231 | New validation for invoices', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.231-new-validation-for-invoices.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(
			Cypress.env('adminUserName'),
			Cypress.env('adminPassword'),
			Cypress.env('parentCompanyName'),
			Cypress.env('childCompanyName')
		);
		cy.fixture('pcm/pcm-2.231-new-validation-for-invoices.json').then((data) => {
			this.data = data;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
			CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
			CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT,

				PROJECTS_PARAMETERS = {
					[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
					[commonLocators.CommonLabels.NAME]: PRJ_NAME,
					[commonLocators.CommonLabels.CLERK]: CLERK_NAME,
				}
			CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CU_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
			}
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			};
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
			};
			MATERIAL_RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,

			}

			CONTAINERS_GENERALS_INVOICE = this.data.CONTAINERS.GENERALS_INVOICE
			CONTAINER_COLUMNS_GENERALS_INVOICE = this.data.CONTAINER_COLUMNS.GENERALS_INVOICE;

			CONTAINERS_PES = this.data.CONTAINERS.PES
			CONTAINERS_INVOICE = this.data.CONTAINERS.INVOICE
			CONTAINER_COLUMNS_INVOICEHEADER = this.data.CONTAINER_COLUMNS.INVOICEHEADER
			CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE

			CONTAINERS_PROCUREMENTCONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT
			CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT
			CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS = this.data.CONTAINER_COLUMNS.PERFORMANCE_ENTRY_SHEETS
			CONTAINER_COLUMNS_RECONCILIATION = this.data.CONTAINER_COLUMNS.RECONCILIATION
			CONTAINERS_INVOICE_RECONCILLIATION = this.data.CONTAINERS.INVOICE_RECONCILLIATION
			CONTAINERS_REJECTIONS = this.data.CONTAINERS.REJECTIONS
			CONTAINER_COLUMNS_REJECTIONS = this.data.CONTAINER_COLUMNS.REJECTIONS
			CONTAINER_COLUMNS_BILLING_SCHEMA = this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
			CONTAINERS_INVOICE_BILLING_SCHEMA = this.data.CONTAINERS.INVOICE_BILLING_SCHEMA
			CONTAINER_COLUMNS_OTHER_SERVICES = this.data.CONTAINER_COLUMNS.OTHER_SERVICES
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()

			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.clear_subContainerFilter(cnt.uuid.PROJECTS)
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
			cy.SAVE();
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

		});
	});
	    after(() => {
			cy.LOGOUT();
		});
	it("TC - Create controlling unit", function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CU_CODE")
		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()

	});
	it('TC - Create new estimate', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
	});
	it('TC - Create new line item with quantity', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()

	});
	it('TC - Assign resource to the line item', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES)
		_common.create_newRecord(cnt.uuid.RESOURCES)
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, MATERIAL_RESOURCE_PARAMETERS)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create material package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
		_estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
		_common.waitForLoaderToDisappear()
		cy.wait(1000)

		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
			_common.waitForLoaderToDisappear()
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
		_common.waitForLoaderToDisappear()
		_common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
	});

	it('TC - Create Contract from package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_common.waitForLoaderToDisappear()
		cy.wait(1000)//required waits
		_package.create_ContractfromPackage(CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER);
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)

		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)

		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CLERK_NAME)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CU_CODE"))
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		cy.SAVE();

	});
	it('TC - Create PES', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		cy.SAVE();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_procurementPage.getCode_fromPESModal("PES_CODE")
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
			_common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS);
			_common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_ITEMS);
		});
	});

	it('TC - Create invoice from wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
		cy.wait(1000)//required wait
		_common.waitForLoaderToDisappear()
		_common.changeStatus_fromModal(sidebar.SideBarOptions.ACCEPTION)
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
		_package.enterRecord_toCreate_Invoice_FromWizard(CONTAINERS_INVOICE.LABEL, INVOICECODE);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO);

		cy.REFRESH_CONTAINER()
		cy.wait(1000)//required wait
		_common.waitForLoaderToDisappear()
	});
	it('TC-Create generals for invoice', function () {

		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.setDefaultView(app.TabBar.INVOICES)
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER);
			_common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICEHEADER);
		});
		_common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.INVOICEHEADER, INVOICECODE)
		_common.select_rowInContainer(cnt.uuid.INVOICEHEADER)
		_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, INVOICECODE)

		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.GENERALS_INVOICE, app.FooterTab.GENERALS);
			_common.setup_gridLayout(cnt.uuid.GENERALS_INVOICE, CONTAINER_COLUMNS_GENERALS_INVOICE)
		});
		_common.create_newRecord(cnt.uuid.GENERALS_INVOICE)
		_common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_INVOICE, app.GridCells.PRC_GENERALS_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_GENERALS_INVOICE.type1)
		cy.SAVE()
		_common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_INVOICE, app.GridCells.PRC_GENERALS_TYPE_FK, CONTAINERS_GENERALS_INVOICE.type1)
		cy.REFRESH_CONTAINER()
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.VALIDATIONS, app.FooterTab.VALIDATIONS);
		});
		_common.select_rowInContainer(cnt.uuid.VALIDATIONS)
		_common.assert_cellData_insideActiveRow(cnt.uuid.VALIDATIONS, app.GridCells.MEASSAGE_SEVERITY_FK, CONTAINERS_GENERALS_INVOICE.msgSeveity)
		_common.assert_cellData_insideActiveRow(cnt.uuid.VALIDATIONS, app.GridCells.MESSAGE, CONTAINERS_GENERALS_INVOICE.msg)

	})
	it('TC- Verify Billing schema', function () {
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.GENERALS_INVOICE, app.FooterTab.GENERALS);
		});
		_common.create_newRecord(cnt.uuid.GENERALS_INVOICE)
		_common.edit_dropdownCellWithCaret(cnt.uuid.GENERALS_INVOICE, app.GridCells.PRC_GENERALS_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_GENERALS_INVOICE.type2)
		_common.enterRecord_inNewRow(cnt.uuid.GENERALS_INVOICE, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS_INVOICE.value)
		cy.SAVE()
		_common.assert_cellData_insideActiveRow(cnt.uuid.GENERALS_INVOICE, app.GridCells.PRC_GENERALS_TYPE_FK, CONTAINERS_GENERALS_INVOICE.type2)
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA);
		});
		_common.clickOn_toolbarButton(cnt.uuid.INVOICE_BILLING_SCHEMA, btn.ToolBar.ICO_RECALCULATE)
		cy.wait(2000)//required wait
		_common.select_rowHasValue(cnt.uuid.INVOICE_BILLING_SCHEMA, CONTAINERS_GENERALS_INVOICE.type2)
		_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.VALUE, CONTAINERS_GENERALS_INVOICE.value)

	})
})