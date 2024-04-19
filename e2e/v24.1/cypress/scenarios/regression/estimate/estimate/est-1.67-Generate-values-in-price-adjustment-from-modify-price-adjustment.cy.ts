import { _common, _estimatePage, _validate, _mainView, _boqPage, _projectPage, _wicpage } from 'cypress/pages';
import { app, tile, cnt, btn, commonLocators, sidebar } from 'cypress/locators';
import { DataCells } from 'cypress/pages/interfaces';
import { BOQ_ROOT_ITEM } from 'cypress/pages/variables';
const allure = Cypress.Allure.reporter.getInterface();

const BOQ_STRUCT_DESC = "BOQ-STRC-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESC = 'ESTIMATE_DESC_' + Cypress._.random(0, 999);
const QA_ESTIMATED_PRICE = 'QA_ESTIMATED_PRICE'
const QA_ADJUSTMENT_PRICE = 'QA_ADJUSTMENT_PRICE'
const BOQ_STR = 'BOQ_STR'
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
var abc:number
let BOQS_PARAMETERS: DataCells,BOQS_STRUCTURE_PARAMETERS: DataCells,ESTIMATE_PARAMETERS: DataCells,GENERATE_LINE_ITEMS_PARAMETERS: DataCells,RESOURCE_PARAMETERS: DataCells,PROJECTS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_BOQ,CONTAINERS_BOQ_STRUCTURE,CONTAINER_COLUMNS_BOQ_STRUCTURE,CONTAINERS_ESTIMATE,CONTAINER_COLUMNS_ESTIMATE,CONTAINERS_PRICE_ADJUST,CONTAINER_COLUMNS_PRICE_ADJUST,CONTAINERS_RESOURCE,CONTAINER_COLUMNS_RESOURCE,CONTAINER_COLUMNS_LINE_ITEM_FROM_BOQ,CONTAINERS_PROJECT


allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.67 | Generate values in price adjustment from modify price adjustment');

