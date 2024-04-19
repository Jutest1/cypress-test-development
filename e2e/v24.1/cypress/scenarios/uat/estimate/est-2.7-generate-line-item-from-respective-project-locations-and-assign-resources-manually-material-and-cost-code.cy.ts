import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage } from 'cypress/pages';
import { app, tile, cnt } from 'cypress/locators';
import _ from 'cypress/types/lodash';
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = 'PRJ' + Cypress._.random(0, 999);
const PRJ_NAME = 'TEST-PRJ-' + Cypress._.random(0, 999);
const CLERK_NAME = 'HS';
const LOCATION_CODE = 'LOCATION01-' + Cypress._.random(0, 999);
const LOCATION_CODE2 = 'LOCATION01-' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 2.7 | Generate Line item from respective Project locations and assign resources manually (material and cost code)');
describe('EST- 2.7 | Generate Line item from respective Project locations and assign resources manually (material and cost code)', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-2.7-generate-line-item-from-respective-project-locations-and-assign-resources-manually-material-and-cost-code.json').then((data) => {
			this.data = data;
		});
	});
	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('estimate/est-2.7-generate-line-item-from-respective-project-locations-and-assign-resources-manually-material-and-cost-code.json').then((data) => {
			this.data = data;
			const sideBarAction = this.data.sidebarInputs.sidebar;
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.tabBar.project).then(() => {
				_common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
			});
			_common.create_newRecord(cnt.uuid.Projects);
			_projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
			cy.wait(500);
			_common.openSidebarOption(sideBarAction.search).delete_pinnedItem().search_fromSidebar(sideBarAction.Standard, PRJ_NO).pinnedItem();
		});
	});

	it('TC - Verify "Generate Line Items" Wizards option using Location as a Leading Structure', function () {
		const sideBarAction = this.data.sidebarInputs.sidebar;
		const locationGrid = this.data.location_ColumnHeaders.column_headers;
		const locationPageInputs = this.data.location_Page.locationInputs;
		const estimateInputs = this.data.EstimateHeader.EstimateHeaderInputs;
		const estheadergrid = this.data.estimate_ColumnHeaders.column_headers;
		const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers;
		const leadingselectionoption = this.data.leadingstructureoption.structureInput;
		_common.openTab(app.tabBar.project).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 1);
			_common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, locationGrid);
		});
		cy.REFRESH_CONTAINER();
		cy.wait(1500);
		_common.create_newRecord(cnt.uuid.PROJECT_LOCATION);
		_estimatePage.enterRecord_toCreateLocation(LOCATION_CODE, locationPageInputs.description + LOCATION_CODE);
		_common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, locationPageInputs.qtyFactor);
		_common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.gridCells.SORTING, app.InputFields.INPUT_GROUP_CONTENT, locationPageInputs.sorting);
		cy.SAVE();
		_common.create_newRecord(cnt.uuid.PROJECT_LOCATION);
		_estimatePage.enterRecord_toCreateLocation(LOCATION_CODE2, locationPageInputs.description2 + LOCATION_CODE2);
		_common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, locationPageInputs.qtyFactor2);
		_common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.gridCells.SORTING, app.InputFields.INPUT_GROUP_CONTENT, locationPageInputs.sorting2);
		cy.SAVE();
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, estheadergrid);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, EST_DESC, estimateInputs.rubric, estimateInputs.estimateType);
		cy.SAVE();
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 5);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid);
		});
		_estimatePage.clicking_Estimation_Configuration_Dialog_Button(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.change_EstQtyRelation_For_Schedule(leadingselectionoption.searchType, leadingselectionoption.structureType);
		_common.openSidebarOption(sideBarAction.wizard);
		_common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.GenerateLineItem);
		_boqPage.generate_LineItemBycode(sideBarAction.location);
		cy.wait(3000).then(() => {
			cy.SAVE();
		});
	});

	it('TC -Verify New record of Cost and Material in resources', function () {
		const resourceInputs = this.data.AssignResource.resourceInputs;
		const resourcesGrid = this.data.resources_ColumnHeaders.column_headers;
		const locationPageInputs = this.data.location_Page.locationInputs;
		_common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
			cy.wait(2000);
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid);
		});
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, locationPageInputs.description + LOCATION_CODE);
		cy.wait(500);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, locationPageInputs.qtyFactor);
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey1, resourceInputs.code1);
		cy.SAVE();
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey2, resourceInputs.code2);
		cy.SAVE();
		cy.wait(2000);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, locationPageInputs.description + LOCATION_CODE2);
		cy.wait(500);
		_common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, locationPageInputs.qtyFactor2);
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey1, resourceInputs.code1);
		cy.SAVE();
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey2, resourceInputs.code2);
		cy.SAVE();
		cy.wait(2000);
	});
	it('TC - Verify cost total of each line item resources', function () {
		_estimatePage.verify_costTotalOfResources_WithLineItemCostTotal();
		const locationPageInputs = this.data.location_Page.locationInputs;
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, locationPageInputs.description + LOCATION_CODE);
		cy.wait(2000);
		_estimatePage.verify_costTotalOfResources_WithLineItemCostTotal();
	});
});
