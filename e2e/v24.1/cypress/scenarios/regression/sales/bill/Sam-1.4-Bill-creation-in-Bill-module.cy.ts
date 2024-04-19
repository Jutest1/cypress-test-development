import { tile, app, cnt ,sidebar,btn, commonLocators} from "cypress/locators";
import {_common,_projectPage,_bidPage,_saleContractPage,_estimatePage,_boqPage,_mainView,_modalView,_wipPage,_billPage} from "cypress/pages";
import { isNull } from "cypress/types/lodash";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();

const BOQ_HEADER_DESC = "BOQ_HEADER_DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTRUCT_DESC-"+ Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const WIP_DESC = "WIP_DESC-"+ Cypress._.random(0, 999);
const WIP_DESC1 = "WIP_DESC-"+ Cypress._.random(0, 999);

let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;


let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETER:DataCells;
let CONTAINERS_RESOURCES;
let RESOURCE_PARAMETER:DataCells;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINER_COLUMNS_RESOURCES;

let MODAL_GENERATE_BUDGET;
let DJC_BUDGET_PARAMETERS:DataCells

let CONTAINER_COLUMNS_BID;
let CONTAINER_BID;
let BID_PARAMETER: DataCells;

let CONTAINER_COLUMNS_CONTRACT_SALES;

let CONTAINER_WIP;
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE;

let BILL_PARAMETER1:DataCells;
let BILL_PARAMETER2: DataCells;

let CONTAINER_BILL;
  
allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 1.4 | Bill creation in Bill module");
  
