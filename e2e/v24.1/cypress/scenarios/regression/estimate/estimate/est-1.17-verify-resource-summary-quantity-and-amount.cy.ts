import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI1-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = 'LI2-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS1: DataCells, LINE_ITEM_PARAMETERS2: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RESOURCE_PARAMETERS1: DataCells, RESOURCE_PARAMETERS2: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE_SUMMARY;

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 1.17 | Verify resource summary quantity and amount');

describe('EST- 1.17 | Verify resource summary quantity and amount', () => {

	before(function () {

		cy.fixture('estimate/est-1.17-verify-resource-summary-quantity-and-amount.json')
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
				LINE_ITEM_PARAMETERS1 = {
					[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[0],
					[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
				};
				CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
				CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
				RESOURCE_PARAMETERS1 = {
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[0],
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[0],
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[0]
				};

				LINE_ITEM_PARAMETERS2 = {
					[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY[1],
					[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
				};

				RESOURCE_PARAMETERS2 = {
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY[1],
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE[1],
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY[1]
				};

				CONTAINER_COLUMNS_RESOURCE_SUMMARY = this.data.CONTAINER_COLUMNS.RESOURCE_SUMMARY

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
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS1);
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
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS1);
		_common.minimizeContainer(cnt.uuid.RESOURCES)
		_common.waitForLoaderToDisappear()
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_UNIT_TARGET, "QUANTITY_UNIT_TARGET_1")
		_common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, "COST_UNIT_1")
	});

	it("TC - Create new line item record", function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS2);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});

	it("TC - Add Assembly (Subitem) record in resource", function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
			_common.maximizeContainer(cnt.uuid.RESOURCES)
			_common.clear_subContainerFilter(cnt.uuid.RESOURCES);
			_common.create_newRecord(cnt.uuid.RESOURCES);
			_common.waitForLoaderToDisappear()
			_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS2);
			_common.minimizeContainer(cnt.uuid.RESOURCES)
			_common.waitForLoaderToDisappear()
			cy.SAVE();
			_common.waitForLoaderToDisappear()
			_common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_UNIT_TARGET, "QUANTITY_UNIT_TARGET_2")
			_common.select_rowInContainer(cnt.uuid.RESOURCES)
			_common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_UNIT_TARGET, "QUANTITY_UNIT_TARGET_3")
			_common.saveCellDataToEnv(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT, "COST_UNIT_2")
		});
	});

	it('TC - Verification of quantity & Cost summary of item in resource summary', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES_SUMMARY, app.FooterTab.RESOURCES_SUMMARY, 2);
			_common.setup_gridLayout(cnt.uuid.RESOURCES_SUMMARY, CONTAINER_COLUMNS_RESOURCE_SUMMARY)
			_common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE_SUMMARY.quantitysummary, CONTAINER_COLUMNS_RESOURCE_SUMMARY.costsummary, CONTAINER_COLUMNS_RESOURCE_SUMMARY.code], cnt.uuid.RESOURCES_SUMMARY)
		});
		_common.maximizeContainer(cnt.uuid.RESOURCES_SUMMARY)
		_common.clickOn_toolbarButton(cnt.uuid.RESOURCES_SUMMARY, btn.ToolBar.ICO_REFRESH);
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.RESOURCES_SUMMARY, "BST500S");
		_common.waitForLoaderToDisappear()
		let quantityUnitTarget1: any = parseFloat(Cypress.env("QUANTITY_UNIT_TARGET_1").replace(',', '')).toFixed(2);
		let quantityUnitTarget2: any = parseFloat(Cypress.env("QUANTITY_UNIT_TARGET_2").replace(',', '')).toFixed(2);
		let quantityUnitTarget3: any = parseFloat(Cypress.env("QUANTITY_UNIT_TARGET_3").replace(',', '')).toFixed(2);
		let total: any = (+quantityUnitTarget1) + (+quantityUnitTarget2)
		_common.assert_forNumericValues(cnt.uuid.RESOURCES_SUMMARY, app.GridCells.QUANTITY_SUMMARY, total.toString())
		let amount1: any = (total) * (Cypress.env("COST_UNIT_1"))
		_common.assert_forNumericValues(cnt.uuid.RESOURCES_SUMMARY, app.GridCells.COST_SUMMARY, amount1.toString())
		_common.select_rowHasValue(cnt.uuid.RESOURCES_SUMMARY, "S4");
		_common.assert_forNumericValues(cnt.uuid.RESOURCES_SUMMARY, app.GridCells.QUANTITY_SUMMARY, Cypress.env("QUANTITY_UNIT_TARGET_3"))
		let amount2: any = (quantityUnitTarget3) * (parseFloat(Cypress.env("COST_UNIT_2")))
		_common.assert_forNumericValues(cnt.uuid.RESOURCES_SUMMARY, app.GridCells.COST_SUMMARY, amount2.toString())
	});

});
