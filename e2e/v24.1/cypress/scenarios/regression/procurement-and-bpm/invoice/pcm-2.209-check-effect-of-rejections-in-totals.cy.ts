import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _rfqPage, _procurementContractPage, _saleContractPage, _validate, _procurementPage, _procurementConfig } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import common from "mocha/lib/interfaces/common";


// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_HEADER = "1EST-" + Cypress._.random(0, 999)
const EST_CODE = "EST_-" + Cypress._.random(0, 999)
const LINEITEM1_EST = "1ESTLI-" + Cypress._.random(0, 999)
const CONTRACT_CODE01 = "CONT_CODE-01"
const INVOICECODE = "RNM_INV-" + Cypress._.random(0, 999)
const CONTROLLING_UNIT = "RNM_CU-" + Cypress._.random(0, 999)
const CLERK_INPUT = "HS"
const PES_CODEIN = "PES01"
const CU_DESC = "CU_DESC" + Cypress._.random(0, 999)

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
const PRJ_NO = "NPRC" + Cypress._.random(0, 999);
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
let CONTAINER_COLUMNS_OTHER_SERVICES
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Invoice");
allure.story("PCM- 2.209 | Check effect of Rejections in totals.");

describe("PCM- 2.209 | Check effect of Rejections in totals.", () => {


	before(function () {
		cy.preLoading(Cypress.env("adminUserName"),
			Cypress.env("adminPassword"),
			Cypress.env("parentCompanyName"),
			Cypress.env("childCompanyName")
		);

		cy.fixture("pcm/pcm-2.209-check-effect-of-rejections-in-totals.json").then((data) => {
			this.data = data
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


		})
	});

	it("TC - Create Controlling Unit", function () {

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

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
		_common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0);
		});
		cy.REFRESH_CONTAINER()
		_common.select_rowHasValue(cnt.uuid.BILLING_SCHEMA, CONTAINERS_INVOICE_BILLING_SCHEMA.SHEMA_TYPE)
		_common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.BILLING_SCHEMA_DETAILS).toolbar(app.Layouts.SUB_VIEW_HEADER_TOOLBAR).findButton(btn.ToolBar.ACTIONS).clickIn()
		_mainView.findButton(btn.ToolBar.ICO_TREE_LEVEL_COLLAPSE).clickIn()
		_common.select_dataFromSubContainer(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINERS_INVOICE_BILLING_SCHEMA.INVOICES)
		_mainView.findActiveRow().findButton(btn.IconButtons.ICO_TREE_COLLAPSE).clickIn()
		cy.SAVE()
		_common.select_dataFromSubContainer(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINERS_INVOICE_BILLING_SCHEMA.INVOICE_TYPE)
		cy.SAVE()
		_common.select_dataFromSubContainer(cnt.uuid.BILLING_SCHEMA_DETAILS, CONTAINERS_INVOICE_BILLING_SCHEMA.TOTAL_TYPE)
		cy.SAVE()
		_common.set_cellCheckboxValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.IS_TURNOVER, commonLocators.CommonKeys.CHECK)
		cy.SAVE()
	});

	it("TC - Create an Estimate Header, Create a new Line item and Assign Material Resources to Line Item", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
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

	it("TC - Create a Material Package", function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
		_estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
		_common.waitForLoaderToDisappear()
		cy.wait(1000)

		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 4);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();


	});

	it("TC - Create a Contract from Material Package.", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION)
		_procurementConfig.changeProcurementConfiguration_FromWizard(sidebar.SideBarOptions.MATERIAL, btn.ButtonText.YES)
		cy.SAVE()
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
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)

		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)

		_common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env(CONTRACT_CODE01, $ele1.text())
			cy.log(Cypress.env(CONTRACT_CODE01))
		})
		cy.SAVE().then(() => {
			_common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
			_common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
		})
		// _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.REQUISITION_OWNER, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CLERK_NAME)
		cy.SAVE()
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CLERK_NAME)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CU_CODE"))
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTRACTDETAIL, app.FooterTab.CONTRACTDETAILS, 2);
		});
		_common.waitForLoaderToDisappear()
		_package.get_netValueOf_ContractDetail()


	});

	it("TC - Create a PES from Contract.", function () {

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
		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
			_common.setDefaultView(app.TabBar.PERFORMANCEENTRYSHEET)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS);
			_common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_ITEMS);
		});

		_common.clear_subContainerFilter(cnt.uuid.ITEMS)
		_common.maximizeContainer(cnt.uuid.ITEMS)
		_common.select_rowHasValue(cnt.uuid.ITEMS, CONTAINERS_RESOURCE.CODE)
		_common.edit_containerCell(cnt.uuid.ITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES.QUANTITY)
		cy.SAVE()
		_common.minimizeContainer(cnt.uuid.ITEMS)
		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
			_common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS);

		});
		_common.select_rowInContainer(cnt.uuid.HEADERS)
		_common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env("PES_TOTAL", $ele1.text())
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
		cy.wait(1000)//required wait
		_common.waitForLoaderToDisappear()
		_common.changeStatus_fromModal(sidebar.SideBarOptions.ACCEPTION)
		_common.waitForLoaderToDisappear()
	});

	it("TC - Add Rejection, Other Service, Invoice Amount, etc.", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
		_package.enterRecord_toCreate_Invoice_FromWizard(CONTAINERS_INVOICE.LABEL, INVOICECODE);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		/* 		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO); */
		_common.clear_searchInSidebar()
		cy.wait(1000)//required wait
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER);
			_common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICEHEADER);
			_common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
		});
		_common.search_inSubContainer(cnt.uuid.INVOICEHEADER, INVOICECODE)
		cy.REFRESH_CONTAINER()
		_common.select_rowInContainer(cnt.uuid.INVOICEHEADER)

		_common.enterRecord_inNewRow(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INVOICE.AMOUNT)
		cy.SAVE()
		_common.getText_fromCell(cnt.uuid.INVOICEHEADER, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env("Invoice_Amount", $ele1.text())
		})
		cy.log(Cypress.env("Invoice_Amount"))
		cy.SAVE()
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 2)
		})
		cy.SAVE().then(() => {
			_common.clickOn_toolbarButton(cnt.uuid.INVOICE_BILLING_SCHEMA, btn.ToolBar.ICO_RECALCULATE)
			_common.waitForLoaderToDisappear()
			cy.wait(2000)
			/*This wait here is mandatory, As values take time to reflect after recalculation.*/
		})
		cy.SAVE().then(() => {
			_common.select_rowHasValue(cnt.uuid.INVOICE_BILLING_SCHEMA, CONTAINERS_INVOICE_BILLING_SCHEMA.TOTAL_TYPE)
			_common.waitForLoaderToDisappear()
			_common.select_rowHasValue(cnt.uuid.INVOICE_BILLING_SCHEMA, CONTAINERS_INVOICE_BILLING_SCHEMA.TOTAL_TYPE)

			_common.getText_fromCell(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.RESULT).then(($ele1: JQuery<HTMLElement>) => {
				Cypress.env("Billing_Schema1", $ele1.text().replace(",", ""))
			})
		})
		cy.log("BillingSchema1=>" + Cypress.env("Billing_Schema1"))
		cy.SAVE()
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REJECTIONS, app.FooterTab.REJECTIONS, 2)
			_common.setup_gridLayout(cnt.uuid.REJECTIONS, CONTAINER_COLUMNS_REJECTIONS)
		})
		_common.clear_subContainerFilter(cnt.uuid.REJECTIONS)
		_common.create_newRecord(cnt.uuid.REJECTIONS, 2)
		_common.enterRecord_inNewRow(cnt.uuid.REJECTIONS, app.GridCells.AMOUNT_NET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INVOICE.REJECTIONS_AMOUNT)
		cy.SAVE()
		_common.getText_fromCell(cnt.uuid.REJECTIONS, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env("Rejections", $ele1.text().replace(",", ""))
		})
		cy.log("Rejection=>" + Cypress.env("Rejections"))
		cy.SAVE()
		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.OTHER_SERVICES, app.FooterTab.OTHER_SERVICES, 1)
			_common.setup_gridLayout(cnt.uuid.OTHER_SERVICES, CONTAINER_COLUMNS_OTHER_SERVICES)
		})
		_common.clear_subContainerFilter(cnt.uuid.OTHER_SERVICES)
		_common.create_newRecord(cnt.uuid.OTHER_SERVICES, 1)
		_common.edit_dropdownCellWithInput(cnt.uuid.OTHER_SERVICES, app.GridCells.PRC_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_INVOICE.STRUCTURE)
		cy.SAVE()
		_common.getText_fromCell(cnt.uuid.OTHER_SERVICES, app.GridCells.AMOUNT_NET).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env("Other_Service", $ele1.text().replace(",", ""))
		})
		cy.log("OtherService=>" + Cypress.env("Other_Service"))
		cy.SAVE()
	});

	it("TC - Verify effect of Rejections & Other Services in Invoice Totals.", function () {

		_common.openTab(app.TabBar.APPLICATION).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICE_RECONCILLIATION, app.FooterTab.RECONCILLIATION, 3)
		})
		cy.SAVE().then(() => {
			_common.clickOn_toolbarButton(cnt.uuid.INVOICE_BILLING_SCHEMA, btn.ToolBar.ICO_RECALCULATE)
			/*This wait here is mandatory, As values take time to reflect after recalculation.*/
			cy.wait(3000)
		})
		cy.SAVE().then(() => {
			_common.select_rowHasValue(cnt.uuid.INVOICE_BILLING_SCHEMA, CONTAINERS_INVOICE_BILLING_SCHEMA.TOTAL_TYPE)
			_common.getText_fromCell(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.RESULT).then(($ele1: JQuery<HTMLElement>) => {
				Cypress.env("Billing_Schema2", $ele1.text())
				cy.log("BillingSchema2=>" + Cypress.env("Billing_Schema2"))
			})
			const Totals1 = parseFloat(Cypress.env("Other_Service")) + parseFloat(Cypress.env("Billing_Schema1"))
			cy.log("Total=>" + Totals1)
			_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.RESULT, Totals1.toFixed(2).toString())
			_common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_RECONCILLIATION.OTHERS_AMOUNT)
			_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("Other_Service"))
			_common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_RECONCILLIATION.REJECTIONS)
			_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Cypress.env("Rejections"))
			_common.select_rowHasValue(cnt.uuid.INVOICE_RECONCILLIATION, CONTAINERS_INVOICE_RECONCILLIATION.FROM_BILLING_SCHEMA)
			_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_RECONCILLIATION, app.GridCells.RECON_NET, Totals1.toFixed(2).toString())
		})
	});

	after(() => {
		cy.LOGOUT();
	})

})