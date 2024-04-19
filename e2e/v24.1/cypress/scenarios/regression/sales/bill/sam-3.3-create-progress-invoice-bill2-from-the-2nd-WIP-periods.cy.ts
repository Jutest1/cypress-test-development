import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCTURE_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const BILL2_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const WIP1_DESC = "WIP1-DESC-" + Cypress._.random(0, 999);
const WIP2_DESC = "WIP2-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
let PROJECTS_PARAMETERS: DataCells;
let BOQ_PARAMETERS: DataCells
let BOQ_STRUCTURE_PARAMETERS: DataCells
let CONTAINER_COLUMNS_BOQS;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BIDS;
let CONTAINERS_ESTIMATE;
let CONTAINERS_RESOURCE;
let WIP_PARAMETER_2: DataCells
let BILL_PARAMETERS: DataCells
let BILL_PARAMETERS_2: DataCells
let CONTAINERS_BILL;
let CONTAINER_COLUMNS_BILL_BOQS;
let CONTAINER_COLUMNS_BILLS;
let WIP_PARAMETER: DataCells
let BID_PARAMETER: DataCells
let CONTAINER_COLUMNS_BILLING_SCHEMA;
let CONTAINER_BILLING_SCHEMA;
let CONTAINER_WIP
allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 3.3 | Create progress invoice bill2 from the 2nd WIP periods");

