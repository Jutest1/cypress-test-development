import {_salesPage,_common, _estimatePage, _validate, _mainView, _boqPage, _package, _bidPage, _saleContractPage } from "cypress/pages";
import { app, tile, cnt,btn, sidebar, commonLocators } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();

const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC1 = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESCRIPTION = "BID_DESCRIPTION-"+ Cypress._.random(0, 999);


let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BID;
let CONTAINER_BID;
let BID_PARAMETER: DataCells;
let CONTAINER_COLUMNS_CONTRACT_SALES;
let CONTAINER_WIP;
let CONTAINER_COLUMNS_WIP;
let BID_BOQ_STRUCTURE_PARAMETER: DataCells;
let CONTAINER_BID_BOQ_STRUCTURE;


allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 1.53 | Delete WIP.");

describe("SAM- 1.53 | Delete WIP", () => {   

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-1.53-delete-WIP.json").then((data) => {
      this.data = data;    
      
      CONTAINER_BOQ_STRUCTURE  = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
      BOQ_STRUCTURE_PARAMETER={
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
        [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE
      } 
      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
      }
      CONTAINER_COLUMNS_CONTRACT_SALES=this.data.CONTAINER_COLUMNS.CONTRACT_SALES           
      CONTAINER_COLUMNS_WIP= this.data.CONTAINER_COLUMNS.WIP
      CONTAINER_WIP= this.data.CONTAINERS.WIP
     
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
      CONTAINER_BID = this.data.CONTAINERS.BID
      BID_PARAMETER ={          
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESCRIPTION      
      }
      CONTAINER_BID_BOQ_STRUCTURE  = this.data.CONTAINERS.BID_BOQ_STRUCTURE
      BID_BOQ_STRUCTURE_PARAMETER={
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC1,
        [app.GridCells.QUANTITY_SMALL]:CONTAINER_BID_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.BAS_UOM_FK]: CONTAINER_BID_BOQ_STRUCTURE.UOM,
        [ app.GridCells.PRICE_SMALL]:CONTAINER_BID_BOQ_STRUCTURE.UNITRATE
      } 
     
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
  });

it("TC - Create BOQ header & BOQ Structure in Project", function () {   
    
    _common.openTab(app.TabBar.BOQS).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
    _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
    _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES)
   });
  _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETER);
  cy.SAVE();
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
  _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);
  _common.waitForLoaderToDisappear()
});
it("TC - Create Bid and bid boq", function () {  
    
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
      _common.setup_gridLayout(cnt.uuid.BIDS,CONTAINER_COLUMNS_BID)
    });
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.create_newRecord(cnt.uuid.BIDS)
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER)
    cy.SAVE();
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs, 0);
    });
    _common.create_newRecord(cnt.uuid.BIDBOQS)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BIDBOQS, app.FooterTab.BOQs, 0);
     });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTUREBID,BID_BOQ_STRUCTURE_PARAMETER);   
    cy.SAVE()
    _bidPage.changeStatus_BidRecord();
});
it("TC - Create contract from bid", function () {    
      _common.openTab(app.TabBar.BID).then(() => {
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT) 
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.CONTRACTS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
        _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT_SALES)
    });
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
  });
});
it("TC - Create wip and change status", function () {
      
      _saleContractPage.changeStatus_ContractRecord()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
      _common.waitForLoaderToDisappear()
      cy.wait(1000) // Wait is required to click on OK button as modal takes time to load the modal view
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)      
      _common.waitForLoaderToDisappear()
      cy.wait(1000) // Wait is required to load modal data after clicking OK button
      _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_WIP)     
      _common.waitForLoaderToDisappear() 
});
it("TC - Deep copy wip and delete wip", function () {
   
    _common.openTab(app.TabBar.WIP).then(() => { 
      _common.setDefaultView(app.TabBar.WIP)
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP,0);
      _common.setup_gridLayout(cnt.uuid.WIP,CONTAINER_COLUMNS_WIP)
    });
    _common.clear_subContainerFilter(cnt.uuid.WIP)
    _common.clickOn_toolbarButton(cnt.uuid.WIP,btn.ToolBar.ICO_COPY_PASTE_DEEP)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    _common.clickOn_modalFooterButton(btn.ButtonText.FINISH)
    cy.SAVE()
    _common.saveCellDataToEnv(cnt.uuid.WIP,app.GridCells.DESCRIPTION_INFO,CONTAINER_WIP.EVN_DESC)
});
it("TC - Delete deep copy wip and verify deleted wip", function () {   
    _common.openTab(app.TabBar.WIP).then(() => { 
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP,0);
    });
    _common.clear_subContainerFilter(cnt.uuid.WIP)
    _common.delete_recordFromContainer(cnt.uuid.WIP)
    _common.waitForLoaderToDisappear()   
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.search_inSubContainer(cnt.uuid.WIP,Cypress.env(CONTAINER_WIP.EVN_DESC)) 
    _validate.verify_isRecordDeleted(cnt.uuid.WIP,Cypress.env(CONTAINER_WIP.EVN_DESC))
});

after(() => {
  cy.LOGOUT();
});
});
