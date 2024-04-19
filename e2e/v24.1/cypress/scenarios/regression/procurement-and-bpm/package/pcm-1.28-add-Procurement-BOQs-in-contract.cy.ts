import { tile, app, cnt, commonLocators, sidebar } from 'cypress/locators';
import CommonLocators from 'cypress/locators/common-locators';
import { _boqPage, _common, _package, _procurementContractPage, } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

import { BOQ_ROOT_ITEM } from 'cypress/pages/variables';
import _ from 'cypress/types/lodash';
const allure = Cypress.Allure.reporter.getInterface();
const REQDEC = 'REQDEC-' + Cypress._.random(0, 999);
const OUTLINESPECDESCA1 = 'OUTLINESPECDESCA1-' + Cypress._.random(0, 999);
const OUTLINESPECDESCA2 = 'OUTLINESPECDESCA2-' + Cypress._.random(0, 999);
const PACKAGE_CODE = 'PACKAGE_CODE'
const PACKAGE_CODE_1 = 'PACKAGE_CODE_1'
const PACKAGE_CODE_2 = 'PACKAGE_CODE_2'
const CONFIGURATION = 'CONFIGURATION'
const PROCUREMENT_CONTRACT_CODE = 'PROCUREMENT_CONTRACT_CODE'

let PROCUREMENT_CONTRACT_PARAMETER: DataCells,
	PROCUREMENT_CONTRACT_PARAMETER_1: DataCells

let CONTAINER_CONFIGURATION,
	CONTAINER_PROCUREMENT_STRUCTURE,
	CONTAINER_COLUMNS_CONTRACT,
	CONTAINER_COLUMNS_CONTRACT_BOQ,
	CONTAINER_COLUMNS_PACKAGE,
	CONTAINER_COLUMNS_BOQ_STRUCTURE

