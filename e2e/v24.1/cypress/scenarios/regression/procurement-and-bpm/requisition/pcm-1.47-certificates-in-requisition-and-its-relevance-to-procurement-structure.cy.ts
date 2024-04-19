import { _common, _sidebar, _procurementPage }from "cypress/pages";

import cypress from "cypress";
import { tile, app, cnt, btn,sidebar,commonLocators } from "cypress/locators";
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

const allure = Cypress.Allure.reporter.getInterface();
const MATERIALPRO = "MCODE-" + Cypress._.random(0, 9999);
const REQ_CODE = "REQ_CODE-" + Cypress._.random(0, 9999);

let PROCUREMENT_STRUCTURE_PARAMETERS: DataCells;
let CERTIFICATE_PARAMETERS:DataCells;
let CONTAINERS_REQUISITION;
let CONTAINERS_CERTIFICATE;
let CONTAINERS_PROCUREMENT_STRUCTURE;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION_CERTIFICATE;
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE;
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE_CERTIFICATE;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 1.47 | Certificates in requisition and its relevance to procurement structure");

describe('PCM- 1.47 | Certificates in requisition and its relevance to procurement structure', () => {

    before(function () {
      cy.fixture('pcm/pcm-1.47-certificates-in-requisition-and-its-relevance-to-procurement-structure.json').then((data) => {
        this.data = data;
        CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
        CONTAINERS_CERTIFICATE  =this.data.CONTAINERS.CERTIFICATE;
        CONTAINERS_PROCUREMENT_STRUCTURE  =this.data.CONTAINERS.PROCUREMENT_STRUCTURE
             
        CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
        CONTAINER_COLUMNS_REQUISITION_CERTIFICATE = this.data.CONTAINER_COLUMNS.REQUISITION_CERTIFICATE 
        CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
        CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE_CERTIFICATE= this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE_CERTIFICATE
  
        PROCUREMENT_STRUCTURE_PARAMETERS = {
          [app.GridCells.CODE]:MATERIALPRO,
          [app.GridCells.DESCRIPTION_INFO]: CONTAINERS_PROCUREMENT_STRUCTURE.DESCRIPTION,
          [app.GridCells.CLERK_REQ_FK]: CONTAINERS_PROCUREMENT_STRUCTURE.OWNERROLE,
          [app.GridCells.CLERK_PRC_FK]: CONTAINERS_PROCUREMENT_STRUCTURE.RESPONSIBLEROLE,
          [app.GridCells.PRC_CONFIG_HEADER_FK]:CONTAINERS_PROCUREMENT_STRUCTURE.MATERIAL
        };  
          
        CERTIFICATE_PARAMETERS = {
          
          [app.GridCells.PRC_CONFIG_HEADER_FK]: CONTAINERS_CERTIFICATE.CONFIGURATION,
          [app.GridCells.BPD_CERTIFICATE_TYPE_FK]: CONTAINERS_CERTIFICATE.TYPE,
          [app.GridCells.IS_REQUIRED]:commonLocators.CommonKeys.CHECK,
          [app.GridCells.IS_MANDATORY]:commonLocators.CommonKeys.CHECK
        };  
      });
  
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });
  
      after(() => {
          cy.LOGOUT();
      });
 
  it("TC - Create certificates for procurement structure", function () {
  
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);

      _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
         _common.setDefaultView(app.TabBar.PROCUREMENTSTRUCTURE)
         _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
      });
      
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES," ")
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
      _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
      _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
     
      _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
      _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_PARAMETERS)
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      
     
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
      _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,MATERIALPRO)
      
     
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CERTIFICATES, app.FooterTab.CERTIFICATES, 1);
        _common.setup_gridLayout(cnt.uuid.CERTIFICATES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE_CERTIFICATE)
        
     });
     _common.clear_subContainerFilter(cnt.uuid.CERTIFICATES)
     _common.create_newRecord(cnt.uuid.CERTIFICATES)
     _procurementPage.enterRecord_toCreateCertificates(cnt.uuid.CERTIFICATES,CERTIFICATE_PARAMETERS)
     cy.SAVE()
     _common.waitForLoaderToDisappear()
     _common.enterRecord_inNewRow(cnt.uuid.CERTIFICATES,app.GridCells.AMOUNT_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CERTIFICATE.AMOUNT)
     _common.enterRecord_inNewRow(cnt.uuid.CERTIFICATES,app.GridCells.GUARANTEE_COST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_CERTIFICATE.GUARANTEECOST)
     cy.SAVE()
  })

  it("TC - Create requisitions", function () {
     
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        
      _common.openTab(app.TabBar.MAIN).then(() => {
        _common.setDefaultView(app.TabBar.MAIN)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
        _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
      });
      _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
      _common.create_newRecord(cnt.uuid.REQUISITIONS)
      _common.waitForLoaderToDisappear()  
      cy.wait(1000)//required wait
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
      _common.waitForLoaderToDisappear()     
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.STRUCTURE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MATERIALPRO)
      _common.waitForLoaderToDisappear()
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.BUSINESS_PARTNER_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_REQUISITION.BP)
     
      cy.SAVE()
      _common.waitForLoaderToDisappear()  
      _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS,app.GridCells.CODE,REQ_CODE)
  });
  it("TC - Verify Certificate in requisition with respect to Procurement structure",function(){
      
      _common.openTab(app.TabBar.MAIN).then(() => {        
        _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid. REQUISITION_CERTIFICATES, app.FooterTab.CERTIFICATES, 0);
          _common.setup_gridLayout(cnt.uuid. REQUISITION_CERTIFICATES,CONTAINER_COLUMNS_REQUISITION_CERTIFICATE)
      });
      _common.waitForLoaderToDisappear()
      _common.select_rowInContainer(cnt.uuid.REQUISITION_CERTIFICATES)
      _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CERTIFICATES,app.GridCells.BPD_CERTIFICATE_TYPE_FK,CONTAINERS_CERTIFICATE.TYPE)
      _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CERTIFICATES,app.GridCells.REQUIRED_AMOUNT,CONTAINERS_CERTIFICATE.AMOUNT)
      _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_CERTIFICATES,app.GridCells.GUARANTEE_COST,CONTAINERS_CERTIFICATE.GUARANTEECOST)
  })
})