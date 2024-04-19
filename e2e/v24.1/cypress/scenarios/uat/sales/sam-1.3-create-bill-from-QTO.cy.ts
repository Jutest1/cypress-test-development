
import { tile, app, cnt, commonLocators } from "cypress/locators";
import { _bidPage, _billPage, _boqPage, _common, _estimatePage, _modalView, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _mainView } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ_DESC-" + Cypress._.random(0, 999);
const BID_DESC =" BID_DESC" + Cypress._.random(0,999);
const PRJ_NO = "PRJ_NO" + Cypress._.random(0,999);
const PRJ_NAME = "PRJ_NAME"+ Cypress._.random(0,999);

allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 1.3 | Create bill from QTO");
describe("SAM- 1.3 | Create bill from QTO", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-1.3-create-bill-from-QTO.json").then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"), 
      Cypress.env("adminPassword"),      
      Cypress.env("parentCompanyName"), 
      Cypress.env("childCompanyName")
    );
    cy.fixture("sam/sam-1.3-create-bill-from-QTO.json").then((data) => {
      this.data = data;
      const STD_INPUTS = this.data.Prerequisites.SidebarInputs;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()     
    });
    /* Open desktop should be called in before block */
  });
  it("TC- Create new Project and Pinned it",function () {
    const STD_INPUTS = this.data.Prerequisites.SidebarInputs
    _common.openTab(app.tabBar.project).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.Projects,app.FooterTab.PROJECTS)
    })
    _common.create_newRecord(cnt.uuid.Projects)
    _projectPage.enterRecord_toCreateProject(PRJ_NO,PRJ_NAME,STD_INPUTS.clerk)
    cy.SAVE()
    _common.pinnedItem()
  })

  it("TC- Create new BOQ and go to BOQ", function () {    
    const BOQ_COLUMN = this.data.CreateNewBoq.ColumnHeaders
    _common.openTab(app.tabBar.BoQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQS,BOQ_COLUMN)
    })
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);  
    _boqPage.enterRecord_toCreateBoQ(BOQ_DESC);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS);
  });

  it("TC- Create new BOQ structure", function () {
    const BOQ_STRUINPUTS = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const BOQ_STRU_COLUMN = this.data.CreateNewBoQStructure.ColumnHeaders
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES,BOQ_STRU_COLUMN)
    })
    
    _boqPage.enterRecord_toCreateBoQStructure(BOQ_STRUINPUTS.description, BOQ_STRUINPUTS.quantity, BOQ_STRUINPUTS.unitRate, BOQ_STRUINPUTS.uom);
    cy.SAVE();
    _common.getTextfromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL)
  });
  it("TC- Create Bid and assign BoQ to it", function () {
    const BIDINPUTS = this.data.BIDPageInputs.SidebarInputs
    const BID_COLUMN = this.data.BIDPageInputs.ColumnHeaders    
    const BID_PARAMETER:DataCells={
      [app.InputFields.DOMAIN_TYPE_DESCRIPTION]:BID_DESC,
      [app.InputFields.INPUT_GROUP_CONTENT]:BIDINPUTS.businessPartner,
      [app.GridCells.BOQ_ROOT_ITEM_BRIEF_INFO]:BOQ_DESC
    }
    _common.openSidebarOption(BIDINPUTS.quickstart)
    _common.search_fromSidebar(BIDINPUTS.quickstart1,BIDINPUTS.module)
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.BID).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
      _common.setup_gridLayout(cnt.uuid.BIDS,BID_COLUMN)
    })
    _common.create_newRecord(cnt.uuid.BIDS); 
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER)    
    cy.SAVE()    
    _common.openSidebarOption(BIDINPUTS.Wizard)
    _common.search_fromSidebar(BIDINPUTS.Wizard1,BIDINPUTS.changeBIDStatus)
    _common.changeStatus_fromModal(BIDINPUTS.BIDStatus)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,Cypress.env("Text"))
      
  })
  it("TC- Create contract from wizard", function () {
    const SIDEBARINPUTS = this.data.ContractCreation.sideBarInputs;
    const CONTRACT_INPUTS = this.data.ContractCreation.contractInput;
    const CONTRACT_COLUMN = this.data.ContractCreation.ColumnHeaders
    _common.openSidebarOption(SIDEBARINPUTS.Wizard).search_fromSidebar(SIDEBARINPUTS.Wizard1, SIDEBARINPUTS.createContract);
    _common.waitForLoaderToDisappear()
    _saleContractPage.create_ContractFromWizardinBID(CONTRACT_INPUTS.contractDesc);
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTACTS,app.FooterTab.CONTRACTS)
      _common.setup_gridLayout(cnt.uuid.CONTACTS,CONTRACT_COLUMN)
    })
    cy.SAVE()
    _saleContractPage.changeStatus_ContractRecord();
      
  });
  it("TC- Create QTO", function () {       
    const QTO_INPUTS = this.data.QTOPage.QTOInputs;
    const CONTRACT_INPUTS = this.data.ContractCreation.contractInput;
    const SIDEBARINPUTS = this.data.QTOPage.sideBarInputs
    const QTOHEADER_COLUMN =this.data.QTOPage.columnHeader
    cy.REFRESH_CONTAINER()    
    _common.openSidebarOption(SIDEBARINPUTS.quickstart).search_fromSidebar(SIDEBARINPUTS.quickstart1, SIDEBARINPUTS.qto);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.tabBar.QtoHeader).then(()=>{
    _common.select_tabFromFooter(cnt.uuid.Quantity_Takeoff_Header,app.FooterTab.QUANTITYTAKEOFFHEADER)
    _common.setup_gridLayout(cnt.uuid.Quantity_Takeoff_Header,QTOHEADER_COLUMN)
    })    
    _common.create_newRecord(cnt.uuid.Quantity_Takeoff_Header);    
    _salesPage.enter_dataToCreate_QTOHeader(QTO_INPUTS.item, QTO_INPUTS.description, CONTRACT_INPUTS.contractDesc, BOQ_DESC);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
  });

  it("TC- Create quantity takeoff and verify result", function () {    
    const BOQ_STR_INPUTS = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const BILL_OF_QUANTITY_COLUMN = this.data.ColumnHeader.billOfQty_Column
    const QUANTITY_TAKEOFF_COLUMN = this.data.ColumnHeader.QuantityTakeoff_Column     
    _common.openTab(app.tabBar.detail).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,app.FooterTab.BILL_OF_QUANTITY,0);
     _common.setup_gridLayout(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,BILL_OF_QUANTITY_COLUMN)
    })
    _common.waitForLoaderToDisappear()
    _common.select_rowInContainer(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
    _common.expandAll(cnt.uuid.BILL_OF_QUANTITY_LOOKUP)
    _common.clickOn_cellHasIcon(cnt.uuid.BILL_OF_QUANTITY_LOOKUP,app.GridCells.TREE,app.GridCellIcons.ICO_BOQ_ITEM)
    _common.openTab(app.tabBar.detail).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.QUANTITY_TAKEOFF_DETAIL,app.FooterTab.QUANTITY_TAKEOFF,1);
      _common.setup_gridLayout(cnt.uuid.QUANTITY_TAKEOFF_DETAIL,QUANTITY_TAKEOFF_COLUMN)
    })
    _common.create_newRecord(cnt.uuid.QUANTITY_TAKEOFF_DETAIL)
    _common.enterRecord_inNewRow(cnt.uuid.QUANTITY_TAKEOFF_DETAIL,app.GridCells.VALUE_1_DETAIL,app.InputFields.DOMAIN_TYPE_REMARK,BOQ_STR_INPUTS.quantity1)
    cy.SAVE()   
    _common.waitForLoaderToDisappear() 
  });
  it("TC- Create bill from QTO", function () {
    const SIDEBARINPUTS = this.data.billPage.sideBarInputs;
    const BILL_INPUTS = this.data.billPage.billPageInputs;
    _common.openSidebarOption(SIDEBARINPUTS.wizard).search_fromSidebar(SIDEBARINPUTS.Wizard1, SIDEBARINPUTS.createBillOption);
    _billPage.create_BillFromWizard_throughQTO(BILL_INPUTS.category, BILL_INPUTS.billDescription, BILL_INPUTS.contractType, BILL_INPUTS.performDate, BILL_INPUTS.performTo);
    _common.waitForLoaderToDisappear()
  });
  it("TC- Verify quantity and Final price ",function (){
    const BILLBOQSTRU_COLUMN = this.data.billPage.ColumnHeaders
    const BOQ_STR_INPUTS = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const BOQ_COLUMN = this.data.ColumnHeader.BillBOQ_COlUMN
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ,app.FooterTab.BOQS,0);
      _common.setup_gridLayout(cnt.uuid.BILL_BOQ,BOQ_COLUMN)
    })
    _common.select_rowInContainer(cnt.uuid.BILL_BOQ)
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE,1);
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE,BILLBOQSTRU_COLUMN)
    })
    _validate.set_ColumnAtTop([BILLBOQSTRU_COLUMN.boqlinetypefk],cnt.uuid.BILLBOQSTRUCTURE)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLBOQSTRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,BOQ_STR_INPUTS.boqLineType)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BILLBOQSTRUCTURE,app.GridCells.QUANTITY_SMALL,BOQ_STR_INPUTS.quantity1)
    _validate.verify_isRecordMultiplyTwoValuesInRow(cnt.uuid.BILLBOQSTRUCTURE,BOQ_STR_INPUTS.quantity1,BOQ_STR_INPUTS.unitRate,app.gridCells.FINALPRICE)
  })

  after(() => {
    cy.LOGOUT();
});
});
