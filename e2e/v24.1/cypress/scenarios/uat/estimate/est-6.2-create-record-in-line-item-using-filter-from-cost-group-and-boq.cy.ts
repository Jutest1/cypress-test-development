import { tile, app, cnt, commonLocators } from "cypress/locators";
import { _bidPage, _billPage, _boqPage, _common, _estimatePage, _modalView, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _mainView } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";

const allure = Cypress.Allure.reporter.getInterface();
const BOQ_DESC = "BOQ_DESC-" + Cypress._.random(0, 999);
const BOQSTRU_DESC = "BOQSTRU_DESC-" + Cypress._.random(0, 999);
const EST_CODE = "EST_CODE-" + Cypress._.random(0, 999);
const EST_DESC = "EST_DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 6.2 | Create a record manually in the line item using filter from cost group and BOQ container");
describe("EST- 6.2 | Create a record manually in the line item using filter from cost group and BOQ container", () => {
  beforeEach(function () {
    cy.fixture("estimate/est-6.2-create-record-in-line-item-using-filter-from-cost-group-and-boq.json").then((data) => {
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
    cy.fixture("estimate/est-6.2-create-record-in-line-item-using-filter-from-cost-group-and-boq.json").then((data) => {
      this.data = data;
      const STD_INPUTS = this.data.Prerequisites.SidebarInputs;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openSidebarOption(STD_INPUTS.search).delete_pinnedItem() 
      _common.search_fromSidebar(STD_INPUTS.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem()   
    });
    /* Open desktop should be called in before block */
  }); 
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
    _boqPage.enterRecord_toCreateBoQStructure(BOQSTRU_DESC, BOQ_STRUINPUTS.quantity, BOQ_STRUINPUTS.unitRate, BOQ_STRUINPUTS.uom);
    cy.SAVE();
    _common.getTextfromCell(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL)
  });
  it("TC - Create Estimate", function (){
    const EST_COLUMN = this.data.columns.column_headers
    const EST_INPUTS = this.data.EstimatePageInputes.CreateEstimate
    _common.openSidebarOption(EST_INPUTS.quickStart);
    _common.search_fromSidebar(EST_INPUTS.quickStart1, EST_INPUTS.moduleName);

    _common.openTab(app.TabBar.ESTIMATE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE,app.FooterTab.ESTIMATE,2)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, EST_COLUMN)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE,EST_DESC,EST_INPUTS.rubicCategory,EST_INPUTS.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);   

  })
  it("TC- Create Line item using BoQ filter",function () {
    const BOQ_STRUINPUTS = this.data.CreateNewBoQStructure.BoQStructureInputs;
    const ESTBOQ_INPUTS = this.data.estBOQ_Inputs.BoQInputs;
    const LI_COLUMN = this.data.lineItem_ColumnHeaders.column_headers;
    const ESTBOQ_COLUMN = this.data.estBOQ_Inputs.Column_Header;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.BoQ_EstimateByBoQ,app.FooterTab.BOQs,2)           
        _common.setup_gridLayout(cnt.uuid.BoQ_EstimateByBoQ, ESTBOQ_COLUMN)
    }); 
    _common.maximizeContainer(cnt.uuid.BoQ_EstimateByBoQ)  
    _common.search_inSubContainer(cnt.uuid.BoQ_EstimateByBoQ,BOQSTRU_DESC)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.BoQ_EstimateByBoQ,app.GridCells.BRIEF_INFO,BOQSTRU_DESC)
    _common.select_Or_Deselect_Radio_InContainer(ESTBOQ_INPUTS.radioOption1,cnt.uuid.BoQ_EstimateByBoQ,app.GridCells.MARKER)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.BoQ_EstimateByBoQ)
    _common.openTab(app.TabBar.ESTIMATELineItem).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS,app.FooterTab.LINE_ITEMS,1)
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LI_COLUMN)
    })
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.SAVE()
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQSTRU_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TOTAL,BOQ_STRUINPUTS.quantity)
    _common.select_Or_Deselect_Radio_InContainer(ESTBOQ_INPUTS.radioOption2,cnt.uuid.BoQ_EstimateByBoQ,app.GridCells.MARKER)
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
  })
  it("TC- Create Line item using Cost group filter", function () {
    const LI_COLUMN = this.data.lineItem_ColumnHeaders.column_headers;
    const COSTGROUP_COLUMN = this.data.estCostGroup_Inputs.Column_Header;
    const COSTGROUP_INPUTS = this.data.estCostGroup_Inputs.costGroupInputs
    _common.openTab(app.TabBar.ESTIMATELineItem).then(()=>{
        _common.setDefaultView(app.TabBar.ESTIMATELineItem)
        _common.select_tabFromFooter(cnt.uuid.Estimate_CostGroup,app.FooterTab.COSTGROUP,2)        
        _common.setup_gridLayout(cnt.uuid.Estimate_CostGroup, COSTGROUP_COLUMN)
    });
    _common.maximizeContainer(cnt.uuid.Estimate_CostGroup)
    cy.REFRESH_CONTAINER()
    _estimatePage.selectdata_inflexbox(cnt.uuid.Estimate_CostGroup,COSTGROUP_INPUTS.costGroupType);
    _common.search_inSubContainer(cnt.uuid.Estimate_CostGroup,COSTGROUP_INPUTS.costGroup)
    _common.clickOn_cellHasUniqueValue(cnt.uuid.Estimate_CostGroup,app.GridCells.DESCRIPTION_INFO,COSTGROUP_INPUTS.costGroup)
    _common.select_Or_Deselect_Radio_InContainer(COSTGROUP_INPUTS.radioOption1,cnt.uuid.Estimate_CostGroup,app.GridCells.MARKER)
    cy.SAVE()
    _common.minimizeContainer(cnt.uuid.Estimate_CostGroup)
    _common.openTab(app.TabBar.ESTIMATELineItem).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS,app.FooterTab.LINE_ITEMS,1)
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LI_COLUMN)
    })
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    cy.SAVE()
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,COSTGROUP_INPUTS.costGroup)
  })
  after(() => {
		cy.LOGOUT();
	});
})