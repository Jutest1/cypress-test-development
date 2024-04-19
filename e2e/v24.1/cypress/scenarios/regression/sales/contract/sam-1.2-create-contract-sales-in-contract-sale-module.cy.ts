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


let CONTAINER_PROJECT;
let PROJECT_PARAMETER: DataCells;
let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells;
let CONTAINERS_CONTRACT_SALES;
let CONTAINER_COLUMNS_CONTRACT_SALES;
let CONTRACT_SALES_PARAMETER:DataCells;
let COPY_BOQ_PARAMETER: DataCells;
let MODALS_COPY_BOQS


allure.epic("SALES");
allure.feature("Sales-Contract");
allure.story("SAM- 1.2 | Create contract sales in contract sales module");
describe("SAM- 1.2 | Create contract sales in contract sales module", () => {  
  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"), 
      Cypress.env("adminPassword"),      
      Cypress.env("parentCompanyName"), 
      Cypress.env("childCompanyName")
    );
    cy.fixture("sam/sam-1.2-create-contract-sales-in-contract-sale-module.json").then((data) => {
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
      CONTRACT_SALES_PARAMETER = {
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: CONTRACTSALES_DESC,
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINERS_CONTRACT_SALES.BUSINESS_PARTNER,
        
      };
      MODALS_COPY_BOQS= this.data.MODALS.COPY_BOQS
      COPY_BOQ_PARAMETER= {
        [commonLocators.CommonLabels.BOQ_SOURCE]:MODALS_COPY_BOQS.PROJECT_BOQ,
        [commonLocators.CommonLabels.BOQS]: BOQ_HEADER_DESC,
      }
      
    });
    /* Open desktop should be called in before block */
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()  
  });
  it("TC - Create new Project and Pinned it",function () {    
    _common.openTab(app.TabBar.PROJECT).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS)
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
    })
    _common.create_newRecord(cnt.uuid.PROJECTS)
    _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER)
    cy.SAVE()
    _common.pinnedItem()
  })

  it("TC - Create new BOQ and go to BOQ", function () {     
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

  it("TC - Create new BOQ structure", function () {    
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQ_STRUCTURE_PARAMETER);
    cy.SAVE();
    _common.getTextfromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL)
  }); 
  it("TC - Create new record in contract module", () => {    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT_SALES);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
      _common.setup_gridLayout(cnt.uuid.CONTRACTS, CONTAINER_COLUMNS_CONTRACT_SALES)
    })    
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    _common.create_newRecord(cnt.uuid.CONTRACTS);
    _salesPage.enterRecord_toCreateSalesBID(CONTRACT_SALES_PARAMETER);
    cy.SAVE()
  
  })  
  it("TC - Verify value of final price, quantity, contract sales", () => {   
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS,app.FooterTab.CONTRACTS)
    })     
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.COPY_BOQS)  
    _bidPage.enterRecord_toCopyBoq(COPY_BOQ_PARAMETER)
    cy.SAVE()
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{           
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS,app.FooterTab.BOQs,0)
      _common.setup_gridLayout(cnt.uuid.CONTRACTSALES_BOQS,CONTAINER_COLUMNS_BOQ)
    })
    _common.select_rowInContainer(cnt.uuid.CONTRACTSALES_BOQS)
    _common.openTab(app.TabBar.CONTRACTBOQ).then(()=>{           
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1,app.FooterTab.BOQ_STRUCTURE,3)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1,CONTAINER_COLUMNS_BOQ_STRUCTURE)
    }) 
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.TREE,app.GridCells.ICO_BOQ_ITEM)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.QUANTITY_SMALL,CONTAINER_BOQ_STRUCTURE.QUANTITY)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.FINAL_PRICE_SMALL,Cypress.env("Text"))

  });

  after(()=>{
    cy.LOGOUT();
  })
});
