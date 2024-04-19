import { tile, app, cnt, btn } from 'cypress/locators';
import { _common, _estimatePage, _package, _validate, _boqPage, _controllingUnit } from 'cypress/pages';

const allure = Cypress.Allure.reporter.getInterface();
const CU_DESC = 'CU_DESC' + Cypress._.random(0, 999);
const CODE = 'Code_' + Cypress._.random(0, 999);
const PROCUREMENT = 'M' + Cypress._.random(0, 999);
allure.epic('PROCUREMENT AND BPM');
allure.feature('Package');
allure.story('PCM- 2.1 | Create a Material Package directly from Package module & delete the same');

describe('PCM- 2.1 | Create a Material Package directly from Package module & delete the same', () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-2.1-create-a-material-package-directly-from-package-module-and-delete-the-same.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('pcm/pcm-2.1-create-a-material-package-directly-from-package-module-and-delete-the-same.json').then((data) => {
			this.data = data;
			const standerdInputs = this.data.Prerequisites.SidebarInputes;
			const ProjectInputs = this.data.Prerequisites.Project;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openSidebarOption('Search').delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Verify creating controlling Units for the project', function () {
		const standerdInputs = this.data.Prerequisites.SidebarInputes;
		const sideBaroptions = this.data.sideBarInputs.SidebarOptions;
		const controllingnewrecordinput = this.data.CreatenewrecordinCU.CreateControlingunit;
		const controllingUnitGrid = this.data.controllingUnit_columns.column_headers;
		_common.openSidebarOption(sideBaroptions.quickStart).search_fromSidebar(standerdInputs.quickStartWindow, standerdInputs.quickStartWindowdescribtion);
		_common.openSidebarOption(sideBaroptions.Search).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		_common.openTab(app.tabBar.controllingStructure).then(() => {
			_common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, controllingUnitGrid);
		});
		_common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT);
		_controllingUnit.create_ControllingUnit(CU_DESC, controllingnewrecordinput.quantity, controllingnewrecordinput.uom);
		_common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT);
	});
	it('TC - Creation of Procurement Structures and Tax Codes', function () {
		const sideBaroptions = this.data.sideBarInputs.SidebarOptions;
		const standerdInputs = this.data.Prerequisites.SidebarInputes;
		const procurementColumns = this.data.ProcurementColumns.ColumnHeaders;
		const taxCodesColumns = this.data.TaxCodesColumns.ColumnHeaders;
		const taxCode = this.data.TaxCodes.ColumnInput;
		const structure = this.data.Package.PackageInput;
		const rolesCodesColumns = this.data.RoleCodesColumns.ColumnHeaders;
		const roles = this.data.Roles.ColumnInput;

		_common.openSidebarOption(sideBaroptions.quickStart).search_fromSidebar(standerdInputs.quickStartWindow, standerdInputs.procurementStructure);
		_common.openTab(app.tabBar.ProcurementStructure).then(() => {
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, procurementColumns);
		});
		cy.wait(2000);
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
		cy.REFRESH_CONTAINER();
		_common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.collapseAll(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, structure.Structure);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, structure.Structure);
		cy.SAVE();
		cy.wait(2000);
		_common.openTab(app.tabBar.ProcurementStructure).then(() => {
			_common.select_tabFromFooter(cnt.uuid.TAX_CODES, app.FooterTab.TAX_CODE, 1);
			_common.setup_gridLayout(cnt.uuid.TAX_CODES, taxCodesColumns);
		});
		_common.clear_subContainerFilter(cnt.uuid.TAX_CODES);
		_estimatePage.enterRecord_toCreate_TaxCodes(taxCode.taxcode);
		cy.SAVE();
		_common.saveCellDataToEnv(cnt.uuid.TAX_CODES, app.GridCells.MDC_TAX_CODE_FK_SMALL, 'TaxCode');
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.expandAll(cnt.uuid.PROCUREMENT_STRUCTURES);
		_common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES, structure.PSCode);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES, app.GridCells.CODE, structure.PSCode);

		_common.openTab(app.tabBar.ProcurementStructure).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, app.FooterTab.ROLES, 1);
			_common.setup_gridLayout(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, rolesCodesColumns);
		});
		_common.clear_subContainerFilter(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES);
		_estimatePage.enterRecord_toCreate_Roles(roles.Cleark);
		cy.SAVE();
		_common.saveCellDataToEnv(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, app.GridCells.CLERK_FK, 'ClerkValue');
	});
	it('TC - Creation of Package, directly from Package Module', function () {
		const standerdInputs = this.data.Prerequisites.SidebarInputes;
		const packageColumns = this.data.packageColumns.ColumnHeaders;
		const BusinessParner = this.data.BusinessParner.Input;
		const Package = this.data.Package.PackageInput;
		_common.openSidebarOption('Quick Start').search_fromSidebar('quickstart', 'Package');
		cy.wait(5000);
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			cy.wait(1000)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, 'Package');
			_common.setup_gridLayout(cnt.uuid.PACKAGE, packageColumns);
		});
		//_common.maximizeContainer(cnt.uuid.PACKAGE);
		_common.clear_subContainerFilter(cnt.uuid.PACKAGE);
		_common.create_newRecord(cnt.uuid.PACKAGE);
		_package.enterRecord_toCreatePackage(standerdInputs.Material, standerdInputs.MaterialPackage);
		cy.SAVE();
		cy.wait(2000);
		_common.maximizeContainer(cnt.uuid.PACKAGE)
		_common.selectCellInSubContainer(cnt.uuid.PACKAGE,app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL)
		_package.assignControllingUnit_toPackage(Cypress.env('CNTSUBCODE'));
		cy.SAVE();
		_common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.TAX_CODE_FK, Cypress.env('TaxCode'));
		cy.wait(2000);
		_package.changeProcurementStructure_InPackage(Package.PSCode);
		_common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.gridCells.REQUISITION_OWNER, Cypress.env('ClerkValue'));
		_common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.CLERK_PRC_FK, Cypress.env('ClerkValue'));
		cy.wait(2000);

		_package.assert_BusinessPartner_ByGetText_of_Branch_supplier_VATGroup(BusinessParner.businesspartner, Package.Supplier, Package.VATGroup);
		
		_common.minimizeContainer(cnt.uuid.PACKAGE);
	});
	it('TC - Adding Material Items in the Items container', function () {
		const Package = this.data.Package.PackageInput;
		const packageColumns = this.data.packageItems.ColumnHeaders;
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGEITEM, 'Items');
			_common.setup_gridLayout(cnt.uuid.PACKAGEITEM, packageColumns);
		});
		_common.maximizeContainer(cnt.uuid.PACKAGEITEM);
		_common.create_newRecord(cnt.uuid.PACKAGEITEM);
		_package.enterRecord_toPackage(Package.MaterialNo, Package.ItemStructure);
		_common.minimizeContainer(cnt.uuid.PACKAGEITEM);
		cy.SAVE();
	});
	it('TC - Delete Package Material', function () {
		_package.deleteRecord_PackageItems();
	});
	it('TC - Verify Procurement Structure Configuration Header', function () {
		const standerdInputs = this.data.Prerequisites.SidebarInputes;
		const sideBaroptions = this.data.sideBarInputs.SidebarOptions;
		const PS = this.data.ProcurementStructure.Inputs;
		const procurementColumns = this.data.ProcurementColumns.ColumnHeaders;
		_common.openSidebarOption(sideBaroptions.quickStart).search_fromSidebar(standerdInputs.quickStartWindow, standerdInputs.procurementStructure);
		cy.wait(3000);
		_common.openTab(app.tabBar.ProcurementStructure).then(() => {
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES, procurementColumns);
		});
		cy.wait(2000);
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES);
		cy.REFRESH_CONTAINER();
		_validate.verifyValuesOf_ProcurementStructure_and_ConfigurationHeader_are_same(PS.ConfigurationHeader1, PS.ConfigurationHeader2, PS.code1, PS.code2);
		cy.wait(3000);
		_common.openSidebarOption(sideBaroptions.quickStart).search_fromSidebar(standerdInputs.quickStartWindow, standerdInputs.Package);
		cy.wait(5000);
		_common.openTab(app.TabBar.PACKAGE);
		_common.maximizeContainer(cnt.uuid.PACKAGE);
		_common.clear_subContainerFilter(cnt.uuid.PACKAGE);
		_common.create_newRecord(cnt.uuid.PACKAGE);
		_validate.assert_Package_ProcurementStructure(PS.code1, PS.ConfigurationHeader1, PS.code2, PS.ConfigurationHeader2);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK)
	});
});
