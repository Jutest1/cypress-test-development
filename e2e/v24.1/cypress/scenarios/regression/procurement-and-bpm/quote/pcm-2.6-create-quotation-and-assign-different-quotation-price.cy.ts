import { _common,  _sidebar, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells,
REQUEST_FOR_QUOTE_PARAMETERS
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;



let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINERS_RFQ;
let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;
let CONTAINERS_QUOTE_ITEM
let CONTAINER_COLUMNS_QUOTES
let CONTAINER_COLUMNS_QUOTE_ITEM
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------


allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM- 2.6 | Create quotation and assign different quotation price.");
describe("PCM- 2.6 | Create quotation and assign different quotation price.", () => {
      before(function () {
        cy.fixture('procurement-and-bpm/pcm-2.6-create-quotation-and-assign-different-quotation-price.json').then((data) => {
            this.data = data;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINERS_RFQ = this.data.CONTAINERS.RFQ;
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
            CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
            CONTAINERS_QUOTE_ITEM = this.data.CONTAINERS.QUOTE_ITEM
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
            CONTAINER_COLUMNS_QUOTES = this.data.CONTAINER_COLUMNS.QUOTES
            CONTAINER_COLUMNS_QUOTE_ITEM=this.data.CONTAINER_COLUMNS.QUOTE_ITEM
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
              REQUEST_FOR_QUOTE_PARAMETERS = {
                [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_RFQ.BP,CONTAINERS_RFQ.BP2],
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
  it("TC - Create new Estimate having line item and material resource to it", function () {

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

  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
  });
  _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
  _common.create_newRecord(cnt.uuid.RESOURCES);
  _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
   cy.SAVE();
  _common.waitForLoaderToDisappear()
  });

  it("TC - Create Material Package from Estimate", function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
     _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
     cy.SAVE();
     _common.waitForLoaderToDisappear()
     
     _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.setDefaultView(app.TabBar.PACKAGE)
         _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
         _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
     })
     _common.waitForLoaderToDisappear()
    
    
     _common.openTab(app.TabBar.PACKAGE).then(()=>{
     
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,1)
        _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
     })
     _common.select_dataFromSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE)
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
     _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
    cy.SAVE();
  });

  it("TC - Create Requisition from Package", function () {
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_REQUISITION);
    cy.SAVE();


    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    cy.SAVE();

    _common.openTab(app.TabBar.MAIN).then(()=>{
      _common.setDefaultView(app.TabBar.MAIN)
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS)
     
      })
    _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
    _common.getText_fromCell(cnt.uuid.REQUISITIONITEMS, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("REQUISITIONQUANTITY", $ele1.text())
        }) 
  });

  it("TC - Create RfQ from Requisition", function () {

    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_RFQ);
    cy.SAVE();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
    cy.SAVE();

   
  });

  it("TC - Create Quote for multiple suppliers from RfQ and verify more business partner getting searched", function () {
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _rfqPage.create_quote_fromWizard([CONTAINERS_RFQ.BP,CONTAINERS_RFQ.BP2],[commonLocators.CommonKeys.CHECK]);
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE);
    cy.SAVE();
  });

  it("TC - Verify business partner in quote is same as bidder selected in create quote", function () {
   
    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
      _common.setup_gridLayout(cnt.uuid.QUOTES,CONTAINER_COLUMNS_QUOTES)
      })
   _common.select_dataFromSubContainer(cnt.uuid.QUOTES, CONTAINERS_RFQ.BP);
   _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES,app.GridCells.BUSINESS_PARTNER_FK ,CONTAINERS_RFQ.BP)

   _common.select_dataFromSubContainer(cnt.uuid.QUOTES, CONTAINERS_RFQ.BP2);
   _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES,app.GridCells.BUSINESS_PARTNER_FK ,CONTAINERS_RFQ.BP2)
    
  });

  it("TC - Quote the Prices for the supliers in Quote's items Container and verify default prices and quantity for each quote", function () {
    

    _common.openTab(app.TabBar.QUOTES).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
    _common.setup_gridLayout(cnt.uuid.QUOTES,CONTAINER_COLUMNS_QUOTES)
    })
   _common.select_dataFromSubContainer(cnt.uuid.QUOTES, CONTAINERS_RFQ.BP);
  
    _common.openTab(app.TabBar.QUOTES).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS)
    _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS,CONTAINER_COLUMNS_QUOTE_ITEM)
      })
    _common.select_rowInSubContainer(cnt.uuid.QUOTES_ITEMS);
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL,"0.000")
    _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.QUANTITY_SMALL,Cypress.env("REQUISITIONQUANTITY"))
    _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_ITEM.PRICE1);
    cy.SAVE();
    _common.openTab(app.TabBar.QUOTES).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
    _common.setup_gridLayout(cnt.uuid.QUOTES,CONTAINER_COLUMNS_QUOTES)
      })
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES,CONTAINERS_RFQ.BP2);
    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS)
      _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS,CONTAINER_COLUMNS_QUOTE_ITEM)
      })
    _common.select_rowInSubContainer(cnt.uuid.QUOTES_ITEMS);
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL,"0.000")
    _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTES_ITEMS, app.GridCells.QUANTITY_SMALL,Cypress.env("REQUISITIONQUANTITY"))
    _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_ITEM.PRICE2);
    cy.SAVE();
  });

  it("TC - Verify Totals in Quote Module", function () {
   
   
    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES)
      _common.setup_gridLayout(cnt.uuid.QUOTES,CONTAINER_COLUMNS_QUOTES)
        })
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES, CONTAINERS_RFQ.BP);
    _rfqPage.verify_TotalsForQuote("Total",cnt.uuid.QUOTES_ITEMS,cnt.uuid.QUOTES_TOTALS);
    _common.select_dataFromSubContainer(cnt.uuid.QUOTES, CONTAINERS_RFQ.BP2);
    _rfqPage.verify_TotalsForQuote("Total",cnt.uuid.QUOTES_ITEMS,cnt.uuid.QUOTES_TOTALS);
  });
});
