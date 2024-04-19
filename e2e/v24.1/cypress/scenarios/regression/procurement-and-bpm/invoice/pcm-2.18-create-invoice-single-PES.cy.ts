import { tile, app, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _materialPage, _procurementContractPage, _procurementPage, _projectPage, _controllingUnit } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';
import common from 'mocha/lib/interfaces/common';

const INVOICE_NO = "INVOICE_NO-" + Cypress._.random(0, 999);
const CU_DESC = "CU_DESC-" + Cypress._.random(0, 999);
const allure = Cypress.Allure.reporter.getInterface();
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
allure.epic('PROCUREMENT AND BPM');
allure.feature('Invoice');
allure.story('PCM- 2.18 | Create invoice-single PES');
describe('PCM- 2.18 | Create invoice-single PES', () => {

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.18-create-invoice-single-PES.json').then((data) => {
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

			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
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
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
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

	})

	it('TC - Create New Estimate Record', function () {
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
	});


	it('TC - Create new line item', function () {
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

	it("TC - Add Resource for selected line item", function () {
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
		cy.SAVE();
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();

		})
	});

	it('TC - Change status of the material package', function () {
		_common.clear_subContainerFilter(cnt.uuid.PACKAGE)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
		_common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
		cy.SAVE();
		cy.wait(2000)//required wait
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create contract from package', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_package.create_ContractfromPackage(CONTAINERS_PROCUREMENTCONTRACT.BUISNESS_PARTNER);

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT)
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO);

		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CLERK_NAME)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CU_CODE"))
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)

		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTRACTDETAIL, app.FooterTab.CONTRACTDETAILS, 2);
		});
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_package.get_netValueOf_ContractDetail();
	});

	it('TC - Change status of the contract', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT);
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env("CONTRACTCODE", $ele1.text())
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);

		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits

	});

	it('TC - Create PES', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_procurementPage.getCode_fromPESModal("PES_CODE")
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES)
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()

	});

	it('TC - Verify update remaining quantity of PES items', function () {
		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS);
			_common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_ITEMS);
		});
		_common.select_rowInContainer(cnt.uuid.ITEMS)
		_package.verify_remainingQtyFromPESItems(CONTAINERS_PES.QUANTITY);

	});

	it('TC - Change PES status', function () {
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

	it('TC - Create invoice from wizard', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_INVOICE);
		_package.enterRecord_toCreate_Invoice_FromWizard(CONTAINERS_INVOICE.LABEL, INVOICE_NO);
	});

	it('TC - Verify invoice auto generated and verify contract code is correct', function () {
		_common.waitForLoaderToDisappear()
		cy.wait(1000) //required Waits
		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO);

		cy.REFRESH_CONTAINER()
		cy.wait(1000)//required wait
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICEHEADER, app.FooterTab.INVOICEHEADER);
			_common.setup_gridLayout(cnt.uuid.INVOICEHEADER, CONTAINER_COLUMNS_INVOICEHEADER);
		});
		_common.maximizeContainer(cnt.uuid.INVOICEHEADER)
		_common.clear_subContainerFilter(cnt.uuid.INVOICEHEADER)
		_common.search_inSubContainer(cnt.uuid.INVOICEHEADER, INVOICE_NO)
		_common.select_rowInContainer(cnt.uuid.INVOICEHEADER)
		_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER, app.GridCells.REFERENCE, INVOICE_NO)
		_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICEHEADER, app.GridCells.CON_HEADER_FK, Cypress.env("CONTRACTCODE"))
		_package.Verify_invoiceContractTotal();
		_common.minimizeContainer(cnt.uuid.INVOICEHEADER)
	});

	it('TC - Verify reconciliation had been calculated in invoice based on PES total', function () {

		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICERECONSILIATION, app.FooterTab.RECONCILLIATION);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICERECONSILIATION, app.GridCells.RECON_NAME, "From PES")
		_common.assert_forNumericValues(cnt.uuid.INVOICERECONSILIATION, app.GridCells.RECON_NET, Cypress.env("PES_TOTAL"))
	});

	it('TC - Verify billing schema  had been auto generated in invoice', function () {

		_common.openTab(app.TabBar.INVOICES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INVOICE_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA);
		});
		_common.maximizeContainer(cnt.uuid.INVOICE_BILLING_SCHEMA)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.BILLING_LINE_TYPE_FK, "Net Total")
		_common.assert_cellData_insideActiveRow(cnt.uuid.INVOICE_BILLING_SCHEMA, app.GridCells.RESULT, Cypress.env("PES_TOTAL"))
		_common.minimizeContainer(cnt.uuid.INVOICE_BILLING_SCHEMA)
	});
});
