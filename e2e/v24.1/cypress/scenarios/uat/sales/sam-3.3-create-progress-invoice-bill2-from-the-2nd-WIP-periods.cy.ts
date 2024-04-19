import { tile, app, cnt, generic, btn } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import { isNull } from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface();

const BOQ_HEADER_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
const BILL_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const BILL2_DESC = "BILL-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);
const WIP1_DESC = "WIP1-DESC-" + Cypress._.random(0, 999);
const WIP2_DESC = "WIP2-DESC-" + Cypress._.random(0, 999);
const CONTRACT_DESC = "CONTRACT-DESC-" + Cypress._.random(0, 999);
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);

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
      const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0)
      })
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.Projects)
      _common.create_newRecord(cnt.uuid.Projects);
      _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem();
      _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
    });
    _common.select_rowInContainer(cnt.uuid.Projects)
  });

  it("TC - Prerequisite - Create Billing Schema record", function () {
    const BILLINGSCHEMA = this.data.billing_schema
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;

    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.billingSchema)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.tabBar.Billing_Schema).then(() => {
      _common.select_tabFromFooter(cnt.uuid.Billing_Schema, app.FooterTab.BILLINGSCHEMA)
    })
    _common.openTab(app.tabBar.Billing_Schema).then(() => {
      _common.select_tabFromFooter(cnt.uuid.Billing_Schema, app.FooterTab.BILLINGSCHEMA, 0);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.Billing_Schema, app.GridCells.DESCRIPTION_INFO, BILLINGSCHEMA.standardSingel)
    _common.select_allContainerData(cnt.uuid.Billing_Schema_Details)
    _common.collapseAll(cnt.uuid.Billing_Schema_Details)
    _common.clickOn_cellHasIcon(cnt.uuid.Billing_Schema_Details, app.GridCells.TREE, app.GridCellIcons.SALES_INVOICE_ICON)
    _common.expandAll(cnt.uuid.Billing_Schema_Details)
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.Billing_Schema_Details, app.GridCells.DESCRIPTION_INFO, BILLINGSCHEMA.description)
    cy.wait(2000) //required wait
    _common.addRecordInSubContainerIfnotExist(cnt.SubcontainerId.Billing_Schema_Details, 1)
    cy.SAVE()
    _common.waitForLoaderToDisappear()

  })


  it("TC - Create new BoQ header", function () {
    const BOQ_HEADER_GRID = this.data.BoQHeader.Column_Headers
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;

    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.project)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.tabBar.BoQs).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
      _common.setup_gridLayout(cnt.uuid.BOQS, BOQ_HEADER_GRID)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(BOQ_HEADER_DESC)
    _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO, BOQ_HEADER_DESC, BOQ_ROOT_ITEM)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _boqPage.textOfBoQCode(app.GridCells.BRIEF_INFO);
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
  });

  it("TC - Create BoQ Structure", function () {

    const BOQSTRUCTUREGRID = this.data.BoqStructure.Column_Headers;
    const BOQSTRUCTUREINPUTS = this.data.BoqStructure.BoQStructureInputs
    const DataCells: DataCells = {
      [app.GridCells.BRIEF_INFO]: BOQSTRUCT_DESC,
      [app.GridCells.QUANTITY_SMALL]: BOQSTRUCTUREINPUTS.Quantity,
      [ app.GridCells.PRICE]: BOQSTRUCTUREINPUTS.UnitRate,
      [app.GridCells.BAS_UOM_FK]: BOQSTRUCTUREINPUTS.Uom
    };
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, BOQSTRUCTUREGRID)
    });
    _boqPage.enterRecord_toCreateBoQStructure_V1(cnt.uuid.BOQ_STRUCTURES, DataCells);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });


  it("TC - Create new sales bid", function () {
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    const BIDCREATION = this.data.BidCreation.bidInputs;
    const BID_PARAMETER: DataCells = {
      [app.InputFields.DOMAIN_TYPE_DESCRIPTION]: BID_DESC,
      [app.InputFields.INPUT_GROUP_CONTENT]: BIDCREATION.businessPartner,
      [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
    };
    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.bid);
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
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;

    _common.openSidebarOption(STANDARDINPUTS.wizard)
    _common.search_fromSidebar(STANDARDINPUTS.wizard1, STANDARDINPUTS.createContract);
    _common.waitForLoaderToDisappear()
    _saleContractPage.create_ContractFromWizardinBID(CONTRACT_DESC)
    _saleContractPage.changeStatus_ContractRecord()
    cy.SAVE()
  })


  it("TC - Create WIP record and update WIP BoQ quantity", function () {
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    const WIP_CREATION = this.data.WipCreation.WIP_Inputs;
    const WIP_BOQ_GRID = this.data.WipCreation.Column_Headers;

    const DataCells: DataCells = {
      [commonLocators.CommonLabels.DESCRIPTION]: WIP1_DESC,
      [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
      [commonLocators.CommonLabels.BOQ_SOURCE]: WIP_CREATION.BoQSource,
      [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
    }
    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.wip);
    _common.waitForLoaderToDisappear()
    cy.wait(4000)
    _common.create_newRecord(cnt.uuid.WIP)
    _common.waitForLoaderToDisappear()
    _wipPage.enterRecord_toCreateNewWIP(DataCells)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, WIP_BOQ_GRID)
    })
    _wipPage.updateQuantity_inWIPBoqStructure(WIP_CREATION.WIPBoQ_Quantity);
    _common.waitForLoaderToDisappear()
    _wipPage.changeStatus_WipRecord();
    _common.waitForLoaderToDisappear()
    cy.SAVE()
  });


  it("TC - Create bill for Progress Invoice", function () {
    const BILL_CREATION = this.data.billCreation.Bill_Input;
    const BILL_GRID = this.data.billCreation.Bill_columnHeaders;

    const BILL_BOQ_GRID = this.data.billCreation.BillBoQ_Column_Headers;
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;

    const DataCells: DataCells = {
      [commonLocators.CommonLabels.BILL_TYPE]: BILL_CREATION.billType,
      [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
      [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC,
      [commonLocators.CommonLabels.BOQ_SOURCE]: BILL_CREATION.BoQSource,
      [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
    }
    _common.openSidebarOption(STANDARDINPUTS.QuickStart)
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.billing);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
      _common.setup_gridLayout(cnt.uuid.BILLS, BILL_GRID)
    });
    _common.create_newRecord(cnt.uuid.BILLS);
    _billPage.enterRecord_toCreateBillRecord(DataCells)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs)
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, BILL_BOQ_GRID)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.editContainerCellwithDynamicInputField(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, BILL_CREATION.billBoQQuantity)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLS)
    _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.BILLS, "Contract Sales(1)")
    _common.waitForLoaderToDisappear()
    _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.BILLS, "WIP")
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
  })

  it("TC - Verify previous quantity for WIP2 should be equal to installed quantity of WIP1", function () {

    const WIP_CREATION = this.data.WipCreation.WIP_Inputs;
    const WIP_BOQ_GRID = this.data.WipCreation.Column_Headers;
    const BILL_CREATION = this.data.billCreation.Bill_Input;

    const DataCells: DataCells = {
      [commonLocators.CommonLabels.DESCRIPTION]: WIP2_DESC,
      [commonLocators.CommonLabels.CONTRACT]: CONTRACT_DESC,
      [commonLocators.CommonLabels.BOQ_SOURCE]: WIP_CREATION.BoQSource,
      [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_HEADER_DESC
    }
    _common.waitForLoaderToDisappear()
    cy.wait(4000)
    _common.create_newRecord(cnt.uuid.WIP)
    _common.waitForLoaderToDisappear()
    _wipPage.enterRecord_toCreateNewWIP(DataCells)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP, WIP_BOQ_GRID)
    })
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    //_wipPage.changeStatus_WipRecord();
    _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.gridCells.PREVIOUS_SM_QUANTITY, WIP_CREATION.WIPBoQ_Quantity)
    _common.editContainerCellwithDynamicInputField(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, BILL_CREATION.billBoQQuantity)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.wait(2000)
  });

  it("TC - Verify Total Quantity in WIP2 = Previous Quantity + current Installed Quantity and Final Price of WIP2 BoQ= Current installed Qty*Unit Rate", function () {
    const BILL_CREATION = this.data.billCreation.Bill_Input;

    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP, app.gridCells.PREVIOUS_SM_QUANTITY).then(($PREVIOUS_QUANTITY) => {
      Cypress.env("PREVIOUS_QUANTITY", parseFloat($PREVIOUS_QUANTITY.text()))
    })
    _common.getText_fromCell(cnt.uuid.BOQ_STRUCTUREWIP,  app.GridCells.PRICE).then(($UNIT_RATE) => {
      Cypress.env("UNIT_RATE", parseFloat($UNIT_RATE.text()))
    })
    cy.wait(500).then(() => {
      let totalQuantity = parseFloat(BILL_CREATION.billBoQQuantity) + Cypress.env("PREVIOUS_QUANTITY")
      let finalPrice = parseFloat(BILL_CREATION.billBoQQuantity) * Cypress.env("UNIT_RATE")
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.gridCells.PES_TOTAL_QUANTITY, totalQuantity.toString())
      _common.assert_forNumericValues(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.FINAL_PRICE_SMALL, finalPrice.toString())
    })
  });

  it("TC - Verify Quantity in the Bill2 BoQ Structure should be automatically come from WIP2 Quantity", function () {
    const BILL_CREATION = this.data.billCreation.Bill_Input;
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    const WIP_CREATION = this.data.WipCreation.WIP_Inputs;
    const BILLINGSCHEMA = this.data.billing_schema

    const WIP_PARAMETER: DataCells = {
      [commonLocators.CommonLabels.BILL_TYPE]: BILL_CREATION.billType,
      [commonLocators.CommonLabels.DESCRIPTION]: BILL2_DESC,
      [app.GridCells.DESCRIPTION_INFO]: [WIP2_DESC],
      [commonLocators.CommonKeys.VALUE]: [BILL_CREATION.checkBoxStatus]
    }
    _wipPage.changeStatus_WipRecord();
    _common.openSidebarOption(STANDARDINPUTS.wizard)
    _common.search_fromSidebar(STANDARDINPUTS.wizard1, STANDARDINPUTS.createBill);
    _billPage.create_bill_fromWizard(WIP_PARAMETER)
    _common.clickOn_modalFooterButton(btn.buttonText.Go_to_Bill)
    _common.waitForLoaderToDisappear()
    _common.setDefaultView(app.TabBar.BILLS)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BOQs)
    _common.edit_dropdownCellWithCaret(cnt.uuid.BILLS, app.GridCells.BILLING_SCHEMA_FK, "list", BILLINGSCHEMA.standardSingel)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs)
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
    _common.getText_fromCell(cnt.uuid.BILLBOQSTRUCTURE, app.gridCells.FINALPRICE).then(($Bill_2_BoQfinalPrice) => {
      Cypress.env("Bill_2_BoQfinalPrice", $Bill_2_BoQfinalPrice.text())
    })    
    _common.assert_forNumericValues(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, WIP_CREATION.WIPBoQ_Quantity)
  });

  it("TC - Verify billing Schema Net Total should be equal to 'Final Price' in the Bill2 BoQ Item", function () {
    const BILLINGSCHEMA_GRID = this.data.billing_schema.billingSchema_Column_Headers;

    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.Bill_Billing_Schema, app.FooterTab.BILLING_SCHEMA)
      _common.setup_gridLayout(cnt.uuid.Bill_Billing_Schema, BILLINGSCHEMA_GRID)
    });
    _common.clickToolbarButton(cnt.uuid.Bill_Billing_Schema, btn.ToolBar.ICO_RECALCULATE)
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.Bill_Billing_Schema)
    cy.wait(500).then(()=>{
      _common.assert_cellData_insideActiveRow(cnt.uuid.Bill_Billing_Schema, app.gridCells.BILLING_SCHEMA_RESULT, Cypress.env("Bill_2_BoQfinalPrice"))
    })
  })
});


