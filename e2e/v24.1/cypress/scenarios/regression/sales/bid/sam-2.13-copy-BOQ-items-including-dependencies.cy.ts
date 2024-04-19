import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _estimatePage, _validate, _projectPage,_mainView, _boqPage,_salesPage, _bidPage, _saleContractPage, _modalView, _billPage } from "cypress/pages";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
const allure = Cypress.Allure.reporter.getInterface();

const BOQ_HEADER_DESC = "BOQ_HEADER_DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC = "BOQSTRUCT_DESC-"+ Cypress._.random(0, 999);


const BOQ_HEADER_DESC1 = "BOQ_HEADER_DESC2-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC1 = "BOQSTRUCT_DESC2-"+ Cypress._.random(0, 999);

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION2 = "EST-DESC2-" + Cypress._.random(0, 999);

const PROJECT_NO = "PR-1-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const PROJECT_NO2 = "PR-2-" + Cypress._.random(0, 999);
const PROJECT_DESC2 = "PRDESC2-" + Cypress._.random(0, 999);

const CLERK = "HS";

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

let PROJECTS_PARAMETERS;

let PROJECTS_PARAMETERS1:DataCells


let BOQ_PARAMETERS1:DataCells

let CONTAINER_COLUMNS_SOURCEBOQ

allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 2.13 | Copy BOQ items including dependencies");

describe("SAM- 2.13 | Copy BOQ items including dependencies", () => {
  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));

    cy.fixture("sam/sam-2.13-copy-BOQ-items-including-dependencies.json").then((data) => {
      this.data = data
     
      CONTAINER_BOQ_STRUCTURE  = this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_BOQ = this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE = this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE;
      
      
      CONTAINER_COLUMNS_SOURCEBOQ = this.data.CONTAINER_COLUMNS.SOURCEBOQ;
          
     
      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_ESTIMATE= this.data.CONTAINERS.ESTIMATE
      
      CONTAINER_COLUMNS_LINE_ITEMS=this.data.CONTAINER_COLUMNS.LINE_ITEMS
      
      CONTAINER_COLUMNS_RESOURCES=this.data.CONTAINER_COLUMNS.RESOURCES
      CONTAINERS_RESOURCES= this.data.CONTAINERS.RESOURCES

      BOQ_PARAMETERS={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC
      }

      BOQ_STRUCTURE_PARAMETER={
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
        [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE
      } 

      BOQ_PARAMETERS1={
        [app.GridCells.BRIEF_INFO_SMALL]:BOQ_HEADER_DESC1
      }

    

      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINER_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINER_ESTIMATE.ESTIMATE_TYPE,
      }
     
      
      LINE_ITEMS_PARAMETER = {
        [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_HEADER_DESC
      }

      RESOURCE_PARAMETER= {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCES.SHORT_KEY,
        [app.GridCells.CODE]:CONTAINERS_RESOURCES.CODE
      } 
      PROJECTS_PARAMETERS = {
        [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
        [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
        [commonLocators.CommonLabels.CLERK]: CLERK
    }

    PROJECTS_PARAMETERS1 = {
      [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO2,
      [commonLocators.CommonLabels.NAME]: PROJECT_DESC2,
      [commonLocators.CommonLabels.CLERK]: CLERK
  }

      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
     
  })
   
  });
  it('TC - Create new project record', function () {

    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.setDefaultView(app.TabBar.PROJECT)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
  });
  _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
  _common.create_newRecord(cnt.uuid.PROJECTS);
  _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
  _common.waitForLoaderToDisappear()
  cy.SAVE();
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

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
    _common.waitForLoaderToDisappear()    
    _common.getTextfromCell(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL)
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
        _common.waitForLoaderToDisappear()  
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
  });

  it('TC - Generate line item and assign resource to it', function () {
    
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
    _common.waitForLoaderToDisappear()  

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
    _common.waitForLoaderToDisappear()  
  });

  it('TC - Create second project', function () {
   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT);
   
    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.setDefaultView(app.TabBar.PROJECT)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
  });
  _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
  _common.create_newRecord(cnt.uuid.PROJECTS);
  _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS1);
  _common.waitForLoaderToDisappear()
  cy.SAVE();
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO2).pinnedItem();
  });


  it.only('TC - Update BoQ source record and verify copied boq', function () {
  cy.wait(20000)
   
    _common.openTab(app.TabBar.BOQ).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
      _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
    })           
    // _common.clear_subContainerFilter(cnt.uuid.BOQS);
    // _common.create_newRecord(cnt.uuid.BOQS);                  
    // _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS1);
    // cy.SAVE();
    // _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.setDefaultView(app.TabBar.BOQSTRUCTURE)                  
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE,0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE) 
    });
    _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES) 
    _common.waitForLoaderToDisappear()       
   
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQSOURCE, app.FooterTab.SOURCE_BOQ, 1);
      _common.waitForLoaderToDisappear() 
      _common.setup_gridLayout(cnt.uuid.BOQSOURCE, CONTAINER_COLUMNS_SOURCEBOQ)
    });
    _common.waitForLoaderToDisappear()  
    _boqPage.UpdateBoQSource("Copy From", PROJECT_NO,BOQ_HEADER_DESC, BOQSTRUCT_DESC)
    _common.clickOn_toolbarButton(cnt.uuid.BOQ_STRUCTURES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTURES,BOQSTRUCT_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURES, app.GridCells.FINAL_PRICE_SMALL, Cypress.env("Text"))
  })

  

  after(() => {
    cy.LOGOUT();
  });
})