import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from 'cypress/pages';
import { app, tile,  sidebar, commonLocators,cnt ,btn} from 'cypress/locators';
import { EST_HEADER } from 'cypress/pages/variables';
import { DataCells } from 'cypress/pages/interfaces';

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETERS:DataCells;

let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let MODAL_SPLIT_LINE_ITEM;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;


allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.55 | Split line item by percent And Quantity-Split Quantity item');


	
	describe('EST- 1.55 | Split line item by percent And Quantity-Split Quantity item', () => {
		before(function () {
			cy.fixture('estimate/est-1.55-split-line-item-by-percent-and-quantity-split-quantity-item.json')
			  .then((data) => {
				this.data=data
				
				
				CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
				CONTAINERS_LINE_ITEM = this.data.CONTAINERS.ESTIMATE;
				MODAL_SPLIT_LINE_ITEM = this.data.MODAL.SPLIT_LINE_ITEM;

				CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
				CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM

				ESTIMATE_PARAMETERS = {
					[app.GridCells.CODE]: ESTIMATE_CODE,
					[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
					[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
					[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
				}
			
				LINE_ITEMS_PARAMETERS={
					[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY1,
					[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
					}
				
	
			  })
			  .then(()=>{
				cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
				_common.openDesktopTile(tile.DesktopTiles.PROJECT);
				_common.waitForLoaderToDisappear()
				_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
				_common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
	  })
		});
	
		after(() => {
			cy.LOGOUT();
		});

	it('TC - Create New Estimate Header', function () {
		
		
		_common.openTab(app.TabBar.ESTIMATE).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
		_common.create_newRecord(cnt.uuid.ESTIMATE);
		_estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_estimatePage.textOfEstimateCode();
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
	});

	it('TC - Create New Line Item Record', function () {
		
		
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify the wizard functionality for split line item by quantity', function () {
		
		

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.SPLIT_LINE_ITEM);

		
		_estimatePage.splitLineItem_ByQuantity_And_QuantityTotal(MODAL_SPLIT_LINE_ITEM.RADIO1, MODAL_SPLIT_LINE_ITEM.SPLITMETHOD, MODAL_SPLIT_LINE_ITEM.RADIO2, app.GridCells.QUANTITY_PERCENT, MODAL_SPLIT_LINE_ITEM.QUANTITY1, app.GridCells.QUANTITY_TOTAL_CAPS);
		_validate.verify_splitLineItem_In_LineItemContainer(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TOTAL);
	});
});
