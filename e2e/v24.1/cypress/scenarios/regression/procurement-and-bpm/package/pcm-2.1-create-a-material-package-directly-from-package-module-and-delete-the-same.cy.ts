import { tile, app, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _common, _estimatePage, _package, _validate, _boqPage, _controllingUnit } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const CONTROLLING_UNIT_DESC = "CU_DESC" + Cypress._.random(0, 999);

const CLERK = 'CLERK'
const TAX_CODE = 'TAX_CODE'
const CONTROLLING_UNIT = 'CONTROLLING_UNIT'

let CONTROLLING_UNIT_PARAMETERS: DataCells

let CONTAINER_COLUMNS_CONTROLLING_UNIT,
	CONTAINERS_CONTROLLING_UNIT,
	CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE,
	CONTAINER_COLUMNS_PACKAGE_ITEM,
	CONTAINER_TAX_CODE,
	CONTAINER_PACKAGE,
	CONTAINER_COLUMNS_ROLES,
	CONTAINER_ROLES,
	CONTAINER_COLUMNS_PACKAGE,
	CONTAINER_PROCUREMENT_STRUCTURE

allure.epic('PROCUREMENT AND BPM');
allure.feature('Package');
allure.story('PCM- 2.1 | Create a Material Package directly from Package module & delete the same');

describe('PCM- 2.1 | Create a Material Package directly from Package module & delete the same', () => {
	before(function () {
		cy.fixture('pcm/pcm-2.1-create-a-material-package-directly-from-package-module-and-delete-the-same.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
			CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
			CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
			CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
			CONTAINER_TAX_CODE = this.data.CONTAINERS.TAX_CODE
			CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
			CONTAINER_COLUMNS_ROLES = this.data.CONTAINER_COLUMNS.ROLES
			CONTAINER_ROLES = this.data.CONTAINERS.ROLES
			CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
			CONTAINER_PROCUREMENT_STRUCTURE = this.data.CONTAINERS.PROCUREMENT_STRUCTURE
			CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
			}
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC - Verify creating controlling Units for the project', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
		cy.wait(2000)//required wait to load page
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		_common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT);
		});
		_common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT);
		_controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, CONTROLLING_UNIT)
		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT);
	});

	it('TC - Creation of Procurement Structures and Tax Codes', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
		cy.REFRESH_CONTAINER();
		cy.wait(2000)//required wait to load page
		_common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES, Buttons.ToolBar.ICO_TREE_COLLAPSE_ALL);
		_common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_PACKAGE.STRUCTURE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINER_PACKAGE.STRUCTURE);
		cy.SAVE();
		cy.wait(2000);//required wait to load page
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.TAX_CODES, app.FooterTab.TAX_CODE, 1);
			_common.setup_gridLayout(cnt.uuid.TAX_CODES, CONTAINER_COLUMNS_PACKAGE_ITEM);
		});
		_common.clear_subContainerFilter(cnt.uuid.TAX_CODES);
		_estimatePage.enterRecord_toCreate_TaxCodes(CONTAINER_TAX_CODE.TAX_CODE);
		cy.SAVE();
		_common.saveCellDataToEnv(cnt.uuid.TAX_CODES, app.GridCells.MDC_TAX_CODE_FK_SMALL, TAX_CODE);
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES, Buttons.ToolBar.ICO_TREE_EXPAND_ALL);
		_common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_PACKAGE.PS_CODE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, CONTAINER_PACKAGE.PS_CODE);
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, app.FooterTab.ROLES, 1);
			_common.setup_gridLayout(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_ROLES);
		});
		_common.clear_subContainerFilter(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES);
		_estimatePage.enterRecord_toCreate_Roles(CONTAINER_ROLES.CLERK);
		cy.SAVE();
		_common.saveCellDataToEnv(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, app.GridCells.CLERK_FK, CLERK);
	});

	it('TC - Creation of Package, directly from Package Module', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
		cy.wait(2000); //required wait to load page
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
			_common.clear_subContainerFilter(cnt.uuid.PACKAGE);
			_common.create_newRecord(cnt.uuid.PACKAGE);
			_package.enterRecord_toCreatePackage(commonLocators.CommonKeys.MATERIAL, commonLocators.CommonLabels.MATERIAL_PACKAGE);
			cy.SAVE();
			cy.wait(2000); //required wait to load page
			_common.maximizeContainer(cnt.uuid.PACKAGE)
			_common.clickOn_cellInSubContainer(cnt.uuid.PACKAGE, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL)
			_package.assignControllingUnit_toPackage(Cypress.env(CONTROLLING_UNIT));
			cy.SAVE();
			_common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.TAX_CODE_FK, Cypress.env(TAX_CODE));
			_package.changeProcurementStructure_InPackage(CONTAINER_PACKAGE.PS_CODE);
			cy.wait(2000);//required wait to load page
			_common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.CLERK_REQ_FK, Cypress.env(CLERK));
			_common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.CLERK_PRC_FK, Cypress.env(CLERK));
			_package.assert_BusinessPartner_ByGetText_of_Branch_supplier_VATGroup(CONTAINER_PACKAGE.BUSINESS_PARTNER, CONTAINER_PACKAGE.SUPPLIER, CONTAINER_PACKAGE.VAT_GROUP);
			_common.minimizeContainer(cnt.uuid.PACKAGE);
		});
	});

	it('TC - Adding Material Items in the Items container', function () {
		cy.wait(20000)
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS);
			_common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEM);
		});
		_common.maximizeContainer(cnt.uuid.PACKAGEITEMS);
		_common.create_newRecord(cnt.uuid.PACKAGEITEMS);
		_package.enterRecord_toPackage(CONTAINER_PACKAGE.MATERIAL_CODE, CONTAINER_PACKAGE.ITEM_STRUCTURE);
		_common.minimizeContainer(cnt.uuid.PACKAGEITEMS);
		cy.SAVE();
	});

	it('TC - Delete Package Material', function () {
		_package.deleteRecord_PackageItems();
	});

	it('TC - Verify Procurement Structure Configuration Header', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
		cy.wait(3000); //required wait to load page
		_common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE);
		});
		cy.wait(2000); //required wait to load page
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
		cy.REFRESH_CONTAINER();
		_validate.verifyValuesOf_ProcurementStructure_and_ConfigurationHeader_are_same(CONTAINER_PROCUREMENT_STRUCTURE.CONFIG_HEADER_1, CONTAINER_PROCUREMENT_STRUCTURE.CONFIG_HEADER_2, CONTAINER_PROCUREMENT_STRUCTURE.CODE_1, CONTAINER_PROCUREMENT_STRUCTURE.CODE_2);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
		cy.wait(3000); //required wait to load page
		_common.openTab(app.TabBar.PACKAGE);
		_common.maximizeContainer(cnt.uuid.PACKAGE);
		_common.clear_subContainerFilter(cnt.uuid.PACKAGE);
		_common.create_newRecord(cnt.uuid.PACKAGE);
		_validate.assert_Package_ProcurementStructure(CONTAINER_PROCUREMENT_STRUCTURE.CODE_1, CONTAINER_PROCUREMENT_STRUCTURE.CONFIG_HEADER_1, CONTAINER_PROCUREMENT_STRUCTURE.CODE_2, CONTAINER_PROCUREMENT_STRUCTURE.CONFIG_HEADER_2);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK)
	});
});
