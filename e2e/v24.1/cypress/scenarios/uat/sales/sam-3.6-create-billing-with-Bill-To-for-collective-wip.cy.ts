import { tile, app, cnt, generic, btn } from "cypress/locators";
import { _bidPage, _billPage, _boqPage, _common, _estimatePage, _modalView, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _mainView } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ_DESC-" + Cypress._.random(0, 999);
const BID_DESC =" BID_DESC" + Cypress._.random(0,999);
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
allure.epic("SALES");
allure.feature("Sales-Bill");
allure.story("SAM- 3.6 | Create Billing with 'Bill-To' for Collective WIP");
describe("SAM- 3.6 | Create Billing with 'Bill-To' for Collective WIP", () => {
  beforeEach(function () {
    cy.fixture("sam/sam-3.6-create-billing-with-Bill-To-for-collective-wip.json").then((data) => {
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
    cy.fixture("sam/sam-3.6-create-billing-with-Bill-To-for-collective-wip.json").then((data) => {
      this.data = data;
      const STD_INPUTS = this.data.Prerequisites.SidebarInputs;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openSidebarOption(STD_INPUTS.search).delete_pinnedItem()     
    });
    /* Open desktop should be called in before block */
  });
  it("TC- Create new Project and Pinned it",function () {
    const STD_INPUTS = this.data.Prerequisites.SidebarInputs
    _common.openTab(app.tabBar.project).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.Projects,app.FooterTab.PROJECTS)
      _common.clear_subContainerFilter(cnt.uuid.Projects)
    })
    _common.create_newRecord(cnt.uuid.Projects)
    _projectPage.enterRecord_toCreateProject(PRJ_NO,PRJ_NAME,STD_INPUTS.clerk)
    cy.SAVE()
    _common.pinnedItem()
  })
  it("TC - Create Bill To record", function () {
    const BILLTOINPUTS = this.data.billTO.billToInputs
    const BILLTO_COLUMN = this.data.billTO.billToColumn
    _common.openTab(app.tabBar.project).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.Bill__To,app.FooterTab.BILL_TO)
        _common.setup_gridLayout(cnt.uuid.Bill__To,BILLTO_COLUMN)
        _common.clear_subContainerFilter(cnt.uuid.Bill__To)
    })
    _common.create_newRecord(cnt.uuid.Bill__To)
    _common.enterRecord_inNewRow(cnt.uuid.Bill__To,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,BILLTO_NO1)
    _common.enterRecord_inNewRow(cnt.uuid.Bill__To,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,BILLTO_DESC1)
    _common.edit_dropdownCellWithInput(cnt.uuid.Bill__To,app.GridCells.BUSINESS_PARTNER_FK,BILLTOINPUTS.poptype,app.InputFields.INPUT_GROUP_CONTENT,BILLTOINPUTS.bp1)
    _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Bill__To,app.gridCells.QUANTITY_PORTION)
    _common.enterRecord_inNewRow(cnt.uuid.Bill__To,app.gridCells.QUANTITY_PORTION,app.InputFields.INPUT_GROUP_CONTENT,BILLTOINPUTS.qtyPortion1)
    cy.SAVE()
    _common.create_newRecord(cnt.uuid.Bill__To)
    _common.enterRecord_inNewRow(cnt.uuid.Bill__To,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,BILLTO_NO2)
    _common.enterRecord_inNewRow(cnt.uuid.Bill__To,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,BILLTO_DESC2)
    _common.edit_dropdownCellWithInput(cnt.uuid.Bill__To,app.GridCells.BUSINESS_PARTNER_FK,BILLTOINPUTS.poptype,app.InputFields.INPUT_GROUP_CONTENT,BILLTOINPUTS.bp2)
    _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Bill__To,app.gridCells.QUANTITY_PORTION)
    _common.enterRecord_inNewRow(cnt.uuid.Bill__To,app.gridCells.QUANTITY_PORTION,app.InputFields.INPUT_GROUP_CONTENT,BILLTOINPUTS.qtyPortion2)
    cy.SAVE()
  })

  it("TC - Create new BOQ and go to BOQ", function () {    
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

  it("TC - Create new BOQ structure", function () {
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
  it("TC - Create Bid and assign BoQ to it", function () {
    const BOQ_STRUINPUTS = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const BIDINPUTS = this.data.BIDPageInputs.SidebarInputs
    const BID_COLUMN = this.data.BIDPageInputs.ColumnHeaders
    const BIDBOQ_COLUMN = this.data.BIDPageInputs.bidBoQColumn  
    const BIDBOQ_STRUCOLUMN = this.data.BIDPageInputs.bidBoQSTRUColumn 
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
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    })
    _common.create_newRecord(cnt.uuid.BIDS); 
    _common.waitForLoaderToDisappear()
    _salesPage.enterRecord_toCreateSalesBID(BID_PARAMETER)    
    cy.SAVE()   
    _common.waitForLoaderToDisappear() 
    _common.openSidebarOption(BIDINPUTS.Wizard)
    _common.search_fromSidebar(BIDINPUTS.Wizard1,BIDINPUTS.changeBIDStatus)
    _common.changeStatus_fromModal(BIDINPUTS.BIDStatus)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BIDS,app.GridCells.AMOUNT_NET,Cypress.env("Text"))
    _common.openTab(app.tabBar.bidBoQ).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.bidBoQs,app.FooterTab.BOQs)
        _common.setup_gridLayout(cnt.uuid.bidBoQs,BIDBOQ_COLUMN)
    })  
    _common.select_rowInContainer(cnt.uuid.bidBoQs)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.tabBar.bidBoQ).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREBID,app.FooterTab.BOQ_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREBID,BIDBOQ_STRUCOLUMN)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.BOQ_LINE_TYPE_FK,BIDINPUTS.boqLineType)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREBID,app.GridCells.QUANTITY_SMALL,BOQ_STRUINPUTS.quantity)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREBID, app.GridCells.PRICE,BOQ_STRUINPUTS.unitRate)
  })
  it("TC - Create Contract for first Bill TO record",function () {
    const CONTRACTINPUTS = this.data.ContractCreation.sideBarInputs;
    const CONTRACTBOQ_COLUMN = this.data.ContractCreation.contractBOQ_Column
    const CONTRACTBOQSTRU_COLUMN = this.data.ContractCreation.contractBoQStru_Column
    const BOQ_STRUINPUTS = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const BILLTOINPUTS = this.data.billTO.billToInputs
    _common.openSidebarOption(CONTRACTINPUTS.Wizard)
    _common.search_fromSidebar(CONTRACTINPUTS.Wizard1,CONTRACTINPUTS.createContract)
    _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW,CONTRACTINPUTS.description,0,app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(CONTRACT_DESC1, { force: true })
    _common.editModalDropdown_WithInput(CONTRACTINPUTS.billTo,BILLTO_NO1,CONTRACTINPUTS.poptype)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.openTab(app.tabBar.contractBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.contractSales_BoQs,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.contractSales_BoQs,CONTRACTBOQ_COLUMN)
    })  
    _common.select_rowInContainer(cnt.uuid.contractSales_BoQs)
    _common.openTab(app.tabBar.contractBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1,CONTRACTBOQSTRU_COLUMN)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.BOQ_LINE_TYPE_FK,CONTRACTINPUTS.boqLineType)
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BOQ_STRUCTURE1,BOQ_STRUINPUTS.quantity,BILLTOINPUTS.qtyPortion1,app.GridCells.QUANTITY_SMALL)

  })
  it("TC - Create Contract for second Bill TO record",function () {
    const CONTRACTINPUTS = this.data.ContractCreation.sideBarInputs;
    const CONTRACTBOQ_COLUMN = this.data.ContractCreation.contractBOQ_Column
    const CONTRACTBOQSTRU_COLUMN = this.data.ContractCreation.contractBoQStru_Column
    const BOQ_STRUINPUTS = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const BILLTOINPUTS = this.data.billTO.billToInputs
    const BID_COLUMN = this.data.BIDPageInputs.ColumnHeaders
    _common.openSidebarOption(CONTRACTINPUTS.quickstart)
    _common.search_fromSidebar(CONTRACTINPUTS.quickstart1,CONTRACTINPUTS.bid)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BID).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BIDS,app.FooterTab.BIDS)
      _common.setup_gridLayout(cnt.uuid.BIDS,BID_COLUMN)
      _common.clear_subContainerFilter(cnt.uuid.BIDS)
    })
     cy.REFRESH_CONTAINER()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BIDS,app.GridCells.DESCRIPTION_INFO,BID_DESC)
    _common.openSidebarOption(CONTRACTINPUTS.Wizard)
    _common.search_fromSidebar(CONTRACTINPUTS.Wizard1,CONTRACTINPUTS.createContract)
    _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW,CONTRACTINPUTS.description,0,app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(CONTRACT_DESC2, { force: true })
    _common.editModalDropdown_WithInput(CONTRACTINPUTS.billTo,BILLTO_NO2,CONTRACTINPUTS.poptype)
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_CONTRACT)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.openTab(app.tabBar.contractBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.contractSales_BoQs,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.contractSales_BoQs,CONTRACTBOQ_COLUMN)
    })  
    _common.select_rowInContainer(cnt.uuid.contractSales_BoQs)
    _common.openTab(app.tabBar.contractBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1,CONTRACTBOQSTRU_COLUMN)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURE1,app.GridCells.BOQ_LINE_TYPE_FK,CONTRACTINPUTS.boqLineType)
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BOQ_STRUCTURE1,BOQ_STRUINPUTS.quantity,BILLTOINPUTS.qtyPortion2,app.GridCells.QUANTITY_SMALL)   
  })
  it("TC - Create Collective Wip from contract", function () {
    const CONTRACT_COLUMN = this.data.ContractCreation.ColumnHeaders;
    const STD_INPUTS = this.data.Prerequisites.SidebarInputs;
    const WIP_INPUTS = this.data.WIPCreation.wipInputs    
    
    _common.openTab(app.TabBar.CONTRACTS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.CONTACTS,app.FooterTab.CONTRACTS)
      _common.setup_gridLayout(cnt.uuid.CONTACTS,CONTRACT_COLUMN)
    })
    _common.openSidebarOption(STD_INPUTS.search).delete_pinnedItem().search_fromSidebar(STD_INPUTS.searchType, PRJ_NO)
    cy.REFRESH_CONTAINER()
    _common.select_allContainerData(cnt.uuid.CONTACTS) 
    _common.openSidebarOption(WIP_INPUTS.Wizard)
    _common.search_fromSidebar(WIP_INPUTS.Wizard1,WIP_INPUTS.changeContractStatus)
    _common.changeStatus_ofMultipleRecord_inWizard(WIP_INPUTS.contractStatus)      
    _common.openSidebarOption(WIP_INPUTS.Wizard)
    _common.search_fromSidebar(WIP_INPUTS.Wizard1,WIP_INPUTS.createWip)
    cy.wait(500)
    _common.waitForLoaderToDisappear()
    _common.clickOnCheckbox_InModalByLabel(generic.locators.ROW1,WIP_INPUTS.collectiveWip,0)
    _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW,WIP_INPUTS.description,0,app.InputFields.DOMAIN_TYPE_TRANSLATION).clear({force:true}).type(WIP_DESC, {force:true})
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.clickOn_modalFooterButton(btn.buttonText.Go_to_WIP)    
  })
  it("TC - Verify remaining Quantity in WIP", function () {
    const WIP_INPUTS = this.data.WIPCreation.wipInputs
    const WIP_COLUMN = this.data.WIPCreation.WIP_Column
    const WIP_BOQCOLUMN = this.data.WIPCreation.WIPBOQ_Column
    const WIP_BOQSTRUCOLUMN = this.data.WIPCreation.WIPBoQStru_Column
    const BOQ_STRUINPUTS = this.data.CreateNewBoQStructure.BoQStructureInputs;
    _common.openTab(app.TabBar.WIP).then(()=>{
      _common.setDefaultView(app.TabBar.WIP)
      _common.select_tabFromFooter(cnt.uuid.WIP,app.FooterTab.WIP)
      _common.setup_gridLayout(cnt.uuid.WIP,WIP_COLUMN)
    })
    _common.select_rowInContainer(cnt.uuid.WIP)
    _common.openTab(app.TabBar.WIPBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.wipBoQ,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.wipBoQ,WIP_BOQCOLUMN)
    })
    _common.select_rowInContainer(cnt.uuid.wipBoQ)
    _common.openTab(app.TabBar.WIPBOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTUREWIP,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTUREWIP,WIP_BOQSTRUCOLUMN)
    })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.BOQ_LINE_TYPE_FK,WIP_INPUTS.boqLineType)
    _common.app.GridCells.BAS_UOM_FK(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL)
    _common.enterRecord_inNewRow(cnt.uuid.BOQ_STRUCTUREWIP,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,WIP_INPUTS.installQty)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _validate.verify_isRecordSubstractTwoValues(cnt.uuid.BOQ_STRUCTUREWIP,BOQ_STRUINPUTS.quantity,WIP_INPUTS.installQty,app.gridCells.PESBOQSTRUCTUREREMQUANTITY)
    _common.openSidebarOption(WIP_INPUTS.Wizard)
    _common.search_fromSidebar(WIP_INPUTS.Wizard1,WIP_INPUTS.changeWIPStatus)
    _common.changeStatus_fromModal(WIP_INPUTS.wipStatus)
  })
  it("TC - Create Bill from first Bill To record",function () {
    const BILL_INPUTS = this.data.billCreation.billInputs
    const WIP_INPUTS = this.data.WIPCreation.wipInputs
    const BILLTOINPUTS = this.data.billTO.billToInputs
    const BILLBOQ_COLUMN = this.data.billCreation.billBOQColumn
    const BILLBOQSTRU_COLUMN = this.data.billCreation.billBOQSTRU_Column
    _common.openSidebarOption(BILL_INPUTS.Wizard)
    _common.search_fromSidebar(BILL_INPUTS.Wizard1,BILL_INPUTS.createBill)
    _common.waitForLoaderToDisappear()
    _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW,BILL_INPUTS.description,0,app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(BILL_DESC1, { force: true })
    _common.editModalDropdown_WithInput(BILL_INPUTS.billTo,BILLTO_NO1,BILL_INPUTS.poptype) 
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.buttonText.Go_to_Bill)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BILL_BOQ,BILLBOQ_COLUMN)
    })  
    _common.select_rowInContainer(cnt.uuid.BILL_BOQ)
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE,BILLBOQSTRU_COLUMN)
    })
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLBOQSTRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,BILL_INPUTS.boqLineType)
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BILLBOQSTRUCTURE,WIP_INPUTS.installQty,BILLTOINPUTS.qtyPortion1,app.GridCells.QUANTITY_SMALL)  

  })
  it("TC - Create Bill from second Bill To record",function () {
    const WIP_INPUTS = this.data.WIPCreation.wipInputs
    const BILLTOINPUTS = this.data.billTO.billToInputs
    const BILL_INPUTS = this.data.billCreation.billInputs
    const WIP_COLUMN = this.data.WIPCreation.WIP_Column
    const BILLBOQ_COLUMN = this.data.billCreation.billBOQColumn
    const BILLBOQSTRU_COLUMN = this.data.billCreation.billBOQSTRU_Column
    _common.openSidebarOption(BILL_INPUTS.quickstart)
    _common.search_fromSidebar(BILL_INPUTS.quickstart1,BILL_INPUTS.wip)
    _common.openTab(app.TabBar.WIP).then(()=>{
      _common.setDefaultView(app.TabBar.WIP)
      _common.select_tabFromFooter(cnt.uuid.WIP,app.FooterTab.WIP)
      _common.setup_gridLayout(cnt.uuid.WIP,WIP_COLUMN)
    })
    _common.select_rowInContainer(cnt.uuid.WIP)
    _common.openSidebarOption(BILL_INPUTS.Wizard)
    _common.search_fromSidebar(BILL_INPUTS.Wizard1,BILL_INPUTS.createBill)
    _common.waitForLoaderToDisappear()
    _common.findInputFieldInsideModalWithIndex(commonLocators.CommonElements.ROW,BILL_INPUTS.description,0,app.InputFields.DOMAIN_TYPE_DESCRIPTION).clear({ force: true }).type(BILL_DESC2, { force: true })
    _common.editModalDropdown_WithInput(BILL_INPUTS.billTo,BILLTO_NO2,BILL_INPUTS.poptype) 
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    _common.waitForLoaderToDisappear()
    _common.clickOn_modalFooterButton(btn.buttonText.Go_to_Bill)
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILL_BOQ,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BILL_BOQ,BILLBOQ_COLUMN)
    })  
    _common.select_rowInContainer(cnt.uuid.BILL_BOQ)
    _common.openTab(app.TabBar.APPLICATIONS).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BILLBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE)
      _common.setup_gridLayout(cnt.uuid.BILLBOQSTRUCTURE,BILLBOQSTRU_COLUMN)
    })
    _common.waitForLoaderToDisappear()
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BILLBOQSTRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,BILL_INPUTS.boqLineType)
    _validate.verify_isRecordDivisionOfTwoValues_ComapreWithThirdValue_Multiply(cnt.uuid.BILLBOQSTRUCTURE,WIP_INPUTS.installQty,BILLTOINPUTS.qtyPortion2,app.GridCells.QUANTITY_SMALL)
  })
  after(() => {
    cy.LOGOUT();
});
})