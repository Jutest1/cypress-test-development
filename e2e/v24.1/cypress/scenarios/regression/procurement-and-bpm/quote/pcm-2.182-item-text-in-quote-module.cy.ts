import { _common,  _sidebar,_projectPage,_package,_procurementContractPage,_procurementPage, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

import CommonLocators from 'cypress/locators/common-locators';

const allure = Cypress.Allure.reporter.getInterface();

// VARIABLES----------------------------------------------------------------

const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);

const CLERK = "HS";



let PROJECTS_PARAMETERS:DataCells,REQUEST_FOR_QUOTE_PARAMETERS
,RESQUISITION_PARAMETERS


let CONTAINERS_PROCUREMENT_CONFIGURATION;

let CONTAINER_COLUMNS_TOTALS,CONTAINERS_RFQ,CONTAINER_COLUMNS_REQUISITION,CONTAINER_COLUMNS_CUSTOMIZING

const ITEM_DESC = "ITEM-DESC-" + Cypress._.random(0, 999);
const TextAssembliesCode=  "TT-" + Cypress._.random(0, 999);
const TextAssembliesCode1=  "TT-" + Cypress._.random(0, 999);
const RFQ_DESC = "RFQ_DESC-" + Cypress._.random(0, 999);
var rfqCode:string;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Quote");
allure.story("PCM- 2.182 | Item Text in quote module");

