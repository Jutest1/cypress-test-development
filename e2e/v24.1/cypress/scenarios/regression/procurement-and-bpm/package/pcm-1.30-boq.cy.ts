import { _boqPage, _common, _package, _procurementContractPage, _procurementPage, _validate, } from 'cypress/pages';

import _ from 'cypress/types/lodash';
import { tile, app, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import { DataCells } from 'cypress/pages/interfaces';
import CommonLocators from 'cypress/locators/common-locators';

const allure = Cypress.Allure.reporter.getInterface();
const OUTLINESPECDESCA1 = 'OUTLINESPECDESCA1-' + Cypress._.random(0, 999);
const TEST_ALTERNATIVE = 'TEST_ALTERNATIVE-' + Cypress._.random(0, 999);
const REQDEC = 'REQDEC-' + Cypress._.random(0, 999);
const PROCUREMENT_BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const PROCUREMENT_BOQ_STRUCT_DESC_1 = "BOQSTR-DESC-" + Cypress._.random(0, 999);

const PACKAGE_CODE = 'PACKAGE_CODE'
const VERIFY_FINAL_PRICE = 'VERIFY_FINAL_PRICE'
const EDIT_VERIFY_FINAL_PRICE = 'EDIT_VERIFY_FINAL_PRICE'
const VERIFY_ROOT = 'VERIFY_ROOT'
const BASE = 'BASE'
const ALTERNATIVE = 'ALTERNATIVE'

let PROCUREMENT_CONTRACT_PARAMETER: DataCells,
	BOQS_STRUCTURE_PARAMETERS: DataCells,
	BOQS_STRUCTURE_PARAMETERS_1: DataCells

let CONTAINER_CONFIGURATION,
	CONTAINER_COLUMNS_CONTRACT,
	CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQSTRUCTURE,
	CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE,
	CONTAINERS_PROCUREMENT_BOQ

allure.epic('PROCUREMENT AND BPM');
allure.feature('Package');
allure.story('PCM- 1.30 | BOQ');

describe('PCM- 1.30 | BOQ', () => {
	before(function () {
		cy.fixture('procurement-and-bpm/pcm-1.30-boq.json').then((data) => {
			this.data = data;
			CONTAINER_CONFIGURATION = this.data.CONTAINERS.CONFIGURATION
			CONTAINERS_PROCUREMENT_BOQ = this.data.CONTAINERS.PROCUREMENT_BOQ
			CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
			CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQSTRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_CONTRACT_BOQSTRUCTURE
			CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE = this.data.CONTAINERS.PROCUREMENT_CONTRACT_BOQSTRUCTURE
			PROCUREMENT_CONTRACT_PARAMETER = {
				[commonLocators.CommonLabels.CONFIGURATION]: commonLocators.CommonKeys.SERVICE,
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINER_CONFIGURATION.BUSINESS_PARTNER
			}
			BOQS_STRUCTURE_PARAMETERS = {
				[commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]: PROCUREMENT_BOQ_STRUCT_DESC,
				[app.GridCells.QUANTITY_SMALL]:CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.QUANTITY_1,
				[ app.GridCells.PRICE_SMALL]: CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.UNIT_RATE_1,
				[app.GridCells.BAS_UOM_FK]: CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.UOM
			  };
			  BOQS_STRUCTURE_PARAMETERS_1 = {
				[commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]: PROCUREMENT_BOQ_STRUCT_DESC_1,
				[app.GridCells.QUANTITY_SMALL]:CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.QUANTITY_2,
				[ app.GridCells.PRICE_SMALL]: CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.UNIT_RATE_2,
				[app.GridCells.BAS_UOM_FK]: CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.UOM
			  };
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
		})
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC- Set configuration prerequisite ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.setDefaultView(app.TabBar.HEADER);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
		});
		_common.search_inSubContainer(cnt.uuid.CONFIGURATION_HEADER, commonLocators.CommonKeys.SERVICE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, commonLocators.CommonKeys.CONTRACT);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINER_CONFIGURATION.UNIT_RATE_CONTRACT);
		_common.enterRecord_inNewRow(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, commonLocators.CommonKeys.SERVICE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINER_CONFIGURATION.UNIT_RATE_CONTRACT);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, commonLocators.CommonKeys.PACKAGE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINER_CONFIGURATION.UNIT_RATE_CONTRACT);
		_common.enterRecord_inNewRow(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, commonLocators.CommonKeys.SERVICE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINER_CONFIGURATION.UNIT_RATE_CONTRACT);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
	});

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
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Procurment BOQ and verify the created package code  ', function () {
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQS);
		_package.enterRecord_toCreatePackage(CONTAINERS_PROCUREMENT_BOQ.PROCUREMENT_STRUCTURE, REQDEC);
		_common.waitForLoaderToDisappear()
		_boqPage.enterRecord_ToCreate_procurementBoQs(REQDEC, OUTLINESPECDESCA1, commonLocators.CommonLabels.CREATE_NEW_BOQ);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.GridCells.PACKAGE_CODE, PACKAGE_CODE);
	});

	it('TC -Assrt 3 & 2- Modify quantity or unit rate or correction, it should trigger recalculate&create button(new,postion,copy)', function () {
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQSTRUCTURE);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, OUTLINESPECDESCA1);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.ROOT);
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, BOQS_STRUCTURE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, VERIFY_FINAL_PRICE);
		_validate.assert_cellData_not_equal(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env(VERIFY_FINAL_PRICE));
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.ROOT);
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, BOQS_STRUCTURE_PARAMETERS_1);
		cy.SAVE()
		_common.waitForLoaderToDisappear();
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, EDIT_VERIFY_FINAL_PRICE);
		_validate.assert_cellData_not_equal(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env(EDIT_VERIFY_FINAL_PRICE));
		_procurementPage.copyRecord_toIncludingDependencies(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, btn.ToolBar.ICO_COPY);
		_procurementPage.copyRecord_toIncludingDependencies(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, btn.ToolBar.ICO_PASTE);
		_common.waitForLoaderToDisappear()
	});

	it("TC -Assrt 1 - The root item can't be deleted", function () {
		_common.select_allContainerData(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		_common.delete_recordFromContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.ROOT);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, VERIFY_ROOT);
	});

	it('TC -Assrt 4 - check lump sum calculation;', function () {
		cy.wait(1000).then(()=>{
			_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, Cypress.env(VERIFY_ROOT));
			_common.set_cellCheckboxValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.IS_LUMP_SUM,commonLocators.CommonKeys.UNCHECK);
		})
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.ROOT);
		cy.wait(1000); //required wait to load page
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, BOQS_STRUCTURE_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear();
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL, VERIFY_FINAL_PRICE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.set_cellCheckboxValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.IS_LUMP_SUM,commonLocators.CommonKeys.CHECK);
		//_common.set_cellCheckboxValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.IS_LUMP_SUM,commonLocators.CommonKeys.UNCHECK);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		cy.wait(2000);//required wait to load page
	});

	it('TC  Verify check lump sum calculation;', function () {
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.LUMP_SUM_PRICE, Cypress.env(VERIFY_FINAL_PRICE));
		_common.select_allContainerData(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		_common.delete_recordFromContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		cy.wait(1000); //required wait to load page
	});

	it('TC -Assrt 5 - check item type and ANN and AGN as BASE;', function () {
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.ROOT);
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.POSITION);
		_common.enterRecord_inNewRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.AGN, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.AGN_INPUT);
		_common.enterRecord_inNewRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.AAN, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.AAN_INPUT);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BAS_ITEM_TYPE_2_FK, BASE);
	});

	it('TC   check item type AGN as Alternative ;', function () {
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BAS_ITEM_TYPE_2_FK, Cypress.env(BASE));
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
		});
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.ROOT);
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		_common.enterRecord_inNewRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, app.InputFields.DOMAIN_TYPE_TRANSLATION, TEST_ALTERNATIVE);
		_common.enterRecord_inNewRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.AGN, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.AGN_INPUT);
		_common.enterRecord_inNewRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.AAN, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.AAN_INPUT);
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BAS_ITEM_TYPE_2_FK, ALTERNATIVE);
	});

	it('TC - Verify check item type AGN as Alternative ;', function () {
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BAS_ITEM_TYPE_2_FK, Cypress.env(ALTERNATIVE));
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.select_allContainerData(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		_common.delete_recordFromContainer(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, commonLocators.CommonKeys.ROOT);
	});

	it('TC-Assert 5- AAN logic', function () {
		_boqPage.enterRecord_toCreateAAN(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.TEST_AAN_1, CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.AGN_INPUT, CONTAINER_PROCUREMENT_CONTRACT_BOQSTRUCTURE.TEST_AAN_2);
	});
})