describe("SAM- 1.4 | Bill creation in Bill module", () => {  
    before(function () {
      cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"),Cypress.env("parentCompanyName"),Cypress.env("childCompanyName"))
      cy.fixture("sam/Sam-1.4-Bill-creation-in-Bill-module.json").then((data) => {
      this.data = data;
      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
      }
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
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID      
      CONTAINER_BID = this.data.CONTAINERS.BID
     
      CONTAINER_COLUMNS_CONTRACT_SALES=this.data.CONTAINER_COLUMNS.CONTRACT_SALES 
      CONTAINER_WIP= this.data.CONTAINERS.WIP
      CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_ESTIMATE= this.data.CONTAINERS.ESTIMATE
      ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINER_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINER_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINER_COLUMNS_LINE_ITEMS=this.data.CONTAINER_COLUMNS.LINE_ITEMS
      LINE_ITEMS_PARAMETER = {
          [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_HEADER_DESC
      }
      CONTAINER_COLUMNS_RESOURCES=this.data.CONTAINER_COLUMNS.RESOURCES
      CONTAINERS_RESOURCES= this.data.CONTAINERS.RESOURCES
      RESOURCE_PARAMETER= {
          [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCES.SHORT_KEY,
          [app.GridCells.CODE]:CONTAINERS_RESOURCES.CODE
      } 
      CONTAINER_BILL = this.data.CONTAINERS.BILL    
      BILL_PARAMETER1={
        [commonLocators.CommonLabels.BILL_TYPE]: CONTAINER_BILL.TYPE1,
        [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
        [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC,
        [commonLocators.CommonLabels.CLERK]: CONTAINER_BILL.CLERK_NAME
      }
      BILL_PARAMETER2={
        [commonLocators.CommonLabels.BILL_TYPE]: CONTAINER_BILL.TYPE2,
        [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
        [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC,
        [commonLocators.CommonLabels.CLERK]: CONTAINER_BILL.CLERK_NAME
      }
      
        /* Open desktop should be called in before block */
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.openTab(app.TabBar.PROJECT).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS,1)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();
      });
    });                                        
  
    it("TC - Create new BoQ record and  Estimate record ", function () {
      _common.openTab(app.TabBar.BOQ).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
        _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
    })           
      _common.clear_subContainerFilter(cnt.uuid.BOQS);
      _common.create_newRecord(cnt.uuid.BOQS);                  
      _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
      cy.SAVE();
      _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
      _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.BOQSTRUCTURE)                  
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE,0);
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE) 
      });
      _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES) 
      _common.waitForLoaderToDisappear()       
      _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);        
      cy.SAVE()    
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE )
          _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
      });
      _common.create_newRecord(cnt.uuid.ESTIMATE)
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      cy.SAVE()
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)

    });
  
    it("TC - Verify generate line item and assigne resource to line item ", function () {
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS)
      _estimatePage.generate_lineItems_fromWizard(LINE_ITEMS_PARAMETER)
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {            
          _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
          _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
      });
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER);
      cy.SAVE();      
    })
    it("TC - Create new sales bid", function () {      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
      _bidPage.createBidRecord_byWizardOptions(CONTAINER_BID.RUBRIC_CATEGORY,BID_DESC,CONTAINER_BID.BUSINESS_PARTNER,CONTAINER_BID.SOURCE_LEAD);      
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BIDBOQ).then(() => {
        _common.select_tabFromFooter( cnt.uuid.BIDBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE,3);
        _common.setup_gridLayout(cnt.uuid.BIDBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      });
      _bidPage.verifyBidQuantity_inBoQStructure(CONTAINER_BID.QUANTITY);
      _bidPage.changeStatus_BidRecord();
      _common.saveCellDataToEnv(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,CONTAINER_BID.BID_ENV)
    });
  
    it("TC - Create Sales Contract using Wizard option", function () { 
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
      _saleContractPage.createContractRecord_byWizardOption(CONTRACT_DESC);
      _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS,app.FooterTab.BOQs)
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, CONTAINER_COLUMNS_BOQ_STRUCTURE)
        
      })
      _saleContractPage.verifyContractQuantity_inBoQStructure(CONTAINER_BOQ_STRUCTURE.QUANTITY,Cypress.env(CONTAINER_BID.BID_ENV));
    
    });  
    it("TC - Create WIP record", function () {    
      _common.openTab(app.TabBar.CONTRACTS).then(()=>{
        _saleContractPage.changeStatus_ContractRecord();
        _saleContractPage.selectContract();
      })      
      cy.REFRESH_CONTAINER();
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
      _wipPage.create_WIPfrom_Wizard(WIP_DESC)
      
    });

    it("TC - Update BoQ quantity in WIP module", function () {     
      _common.openTab(app.TabBar.WIPBOQ).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BOQ_WIP,app.FooterTab.BOQs)
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      })
      _wipPage.updateQuantity_inWIPBoqStructure(CONTAINER_WIP.QUANTITY);     
      _wipPage.changeStatus_WipRecord();
    });

    it("TC - Create bill for Progress Invoice", function () {     
      
      cy.REFRESH_CONTAINER();
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING);
      _common.openTab(app.TabBar.BILLS).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BILLS,app.FooterTab.BILLS)
      });
      _common.create_newRecord(cnt.uuid.BILLS);
      _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETER1)
       _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BILL_BOQ,app.FooterTab.BOQs)
        _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
      });
      _common.waitForLoaderToDisappear() 
      _billPage.verifyValue_inQuantityBill(CONTAINER_BILL.BOQ_SOURCE)
      _common.openTab(app.TabBar.BILLS).then(()=>{
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
          _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BILL_STATUS);
      })
      _common.changeStatus_fromModal(sidebar.SideBarOptions.BPA_Billed);       
    })     
    it("TC - Create another wip", function () {
     
      _common.openTab(app.TabBar.BILLS).then(()=>{
        _common. clickOn_goToButton_toSelectModule(cnt.uuid.BILLS,CONTAINER_BILL.CONTRACT_SALES);
      })
      _common.waitForLoaderToDisappear()
      
      _common.openTab(app.TabBar.CONTRACTS).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
      })
      _common.waitForLoaderToDisappear()
      _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACT_DESC)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);
      _wipPage.create_WIPfrom_Wizard(WIP_DESC1)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.WIPBOQ).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP,app.FooterTab.BOQ_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
      })
    _wipPage.updateQuantity_inWIPBoqStructure(CONTAINER_WIP.QUANTITY);    
    _wipPage.changeStatus_WipRecord();      
    });

    it("TC - Create bill for Final Invoice", function () {
      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING);
      _common.openTab(app.TabBar.BILLS).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BILLS,app.FooterTab.BILLS)
      });
      _common.create_newRecord(cnt.uuid.BILLS);
      _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETER2)
      _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BILL_BOQ,app.FooterTab.BOQs)
        _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)

      });
        _billPage.verifyValue_inQuantityBill(CONTAINER_BILL.BOQ_SOURCE) 
    });
    
    after(() => {
      cy.LOGOUT();
    });
  })
  