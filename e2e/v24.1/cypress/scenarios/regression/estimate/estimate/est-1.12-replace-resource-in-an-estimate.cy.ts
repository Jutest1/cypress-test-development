import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_REPLACE_RESOURCE
let MODAL_IGNORE_CURRENT_ELEMENT_JOB
let REPLACE_DETAILS_PARAMETERS: DataCells

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.12 | Replace resource in estimate");

describe("EST- 1.12 | Replace resource in estimate", () => {

	before(function () {
		cy.fixture("estimate/est-1.12-replace-resource-in-an-estimate.json")
			.then((data) => {
				this.data = data;
				CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
				CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
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
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
				};
				RESOURCE_PARAMETERS_2 = {
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
				};
				RESOURCE_PARAMETERS_3 = {
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
				};
				MODAL_REPLACE_RESOURCE = this.data.MODAL.REPLACE_RESOURCE
				MODAL_IGNORE_CURRENT_ELEMENT_JOB = this.data.MODAL.IGNORE_CURRENT_ELEMENT_JOB				
				REPLACE_DETAILS_PARAMETERS = {
					[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING_CAPS, commonLocators.CommonLabels.REPLACE_DETAILS],
					[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_REPLACE_RESOURCE.SELECT_ESTIMATE_SCOPE,
					[commonLocators.CommonLabels.FUNCTION_TYPE]: MODAL_REPLACE_RESOURCE.FUNCTION_TYPE,
					[commonLocators.CommonLabels.REPLACE_WITH_ELEMENT]: MODAL_REPLACE_RESOURCE.REPLACE_WITH_ELEMENT,
					[commonLocators.CommonLabels.IGNORE_CURRENT_ELEMENT_JOB]: MODAL_IGNORE_CURRENT_ELEMENT_JOB,
				}
			}).then(() => {
				cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
				_common.openDesktopTile(tile.DesktopTiles.PROJECT);
				_common.waitForLoaderToDisappear()
				_common.openTab(app.TabBar.PROJECT).then(() => {
					_common.setDefaultView(app.TabBar.PROJECT)
					_common.waitForLoaderToDisappear()
					_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
				});
				_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
				_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
			})
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
	});

	it("TC - Create new line item record", function () {
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});

	it("TC - Create new record in resource", function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES)
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_common.waitForLoaderToDisappear()
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.create_newRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
		_common.waitForLoaderToDisappear();
		cy.SAVE();
		_common.waitForLoaderToDisappear();
		_common.create_newSubRecord(cnt.uuid.RESOURCES);
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
		_common.waitForLoaderToDisappear();
		cy.SAVE();		
	});

	it("TC - Verify replace resource from wizard", function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_RESOURCE);
		_estimatePage.replaceResource_fromWizard(REPLACE_DETAILS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
		_common.select_rowInContainer(cnt.uuid.RESOURCES)
		_common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, MODAL_REPLACE_RESOURCE.REPLACE_WITH_ELEMENT);
	});
});
