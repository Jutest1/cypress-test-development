import { tile, app, cnt,sidebar, btn, commonLocators } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { isNull } from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface();

const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT_DESC" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ_NO" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);

let CONTAINER_PROJECT;
let PROJECT_PARAMETER: DataCells;
let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_CONTRACT_SALES;
let CONTAINER_COLUMNS_BID;
let CONTAINER_BID;
let BID_PARAMETER: DataCells;
let WIP_PARAMETER: DataCells;
let CONTAINER_BILL;
let BILL_PARAMETER: DataCells;
let CONTAINER_WIP;
let CONTAINER_BILLING_SCHEMA;
let CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BILLING_SCHEMA;


allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 3.2 | Progressive invoice bill creation directly from bill module by clicking on new record button");

describe("SAM- 3.2 | Progressive invoice bill creation directly from bill module by clicking on new record button", () => {
  

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    )

    cy.fixture("sam/sam-3.2-progressive-invoice-bill-creation-directly-from-bill-module-by-clicking-on-new-record-button.json").then((data) => {
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
      CONTAINER_BID = this.data.CONTAINERS.BID
      BID_PARAMETER ={          
        [app.InputFields.INPUT_GROUP_CONTENT]: CONTAINER_BID.BUSINESS_PARTNER,
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESC,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC 
      }
      CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.CONTRACT_SALES_BOQ_STRUCTURE
      CONTAINER_COLUMNS_CONTRACT_SALES= this.data.CONTAINER_COLUMNS.CONTRACT_SALES
      CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.WIP_BOQ_STRUCTURE
      CONTAINER_WIP= this.data.CONTAINERS.WIP;
      WIP_PARAMETER = {
        [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
        [commonLocators.CommonLabels.BOQ_SOURCE]:CONTAINER_WIP.BOQ_SOURCE,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
      }
      CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE=this.data.CONTAINER_COLUMNS.BILL_BOQ_STRUCTURE
      CONTAINER_BILL= this.data.CONTAINERS.BILL;
      BILL_PARAMETER = {
        [commonLocators.CommonLabels.BILL_TYPE]: CONTAINER_BILL.BILL_TYPE,
        [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
        [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC,
        [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINER_BILL.BOQ_SOURCE,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
      }
      CONTAINER_BILLING_SCHEMA= this.data.CONTAINERS.BILLING_SCHEMA
      CONTAINER_COLUMNS_BILLING_SCHEMA= this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
      
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0)
      })
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    });
    _common.select_rowInContainer(cnt.uuid.PROJECTS)
  });

  it("TC - Prerequisite - Create Billing Schema record", function () {   

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA)
    })
    _common.openTab(app.TabBar.BILLING_SCHEMA).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLING_SCHEMA, app.FooterTab.BILLINGSCHEMA, 0);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA, app.GridCells.DESCRIPTION_INFO, CONTAINER_BILLING_SCHEMA.STANDARD_SINGEL)
    _common.select_allContainerData(cnt.uuid.BILLING_SCHEMA_DETAILS)
    _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
    _common.clickOn_cellHasIcon(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.TREE, app.GridCellIcons.ICO_RUBRIC_CUSTOMER_BILLING)
    _common.clickOn_toolbarButton(cnt.uuid.BILLING_SCHEMA_DETAILS,btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLING_SCHEMA_DETAILS, app.GridCells.DESCRIPTION_INFO, CONTAINER_BILLING_SCHEMA.DESCRIPTION)    
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  })

  it("TC - Create new BoQ header", function () { 

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS)  
    cy.SAVE();   
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create BoQ Structure", function () {  
    
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });


  it("TC - Create new sales bid", function () {   
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BID);
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.create_newRecord(cnt.uuid.BIDS);
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _bidPage.changeStatus_BidRecord()
  });


  it("TC - Create Contract by wizard and change status", function () {   

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    _saleContractPage.createContractRecord_byWizardOption(CONTRACT_DESC)
    _common.openTab(app.TabBar.CONTRACTBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTSALES_BOQS, app.FooterTab.BOQs)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, CONTAINER_COLUMNS_CONTRACT_SALES_BOQ_STRUCTURE)
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINER_BOQ_STRUCTURE.BOQLINETYPE)
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.QUANTITY_SMALL).then(($ContractQuantity) => {
      Cypress.env("ContractQuantity", $ContractQuantity.text())
    })
    _saleContractPage.changeStatus_ContractRecord()
    cy.SAVE()
  })


  it("TC - Create WIP record and update WIP BoQ quantity", function () {    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIP);
    _common.waitForLoaderToDisappear() 
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.setDefaultView(app.TabBar.WIP)
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
    });   
    _common.create_newRecord(cnt.uuid.WIP)
    _common.waitForLoaderToDisappear()
    _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETER)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_WIP_BOQ_STRUCTURE)
    })
    _wipPage.updateQuantity_inWIPBoqStructure(CONTAINER_WIP.WIP_QUANTITY);
    _common.waitForLoaderToDisappear()
    _wipPage.changeStatus_WipRecord();
    _common.waitForLoaderToDisappear()
  });


  it("TC - Verify Contracted Quantity' should come from Contract Item", function () {
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP, app.FooterTab.BOQ_STRUCTURE)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.BOQ_LINE_TYPE_FK, CONTAINER_BOQ_STRUCTURE.BOQLINETYPE)
    })
    _common.waitForLoaderToDisappear()
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.ORD_QUANTITY_SMALL, Cypress.env("ContractQuantity"))
    
  })


  it("TC - Create bill for Progress Invoice", function () {  

    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLS).then(() => {      
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
    });
    _common.create_newRecord(cnt.uuid.BILLS);
    _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETER)
    _common.edit_dropdownCellWithCaret(cnt.uuid.BILLS, app.GridCells.BILLING_SCHEMA_FK, "list", CONTAINER_BILLING_SCHEMA.STANDARD_SINGEL)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs)
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE)
     _common.set_columnAtTop([CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE.installedquantity, CONTAINER_COLUMNS_BILL_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BILLBOQSTRUCTURE)
    });
  })

  it("TC - Verify IQ Quantity should come from WIP Quantity", function () {
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    })
      _common.waitForLoaderToDisappear()
      _common.assert_forNumericValues(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.INSTALLED_QUANTITY,CONTAINER_WIP.WIP_QUANTITY)
    
  })

  it("TC - Verify Final Price of Bill BoQ = Installed Quantity*Unit Rate ( Bill BoQ Structure)", function () {  

    _common.enterRecord_inNewRow(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_BILL.BILL_BOQ_QTY)
    cy.SAVE()
    _common.getText_fromCell(cnt.uuid.BILLBOQSTRUCTURE,  app.GridCells.PRICE_SMALL).then(($unitRate) => {
      Cypress.env("unitRate", $unitRate.text())
    })
    _common.getText_fromCell(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL).then(($finalPrice) => {
      Cypress.env("finalPrice", $finalPrice.text())
    })
    //Wait is required for calculation
    cy.wait(500).then(() => {
      let finalPrice = parseFloat(Cypress.env("finalPrice").replace(/,/g, ''))
      let finalPriceBillBoQ = parseFloat(Cypress.env("unitRate")) * parseFloat(CONTAINER_BILL.BILL_BOQ_QTY)
      expect(finalPrice.toFixed(0)).to.equals(finalPriceBillBoQ.toString())
    })
  })

  it("TC - Verify amount in Billing Schema in Bill module is equal to Final Price of BoQ Item", function () {   

    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILL_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA)
      _common.setup_gridLayout(cnt.uuid.BILL_BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA)
    });
    _common.maximizeContainer(cnt.uuid.BILL_BILLING_SCHEMA)
    _common.select_rowInContainer(cnt.uuid.BILL_BILLING_SCHEMA)
    _common.clickOn_toolbarButton(cnt.uuid.BILL_BILLING_SCHEMA, btn.ToolBar.ICO_RECALCULATE)
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.BILL_BILLING_SCHEMA)
    _common.assert_forNumericValues(cnt.uuid.BILL_BILLING_SCHEMA, app.GridCells.RESULT, Cypress.env("finalPrice"))
  })

})
