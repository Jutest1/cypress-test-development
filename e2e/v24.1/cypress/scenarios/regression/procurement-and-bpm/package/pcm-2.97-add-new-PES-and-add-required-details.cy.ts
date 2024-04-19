import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _projectPage, _controllingUnit, _boqPage, _estimatePage, _package, _saleContractPage, _validate, _procurementContractPage, _rfqPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = 'P-' + Cypress._.random(0, 999);
const PRJ_DESCRIPTION = 'PCM-' + Cypress._.random(0, 999);
const CU_MAIN_01 = "RNMHEADER_CU-" + Cypress._.random(0, 999)
const BOQ_HEAD_01 = 'BOQ_MAIN01-' + Cypress._.random(0, 999);
const BOQ_STRUCT_01 = 'BOQ_SUB01-' + Cypress._.random(0, 999);
const BOQ_HEAD_02 = 'BOQ_MAIN02-' + Cypress._.random(0, 999);
const BOQ_STRUCT_02 = 'BOQ_SUB02-' + Cypress._.random(0, 999);
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const ITEM_01 = "EST_ITEM-01-" + Cypress._.random(0, 999)
const CHANGE_DESCRIPTION = 'CHNAGE_DESC-' + Cypress._.random(0, 999);

let CONTAINERS_PROJECT, CONTAINERS_CONTROLLING_UNITS, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEMS, CONTAINERS_RESOURCES, CONTAINERS_CONTRACT, CONTAINERS_PES, CONTAINERS_BILLING_SCHEMATA;

let CONTAINER_COLUMNS_PROJECT, CONTAINER_COLUMNS_CONTROLLING_UNITS, CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEMS, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_CONTRACT, CONTAINER_COLUMNS_PES, CONTAINER_COLUMNS_ITEMS, CONTAINER_COLUMNS_BILLING_SCHEMA;

let PROJECT_PARAMETERS: DataCells, CONTROLLING_UNIT_MAIN_PARAMETERS: DataCells, BOQ_PARAMETERS_1: DataCells, BOQ_PARAMETERS_2: DataCells, BOQ_STRUCTURE_PARAMETER_1: DataCells, BOQ_STRUCTURE_PARAMETER_2: DataCells, ESTIMATE_PARAMETERS: DataCells, MODAL_GENERATE_LINE_ITEMS_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETER: DataCells, RESOURCE_PARAMETER_2: DataCells;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE, MODAL_CREATE_CONTRACT;

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('Package');
ALLURE.story("PCM- 2.97 | Add new PES and add required details'");

