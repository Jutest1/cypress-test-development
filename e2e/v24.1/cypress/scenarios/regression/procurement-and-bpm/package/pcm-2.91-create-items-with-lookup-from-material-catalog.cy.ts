import { _common, _estimatePage, _mainView, _materialPage, _modalView, _package, _projectPage, _validate, } from 'cypress/pages';

import _ from 'cypress/types/lodash';
import Buttons from 'cypress/locators/buttons';
import { app, btn, cnt, commonLocators, sidebar, tile } from 'cypress/locators';
import { DataCells } from 'cypress/pages/interfaces';
import { PACKAGE_TOTAL_TRANSLATION } from 'cypress/pages/variables';
const MATERIALCatalog_CODE =  'MG-1-' + Cypress._.random(0, 999); 
const MATERIALCatalog_CODE2 = 'MG-2-' + Cypress._.random(0, 999);
const Code =  'MAT-1-' + Cypress._.random(0, 999);  
const Code2 =  'MAT-2-' + Cypress._.random(0, 999);
const Code3 =  'MAT-3-' + Cypress._.random(0, 999);
const MATERIALRECORD_DESC = 'MR-1_DESC' + Cypress._.random(0, 999);
const MATERIALRECORD_DESC2 = 'MR2_DESC' + Cypress._.random(0, 999);
const MATERIALRECORD_DESC3 = 'MR2_DESC' + Cypress._.random(0, 999);
const LINE_ITEM_DESC = 'LINE_ITEM_DESC' + Cypress._.random(0, 999);
const PRICE_LIST =  'PRICE_LIST' + Cypress._.random(0, 999); 
const PRICElist_Desc = 'PRICE_LIST_Desc' + Cypress._.random(0, 999);
const MATGROUPCODE = 'MATGROUPCODE-' + Cypress._.random(0, 999);
const MATGROUPDEC = 'MATGROUPDEC-' + Cypress._.random(0, 999);
const MATERIALCatalog_DESC1 = 'Benstock1' + Cypress._.random(0, 999);
const MATERIALCatalog_DESC2 = 'Benstock2' + Cypress._.random(0, 999);
const ATTRIBUTES = 'ATTRIBUTE' + Cypress._.random(0, 99);
const ATTRIBUTEValue = 'ATTRIBUTEValue' + Cypress._.random(0, 99);
const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS";
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LINE-ITEM-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let MATERIAL_RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
const allure = Cypress.Allure.reporter.getInterface();

let MODAL_PROJECTS
let PROJECTS_PARAMETERS: DataCells
let CONTAINER_COLUMNS_DATA_RECORDS, CONTAINERS_DATA_TYPES;
let CONTAINERS_DATA_RECORD;
let CONTAINER_COLUMNS_DATA_TYPES;
let CONTAINERS_PRICE_LISTS;
let MATERIAL_CATALOGS_PARAMETER, MATERIAL_CATALOGS_PARAMETER_2: DataCells
let MATERIAL_SUBGROUPS: DataCells
let MATERIAL_GROUPS: DataCells
let CONTAINER_COLUMNS_MATERIAL_CATALOG
let CONTAINERS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_RECORD;
let CONTAINER_COLUMNS_MATERIAL_GROUP
let MATERIAL_RECORD_1_PARAMETER: DataCells
let MATERIAL_RECORD_2_PARAMETER: DataCells
let CONTAINERS_MATERIAL_RECORDS

