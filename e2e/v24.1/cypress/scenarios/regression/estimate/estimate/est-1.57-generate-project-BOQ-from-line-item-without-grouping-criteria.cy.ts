import { _common, _estimatePage, _validate, _mainView, _boqPage, _package, _modalView, _projectPage } from 'cypress/pages';
import { app, tile, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { BOQ_ROOT_ITEM, EST_HEADER } from 'cypress/pages/variables';
import { randomNo } from 'cypress/commands/integration';
import { DataCells } from 'cypress/pages/interfaces';
import Buttons from 'cypress/locators/buttons';

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINERS_BOQ
let CONTAINER_COLUMNS_BOQ
let CONTAINER_COLUMNS_BOQ_STRUCTURE

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.57 | Generate project BOQ from line item without grouping criteria');

describe('EST- 1.57 | Generate project BOQ from line item without grouping criteria', () => {
	before(function () {

		cy.fixture("estimate/est-1.57-generate-project-BOQ-from-line-item-without-grouping-criteria.json")
			.then((data) => {
				this.data = data;
				CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
				CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
				CONTAINERS_BOQ = this.data.CONTAINERS.BOQ;
				CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
				CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
				ESTIMATE_PARAMETERS = {
					[app.GridCells.CODE]: ESTIMATE_CODE,
					[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
					[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
					[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
				}

				CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
				CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
				LINE_ITEM_PARAMETERS = {
					[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
					[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
				};

				CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
				CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
				RESOURCE_PARAMETERS = {
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
				};
			})
			.then(() => {
				cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
				_common.openDesktopTile(tile.DesktopTiles.PROJECT);
				_common.openTab(app.TabBar.PROJECT).then(() => {
					_common.setDefaultView(app.TabBar.PROJECT)
					_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
				});
				_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
				_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
			});
	});

	after(() => {
		cy.LOGOUT();
	})

	it('TC - Create new estimate record', function () {
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
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
	});

	it('TC - Create New Line Item Record', function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create New Record In Resource For Cost Code', function () {
		_common.waitForLoaderToDisappear()
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
	});

	it('TC - Generate Project BoQ  from line item from wizard', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_PROJECT_BOQ_FROM_LI);
		_estimatePage.generate_projectBoqFromLineItems_fromWizard('None');
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify Project BoQ and BoQ structure record', function () {
		_common.select_dataFromSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ);
		});
		_common.search_inSubContainer(cnt.uuid.BOQS, CONTAINERS_BOQ.STRUCTURE)
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
		_common.select_rowInContainer(cnt.uuid.BOQS)
		cy.wait(3000)
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, CONTAINERS_BOQ.STRUCTURE, BOQ_ROOT_ITEM);
		_common.goToButton_inActiveRow(cnt.uuid.BOQS, app.GridCells.REFERENCE, Buttons.IconButtons.ICO_GO_TO, BOQ_ROOT_ITEM);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE);
		});
		_common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURES, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM);
		_common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BRIEF_INFO_SMALL, LINE_ITEM_DESCRIPTION);
		_common.select_dataFromSubContainer(cnt.uuid.BOQ_STRUCTURES, LINE_ITEM_DESCRIPTION);
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_package.verify_Totals_from_package_to_Estimate_Totals(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL, sidebar.SideBarOptions.ESTIMATE, cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, LINE_ITEM_DESCRIPTION);
	});
});
