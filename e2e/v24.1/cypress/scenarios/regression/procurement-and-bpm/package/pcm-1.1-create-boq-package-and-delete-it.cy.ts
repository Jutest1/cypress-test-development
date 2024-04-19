import { _common, _controllingUnit, _package, _sidebar, _mainView, _validate, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators } from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const CU_DESCRIPTION = 'CU-DESC-' + Cypress._.random(0, 999);


let CONTROLLING_UNIT_PARAMETERS:DataCells;
let CONTAINERS_BOQ;
let CONTAINERS_PACKAGE;
let CONTAINERS_CONTROLLING_UNIT;

let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_CONTROLLING_UNIT;

let CONTAINER_COLUMNS_PROCUREMENT_BOQ;
let CONTAINER_COLUMNS_PACKAGE;



allure.epic('PROCUREMENT AND BPM');
allure.feature('Package');
allure.story('PCM- 1.1 | Create BOQ package directly from package module & delete the same ');

describe('PCM- 1.1 | Create BOQ package directly from package module & delete the same', () => {

		before(function () {
			cy.fixture('pcm/pcm-1.1-create-boq-package-and-delete-it.json').then((data) => {
				this.data = data;
				CONTAINERS_BOQ = this.data.CONTAINERS.BOQ;
				CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
				CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;

				CONTAINER_COLUMNS_BOQ=this.data.CONTAINER_COLUMNS.BOQ;
				CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
				CONTAINER_COLUMNS_PROCUREMENT_BOQ = this.data.CONTAINER_COLUMNS.PROCUREMENT_BOQ
				CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE

	
				CONTROLLING_UNIT_PARAMETERS = {
					[app.GridCells.DESCRIPTION_INFO]: CU_DESCRIPTION,
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
					[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
				};
	
			});
	
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	
		after(() => {
			cy.LOGOUT();
		});

	it('TC - Create new controlling unit', function () {
		
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'))
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE( )
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO,CU_DESCRIPTION)
        _common.waitForLoaderToDisappear()
       _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE, "CNTSUBCODE")
       cy.log(Cypress.env("CNTSUBCODE"))
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
       
	});
	it('TC - Creation of package directly from package module', function () {

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
		/* Pre-Condition Steps */

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.waitForLoaderToDisappear()

		/* Creation of Package */

		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
		});
		_common.create_newRecord(cnt.uuid.PACKAGE);
		_package.enterRecord_toCreatePackage(CONTAINERS_PACKAGE.CONFIGURATION,CONTAINERS_PACKAGE.DESCRIPTION);
		cy.SAVE();
		 _common.waitForLoaderToDisappear()

	});

	it('TC - Creation of procurement BoQ for the selected package', function () {
		
		_common.openTab(app.TabBar.BOQBASED).then(function () {
			_common.select_tabFromFooter(cnt.uuid.PROCUREMENT_BOQS, app.FooterTab.PROCUREMENT_BOQ);
			_common.setup_gridLayout(cnt.uuid.PROCUREMENT_BOQS, CONTAINER_COLUMNS_PROCUREMENT_BOQ);
		});
		_common.create_newRecord(cnt.uuid.PROCUREMENT_BOQS);
		_package.create_ProcuremenBoQs();
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Creation of BoQ for the selected package', function () {
		
		_common.openTab(app.TabBar.BOQBASED).then(function () {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ);
		});
		_common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE);
		_common.create_newRecord(cnt.uuid.BOQ_STRUCTURE);
		_common.clickOn_activeRowCell(cnt.uuid.BOQ_STRUCTURE,app.GridCells.BRIEF_INFO_SMALL)
		_package.enterRecord_toCreateBoQStructure(CONTAINERS_BOQ.DESCRIPTION, CONTAINERS_BOQ.UOM, CONTAINERS_BOQ.QUANTITY);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Deletion of BoQ for the selected package', function () {
		
		_common.openTab(app.TabBar.PACKAGE).then(function () {
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
			_common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
		});
		_package.delete_Package();
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_validate.verify_isRecordDeleted(cnt.uuid.PACKAGE, CU_DESCRIPTION);
	});
});
