import { _common,  _sidebar,_controllingUnit, _rfqPage,_materialPage,_projectPage,_mainView, _package,_validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = "LINE_ITEM-DESC2-" + Cypress._.random(0, 999);
const PROJECT_NO = "PR-N1" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
const COUNTUNIT = "COUNTUNIT-" + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells,CONTROLLING_UNIT_PARAMETERS:DataCells
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells,LINE_ITEM_PARAMETERS1:DataCells,PROJECTS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS1:DataCells




let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;


let CONTAINERS_PACKAGE

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE_ROLES
let CONTAINER_COLUMNS_PACKAGE,CONTAINER_COLUMNS_CONTROLLING_UNIT,CONTAINERS_CONTROLLING_UNIT,CONTAINER_COLUMNS_REQUISITION,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------

var packageCode:string;
var reqCode:string;
var quantity:string;
var responsible:string;
var reqOwner:string;
var CONTROLLING_SUB_CODE:string;

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.64 | Update Existing Requisition");

describe("PCM- 2.64 | Update Existing Requisition", () => {
        before(function () {
          cy.fixture('pcm/pcm-2.64-update-existing-requisition.json').then((data) => {
              this.data = data;
              CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
              CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
             
              CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
              CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
              CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
              
              CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
              CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
              CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
           
              CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
              CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
              CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
              CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
              CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
              CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE = this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
              CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE_ROLES=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE_ROLES

              PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }
              ESTIMATE_PARAMETERS = {
                  [app.GridCells.CODE]: ESTIMATE_CODE,
                  [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                  [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                  [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
                }
              
              LINE_ITEM_PARAMETERS = {
                  [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
                },
            
                LINE_ITEM_PARAMETERS1 = {
                  [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION1,
                  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
                },
               
              RESOURCE_PARAMETERS = {
                  [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                  [app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE
                }
                
                CONTROLLING_UNIT_PARAMETERS = {
                  [app.GridCells.DESCRIPTION_INFO]: COUNTUNIT,
                  [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                  [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
                }
               
          });
          cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
         
    });
    after(() => {
      cy.LOGOUT();
    });


it("TC - Create new project adding controlling unit to project", function () { 
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
  
  _common.openTab(app.TabBar.PROJECT).then(() => {
     _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS)
  })
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


  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
         });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)
      _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
        _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
   
       
      });
      _common.set_columnAtTop([CONTAINER_COLUMNS_CONTROLLING_UNIT.isdefault],cnt.uuid.CONTROLLING_UNIT)
   
      _common.waitForLoaderToDisappear()
      _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
      _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
      cy.SAVE()
      _common.waitForLoaderToDisappear()

      _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER"));

      _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.DESCRIPTION_INFO,"Rohbau")
      _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
      _common.getText_fromCell(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE).then(($value)=>{
      CONTROLLING_SUB_CODE = $value.text()
         cy.log(CONTROLLING_SUB_CODE)
       })
       cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
    });


    it("TC - Create New Estimate Record", function () {

      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATE)
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
  
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()
    });

    it("TC- Create new Line item record", function(){

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      
    });

    it("TC- Assign material resource to line item",function(){

      /* Need to remove the valid from and valid to dates in material catalog to select material resource*/
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES,3);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
      _common.create_newRecord(cnt.uuid.RESOURCES)
      _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
      cy.SAVE();
    
      _common.waitForLoaderToDisappear()
      _common.select_rowInContainer(cnt.uuid.RESOURCES)
      _common.getText_fromCell(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL).then(($value)=>{
           quantity = $value.text()
           cy.log(quantity)
      })
    
    });

    it("TC- Verify Create/update material Package", function () {
    
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
     _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
     cy.SAVE();
     _common.waitForLoaderToDisappear()
     _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
     _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO);
     _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(()=>{
          _common.setDefaultView(app.TabBar.PACKAGE)
          _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
          _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
        });
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.getText_fromCell(cnt.uuid.PACKAGE,app.GridCells.CODE).then(($value)=>{
          packageCode = $value.text()
          cy.log(packageCode)
        })
        _common.openTab(app.TabBar.PACKAGE).then(()=>{
          _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,2)
          _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS,CONTAINER_COLUMNS_PACKAGE_ITEM)
        });
        _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE);
        _common.assert_forNumericValues(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,quantity)
        _package.changeStatus_ofPackage_inWizard()

    });
    it('TC-Create requisition from Package',function(){

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_REQUISITION);
        _common.clickOn_modalFooterButton(btn.ButtonText.GO_TO_REQUISITION)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO)

        _common.openTab(app.TabBar.MAIN).then(()=>{
          _common.setDefaultView(app.TabBar.MAIN)
          _common.select_tabFromFooter(cnt.uuid.REQUISITIONS,app.FooterTab.REQUISITION,2)
          _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.getText_fromCell(cnt.uuid.REQUISITIONS,app.GridCells.CODE).then(($value)=>{
           reqCode = $value.text()
            cy.log(reqCode)
          })
    })

    it('TC-Update Project in Existing Requisition',function(){
      
    
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.openTab(app.TabBar.MAIN).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONS,app.FooterTab.REQUISITION,2)
      })
      _common.maximizeContainer(cnt.uuid.REQUISITIONS)
      //_common.search_inSubContainer(cnt.uuid.REQUISITIONS,reqCode)
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.PROJECT_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("PROJECT_NUMBER") ) 
      _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS,app.GridCells.CODE,reqCode)
      cy.SAVE()
      cy.wait(5000)//required wait
      _common.clickOn_modalFooterButton(btn.ButtonText.YES)
      
      _common.waitForLoaderToDisappear()  
          _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS,app.GridCells.CODE,reqCode)
          cy.SAVE()
          cy.wait(2000)//required wait
          _common.waitForLoaderToDisappear()  
        
          _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS,app.GridCells.CONTROLLING_UNIT_FK,CONTROLLING_SUB_CODE) 
        
    })

    it('TC-update tax code and Procurement Structure',function(){ 
     
      _common.openTab(app.TabBar.MAIN).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.REQUISITIONS,app.FooterTab.REQUISITION,2)
      })
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.TAX_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,"05")
      cy.wait(1000)//required wait
      cy.SAVE()
      _common.clickOn_modalFooterButton(btn.ButtonText.YES)
      _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS,app.GridCells.STRUCTURE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,"M")
      _common.waitForLoaderToDisappear()
      cy.wait(1000)//required wait
      _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONS,app.GridCells.CODE,reqCode)
      _common.waitForLoaderToDisappear()
      cy.wait(2000)//required wait
      cy.SAVE()
      _common.waitForLoaderToDisappear() 
      cy.wait(1000)//required wait
      _common.getText_fromCell(cnt.uuid.REQUISITIONS,app.GridCells.CLERK_PRC_FK).then(($value)=>{
        responsible = $value.text()
        cy.log(responsible)
      })
      _common.getText_fromCell(cnt.uuid.REQUISITIONS,app.GridCells.CLERK_REQ_FK).then(($value1)=>{
        reqOwner = $value1.text()
        cy.log(reqOwner)
      })
    })

    it('TC- Verify responsible and requisition owner in Procurement Structure',function(){
     
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE);
      _common.waitForLoaderToDisappear()
      
      _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES,app.FooterTab.PROCUREMENT_STRUCTURES,0)
        _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        
      })
      cy.REFRESH_CONTAINER()
      _common.search_inSubContainer(cnt.uuid.PROCUREMENT_STRUCTURES,"M")
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.CODE,"M")
      _common.openTab(app.TabBar.PROCUREMENTSTRUCTURE).then(()=>{
        _common.select_tabFromFooter(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES,app.FooterTab.ROLES,1)
        _common.setup_gridLayout(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES, CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE_ROLES)
      })
      _common.select_rowInContainer(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES,app.GridCells.CLERK_FK,responsible)
      _common.assert_cellData_insideActiveRow(cnt.uuid.ROLES_PROCUREMENT_STRUCTURES,app.GridCells.CLERK_FK,reqOwner)
    
    })
})