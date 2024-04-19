import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _bidPage, _billPage, _boqPage, _common, _estimatePage, _modalView, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _mainView } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ_DESC-" + Cypress._.random(0, 999);
const BID_DESC =" BID_DESC" + Cypress._.random(0,999);
const PRJ_NO = "PRJ_NO" + Cypress._.random(0,999);
const PRJ_NAME = "PRJ_NAME"+ Cypress._.random(0,999);
const CONTRACT_DESC = "CONTRACT_DESC-"+ Cypress._.random(0,999);
const BOQ_STRU_DESC = "BOQ_STRU_DESC-"+ Cypress._.random(0,999);
const BOQ_STRU_DESC1 = "BOQ_STRU_DESC-"+ Cypress._.random(0,999);
const WIP_DESC = "WIP_DESC-"+ Cypress._.random(0,999);

let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_PROJECT;
let PROJECT_PARAMETER: DataCells;

let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_STRUCTURE_PARAMETER1: DataCells;

let BOQ_PARAMETERS:DataCells
let CONTAINER_COLUMNS_BID;
let CONTAINER_BID;
let BID_PARAMETER: DataCells;

let CONTAINER_COLUMNS_CONTRACT_SALES;

let CONTAINER_WIP;
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE;


allure.epic("SALES");
allure.feature("Sales-WIP");
allure.story("SAM- 1.52 | Enter WIP Quantity in BOQ (Absolute Percentage)");
describe("SAM- 1.52 | Enter WIP Quantity in BOQ (Absolute Percentage)", () => {  
  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"), 
      Cypress.env("adminPassword"),              
      Cypress.env("parentCompanyName"), 
      Cypress.env("childCompanyName")
    );
    cy.fixture("sam/sam-1.52-enter-wip-quantity-in-boq-absolute-percentage.json").then((data) => {
      this.data = data;
      CONTAINER_PROJECT = this.data.CONTAINERS.PROJECT 
      PROJECT_PARAMETER = {
          [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
          [commonLocators.CommonLabels.NAME]:PRJ_NAME,
          [commonLocators.CommonLabels.CLERK]:CONTAINER_PROJECT.CLERK_NAME
      }
      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
      }
      CONTAINER_BOQ_STRUCTURE  = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
      BOQ_STRUCTURE_PARAMETER={
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRU_DESC,
          [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY,
          [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
          [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE
      } 
      BOQ_STRUCTURE_PARAMETER1={
          [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
          [app.GridCells.BRIEF_INFO_SMALL]:BOQ_STRU_DESC1,
          [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY1,
          [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
          [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE1
      } 
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID      
      CONTAINER_BID = this.data.CONTAINERS.BID
      BID_PARAMETER ={          
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESC,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]:BOQ_DESC     
      } 
      CONTAINER_COLUMNS_CONTRACT_SALES=this.data.CONTAINER_COLUMNS.CONTRACT_SALES 
      CONTAINER_WIP= this.data.CONTAINERS.WIP
      CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()     
    });
    
  });
  it("TC - Create new Project and Pinned it",function () {
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
    });
    _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
    _common.create_newRecord(cnt.uuid.PROJECTS);
    _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER);
    cy.SAVE();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();          
    
  });
  it("TC - Create new BOQ and go to BOQ", function () {    
    _common.openTab(app.TabBar.BOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
    })           
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);                  
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
  });

  it("TC - Create new BOQ structure", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)                  
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE,0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE) 
    });
    _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES) 
    _common.waitForLoaderToDisappear()       
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);        
    cy.SAVE()          
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER1);
    cy.SAVE()
    
  });
  it("TC - Create Bid and assign BoQ to it", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.BID)
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.BID).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
      _common.setup_gridLayout(cnt.uuid.BIDS,CONTAINER_COLUMNS_BID)
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    })
    _common.create_newRecord(cnt.uuid.BIDS); 
    _common.waitForLoaderToDisappear()
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER)    
    cy.SAVE()   
    _common.waitForLoaderToDisappear() 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_BID_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED) 
      
  });
  it("TC - Create contract from wizard", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    _saleContractPage.createContractRecord_byWizardOption(CONTRACT_DESC);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
      _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT_SALES)
      _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    })    
    cy.SAVE()    
    _saleContractPage.changeStatus_ContractRecord();
      
  });
  it("TC - Create WIP from Wizard",function () {  
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
    _wipPage.create_WIPfrom_Wizard(WIP_DESC)
    _common.openTab(app.TabBar.WIPBOQ).then(()=>{
      _common.setDefaultView(app.TabBar.WIPBOQ)
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQ_WIP,CONTAINER_COLUMNS_BOQ)
    })
    _common.select_rowInContainer(cnt.uuid.BOQ_WIP)
    _common.openTab(app.TabBar.WIPBOQ).then(()=>{        
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP,CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRU_DESC)
    _common.clickOn_activeRowCell(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.PECENTAGE_QUANTITY)
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.PECENTAGE_QUANTITY,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_WIP.PERCENTAGE_QTY)
    cy.SAVE()
   _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BOQ_STRUCTUREWIP,CONTAINER_BOQ_STRUCTURE.QUANTITY,CONTAINER_WIP.PERCENTAGE_QTY,app.GridCells.QUANTITY_SMALL)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.BRIEF_INFO_SMALL,BOQ_STRU_DESC1)
    _common.clickOn_activeRowCell(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.CUMULATIVE_PERCENT)
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.CUMULATIVE_PERCENT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_WIP.CUMMULATIVE_PERCENTAGE)
    cy.SAVE()
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BOQ_STRUCTUREWIP,CONTAINER_BOQ_STRUCTURE.QUANTITY1,CONTAINER_WIP.CUMMULATIVE_PERCENTAGE,app.GridCells.QUANTITY_SMALL)
  })
  after(() => {
    cy.LOGOUT();
  });
})