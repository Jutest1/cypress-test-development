import { tile, app, cnt, commonLocators, sidebar } from 'cypress/locators';
import { _boqPage, _common, _package, _procurementContractPage, } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

import _ from 'cypress/types/lodash';
const allure = Cypress.Allure.reporter.getInterface();
const REQDEC = 'REQDEC-' + Cypress._.random(0, 999);
const OUTLINESPECDESCA2 = 'OUTLINESPECDESCA2-' + Cypress._.random(0, 999);
const PACKAGE_CODE = 'PACKAGE_CODE'
let PROCUREMENT_CONTRACT_PARAMETER: DataCells
let CONTAINERS_CONFIGURATION
let CONTAINERS_PROCUREMENT_CONTRACT
let CONTAINERS_PROCUREMENT_BOQ
let CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQ
allure.epic('PROCUREMENT AND BPM');
allure.feature('Package');
allure.story('PCM- 1.31 | Copy from other BOQ');
describe('PCM- 1.31 | Copy from other BOQ', () => {
	before(function () {
		cy.fixture('procurement-and-bpm/pcm-1.31-copy-from-other-boq.json').then((data) => {
			this.data = data;
			CONTAINERS_CONFIGURATION = this.data.CONTAINERS.CONFIGURATION
			CONTAINERS_PROCUREMENT_CONTRACT = this.data.CONTAINERS.PROCUREMENT_CONTRACT
			CONTAINERS_PROCUREMENT_BOQ = this.data.CONTAINERS.PROCUREMENT_BOQ
			CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQ = this.data.CONTAINER_COLUMNS.PROCUREMENT_CONTRACT_BOQ
			PROCUREMENT_CONTRACT_PARAMETER = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_PROCUREMENT_CONTRACT.CONFIGURATION,
				[commonLocators.CommonLabels.BUSINESS_PARTNER]: CONTAINERS_PROCUREMENT_CONTRACT.BUSINESS_PARTNER_2
			}
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});

	after(() => {
		cy.LOGOUT();
	});

	it('TC -  Set configuration prerequisite ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);
		cy.wait(2000) //required wait to load page
		_common.openTab(app.TabBar.HEADER).then(() => {
			_common.setDefaultView(app.TabBar.HEADER);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER, 0);
		});
		_common.search_inSubContainer(cnt.uuid.CONFIGURATION_HEADER, CONTAINERS_CONFIGURATION.SERVICE);
		_common.clickOn_cellHasValue(cnt.uuid.CONFIGURATION_HEADER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_CONFIGURATION.SERVICE);
		cy.wait(1000) //required wait to load page
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, CONTAINERS_CONFIGURATION.CONTRACT);
		cy.wait(1000) //required wait to load page
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINERS_CONFIGURATION.UNIT_RATE_CONTRACT);
		cy.wait(1000) //required wait to load page
		_common.enterRecord_inNewRow(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_CONFIGURATION.SERVICE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINERS_CONFIGURATION.UNIT_RATE_CONTRACT);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION, CONTAINERS_CONFIGURATION.PACKAGE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINERS_CONFIGURATION.UNIT_RATE_CONTRACT);
		cy.wait(1000) //required wait to load page
		_common.enterRecord_inNewRow(cnt.uuid.CONFIGURATIONS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_CONFIGURATION.SERVICE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS, app.GridCells.PRC_CONTRACT_TYPE_FK, CONTAINERS_CONFIGURATION.UNIT_RATE_CONTRACT);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Contract for respective project and with structure ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
		cy.wait(2000) //required wait to load page
		_common.openTab(app.TabBar.CONTRACT).then(() => {
			_common.setDefaultView(app.TabBar.CONTRACT);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
		_procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETER);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create Procurment BOQ and verify the created package code  ', function () {
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 0);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQS);
		_package.enterRecord_toCreatePackage(CONTAINERS_PROCUREMENT_BOQ.PROCUREMENT_STRUCTURE, REQDEC);
		_common.waitForLoaderToDisappear()
		_boqPage.enterRecord_ToCreate_procurementBoQs(REQDEC, OUTLINESPECDESCA2, CONTAINERS_PROCUREMENT_BOQ.CREATE_NEW_BOQ);
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT_BOQS, app.GridCells.PACKAGE_CODE, PACKAGE_CODE);
	});

	it('TC - verify the created BOQ from procurementboq in Boq structure ', function () {
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, CONTAINER_COLUMNS_PROCUREMENT_CONTRACT_BOQ);
			_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, OUTLINESPECDESCA2);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE);
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_PROCUREMENT_BOQ.POSITION,
		);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_COPY, app.FooterTab.SOURCE_BOQ, 2);
		});
		_boqPage.search_recordingUnderSourceBoQ(
			cnt.uuid.BOQ_COPY,
			cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE,
			CONTAINERS_PROCUREMENT_BOQ.COPY_FROM,
			CONTAINERS_PROCUREMENT_BOQ.WIC_GROUP,
			CONTAINERS_PROCUREMENT_BOQ.PROJECT_NAME,
			CONTAINERS_PROCUREMENT_BOQ.BOQ_SELECTION,
			CONTAINERS_PROCUREMENT_BOQ.ADDED_OUT_SPEC,
			CONTAINERS_PROCUREMENT_BOQ.POSITION,
			"",
			"BoQ Structure"

		);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify the newly added row in boq structur is from source boq', function () {
		_common.openTab(app.TabBar.PROCUREMENTCONTRACTBOQ).then(() => {
			_common.setDefaultView(app.TabBar.PROCUREMENTCONTRACTBOQ);
			_common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINERS_PROCUREMENT_BOQ.POSITION);
			_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BRIEF_INFO_SMALL, Cypress.env('OUTSPEC'));
			_common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT_BOQSTRUCTURE, app.GridCells.BAS_UOM_FK, Cypress.env('UOM'));
		});

	});
});
