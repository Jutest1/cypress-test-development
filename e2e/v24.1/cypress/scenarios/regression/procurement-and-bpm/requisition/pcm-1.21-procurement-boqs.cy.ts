import { tile, app, cnt, btn, sidebar, commonLocators } from 'cypress/locators';
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

import _ from 'cypress/types/lodash';
const allure = Cypress.Allure.reporter.getInterface();
const REQDEC = 'REQDEC-' + Cypress._.random(0, 999);
const OUTLINESPECDESC = 'OUTLINESPECDESC-' + Cypress._.random(0, 999);
const OUTLINESPECDESC_1 = 'OUTLINESPECDESC-1-' + Cypress._.random(0, 999);

const PACKAGEBOQESC = 'PACKAGEBOQESC-' + Cypress._.random(0, 999);
const QUANTITY = 'QUANTITY-' + Cypress._.random(0, 999);
const UNITRATE = 'UNITRATE-' + Cypress._.random(0, 999);
const FINALPRICE = 'FINALPRICE-' + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
const PACKAGE_CODE = 'PACKAGE_CODE'

let REQUISITION_PARAMETER: DataCells,
	PROJECT_PARAMETERS:DataCells

let CONTAINER_REQUISITION,
	CONTAINER_COLUMNS_REQUISITION,
	CONTAINER_PACKAGE,
	CONTAINER_COLUMNS_PACKAGE,
	CONTAINER_COLUMNS_PROCUREMENT_BOQ,
	CONTAINER_COLUMNS_PACKAGE_BOQ,
	CONTAINER_COLUMNS_REQUISITION_STRUCTURE
	
