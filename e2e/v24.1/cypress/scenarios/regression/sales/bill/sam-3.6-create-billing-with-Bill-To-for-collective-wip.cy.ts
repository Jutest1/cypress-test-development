import { tile, app, cnt, sidebar, btn, commonLocators } from "cypress/locators";
import { _bidPage, _billPage, _boqPage, _common, _estimatePage, _modalView, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _mainView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";
import common from "mocha/lib/interfaces/common";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQ_DESC-" + Cypress._.random(0, 999);
const BID_DESCRIPTION =" BID_DESC" + Cypress._.random(0,999);
const PRJ_NO = "PRJ_NO" + Cypress._.random(0,999);
const PRJ_NAME = "PRJ_NAME"+ Cypress._.random(0,999);
const BILLTO_NO1 = "RECORD-60-" + Cypress._.random(0,999);
const BILLTO_NO2 = "RECORD-40-" + Cypress._.random(0,999);
const BILLTO_DESC1 = "BILLTO_DESC-" + Cypress._.random(0,999);
const BILLTO_DESC2 = "BILLTO_DESC-" + Cypress._.random(0,999);
const CONTRACT_DESC1 = "CONTRACT_DESC-" + Cypress._.random(0,999);
const CONTRACT_DESC2 = "CONTRACT_DESC-" + Cypress._.random(0,999);
const WIP_DESC = "WIP_DESC-" + Cypress._.random(0,999);
const BILL_DESC1 = "BILL_DESC-" + Cypress._.random(0,999);
const BILL_DESC2 = "BILL_DESC-" + Cypress._.random(0,999);
const BOQSTRUCT_DESC = "BOQSTRUCT_DESC-"+ Cypress._.random(0,999);

let CONTAINER_PROJECT;
let PROJECT_PARAMETER:DataCells;

let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells;

let CONTAINERS_CONTRACT_SALES;
let CONTAINER_COLUMNS_CONTRACT_SALES_BOQ;
let CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_CONTRACT_SALES;

let CONTAINER_COLUMNS_BID;
let CONTAINER_BID;
let BID_PARAMETER: DataCells;

let CONTAINER_BILL_TO;
let CONTAINER_COLUMNS_BILL_TO;
let CONTAINER_COLUMNS_BID_BOQ;
let CONTAINER_COLUMNS_BID_BOQ_STRUCTURE;

let CONTAINERS_WIP;
let CONTAINER_COLUMNS_WIP_BOQ;
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_WIP;

let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILL_BOQ;
let CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BILL;

allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 3.6 | Create Billing with 'Bill-To' for Collective WIP");
describe("SAM- 3.6 | Create Billing with 'Bill-To' for Collective WIP", () => {    
  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"), 
      Cypress.env("adminPassword"),      
      Cypress.env("parentCompanyName"), 
      Cypress.env("childCompanyName")
    );
    cy.fixture("sam/sam-3.6-create-billing-with-Bill-To-for-collective-wip.json").then((data) => {
      this.data = data;
      CONTAINER_PROJECT = this.data.CONTAINERS.PROJECT 
      PROJECT_PARAMETER = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]:PRJ_NO,
        [commonLocators.CommonLabels.NAME]:PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]:CONTAINER_PROJECT.CLERK_NAME
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
      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
      }
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
      CONTAINER_COLUMNS_BID_BOQ= this.data.CONTAINER_COLUMNS.BID_BOQ
      CONTAINER_COLUMNS_BID_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BID_BOQ_STRUCTURE
      CONTAINER_BID = this.data.CONTAINERS.BID
      BID_PARAMETER ={          
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESCRIPTION,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]:BOQ_HEADER_DESC     
      }
      CONTAINER_BILL_TO = this.data.CONTAINERS.BILL_TO
      CONTAINER_COLUMNS_BILL_TO = this.data.CONTAINER_COLUMNS.BILL_TO

      CONTAINERS_CONTRACT_SALES = this.data.CONTAINERS.CONTRACT_SALES
      CONTAINER_COLUMNS_CONTRACT_SALES_BOQ = this.data.CONTAINER_COLUMNS.CONTRACT_SALES_BOQ
      CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.CONTRACT_SALES_BOQ_STRUCTURE
      CONTAINER_COLUMNS_CONTRACT_SALES=this.data.CONTAINER_COLUMNS.CONTRACT_SALES;

      CONTAINERS_WIP= this.data.CONTAINERS.WIP
      CONTAINER_COLUMNS_WIP_BOQ= this.data.CONTAINER_COLUMNS.WIP_BOQ
      CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
      CONTAINER_COLUMNS_WIP= this.data.CONTAINER_COLUMNS.WIP

      CONTAINERS_BILL= this.data.CONTAINERS.BILL
      CONTAINER_COLUMNS_BILL_BOQ= this.data.CONTAINER_COLUMNS.BILL_BOQ
      CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BILL_BOQ_STRUCTURE
      CONTAINER_COLUMNS_BILL= this.data.CONTAINER_COLUMNS.BILL
        
    });
    /* Open desktop should be called in before block */
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()   
  });
  it("TC- Create new Project and Pinned it",function () {   
    _common.openTab(app.TabBar.PROJECT).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS)
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
    })
    _common.create_newRecord(cnt.uuid.PROJECTS)
    _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER)
    cy.SAVE()
    _common.pinnedItem()
  })
  it("TC - Create Bill To record", function () {
    
    
    _common.openTab(app.TabBar.PROJECT).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BILL__TO,app.FooterTab.BILL_TO)
        _common.setup_gridLayout(cnt.uuid.BILL__TO,CONTAINER_COLUMNS_BILL_TO)
        _common.clear_subContainerFilter(cnt.uuid.BILL__TO)
    })
    _common.create_newRecord(cnt.uuid.BILL__TO)
    _common.enterRecord_inNewRow(cnt.uuid.BILL__TO,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,BILLTO_NO1)
    _common.enterRecord_inNewRow(cnt.uuid.BILL__TO,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,BILLTO_DESC1)
    _common.edit_dropdownCellWithInput(cnt.uuid.BILL__TO,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_BILL_TO.BUSINESS_PARTNER1)
    _common.clickOn_activeRowCell(cnt.uuid.BILL__TO,app.GridCells.QUANTITY_PORTION)
    _common.enterRecord_inNewRow(cnt.uuid.BILL__TO,app.GridCells.QUANTITY_PORTION,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_BILL_TO.QUANTITY_PORTION1)
    cy.SAVE()
    _common.create_newRecord(cnt.uuid.BILL__TO)
    _common.enterRecord_inNewRow(cnt.uuid.BILL__TO,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,BILLTO_NO2)
    _common.enterRecord_inNewRow(cnt.uuid.BILL__TO,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,BILLTO_DESC2)
    _common.edit_dropdownCellWithInput(cnt.uuid.BILL__TO,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_BILL_TO.BUSINESS_PARTNER2)
    _common.clickOn_activeRowCell(cnt.uuid.BILL__TO,app.GridCells.QUANTITY_PORTION)
    _common.enterRecord_inNewRow(cnt.uuid.BILL__TO,app.GridCells.QUANTITY_PORTION,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_BILL_TO.QUANTITY_PORTION2)
    cy.SAVE()
  })

  it("TC - Create new BOQ and go to BOQ", function () {      
    _common.openTab(app.TabBar.BOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ )
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);  
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
  });

  it("TC - Create new BOQ structure", function () {    
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);
    cy.SAVE();
    _common.getTextfromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL)
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
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,Cypress.env("Text"))
    _common.openTab(app.TabBar.BIDBOQ).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BIDBOQS,app.FooterTab.BOQs)
        _common.setup_gridLayout(cnt.uuid.BIDBOQS,CONTAINER_COLUMNS_BID_BOQ)
    })  
    _common.select_rowInContainer(cnt.uuid.BIDBOQS)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BIDBOQ).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID,app.FooterTab.BOQ_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID,CONTAINER_COLUMNS_BID_BOQ_STRUCTURE)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_WIP.BOQLINETYPE)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.QUANTITY_SMALL,CONTAINER_BOQ_STRUCTURE.QUANTITY)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.PRICE_SMALL,CONTAINER_BOQ_STRUCTURE.UNITRATE)
  })
  it("TC - Create Contract for first Bill TO record",function () {
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_CONTRACT)
    _common.inputField_fromModal(commonLocators.CommonElements.ROW,commonLocators.CommonLabels.DESCRIPTION,0,app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(CONTRACT_DESC1, { force: true })
    _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.BILL_TO,BILLTO_NO1,commonLocators.CommonKeys.GRID)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
      _common.setup_gridLayout(cnt.uuid.CONTRACTS,CONTAINER_COLUMNS_CONTRACT_SALES)
    })
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    cy.SAVE()
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.CONTRACTSALES_BOQS,CONTAINER_COLUMNS_CONTRACT_SALES_BOQ)
    })  
    _common.select_rowInContainer(cnt.uuid.CONTRACTSALES_BOQS)
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_WIP.BOQLINETYPE)
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_BOQ_STRUCTURE.QUANTITY,CONTAINER_BILL_TO.QUANTITY_PORTION1,app.GridCells.QUANTITY_SMALL)

  })
  it("TC - Create Contract for second Bill TO record",function () {  
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.BID)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BID).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
      _common.setup_gridLayout(cnt.uuid.BIDS,CONTAINER_COLUMNS_BID)
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    })
     cy.REFRESH_CONTAINER()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BIDS,app.GridCells.DESCRIPTION_INFO,BID_DESCRIPTION)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_CONTRACT)
    _common.inputField_fromModal(commonLocators.CommonElements.ROW,commonLocators.CommonLabels.DESCRIPTION,0,app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(CONTRACT_DESC2, { force: true })
    _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.BILL_TO,BILLTO_NO2,commonLocators.CommonKeys.GRID)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
      _common.setup_gridLayout(cnt.uuid.CONTRACTS,CONTAINER_COLUMNS_CONTRACT_SALES)
    })
    _common.select_rowInContainer(cnt.uuid.CONTRACTS)
    cy.SAVE()
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.CONTRACTSALES_BOQS,CONTAINER_COLUMNS_CONTRACT_SALES_BOQ)
    })  
    _common.select_rowInContainer(cnt.uuid.CONTRACTSALES_BOQS)
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_WIP.BOQLINETYPE)
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_BOQ_STRUCTURE.QUANTITY,CONTAINER_BILL_TO.QUANTITY_PORTION2,app.GridCells.QUANTITY_SMALL)   
  })
  it("TC - Create Collective Wip from contract", function () {  
        
    
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
      _common.setup_gridLayout(cnt.uuid.CONTRACTS,CONTAINER_COLUMNS_CONTRACT_SALES)
    })
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO)
    cy.REFRESH_CONTAINER()
    _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACT_DESC1) 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED) 
    _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACT_DESC2) 
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED) 
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_WIP)
    cy.wait(500) //Wait is required to load modal
    _common.waitForLoaderToDisappear()
    _common.clickOn_checkboxByLabel_fromModal(commonLocators.CommonElements.RADIO1,CONTAINERS_WIP.COLLECTIVE_WIP,0)
    _common.inputField_fromModal(commonLocators.CommonElements.ROW,commonLocators.CommonLabels.DESCRIPTION,0,app.InputFields.DOMAIN_TYPE_TRANSLATION).clear({force:true}).type(WIP_DESC, {force:true})
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_WIP)    
  })
  it("TC - Verify remaining Quantity in WIP", function () {    
    _common.openTab(app.TabBar.WIP).then(()=>{
      _common.setDefaultView(app.TabBar.WIP)
      _common.select_tabFromFooter(cnt.uuid.WIP,app.FooterTab.WIP)
      _common.setup_gridLayout(cnt.uuid.WIP,CONTAINER_COLUMNS_WIP)
    })
    _common.select_rowInContainer(cnt.uuid.WIP)
    _common.openTab(app.TabBar.WIPBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.WIPBOQ,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.WIPBOQ,CONTAINER_COLUMNS_WIP_BOQ)
    })
    _common.select_rowInContainer(cnt.uuid.WIPBOQ)
    _common.openTab(app.TabBar.WIPBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP,CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_WIP.BOQLINETYPE)
    _common.clickOn_activeRowCell(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL)
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_WIP.INSTALLED_QUANTITY)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_isRecordSubstractTwoValues(cnt.uuid.BOQ_STRUCTUREWIP,CONTAINER_BOQ_STRUCTURE.QUANTITY,CONTAINERS_WIP.INSTALLED_QUANTITY,app.GridCells.REM_QUANTITY)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_WIP_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
  })
  it("TC - Create Bill from first Bill To record",function () { 
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_BILL)
    _common.waitForLoaderToDisappear()
    _common.inputField_fromModal(commonLocators.CommonElements.ROW,commonLocators.CommonLabels.DESCRIPTION,0,app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(BILL_DESC1, { force: true })
    _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.BILL_TO,BILLTO_NO1,commonLocators.CommonKeys.GRID) 
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BILL_BOQ,CONTAINER_COLUMNS_BILL_BOQ)
    })  
    _common.select_rowInContainer(cnt.uuid.BILL_BOQ)
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE,CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE)
    })
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLBOQSTRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_WIP.BOQLINETYPE)
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BILLBOQSTRUCTURE,CONTAINERS_WIP.INSTALLED_QUANTITY,CONTAINER_BILL_TO.QUANTITY_PORTION1,app.GridCells.QUANTITY_SMALL)  

  })
  it("TC - Create Bill from second Bill To record",function () {    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.WIP)
    _common.openTab(app.TabBar.WIP).then(()=>{
      _common.setDefaultView(app.TabBar.WIP)
      _common.select_tabFromFooter(cnt.uuid.WIP,app.FooterTab.WIP)
      _common.setup_gridLayout(cnt.uuid.WIP,CONTAINER_COLUMNS_WIP)
    })
    _common.select_rowInContainer(cnt.uuid.WIP)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_BILL)
    _common.waitForLoaderToDisappear()
    _common.inputField_fromModal(commonLocators.CommonElements.ROW,commonLocators.CommonLabels.DESCRIPTION,0,app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(BILL_DESC2, { force: true })
    _common.edit_dropDownWithInput_fromModal(commonLocators.CommonLabels.BILL_TO,BILLTO_NO2,commonLocators.CommonKeys.GRID) 
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BILL_BOQ,CONTAINER_COLUMNS_BILL_BOQ)
    })  
    _common.select_rowInContainer(cnt.uuid.BILL_BOQ)
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE,CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE)
    })
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLBOQSTRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINERS_WIP.BOQLINETYPE)
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BILLBOQSTRUCTURE,CONTAINERS_WIP.INSTALLED_QUANTITY,CONTAINER_BILL_TO.QUANTITY_PORTION2,app.GridCells.QUANTITY_SMALL)
  })
  after(() => {
    cy.LOGOUT();
});
})