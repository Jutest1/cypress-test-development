import { _common,  _sidebar, _rfqPage,_mainView, _package,_validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);

const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS1:DataCells
let RESOURCE_PARAMETERS2:DataCells


let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;


let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;

let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;
let CONTAINER_COLUMNS_PACKAGE

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------

var i:any
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.14 | Create a consolidated package of material from different catalog for selected line items");
describe("PCM- 2.14 | Create a consolidated package of material from different catalog for selected line items", () => {
 
  before(function () {
    cy.fixture('pcm/pcm-2.14-create-a-consolidated-package-of-material-from-Different-catalog-For-selected-line-items.json').then((data) => {
        this.data = data;
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
       
        CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
        CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
        CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
        
        CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
        CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
       
        CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
        ESTIMATE_PARAMETERS = {
            [app.GridCells.CODE]: ESTIMATE_CODE,
            [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
            [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
            [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
          }
        
        LINE_ITEM_PARAMETERS = {
            [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
          },
          
         
        RESOURCE_PARAMETERS = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
            [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY
          }
          RESOURCE_PARAMETERS1 = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
            [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE1,
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY1
          }
          RESOURCE_PARAMETERS2 = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
            [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE2,
            [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY2
          }
        
    });

    cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
});

after(() => {
    cy.LOGOUT();
});

it("TC - Create new estimate having line item and material resource to it", function () {
      
  _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
  });
  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);

  _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
  _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
  cy.SAVE();
  _common.waitForLoaderToDisappear()
  
});

it("TC - Add multiple resource for selected line item", function () {
   
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
  });

  _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.quantity,CONTAINER_COLUMNS_RESOURCE.estresourcetypeshortkey,CONTAINER_COLUMNS_RESOURCE.code],cnt.uuid.RESOURCES)
   
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
     cy.SAVE();
    _common.waitForLoaderToDisappear()
   
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS1);
     cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS2);
     cy.SAVE();
    _common.waitForLoaderToDisappear()

    cy.REFRESH_CONTAINER();
    cy.wait(500);
  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      
  });
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);   
    _common.perform_additionOfCellData(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL)
    _common.select_tabFromFooter(cnt.uuid.RESOURCES,app.FooterTab.RESOURCES)
    _common.select_allContainerData(cnt.uuid.RESOURCES);
  });

  it("TC - Create Material Package from Estimate", function () {
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
       _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
       _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
  
    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE)
      _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
    })
    _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
    _common.getTextfromCell(cnt.uuid.PACKAGE,app.GridCells.CODE)
    })
  it('TC- Verify only one package is created for resources',function () {  

    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
    })
   
    _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGEITEMS,app.GridCells.PRC_PACKAGE_FK,Cypress.env("Text"))
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
    cy.SAVE();
    
  });

  it("TC - Verify LineItems Cost Total with Totals Net Value", function () {

    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.TOTALS,app.FooterTab.TOTAL)
      _common.setup_gridLayout(cnt.uuid.TOTALS,CONTAINER_COLUMNS_TOTALS)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.TOTALS,app.GridCells.TOTAL_TYPE_FK,CONTAINERS_RESOURCE.TOTALTYPE)
    _common.assert_forNumericValues(cnt.uuid.TOTALS,app.GridCells.VALUE_NET, Cypress.env("AdditionOfColumnValues").toString());
  });
});