allure.epic('PROCUREMENT AND BPM');
allure.feature('Requisition');
allure.story('PCM- 1.21 | Procurement BoQs');
describe('PCM- 1.21 | Procurement BoQs', () => {
	before(function () {
		cy.fixture('procurement-and-bpm/pcm-1.21-procurement-boqs.json').then((data) => {
			this.data = data;
			CONTAINER_REQUISITION = this.data.CONTAINERS.REQUISITION
			CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
			CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
			CONTAINER_COLUMNS_PROCUREMENT_BOQ = this.data.CONTAINER_COLUMNS.PROCUREMENT_BOQ
			CONTAINER_COLUMNS_PACKAGE_BOQ = this.data.CONTAINER_COLUMNS.PACKAGE_BOQ
			CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
			CONTAINER_COLUMNS_REQUISITION_STRUCTURE = this.data.CONTAINER_COLUMNS.REQUISITION_STRUCTURE
			REQUISITION_PARAMETER = {
				[commonLocators.CommonLabels.CONFIGURATION]: CONTAINER_REQUISITION.CONFIGURATION,
				[app.GridCells.STRUCTURE]: CONTAINER_REQUISITION.STRUCTURE_CODE,
			};
			PROJECT_PARAMETERS= {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [ commonLocators.CommonLabels.NAME] :PRJ_NAME,
                [ commonLocators.CommonLabels.CLERK] :CLERK_NAME
                
            };
			cy.preLoading(
				Cypress.env('adminUserName'),
				Cypress.env('adminPassword'),
				Cypress.env('parentCompanyName'),
				Cypress.env('childCompanyName'));
			/* Open desktop should be called in before block */
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
            cy.wait(500)  //required wait to load page
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
			cy.wait(2000); //required wait to load page
		});
	});
	
	after(() => {
		cy.LOGOUT();
	});

	it('TC - Create requisition for respective project', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		cy.wait(2000); //required wait to load page
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.setDefaultView(app.TabBar.MAIN);
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
		});
		_common.create_newRecord(cnt.uuid.REQUISITIONS);
		_procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER);
		cy.wait(2000) // wait is required to load a data in container 
		cy.SAVE()
		cy.wait(2000) // wait is required to generate code after saving the requisition record if we dont put wait it gives req code value as "IsGenerated".     
	});

	it('TC - Create Procurment Package ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROCUREMENT_CONFIGURATION);
		_procurementConfig.changeProcurementConfiguration_FromWizard(commonLocators.CommonKeys.SERVICE_REQ, btn.ButtonText.YES);
		_common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
			_common.setDefaultView(app.TabBar.REQUISITIONBOQS);
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 1);
		});
	});

	it('TC - Create Procurment BOQ and Verify the created Boq', function () {
		_common.create_newRecord(cnt.uuid.REQUISITIONPROCUREMENTBOQS);
		_boqPage.enterRecord_ToCreate_procurementBoQs(commonLocators.CommonKeys.SERVICE, OUTLINESPECDESC, commonLocators.CommonLabels.CREATE_NEW_BOQ);
		cy.wait(1000);  //required wait to load page
		_common.saveCellDataToEnv(cnt.uuid.REQUISITIONPROCUREMENTBOQS,app.GridCells.REFERENCE,PACKAGE_CODE)
		_common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
			_common.setDefaultView(app.TabBar.REQUISITIONBOQS);
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONBOQSTRUCTURE);
		_common.search_inSubContainer(cnt.uuid.REQUISITIONBOQSTRUCTURE, OUTLINESPECDESC);
	});

	it('TC - Navigate back to package and verify the created Boq and create new package Boqstructure', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
		cy.wait(2000);  //required wait to load page
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
		cy.wait(2000);  //required wait to load page
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE);
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
		});
		cy.REFRESH_CONTAINER();
		cy.wait(2000);  //required wait to load page
		_common.clear_subContainerFilter(cnt.uuid.PACKAGE);
		_common.search_inSubContainer(cnt.uuid.PACKAGE, Cypress.env(PACKAGE_CODE));
	});

	it('TC -  verify the created package Boq and create new package Boqstructure', function () {
		_common.openTab(app.TabBar.BOQBASED).then(() => {
			_common.setDefaultView(app.TabBar.BOQBASED);
			cy.wait(2000);  //required wait to load page
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 2);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_BOQS, CONTAINER_COLUMNS_PROCUREMENT_BOQ);
		});
		cy.REFRESH_CONTAINER();
		cy.wait(3000);  //required wait to load page
		_common.openTab(app.TabBar.BOQBASED).then(() => {
			_common.setDefaultView(app.TabBar.BOQBASED);
			cy.wait(2000);  //required wait to load page
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ, 1);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_PACKAGE_BOQ);
		});
		_boqPage.enterRecord_toCreateBoQStructureUnderpackage(cnt.uuid.BOQ_STRUCTURE, PACKAGEBOQESC, CONTAINER_PACKAGE.QUANTITY, CONTAINER_PACKAGE.UNIT_RATE, CONTAINER_PACKAGE.UOM);
		cy.SAVE();
		cy.wait(1000);  //required wait to load page
		_common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.QUANTITY_SMALL, QUANTITY);
		_common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.PRICE_SMALL, UNITRATE);
		_common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, FINALPRICE);
		cy.wait(500);  //required wait to load page
	});

	it('TC - Navigate back to requisition and verify the created package Boq', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
		cy.wait(2000);  //required wait to load page
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 0);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION_STRUCTURE);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONS);
		//_common.search_inSubContainer(cnt.uuid.REQUISITIONS, Cypress.env(PACKAGE_CODE));
		cy.wait(500);  //required wait to load page
		_common.openTab(app.TabBar.REQUISITIONBOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONPROCUREMENTBOQS, app.FooterTab.PROCUREMENT_BOQ, 1);
			_common.setup_gridLayout(cnt.uuid.REQUISITIONPROCUREMENTBOQS, CONTAINER_COLUMNS_PROCUREMENT_BOQ);
		});
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONBOQSTRUCTURE);
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONPROCUREMENTBOQS);
		_common.create_newRecord(cnt.uuid.REQUISITIONPROCUREMENTBOQS);
		cy.wait(1000);  //required wait to load page
		_boqPage.enterRecord_ToCreate_procurementBoQs(commonLocators.CommonKeys.SERVICE,OUTLINESPECDESC_1);
		cy.wait(4000); //** Application need time to load //
	});

	it('TC - Verify Deep copy and delete functionality of Procurement Boq', function () {
		_common.clear_subContainerFilter(cnt.uuid.REQUISITIONPROCUREMENTBOQS);
		_common.search_inSubContainer(cnt.uuid.REQUISITIONPROCUREMENTBOQS, Cypress.env(PACKAGE_CODE));
		cy.wait(500);  //required wait to load page
		_common.openTab(app.TabBar.MAIN).then(() => {
			_common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITION, 0);
		});
		_procurementPage.copyRecord_toIncludingDependencies(cnt.uuid.REQUISITIONS, btn.ToolBar.ICO_COPY);
		_common.delete_recordFromContainer(cnt.uuid.REQUISITIONS);
	});
});