import { _common,  _sidebar, _rfqPage,_mainView, _package,_validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;

let RFQ_PARAMETERS:DataCells
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINERS_RFQ;


let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;

let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINER_COLUMNS_ITEMS
let CONTAINER_COLUMNS_REQUISITION
let CONTAINER_COLUMNS_RFQ
let CONTAINER_COLUMNS_QUOTE

const RFQ_DESC = "RFQ_DESC-" + Cypress._.random(0, 999);
var packageCode:string;
var reqCode:string;
var rfqCode:string;
var quantity:string;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM- 1.27 | Create Quotes by adding new record");

describe("PCM- 1.27 | Create Quotes by adding new record", () => {
        before(function () {
          cy.fixture('pcm/pcm-1.27-create-quote-by-adding-new-record.json').then((data) => {
              this.data = data;
              CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
              CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
              CONTAINERS_RFQ = this.data.CONTAINERS.RFQ;
              CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
              CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
              CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
              
              CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
              CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
              CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
              CONTAINER_COLUMNS_REQUISITION= this.data.CONTAINER_COLUMNS.REQUISITION
              CONTAINER_COLUMNS_RFQ= this.data.CONTAINER_COLUMNS.RFQ
              CONTAINER_COLUMNS_QUOTE= this.data.CONTAINER_COLUMNS.QUOTE

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
                  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
                }
              RFQ_PARAMETERS = {
                  [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_RFQ.BP]
              };
  
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

it('TC - Create new estimate record', function () {

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
});

it("TC -  Create New Line Item Record", function () {
  
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

it("TC - Assign material resource to line item",function(){
      
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
         cy.REFRESH_CONTAINER()
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_SMALL).then(($value)=>{
           quantity = $value.text()
           cy.log(quantity)
        })
});

  it("TC - Verify Create/update material Package", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
        _common.waitForLoaderToDisappear()
         _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
         cy.SAVE();
         _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(()=>{
        
          _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
          _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
        });
        _common.getText_fromCell(cnt.uuid.PACKAGE,app.GridCells.CODE).then(($value)=>{
            packageCode = $value.text()
            cy.log(packageCode)
        })
        _common.openTab(app.TabBar.PACKAGE).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,1)
          _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS,CONTAINER_COLUMNS_ITEMS)
        });
        _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE);
        _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,quantity)
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
         _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
         cy.SAVE()
         _common.waitForLoaderToDisappear()

});

  it('TC - Create requisition from Package',function(){
         
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)
         _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.MAIN).then(()=>{
          _common.setDefaultView(app.TabBar.MAIN)
          _common.select_tabFromFooter(cnt.uuid.REQUISITIONS,app.FooterTab.REQUISITION,2)
          _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
        })
        _common.getText_fromCell(cnt.uuid.REQUISITIONS,app.GridCells.CODE).then(($value)=>{
           reqCode = $value.text()
            cy.log(reqCode)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
        
    });
  it('TC - Create Request For Quote from wizard and change status', function() {
        
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
        _rfqPage.create_requestForQuote_fromWizard(RFQ_PARAMETERS);    
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
          cy.SAVE();
        _common.openTab(app.TabBar.RFQ).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE,app.FooterTab.RFQ,2)
          _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE,CONTAINER_COLUMNS_RFQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.edit_containerCell(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,RFQ_DESC)
          cy.SAVE()
        _common.getText_fromCell(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.CODE).then(($value)=>{
            rfqCode = $value.text()
             cy.log(rfqCode)
        })  
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
      _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
          cy.SAVE();  
        
    });
  
it('TC - Create Quote by adding new record', function(){ 
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QUOTE);
   
        _common.openTab(app.TabBar.QUOTES).then(()=>{
          _common.setDefaultView(app.TabBar.QUOTES)
          _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES,0)
          _common.setup_gridLayout(cnt.uuid.QUOTES,CONTAINER_COLUMNS_QUOTE)
       
        }) 
        _common.create_newRecord(cnt.uuid.QUOTES)
        
        _package.enterRecord_toCreateQuote(rfqCode,CONTAINERS_RFQ.BP)
         cy.SAVE();
         _common.waitForLoaderToDisappear()
         cy.wait(1000)//required wait
        _common.select_rowInContainer(cnt.uuid.QUOTES) 
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES,app.GridCells.PROJECT_FK,Cypress.env("PROJECT_NUMBER"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES,app.GridCells.PACKAGE_NUMBER,packageCode)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES,app.GridCells.RFQ_HEADER_FK,rfqCode)
        _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES,app.GridCells.BUSINESS_PARTNER_FK,CONTAINERS_RFQ.BP)
        _common.openTab(app.TabBar.QUOTES).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS,2)
        }) 
        _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)     
        _common.assert_forNumericValues(cnt.uuid.QUOTES_ITEMS,app.GridCells.QUANTITY_SMALL,quantity)
    })
  

});