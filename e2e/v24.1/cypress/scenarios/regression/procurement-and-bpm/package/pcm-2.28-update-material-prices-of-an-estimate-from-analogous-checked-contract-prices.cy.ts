import { _common,  _sidebar, _rfqPage,_mainView, _validate,_estimatePage, _modalView ,_procurementConfig, _package, _projectPage} from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";

let ESTIMATE_PARAMETERS: DataCells,
REQUEST_FOR_QUOTE_PARAMETERS 
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells,
UPDATE_ESTIMATE_PARAMETER:DataCells,PROJECTS_PARAMETERS: DataCells



let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let MODAL_UPDATE_ITEM_PRICE
let CONTAINERS_RFQ;
let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM,MODAL_UPDATE_ESTIMATE_WIZARD

let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;
let CONTAINERS_QUOTE_ITEM
let CONTAINER_COLUMNS_QUOTES
let CONTAINER_COLUMNS_QUOTE_ITEMS



allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.28 | Update material prices of an estimate from analogous checked contract prices");

describe("PCM- 2.28 | Update material prices of an estimate from analogous checked contract prices", () => {
      before(function () {
        cy.fixture('pcm/pcm-2.28-update-material-prices-of-an-estimate-from-analogous-checked-contract-prices.json').then((data) => {
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
          CONTAINER_COLUMNS_QUOTE_ITEMS=this.data.CONTAINER_COLUMNS.QUOTE_ITEMS
          MODAL_UPDATE_ITEM_PRICE=this.data.MODAL.UPDATE_ITEM_PRICE
          MODAL_UPDATE_ESTIMATE_WIZARD=this.data.MODAL.UPDATE_ESTIMATE_WIZARD

          PROJECTS_PARAMETERS = {
            [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
            [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]: CLERK
        }
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
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE
              
            }
            REQUEST_FOR_QUOTE_PARAMETERS = {
              [commonLocators.CommonLabels.BUSINESS_PARTNER]: [CONTAINERS_RFQ.BP],
            }
  
            

            UPDATE_ESTIMATE_PARAMETER={
              [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_ESTIMATE_WIZARD
            }
      });
  
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      
    
  }); 
  after(() => {
		cy.LOGOUT();
	});
  it("TC - Create New Estimate Record", function () {

    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
   
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
  it("TC- Create new Line item record", function(){
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
  it("TC- Assign material resource to line item",function(){
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
  it("TC- Verify Create/update material Package", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
     _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
     cy.SAVE();
     _common.waitForLoaderToDisappear()
 
     _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
  })
  _common.waitForLoaderToDisappear()

  _common.openTab(app.TabBar.PACKAGE).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,1)
    _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
 })
    _common.select_rowInSubContainer(cnt.uuid.PACKAGEITEMS)
   
    _package.changeStatus_ofPackage_inWizard()
    
  });
  it('TC - Create requisition from material package', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_REQUISITION);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    
  });
  it('TC - Create Request For Quote from wizard and change status', function() {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_RFQ);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    
  });
  it("TC - Create Quote from RfQ", function () {
   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_QUOTE);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _rfqPage.create_quote_fromWizard([CONTAINERS_RFQ.BP],[commonLocators.CommonKeys.CHECK]);
    _common.waitForLoaderToDisappear()
    _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_QUOTE);
    cy.SAVE();
    _common.waitForLoaderToDisappear()

  });
  it("TC - Quote the Prices for the suplier in Quote's items Container", function () {

    
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES)
      _common.setup_gridLayout(cnt.uuid.QUOTES, CONTAINER_COLUMNS_QUOTES)
      })
      _common.select_dataFromSubContainer(cnt.uuid.QUOTES,CONTAINERS_RFQ.BP);
      _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1)
      _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS, CONTAINER_COLUMNS_QUOTE_ITEMS)
      })
      _common.select_dataFromSubContainer(cnt.uuid.QUOTES_ITEMS, CONTAINERS_RESOURCE.CODE);
      _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_QUOTE_ITEM.PRICE1);
     _common.clickOn_activeRowCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.MDC_MATERIAL_FK)
     cy.SAVE()
     _common.waitForLoaderToDisappear()


     _common.waitForLoaderToDisappear()
     _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS, 1)
     
      })
    _common.select_rowInSubContainer(cnt.uuid.QUOTES_ITEMS)
    _common.waitForLoaderToDisappear()
    _common.getTextfromCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE_SMALL,app.GridCells.QUANTITY_SMALL); 
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_QUOTE_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.CHECKED);
    cy.SAVE();
   
  });

  it("TC - Verify Create Contract from Quote and change contract status", function () {
    
    const Price = Cypress.env("Text");
    const Quantity = Cypress.env("gridcell_2_Text")

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
       
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED);
    cy.SAVE();
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
    
    });
    _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
    _common.select_rowInSubContainer(cnt.uuid.ITEMSCONTRACT)
    _common.waitForLoaderToDisappear()
    _common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE_SMALL,Price)
    _common.assert_forNumericValues(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,Quantity)
  
});
it("TC- Verify Update Estimate Wizard option",function(){
 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
    
    _estimatePage.openModalContainerByDownArrow();
    _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
    
    _estimatePage.openModalContainerByDownArrow();
    _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _common.clickOn_modalFooterButton(btn.ButtonText.OK);


});
it("TC- Verify Cost/unit in Resource",function(){
  
  const Price = Cypress.env("Text");
  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);

  _common.openTab(app.TabBar.PROJECT).then(() => {
    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
  });
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
   _common.openTab(app.TabBar.ESTIMATE).then(() => {
     _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
   });
   _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION);
   _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)

   _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
   });
   _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
   _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION)
   _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
   });
   _common.search_inSubContainer(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE);
   _common.select_rowInSubContainer(cnt.uuid.RESOURCES)
   _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,Price)

});
});