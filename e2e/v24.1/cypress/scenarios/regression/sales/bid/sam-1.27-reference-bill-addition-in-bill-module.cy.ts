import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _estimatePage, _validate, _mainView, _wipPage,_boqPage,_salesPage, _bidPage, _saleContractPage, _modalView, _billPage } from "cypress/pages";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
const allure = Cypress.Allure.reporter.getInterface();

const BOQ_HEADER_DESC = "BOQ_HEADER_DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTRUCT_DESC-"+ Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const WIP_DESC = "WIP1-DESC-" + Cypress._.random(0, 999);
const CONT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"

let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;


let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETER:DataCells;
let BILL_PARAMETER:DataCells
let CONTAINERS_RESOURCES;
let RESOURCE_PARAMETER:DataCells;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINER_COLUMNS_RESOURCES;
let CONTAINER_COLUMNS_BID;
let CONTAINER_COPY_BILL
let CONTAINER_BID;
let CONTAINERS_BILL
let CONTAINER_COLUMNS_BILL
let CONTAINER_WIP


allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.27 | Reference bill addition in bill module")


describe("SAM- 1.27 | Reference bill addition in bill module", () => {

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));

    cy.fixture("sam/sam-1.27-reference-bill-addition-in-bill-module.json").then((data) => {
      this.data = data
     
      CONTAINER_BOQ_STRUCTURE  = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
      CONTAINER_WIP  = this.data.CONTAINERS.WIP
      CONTAINER_COPY_BILL  = this.data.CONTAINERS.COPY_BILL
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID      
      CONTAINER_BID = this.data.CONTAINERS.BID  
      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_ESTIMATE= this.data.CONTAINERS.ESTIMATE
      CONTAINERS_BILL  = this.data.CONTAINERS.BILL
      CONTAINER_COLUMNS_LINE_ITEMS=this.data.CONTAINER_COLUMNS.LINE_ITEMS
      CONTAINER_COLUMNS_BILL  = this.data.CONTAINER_COLUMNS.BILL
      CONTAINER_COLUMNS_RESOURCES=this.data.CONTAINER_COLUMNS.RESOURCES
      CONTAINERS_RESOURCES= this.data.CONTAINERS.RESOURCES

      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
      }

      BOQ_STRUCTURE_PARAMETER={
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
        [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE
      } 

      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINER_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINER_ESTIMATE.ESTIMATE_TYPE,
      }

      LINE_ITEMS_PARAMETER = {
        [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_HEADER_DESC
      }

      RESOURCE_PARAMETER= {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCES.SHORT_KEY,
        [app.GridCells.CODE]:CONTAINERS_RESOURCES.CODE
      } 

      BILL_PARAMETER={
          [commonLocators.CommonLabels.BILL_TYPE]: CONTAINERS_BILL.TYPE ,
          [commonLocators.CommonLabels.CONTRACT]: CONT_DESC,
          [commonLocators.CommonLabels.DESCRIPTION]:BILL_DESC,
          [commonLocators.CommonLabels.CLERK]: CLERK_NAME
        }
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS,0)
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })

  });


  it("TC - Create new BoQ header and BoQ structure", function () {
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
   
    _common.waitForLoaderToDisappear()       
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);        
    cy.SAVE() 
    _common.waitForLoaderToDisappear()    

  });
  it("TC - Create new estimate", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
        
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE )
          _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()  
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
  });

    it('TC - Generate line item and assign resource to it', function () {
    
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS)
      _estimatePage.generate_lineItems_fromWizard(LINE_ITEMS_PARAMETER)
      cy.SAVE()
      _common.waitForLoaderToDisappear()  
  
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, BOQSTRUCT_DESC);    
      cy.SAVE();
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {            
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
      });
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.create_newRecord(cnt.uuid.RESOURCES);
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER);
      cy.SAVE(); 
      _common.waitForLoaderToDisappear()  
    });
    
    it("TC - Create new sales bid from wizard and change status", function () {
      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);

      _bidPage.createBidRecord_byWizardOptions(CONTAINER_BID.RUBRIC_CATEGORY,BID_DESC,CONTAINER_BID.BUSINESS_PARTNER,CONTAINER_BID.SOURCE_LEAD);      
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.BID).then(() => {      
        _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS,0);
        _common.setup_gridLayout(cnt.uuid.BIDS,CONTAINER_COLUMNS_BID)
      })
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
      cy.REFRESH_CONTAINER()
      _bidPage.changeStatus_BidRecord();
      cy.SAVE()
  
    });
    
  
    it("TC - Create Contract  ", function () {
      
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.BIDBOQ).then(() => {
          _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE,1);
          _common.waitForLoaderToDisappear()
      })
        _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREBID,CONTAINER_COPY_BILL.UOM) 
        _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.FINAL_PRICE_SMALL,"Save_Bid_finalprice") 
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);

        _saleContractPage.create_contract_fromWizard(CONT_DESC);
        _common.waitForLoaderToDisappear()
     
     
        _saleContractPage.changeStatus_ContractRecord();
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS,0); 
        });
      });

    it("TC - Create wip using Wizard option", function () {
       
        _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS,app.GridCells.AMOUNT_NET,Cypress.env("Save_Bid_finalprice"))
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_WIP);

        _wipPage.create_WIPfrom_Wizard(WIP_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.WIP).then(() => {
        _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP,0); 
        });
         _common.search_inSubContainer(cnt.uuid.WIP,WIP_DESC) 
    });
    
       
    it("TC - Add Wip Quantity and Create Bill using Wizard option ", function () {

        _common.openTab(app.TabBar.WIP).then(() => {
        _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP,0); 
        });
        _common.search_inSubContainer(cnt.uuid.WIP,WIP_DESC)
        _common.openTab(app.TabBar.WIPBOQ).then(() => {
        _common.setDefaultView(app.TabBar.WIPBOQ)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs); 
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.BRIEF_INFO_SMALL,BOQSTRUCT_DESC)
        _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_COPY_BILL.CONTRACTED_QUANTITY)
        
         cy.SAVE()
         _common.waitForLoaderToDisappear()

          
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
         _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_WIP_STATUS);
         _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        
         cy.SAVE()
         _common.waitForLoaderToDisappear()

         _common.openTab(app.TabBar.WIP).then(() => {
         _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP,0); 
           });
         _common.search_inSubContainer(cnt.uuid.WIP,WIP_DESC)
         _common.saveCellDataToEnv(cnt.uuid.WIP,app.GridCells.AMOUNT_NET,"wip_finalprice")
         _billPage.create_BillFromWizard(sidebar.SideBarOptions.CREATE_BILL, CONTAINERS_BILL.TYPE, CONTAINERS_BILL.MODULE,CONTAINERS_BILL.DESC)
         _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)
          _common.waitForLoaderToDisappear() 
    });

    it("TC - Verify the wip amount with Bill ", function () {
    
        _common.openTab(app.TabBar.BILLS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS,0);
        _common.setup_gridLayout(cnt.uuid.BILLS,CONTAINER_COLUMNS_BILL)
        });
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS,app.GridCells.AMOUNT_NET,Cypress.env("wip_finalprice"))
    });
   
    it("TC -  Create a new bill and Verify the reference Bill ", function () { 
        
        _common.openTab(app.TabBar.BILLS).then(() => {
        _common.setDefaultView(app.TabBar.BILLS)
        _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS,0);
        _common.setup_gridLayout(cnt.uuid.BILLS,CONTAINER_COLUMNS_BILL)
        });
        _common.getText_fromCell(cnt.uuid.BILLS, app.GridCells.BILL_NO).then(($ele1: JQuery<HTMLElement>) => {
          Cypress.env("bill_no", $ele1.text())
          cy.log(Cypress.env("bill_no"))
      })
        _common.create_newRecord(cnt.uuid.BILLS)
        _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETER)

        cy.SAVE()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(500).then(()=>{
          _common.edit_dropdownCellWithInput(cnt.uuid.BILLS,app.GridCells.RELATED_BILL_HEADER_FK,"grid",app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("bill_no"))
        })
          _common.waitForLoaderToDisappear()
         cy.SAVE()
         _common.waitForLoaderToDisappear()
         cy.wait(500).then(()=>{
        _common.assert_cellData_insideActiveRow(cnt.uuid.BILLS,app.GridCells.RELATED_BILL_HEADER_FK,Cypress.env("bill_no"))
         })
    });

    after(() => {
      cy.LOGOUT();
    });
  
  })
