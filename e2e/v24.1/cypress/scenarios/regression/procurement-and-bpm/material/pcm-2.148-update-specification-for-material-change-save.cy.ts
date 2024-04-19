import { _common, _materialPage, _validate } from 'cypress/pages';
import _ from 'cypress/types/lodash';
import { app, cnt, commonLocators, sidebar } from 'cypress/locators';
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();

const MATERIAL_CATALOGS_CODE = 'MG1-' + Cypress._.random(0, 9999);
const MATERIAL_RECORD_CODE = 'MAT1-' + Cypress._.random(0, 9999);
const MATERIALRECORD_DESC = 'MR1_DESC' + Cypress._.random(0, 9999);
const MATGROUPCODE = 'MATGROUPCODE-' + Cypress._.random(0, 999);
const MATGROUPDEC = 'MATGROUPDEC-' + Cypress._.random(0, 999);

let MATERIAL_RECORD_PARAMETER: DataCells,
	MATERIAL_CATALOGS_PARAMETER: DataCells,
	MATERIAL_GROUPS_PARAMETER: DataCells

let CONTAINER_MATERIAL,
	CONTAINER_MATERIAL_CATALOGS,
	CONTAINER_COLUMNS_MATERIAL_CATALOGS,
	CONTAINER_COLUMNS_MATERIAL,
	CONTAINER_PRICE_LIST

allure.epic('PROCUREMENT AND BPM');
allure.feature('Material');
allure.story('PCM- 2.148 | Update specification for material change save');

describe('PCM- 2.148 | Update specification for material change save', () => {
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.148-update-specification-for-material-change-save.json').then((data) => {
			this.data = data;
			CONTAINER_MATERIAL = this.data.CONTAINERS.MATERIAL
			CONTAINER_MATERIAL_CATALOGS = this.data.CONTAINERS.MATERIAL_CATALOGS
			CONTAINER_COLUMNS_MATERIAL_CATALOGS = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
			CONTAINER_COLUMNS_MATERIAL = this.data.CONTAINER_COLUMNS.MATERIAL
			CONTAINER_PRICE_LIST = this.data.CONTAINERS.PRICE_LIST
			MATERIAL_RECORD_PARAMETER = {
				[app.GridCells.CODE]: MATERIAL_RECORD_CODE,
				[app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECORD_DESC,
				[app.GridCells.UOM_FK]: CONTAINER_MATERIAL.UOM,
				[app.GridCells.RETAIL_PRICE]: CONTAINER_MATERIAL.RETAIL_PRICE,
				[app.GridCells.LIST_PRICE]: CONTAINER_MATERIAL.LIST_PRICE,
			};
			MATERIAL_CATALOGS_PARAMETER = {
				[app.GridCells.CODE]: MATERIAL_CATALOGS_CODE,
				[app.GridCells.BUSINESS_PARTNER_FK]: CONTAINER_MATERIAL_CATALOGS.BUSINESS_PARTNER,
			};
			MATERIAL_GROUPS_PARAMETER = {
				[app.GridCells.CODE]: MATGROUPCODE,
				[app.GridCells.DESCRIPTION_INFO]: MATGROUPDEC,
				[app.GridCells.PRC_STRUCTURE_FK]: CONTAINER_MATERIAL_CATALOGS.STRUCTURE_CODE,
			};
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create material catalogue with all attributes and Material Group', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
		_common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG);
			_common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS);
		});
		_common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
		_common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS);
		_materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
		cy.SAVE();
		_common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
		_common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
		});
		_common.create_newRecord(cnt.uuid.MATERIAL_GROUPS);
		_materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS_PARAMETER);
		cy.SAVE();
	});

	it('TC - Verify create material record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
		_common.openTab(app.TabBar.DETAILSMATERIAL);
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER);
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS);
			_common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL);
		});
		_common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER);
		_common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOGS_CODE, 1);
		_common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, 'check');
		cy.wait(2000)
		_common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER);
		_common.create_newRecord(cnt.uuid.MATERIAL_RECORDS);
		_materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER);
		_common.clickOn_cellInSubContainer(cnt.uuid.MATERIAL_RECORDS, app.GridCells.SPECIFICATION_INFO);
		_common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.SPECIFICATION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINER_MATERIAL.SPECIFICATION);
		cy.SAVE();
		cy.REFRESH_SELECTED_ENTITIES();
	});

	it('TC - Verify add Specification formatted text', function () {
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SPECIFICATION_FORMATTED_TEXT, app.FooterTab.SPECIFICATION_FORMATTED_TEXT);
		});
		_materialPage.enterRecord_toSpacificationFormatedText(cnt.uuid.SPECIFICATION_FORMATTED_TEXT, app.GridCells.QL_EDITOR, CONTAINER_PRICE_LIST.SPECIFICATION);
		cy.SAVE();
	});

	it('TC - Verify Specification plain Text', function () {
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SPECIFICATION_PLAIN_TEXT, app.FooterTab.SPECIFICATION_PLAIN_TEXT);
		});
		cy.wait(500).then(() => { //REQUIRED WAIT TO LOAD PAGE
			_validate.validate_Text_In_Container_Textarea(cnt.uuid.SPECIFICATION_PLAIN_TEXT, CONTAINER_MATERIAL.SPECIFICATION);
		});
	});
});



