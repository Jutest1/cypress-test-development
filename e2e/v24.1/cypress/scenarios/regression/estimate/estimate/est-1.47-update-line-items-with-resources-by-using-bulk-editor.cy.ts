import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from "cypress/pages";
import { app, tile, cnt,sidebar, btn,commonLocators } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface();

const LINE_ITEM_DESC_1 = "LINE_ITEM_DESC1_" + Cypress._.random(0, 999);
const LINE_ITEM_DESC_2 = "LINE_ITEM_DESC2_" + Cypress._.random(0, 999);
const LINEITEMCODE2="LINEITEMCODE2"
const LINEITEMCODE1="LINEITEMCODE1"

const BULK_CONFIG_NAME = "CONFIGNAME" + Cypress._.random(0, 999);

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = 'LI-DESC-1' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETERS:DataCells;
let LINE_ITEMS_PARAMETERS1:DataCells;
let RESOURCE_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS1:DataCells;

let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_RESOURCE;

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_RESOURCE;
let RULES;


allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.47 | Update line items with resources by using bulk editor");

describe('EST- 1.47 | Update line items with resources by using bulk editor', () => {
		before(function () {
			cy.fixture('estimate/est-1.47-update-line-items-with-resources-by-using-bulk-editor.json')
			  .then((data) => {
				this.data=data
				
				CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
				CONTAINERS_LINE_ITEM = this.data.CONTAINERS.ESTIMATE;
				CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
				
				CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
				CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE

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

        LINE_ITEMS_PARAMETERS1={
					[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION1,
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY1,
					[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
				}

				RESOURCE_PARAMETERS={
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
				}

        
				RESOURCE_PARAMETERS1={
					[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
					[app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE1,
					[app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY,
				}

        RULES= this.data.CREATE_NEW_RULE

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

  it("TC - Create Estimate header", function () {
   
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE, " ");
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
		_estimatePage.textOfEstimateCode();
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
  });

  it("TC - Create line item", function () {
   
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, " ");
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
		cy.SAVE();
		_common.waitForLoaderToDisappear()

    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS1)
		cy.SAVE();
		_common.waitForLoaderToDisappear()
  });

  it("TC - Create resource", function () {
   
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE);
    });
    _common.search_inSubContainer(cnt.uuid.RESOURCES, " ");
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESC_1)
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE,LINEITEMCODE1)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()

    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESC_2)
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE,LINEITEMCODE2)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS1);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
});

it("TC - Verify bulk editor button functionality", function () {
   

    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
   _common.waitForLoaderToDisappear()

    _estimatePage.bulkEditor_createNewRule(cnt.uuid.ESTIMATE_LINEITEMS,BULK_CONFIG_NAME,RULES)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE,Cypress.env(LINEITEMCODE1))
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,RULES[1].OptionData)
    _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_SMALL,RULES[0].OptionData)
    _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET,RULES[3].OptionData)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.BAS_UOM_FK,RULES[2].OptionData)
    _validate.verify_QuantityTotalOfLineItem(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_SMALL,app.GridCells.WQ_QUANTITY_TARGET,app.GridCells.QUANTITY_TOTAL)
    
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE,Cypress.env(LINEITEMCODE2))
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,RULES[1].OptionData)
    _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_SMALL,RULES[0].OptionData)
    _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET,RULES[3].OptionData)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.BAS_UOM_FK,RULES[2].OptionData)
    _validate.verify_QuantityTotalOfLineItem(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_SMALL,app.GridCells.WQ_QUANTITY_TARGET,app.GridCells.QUANTITY_TOTAL)
});

})
