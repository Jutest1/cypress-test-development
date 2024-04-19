import AppLayout from 'cypress/locators/app-layout';
import { _modalView, _rfqPage, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _materialPage, _controllingUnit, _procurementPage } from 'cypress/pages';
import { SalesPage } from 'cypress/pages/module/sales/sales/sales-page';

import cypress from 'cypress';
import { tile, cnt, app, btn, sidebar, commonLocators } from 'cypress/locators';
import { DataCells } from 'cypress/pages/interfaces';
const allure = Cypress.Allure.reporter.getInterface();
const CU_DESC = 'CU_DESC-' + Cypress._.random(0, 999);



const INVOICE_NO = 'INVOICE_NO-' + Cypress._.random(0, 999);
const copyinvoice = 'COPY-INVOICE_NO-' + Cypress._.random(0, 999);

const CONFIRMED_TOTAL = 'CONFIRMED_TOTAL',
	Defaultreason = 'Defaultreason',
	DefaultDescription = 'DefaultDescription';

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
allure.epic('PROCUREMENT AND BPM');
allure.feature('Invoice');
allure.story("PCM- 2.139 | Add rejection's while generation of invoice");
describe("PCM- 2.139 |  Add rejection's while generation of invoice", () => {

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture("pcm/pcm-2.139-add-rejection's-while-generation-of-invoice.json").then((data) => {
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
			CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
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


			CONTAINERS_PES = this.data.CONTAINERS.PES
			CONTAINERS_INVOICE = this.data.CONTAINERS.INVOICE
			CONTAINER_COLUMNS_INVOICEHEADER = this.data.CONTAINER_COLUMNS.INVOICEHEADER

			CONTAINERS_PROCUREMENTCONTRACT = this.data.CONTAINERS.PROCUREMENTCONTRACT
			CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT
			CONTAINER_COLUMNS_PERFORMANCE_ENTRY_SHEETS = this.data.CONTAINER_COLUMNS.PERFORMANCE_ENTRY_SHEETS
			CONTAINER_COLUMNS_RECONCILIATION = this.data.CONTAINER_COLUMNS.RECONCILIATION

			CONTAINERS_REJECTIONS = this.data.CONTAINERS.REJECTIONS
			CONTAINER_COLUMNS_REJECTIONS = this.data.CONTAINER_COLUMNS.REJECTIONS

			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()

		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC -Verify Create new project', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
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
	it('TC -Verify Assign controlling unit', function () {
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
	it('TC - Create new Estimate and line items ', function () {
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

	it('TC - Add Resource for selected line item', function () {
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
	it('TC - Create Material Package from Estimate', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
		_estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
		_common.waitForLoaderToDisappear()
		cy.wait(1000)
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
		//	_common.setup_gridLayout(cnt.uuid.PACKAGE, PACKAGE);
		});
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

		})
		_common.select_rowInContainer(cnt.uuid.PACKAGE)
		cy.SAVE();
		_common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE, app.GridCells.STRUCTURE_FK, "grid", app.InputFields.INPUT_GROUP_CONTENT, "Material")
		cy.wait(3000)
		cy.SAVE();
		cy.wait(2000)
		_materialPage.clickOn_modalButtons("Change Structure", "Yes")
		cy.wait(2000)
		cy.SAVE();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
		_common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});
	it('TC - Create Requisition from Package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
		_modalView.findModal().acceptButton(btn.ButtonText.GO_TO_REQUISITION);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		cy.wait(2000)
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

		_common.select_rowInContainer(cnt.uuid.REQUISITIONS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		cy.SAVE();
		cy.wait(5000);
	});
	it('TC - Create Contract from requisition wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_package.create_ContractfromPackage(CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER);

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, "ContractCode")
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PAYMENT_TERM_FI_FK, "PAYMENT_TERM_FI")
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.BILLING_SCHEMA_FK, "BILLINGSCHEMA")

		cy.wait(2000)
	});
	it('TC - Change Contract Status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);

		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_procurementPage.getCode_fromPESModal("PES_CODE")
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
	});

	it('TC - Change ITEM Quantity In PES', function () {

		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
			_common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET);
			_common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.select_rowInContainer(cnt.uuid.HEADERS);
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.saveCellDataToEnv(cnt.uuid.HEADERS, app.GridCells.CODE, "PES_ENV");

		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS, 2)
			_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
			_common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_ITEMS);
		})
		_common.set_columnAtTop([CONTAINER_COLUMNS_ITEMS.quantity,CONTAINER_COLUMNS_ITEMS.totalgross,CONTAINER_COLUMNS_ITEMS.vat,CONTAINER_COLUMNS_ITEMS.totaloc],cnt.uuid.ITEMS)
    _common.maximizeContainer(cnt.uuid.ITEMS)
    _common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		cy.wait(1000)//required Waits
		_common.select_rowInContainer(cnt.uuid.ITEMS)
		_common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, "150.00")
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	
		_common.select_rowInContainer(cnt.uuid.ITEMS)
		_common.saveCellDataToEnv(cnt.uuid.ITEMS, app.GridCells.TOTAL_GROSS_SMALL, "PES_ENV_TG")
		_common.saveCellDataToEnv(cnt.uuid.ITEMS, app.GridCells.VAT, "PES_ENV_VAT")
		_common.saveCellDataToEnv(cnt.uuid.ITEMS, app.GridCells.TOTAL_OC, "PES_ENV_OC")
		_common.minimizeContainer(cnt.uuid.ITEMS)
	});

	it('TC - Change PES Status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
		cy.wait(1000)
		_common.changeStatus_fromModal(sidebar.SideBarOptions.ACCEPTION)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
	});

	it('TC - Create invoice from wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
		_package.enterRecord_toCreate_Invoice_FromWizard("Create one invoice per PES", INVOICE_NO)
	});

	it('TC - Verify Invoice header records', function () {
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER);
			_common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICEHEADER);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NO)
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.INVOICEHEADER)
		_common.maximizeContainer(cnt.uuid.INVOICEHEADER)

		_common.edit_containerCell(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.AMOUNT);

		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.minimizeContainer(cnt.uuid.INVOICEHEADER);
	});

	it('TC - Verify Add rejection button and delete button is working', function () {
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REJECTIONS, app.FooterTab.REJECTIONS, 2);
			_common.setup_gridLayout(cnt.uuid.REJECTIONS, CONTAINER_COLUMNS_REJECTIONS);
		});
		_common.create_newRecord(cnt.uuid.REJECTIONS);
		_common.edit_containerCell(cnt.uuid.REJECTIONS, app.GridCells.QUANTITY_CONFIRMED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.QUANTITY_CONFIRMED);
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.edit_containerCell(cnt.uuid.REJECTIONS, app.GridCells.PRICE_CONFIRMED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.PRICE_CONFIRMED);
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		cy.SAVE();
		_common.saveCellDataToEnv(cnt.uuid.REJECTIONS, app.GridCells.CONFIRMED_TOTAL, DefaultDescription);
		_common.saveCellDataToEnv(cnt.uuid.REJECTIONS, app.GridCells.CONFIRMED_TOTAL, Defaultreason);

		_common.assert_cellDataByContent_inContainer(cnt.uuid.REJECTIONS, app.GridCells.PRICE_CONFIRMED, CONTAINERS_REJECTIONS.PRICE_CONFIRMED);
		_common.delete_recordFromContainer(cnt.uuid.REJECTIONS);
		_common.clickOn_toolbarButton(cnt.uuid.REJECTIONS,btn.IconButtons.ICO_REC_DELETE)
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		cy.SAVE();
		_validate.verify_recordNotPresentInContainer(cnt.uuid.REJECTIONS, CONTAINERS_REJECTIONS.PRICE_CONFIRMED);
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
	});
	it('TC - Verify item description default to reason. description, if reason is change, the items description should be changed too', function () {
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REJECTIONS, app.FooterTab.REJECTIONS, 2);
		});
		_common.create_newRecord(cnt.uuid.REJECTIONS);
		cy.SAVE();
		cy.wait(2000);
		expect(Cypress.env('Defaultreason')).equal(Cypress.env('DefaultDescription'));
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.edit_dropdownCellWithCaret(cnt.uuid.REJECTIONS, app.GridCells.INV_REJECTION_REASON_FK, commonLocators.CommonKeys.LIST, CONTAINERS_REJECTIONS.REASON);
		_common.edit_containerCell(cnt.uuid.REJECTIONS, app.GridCells.QUANTITY_CONFIRMED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.QUANTITY_CONFIRMED_2);
		_common.edit_containerCell(cnt.uuid.REJECTIONS, app.GridCells.PRICE_CONFIRMED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.PRICE_CONFIRMED);
	
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.select_rowHasValue(cnt.uuid.REJECTIONS,CONTAINERS_REJECTIONS.REASON)
		_common.select_activeRowInContainer(cnt.uuid.REJECTIONS)
		_common.assert_cellDataByContent_inContainer(cnt.uuid.REJECTIONS, app.GridCells.DESCRIPTION, 'Material damaged');
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.REJECTIONS, CONTAINERS_REJECTIONS.QUANTITY_CONFIRMED_2, CONTAINERS_REJECTIONS.PRICE_CONFIRMED, app.GridCells.CONFIRMED_TOTAL);
	
	});

	it('TC - Verify Add rejection record', function () {
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.delete_recordFromContainer(cnt.uuid.REJECTIONS);
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REJECTIONS, app.FooterTab.REJECTIONS, 2);
		});
		_common.create_newRecord(cnt.uuid.REJECTIONS);
		_common.edit_containerCell(cnt.uuid.REJECTIONS, app.GridCells.QUANTITY_CONFIRMED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.QUANTITY_CONFIRMED);
		_common.edit_containerCell(cnt.uuid.REJECTIONS, app.GridCells.PRICE_CONFIRMED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.PRICE_CONFIRMED);
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		cy.SAVE();
		_common.saveCellDataToEnv(cnt.uuid.REJECTIONS, app.GridCells.CONFIRMED_TOTAL, CONFIRMED_TOTAL);
	});
	it('TC - Verify reconciliation calculation is correct', function () {
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RECONCILIATION, app.FooterTab.RECONCILIATION, 3);
			_common.setup_gridLayout(cnt.uuid.RECONCILIATION, CONTAINER_COLUMNS_RECONCILIATION);
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, 'Rejections');
		_common.assert_cellData_insideActiveRow(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET, Cypress.env('CONFIRMED_TOTAL'));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NAME, 'PES');
		_common.waitForLoaderToDisappear()
		cy.wait(1000)
		_common.assert_cellData_insideActiveRow(cnt.uuid.RECONCILIATION, app.GridCells.RECON_NET, Cypress.env('PES_ENV_OC'));
	});
	it('Verify Balance total in Reconciliation', function () {
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RECONCILIATION, app.FooterTab.RECONCILIATION, 3);
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_validate.verifyCalculationForRejection(cnt.uuid.RECONCILIATION);
		
	});

	it('Verify set value to rejection, the columns in this contianer will be read only, and fields will show value for select rejection', function () {
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REJECTIONS, app.FooterTab.REJECTIONS, 2);
		});
		_common.delete_recordFromContainer(cnt.uuid.REJECTIONS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 2);
		});
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.maximizeContainer(cnt.uuid.INVOICEHEADER);
		_common.clickOn_toolbarButton(cnt.uuid.INVOICEHEADER, btn.ToolBar.ICO_REC_NEW_COPY);
		cy.wait(2000);
		_common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, copyinvoice);
		cy.SAVE();
		cy.wait(3000);
		_common.minimizeContainer(cnt.uuid.INVOICEHEADER);
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REJECTIONS, app.FooterTab.REJECTIONS, 2);
		});
		_common.create_newRecord(cnt.uuid.REJECTIONS);
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.edit_dropdownCellWithCaret(cnt.uuid.REJECTIONS, app.GridCells.INV_REJECTION_REASON_FK, commonLocators.CommonKeys.LIST, CONTAINERS_REJECTIONS.REASON);
		_common.edit_containerCell(cnt.uuid.REJECTIONS, app.GridCells.QUANTITY_CONFIRMED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.QUANTITY_CONFIRMED_2);
		_common.edit_containerCell(cnt.uuid.REJECTIONS, app.GridCells.PRICE_CONFIRMED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REJECTIONS.PRICE_CONFIRMED);
		_common.edit_dropdownCellWithCaret(cnt.uuid.REJECTIONS, app.GridCells.UOM_FK, commonLocators.CommonKeys.GRID, CONTAINERS_REJECTIONS.UoM);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER, 2);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, INVOICE_NO);

		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REJECTIONS, app.FooterTab.REJECTIONS, 2);
		});
		_common.create_newRecord(cnt.uuid.REJECTIONS);
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		_common.edit_dropdownCellWithCaret(cnt.uuid.REJECTIONS, app.GridCells.INV_REJECTION_REASON_FK, commonLocators.CommonKeys.LIST, CONTAINERS_REJECTIONS.REASON);
		_common.waitForLoaderToDisappear()
		cy.wait(1000); //required Wait
		cy.SAVE();
	});
});
