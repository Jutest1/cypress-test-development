import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView, _validate } from 'cypress/pages';
import { cnt, tile, app, commonLocators, sidebar, btn } from 'cypress/locators';
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = 'LI1-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_2= 'LI2-DESC-' + Cypress._.random(0, 999);
const CONG_DESC = "CONG-DESC-"+ Cypress._.random(0, 999);
const LOCATION_CODE="LC-" + Cypress._.random(0, 999);
const LOCATION_DESC="LD-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS:DataCells
let LINE_ITEM_PARAMETERS_1:DataCells
let LINE_ITEM_PARAMETERS_2:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RULES;
let CONTAINER_COLUMNS_LOCATION
let CONTAINERS_LOCATION

ALLURE.epic('ESTIMATE');
ALLURE.feature('Estimate');
ALLURE.story('EST- 3.12 | Location assignment to line items using bulk editor');
describe('EST- 3.12 | Location assignment to line items using bulk editor', () => {
	
	before(function () {
		cy.fixture('estimate/est-3.12-location-assignment-to-line-items-using-bulk-editor.json')
		  .then((data) => {
			this.data = data;
			CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
			  [app.GridCells.CODE]: ESTIMATE_CODE,
			  [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
			  [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
			  [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}	
			CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
			LINE_ITEM_PARAMETERS = {
			  [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
			  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
			  [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};
			LINE_ITEM_PARAMETERS_1 = {
			  [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
			  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
			  [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};
			LINE_ITEM_PARAMETERS_2 = {
			  [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_2,
			  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
			  [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
			};
			RULES= [{"FieldName": "Location","Option": "Set Value to","OptionData": LOCATION_CODE}]
			CONTAINERS_LOCATION=this.data.CONTAINERS.LOCATION
			CONTAINER_COLUMNS_LOCATION=this.data.CONTAINER_COLUMNS.LOCATION
		  })
		  .then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.waitForLoaderToDisappear()
			_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.setDefaultView(app.TabBar.PROJECT)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
			});
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
		  })
	});

	it('TC - Create new location', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 1);
			_common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATION);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS, 1);
		});
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()

		_common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
		_common.create_newRecord(cnt.uuid.PROJECT_LOCATION);
		_estimatePage.enterRecord_toCreateLocation(LOCATION_CODE, LOCATION_DESC);
		_common.enterRecord_inNewRow(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATION.QUANTITY_FACTOR);
		_common.select_activeRowInContainer(cnt.uuid.PROJECT_LOCATION)
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create new estimate record', function () {
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
		_common.setDefaultView(app.TabBar.ESTIMATE)
		_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()  
	});
	
	it("TC - Create new line item record", function () {
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
	
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.prjlocationfk],cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.waitForLoaderToDisappear()
	
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS_1);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
	
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS_2);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});
	
	it("TC - Select all record and use bulk editor in line item container.", function () {
		_common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.bulkEditor_createNewRule(cnt.uuid.ESTIMATE_LINEITEMS,CONG_DESC,RULES);
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
	});
	
	it("TC - Verify bulk editor records.", function () {
		_common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
		_validate.verify_bulkEditRecords(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PRJ_LOCATION_FK, LOCATION_CODE);
	});
});
