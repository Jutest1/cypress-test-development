import { tile, app, cnt,sidebar, btn, commonLocators } from "cypress/locators";
import { _bidPage, _billPage, _boqPage, _common, _estimatePage, _modalView, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _mainView } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import CommonLocators from "cypress/locators/common-locators";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const CONTRACTSALES_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRJNO-" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJNAME-" + Cypress._.random(0, 999);
const BID_DESCRIPTION= "BID_DESCRIPTION-"+ Cypress._.random(0, 999);

let CONTAINER_PROJECT;
let PROJECT_PARAMETER: DataCells;
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

allure.epic("SALES");
allure.feature("Sales-Contract");
allure.story("SAM- 1.47 | Copy Contract");
describe("SAM- 1.47 | Copy Contract", () => {  
  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"), 
      Cypress.env("adminPassword"),      
      Cypress.env("parentCompanyName"), 
      Cypress.env("childCompanyName")
    );
    cy.fixture("sam/sam-1.47-copy-contract.json").then((data) => {
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
      CONTAINER_COLUMNS_CONTRACT_SALES=this.data.CONTAINER_COLUMNS.CONTRACT_SALES
      CONTAINERS_CONTRACT_SALES= this.data.CONTAINERS.CONTRACT_SALES
      CONTAINER_COLUMNS_CONTRACT_SALES_BOQ = this.data.CONTAINER_COLUMNS.CONTRACT_SALES_BOQ
      CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.CONTRACT_SALES_BOQ_STRUCTURE
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID
      CONTAINER_BID = this.data.CONTAINERS.BID
      BID_PARAMETER ={          
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESCRIPTION,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]:BOQ_HEADER_DESC     
      }      
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()     
    });
    /* Open desktop should be called in before block */
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

  it("TC- Create new BOQ and go to BOQ", function () {     
    _common.openTab(app.TabBar.BOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);  
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
  });

  it("TC- Create new BOQ structure", function () {    
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETER);
    cy.SAVE();
    _common.getTextfromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL)
  });
  it("TC- Create Bid and assign BoQ to it", function () {       
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.BID)
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.BID).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
      _common.setup_gridLayout(cnt.uuid.BIDS,CONTAINER_COLUMNS_BID)
    })
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    _common.create_newRecord(cnt.uuid.BIDS); 
    _common.waitForLoaderToDisappear()
    cy.wait(1000) /* this wait is required to open the modal */  
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER)    
    cy.SAVE()    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(CommonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_BID_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,Cypress.env("Text"))
      
  })
  it("TC- Create contract from wizard", function () {   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(CommonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    _saleContractPage.createContractRecord_byWizardOption(CONTRACTSALES_DESC);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
      _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT_SALES)
      _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    })    
    cy.SAVE()
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS,app.GridCells.AMOUNT_NET,Cypress.env("Text"))
    _saleContractPage.changeStatus_ContractRecord();
    _common.getText_fromCell(cnt.uuid.CONTRACTS,app.GridCells.AMOUNT_NET).then(($value)=>{
        Cypress.env("ContractNetAmount",$value.text())
    })
      
  });
  it("TC- Create Copy of Contract",function () {    
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{           
        _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS,0)
        _common.setup_gridLayout(cnt.uuid.CONTRACTS,CONTAINER_COLUMNS_CONTRACT_SALES)
    })
    _common.search_inSubContainer(cnt.uuid.CONTRACTS,CONTRACTSALES_DESC)
    _common.clickOn_toolbarButton(cnt.uuid.CONTRACTS,btn.ToolBar.ICO_COPY_PASTE_DEEP)
    _common.waitForLoaderToDisappear()
    _common.getText_CellData_fromModal(commonLocators.CommonElements.ROW,commonLocators.CommonLabels.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,CONTAINERS_CONTRACT_SALES.ENV_CONTRACT_DESC)
    _common.clickOn_modalFooterButton(btn.ButtonText.NEXT)
    _common.clickOn_modalFooterButton(btn.ButtonText.FINISH)
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    
  })
  it("TC- Verify copied contract and net value",function () {       
    _common.search_inSubContainer(cnt.uuid.CONTRACTS,(Cypress.env(CONTAINERS_CONTRACT_SALES.ENV_CONTRACT_DESC)))
     cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS,app.GridCells.DESCRIPTION_INFO,Cypress.env(CONTAINERS_CONTRACT_SALES.ENV_CONTRACT_DESC))
    _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACTS,app.GridCells.AMOUNT_NET,Cypress.env("ContractNetAmount")) 
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{           
        _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS,app.FooterTab.BOQS,0)
        _common.setup_gridLayout(cnt.uuid.CONTRACTSALES_BOQS,CONTAINER_COLUMNS_CONTRACT_SALES_BOQ)
    })
    cy.REFRESH_CONTAINER() 
    _common.select_rowInContainer(cnt.uuid.CONTRACTSALES_BOQS)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{           
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1,app.FooterTab.BOQ_STRUCTURE,3)
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE)
    }) 
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.BOQ_LINE_TYPE_FK,CONTAINER_BOQ_STRUCTURE.BOQLINETYPE)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.QUANTITY_SMALL,CONTAINER_BOQ_STRUCTURE.QUANTITY)
  })

  after(() => {
    cy.LOGOUT();
  });
})