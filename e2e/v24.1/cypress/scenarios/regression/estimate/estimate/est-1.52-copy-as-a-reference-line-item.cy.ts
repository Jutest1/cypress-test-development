import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt ,btn,sidebar, commonLocators} from "cypress/locators";
import { EST_HEADER } from 'cypress/pages/variables';
import { DataCells } from 'cypress/pages/interfaces';

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells;

let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_RESOURCE;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.52 | Copy as a reference line item');

describe('EST- 1.52 | Copy as a reference line item', () => {
		before(function () {
			cy.fixture('estimate/est-1.52-copy-as-a-reference-line-item.json')
			  .then((data) => {
				this.data=data
				
				CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
				CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
				CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
				
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
                };
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

	it('TC - Create new estimate header', function () {

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

	it('TC - Create new line item record', function () {
	
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
			_common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CODE);
		_common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
	});

	it('TC - Create new record in resource for cost code', function () {
	
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
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

	it('TC - Copy as a reference line item ', function () {

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.copyReferenceLineItem(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Update quantity of resource ', function () {
		
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CODE, Cypress.env('Text'));

		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
		});
		_common.clear_subContainerFilter(cnt.uuid.RESOURCES)
		_common.select_rowInContainer(cnt.uuid.RESOURCES)
		_common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, CONTAINERS_RESOURCE.QUANTITY);
		_common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.UPDATED_QUANTITY);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Verify cost total ', function () {

		_validate.verify_referenceLineItem_with_baseLineItem(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL);
	});
});
