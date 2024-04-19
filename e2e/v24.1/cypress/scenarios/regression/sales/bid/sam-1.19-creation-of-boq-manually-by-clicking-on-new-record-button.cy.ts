
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _procurementConfig, _procurementPage, _controllingUnit, _projectPage, _procurementContractPage } from "cypress/pages";

import { BOQ_ROOT_ITEM } from "cypress/pages/variables";
import _ from "cypress/types/lodash";
import cypress from "cypress";
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRJ_NO-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const ESTIMATE_CODE = "EST-CODE-" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQSTRUCT_DESC1 = "BOQSTRUCT_DESC-"+ Cypress._.random(0, 999);
const BOQSTRUCT_DESC2 = "BOQSTRUCT_DESC-"+ Cypress._.random(0, 999);

let CONTAINER_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTAINER_PROJECT;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let LINE_ITEMS_PARAMETER: DataCells;
let BOQ_STRUCTURE_PARAMETER: DataCells;
let BOQ_STRUCTURE_PARAMETER1: DataCells;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEMS;
let CONTAINER_COLUMNS_RESOURCES;
let CONTAINERS_RESOURCES;
let PROJECT_PARAMETER: DataCells;
let RESOURCE_PARAMETER:DataCells;
let BOQ_PARAMETERS:DataCells

allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM-1.19 | Creation of BOQ- manually by clicking on new record button")

      describe("SAM-1.19 | Creation of BOQ- manually by clicking on new record button", () => { 
      
      before(function () {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            cy.fixture("sam/sam-1.19-creation-of-boq-manually-by-clicking-on-new-record-button.json").then((data) => {
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
                  [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC1,
                  [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY,
                  [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
                  [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE
              } 
              BOQ_STRUCTURE_PARAMETER1={
                  [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
                  [app.GridCells.BRIEF_INFO_SMALL]:BOQSTRUCT_DESC1,
                  [app.GridCells.QUANTITY_SMALL]:CONTAINER_BOQ_STRUCTURE.QUANTITY1,
                  [ app.GridCells.BAS_UOM_FK]: CONTAINER_BOQ_STRUCTURE.UOM,
                  [ app.GridCells.PRICE_SMALL]:CONTAINER_BOQ_STRUCTURE.UNITRATE1
              } 
              CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE
              ESTIMATE_PARAMETERS = {
                  [app.GridCells.CODE]: ESTIMATE_CODE,
                  [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                  [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                  [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
              };
              LINE_ITEMS_PARAMETER = {
                  [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
                  [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:BOQ_DESC
              }
              CONTAINER_COLUMNS_ESTIMATE= this.data.CONTAINER_COLUMNS.ESTIMATE
              CONTAINER_COLUMNS_LINE_ITEMS= this.data.CONTAINER_COLUMNS.LINE_ITEMS
              CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES
              CONTAINERS_RESOURCES= this.data.CONTAINERS.RESOURCES
              RESOURCE_PARAMETER= {
                  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_RESOURCES.SHORT_KEY,
                  [app.GridCells.CODE]:CONTAINERS_RESOURCES.CODE
              }
              BOQ_PARAMETERS={
                  [app.GridCells.BRIEF_INFO_SMALL]:BOQ_DESC
              }
              /* Open desktop should be called in before block */
              _common.openDesktopTile(tile.DesktopTiles.PROJECT);
              _common.openTab(app.TabBar.PROJECT).then(() => {
                  _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
              });
              _common.create_newRecord(cnt.uuid.PROJECTS);
              _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETER);
              cy.SAVE();
              _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
              _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();          
            });
      });

      it("TC - Create new BOQ and go to BOQ", function () { 
            _common.openTab(app.TabBar.BOQ).then(()=>{
                  _common.select_tabFromFooter(cnt.uuid.BOQS,app.FooterTab.BOQs)
                  _common.setup_gridLayout(cnt.uuid.BOQS,CONTAINER_COLUMNS_BOQ)
            })           
            _common.clear_subContainerFilter(cnt.uuid.BOQS);
            _common.create_newRecord(cnt.uuid.BOQS);                  
            _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQ_PARAMETERS);
            cy.SAVE();
            _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
      });
      
      it("TC - Create multiple boq structure records", function () {                  
            _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
                  _common.setDefaultView(app.TabBar.BOQSTRUCTURE)                  
                  _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES,app.FooterTab.BOQ_STRUCTURE,0);
                  _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE) 
            });
            _common.set_columnAtTop([CONTAINER_COLUMNS_BOQ_STRUCTURE.basuomfk,CONTAINER_COLUMNS_BOQ_STRUCTURE.quantity,CONTAINER_COLUMNS_BOQ_STRUCTURE.price,CONTAINER_COLUMNS_BOQ_STRUCTURE.boqlinetypefk],cnt.uuid.BOQ_STRUCTURES) 
            _common.waitForLoaderToDisappear()       
            _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER);        
            _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL,CONTAINER_BOQ_STRUCTURE.FINAL_PRICE)            
            _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES, BOQ_STRUCTURE_PARAMETER1);
            cy.SAVE()
            _common.saveCellDataToEnv(cnt.uuid.BOQ_STRUCTURES,app.GridCells.FINAL_PRICE_SMALL,CONTAINER_BOQ_STRUCTURE.FINAL_PRICE1)
      
      }); 
      it("TC - Verify Final price at root level", function () {
            _common.clickOn_cellHasUniqueValue(cnt.uuid.BOQ_STRUCTURES,app.GridCells.BOQ_LINE_TYPE_FK,"Root")   
            _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.BOQ_STRUCTURES,Cypress.env(CONTAINER_BOQ_STRUCTURE.FINAL_PRICE),Cypress.env(CONTAINER_BOQ_STRUCTURE.FINAL_PRICE1),app.GridCells.FINAL_PRICE_SMALL)
           
      });
      it("TC - Create new Estimate header record and Assembly generate Line item and Resources ", function () {               
            
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
            _common.openTab(app.TabBar.ESTIMATE).then(() => {
                  _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
                  _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE )
            });
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
            _common.create_newRecord(cnt.uuid.ESTIMATE);
            _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
            cy.SAVE();
            _estimatePage.textOfEstimateCode();
            _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.ToolBar.ICO_GO_TO);
            cy.wait(2000)
            _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                  _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
                  _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEMS)
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
            _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
            _estimatePage.generate_lineItems_fromWizard(LINE_ITEMS_PARAMETER)
            _common.waitForLoaderToDisappear()    
            cy.SAVE()
            _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {                  
                  _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
                  _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
            });                  
            _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
            _common.create_newRecord(cnt.uuid.RESOURCES);
            _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETER);
            cy.SAVE()
            _common.waitForLoaderToDisappear()
            _common.saveCellDataToEnv(cnt.uuid.RESOURCES,app.GridCells.COST_TOTAL,CONTAINERS_RESOURCES.COST_TOTAL)
            
      });
      it("TC - Assert resource total to lineitem with AQ quantity ", function () {           
            _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                  _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            });
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.QUANTITY_TARGET,CONTAINER_BOQ_STRUCTURE.QUANTITY)
            _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,Cypress.env(CONTAINERS_RESOURCES.COST_TOTAL))
      });      
      after(() => {
            cy.LOGOUT();
      });
});
