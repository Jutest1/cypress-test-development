import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView } from "cypress/pages";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
const allure = Cypress.Allure.reporter.getInterface();

const BOQ_HEADER_DESC = "BOQ_HEADER_DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTRUCT_DESC-"+ Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID-DESC-" + Cypress._.random(0, 999);


let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;


let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_PARAMETERS:DataCells

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETER:DataCells;
let CONTAINERS_RESOURCES;
let RESOURCE_PARAMETER:DataCells;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINER_COLUMNS_RESOURCES;
let CONTAINER_COLUMNS_BID;
let CONTAINER_COLUMNS_BID_BOQ_STRUCTURE;
let CONTAINER_BID;

allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 2.2 | Update BOQ in terms of unit rate in BID module");

describe("SAM- 2.2 | Update BOQ in terms of unit rate in BID module", () => {
  

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));

    cy.fixture("sam/sam-2.2-update-BOQ-in-terms-of-unit-rate-in-BID-module.json").then((data) => {
      this.data = data
      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
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
      CONTAINER_COLUMNS_BID_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BID_BOQ_STRUCTURE
      CONTAINER_COLUMNS_BID = this.data.CONTAINER_COLUMNS.BID      
      CONTAINER_BID = this.data.CONTAINERS.BID  
      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_ESTIMATE= this.data.CONTAINERS.ESTIMATE
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINER_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINER_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINER_COLUMNS_LINE_ITEMS=this.data.CONTAINER_COLUMNS.LINE_ITEMS
      LINE_ITEMS_PARAMETER = {
        [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_HEADER_DESC
      }
      CONTAINER_COLUMNS_RESOURCES=this.data.CONTAINER_COLUMNS.RESOURCES
      CONTAINERS_RESOURCES= this.data.CONTAINERS.RESOURCES
      RESOURCE_PARAMETER= {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCES.SHORT_KEY,
        [app.GridCells.CODE]:CONTAINERS_RESOURCES.CODE
      } 
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.openTab(app.TabBar.PROJECT).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS,0)
      })
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })

  });

  it("TC - Create new BoQ header and BoQ structure", function () {
    _common.openTab(app.TabBar.BOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
    })           
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.create_newRecord(cnt.uuid.BOQS);                  
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)                  
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE,0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE) 
    });
    _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES) 
    _common.waitForLoaderToDisappear()       
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);        
    cy.SAVE() 
  });

  it("TC - Create new estimate", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE )
          _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
        cy.SAVE()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
  });

  it("TC - Genrate line item and update BoQ quantities from wizard", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS)
    _estimatePage.generate_lineItems_fromWizard(LINE_ITEMS_PARAMETER)
    cy.SAVE()
  });

  it("TC - Edit line item and assign resource to it", function () {  

    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, BOQSTRUCT_DESC);    
    cy.SAVE();
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {            
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
    });
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETER);
    cy.SAVE();   
   
  });
  it("TC - Create new sales bid", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD); 
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_BID);
    _bidPage.createBidRecord_byWizardOptions(CONTAINER_BID.RUBRIC_CATEGORY,BID_DESC,CONTAINER_BID.BUSINESS_PARTNER,CONTAINER_BID.SOURCE_LEAD);      
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BID).then(() => {      
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS,0);
      _common.setup_gridLayout(cnt.uuid.BIDS,CONTAINER_COLUMNS_BID)
    })    
    cy.REFRESH_CONTAINER();
  });

  it("TC - Verify boq structure unit rate value", function () { 
    _common.openTab(app.TabBar.BIDBOQ).then(() => {
      _common.select_tabFromFooter( cnt.uuid.BIDBOQSTRUCTURE,app.FooterTab.BOQ_STRUCTURE,3);
      _common.setup_gridLayout(cnt.uuid.BIDBOQSTRUCTURE, CONTAINER_COLUMNS_BID_BOQ_STRUCTURE)
    });
    _boqPage.editBoQUnitRate_inBoQStructure(BOQSTRUCT_DESC, CONTAINER_BID.UNITRATE);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_BOQ);
    _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    cy.SAVE()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    _common.openTab(app.TabBar.BOQ).then(() => {      
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
       _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    });
    cy.REFRESH_CONTAINER()
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.search_inSubContainer(cnt.uuid.BOQS,BOQ_HEADER_DESC)
    cy.wait(1000)  // Wait is required to navigate to particular BOQ
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.IconButtons.ICO_GO_TO);
    
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 1);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _common.waitForLoaderToDisappear()
    _boqPage.verifyUpdated_UnitrateOfBoQStructure(BOQSTRUCT_DESC, CONTAINER_BID.UNITRATE);
    
      
  });

  after(() => {
    cy.LOGOUT();
  });
});
