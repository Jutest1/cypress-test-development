import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _boqPage, _estimatePage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = 'PRJ' + Cypress._.random(0, 999);
const PRJ_DESCRIPTION = 'PRO' + Cypress._.random(0, 999);
const BOQ_HEAD_01 = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_ITEM_01 = "BOQ-ITEM-" + Cypress._.random(0, 999);
const EST_CODE = 'E' + Cypress._.random(0, 999);
const EST_DESCRIPTION = 'EST-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = "BOQ-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_2 = "LINE_DESC2-" + Cypress._.random(0, 999);
const CostTotal = "CostTotal";

let CONTAINERS_PROJECT, CONTAINERS_BOQ_STRUCTURE, CONTAINERS_ESTIMATE, CONTAINERS_LINE_ITEM, CONTAINERS_RESOURCES;

let CONTAINER_COLUMNS_BOQ, CONTAINER_COLUMNS_BOQ_STRUCTURE, CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCES, CONTAINER_COLUMNS_PACKAGE;

let PROJECT_PARAMETERS: DataCells, BOQ_PARAMETERS: DataCells, BOQ_STRUCTURE_PARAMETER: DataCells, ESTIMATE_PARAMETERS: DataCells, GENERATE_LINE_ITEMS_PARAMETERS: DataCells, RESOURCE_PARAMETER: DataCells, LINE_ITEM_PARAMETERS_2: DataCells;

let MODAL_CREATE_UPDATE_BOQ_PACKAGE, MODAL_UPDATE_BOQ_PACKAGES;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 1.9 | Create BOQ package from Line item - Procurement structure of line item");

describe("PCM- 1.9 | Create BOQ package from Line item - Procurement structure of line item", () => {

	before(function () {

		cy.fixture("pcm/pcm-1.9-create-boq-package-from-line-item-procurement-structure-of-line-item.json").then((data) => {
			this.data = data
			CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
			PROJECT_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
				[commonLocators.CommonLabels.NAME]: PRJ_DESCRIPTION,
				[commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK
			};
			CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ;
			BOQ_PARAMETERS = {
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_HEAD_01,
			};
			CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
			CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
			BOQ_STRUCTURE_PARAMETER = {
				[commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_ITEM_01,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY[0],
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM[0],
				[app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE[0]
			};
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: EST_CODE,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			};
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
			GENERATE_LINE_ITEMS_PARAMETERS = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_HEAD_01
			};
			CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCE;
			CONTAINERS_RESOURCES = this.data.CONTAINERS.RESOURCE;
			RESOURCE_PARAMETER = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCES.SHORT_KEY[0],
				[app.GridCells.CODE]: CONTAINERS_RESOURCES.MATERIAL[0],
			};
			MODAL_CREATE_UPDATE_BOQ_PACKAGE = this.data.MODAL.CREATE_UPDATE_BOQ_PACKAGE
			MODAL_UPDATE_BOQ_PACKAGES = this.data.MODAL.UPDATE_BOQ_PACKAGES

			CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
			LINE_ITEM_PARAMETERS_2 = {
				[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM[0]
			};

		}).then(() => {
			cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.setDefaultView(app.TabBar.PROJECT)
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.create_newRecord(cnt.uuid.PROJECTS);
			_projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
			cy.SAVE()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
		})
	})

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create BOQ header & BOQ Structure in first Project', function () {
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER)
		cy.SAVE();
	});

	it('TC - Create Estimate header and generate line items from BOQ and assign resource to it', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT)
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		cy.SAVE()
		cy.REFRESH_CONTAINER()
	});

	it("TC - Verify Create new line item from BoQ", function () {
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BOQ_ITEM_01);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.QUANTITY[0]);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES);
		});
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER);
		cy.SAVE();
		_common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, CostTotal)
	});

	it("TC - Create boq package from wizards option", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
		_package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.GROUPING, CommonLocators.CommonLabels.ENTIRE_ESTIMATE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.GROUPING_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE[0], MODAL_CREATE_UPDATE_BOQ_PACKAGE.SELECTION_STRUCTURE, CommonLocators.CommonLabels.CREATE_NEW)
	});

	it("TC - Verify package in line item", function () {
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION);
		_common.select_rowInSubContainer(cnt.uuid.PACKAGE)
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 1)
		});
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
		_common.select_rowInContainer(cnt.uuid.PROCUREMENT_BOQS)
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
			_common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.finalprice, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo], cnt.uuid.BOQ_STRUCTURE)
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE)
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURE, BOQ_ITEM_01)
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.QUANTITY[0]);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("CostTotal"));
	});

	it("TC - Create new line item record with assign package", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION).pinnedItem();
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE, EST_DESCRIPTION)
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS_2);
		cy.SAVE();
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINE_ITEM_DESCRIPTION_2)
		_common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRC_STRUCTURE_FK, CommonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.PROCUREMENT_STRUCTURE[0])
		cy.SAVE()
	
		_common.waitForLoaderToDisappear()
		_common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.waitForLoaderToDisappear()
	});

	it("TC - Update BoQ package from wizard", function () {
			_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
		_common.waitForLoaderToDisappear()
		_package.enterRecord_toCreateBoQPackage_FromWizard(MODAL_CREATE_UPDATE_BOQ_PACKAGE.GROUPING, CommonLocators.CommonLabels.ENTIRE_ESTIMATE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.GROUPING_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.PROCUREMENT_STRUCTURE[0], MODAL_CREATE_UPDATE_BOQ_PACKAGE.SELECTION_STRUCTURE, MODAL_CREATE_UPDATE_BOQ_PACKAGE.UPDATE_TO_EXISTING_PACKAGE)
			_common.waitForLoaderToDisappear()
	});

	it("TC -Verify Estimate line item quantity with package boq structure quantity", function () {

		
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_DESCRIPTION);
		_common.select_rowInSubContainer(cnt.uuid.PACKAGE)
		_common.openTab(app.TabBar.BOQDETAILS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 1)
		});
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_BOQS)
		_common.select_rowInContainer(cnt.uuid.PROCUREMENT_BOQS)
		_common.openTab(app.TabBar.BOQDETAILS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2)
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURE)
		_package.getVerify_LineItemQuantity_With_BoQStructureOfPackage(LINE_ITEM_DESCRIPTION_1, CONTAINERS_LINE_ITEM.QUANTITY[0]);
	})

})