describe('PCM- 2.97 | Add new PES and add required details', () => {

	before(function () {

		cy.fixture('pcm/pcm-2.97-add-new-PES-and-add-required-details.json').then((data) => {
			this.data = data;
			CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
			CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
			PROJECT_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
				[commonLocators.CommonLabels.NAME]: PRJ_DESCRIPTION,
				[commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
			};
			CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
			CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
			CONTROLLING_UNIT_MAIN_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CU_MAIN_01,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY[0],
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM[0]
			}
			CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
			BOQ_PARAMETERS_1 = {
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEAD_01,
			}
			BOQ_PARAMETERS_2 = {
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEAD_02,
			}
			CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
			CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
			BOQ_STRUCTURE_PARAMETER_1 = {
				[commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_01,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
				[app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
				[app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL]: CU_MAIN_01
			};
			BOQ_STRUCTURE_PARAMETER_2 = {
				[commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_02,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
				[app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0],
			};
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: EST_CODE,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			};
			MODAL_GENERATE_LINE_ITEMS_PARAMETERS = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_HEAD_01
			}
			CONTAINERS_LINE_ITEMS = this.data.CONTAINERS.LINE_ITEMS
			LINE_ITEM_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: ITEM_01,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEMS.QUANTITY[0],
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEMS.UOM[0]
			};
			CONTAINERS_LINE_ITEMS = this.data.CONTAINERS.LINE_ITEMS
			CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEMS;
			CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCES
			CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES;
			RESOURCE_PARAMETER = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_RESOURCES.COST_CODE[0]
			};
			RESOURCE_PARAMETER_2 = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_RESOURCES.COST_CODE[1]
			};
			MODAL_CREATE_UPDATE_BOQ_PACKAGE = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
			CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE;
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINER_COLUMNS_BILLING_SCHEMA = this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
			MODAL_CREATE_CONTRACT = this.data.MODAL.CREATE_CONTRACT
			CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT;
			CONTAINERS_PES = this.data.CONTAINERS.PES
			CONTAINER_COLUMNS_PES = this.data.CONTAINER_COLUMNS.PES;
			CONTAINERS_BILLING_SCHEMATA = this.data.CONTAINERS.BILLING_SCHEMATA
			CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
		}).then(() => {
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.setDefaultView(app.TabBar.PROJECT)
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
				_common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.waitForLoaderToDisappear()
			_common.clear_subContainerFilter(cnt.uuid.PROJECTS)
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
			cy.SAVE()
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
			_common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.PROJECT_NAME_SMALL, "PRJ_NAME")
		})
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create new controlling unit', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
			_common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
		});
		_common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION)
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create new BoQ header', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROJECTS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_common.waitForLoaderToDisappear()
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_1);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create new BoQ structure', function () {
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER_1)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.getText_fromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env("Item1_Quantity", $ele1.text())
			cy.log(Cypress.env("Item1_Quantity"))
		})
	});

	it('TC - Create new estimate header', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
	});

	it('TC - Genrate line item and assign resource to it', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(MODAL_GENERATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		cy.REFRESH_CONTAINER()
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_STRUCT_01)
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
			_common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCES.quantity, CONTAINER_COLUMNS_RESOURCES.code, CONTAINER_COLUMNS_RESOURCES.estresourcetypeshortkey], cnt.uuid.RESOURCES)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES)
		_common.create_newRecord(cnt.uuid.RESOURCES)
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});

	it('TC - Create boq package from wizards option', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, Sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
		_package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.GROUPING, CommonLocators.CommonLabels.ENTIRE_ESTIMATE, CommonLocators.CommonKeys.PROJECT_BOQ, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE[0], '', '', MODAL_CREATE_UPDATE_BOQ_PACKAGE.TRANSFER_FROM[0], PRJ_DESCRIPTION);
		cy.SAVE()
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			// _common.setDefaultView(app.TabBar.PACKAGE)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
		})
		cy.SAVE()
		_common.clear_subContainerFilter(cnt.uuid.PACKAGE)
		cy.log("PROJECT_DESC===>" + PRJ_DESCRIPTION)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION)
		_common.select_rowInSubContainer(cnt.uuid.PACKAGE)
		_common.getTextfromCell(cnt.uuid.PACKAGE, null, null, app.GridCells.CODE);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS)
		_common.changeStatus_fromModal(commonLocators.CommonKeys.IN_PROGRESS)
		cy.SAVE()
	});

	it('TC - Create requisistion by wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION)
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN)
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
		})
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO)
		_common.select_rowInSubContainer(cnt.uuid.REQUISITIONS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS)
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
	});

	it('TC - Create contract by wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT)
		_package.create_ContractfromPackage(MODAL_CREATE_CONTRACT.BUSINESS_PARTNER)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION)
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT);
		_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.getTextfromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE);
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONTROLLING_UNIT_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CU_MAIN_01);
		cy.SAVE();
		cy.wait(2000);
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CLERK_PRC_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTRACT.RESPONSIBLE);
		cy.SAVE();
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
		_common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.getTextfromCell(cnt.uuid.PROCUREMENTCONTRACT, null, app.GridCells.EXCHANGE_RATE);
		_common.returnArrayForMultipleCell(cnt.uuid.PROCUREMENTCONTRACT, CONTAINERS_CONTRACT.GET_TEXT_FROM);
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create PES by wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
		cy.wait(2000);
		_common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_PES);
		cy.wait(5000);
		_common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('PES_Code', $ele1.text());
		});
	});

	it('TC - Verify should check whether total and vat and total gross whether calculate', function () {
		var PESTotal: string;
		var PESVAT: string;
		_common.openTab(app.TabBar.PESBOQ).then(function () {
			_common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQS, 1);
			_common.select_tabFromFooter(cnt.uuid.PES_BOQS_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
		});
		cy.wait(2000);
		_common.clickOn_cellHasIcon(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM);
		_common.edit_containerCell(cnt.uuid.PES_BOQS_STRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES.QUANTITY);
		cy.SAVE();
		cy.wait(2000);
		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(function () {
			_common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS, 0);
			_common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES);
		});
		_common.maximizeContainer(cnt.uuid.HEADERS);
		_common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.PES_VALUE).then(($Total) => {
			PESTotal = $Total.text();
			cy.log(PESTotal.replace(',', ''));
		});
		_common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.VAT).then(($VAT) => {
			PESVAT = $VAT.text();
			cy.log(PESVAT);
		});
		cy.wait(500).then(() => {
			_validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.HEADERS, PESTotal, PESVAT, app.GridCells.TOTAL_GROSS);
		});
	});

	it('TC - Verify create new button and delete button is working', function () {
		_common.create_newRecord(cnt.uuid.HEADERS);
		_common.delete_recordFromContainer(cnt.uuid.HEADERS);
	});

	it('TC - Verify each fields is working and lookup filter is correct', function () {
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.CONTROLLING_UNIT_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CU_MAIN_01);
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.CLERK_PRC_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES.RESPONSIBLE);
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.PROJECT_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('PROJECT_NUMBER'));
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.PRC_STRUCTURE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES.PROCUREMENT_STRUCTURE);
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.BUSINESS_PARTNER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES.BUSINESS_PARTNER);
		cy.SAVE();
		cy.wait(2000);
	});

	it('TC - Verify new(derived from select record) button is working;', function () {
		_common.clickOn_toolbarButton(cnt.uuid.HEADERS, btn.ToolBar.ICO_REC_NEW_COPY);
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.HEADERS, btn.IconButtons.ICO_REC_DELETE);
	});

	it('TC - Verify relate fields will get value from contract, inculde:project, package, controlling unit and business partner ,vat group,responsible,requisiton owner,currency', function () {
		_common.getText_fromCell_storeInArray(cnt.uuid.HEADERS, CONTAINERS_PES.GET_TEXT_FROM, '');
		cy.wait(2000);
		_validate.verify_isArrayEquals([Cypress.env('Column_Data1')], [Cypress.env('Column_Data2')]);
	});

	it('TC - Verify after set value to contract, the rate will not copy from contact', function () {
		_common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS, app.GridCells.RATE, Cypress.env('gridcell_2_Text'));
	});

	it('TC - Verify the business partner should be mandaory, if it is null, then click save, it will popup dialog to input it', function () {
		_common.clickOn_toolbarButton(cnt.uuid.HEADERS, btn.ToolBar.ICO_REC_NEW);
		cy.SAVE();
		cy.wait(2000);
		_validate.validate_Text_message_In_PopUp(CONTAINERS_PES.POPUP_MSG);
		_common.clickOn_modalFooterButton(btn.ButtonText.CANCEL);
		_common.clickOn_toolbarButton(cnt.uuid.HEADERS, btn.IconButtons.ICO_REC_DELETE);
	});

	it('TC - Verify if project has value, the contract will filter with proejct', function () {
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.PROJECT_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('PROJECT_NUMBER'));
		cy.wait(1000).then(() => {
			_saleContractPage.verify_RecordIsExistInPopUp_afterclickOnLookUp(cnt.uuid.HEADERS, app.GridCells.CON_HEADER_FK, app.GridCells.CODE, Cypress.env('Text'));
		});
	});

	it('TC - Verify if business partner has value, the contract will filter with business partner', function () {
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.BUSINESS_PARTNER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES.BUSINESS_PARTNER);
		cy.wait(1000).then(() => {
			_saleContractPage.verify_RecordIsExistInPopUp_afterclickOnLookUp(cnt.uuid.HEADERS, app.GridCells.CON_HEADER_FK, app.GridCells.CODE, Cypress.env('Text'));
		});
		_common.minimizeContainer(cnt.uuid.HEADERS);
	});

	it('TC - Verify modify billing schema, it will auto regenerate records in billing schema container', function () {
		var result;
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CommonLocators.CommonKeys.MATERIAL);
		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 0);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, sidebar.SideBarOptions.PERFORMANCE_ENTERY_SHEET);
		_common.clickOn_toolbarButton(cnt.uuid.CONFIGURATIONS, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, CommonLocators.CommonKeys.CONSTRUCTION);
		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BILLINGSCHEMATA, app.FooterTab.BILLING_SCHEMATA, 1);
		});
		_common.create_newRecordInContainer_ifNoRecordExists(cnt.uuid.BILLINGSCHEMATA, 1);
		cy.wait(2000)
		cy.get('@CHECK_DATA')
			.then((value) => {
				cy.log(value.toString())
				if (value.toString() == "Data does not exist") {
					_common.select_rowInContainer(cnt.uuid.BILLINGSCHEMATA);
					_common.edit_dropdownCellWithCaret(cnt.uuid.BILLINGSCHEMATA, app.GridCells.BILLING_SCHEMA_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_BILLING_SCHEMATA.BILLING_SCHEMA);
					cy.SAVE();
					cy.wait(2000);
				}
			})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
		_common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, CommonLocators.CommonLabels.STANDARD_CUMULATIVE);
		_common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS);
		_common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, btn.ToolBar.ICO_TREE_COLLAPSE_ALL);
		_common.clickOn_cellHasIcon(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.TREE, btn.IconButtons.ICO_RUBRIC_PES)
		_common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS, btn.ToolBar.ICO_TREE_EXPAND)
		_common.select_rowHasValue(cnt.uuid.BILLING_SCHEMA_DETAILS, CommonLocators.CommonKeys.CONSTRUCTION)
		_common.addRecord_inSubContainer_ifNotExist(cnt.SubcontainerId.BILLING_SCHEMA_DETAILS, 1);
		cy.SAVE();
		cy.wait(2000);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PES);
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.HEADERS);
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.BILLING_SCHEMA_FK, CommonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CommonLocators.CommonLabels.STANDARD_CUMULATIVE);
		cy.SAVE();
		cy.wait(2000);
		_common.minimizeContainer(cnt.uuid.HEADERS);
		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(function () {
			_common.select_tabFromFooter(cnt.uuid.PES_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA, 2);
			_common.setup_gridLayout(cnt.uuid.PES_BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA);
			_common.maximizeContainer(cnt.uuid.PES_BILLING_SCHEMA);
			_common.clickOn_cellHasUniqueValue(cnt.uuid.PES_BILLING_SCHEMA, app.GridCells.BILLING_LINE_TYPE_FK, CommonLocators.CommonKeys.NET_TOTAL);
			_common.select_rowInContainer(cnt.uuid.PES_BILLING_SCHEMA)
			_common.getText_fromCell(cnt.uuid.PES_BILLING_SCHEMA, app.GridCells.RESULT).then(($result) => {
				result = $result.text();
				cy.log(result.replace(',', ''));
				Cypress.env('billingScema_Result', result);
				_common.minimizeContainer(cnt.uuid.PES_BILLING_SCHEMA);
				_common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS, app.GridCells.PES_VALUE, Cypress.env('billingScema_Result'));
			});
		});
	});

	it('TC - Verify set value to package, it will auto set value to project;', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
		_common.maximizeContainer(cnt.uuid.HEADERS);
		_common.create_newRecord(cnt.uuid.HEADERS)
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.BUSINESS_PARTNER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES.BUSINESS_PARTNER);
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.CLERK_PRC_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PES.RESPONSIBLE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.PACKAGE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('gridcell_3_Text'));
		_common.select_activeRowInContainer(cnt.uuid.HEADERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.HEADERS, app.GridCells.PROJECT_FK, Cypress.env('PROJECT_NUMBER'));
	});

	it('TC - Verify set value to contract, if contract has boq , then it will auto generate boq record', function () {
		_common.edit_dropdownCellWithInput(cnt.uuid.HEADERS, app.GridCells.CON_HEADER_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env('Text'));
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.HEADERS);
		_common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PES_ITEMS, app.FooterTab.BOQS, 2);
			_common.setup_gridLayout(cnt.uuid.PES_ITEMS, CONTAINER_COLUMNS_ITEMS);
		});
		_common.assert_cellData_insideActiveRow(cnt.uuid.PES_ITEMS, app.GridCells.CON_HEADER_FK, Cypress.env('Text'));
	});

	it('TC - Go to estimate and create new line Item and assign BoQ Reference,project change and assigned resource to line item', function () {
		cy.GO_TO_HOME_PAGE();
		_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		_common.openTab(app.TabBar.BOQS);
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS_2);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.BOQSTRUCTURE);
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQS, BOQ_STRUCTURE_PARAMETER_2);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.select_rowInContainer(cnt.uuid.ESTIMATE);
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS);
			_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
			_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
			cy.SAVE();
			_common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BOQ_ITEM_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BOQ_STRUCT_02)
			cy.SAVE();
			_common.waitForLoaderToDisappear()
			_common.create_newRecord(cnt.uuid.RESOURCES);
			_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER_2);
			cy.SAVE();
			_common.waitForLoaderToDisappear()
		});
	});

	it('TC - Update boq package from wizards option', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
		_package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.CASE[0], CommonLocators.CommonLabels.ENTIRE_ESTIMATE, CommonLocators.CommonKeys.PROJECT_BOQ, '', '', MODAL_CREATE_UPDATE_BOQ_PACKAGE.UPDATE_EXISTING_PACKAGE, '');
		cy.wait(2000);
	});

	it('TC - Verify the contract should not lookup with change order contract;', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_common.waitForLoaderToDisappear()
		_saleContractPage.create_ContractChangeOrder_fromWizard(CHANGE_DESCRIPTION, commonLocators.CommonKeys.DESIGN_CHANGE);
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
		_common.changeStatus_fromModal(CommonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear()
		_common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
			Cypress.env('PROCUREMENT_CONTRACT_CODE', $ele1.text());
		});
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PES);
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasIcon(cnt.uuid.HEADERS, app.GridCells.CON_HEADER_FK, Cypress.env('PES_Code'));
		cy.wait(1000).then(() => {
			_validate.verify_changeOrdercontracts_ShouldNotbe_inPEScontractLookup(cnt.uuid.HEADERS, app.GridCells.CON_HEADER_FK, app.GridCells.CODE, Cypress.env('PROCUREMENT_CONTRACT_CODE'));
		});
	})

})