import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate } from "cypress/pages";
import { app, tile, cnt, commonLocators } from "cypress/locators";
const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-TEST-" + Cypress._.random(0, 999);
const BILL_DESC = "BILL-TEST" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
allure.epic("SALES");
allure.feature("Sales - Contract");
allure.story("SAM- 3.7 | Create Single Invoice without Contract");
describe("SAM- 3.7 | Create Single Invoice without Contract", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-3.7-create-single-invoice-without-contract.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("sam/sam-3.7-create-single-invoice-without-contract.json").then((data) => {
      this.data = data;
      const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.tabBar.project).then(() => {
          _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
          _common.clear_subContainerFilter(cnt.uuid.Projects)
      });
      _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem();
      _common.create_newRecord(cnt.uuid.Projects);
      _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
      cy.SAVE();
      _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
      _common.search_fromSidebar(STANDARD_INPUTS.searchType, PRJ_NO).pinnedItem();
 
    });
  });
  it("TC - Precondition : Select Single Invoice And Uncheck Checkbox for Is Progress", function () {
    const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
    const DATATYPE_Column = this.data.DataTypes.Column_Headers;
    const DATA_RECORD_INPUTS = this.data.DataRecords.DataRecordsInput;
    _common.openSidebarOption(STANDARD_INPUTS.Quickstart);
    _common.search_fromSidebar(STANDARD_INPUTS.quickstart, STANDARD_INPUTS.Customizing)
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.openTab(app.tabBar.MasterData).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Data_Types, app.FooterTab.DATA_TYPES)
        _common.setup_gridLayout(cnt.uuid.Data_Types, DATATYPE_Column)
    })
    _common.clear_subContainerFilter(cnt.uuid.Data_Types)
    _common.search_inSubContainer(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.BillType)
    _common.select_rowHasValue(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.BillType)
    _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
    _common.waitForLoaderToDisappear()
    cy.wait(1000) //required wait
    _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO,  DATA_RECORD_INPUTS.SingleInvoice);
    _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.IS_PROGRESS, STANDARD_INPUTS.Uncheck)
    _common.waitForLoaderToDisappear()
    cy.SAVE()

})
  it("TC - Create new BoQ record", function () {
    const BOQ_INPUT = this.data.BoQCreation.BoQPageInputs;
    const BOQSTRUCTURE_GRID = this.data.BoQCreation.ColumnHeaders
    const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
    _common.openSidebarOption(STANDARD_INPUTS.Quickstart);
    _common.search_fromSidebar(STANDARD_INPUTS.quickstart, STANDARD_INPUTS.Project);
    _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
      });
      _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem();
      _common.search_fromSidebar(STANDARD_INPUTS.searchType,PRJ_NO).pinnedItem();
    _common.openTab(app.tabBar.BoQs).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
    cy.SAVE();
    _boqPage.textOfBoQCode();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)
      _common.waitForLoaderToDisappear()
      cy.wait(1000)
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
     _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,BOQSTRUCTURE_GRID)
    });
    _boqPage.enterRecord_toCreateBoQStructure(BOQSTRUCT_DESC, BOQ_INPUT.quantity, BOQ_INPUT.unitRate, BOQ_INPUT.uom);
    cy.SAVE();
  });
  it("TC - Create new estimate record", function () {
    const ESTIMATE_INPUT = this.data.EstimateHeader.EstimateHeaderInputs;
    const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
    const ESTIMATE_GRID = this.data.EstimateHeader.ColumnHeaders
    _common.openSidebarOption(STANDARD_INPUTS.Quickstart);
    _common.search_fromSidebar(STANDARD_INPUTS.quickstart, STANDARD_INPUTS.Project);
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE,ESTIMATE_GRID)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(ESTIMATE_INPUT.code, ESTIMATE_INPUT.description, ESTIMATE_INPUT.rubric, ESTIMATE_INPUT.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });
  it("TC - Verify generate line item wizards option", function () {
    const SIDEBAR_INPUTS = this.data.VerifygeneratelineItem.SidebarInputs;
    const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
    });
    _common.openSidebarOption(STANDARD_INPUTS.wizard1);
    _common.search_fromSidebar(STANDARD_INPUTS.Wizard, SIDEBAR_INPUTS.GenerateLineItem);
    _boqPage.generate_LineItemBySendingInputValue();

 });
  it("TC - Verify assign resource to line item", function () {
    const RESOURCE_INPUUT = this.data.AssignResources.resourceInputs;
    const RESOURCE_GRID = this.data.AssignResources.ColumnHeaders
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
    _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
    _common.setup_gridLayout(cnt.uuid.RESOURCES,RESOURCE_GRID)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(RESOURCE_INPUUT.shortKey, RESOURCE_INPUUT.code);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($FINALPRICE) => {
        Cypress.env("COST_TOTAL", $FINALPRICE.text())
    }) 
  });

  it("TC - Create new sales bid", function () {
    const BID_INPUT = this.data.BidCreation.bidInputs;
    const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
    const SIDEBAR_INPUTS = this.data.VerifygeneratelineItem.SidebarInputs;
    const BID_GRID = this.data.BidCreation.ColumnHeaders
    const BID_BOQ_GRID = this.data.BidCreation.ColumnHeaders2

    _common.openSidebarOption(STANDARD_INPUTS.wizard1);
    _common.search_fromSidebar(STANDARD_INPUTS.Wizard, SIDEBAR_INPUTS.CreateBid);
    _bidPage.createBidRecord_byWizardOptions(BID_INPUT.MainBid, BID_DESC, BID_INPUT.businessPartner, BID_INPUT.sourceLead, "");
    
    _common.openTab(app.TabBar.BID).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    _common.setup_gridLayout(cnt.uuid.BIDS,BID_GRID)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    });

    _common.openTab(app.tabBar.bidBoQ).then(() => {
    _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID, app.FooterTab.BOQ_STRUCTURE, 2);
    _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID,BID_BOQ_GRID)
    });
    _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)

    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREBID, app.gridCells.FINALPRICE, Cypress.env("COST_TOTAL"))
   
    _bidPage.verifyBidQuantity_inBoQStructure(BID_INPUT.quantity);
     _bidPage.changeStatus_BidRecord();
     cy.SAVE()
  });

  it("TC - Create Single Invoice Without Contract", function () {
    const BILL_CREATION = this.data.billCreation.Bill_Input;
    const BID_INPUTS = this.data.BidCreation.bidInputs;
    const BILL_GRID = this.data.billCreation.Bill_columnHeaders;
    const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
    const BILL_BOQ_GRID = this.data.billCreation.BillBoQ_Column_Headers;
    const BILL_PARAMETERS: DataCells = {
      [commonLocators.CommonLabels.BILL_TYPE]: BILL_CREATION.billType,
      [commonLocators.CommonLabels.BUSINESS_PARTNER]: BID_INPUTS.businessPartner,
      [commonLocators.CommonLabels.DESCRIPTION]: BILL_DESC,
      [commonLocators.CommonLabels.BOQ_SOURCE]: BILL_CREATION.BoQSource,
      [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]: BOQ_DESC
    }
    _common.openSidebarOption(STANDARDINPUTS.Quickstart);
    _common.search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.Billing);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BILLS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
      _common.setup_gridLayout(cnt.uuid.BILLS, BILL_GRID)
    });
    _common.create_newRecord(cnt.uuid.BILLS);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)
    _billPage.enterRecord_toCreateBillRecord(BILL_PARAMETERS)
    cy.wait(1000 )
    cy.SAVE()
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
      _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
      _common.getText_fromCell(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL).then(($FINALPRICE) => {
        Cypress.env("BILL_Quantity", $FINALPRICE.text())
        cy.log( Cypress.env("BILL_Quantity"))
    })
    _common.getText_fromCell(cnt.uuid.BILLBOQSTRUCTURE,  app.GridCells.PRICE).then(($FINALPRICE) => {
        Cypress.env("BILL_UnitRate", $FINALPRICE.text())
        cy.log( Cypress.env("BILL_UnitRate"))
    })
      _common.openTab(app.TabBar.BILLS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BILLS, app.FooterTab.BILLS)
      });
      _common.getText_fromCell(cnt.uuid.BILLS, app.GridCells.AMOUNT_NET).then(($FINALPRICE) => {
        Cypress.env("BILL_Netamount", $FINALPRICE.text())
        cy.log( Cypress.env("BILL_Netamount"))
    })
   
  })
  it("TC - Verify Final Price of Bill BoQ", function () {
    const BILL_BOQ_GRID = this.data.billCreation.BillBoQ_Column_Headers;
    _common.openTab(app.TabBar.APPLICATIONS).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BILL_BOQ, app.FooterTab.BOQs,0)
        _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE, app.FooterTab.BOQ_STRUCTURE,1)
        _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE, BILL_BOQ_GRID)
      });
      _common.assert_cellData_insideActiveRow(cnt.uuid.BILL_BOQ, app.gridCells.FINALPRICE, Cypress.env("BILL_Netamount"),app.gridCells.BOQROOTITEM)
      _common.clickOn_cellHasIcon(cnt.uuid.BILLBOQSTRUCTURE, app.GridCells.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
     _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BILLBOQSTRUCTURE,Cypress.env("BILL_Quantity"),Cypress.env("BILL_UnitRate"),app.gridCells.FINALPRICE)
      _common.waitForLoaderToDisappear()
  })
 
  after(() => {
    cy.LOGOUT();
  });
});