describe("PCM- 2.182 | Item Text in quote module", () => {
  before(function () {
        cy.fixture('pcm/pcm-2.182-item-text-in-quote-module.json').then((data) => {
          this.data = data;
      CONTAINERS_PROCUREMENT_CONFIGURATION = this.data.CONTAINERS.PROCUREMENT_CONFIGURATION;
      CONTAINERS_RFQ = this.data.CONTAINERS.RFQ
      CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
      CONTAINER_COLUMNS_CUSTOMIZING = this.data.CONTAINER_COLUMNS.CUSTOMIZING
      
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
        [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
        [commonLocators.CommonLabels.CLERK]: CLERK
    }
      

        RESQUISITION_PARAMETERS={
            [commonLocators.CommonLabels.CONFIGURATION]:commonLocators.CommonKeys.MATERIAL_REQ
          }
          REQUEST_FOR_QUOTE_PARAMETERS = {
            [commonLocators.CommonLabels.BUSINESS_PARTNER]:[CONTAINERS_RFQ.BP1],
          }
      });
  cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
  _common.openDesktopTile(tile.DesktopTiles.PROJECT);
  _common.waitForLoaderToDisappear()

  });

  after(() => {
    cy.LOGOUT();
});

  it('TC - Creation Of Record in Requisition module', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);    

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
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
      _common.waitForLoaderToDisappear()


    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.MAIN).then(() => {
        _common.setDefaultView(app.TabBar.MAIN)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
        _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
    });
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.REQUISITIONS)
   
    _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS,RESQUISITION_PARAMETERS)

    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, "D")
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create Items for Requisition",function(){
  
    _common.openTab(app.TabBar.MAIN).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS,app.FooterTab.ITEMS,0)
        
    })
    _common.clear_subContainerFilter(cnt.uuid.REQUISITIONITEMS)
    _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
    _procurementContractPage.enterRecord_toCreateItem(cnt.uuid.REQUISITIONITEMS,"1202",ITEM_DESC,"10.00")
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
 });

  it('TC - Item text in requisition', function () {
    
    _common.openTab(app.TabBar.MAIN).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.ITEM_TEXTS,app.FooterTab.ITEM_TEXTS,1)
      
  })
    _common.maximizeContainer(cnt.uuid.ITEM_TEXTS)
    _common.create_newRecord(cnt.uuid.ITEM_TEXTS)
    _common.waitForLoaderToDisappear()//required wait
    _common.edit_dropdownCellWithCaret(cnt.uuid.ITEM_TEXTS,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE2)
    _common.edit_dropdownCellWithCaret(cnt.uuid.ITEM_TEXTS,app.GridCells.TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_PROCUREMENT_CONFIGURATION.MODULE_TYPE)
    cy.wait(1000)//required wait
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.ITEM_TEXTS)
    _common.waitForLoaderToDisappear()
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_REQUISITION_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
    cy.wait(500)//required wait      
    _common.waitForLoaderToDisappear()

    _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
  });
   
  it('TC - Create RFQ from wizard and change status', function() {
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUEST_FOR_QUOTE);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _rfqPage.create_requestForQuote_fromWizard(REQUEST_FOR_QUOTE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_RFQ)
    _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
      _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.RFQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE,app.FooterTab.RFQ,2)
      
    })   
    _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)

    _common.waitForLoaderToDisappear()
    _common.edit_containerCell(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,RFQ_DESC)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.REQUEST_FOR_QUOTE,app.GridCells.CODE).then(($value)=>{
    rfqCode = $value.text()
    Cypress.env("rfqCode",rfqCode)
    cy.log(rfqCode)
    })  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_RFQ_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PUBLISHED)
        _common.waitForLoaderToDisappear()
  });
  
  it('TC - Create Quote by adding new record', function(){ 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QUOTE);    
   

    _common.openTab(app.TabBar.QUOTES).then(() => {
       _common.select_tabFromFooter(cnt.uuid.QUOTES, app.FooterTab.QUOTES,0);  
     })
     _common.create_newRecord(cnt.uuid.QUOTES)
     cy.wait(1000).then(() => {
       _package.enterRecord_toCreateQuote(Cypress.env("rfqCode"),CONTAINERS_RFQ.BP1)
     })

     _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS,0);  
    })
    _common.clear_subContainerFilter(cnt.uuid.QUOTES_ITEMS)
    _common.select_rowInSubContainer(cnt.uuid.QUOTES_ITEMS)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTE_ITEM_TEXT, app.FooterTab.ITEM_TEXTS,0);  
    })
    _common.clear_subContainerFilter(cnt.uuid.QUOTE_ITEM_TEXT)
    _common.select_rowInSubContainer(cnt.uuid.QUOTE_ITEM_TEXT)
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.QUOTE_ITEM_TEXT,app.GridCells.PRC_TEXT_TYPE_FK,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE2)
  
   
  });
  
  it('TC - Verify text type in item text of Procurement configuration is visible in Quote', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_CONFIGURATION);    
   
   
    _common.openTab(app.TabBar.HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONFIGURATION_HEADER, app.FooterTab.CONFIGURATION_HEADER,0);  
    })
   _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)
   _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION,commonLocators.CommonLabels.QUOTATION)
   _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO,"Material QTN")
   _common.openTab(app.TabBar.HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION, app.FooterTab.ITEM_TEXTS);
   });
   cy.wait(1000)//required wait
   _common.waitForLoaderToDisappear()
   _common.delete_recordInContainer_ifRecordExists(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION) 
   cy.SAVE()
   _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATION_HEADER,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.MATERIAL)
   _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION,commonLocators.CommonLabels.QUOTATION)
   _common.clickOn_cellHasUniqueValue(cnt.uuid.CONFIGURATIONS,app.GridCells.DESCRIPTION_INFO,"Material QTN")
   _common.openTab(app.TabBar.HEADER).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION, app.FooterTab.ITEM_TEXTS);
   });
   _common.create_newRecord(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION);
   _common.edit_dropdownCellWithCaret(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE3)
   _common.edit_dropdownCellWithCaret(cnt.uuid.ITEM_TEXT_PROCUREMENTCONFIGURATION,app.GridCells.BAS_TEXT_MODULE_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_PROCUREMENT_CONFIGURATION.MODULE_TYPE)
     
   cy.SAVE()
   _common.waitForLoaderToDisappear()
   _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.QUOTE); 
    _common.openTab(app.TabBar.QUOTES).then(()=>{
      _common.setDefaultView(app.TabBar.QUOTES)
      _common.select_tabFromFooter(cnt.uuid.QUOTES,app.FooterTab.QUOTES,0)
    }) 
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)

   
    _common.create_newRecord(cnt.uuid.QUOTES)
    cy.wait(1000).then(() => {
      _package.enterRecord_toCreateQuote(Cypress.env("rfqCode"),CONTAINERS_RFQ.BP1)
    })
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS, app.FooterTab.ITEMS,2); 
    })
    _common.select_rowInContainer(cnt.uuid.QUOTES_ITEMS)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.QUOTES).then(() => {
      _common.select_tabFromFooter(cnt.uuid.QUOTE_ITEM_TEXT, app.FooterTab.ITEM_TEXTS,3);
    })
    _common.create_newRecord(cnt.uuid.QUOTE_ITEM_TEXT)
    _common.edit_dropdownCellWithCaret(cnt.uuid.QUOTE_ITEM_TEXT,app.GridCells.PRC_TEXT_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_PROCUREMENT_CONFIGURATION.TYPE3) 
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  })

  

}) 
   
  
 