describe('EST- 1.67 |Generate values in price adjustment from modify price adjustment ', () => {

	before(function () {

		cy.fixture('estimate/est-1.67-Generate-values-in-price-adjustment-from-modify-Price-adjustment.json').then((data) => {
			this.data = data;
			CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
			CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
			CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECTS;
			CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
			CONTAINERS_PRICE_ADJUST = this.data.CONTAINERS.PRICE_ADJUST;
			CONTAINER_COLUMNS_PRICE_ADJUST = this.data.CONTAINER_COLUMNS.PRICE_ADJUST
			CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
			CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
			CONTAINER_COLUMNS_LINE_ITEM_FROM_BOQ = this.data.CONTAINER_COLUMNS.LINE_ITEM_FROM_BOQ
			BOQS_PARAMETERS = {
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
			};
			BOQS_STRUCTURE_PARAMETERS = {
				[commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
				[app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
				[app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
				[app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
			};
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			GENERATE_LINE_ITEMS_PARAMETERS = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
				[commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: BOQ_DESC
			}
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
			},
			PROJECTS_PARAMETERS={
				[commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
				[commonLocators.CommonLabels.NAME]:PROJECT_DESC,
				[commonLocators.CommonLabels.CLERK]:CONTAINERS_PROJECT.CLERK
			  }
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.TabBar.PROJECT).then(() => {
				_common.setDefaultView(app.TabBar.PROJECT)
				_common.waitForLoaderToDisappear()
				_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			  });
			  _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
			  _common.create_newRecord(cnt.uuid.PROJECTS);
			  _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
			  _common.waitForLoaderToDisappear()
			  cy.SAVE();          
			  _common.waitForLoaderToDisappear()
			  _common.waitForLoaderToDisappear()
			  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
		});
	})

	it('TC - Create new boq header and BoQ structure', function () {
		_common.openTab(app.TabBar.BOQS).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
			_common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
		});
		_common.clear_subContainerFilter(cnt.uuid.BOQS);
		_common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.BOQS);
		_boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQS_PARAMETERS)
		_common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, BOQ_STR, BOQ_ROOT_ITEM)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.ToolBar.ICO_GO_TO);
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
			_common.setDefaultView(app.TabBar.BOQSTRUCTURE)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
		});
		_boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQS_STRUCTURE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	})

	it('TC - Create new estimate', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
		cy.wait(2000) //required wait to load page
		_common.waitForLoaderToDisappear()
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
		_common.waitForLoaderToDisappear()
		cy.wait(2000) //required wait to load page
	})

	it('TC - Generate Line item by wizard', function () {
		_common.openTab(app.TabBar.ESTIMATEBYBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.BOQ_ESTIMATEBYBOQ, app.FooterTab.BOQs, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM_FROM_BOQ);
		})
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.wait(2000)
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	})

	it('TC - Assign resource to the line item', function () {
		_common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.ESTIMATEBYBOQ).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3)
			_common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
		})
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES)
		_common.create_newRecord(cnt.uuid.RESOURCES)
		_estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	})

	it('TC - Update AQ quantity in price adjustment', function () {
		_common.openTab(app.TabBar.ESTIMATEBYBOQ).then(() => {
			_common.set_containerLayoutUnderEditView(commonLocators.CommonLabels.LAYOUT_6)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PRICEADJUSTMENT, app.FooterTab.PRICEADJUSTMENT, 3);
			_common.setup_gridLayout(cnt.uuid.PRICEADJUSTMENT, CONTAINER_COLUMNS_PRICE_ADJUST);
		});
		_common.clickOn_toolbarButton(cnt.uuid.PRICEADJUSTMENT, btn.ToolBar.ICO_REFRESH)
		_common.waitForLoaderToDisappear()
		cy.wait(2000).then(() => { //required wait to load page
		_common.search_inSubContainer(cnt.uuid.PRICEADJUSTMENT, BOQ_STRUCT_DESC)
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.PRICEADJUSTMENT, btn.ToolBar.ICO_LINE_ITEM_FILTER)
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasValue(cnt.uuid.PRICEADJUSTMENT, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCT_DESC)
		_common.waitForLoaderToDisappear()
		})
		_common.clickOn_cellHasValue(cnt.uuid.PRICEADJUSTMENT, app.GridCells.AQ_QUANTITY, CONTAINERS_BOQ_STRUCTURE.QUANTITY);
		_common.enterRecord_inNewRow(cnt.uuid.PRICEADJUSTMENT, app.GridCells.AQ_QUANTITY, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_ADJUST.AQ_QUANTITY);
		_common.getText_fromCell(cnt.uuid.PRICEADJUSTMENT, app.GridCells.QA_ESTIMATED_PRICE).then(($ele1: JQuery<HTMLElement>) => {
			var estimatePriceAQ = parseFloat($ele1.text()) * CONTAINERS_PRICE_ADJUST.FACTOR;
			const finalestimatePriceAQ = estimatePriceAQ.toString();
			Cypress.env('ESTIMATE_PRICE_AQ', finalestimatePriceAQ);
		});
		_common.saveNumericCellDataToEnv(cnt.uuid.PRICEADJUSTMENT, app.GridCells.QA_ESTIMATED_PRICE, QA_ESTIMATED_PRICE)
		cy.wait(2000).then(() => {
		abc = Cypress.env(QA_ESTIMATED_PRICE) * CONTAINERS_PRICE_ADJUST.FACTOR
		})
	})

	it('TC - Modify price adjustment and verify adjusted AQ quantity', function () {
		_common.openTab(app.TabBar.ESTIMATEBYBOQ).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PRICEADJUSTMENT, app.FooterTab.PRICEADJUSTMENT, 3);
			_common.setup_gridLayout(cnt.uuid.PRICEADJUSTMENT, CONTAINER_COLUMNS_PRICE_ADJUST);
			_common.set_columnAtTop([CONTAINER_COLUMNS_PRICE_ADJUST.aqestimatedprice,CONTAINER_COLUMNS_PRICE_ADJUST.aqadjustmentprice],cnt.uuid.PRICEADJUSTMENT)
		});
		_estimatePage.modifyPriceAdjustment(CONTAINERS_PRICE_ADJUST.FACTOR, "option1")
		_common.clickOn_toolbarButton(cnt.uuid.PRICEADJUSTMENT, btn.ToolBar.ICO_REFRESH)
		_common.waitForLoaderToDisappear()
		_common.clickOn_cellHasUniqueValue(cnt.uuid.PRICEADJUSTMENT, app.GridCells.BRIEF_INFO_SMALL, BOQ_STRUCT_DESC);
		_common.saveNumericCellDataToEnv(cnt.uuid.PRICEADJUSTMENT, app.GridCells.QA_ADJUSTMENT_PRICE, QA_ADJUSTMENT_PRICE)
		cy.wait(2000).then(() => { //required wait to load page
			expect(Cypress.env(QA_ADJUSTMENT_PRICE)).to.equals(abc);
		})
	});

	after(() => {
		cy.LOGOUT();
	})
});