describe("SAM- 3.3 | Create progress invoice bill2 from the 2nd WIP periods", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-3.3-create-progress-invoice-bill2-from-the-2nd-WIP-periods.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    )

    cy.fixture("sam/sam-3.3-create-progress-invoice-bill2-from-the-2nd-WIP-periods.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQS = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINERS_BOQ_STRUCTURE = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BIDS = this.data.CONTAINER_COLUMNS.BID
      CONTAINER_WIP= this.data.CONTAINERS.WIP;
      CONTAINERS_BILL = this.data.CONTAINERS.BILL
      CONTAINER_COLUMNS_BILL_BOQS = this.data.CONTAINER_COLUMNS.BILL_BOQS
      CONTAINER_COLUMNS_BILLS = this.data.CONTAINER_COLUMNS.BILL

      BOQ_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      }
      BOQ_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]: commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCTURE_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      }
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
        [commonLocators.CommonLabels.NAME]: PRJ_NAME,
        [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
      }
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
       BID_PARAMETER = {
        [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
        [app.InputFields.INPUT_GROUP_CONTENT]:  CONTAINERS_BILL.BUSINESS_PARTNER,
        [commonLocators.CommonLabels.PROJECT_NAME]:PRJ_NO,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC
      };
       WIP_PARAMETER = {
        [commonLocators.CommonLabels.DESCRIPTION]: WIP1_DESC,
        [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
        [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINERS_BILL.CONTRACTED_BOQ_SOURCE,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC
      }
       WIP_PARAMETER_2 = {
        [commonLocators.CommonLabels.DESCRIPTION]: WIP2_DESC,
        [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
        [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINERS_BILL.CONTRACTED_BOQ_SOURCE,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC
      }
       BILL_PARAMETERS = {
        [commonLocators.CommonLabels.BILL_TYPE]: CONTAINERS_BILL.BILL_TYPE,
        [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
        [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC,
        [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINERS_BILL.BOQ_SOURCE,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC
      }
      BILL_PARAMETERS_2 = {
        [commonLocators.CommonLabels.BILL_TYPE]: CONTAINERS_BILL.BILL_TYPE,
        [commonLocators.CommonLabels.DESCRIPTION]: BILL2_DESC,
        [app.GridCells.DESCRIPTION_INFO]: [WIP2_DESC],
        [commonLocators.CommonLabels.BOQ_SOURCE]: CONTAINERS_BILL.BOQ_SOURCE,
        [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC,
        [commonLocators.CommonKeys.VALUE]:[commonLocators.CommonKeys.CHECK]
      }
      CONTAINER_BILLING_SCHEMA= this.data.CONTAINERS.BILLING_SCHEMA
      CONTAINER_COLUMNS_BILLING_SCHEMA= this.data.CONTAINER_COLUMNS.BILLING_SCHEMA
      
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    });
  }); 

  it("TC - Prerequisite - Create Billing Schema record", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING_SCHEMA);
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
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _common.create_newRecordInSubContainer_ifNoRecordExists(cnt.SubcontainerId.BILLING_SCHEMA_DETAILS, 1)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  })


  it("TC - Create new BoQ header", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.PROJECT);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 2);
      _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQS)
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.maximizeContainer(cnt.uuid.BOQS)
    _common.create_newRecord(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS, BOQ_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.BOQS)
    _common.clickOn_toolbarButton(cnt.uuid.BOQS, btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear()

    
  });

  it("TC - Create BoQ Structure", function () {
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    //  _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.briefinfo, CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity, CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk, CONTAINER_COLUMNS_BOQ_STRUCTURE.price, CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk], cnt.uuid.BOQ_STRUCTURES)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETERS);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });


  it("TC - Create new sales bid", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.BID);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.create_newRecord(cnt.uuid.BIDS);
    cy.wait(1000)
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER);

    _common.select_rowInContainer(cnt.uuid.BIDS)
   // _common.edit_dropdownCellWithInput(cnt.uuid.BIDS,app.GridCells.BUSINESS_PARTNER_FK_SMALL,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_BILL.BUSINESS_PARTNER)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_BID_STATUS);
    _common.changeStatus_fromModal(commonLocators.CommonKeys.SUBMITTED);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });


  it("TC - Create Contract by wizard and change status", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
    _common.waitForLoaderToDisappear()
    _saleContractPage.create_contract_fromWizard(CONTRACT_DESC)
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.setDefaultView(app.TabBar.CONTRACTS)
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
      _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
  });
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
    _common.changeStatus_fromModal(commonLocators.CommonKeys.CONTRACTED)
    cy.SAVE()
  })


  it("TC - Create WIP record and update WIP BoQ quantity", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WIP);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.setDefaultView(app.TabBar.WIP)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })

    _common.create_newRecord(cnt.uuid.WIP)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETER)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    _wipPage.updateQuantity_inWIPBoqStructure(CONTAINER_WIP.WIP_BOQ_QUANTITY);
    _common.waitForLoaderToDisappear()
    _wipPage.changeStatus_WipRecord();
    _common.waitForLoaderToDisappear()
    cy.SAVE()
  });


  it("TC - Create bill for Progress Invoice", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.BILLING);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.setDefaultView(app.TabBar.BILLS)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
      _common.setup_gridLayout(cnt.uuid.BILLS, CONTAINER_COLUMNS_BILLS)
    });
    _common.create_newRecord(cnt.uuid.BILLS);
    _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETERS)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs)
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.edit_containerCell(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BILL.BILL_BOQ_QTY)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
    });
    _common.maximizeContainer(cnt.uuid.BILLS)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.BILLS, "Contract Sales(1)")
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
  });
  _common.maximizeContainer(cnt.uuid.CONTRACTS)
    _common.clickOn_goToButton_toSelectModule(cnt.uuid.CONTRACTS, "WIP")
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
  })

  it("TC - Verify previous quantity for WIP2 should be equal to installed quantity of WIP1", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP, 0);
    }); 
    _common.create_newRecord(cnt.uuid.WIP)
    _common.waitForLoaderToDisappear()
    _wipPage.enterRecord_toCreateNewWIP(WIP_PARAMETER_2)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    })
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    //_wipPage.changeStatus_WipRecord();
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.PREV_QUANTITY_SMALL, CONTAINER_WIP.WIP_BOQ_QUANTITY)
    _common.edit_containerCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_BILL.BILL_BOQ_QTY)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Verify Total Quantity in WIP2 = Previous Quantity + current Installed Quantity and Final Price of WIP2 BoQ= Current installed Qty*Unit Rate", function () {
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.PREV_QUANTITY_SMALL).then(($PREVIOUS_QUANTITY) => {
      Cypress.env("PREVIOUS_QUANTITY", parseFloat($PREVIOUS_QUANTITY.text()))
    })
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP,  app.GridCells.PRICE_SMALL).then(($UNIT_RATE) => {
      Cypress.env("UNIT_RATE", parseFloat($UNIT_RATE.text()))
    })
    cy.wait(500).then(() => {
      let totalQuantity = parseFloat(CONTAINERS_BILL.BILL_BOQ_QTY) + Cypress.env("PREVIOUS_QUANTITY")
      let finalPrice = parseFloat(CONTAINERS_BILL.BILL_BOQ_QTY) * Cypress.env("UNIT_RATE")
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TOTAL_QUANTITY, totalQuantity.toString())
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.FINAL_PRICE_SMALL, finalPrice.toString())
    })
  });

  it("TC - Verify Quantity in the Bill2 BoQ Structure should be automatically come from WIP2 Quantity", function () {
    _wipPage.changeStatus_WipRecord();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,  sidebar.SideBarOptions.CREATE_BILL);
    _billPage.create_bill_fromWizard(BILL_PARAMETERS_2)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_BILL)
    _common.waitForLoaderToDisappear()
    _common.setDefaultView(app.TabBar.BILLS)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BOQs)
    _common.edit_dropdownCellWithCaret(cnt.uuid.BILLS, app.GridCells.BILLING_SCHEMA_FK, "list", CONTAINER_BILLING_SCHEMA.STANDARD_SINGEL)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs)
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.getText_fromCell(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.FINAL_PRICE_SMALL).then(($Bill_2_BoQfinalPrice) => {
      Cypress.env("Bill_2_BoQfinalPrice", $Bill_2_BoQfinalPrice.text())
    })    
    _common.assert_forNumericValues(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, CONTAINER_WIP.WIP_BOQ_QUANTITY)
  });

  it("TC - Verify billing Schema Net Total should be equal to 'Final Price' in the Bill2 BoQ Item", function () {
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILL_BILLING_SCHEMA, app.FooterTab.BILLING_SCHEMA)
      _common.setup_gridLayout(cnt.uuid.BILL_BILLING_SCHEMA, CONTAINER_COLUMNS_BILLING_SCHEMA)
    });
    cy.wait(1000)
    _common.maximizeContainer(cnt.uuid.BILL_BILLING_SCHEMA)
    _common.clickOn_toolbarButton(cnt.uuid.BILL_BILLING_SCHEMA, btn.ToolBar.ICO_RECALCULATE)
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.BILL_BILLING_SCHEMA)

      _common.assert_cellData_insideActiveRow(cnt.uuid.BILL_BILLING_SCHEMA, app.GridCells.RESULT, Cypress.env("Bill_2_BoQfinalPrice"))
  })
  after(() => {
    cy.LOGOUT();
  });
});