let MATERIAL_RECORD_3_PARAMETER: DataCells
let MODAL_PACKAGE
let CONTAINER_COLUMNS_ITEMS_CONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT
let CONTAINER_COLUMNS_PRICE_LISTS, CONTAINER_COLUMNS_MATERIAL_RECORDS
let CONTAINER_COLUMNS_ATTRIBUTE, CONTAINER_COLUMNS_ATTRIBUTE_VALUES
let CONTAINER_COLUMNS_CONTRACT_ATTACHMENTS
allure.epic('PROCUREMENT AND BPM');
allure.feature('Package');
allure.story('PCM- 2.91 | Create items with lookup from material catalog');
describe('PCM- 2.91 | Create items with lookup from material catalog', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.91-create-items-with-lookup-from-material-catalog.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.91-create-items-with-lookup-from-material-catalog.json').then((data) => {
			this.data = data;
			CONTAINERS_DATA_RECORD = this.data.CONTAINERS.DATA_RECORDS;
			CONTAINER_COLUMNS_DATA_RECORDS = this.data.CONTAINER_COLUMNS.DATA_RECORDS;
			CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES;
			CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES;
			CONTAINERS_PRICE_LISTS = this.data.CONTAINERS.PRICE_LISTS;

			CONTAINER_COLUMNS_ITEMS_CONTRACT = this.data.CONTAINER_COLUMNS.ITEMS_CONTRACT;
			CONTAINER_COLUMNS_PROCUREMENTCONTRACT = this.data.CONTAINER_COLUMNS.PROCUREMENTCONTRACT;

			CONTAINER_COLUMNS_PRICE_LISTS = this.data.CONTAINER_COLUMNS.PRICE_LISTS;
			CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS;
			CONTAINER_COLUMNS_ATTRIBUTE_VALUES = this.data.CONTAINER_COLUMNS.ATTRIBUTE_VALUES;
			CONTAINER_COLUMNS_ATTRIBUTE = this.data.CONTAINER_COLUMNS.ATTRIBUTE;
			MODAL_PACKAGE = this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE
			CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG;
			CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS;

			MATERIAL_CATALOGS_PARAMETER = {
				[app.GridCells.CODE]: MATERIALCatalog_CODE,
				[app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER,
				[app.GridCells.PAYMENT_TERM_FI_FK]: CONTAINERS_MATERIAL_CATALOG.paymentTermFI,
				[app.GridCells.PAYMENT_TERM_AD_FK]: CONTAINERS_MATERIAL_CATALOG.paymentTermAD,
				[app.GridCells.DESCRIPTION_INFO]: MATERIALCatalog_DESC1,
				[app.GridCells.VALID_FROM]: CONTAINERS_MATERIAL_CATALOG.validForm,
				[app.GridCells.VALID_TO]: CONTAINERS_MATERIAL_CATALOG.validTo,
				[app.GridCells.MATERIAL_CATALOG_TYPE_FK]: commonLocators.CommonKeys.FRAMEWORK_AGREEMENTS,
			};
			MATERIAL_GROUPS = {
				[app.GridCells.CODE]: MATGROUPCODE,
				[app.GridCells.DESCRIPTION_INFO]: MATGROUPDEC,
				[app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_CATALOG.MATERIAL_GROUP_STRUCTURE
			}
			MATERIAL_CATALOGS_PARAMETER_2 = {
				[app.GridCells.CODE]: MATERIALCatalog_CODE2,
				[app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER,
				[app.GridCells.PAYMENT_TERM_FI_FK]: CONTAINERS_MATERIAL_CATALOG.paymentTermFI,
				[app.GridCells.PAYMENT_TERM_AD_FK]: CONTAINERS_MATERIAL_CATALOG.paymentTermAD,
				[app.GridCells.DESCRIPTION_INFO]: MATERIALCatalog_DESC2,
				[app.GridCells.VALID_FROM]: CONTAINERS_MATERIAL_CATALOG.validForm,
				[app.GridCells.VALID_TO]: CONTAINERS_MATERIAL_CATALOG.validTo,
				[app.GridCells.MATERIAL_CATALOG_TYPE_FK]: commonLocators.CommonKeys.FRAMEWORK_AGREEMENTS
			};
			MATERIAL_RECORD_1_PARAMETER = {
				[app.GridCells.CODE]: Code,
				[app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECORD_DESC,
				[app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM,
				[app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE,
				[app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE,
			};
			MATERIAL_RECORD_3_PARAMETER = {
				[app.GridCells.CODE]: Code3,
				[app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECORD_DESC3,
				[app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM,
				[app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE,
				[app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE,
			};
			MATERIAL_RECORD_2_PARAMETER = {
				[app.GridCells.CODE]: Code2,
				[app.GridCells.DESCRIPTION_INFO_1]: MATERIALRECORD_DESC2,
				[app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM,
				[app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE,
				[app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE,
			};
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINER_COLUMNS_LINE_ITEMS = this.data.CONTAINER_COLUMNS.LINE_ITEM
			CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			CONTAINER_COLUMNS_CONTRACT_ATTACHMENTS = this.data.CONTAINER_COLUMNS.CONTRACT_ATTACHMENTS
			CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
			CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP

			PROJECTS_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
				[commonLocators.CommonLabels.NAME]: PRJ_NAME,
				[commonLocators.CommonLabels.CLERK]: CLERK_NAME,
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
				[app.GridCells.CODE]: Code,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
			}


		});
	});
	/* after(() => {
		cy.LOGOUT();
	}); */

	 it('TC - Verify of Customizing module is supplier and is framework present', function () {
		_common.openDesktopTile(tile.DesktopTiles.PROJECT);

		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 1);
			_common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
			_common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
		});
		_common.search_inSubContainer(cnt.uuid.DATA_TYPES, commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
		cy.REFRESH_CONTAINER();
		_common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.NAME, commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
		cy.SAVE();
		cy.wait(1000)//required wait//required wait
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
			_common.setup_gridLayout(cnt.uuid.DATA_RECORDS, CONTAINER_COLUMNS_DATA_RECORDS)
			_common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
		});
		cy.wait(1000)//required wait;
		_common.search_inSubContainer(cnt.uuid.DATA_RECORDS, commonLocators.CommonKeys.NEUTRAL_MATERIAL);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.NEUTRAL_MATERIAL);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK);
		cy.SAVE();

		cy.wait(1000)//required wait;
		_common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
		_common.search_inSubContainer(cnt.uuid.DATA_RECORDS, commonLocators.CommonKeys.FRAMEWORK_AGREEMENTS);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.FRAMEWORK_AGREEMENTS);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_LIVE, commonLocators.CommonKeys.CHECK);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK);
		cy.SAVE();
		_common.clear_subContainerFilter(cnt.uuid.DATA_TYPES);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PRICE_LISTS);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.MODULE_NAME, CONTAINERS_DATA_TYPES.MASTERDATA);
		cy.SAVE();
		cy.wait(1000)//required wait;
		_common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS);
		_common.create_newRecord(cnt.uuid.DATA_RECORDS);
		_common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CONTEXT_FK, commonLocators.CommonKeys.LIST, commonLocators.CommonKeys.RIB_DEMO_STAMM);
		_common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORD.EURO)
		_common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICElist_Desc);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});
	it('TC - Create material catalogue with all attributes and Material Group', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
		cy.wait(1000)//required wait//required wait
		_common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
			_common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
			_common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
		})
		_common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);


		_common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS);
		_materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
		// _materialPage.enterRecord_toCreateMaterialCatalogs_with_all_attributes(MATERIALCatalog_CODE, MATERIALCatalog_DESC1, MaterialCatalogInput.BUSINESS_PARTNER, MaterialCatalogInput.validForm, MaterialCatalogInput.validTo, datarecord.Description, MaterialCatalogInput.paymentTermFI, MaterialCatalogInput.paymentTermAD);
		cy.wait(1000)//required wait
		_common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.IS_NEUTRAL, commonLocators.CommonKeys.CHECK)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		cy.wait(1000)//required wait
		cy.SAVE();
		_common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
		cy.wait(1000)//required wait;
		_common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP)
			_common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
		})
		cy.wait(1000)//required wait//required wait
		_common.waitForLoaderToDisappear()

		_common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS);
		_common.create_newRecord(cnt.uuid.MATERIAL_GROUPS);
		_materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS);
		cy.SAVE()
		//_materialPage.enterRecord_toCreateMaterialGroups(MATGROUPCODE, MATGROUPDEC, "M");
		cy.SAVE();
		cy.wait(1000)//required wait;
	});
	it('TC - verify Add Price List for 1st Material catalog', function () {
		_common.openTab(app.TabBar.CATALOGS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PRICE_VERSION, app.FooterTab.PRICE_VERSIONS);
			_common.create_newRecord(cnt.uuid.PRICE_VERSION);
		});
		_common.select_rowInContainer(cnt.uuid.PRICE_VERSION)
		_common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_LIST);
		_common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICElist_Desc);
		cy.SAVE();
	});

	it('TC - verify Add 2ed Material Catlog And Material Group', function () {
		_common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
		_common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS);
		_materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER_2);

		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.IS_NEUTRAL, commonLocators.CommonKeys.CHECK)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		cy.wait(1000)//required wait
		_common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);
		cy.wait(1000)//required wait;
		_common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
		});
		_common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
		_materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS);
		cy.SAVE();
		cy.SAVE();
		_common.waitForLoaderToDisappear()

	});

	it('TC - verify Add Price List for 2ed Material catalog', function () {
		_common.openTab(app.TabBar.CATALOGS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PRICE_VERSION, app.FooterTab.PRICE_VERSIONS);
			_common.create_newRecord(cnt.uuid.PRICE_VERSION);
		});
		_common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_LIST);
		_common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICElist_Desc);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - verify Add Attribute in Material catalog', function () {
		_common.openTab(app.TabBar.CATALOGS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
			_common.setup_gridLayout(cnt.uuid.ATTRIBUTE, CONTAINER_COLUMNS_ATTRIBUTE);
		});
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.ATTRIBUTE);
		_common.waitForLoaderToDisappear()
		_materialPage.enterRecord_toCreateAttribute(cnt.uuid.ATTRIBUTE, ATTRIBUTES, commonLocators.CommonKeys.CHECK);
		cy.SAVE();
		cy.wait(1000)//required wait;
		_common.openTab(app.TabBar.CATALOGS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
			_common.setup_gridLayout(cnt.uuid.ATTRIBUTE_VALUES, CONTAINER_COLUMNS_ATTRIBUTE_VALUES);
		});
		_common.create_newRecord(cnt.uuid.ATTRIBUTE_VALUES);
		_common.enterRecord_inNewRow(cnt.uuid.ATTRIBUTE_VALUES, app.GridCells.CHARACTERISTIC_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ATTRIBUTEValue);
		cy.SAVE();
		cy.wait(1000)//required wait;
	});
	it('TC - Verify create material', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
		});
		_common.openTab(app.TabBar.DETAILSMATERIAL);
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER);
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS);
			_common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)

			_common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS);
		});
		_common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER);
		_common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIALCatalog_CODE, 1);
		_common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK);
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
		_common.create_newRecord(cnt.uuid.MATERIAL_RECORDS);
		_materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_1_PARAMETER);
		_common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.SPECIFICATION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_MATERIAL_RECORDS.specification);
		_common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.MIN_QUANTITY, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.min_quanttiy);
		_common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_RECORDS, app.GridCells.BAS_UOM_PRICE_UNIT_FK, commonLocators.CommonKeys.GRID, CONTAINERS_MATERIAL_RECORDS.UOM);
		_common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.FACTOR_PRICE_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.factor);
		_common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.SELL_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.sell);
		_common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.PRICE_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORDS.Priceunit);
		_common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_RECORDS, app.GridCells.PRC_PRICE_CONDITION_FK, commonLocators.CommonKeys.LIST, CONTAINERS_MATERIAL_RECORDS.price_condition);
		_common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_RECORDS, app.GridCells.MDC_TAX_CODE_FK_SMALL, commonLocators.CommonKeys.GRID, CONTAINERS_MATERIAL_RECORDS.tax_code);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS);
			_common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LISTS);
			_common.create_newRecord(cnt.uuid.PRICE_LISTS);
		});
		_common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_FK, commonLocators.CommonKeys.GRID, PRICE_LIST);
		_common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LISTS.RETAIL_PRICE);
		_common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LISTS.LIST_PRICE);
		cy.SAVE();
	});
	it('TC - Add Spesifications to first material record', function () {
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.SPECIFICATION_FORMATTED_TEXT, app.FooterTab.SPECIFICATION_FORMATTED_TEXT);
			_common.waitForLoaderToDisappear()
		});
		cy.wait(1000)//required wait;
		_materialPage.enterRecord_toSpacificationFormatedText(cnt.uuid.SPECIFICATION_FORMATTED_TEXT, app.GridCells.QL_EDITOR, CONTAINERS_PRICE_LISTS.specification);
		cy.wait(1000)//required wait;
		cy.SAVE();
		cy.wait(1000)//required wait;
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_MATERIAL_FULL_TEXT_INDEX)
		_common.waitForLoaderToDisappear()
		_modalView.findModal().acceptButton(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		_modalView.findModal().acceptButton(btn.ButtonText.OK)
		cy.SAVE();
		cy.wait(1000)//required wait;


	});
	it('TC - Verify  create 2ed material record', function () {
		cy.wait(1000)//required wait;
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER);
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS);
			_common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
		});
		_common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIALCatalog_CODE2, 1);
		_common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK);
		_common.create_newRecord(cnt.uuid.MATERIAL_RECORDS);
		_materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_3_PARAMETER);
		cy.SAVE();
		cy.wait(1000)//required wait;
		_common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
		_common.create_newRecord(cnt.uuid.MATERIAL_RECORDS);
		_materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_2_PARAMETER);
		cy.SAVE();
		cy.wait(1000)//required wait;
		_common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
	});
	it('TC - Add Price List to material record', function () {
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS);
			_common.create_newRecord(cnt.uuid.PRICE_LISTS);
		});
		_common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_FK, commonLocators.CommonKeys.GRID, PRICE_LIST);
		_common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LISTS.RETAIL_PRICE);
		_common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LISTS.LIST_PRICE);
		cy.SAVE();
		cy.wait(1000)//required wait;
		cy.SAVE();
	});
	it('TC - Add Spesifications to material record', function () {
		_common.openTab(app.TabBar.RECORDS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SPECIFICATION_FORMATTED_TEXT, app.FooterTab.SPECIFICATION_FORMATTED_TEXT);
		});
		cy.wait(1000)//required wait;
		_materialPage.enterRecord_toSpacificationFormatedText(cnt.uuid.SPECIFICATION_FORMATTED_TEXT, app.GridCells.QL_EDITOR, CONTAINERS_PRICE_LISTS.specification);
		cy.wait(1000)//required wait;
		cy.SAVE();
		cy.wait(1000)//required wait;
	});

	it('TC - Create New Project', function () {
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.setDefaultView(app.TabBar.PROJECT)
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
		});
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
		_common.create_newRecord(cnt.uuid.PROJECTS);
		_projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
	});
	it("TC - Create new Estimate", function () {

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

	});

	it('TC -  Create New Line Item Record', function () {
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
		cy.wait(1000)//required wait//required Waits
		//_estimatePage.enterRecord_toCreateMaterialResource(resourceInput.ShortKey, Code);
		cy.SAVE();
		cy.wait(1000)//required wait;
	});

	it('TC - Create material package and change package status', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
		_estimatePage.enterRecord_toCreatePackage_wizard(MODAL_PACKAGE.MATERIAL_AND_COST_CODE);
		cy.SAVE();
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

		})
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
		_common.changeStatus_fromModal(sidebar.SideBarOptions.IN_PROGRESS);
		cy.SAVE();
	}); 

	it('TC - Create Contract directly from Package module', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_package.create_ContractfromPackage(MODAL_PACKAGE.BUSINESS_PARTNER);
	}); 

	it("TC - Verify if copy mode ='current package only' in header container, the material lookup will only filter from package item material", function () {
		
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_PROCUREMENTCONTRACT);
		});
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
		_common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PRC_COPY_MODE_FK)
		cy.wait(1000)//required wait
		_common.edit_dropdownCellWithCaret(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PRC_COPY_MODE_FK, commonLocators.CommonKeys.LIST, 'Current Package Only');
		cy.wait(1000)//required wait;
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEMS_CONTRACT);
		});
		cy.wait(1000)//required wait;
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRC_STRUCTURE_FK, Buttons.IconButtons.ICO_INPUT_DELETE);
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.clearMaterialSearch('Material Search');
		_materialPage.clickOn_modalButtons('Material Search', 'Refresh');
		_validate.validate_Text_message_In_PopUp(Code);
		_materialPage.assign_MaterialNo_FromLookup(Code);
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT);
		cy.SAVE();
	});

	it("TC - Verify if copy mode =only allow catalogs' in header container, the material lookup will only filter  material catlogs", function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
		_materialPage.enterRecord_toCreateContract(MODAL_PACKAGE.BUSINESS_PARTNER);
		cy.wait(1000)//required wait;
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT)

		_common.edit_dropdownCellWithCaret(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PRC_COPY_MODE_FK, commonLocators.CommonKeys.LIST, 'Only Allowed Catalogs');
		cy.SAVE();
		_common.minimizeContainer(cnt.uuid.PROCUREMENTCONTRACT)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONTRACT_ATTACHMENTS, app.FooterTab.CONTRACT_ATTACHMENTS);
			_common.setup_gridLayout(cnt.uuid.CONTRACT_ATTACHMENTS, CONTAINER_COLUMNS_CONTRACT_ATTACHMENTS);
		});
		_common.create_newRecord(cnt.uuid.CONTRACT_ATTACHMENTS);
		_common.edit_dropdownCellWithCaret(cnt.uuid.CONTRACT_ATTACHMENTS, app.GridCells.COPY_TYPE, commonLocators.CommonKeys.GRID_1, 'Material');
		cy.wait(1000)//required wait;
		_common.enterRecord_inNewRow(cnt.uuid.CONTRACT_ATTACHMENTS, app.GridCells.MDC_MATERIAL_CATALOG_FK, app.InputFields.INPUT_GROUP_CONTENT, MATERIALCatalog_CODE2);
		cy.wait(1000)//required wait;
		_mainView.select_popupItem(commonLocators.CommonKeys.GRID, MATERIALCatalog_CODE2);
		cy.wait(1000)//required wait;
		cy.SAVE();
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
		});
		cy.wait(1000)//required wait;
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRC_STRUCTURE_FK, Buttons.IconButtons.ICO_INPUT_DELETE);
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.clearMaterialSearch('Material Search');
		_materialPage.clickOn_modalButtons('Material Search', 'Refresh');
		_validate.validate_Text_message_In_PopUp(Code2);
		_validate.validate_Text_message_In_PopUp(Code3);
		_materialPage.assign_MaterialNo_FromLookup(Code2);
		cy.wait(1000)//required wait;
		cy.SAVE();
	});
 
	it('TC - Create Contract manually in cotract module', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS);
		});
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
		_materialPage.enterRecord_toCreateContract(MODAL_PACKAGE.BUSINESS_PARTNER);
		cy.wait(1000)//required wait;
		cy.SAVE();
		cy.wait(1000)//required wait;
	});

	it('TC - Create items', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_common.waitForLoaderToDisappear()
		cy.wait(1000)//required wait
		_materialPage.search_MaterialNo_FromLookup(Code);
		_common.waitForLoaderToDisappear()
		_materialPage.assign_MaterialNo_FromLookup(Code);
		cy.wait(1000)//required wait;
		cy.SAVE();
		cy.wait(1000)//required wait;
	});
	it('TC - Verify material record attributes', function () {
		_common.maximizeContainer(cnt.uuid.ITEMSCONTRACT);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.BAS_UOM_FK, CONTAINERS_MATERIAL_RECORDS.UOM);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.SPECIFICATION, CONTAINERS_MATERIAL_RECORDS.specification);
		_common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT, app.GridCells.MIN_QUANTITY, CONTAINERS_MATERIAL_RECORDS.min_quanttiy);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Code);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.DESCRIPTION_1, MATERIALRECORD_DESC);
	});
	it('TC - Verify Specification Formated Text', function () {
		_common.minimizeContainer(cnt.uuid.ITEMSCONTRACT);
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SPECIFICATION_FORMATTED_TEXT, app.FooterTab.SPECIFICATION_FORMATTED_TEXT_ITEM);
		});
		_mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.SPECIFICATION_FORMATTED_TEXT).containsValue(CONTAINERS_PRICE_LISTS.specification);
	});
	it('TC - verify material lookup should fitler with procurement structure', function () {

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.search_MaterialNo_FromLookup(Code2);
		_materialPage.assign_MaterialNo_FromLookup(Code2);
		cy.SAVE();
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRC_STRUCTURE_FK, "M");
	});
	it("TC - verify check 'Only framewok catalog', it will only search framework material", function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.clickOn_modalButtons('Material Search', 'Refresh');
		_modalView.findCheckbox_byLabelnModal('1', 'Only Framework Catalog', 0).check();
		_materialPage.search_MaterialNo_FromLookup(Code2);
		_materialPage.assign_MaterialNo_FromLookup(Code2);
		cy.SAVE();
		_common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Code2);
	}); 

	it('TC - verify check change price List material', function () {

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.clickOn_modalButtons('Material Search', 'Refresh');
		_materialPage.search_MaterialNo_FromLookup(Code2);
		_common.waitForLoaderToDisappear()
		cy.wait(1000)//required wait
		_materialPage.change_pricelist(Code2, PRICE_LIST);
		cy.wait(1000)//required wait;
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
		cy.SAVE();
	});

	it('TC - verify check Search Mode material', function () {

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.search_MaterialFromSearchSetting('Material', Code2, Code2);
		cy.wait(1000)//required wait;
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
		cy.SAVE();
		cy.SAVE();
	});
	it('TC - verify check Search Mode Specification', function () {

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.search_MaterialFromSearchSetting('Specification', CONTAINERS_MATERIAL_RECORDS.specification, Code);
		cy.wait(1000)//required wait;
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
		cy.SAVE();
	});
	it('TC - verify check Search Mode Attribute', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.search_MaterialFromSearchSetting('Attribute', ATTRIBUTES, Code2);
		cy.wait(1000)//required wait;
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
		cy.SAVE();
	});
	it('TC - verify check Search Mode Cataloge and Structure', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.search_MaterialFromSearchSetting('Catalog And Structure', MATERIALCatalog_DESC2, Code2);
		cy.wait(1000)//required wait;
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
		cy.SAVE();
	});

	it('TC - verify check search option price low to High', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		cy.wait(1000)//required wait;
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.searchmaterialFromSearchOptionFor_LowToHighPrice(MATERIALCatalog_CODE2, Code2);
		cy.wait(1000)//required wait;
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
		cy.SAVE();
	});

	it('TC - verify select multiple materials and create multiple items', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.selectMultipleMaterialFromMaterialSearch(MATERIALCatalog_CODE2, Code2, Code3);
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
		cy.SAVE();

	});
	it('TC - verify click a material, it will go to show detail', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS);
			_common.create_newRecord(cnt.uuid.ITEMSCONTRACT);
		});
		_materialPage.clickOn_cellButton(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK, Buttons.IconButtons.LOOKUP_ICO_DIALOG);
		_materialPage.selectMaterialFromMaterialSearchToShowDetails(Code2);
		_common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
		cy.SAVE();
	});
});
