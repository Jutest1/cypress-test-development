import { _common, _estimatePage, _validate, _mainView, _boqPage } from 'cypress/pages';
import { app, tile, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from 'cypress/pages/interfaces';

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const LINE_ITEM_DESCRIPTION = "LI_DESC" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let   CONTAINERS_LINE_ITEMS_STRUCTURE,
CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM;
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic('ESTIMATE');
allure.feature('Estimate');
allure.story('EST- 1.121 | Add multi fields to grouping line items');

describe('EST- 1.121 | Add multi fields to grouping line items', () => {
	beforeEach(function () {
		cy.fixture('estimate/est-1.121-add-multi-field-to-grouping-line-items.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(
            Cypress.env('adminUserName'), 
            Cypress.env('adminPassword'),            
            Cypress.env('parentCompanyName'), 
            Cypress.env('childCompanyName')
        );

		cy.fixture('estimate/est-1.121-add-multi-field-to-grouping-line-items.json').then((data) => {
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
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
            };

            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE

            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            RESOURCE_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            };
       
			CONTAINERS_LINE_ITEMS_STRUCTURE = this.data.CONTAINERS.LINE_ITEMS_STRUCTURE;
			CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE = this.data.CONTAINER_COLUMNS.LINE_ITEMS_STRUCTURE;
			
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
			_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
      		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it("TC - Create estimate header", function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

	it('TC - Create New Line Item Record', function () {
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LINE_ITEM.AQ_QUANTITY)
		cy.SAVE()
        _common.waitForLoaderToDisappear()
		_common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET)
		_common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.WQ_QUANTITY_TARGET,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LINE_ITEM.WQ_QUANTITY)
        cy.SAVE()		
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    
	});

	it('TC- Create New Record In Resource For Cost Code', function () {
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)

		_common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL);
	});
    it('TC- Add Multi field grouping Line item',function(){
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.LINEITEMSSTRUCTURE, app.FooterTab.LINE_ITEMS_STRUCTURE,0)
			_common.setup_gridLayout(cnt.uuid.LINEITEMSSTRUCTURE, CONTAINER_COLUMNS_LINE_ITEMS_STRUCTURE)
			_common.waitForLoaderToDisappear()
		  })     
		  _common.maximizeContainer(cnt.uuid.LINEITEMSSTRUCTURE);  
		  cy.wait(1000)//The wait is mandatory here
		  _estimatePage.add_LineItemsStructure(CONTAINER_COLUMNS_LINE_ITEM.costtotal);
		_common.clickOn_cellHasIcon(cnt.uuid.LINEITEMSSTRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_DOMAIN_MONEY)
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE,app.GridCells.COST_TOTAL,Cypress.env("Text"))

		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE,app.GridCells.QUANTITY_TARGET,CONTAINERS_LINE_ITEM.AQ_QUANTITY)
		_common.assert_cellData_insideActiveRow(cnt.uuid.LINEITEMSSTRUCTURE,app.GridCells.WQ_QUANTITY_TARGET,CONTAINERS_LINE_ITEM.WQ_QUANTITY)
       
    })
})