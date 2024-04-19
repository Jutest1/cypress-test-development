import { tile, app, cnt, commonLocators, btn, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _validate, _materialPage, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const MATCAT_CODE = 'CATALOG-' + Cypress._.random(0, 999);
const MATCAT_DESC = 'CATALOG_DESC-' + Cypress._.random(0, 999);
const MATGRP_CODE = 'GROUP' + Cypress._.random(0, 999);
const MATGRP_DESC = 'GROUP-DESC-' + Cypress._.random(0, 999);
const SUBGRP_CODE = 'SUBGROUP' + Cypress._.random(0, 999);
const SUBGRP_DESC = 'SUBGROUP-DESC-' + Cypress._.random(0, 999);
const MAT_CODE = 'MAT-CODE' + Cypress._.random(0, 999);
const MAT_DESC = 'MAT-DESC' + Cypress._.random(0, 999);

let CONTAINERS_MATERIAL_CATALOG, CONTAINERS_MATERIAL_RECORD, CONTAINERS_REQUISITION;

let CONTAINER_COLUMNS_MATERIAL_CATALOG, CONTAINER_COLUMNS_MATERIAL_GROUP, CONTAINER_COLUMNS_MATERIAL_RECORD, CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_ITEMS;

let MATERIAL_CATALOGS_PARAMETER: DataCells, MATERIAL_GROUPS_PARAMETER: DataCells, MATERIAL_SUBGROUPS_PARAMETER: DataCells, MATERIAL_RECORD_PARAMETER: DataCells, REQUISITION_PARAMETER: DataCells;

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('Requisition');
ALLURE.story('PCM- 2.173 | Framework based Requistion');

describe('PCM- 2.173 | Framework based Requistion', () => {

	before(function () {

		cy.fixture('pcm/pcm-2.173-framework-based-requisition.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG;
			CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG
			MATERIAL_CATALOGS_PARAMETER = {
				[app.GridCells.CODE]: MATCAT_CODE,
				[app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER,
				[app.GridCells.MATERIAL_CATALOG_TYPE_FK]: CONTAINERS_MATERIAL_CATALOG.FRAMEWORK_AGREEMENTS,
				[app.GridCells.DESCRIPTION_INFO]: MATCAT_DESC,
			};

			CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP;
			MATERIAL_GROUPS_PARAMETER = {
				[app.GridCells.CODE]: MATGRP_CODE,
				[app.GridCells.DESCRIPTION_INFO]: MATGRP_DESC,
				[app.GridCells.PRC_STRUCTURE_FK]: CommonLocators.CommonKeys.MATERIAL,
			};
			MATERIAL_SUBGROUPS_PARAMETER = {
				[app.GridCells.CODE]: SUBGRP_CODE,
				[app.GridCells.DESCRIPTION_INFO]: SUBGRP_DESC,
				[app.GridCells.PRC_STRUCTURE_FK]: CommonLocators.CommonKeys.MATERIAL,
			};

			CONTAINER_COLUMNS_MATERIAL_RECORD = this.data.CONTAINER_COLUMNS.MATERIAL_RECORD;
			CONTAINERS_MATERIAL_RECORD = this.data.CONTAINERS.MATERIAL_RECORD
			MATERIAL_RECORD_PARAMETER = {
				[app.GridCells.CODE]: MAT_CODE,
				[app.GridCells.DESCRIPTION_INFO_1]: MAT_DESC,
				[app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORD.UOM[0],
				[app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORD.RETAILPRICE[0],
				[app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORD.LIST_PRICE[0],
			};
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION;
			CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION
			REQUISITION_PARAMETER = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION[0],
				[app.GridCells.STRUCTURE]: CONTAINERS_REQUISITION.STRUCTURE[0],
			};
			CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;

		}).then(() => {
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		});
	})

	after(() => {
		cy.LOGOUT();
	});

	it('TC-Verify framework agreements in customizing module', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
		cy.REFRESH_CONTAINER();
		_common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, CommonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
		cy.SAVE();
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, CommonLocators.CommonKeys.FRAMEWORK_AGREEMENTS);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK);
		cy.SAVE();
	});

	it('TC - Create material catalogue', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
		_common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG);
			_common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG);
		});
		_common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS);
		_common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS);
		_materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
		cy.SAVE();
	});

	it('TC- Create material group', function () {
		_common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP);
			_common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP);
			_common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS);
		});
		_common.create_newRecord(cnt.uuid.MATERIAL_GROUPS);
		_materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS_PARAMETER);
		cy.SAVE();
		_common.create_newSubRecord(cnt.uuid.MATERIAL_GROUPS);
		_materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_SUBGROUPS_PARAMETER);
		cy.SAVE();
	});

	it('TC- Create new Material', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER);
		_common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATCAT_CODE);
		_common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK);

		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 0);
			_common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD);
			_common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS);
		})
		_common.create_newRecord(cnt.uuid.MATERIAL_RECORDS);
		_materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER);
		cy.SAVE();
	});

	it('TC - Create Requisition record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN);
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
		cy.SAVE();
	});

	it('TC- Assign item to requisition using material Search popup', function () {
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_ITEMS);
			_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONITEMS);
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS);
		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
		_common.waitForLoaderToDisappear()
		_common.lookUpButtonInCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, app.InputFields.ICO_INPUT_LOOKUP, 0);
		_validate.verify_materialInMaterialLookup_withOnlyFrameworkCatalog(MAT_DESC);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		_common.waitForLoaderToDisappear()
	});

});