allure.epic('PROCUREMENT AND BPM');
allure.feature('Package');
allure.story('PCM- 1.28 | Add Procurement BOQs in contract');
describe('PCM- 1.28 | Add Procurement BOQs in contract', () => {
	before(function () {
		cy.fixture('procurement-and-bpm/pcm-1.28-add-procurement-boqs-in-contract.json').then((data) => {
			this.data = data;
			CONTAINER_CONFIGURATION = this.data.CONTAINERS.CONFIGURATION
			CONTAINER_PROCUREMENT_STRUCTURE = this.data.CONTAINERS.PROCUREMENT_STRUCTURE
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
			CONTAINER_COLUMNS_CONTRACT_BOQ = this.data.CONTAINER_COLUMNS.CONTRACT_BOQ
			CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
			CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
			PROCUREMENT_CONTRACT_PARAMETER = {
				[commonLocators.CommonLabels.CONFIGURATION]: commonLocators.CommonKeys.SERVICE,
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINER_CONFIGURATION.BUSINESS_PARTNER
			}
			PROCUREMENT_CONTRACT_PARAMETER_1 = {
				[commonLocators.CommonLabels.CONFIGURATION]: commonLocators.CommonKeys.SERVICE,
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINER_CONFIGURATION.BUSINESS_PARTNER_1
			}
			cy.preLoading(
				Cypress.env("adminUserName"),
				Cypress.env("adminPassword"),
				Cypress.env("parentCompanyName"),
				Cypress.env("childCompanyName")
			);
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
				_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
				_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
			});
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	// //**configuration prerequisite */
	it('TC -  Set configuration prerequisite ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.setDefaultView(app.TabBar.HEADER);
			cy.wait(500);  // required wait to load page
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
		});
		cy.wait(500);  // required wait to load page
		_common.search_inSubContainer(cnt.uuid.CONFIGURATION_HEADER, commonLocators.CommonKeys.SERVICE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, commonLocators.CommonKeys.CONTRACT);
		cy.wait(500);  // required wait to load page
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINER_CONFIGURATION.UNIT_RATE_CONTRACT);
		_common.enterRecord_inNewRow(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, commonLocators.CommonKeys.SERVICE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINER_CONFIGURATION.UNIT_RATE_CONTRACT);
		cy.SAVE();
		cy.REFRESH_CONTAINER();
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, commonLocators.CommonKeys.PACKAGE);
		cy.wait(500);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINER_CONFIGURATION.UNIT_RATE_CONTRACT);
		_common.enterRecord_inNewRow(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, commonLocators.CommonKeys.SERVICE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINER_CONFIGURATION.UNIT_RATE_CONTRACT);
		cy.SAVE();
		cy.REFRESH_CONTAINER();
	});

	//**Assertion 1 */
	it('TC - Create Contract for respective project and with structure ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
		cy.wait(2000) //required wait to load page
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
		_procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETER);
		_common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.STRUCTURE_CODE, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PROCUREMENT_STRUCTURE.PROCUREMENT_STRUCTURE);
		cy.SAVE();
	});

	it('TC - Create Procurment BOQ and verify the created package code  ', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQS);
		_boqPage.enterRecord_ToCreate_procurementBoQs(CommonLocators.CommonKeys.SERVICE, OUTLINESPECDESCA1, commonLocators.CommonLabels.CREATE_NEW_BOQ);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.GridCells.PACKAGE_CODE, PACKAGE_CODE);
	});

	it('TC - verify the created package code in contact  ', function () {
		cy.wait(2000).then(() => {
			_common.select_rowInContainer(cnt.uuid.PROCUREMENTCONTRACT)
			_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PACKAGE_CODE, Cypress.env(PACKAGE_CODE));
		})
	});

	it('TC - verify the created BOQ from procurementboq in Boq structure ', function () {
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			cy.wait(1000);  // required wait to load page
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
			_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, OUTLINESPECDESCA1);
		});
		cy.wait(500);
	});

	//**Assertion 2 */
	it('TC - Create Contract for respective project and with structure ', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			cy.wait(1000);  // required wait to load page
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
		_procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETER_1);
		cy.wait(3000);  // required wait to load page
		cy.SAVE();
		cy.wait(3000);  // required wait to load page
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, PROCUREMENT_CONTRACT_CODE)
	});

	it('TC - Create Procurment BOQ and verify the created package code  ', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			cy.wait(1000);  // required wait to load page
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQS);
		_package.enterRecord_toCreatePackage(commonLocators.CommonKeys.SERVICE, REQDEC);
		cy.wait(500);  // required wait to load page
		_boqPage.enterRecord_ToCreate_procurementBoQs(REQDEC, OUTLINESPECDESCA2, commonLocators.CommonLabels.CREATE_NEW_BOQ);
		cy.wait(1000);  // required wait to load page
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.GridCells.PACKAGE_CODE, PACKAGE_CODE_1);
		cy.wait(1000);  // required wait to load page
	});

	it('TC - verify the created BOQ from procurementboq in Boq structure ', function () {
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
			_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, OUTLINESPECDESCA2);
		});
	});

	//**Assertion 3 */
	it('TC - Capture packagecode and configuration from contract   ', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			cy.wait(1000);  // required wait to load page
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT_BOQ);
			_common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(PROCUREMENT_CONTRACT_CODE));
			_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.PACKAGE_FK, PACKAGE_CODE_2);
			cy.wait(500);  // required wait to load page
			_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONFIGURATION_FK, CONFIGURATION);
		});
	});

	it('TC - verify the created packagecode and configuration from contrct to package  ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
		cy.wait(2000);  // required wait to load page
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"))
		cy.wait(2000); // required wait to load page
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
			_common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE, app.GridCells.DESCRIPTION, REQDEC);
			_common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.CODE, Cypress.env(PACKAGE_CODE_2));
			_common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE, app.GridCells.CONFIGURATION_FK, Cypress.env(CONFIGURATION));
		});
	});
});