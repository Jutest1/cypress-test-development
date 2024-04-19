import {_common, _controllingUnit, _estimatePage, _modalView, _package, _procurementPage, _projectPage, _saleContractPage, _validate, _wicpage,} from 'cypress/pages';
import { app, tile, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import { BOQ_ROOT_ITEM, WIC_CATALOGUES_HEADER } from 'cypress/pages/variables';
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();

const CU_DESC = 'CU-DESC-' + Cypress._.random(0, 999);
const REQ_CODE = 'REQ_CODE-' + Cypress._.random(0, 999);
const REQ_CODE_1 = 'REQ_CODE_1-' + Cypress._.random(0, 999);
const REQ_CODE_2 = 'REQ_CODE_2-' + Cypress._.random(0, 999);
const REQ_CODE_3 = 'REQ_CODE_3-' + Cypress._.random(0, 999);
const BRANCH_1 = 'B1-' + Cypress._.random(0, 999);
const BRANCH_2 = 'B2-' + Cypress._.random(0, 999);
const SUPPLIER_1_CODE = 'SUPPLIER_1_CODE-' + Cypress._.random(0, 999);
const SUPPLIER_2_CODE = 'SUPPLIER_2_CODE-' + Cypress._.random(0, 999);
const ADDRESS_1 = 'ADDRESS_1-' + Cypress._.random(0, 999);
const ADDRESS_2 = 'ADDRESS_2-' + Cypress._.random(0, 999);
const PT_CODE = 'PC-' + Cypress._.random(0, 999);
const MC_CODE = 'MC_CODE' + Cypress._.random(0, 999);
const MC_TYPE = 'MC_TYPE' + Cypress._.random(0, 999);
const MC_DESC = 'MC_DESC' + Cypress._.random(0, 999);
const MC_BP = 'MC_BP' + Cypress._.random(0, 999);
const MC_INCOTERM = 'MC_INCOTERM' + Cypress._.random(0, 999);
const MC_SUP = 'MC_SUP' + Cypress._.random(0, 999);
const MC_PAD = 'MC_PAD' + Cypress._.random(0, 999);
const MC_PFI = 'MC_PFI' + Cypress._.random(0, 999);
const MC_PPA = 'MC_PPA' + Cypress._.random(0, 999);
const MC_BRANCH = 'MC_BRANCH' + Cypress._.random(0, 999);
const AWARD = 'AWARD' + Cypress._.random(0, 999);
const PAYMENT_TERM_FI = 'PAYMENT_TERM_FI' + Cypress._.random(0, 999);
const PAYMENT_TERM_PA = 'PAYMENT_TERM_PA' + Cypress._.random(0, 999);
const WIC_CAT_DESC = 'WIC_CAT_DESC-' + Cypress._.random(0, 999);
const WIC_CAT_SUP = 'WIC_CAT_SUP-' + Cypress._.random(0, 999);
const WIC_CAT_BRANCH = 'WIC_CAT_BRANCH-' + Cypress._.random(0, 999);
const WIC_CAT_REF = 'WIC_CAT_REF-' + Cypress._.random(0, 999);

let SUPPLIER_PARAMETER_1: DataCells
let SUPPLIER_PARAMETER_2: DataCells

let BRANCH_PARAMETER_2: DataCells
let BRANCH_PARAMETER_1: DataCells

const PROJECT_NO="78" + Cypress._.random(0, 999);
const PROJECT_DESC="PR1DESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

let CONTAINER_COLUMNS_BUSINESS_PARTNER
let CONTAINER_COLUMNS_BRANCHES
let CONTAINER_COLUMNS_SUPPLIERS

let CONTAINER_COLUMNS_MATERIAL_CATALOGS

let CONTAINER_COLUMNS_CONFIGURATION_HEADER
let CONTAINER_COLUMNS_CONFIGURATION

let CONTAINERS_REQUISITION

let CONTAINERS_MATERIAL_CATALOGS

let CONTAINERS_SUPPLIER

let CONTAINERS_BRANCHES

let CONTAINERS_PROCUREMENT_STRUCTURE

let WIC_CATALOGUE_PARAMETER:DataCells
let CONTAINERS_WIC
let CONTAINER_COLUMNS_WIC_GROUP
let CONTAINER_COLUMNS_WIC_CATALOGUES
let CONTAINER_COLUMNS_DATA_TYPES
let CONTAINER_COLUMNS_DATA_RECORDS

let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells
let CONTAINERS_CONTROLLING_UNIT

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

const LINE_ITEM_DESCRIPTION='LI-DESC-' + Cypress._.random(0, 999);
let LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM

let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE

let CONTAINER_COLUMNS_PACKAGE

let CONTAINER_COLUMNS_REQUISITION
let REQUISITION_PARAMETER:DataCells

let CONTAINER_COLUMNS_REQUISITION_ITEMS
let CONTAINERS_REQUISITION_ITEMS
let CONTAINER_COLUMNS_REQUISITION_TOTALS

let CONTAINER_COLUMNS_TAX_CODE
let CONTAINERS_TAX_CODE

let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE

let CONTAINERS_CLERK_RIGHTS

let CONTAINER_COLUMNS_CONTRACTS

let WIC_CATALOGUES_VALIDATE

// ! NOTE TO ADD INCO TERM "DDPA" CODE FOR DDP UNDER CUSTOMIZING MANUALLY

ALLURE.epic('PROCUREMENT AND BPM');
ALLURE.feature('Requisition');
ALLURE.story('PCM- 2.63 | Create New Requisition');
describe('PCM- 2.63 | Create New Requisition', () => {


	before(function () {
		cy.fixture('pcm/pcm-2.63-create-new-requisition.json')
		  .then((data) => {
			this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK[0]
            }

			CONTAINER_COLUMNS_TAX_CODE=this.data.CONTAINER_COLUMNS.TAX_CODE
			CONTAINERS_TAX_CODE=this.data.CONTAINERS.TAX_CODE

			CONTAINERS_SUPPLIER=this.data.CONTAINERS.SUPPLIER
			CONTAINERS_BRANCHES=this.data.CONTAINERS.BRANCHES
			CONTAINER_COLUMNS_BRANCHES=this.data.CONTAINER_COLUMNS.BRANCHES
			SUPPLIER_PARAMETER_1 = {
				[app.GridCells.SUBSIDIARY_FK]: BRANCH_1,
				[app.GridCells.PAYMENT_TERM_PA_FK]: CONTAINERS_SUPPLIER.PAYMENT_TERM_PA[0],
				[app.GridCells.PAYMENT_TERM_FI_FK]: CONTAINERS_SUPPLIER.PAYMENT_TERM_FI[0],
				[app.GridCells.VAT_GROUP_FK]: CONTAINERS_SUPPLIER.VAT[0],
			};
			SUPPLIER_PARAMETER_2 = {
				[app.GridCells.SUBSIDIARY_FK]: BRANCH_2,
				[app.GridCells.PAYMENT_TERM_PA_FK]: CONTAINERS_SUPPLIER.PAYMENT_TERM_PA[1],
				[app.GridCells.PAYMENT_TERM_FI_FK]: CONTAINERS_SUPPLIER.PAYMENT_TERM_FI[1],
				[app.GridCells.VAT_GROUP_FK]: CONTAINERS_SUPPLIER.VAT[1],
			};

			BRANCH_PARAMETER_1 = {
				[app.GridCells.DESCRIPTION]: BRANCH_1,
				[app.GridCells.ADDRESS_TYPE_FK]: CONTAINERS_BRANCHES.BRANCH,
				[commonLocators.CommonLabels.STREET]: CONTAINERS_BRANCHES.STREET,
				[commonLocators.CommonKeys.ADDRESS_INDEX]: '1',
				[commonLocators.CommonLabels.ZIP_CODE]: CONTAINERS_BRANCHES.ZIP_CODE,
				[commonLocators.CommonLabels.COUNTRY]: CONTAINERS_BRANCHES.COUNTRY,
			};
			BRANCH_PARAMETER_2 = {
				[app.GridCells.DESCRIPTION]: BRANCH_2,
				[app.GridCells.ADDRESS_TYPE_FK]: CONTAINERS_BRANCHES.HEAD_QUARTERS,
				[commonLocators.CommonLabels.STREET]: CONTAINERS_BRANCHES.STREET,
				[commonLocators.CommonKeys.ADDRESS_INDEX]: '0',
				[commonLocators.CommonLabels.ZIP_CODE]: CONTAINERS_BRANCHES.ZIP_CODE,
				[commonLocators.CommonLabels.COUNTRY]: CONTAINERS_BRANCHES.COUNTRY,
			};

			CONTAINER_COLUMNS_BUSINESS_PARTNER=this.data.CONTAINER_COLUMNS.BUSINESS_PARTNER

			CONTAINER_COLUMNS_MATERIAL_CATALOGS=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS

			CONTAINER_COLUMNS_CONFIGURATION_HEADER=this.data.CONTAINER_COLUMNS.CONFIGURATION_HEADER
			CONTAINER_COLUMNS_CONFIGURATION=this.data.CONTAINER_COLUMNS.CONFIGURATION

			CONTAINERS_REQUISITION=this.data.CONTAINERS.REQUISITION
			
			CONTAINERS_MATERIAL_CATALOGS=this.data.CONTAINERS.MATERIAL_CATALOGS

			CONTAINERS_PROCUREMENT_STRUCTURE=this.data.CONTAINERS.PROCUREMENT_STRUCTURE

			CONTAINERS_WIC=this.data.CONTAINERS.WIC
			WIC_CATALOGUE_PARAMETER = {
				[app.GridCells.BRIEF_INFO]: WIC_CAT_DESC,
				[app.GridCells.BPD_BUSINESS_PARTNER_FK]: CONTAINERS_WIC.BUSINESS_PARTNER,
				[app.GridCells.BAS_PAYMENT_TERM_AD_FK]: CONTAINERS_WIC.PAYMENT_AD,
				[app.GridCells.BAS_PAYMENT_TERM_FI_FK]: CONTAINERS_WIC.PAYMENT_FI,
				[app.GridCells.BAS_PAYMENT_TERM_FK]: CONTAINERS_WIC.PAYMENT_PA,
			};

			CONTAINER_COLUMNS_WIC_GROUP=this.data.CONTAINER_COLUMNS.WIC_GROUP
			CONTAINER_COLUMNS_WIC_CATALOGUES=this.data.CONTAINER_COLUMNS.WIC_CATALOGUES
			WIC_CATALOGUES_VALIDATE=this.data.CONTAINER_COLUMNS.WIC_CATALOGUES_VALIDATE
			CONTAINER_COLUMNS_DATA_TYPES=this.data.CONTAINER_COLUMNS.DATA_TYPES
			CONTAINER_COLUMNS_DATA_RECORDS=this.data.CONTAINER_COLUMNS.DATA_RECORDS

			CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
            }

			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
			};

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            LINE_ITEMS_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            }

			MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION

			CONTAINER_COLUMNS_REQUISITION_ITEMS=this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
			
			CONTAINERS_REQUISITION_ITEMS=this.data.CONTAINERS.REQUISITION_ITEMS

			CONTAINER_COLUMNS_REQUISITION_TOTALS=this.data.CONTAINER_COLUMNS.REQUISITION_TOTALS

			CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE

			CONTAINERS_CLERK_RIGHTS=this.data.CONTAINERS.CLERK_RIGHTS

			CONTAINER_COLUMNS_CONTRACTS=this.data.CONTAINER_COLUMNS.CONTRACTS

			CONTAINER_COLUMNS_SUPPLIERS=this.data.CONTAINER_COLUMNS.SUPPLIERS
		  })
		  .then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
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
            _common.waitForLoaderToDisappear()

            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
		  })
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Pre-conditions', function () {
		_common.waitForLoaderToDisappear();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BUSINESS_PARTNER);
		_common.waitForLoaderToDisappear();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,CONTAINERS_REQUISITION.BUSINESS_PARTNER)
		_common.waitForLoaderToDisappear();

		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();

		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.setDefaultView(app.TabBar.BUSINESS_PARTNERS);
			_common.select_tabFromFooter(cnt.uuid.BUSINESS_PARTNERS, app.FooterTab.BUSINESS_PARTNER, 0);
			_common.setup_gridLayout(cnt.uuid.BUSINESS_PARTNERS, CONTAINER_COLUMNS_BUSINESS_PARTNER);
		});
		_common.maximizeContainer(cnt.uuid.BUSINESS_PARTNERS);
		_common.search_inSubContainer(cnt.uuid.BUSINESS_PARTNERS, CONTAINERS_REQUISITION.BUSINESS_PARTNER);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.clickOn_cellHasUniqueValue(cnt.uuid.BUSINESS_PARTNERS, app.GridCells.BUSINESS_PARTNER_NAME_1, CONTAINERS_REQUISITION.BUSINESS_PARTNER);
		_common.minimizeContainer(cnt.uuid.BUSINESS_PARTNERS);
		_common.waitForLoaderToDisappear();
			//Branch Creation
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SUBSIDIARIES, app.FooterTab.BRANCHES, 1);
			_common.waitForLoaderToDisappear();
			_common.setup_gridLayout(cnt.uuid.SUBSIDIARIES, CONTAINER_COLUMNS_BRANCHES);
		});

		_common.create_newRecord(cnt.uuid.SUBSIDIARIES);
		_procurementPage.enterRecord_toCreateBranch(cnt.uuid.SUBSIDIARIES, BRANCH_PARAMETER_1);
		cy.SAVE()
		_common.waitForLoaderToDisappear();
		_procurementPage.clickOn_ignoreButton();
		_common.waitForLoaderToDisappear();
		_common.saveCellDataToEnv(cnt.uuid.SUBSIDIARIES, app.GridCells.ADDRESSD_TO, ADDRESS_1);

		_common.create_newRecord(cnt.uuid.SUBSIDIARIES);
		_procurementPage.enterRecord_toCreateBranch(cnt.uuid.SUBSIDIARIES, BRANCH_PARAMETER_2);
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_procurementPage.clickOn_ignoreButton();
		_common.waitForLoaderToDisappear();
		_common.saveCellDataToEnv(cnt.uuid.SUBSIDIARIES, app.GridCells.ADDRESSD_TO, ADDRESS_2);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();

			//Supplier Creation
		_common.openTab(app.TabBar.BUSINESS_PARTNERS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SUPPLIERS, app.FooterTab.SUPPLIERS, 1);
			_common.setup_gridLayout(cnt.uuid.SUPPLIERS, CONTAINER_COLUMNS_SUPPLIERS);
		});
		_common.create_newRecord(cnt.uuid.SUPPLIERS);
		_procurementPage.enterRecord_toCreateSupplier(cnt.uuid.SUPPLIERS, SUPPLIER_PARAMETER_1);
		cy.SAVE()
		_common.waitForLoaderToDisappear();
		_common.saveCellDataToEnv(cnt.uuid.SUPPLIERS, app.GridCells.CODE, SUPPLIER_1_CODE);
		_common.create_newRecord(cnt.uuid.SUPPLIERS);
		_procurementPage.enterRecord_toCreateSupplier(cnt.uuid.SUPPLIERS, SUPPLIER_PARAMETER_2);
		cy.SAVE()
		_common.waitForLoaderToDisappear();
		_common.saveCellDataToEnv(cnt.uuid.SUPPLIERS, app.GridCells.CODE, SUPPLIER_2_CODE);


		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
		_common.waitForLoaderToDisappear();

		_common.waitForLoaderToDisappear();
		_common.openTab(app.TabBar.CATALOGS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIAL_CATALOGS, 0);
			_common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS);
		});
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
		_common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS);
		_common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS, CONTAINERS_MATERIAL_CATALOGS.CODE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, CONTAINERS_MATERIAL_CATALOGS.CODE);
		_common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOGS.BUSINESS_PARTNER);
		_common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_AD_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOGS.PAYMENT_TERM_AD);
		_common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SUPPLIER.PAYMENT_TERM_PA[1]);
		_common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_FI_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SUPPLIER.PAYMENT_TERM_FI[1]);
		_common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PRC_INCO_TERM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOGS.INCOTERMS);
		cy.SAVE()
		_common.waitForLoaderToDisappear();
		_common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS);

		_common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
		cy.REFRESH_SELECTED_ENTITIES()
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.CODE, MC_CODE);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.MATERIAL_CATALOG_TYPE_FK, MC_TYPE);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.DESCRIPTION_INFO, MC_DESC);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.BUSINESS_PARTNER_FK, MC_BP);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PRC_INCO_TERM_FK, MC_INCOTERM);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.SUPPLIER_FK, MC_SUP);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_AD_FK, MC_PAD);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_FK, MC_PPA);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.PAYMENT_TERM_FI_FK, MC_PFI);
		_common.saveCellDataToEnv(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.SUBSIDIARY_FK, MC_BRANCH);


		_common.waitForLoaderToDisappear();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
		_common.waitForLoaderToDisappear();

		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
			_common.setup_gridLayout(cnt.uuid.CONFIGURATION_HEADER, CONTAINER_COLUMNS_CONFIGURATION_HEADER);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_PROCUREMENT_STRUCTURE.MATERIAL);

		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATIONS, app.FooterTab.CONFIGURATIONS, 2);
			_common.setup_gridLayout(cnt.uuid.CONFIGURATIONS, CONTAINER_COLUMNS_CONFIGURATION);
		});
		_common.maximizeContainer(cnt.uuid.CONFIGURATIONS);
		_common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS, CONTAINERS_PROCUREMENT_STRUCTURE.REQUISITION);
		_common.waitForLoaderToDisappear();
		_common.select_dataFromSubContainer(cnt.uuid.CONFIGURATIONS, CONTAINERS_PROCUREMENT_STRUCTURE.CONFIGURATION);
		_common.saveCellDataToEnv(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_AWARD_METHOD_FK, AWARD);
		_common.saveCellDataToEnv(cnt.uuid.CONFIGURATIONS, app.GridCells.PAYMENT_TERM_FI_FK, PAYMENT_TERM_FI);
		_common.saveCellDataToEnv(cnt.uuid.CONFIGURATIONS, app.GridCells.PAYMENT_TERM_PA_FK, PAYMENT_TERM_PA);

		_common.minimizeContainer(cnt.uuid.CONFIGURATIONS);
	})

	it('TC - Create WIC Catalogues', function () {
		_common.waitForLoaderToDisappear();
		_common.waitForLoaderToDisappear();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIC);
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();

		_common.waitForLoaderToDisappear();
		_common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.WIC_GROUPS, app.FooterTab.WICGROUPS, 0);
			_common.setup_gridLayout(cnt.uuid.WIC_GROUPS, CONTAINER_COLUMNS_WIC_GROUP);
		});
		_common.search_inSubContainer(cnt.uuid.WIC_GROUPS, CONTAINERS_WIC.WIC_CODE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.WIC_GROUPS, app.GridCells.CODE, CONTAINERS_WIC.WIC_CODE);

		_common.openTab(app.TabBar.WORKITEMCATALOG).then(() => {
			_common.select_tabFromFooter(cnt.uuid.WIC_CATALOGUES, app.FooterTab.WICCATALOGUES, 1);
			_common.setup_gridLayout(cnt.uuid.WIC_CATALOGUES, CONTAINER_COLUMNS_WIC_CATALOGUES);
			_common.set_columnAtTop([WIC_CATALOGUES_VALIDATE.briefinfo, WIC_CATALOGUES_VALIDATE.bpdbusinesspartnerfk, WIC_CATALOGUES_VALIDATE.bpdsubsidiaryfk, WIC_CATALOGUES_VALIDATE.reference, WIC_CATALOGUES_VALIDATE.baspaymenttermadfk, WIC_CATALOGUES_VALIDATE.baspaymenttermfifk, WIC_CATALOGUES_VALIDATE.bpdsupplierfk, WIC_CATALOGUES_VALIDATE.baspaymenttermfk],cnt.uuid.WIC_CATALOGUES);
		});
		_common.maximizeContainer(cnt.uuid.WIC_CATALOGUES);
		_common.create_newRecord(cnt.uuid.WIC_CATALOGUES);
		_common.waitForLoaderToDisappear();
		_wicpage.enterRecord_toCreateWICCatalogs(cnt.uuid.WIC_CATALOGUES, WIC_CATALOGUE_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.saveCellDataToEnv(cnt.uuid.WIC_CATALOGUES, app.GridCells.REFERENCE, WIC_CAT_REF, BOQ_ROOT_ITEM);
		_common.saveCellDataToEnv(cnt.uuid.WIC_CATALOGUES, app.GridCells.BPD_SUPPLIER_FK, WIC_CAT_SUP, WIC_CATALOGUES_HEADER);
		_common.saveCellDataToEnv(cnt.uuid.WIC_CATALOGUES, app.GridCells.BPD_SUBSIDIARY_FK, WIC_CAT_BRANCH, WIC_CATALOGUES_HEADER);
	});

	it('TC - Set Is Framework under customizing module', function () {
		//Customizing Code Start
		_common.waitForLoaderToDisappear();
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);

		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();

		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
			_common.setup_gridLayout(cnt.uuid.ENTITY_TYPES, CONTAINER_COLUMNS_DATA_TYPES);
		});
		_common.search_inSubContainer(cnt.uuid.ENTITY_TYPES, commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES, app.GridCells.NAME, commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE);

		_common.openTab(app.TabBar.MASTER_DATA).then(() => {
			_common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
			_common.setup_gridLayout(cnt.uuid.INSTANCES, CONTAINER_COLUMNS_DATA_RECORDS);
		});
		_common.search_inSubContainer(cnt.uuid.INSTANCES, Cypress.env(MC_TYPE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, Cypress.env(MC_TYPE));
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK);
		_validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK, commonLocators.CommonKeys.CHECK);

		cy.SAVE();
		_common.waitForLoaderToDisappear();
		//Custominzing Code End
	});

	it('TC - Create controlling unit', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  

        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
          _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC)
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CNTSUBCODE")
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
	});

	it('TC - Create estimate header', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT); 
        _common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create line item', function () {
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Add resource to line item.', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
	});

	it("TC - Create material package from wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.openTab(app.TabBar.PACKAGE).then(() => {
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
          _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);  
    });

    it("TC - Change package status", function () {

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        _common.waitForLoaderToDisappear()
    })

	it('TC - Create requisition', function () {
		REQUISITION_PARAMETER = {
			[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
			[app.GridCells.CONTROLLING_UNIT_FK]: Cypress.env('CNTSUBCODE'),
			[app.GridCells.PACKAGE_FK]: Cypress.env("PACKAGE_CODE_0"),
			[app.GridCells.STRUCTURE]: CONTAINERS_REQUISITION.STRUCTURE_CODE,
			[app.GridCells.TAX_CODE_FK]: CONTAINERS_REQUISITION.TAX_CODE
		};

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN);
			_common.waitForLoaderToDisappear();
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.controllingunitfk, CONTAINER_COLUMNS_REQUISITION.packagefk, CONTAINER_COLUMNS_REQUISITION.structure, CONTAINER_COLUMNS_REQUISITION.taxcodefk], cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear();
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.PROJECT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PROJECT_NO)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, REQ_CODE);

		_common.waitForLoaderToDisappear();
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear();
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.PROJECT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PROJECT_NO)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, REQ_CODE_1);

		_common.waitForLoaderToDisappear();
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear();
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.PROJECT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,PROJECT_NO)
        _common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, REQ_CODE_3);

		_common.minimizeContainer(cnt.uuid.REQUISITIONS);
	});

	it('TC - Set value to business partner, the branch and supplier should auto get value from bp', function () {

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE_3));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE_3));

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION_ITEMS.price, CONTAINER_COLUMNS_REQUISITION_ITEMS.quantity, CONTAINER_COLUMNS_REQUISITION_ITEMS.basuomfk], cnt.uuid.REQUISITIONITEMS);
		});

		_common.create_newRecord(cnt.uuid.REQUISITIONITEMS);
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONITEMS,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.PRICE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONITEMS)
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.BAS_UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.UOM);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONITEMS)
		_common.enterRecord_inNewRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION_ITEMS.QUANTITY);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONITEMS)
		cy.SAVE();
		_common.waitForLoaderToDisappear();


		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.businesspartnerfk, CONTAINER_COLUMNS_REQUISITION.supplierfk, CONTAINER_COLUMNS_REQUISITION.subsidiaryfk, CONTAINER_COLUMNS_REQUISITION.code], cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BUSINESS_PARTNER);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()

		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		cy.SAVE();
		_common.waitForLoaderToDisappear()

		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, Cypress.env(SUPPLIER_2_CODE));
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, BRANCH_2 + ',' + Cypress.env(ADDRESS_2));
	});

	it('TC - The branch drop down should filter with bp and supplier', function () {
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.businesspartnerfk, CONTAINER_COLUMNS_REQUISITION.supplierfk, CONTAINER_COLUMNS_REQUISITION.subsidiaryfk, CONTAINER_COLUMNS_REQUISITION.code], cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BUSINESS_PARTNER);
		_common.waitForLoaderToDisappear();
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, BRANCH_2 + ',' + Cypress.env(ADDRESS_2));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env(SUPPLIER_2_CODE));
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, BRANCH_2 + ',' + Cypress.env(ADDRESS_2));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK);
		_common.waitForLoaderToDisappear();
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env(SUPPLIER_1_CODE));
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, BRANCH_1 + ',' + Cypress.env(ADDRESS_1));
	});

	it('TC - The supplier should filter with branch', function () {
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.businesspartnerfk, CONTAINER_COLUMNS_REQUISITION.supplierfk, CONTAINER_COLUMNS_REQUISITION.subsidiaryfk, CONTAINER_COLUMNS_REQUISITION.code], cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BUSINESS_PARTNER);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		_common.waitForLoaderToDisappear();
		_common.waitForLoaderToDisappear();
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BRANCH_1);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, Cypress.env(SUPPLIER_1_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, BRANCH_2);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, Cypress.env(SUPPLIER_2_CODE));
	});

	it('TC - Set value to bp, the vat group should get value from bpd_suppliercompany first, if null then from bpd_supplier', function () {

		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.businesspartnerfk, CONTAINER_COLUMNS_REQUISITION.bpdvatgroupfk, CONTAINER_COLUMNS_REQUISITION.code], cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BUSINESS_PARTNER);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);

		_common.waitForLoaderToDisappear();
		_common.waitForLoaderToDisappear();
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear();

		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BPD_VAT_GROUP_FK, CONTAINERS_SUPPLIER.VAT[1]);
	});

	it('TC - Set value to bp and supplier, the payment term(FI) and payment Term(PA)et value from bpd_supplier company first, if null then from bpd_supplier', function () {
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.businesspartnerfk, CONTAINER_COLUMNS_REQUISITION.subsidiaryfk, CONTAINER_COLUMNS_REQUISITION.supplierfk, CONTAINER_COLUMNS_REQUISITION.baspaymenttermfifk, CONTAINER_COLUMNS_REQUISITION.baspaymenttermpafk, CONTAINER_COLUMNS_REQUISITION.code],cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BUSINESS_PARTNER);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		_common.waitForLoaderToDisappear();
		_common.waitForLoaderToDisappear();
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_FI_FK, CONTAINERS_SUPPLIER.PAYMENT_TERM_FI[1]);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_PA_FK, CONTAINERS_SUPPLIER.PAYMENT_TERM_PA[1]);

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env(SUPPLIER_1_CODE));
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_FI_FK, CONTAINERS_SUPPLIER.PAYMENT_TERM_FI[0]);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_PA_FK, CONTAINERS_SUPPLIER.PAYMENT_TERM_PA[0]);
	});

	it('TC - Set value to supplier, then vat group should be regenerated, after the vat group had be changed, it should recalculate items container/boqistion container and total container for gross columns', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TAX_CODE);
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();

		_common.clickOn_cellHasUniqueValue(cnt.uuid.TAX_CODE, app.GridCells.ID_SMALL, CONTAINERS_REQUISITION.TAX_CODE_ID);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.TAX_CODE_MATRIXS, app.GridCells.BPD_VAT_GROUP_FK, CONTAINERS_SUPPLIER.VAT[1]);
		_common.enterRecord_inNewRow(cnt.uuid.TAX_CODE_MATRIXS, app.GridCells.VAT_PERCENT,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.VAT_PERCENT);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
		_common.waitForLoaderToDisappear();

		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.businesspartnerfk, CONTAINER_COLUMNS_REQUISITION.code], cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK);
		_common.waitForLoaderToDisappear();
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BUSINESS_PARTNER);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		_common.waitForLoaderToDisappear();
		_common.waitForLoaderToDisappear();
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.minimizeContainer(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 2);
			_common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS);
		});
		_common.search_inSubContainer(cnt.uuid.REQUISITION_TOTALS, commonLocators.CommonKeys.TOTAL);
		_validate.verify_VATCalculation(cnt.uuid.REQUISITION_TOTALS, CONTAINERS_REQUISITION.VAT_PERCENT);
	});

	it('TC - Create tax code for procurement structure', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
		});
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_REQUISITION.PROCUREMENT_CODE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_REQUISITION.PROCUREMENT_CODE);
		_common.waitForLoaderToDisappear();
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.TAX_CODES, app.FooterTab.TAX_CODE, 1);
			_common.setup_gridLayout(cnt.uuid.TAX_CODES, CONTAINER_COLUMNS_TAX_CODE);
		});
		_common.waitForLoaderToDisappear();
		_procurementPage.enterRecord_toCreateTaxCodeForProcurementStructure(cnt.uuid.TAX_CODES, CONTAINERS_TAX_CODE.LEDGER, CONTAINERS_TAX_CODE.TAX_CODE);
	});

	it('TC - Modify structure, the tax code should get value of new structure from PRC_STRUCTURE_TAX', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
		_common.waitForLoaderToDisappear();

		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.structure, CONTAINER_COLUMNS_REQUISITION.code, CONTAINER_COLUMNS_REQUISITION.taxcodefk], cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE);
		_common.waitForLoaderToDisappear();
		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.PROCUREMENT_CODE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.TAX_CODE_FK, Cypress.env('PR_TAX_CODE'));
	});

	it('TC - The framework material catalog should filter with mdc_material_catalog.isframework=true', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.materialcatalogfk, CONTAINER_COLUMNS_REQUISITION.code], cnt.uuid.REQUISITIONS);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.MATERIAL_CATALOG_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOGS.CODE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.MATERIAL_CATALOG_FK, CONTAINERS_MATERIAL_CATALOGS.CODE);
	});

	it('TC - Set value to framework material catalog, the payment(FI),payment Term(PA) payment term(AD), and business partner branch and supplier, incoterms should get value from framework material catalog, and those columns should be read only', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop(
				[
					CONTAINER_COLUMNS_REQUISITION.materialcatalogfk,
					CONTAINER_COLUMNS_REQUISITION.code,
					CONTAINER_COLUMNS_REQUISITION.incotermfk,
					CONTAINER_COLUMNS_REQUISITION.baspaymenttermpafk,
					CONTAINER_COLUMNS_REQUISITION.baspaymenttermfifk,
					CONTAINER_COLUMNS_REQUISITION.baspaymenttermadfk,
					CONTAINER_COLUMNS_REQUISITION.subsidiaryfk,
					CONTAINER_COLUMNS_REQUISITION.supplierfk,
				],
				cnt.uuid.REQUISITIONS
			);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));
		_common.waitForLoaderToDisappear();

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, Cypress.env(MC_BP));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.INCO_TERM_FK, Cypress.env(MC_INCOTERM));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.INCO_TERM_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_AD_FK, Cypress.env(MC_PAD));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_AD_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_FI_FK, Cypress.env(MC_PFI));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_FI_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_PA_FK, Cypress.env(MC_PPA));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_PA_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, Cypress.env(MC_SUP));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, Cypress.env(MC_BRANCH));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, commonLocators.CommonKeys.NOT_VISIBLE);
	});

	it('TC - Select a configuration, payment term and award method should get default value from prc_configuration', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop(
				[
					CONTAINER_COLUMNS_REQUISITION.controllingunitfk,
					CONTAINER_COLUMNS_REQUISITION.packagefk,
					CONTAINER_COLUMNS_REQUISITION.structure,
					CONTAINER_COLUMNS_REQUISITION.taxcodefk,
					CONTAINER_COLUMNS_REQUISITION.prcawardmethodfk,
					CONTAINER_COLUMNS_REQUISITION.baspaymenttermpafk,
					CONTAINER_COLUMNS_REQUISITION.baspaymenttermfifk,
				],
				cnt.uuid.REQUISITIONS
			);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE_1));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE_1));

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.PRC_AWARD_METHOD_FK, Cypress.env(AWARD));
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_FI_FK, Cypress.env(PAYMENT_TERM_FI));
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_PA_FK, Cypress.env(PAYMENT_TERM_PA));
	});

	it('TC - Deep copy button is working', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.controllingunitfk, CONTAINER_COLUMNS_REQUISITION.packagefk, CONTAINER_COLUMNS_REQUISITION.structure, CONTAINER_COLUMNS_REQUISITION.taxcodefk], cnt.uuid.REQUISITIONS);
		});
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE_1));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE_1));
		_common.waitForLoaderToDisappear();

		_common.clickOn_toolbarButton(cnt.uuid.REQUISITIONS, btn.ToolBar.ICO_COPY_PASTE_DEEP);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, REQ_CODE_2);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CONTROLLING_UNIT_FK, Cypress.env('CNTSUBCODE'));
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, CONTAINERS_REQUISITION.STRUCTURE_CODE);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.PACKAGE_FK, Cypress.env("PACKAGE_CODE_0"));
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.TAX_CODE_FK, CONTAINERS_REQUISITION.TAX_CODE);
	});

	it('TC - Delete button is working', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE_2));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE_2));
		_common.waitForLoaderToDisappear();

		_common.delete_recordFromContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE_2));
		_common.waitForLoaderToDisappear();
		_validate.verify_isRecordDeleted(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE_2));
	});

	it('TC - Set clerk under procurement structure role', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
		_common.waitForLoaderToDisappear();

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CLERK_RIGHTS, app.FooterTab.CLERK_RIGHT);
		});
		_common.waitForLoaderToDisappear();
		cy.wait(1000) // Added this was wait as script was getting failed
		_common.waitForLoaderToDisappear();

		_common.delete_recordInContainer_ifRecordExists(cnt.uuid.CLERK_RIGHTS);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
		_common.waitForLoaderToDisappear();

		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
		});
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL);
		_common.waitForLoaderToDisappear();
		//_common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_PROCUREMENT_STRUCTURE.CODE)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_PROCUREMENT_STRUCTURE.CODE);
		_common.waitForLoaderToDisappear();;
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, app.FooterTab.ROLES);
			_common.waitForLoaderToDisappear();;
			_saleContractPage.enterRecord_toCreateNewRole_Ifnotexist(CONTAINERS_PROCUREMENT_STRUCTURE.CLERK);
		});
		_saleContractPage.select_role_of_ProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_PROCUREMENT_STRUCTURE.ROLE);
		_saleContractPage.selectClerkRoleInRole(CONTAINERS_PROCUREMENT_STRUCTURE.ROLE);
		cy.SAVE();
		_common.waitForLoaderToDisappear();;
	});

	it('TC - Set value to structure, if structure. responsible role and requisition owner role is not null, and PRC_STRUCTURE2CLERK exist records with same clerk role, the contract. responsible and requisition owner should get value from PRC_STRUCTURE2CLERK', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
		_common.waitForLoaderToDisappear();
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.clerkreqfk, CONTAINER_COLUMNS_REQUISITION.packagefk, CONTAINER_COLUMNS_REQUISITION.structure, CONTAINER_COLUMNS_REQUISITION.clerkprcfk], cnt.uuid.REQUISITIONS);
		});
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_REQ_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_PRC_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();


		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PROCUREMENT_STRUCTURE.CODE);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.select_rowHasValue(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_REQ_FK, Cypress.env('Clerk'));
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_PRC_FK, Cypress.env('Clerk'));
		_common.minimizeContainer(cnt.uuid.REQUISITIONS)
	});

	it('TC - Select value to structure, set value to project, contract responsible and requisition owner should get value from project CLERK', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear();
		_common.waitForLoaderToDisappear();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
		_common.waitForLoaderToDisappear();

		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CLERK_RIGHTS, app.FooterTab.CLERK_RIGHT);
		});
		_common.waitForLoaderToDisappear();
		cy.wait(1000) // Added this was wait as script was getting failed
		_common.waitForLoaderToDisappear();

		_common.delete_recordInContainer_ifRecordExists(cnt.uuid.CLERK_RIGHTS);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.create_newRecord(cnt.uuid.CLERK_RIGHTS);
		_common.edit_dropdownCellWithInput(cnt.uuid.CLERK_RIGHTS, app.GridCells.CLERK_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CLERK_RIGHTS.CLERK_NAME);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();;

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
		_common.waitForLoaderToDisappear();

		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
			_common.waitForLoaderToDisappear();
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
		});
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL);
		_common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINERS_CLERK_RIGHTS.PROCUREMENT_CODE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINERS_CLERK_RIGHTS.PROCUREMENT_CODE);
		_saleContractPage.select_role_of_ProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES, commonLocators.CommonKeys.PROJECT_MANAGER);
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.PRC_CONFIG_HEADER_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, commonLocators.CommonKeys.MATERIAL);
		_common.select_activeRowInContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
		_common.waitForLoaderToDisappear();

		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK, app.FooterTab.CLERK, 1);
		});
		cy.wait(1000) // Added this wait as container takes time to load
		_common.delete_recordInContainer_ifRecordExists(cnt.uuid.PROCUREMENT_STRUCTURE_CLERK);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
		_common.waitForLoaderToDisappear();

		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION.clerkreqfk, CONTAINER_COLUMNS_REQUISITION.packagefk, CONTAINER_COLUMNS_REQUISITION.structure, CONTAINER_COLUMNS_REQUISITION.clerkprcfk], cnt.uuid.REQUISITIONS);
		});
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE));

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_REQ_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_PRC_FK);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE);
		_common.clickOn_activeContainerButton(cnt.uuid.REQUISITIONS, btn.IconButtons.ICO_INPUT_DELETE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CLERK_RIGHTS.PROCUREMENT_CODE);
		_common.select_activeRowInContainer(cnt.uuid.REQUISITIONS)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		_common.waitForLoaderToDisappear();
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.select_rowHasValue(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE));
		_common.waitForLoaderToDisappear();
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_REQ_FK, CONTAINERS_CLERK_RIGHTS.CLERK_NAME);
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CLERK_PRC_FK, CONTAINERS_CLERK_RIGHTS.CLERK_NAME);
		_common.minimizeContainer(cnt.uuid.REQUISITIONS)

	});

	it('TC - Set value to framework WIC Boq and Framework WIc Gropu, the payment(FI),payment Term(PA) payment term(AD), and business partner branch and supplier should get value from framework WIc Gropu, and those columns should be read only', function () {
	
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.set_columnAtTop(
				[
					CONTAINER_COLUMNS_REQUISITION.boqwiccatboqfk,
					CONTAINER_COLUMNS_REQUISITION.boqwiccatfk,
					CONTAINER_COLUMNS_REQUISITION.code,
					CONTAINER_COLUMNS_REQUISITION.incotermfk,
					CONTAINER_COLUMNS_REQUISITION.baspaymenttermpafk,
					CONTAINER_COLUMNS_REQUISITION.baspaymenttermfifk,
					CONTAINER_COLUMNS_REQUISITION.baspaymenttermadfk,
					CONTAINER_COLUMNS_REQUISITION.subsidiaryfk,
					CONTAINER_COLUMNS_REQUISITION.supplierfk,
				],
				cnt.uuid.REQUISITIONS
			);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);
		cy.REFRESH_CONTAINER().wait(1000);
		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE_3));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE_3));
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BOQ_WIC_CAT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_WIC.WIC_CODE);
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		_common.waitForLoaderToDisappear();
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BOQ_WIC_CAT_BOQ_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env(WIC_CAT_REF));
		_common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.CODE);
		_common.waitForLoaderToDisappear();
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.waitForLoaderToDisappear();
		_common.clickOn_modalFooterButton_ifExists(btn.ButtonText.YES)
		_common.waitForLoaderToDisappear();

		_common.maximizeContainer(cnt.uuid.REQUISITIONS)
		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_WIC.BUSINESS_PARTNER);
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_AD_FK, CONTAINERS_WIC.PAYMENT_AD);
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_AD_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_FI_FK, CONTAINERS_WIC.PAYMENT_FI);
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_FI_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_PA_FK, CONTAINERS_WIC.PAYMENT_PA);
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.BAS_PAYMENT_TERM_PA_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, Cypress.env(WIC_CAT_SUP));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.SUPPLIER_FK, commonLocators.CommonKeys.NOT_VISIBLE);

		_common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, Cypress.env(WIC_CAT_BRANCH));
		_validate.verify_inputFieldVisibility(cnt.uuid.REQUISITIONS, app.GridCells.SUBSIDIARY_FK, commonLocators.CommonKeys.NOT_VISIBLE);
		_common.minimizeContainer(cnt.uuid.REQUISITIONS)

	});

	it("TC - Set value to framework material catalog and framwork wic boq, the purchase orders will change to 'Framework Contract Call Off'", function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		_common.waitForLoaderToDisappear()
		_validate.verify_isContainerMinimized(cnt.uuid.REQUISITIONS);

		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});
		_common.maximizeContainer(cnt.uuid.REQUISITIONS);

		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(REQ_CODE_3));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env(REQ_CODE_3));
		_common.waitForLoaderToDisappear();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
		_common.waitForLoaderToDisappear();
		_common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
		_common.waitForLoaderToDisappear();
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
		});

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
		_package.create_ContractfromPackage(CONTAINERS_WIC.BUSINESS_PARTNER);
		cy.wait(3000) // Added this wait as container takes time to load

		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
			_common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACTS.purchaseorders, CONTAINER_COLUMNS_CONTRACTS.materialcatalogfk, CONTAINER_COLUMNS_CONTRACTS.code, CONTAINER_COLUMNS_CONTRACTS.packagefk], cnt.uuid.PROCUREMENTCONTRACT);
		});
		_common.maximizeContainer(cnt.uuid.PROCUREMENTCONTRACT);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear();
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT);
		_common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, PROJECT_NO);
		_common.waitForLoaderToDisappear();

		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.MATERIAL_CATALOG_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_CATALOGS.CODE);
		_common.clickOn_activeRowCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE);
		cy.wait(1000).then(() => {
			_common.clickOn_modalFooterButton(btn.ButtonText.YES);
		});
		cy.SAVE();
		_common.waitForLoaderToDisappear();

		_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PURCHASE_ORDERS, 'Framework Contract Call Off');
	});
});
