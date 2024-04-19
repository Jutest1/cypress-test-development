import { _common, _estimatePage, _validate, _mainView, _boqPage, _projectPage } from 'cypress/pages';
import { app, tile, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import CommonLocators from 'cypress/locators/common-locators';
import common from 'mocha/lib/interfaces/common';
import { DataCells } from 'cypress/pages/interfaces';
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_STRCU_DESC1 = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const BOQ_DESC = 'BOQ-DESC-' + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let ESTIMATE_PARAMETERS: DataCells

let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let PROJECTS_PARAMETERS
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_DATA_TYPE;
let CONTAINER_COLUMNS_DATA_RECORD;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let UPDATE_LINE_ITEMS_PARAMETERS: DataCells
let UPDATE_LINE_ITEM
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.117 | Change status of duplicate lineitem');

describe('EST- 1.117 | Change status of duplicate lineitem', () => {
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('estimate/est-1.117-change-status-of-duplicate-lineitem.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_DATA_TYPE = this.data.CONTAINER_COLUMNS.DATA_TYPE

			CONTAINER_COLUMNS_DATA_RECORD = this.data.CONTAINER_COLUMNS.DATA_RECORD
			CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQS
			CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQSTRUCTURE
			CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQSTRUCTURE
			BOQ_PARAMETERS = {
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
			}
			BOQ_STRUCTURE_PARAMETERS = {
				[commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRCU_DESC1,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
				[app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM,
				[app.GridCells.QUANTITY_ADJ]: CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY
			}

			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
			GENERATE_LINE_ITEMS_PARAMETERS = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
			}
			UPDATE_LINE_ITEM = this.data.CONTAINERS.CREATE_NEW
			UPDATE_LINE_ITEMS_PARAMETERS = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC,
				[commonLocators.CommonLabels.CREATE_NEW]: UPDATE_LINE_ITEM
			}
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: EST_CODE,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			PROJECTS_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
				[commonLocators.CommonLabels.NAME]: PROJECT_DESC,
				[commonLocators.CommonLabels.CLERK]: CLERK
			}
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

	it('TC - Prerequisistes - Go to customizing, select estimate line item status record, and check the checkbox for read only for any one record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)

		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
			_common.setup_gridLayout(cnt.uuid.ENTITY_TYPES, CONTAINER_COLUMNS_DATA_TYPE)
		})
		_common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
		_common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, "Est Line Item Status")
		_common.select_rowHasValue(cnt.uuid.ENTITY_TYPES, "Est Line Item Status")
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
			_common.setup_gridLayout(cnt.uuid.INSTANCES, CONTAINER_COLUMNS_DATA_RECORD)
		})
		_common.select_rowHasValue(cnt.uuid.INSTANCES, CONTAINERS_LINE_ITEM.GESCHLOSSEN)
		cy.wait(2000)
		_common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_READONLY, commonLocators.CommonKeys.CHECK)
		_common.select_rowHasValue(cnt.uuid.INSTANCES, CONTAINERS_LINE_ITEM.IN_ARBEIT)
		_common.set_cellCheckboxValue(cnt.uuid.INSTANCES, app.GridCells.IS_READONLY, commonLocators.CommonKeys.UNCHECK)
		cy.SAVE()
	});

	it('TC - Create new BoQ header and BoQ structure', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
		});
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.maximizeContainer(cnt.uuid.BOQS)
		_common.create_newRecord(cnt.uuid.BOQS);
		_common.waitForLoaderToDisappear()
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.BOQS)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
			//_common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
		});
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()

	});

	it('TC - Create new estimate record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify Line Item AQ, WQ Quantity should be reflected from Project BoQ WQ, AQ Quantity', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.AQ_QUANTITY)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.QUANTITY)
	});

	it('TC - Verify Duplicate line Item should be generated with Copy Source field as Duplicate from 000010 at update & Duplicate Line Item AQ=90 & WQ=180 should be populated', function () {
		_common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_LINE_ITEM_STATUS_FK, commonLocators.CommonKeys.LIST, CONTAINERS_LINE_ITEM.GESCHLOSSEN);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			cy.REFRESH_CONTAINER()
			_common.waitForLoaderToDisappear()
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		cy.wait(500).then(() => {
			_common.search_inSubContainer(cnt.uuid.BOQS, BOQ_DESC);
		})
		cy.wait(500)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
		});
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, CommonLocators.CommonKeys.POSITION)
		_common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATE_QUANTITY);
		_common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_ADJ, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATE_AQ_QUANTITY);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ESTIMATE);

		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(UPDATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINERS_LINE_ITEM.LINETTEM_CODE_2)
		_common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.HINT, `Duplicate from "000010" at update`)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.LI_UPDATE_AQ_QUANTITY)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.LI_UPDATE_QUANTITY)

	});


	it('TC - Verify AQ and WQ quantity in Boq= AQ and WQ quantity in LI with read-only status + AQ and WQ quantity in LI without read-only status', function () {
		_common.perform_additionOfCellData(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			cy.REFRESH_CONTAINER()
			_common.waitForLoaderToDisappear()
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		cy.wait(500).then(() => {
			_common.search_inSubContainer(cnt.uuid.BOQS, BOQ_DESC);
		})
		_common.select_rowInContainer(cnt.uuid.PROJECTS)
		cy.wait(500)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
		});
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.POSITION)
		_common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.UPDATE_QUANTITY)
		_common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_ADJ, CONTAINERS_BOQ_STRUCTURE.UPDATE_AQ_QUANTITY)
	});

	it('TC - Verify Another Duplicate line Item should be generated with Copy Source field as Duplicate from 000010 at update & Another Duplicate Line Item AQ=100 & WQ=100 should be populated', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ESTIMATE);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_LINE_ITEM_STATUS_FK, commonLocators.CommonKeys.LIST, CONTAINERS_LINE_ITEM.GESCHLOSSEN);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		//!
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			cy.REFRESH_CONTAINER()
			_common.waitForLoaderToDisappear()
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		cy.wait(500).then(() => {
			_common.search_inSubContainer(cnt.uuid.BOQS, BOQ_DESC);
		})
		_common.select_rowInContainer(cnt.uuid.PROJECTS)
		cy.wait(500)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
		});
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.POSITION)
		_common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATE_QUANTITY_COPY_RESOURCE);
		_common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_ADJ, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATE_AQ_QUANTITY_COPY_RESOURCE);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ESTIMATE);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(UPDATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINERS_LINE_ITEM.LINETTEM_CODE_3)
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.HINT, `Duplicate from "000010" at update`)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.UPDATE_AQ_QUANTITY)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.UPDATE_AQ_QUANTITY)
	});

	it('TC - Verify AQ and WQ quantity in Boq= AQ and WQ quantity in LI with read-only status + AQ and WQ quantity in LI without read-only status', function () {

		_common.perform_additionOfCellData(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
		cy.wait(3000)
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			cy.REFRESH_CONTAINER()
			_common.waitForLoaderToDisappear()
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		cy.wait(500).then(() => {
			_common.search_inSubContainer(cnt.uuid.BOQS, BOQ_DESC);
		})
		cy.wait(500)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
		});
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.POSITION)
		_common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, CONTAINERS_BOQ_STRUCTURE.UPDATE_QUANTITY_COPY_RESOURCE)
		_common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_ADJ, CONTAINERS_BOQ_STRUCTURE.UPDATE_AQ_QUANTITY_COPY_RESOURCE)
	});

	it('TC - Verify Duplicate Line Item2- AQ:290 -WQ:380 -uom item:hour & Duplicate Line Item3- AQ:0 -WQ:0 -uom item:hour', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ESTIMATE);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINERS_LINE_ITEM.LINETTEM_CODE_2)
		cy.REFRESH_SELECTED_ENTITIES()
		_common.clickOn_cellHasIconWithIndex(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_LINE_ITEM_STATUS_FK, app.GridCellIcons.ICO_STATUS_07, 1)
		//!Failling In This Step 
		_common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_LINE_ITEM_STATUS_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_LINE_ITEM.IN_ARBEIT); 
		cy.SAVE()
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)

		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
		cy.wait(3000)
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
			cy.REFRESH_CONTAINER()
			_common.waitForLoaderToDisappear()
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		cy.wait(500).then(() => {
			_common.search_inSubContainer(cnt.uuid.BOQS, BOQ_DESC);
		})
		cy.wait(500)
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
		});
		_common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES, commonLocators.CommonKeys.POSITION)
		_common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATE_QUANTITY_FOR_ANOTHER_COPY_RESOURCE);
		_common.select_activeRowInContainer(cnt.uuid.BOQ_STRUCTURES)
		_common.edit_containerCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.QUANTITY_ADJ, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BOQ_STRUCTURE.UPDATE_AQ_QUANTITY_FOR_ANOTHER_COPY_RESOURCE_2);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ESTIMATE);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			cy.REFRESH_CONTAINER()
			_common.waitForLoaderToDisappear()
		});
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(UPDATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINERS_LINE_ITEM.LINETTEM_CODE_2)
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.HINT, `Duplicate from "000010" at update`)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.DUPLICATE_LI3_QUANTITY)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.DUPLICATE_LI3_QUANTITY)

		_common.clickOn_cellHasIconWithIndex(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.EST_LINE_ITEM_STATUS_FK, app.GridCellIcons.ICO_STATUS_06, 0)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINERS_LINE_ITEM.LINETTEM_CODE_2)
		_common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINERS_BOQ_STRUCTURE.LI_UPDATE_QUANTITY_1)
		_common.select_activeRowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.LI_UPDATE_QUANTITY_1)
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.LI_UPDATE_AQ_QUANTITY_1)
	});
		after(() => {
			cy.LOGOUT();
		});
});
