import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage,_package, _mainView, _modalView, _sidebar, _validate, _salesPage,_rfqPage} from "cypress/pages";


const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LI_DESC = "LI-DESC-" + Cypress._.random(0, 999);

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.28 | Update material prices of an estimate from analogous checked contract prices");

describe("PCM- 2.28 | Update material prices of an estimate from analogous checked contract prices", () => {
  beforeEach(function () {
    cy.fixture("pcm/pcm-2.28-update-material-prices-of-an-estimate-from-analogous-checked-contract-prices.json").then((data) => {
      this.data = data;
    });
  });
  before(function () {
    cy.fixture("pcm/pcm-2.28-update-material-prices-of-an-estimate-from-analogous-checked-contract-prices.json").then((data) => {
      this.data = data;
    });
    cy.preLoading(
      Cypress.env("adminUserName"), 
      Cypress.env("adminPassword"),      
      Cypress.env("parentCompanyName"), 
      Cypress.env("childCompanyName"));
    /* Open desktop should be called in before block */
    _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    
  }); 
  after(() => {
		cy.LOGOUT();
	});
  it("TC - Create New Estimate Record", function () {
    const standerdInputs = this.data.TC1.SidebarInputes;
    const estimateInputs = this.data.TC1.EstimatePageInputes;
    const reqColumn = this.data.TC1.EstimatePageInputes.Column_header;
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE,reqColumn)
    });
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.CreateEstimate.rubicCategory, estimateInputs.CreateEstimate.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });
  it("TC- Create new Line item record", function(){
    const LIInputs = this.data.LineItem.Inputs;
    const reqColumn = this.data.LineItem.LIColumn_header;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,reqColumn)
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
      _estimatePage.enterRecord_toCreateLineItem(LI_DESC,LIInputs.quantity,LIInputs.uom)
      cy.SAVE();
      
  });
  it("TC- Assign material resource to line item",function(){
    const resourceInput = this.data.ResourceInput.Inputs;
    const reqColumn = this.data.ResourceInput.resource_header;
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
      _common.setup_gridLayout(cnt.uuid.RESOURCES,reqColumn)
    });    
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateMaterialResource(resourceInput.shortKey,resourceInput.code,resourceInput.quantity)
    cy.SAVE();
    _common.minimizeContainer(cnt.uuid.RESOURCES)
  });
  it("TC- Verify Create/update material Package", function () {
    const packageInputs = this.data.packageInput.sidebarInputs
    const mainColumn = this.data.packageInput.Column_header
    const reqColumn = this.data.packageInput.ItemColumn_header
    _common.openSidebarOption(packageInputs.wizard);
    _common.search_fromSidebar(packageInputs.wizard1, packageInputs.searchValue);
    _package.enterRecord_toCreatePackage_wizard(packageInputs.Criteria)
     cy.wait(8000)
     _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,2)
      _common.setup_gridLayout(cnt.uuid.PACKAGE,mainColumn)
    })
     _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,2)
      _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS,reqColumn)
    })
     _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, packageInputs.value);
    _common.assert_cellData(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,packageInputs.quantity)
    _package.changeStatus_ofPackage_inWizard()
    
  });
  it('TC - Create requisition from material package', function () {
    const sideBarAction = this.data.sidebarInputs.sidebar
    const reqColumn = this.data.sidebarInputs.reqColumn_header
    _common.openSidebarOption(sideBarAction.wizard)
    _common.search_fromSidebar(sideBarAction.wizard1, sideBarAction.searchValue)
    _common.clickOn_modalFooterButton(sideBarAction.goTo)
    _common.openTab(app.tabBar.Main).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.REQUISITIONS,app.FooterTab.REQUISITION,2)
      _common.setup_gridLayout(cnt.uuid.REQUISITIONS,reqColumn)
    })
    _common.openSidebarOption(sideBarAction.wizard);
    _common.search_fromSidebar(sideBarAction.wizard1,sideBarAction.searchValue1);
    _common.changeStatus_fromModal(sideBarAction.status);
    
  });
  it('TC - Create Request For Quote from wizard and change status', function() {
    const sidebarQuote= this.data.CreateRequestForQuote.SidebarInputes    
    const Bidder= this.data.BidderInputs.Bidder
    const reqColumn = this.data.rfqColumn
    _common.openSidebarOption(sidebarQuote.Wizard)
    _common.search_fromSidebar(sidebarQuote.Wizard1,sidebarQuote.CreateRRequestForQuote);
    _rfqPage.fromWizard_CreateRequestForCode([Bidder.bidder1]);    
    _common.clickOn_modalFooterButton(sidebarQuote.gotorfq)
    cy.SAVE();
    _common.openTab(app.tabBar.RFQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.Request_for_Quote,app.FooterTab.RFQ,2)
      _common.setup_gridLayout(cnt.uuid.Request_for_Quote,reqColumn)
    })
    _common.openSidebarOption(sidebarQuote.Wizard);
    _common.search_fromSidebar(sidebarQuote.Wizard1,sidebarQuote.changeRfqStatus);
    _common.changeStatus_fromModal(sidebarQuote.status);
    cy.SAVE();  
    
  });
  it("TC - Create Quote from RfQ", function () {
    const sidebar = this.data.Quote.SidebarInputes;    
    const suplier = this.data.Quote.BusinessPartner;     
    _common.openSidebarOption(sidebar.Wizard);
    _common.search_fromSidebar(sidebar.Wizard1,sidebar.createQuote);
    _rfqPage.fromWizard_CreateQuote([suplier.BusinessPartner1]);
    _common.clickOn_modalFooterButton(sidebar.goToQuote);
    cy.SAVE();
  });
  it("TC - Quote the Prices for the suplier in Quote's items Container", function () {
    const quote = this.data.Quote.Price;
    const suplier = this.data.Quote.BusinessPartner;
    const material = this.data.ResourceInput.Inputs;
    const Column_Quotesitems=this.data.Quote.Column_QuotesLineItems.Column_QuotesItems
    const sidebarInputs = this.data.Quote.SidebarInputes

    _common.openTab(app.tabBar.QUOTES).then(() =>{
      _common.select_tabFromFooter(cnt.uuid.QUOTES_ITEMS,app.FooterTab.ITEMS,2);
      _common.setup_gridLayout(cnt.uuid.QUOTES_ITEMS,Column_Quotesitems)
      });      
     cy.wait(3000);
   _common.search_inSubContainer(cnt.uuid.Quotes, suplier.BusinessPartner1,1)
   cy.wait(2000);
   _common.search_inSubContainer(cnt.uuid.QUOTES_ITEMS, material.code,2)
  _common.enterRecord_inNewRow(cnt.uuid.QUOTES_ITEMS,  app.GridCells.PRICE, app.InputFields.INPUT_GROUP_CONTENT, quote.materialsup1);
    cy.SAVE();
    cy.wait(6000);
    _common.search_inSubContainer(cnt.uuid.QUOTES_ITEMS, material.code,2)
    _common.getTextfromCell(cnt.uuid.QUOTES_ITEMS, app.GridCells.PRICE,app.GridCells.QUANTITY_SMALL); 
    _common.openSidebarOption(sidebarInputs.Wizard);
    _common.search_fromSidebar(sidebarInputs.Wizard1,sidebarInputs.changeQuoteStatus);
    _common.changeStatus_fromModal(sidebarInputs.status);
    cy.SAVE();
   
  });

  it("TC - Verify Create Contract from Quote and change contract status", function () {
    const contractInputs = this.data.Contract.contractInputs
    const material = this.data.ResourceInput.Inputs;
    const reqColumn = this.data.Contract.Column_header;
    const Price = Cypress.env("Text");
    const Quantity = Cypress.env("gridcell_2_Text")
    _common.openSidebarOption(contractInputs.wizard);
    _common.search_fromSidebar(contractInputs.wizard1,contractInputs.createContract);
    cy.wait(1000)
    //_common.findRadio_byLabel_Modal(contractInputs.scope, "radio", 0);
    //_common.clickOn_modalFooterButton(contractInputs.button);
    cy.wait(3000)    
    _common.clickOn_modalFooterButton(contractInputs.goToContract);
    _common.openSidebarOption(contractInputs.wizard);
    _common.search_fromSidebar(contractInputs.wizard1,contractInputs.changeContractStatus);
    _common.changeStatus_fromModal(contractInputs.status);
    cy.SAVE();
    _common.openTab(app.TabBar.CONTRACT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT,reqColumn)
    });
    _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
    _common.search_inSubContainer(cnt.uuid.ITEMSCONTRACT, material.code)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT, app.GridCells.PRICE,Price)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,app.GridCells.QUANTITY_SMALL,Quantity)
  
});
it("TC- Verify Update Estimate Wizard option",function(){
  const updateEstimate = this.data.UpdateEstimate;
  const updateEstimateIndex = this.data.CreateNew
  const contractInputs = this.data.Contract.contractInputs
  const sidebar = this.data.Contract.sidebar
  _common.openSidebarOption(sidebar.wizard);
    _common.search_fromSidebar(sidebar.wizard1,sidebar.updateEstimate);
    let labelName = new Map<string, string>();
    labelName.set(updateEstimate.Key1Label,updateEstimate.Value1);
    labelName.set(updateEstimate.Key2Label,updateEstimate.Value2); 
    _estimatePage.openModalContainerByDownArrow();
    _estimatePage.fromWizard_UpdateEstimate(labelName,updateEstimateIndex);
    cy.wait(1000)
    _common.clickOn_modalFooterButton(contractInputs.button);


});
it("TC- Verify Cost/unit in Resource",function(){
  const material = this.data.ResourceInput.Inputs;
  const LIInputs = this.data.LineItem.Inputs;
  const sidebar = this.data.Contract.sidebar;
  const Price = Cypress.env("Text");
  cy.REFRESH_CONTAINER()
   _common.openSidebarOption(sidebar.quickstart)
   _common.search_fromSidebar(sidebar.quickstart1,sidebar.project)

   _common.openTab(app.TabBar.ESTIMATE).then(() => {
     _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
   });
   _common.search_inSubContainer(cnt.uuid.ESTIMATE,EST_DESC);
   _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);

   _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
   });
   _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LI_DESC)
   _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LI_DESC)
   _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
    _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
   });
   _common.search_inSubContainer(cnt.uuid.RESOURCES,material.code);
   _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,Price)

});
});