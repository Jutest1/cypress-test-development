import { tile, app, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import { _common, _estimatePage, _validate, _mainView, _boqPage, _package, _bidPage, _saleContractPage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();
const BoQ_strc_DESC2 = "LI2-DESC-" + Cypress._.random(0, 999);
const CostTotal = "CostTotal";
const EST_HEAD_PR1 = "2EST-" + Cypress._.random(0, 999)
const BOQ_HEAD_PR1 = "1BOQ-" + Cypress._.random(0, 999)
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_BOQ
let BOQS_PARAMETERS_PR1: DataCells;
let BOQS_STRUCTURE_PARAMETERS_PR_1: DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE_PARAMETERS: DataCells
let CONTAINER_COLUMNS_LINE_ITEM;
let GENERATE_LINE_ITEMS_PARAMETERS: DataCells
let ESTIMATE_PARAMETERS_PR_1: DataCells;
let CONTAINERS_PACKAGE
allure.epic('PROCUREMENT AND BPM');
allure.feature('Grouping structure');
allure.story("PCM- 1.8 | Create BOQ package from 'Grouping structure' - 'Project BOQ' & select Line item AQ for Quantities");

describe("PCM- 1.8 | Create BOQ package from 'Grouping structure' - 'Project BOQ' & select Line item AQ for Quantities", () => {
	beforeEach(function () {
		cy.fixture('pcm/pcm-1.8-create-boq-package-from-grouping-structure-project-boq-and-select-line-item-AQ-for-quantities.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));

		cy.fixture('pcm/pcm-1.8-create-boq-package-from-grouping-structure-project-boq-and-select-line-item-AQ-for-quantities.json').then((data) => {
			this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
        
			CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
            CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
            CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE;
            BOQS_PARAMETERS_PR1 = {
                [app.GridCells.BRIEF_INFO_SMALL]:  BOQ_HEAD_PR1
            };
			BOQS_STRUCTURE_PARAMETERS_PR_1 = {
                [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
                [app.GridCells.BRIEF_INFO_SMALL]: BoQ_strc_DESC2,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
            };
        
        ESTIMATE_PARAMETERS_PR_1 = {
            [app.GridCells.CODE]: ESTIMATE_CODE,
            [app.GridCells.DESCRIPTION_INFO]: EST_HEAD_PR1,
            [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
            [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        }

        RESOURCE_PARAMETERS = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
            [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
        };
        GENERATE_LINE_ITEMS_PARAMETERS = {
            [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
            [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_HEAD_PR1
        }
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create BOQ header & BOQ Structure in first Project', function () {
		_common.openTab(app.TabBar.BOQS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
            _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.BOQS);
        _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQS_PARAMETERS_PR1)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTURES)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        });
        _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS_PR_1);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
    	});

	it('TC - Create Estimate header and generate line items from BOQ and assign resource to it', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS_PR_1);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required waits 
_common.waitForLoaderToDisappear()
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, BoQ_strc_DESC2);
		_common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_BOQ_STRUCTURE.QUANTITY);
		_common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()

		_common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, CostTotal)
	});

	it('TC -Create BOQ Package using wizard Create/Update BoQ Package', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_BOQ_PACKAGE);
        _package.enterRecord_toCreateBoQPackage_FromWizard_Duplicate(CONTAINERS_PACKAGE.BASED_ON, CONTAINERS_PACKAGE.ESTIMATE_SCOPE, CONTAINERS_PACKAGE.ESTIMATE_SCOPE_INDDEX, CONTAINERS_PACKAGE.BASED_ON, CONTAINERS_PACKAGE.PROCUREMENT_STRUCTURE, CONTAINERS_PACKAGE.QUANTITY_TRANSFER, commonLocators.CommonKeys.UNCHECK)
		cy.SAVE();
	});
	it('TC - Verify items of package', function () {
		_common.openTab(app.TabBar.PACKAGE).then(() => {
			_common.setDefaultView(app.TabBar.PACKAGE)
			_common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
		});
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

		_common.openTab(app.TabBar.BOQDETAILS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE, app.FooterTab.BOQ_STRUCTURE, 0)
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
        _common.maximizeContainer(cnt.uuid.BOQ_STRUCTURE)
        
		_common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
		_common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE,  app.GridCells.QUANTITY_ADJ, CONTAINERS_BOQ_STRUCTURE.QUANTITY);
		_common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTURE, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("CostTotal"));
	});
});
