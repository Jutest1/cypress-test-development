import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import Sidebar from "cypress/locators/sidebar";
import { _common, _controllingUnit, _package, _projectPage, _estimatePage, _sidebar,_mainView, _validate, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE= "EST_CODE-"+ Cypress._.random(0, 999);
const EST_DESC= "EST_DESC-"+ Cypress._.random(0, 999);
const LI_DESC= "LI_DESC-"+ Cypress._.random(0, 999);
const MATCAT_CODE1="MATCAT_CODE-"+ Cypress._.random(0, 999);
const MATCAT_DESC1="MATCAT_DESC-"+ Cypress._.random(0, 999);
const MATCAT_CODE2="MATCAT_CODE-"+ Cypress._.random(0, 999);
const MATCAT_DESC2="MATCAT_DESC-"+ Cypress._.random(0, 999);
const MATGRP_CODE1="MATGRP_CODE-"+ Cypress._.random(0, 999);
const MATGRP_DESC1="MATGRP_DESC-"+ Cypress._.random(0, 999);
const MATGRP_CODE2="MATGRP_CODE-"+ Cypress._.random(0, 999);
const MATGRP_DESC2="MATGRP_DESC-"+ Cypress._.random(0, 999);
const SUBGRP_CODE1="MATGRP_CODE-"+ Cypress._.random(0, 999);
const SUBGRP_DESC1="MATGRP_DESC-"+ Cypress._.random(0, 999);
const SUBGRP_CODE2="MATGRP_CODE-"+ Cypress._.random(0, 999);
const SUBGRP_DESC2="MATGRP_DESC-"+ Cypress._.random(0, 999);
const MAT_CODE1= "MAT-CODE" + Cypress._.random(0, 999);
const MAT_DESC1= "MAT-DESC" + Cypress._.random(0, 999);
const MAT_CODE2= "MAT-CODE-" + Cypress._.random(0, 999);
const MAT_DESC2= "MAT-DESC" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

let CONTAINERS_MATERIAL_CATALOG
let CONTAINERS_MATERIAL_GROUP
let CONTAINERS_MATERIAL
let MATERIAL_CATALOGS_PARAMETER:DataCells
let MATERIAL_CATALOGS_PARAMETER1:DataCells
let CONTAINER_COLUMNS_MATERIAL_CATALOG;
let CONTAINER_COLUMNS_MATERIAL_GROUP;
let CONTAINER_COLUMNS_MATERIAL;
let MATERIAL_GROUPS_TYPE1:DataCells
let MATERIAL_SUBGROUPS_TYPE1:DataCells
let MATERIAL_GROUPS_TYPE2:DataCells
let MATERIAL_SUBGROUPS_TYPE2:DataCells
let MATERIAL_RECORD_PARAMETER1:DataCells
let MATERIAL_RECORD_PARAMETER2:DataCells
let MATERIAL_LOOKUP1:DataCells
let MATERIAL_LOOKUP2:DataCells

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.133 | Generate material items belonging to selected package-Manual package creation ");

describe("PCM- 2.133 | Generate material items belonging to selected package-Manual package creation", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.133-create-separate-packages-of-materials-for-material-belonging-to-different-material-catalogues.json").then((data) => {
          this.data = data;
        });
    });

    before(() => {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),                      
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );        
        cy.fixture("pcm/pcm-2.133-create-separate-packages-of-materials-for-material-belonging-to-different-material-catalogues.json").then(function (data){
          this.data = data;
          CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
          CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
          ESTIMATE_PARAMETERS = {
            [app.GridCells.CODE]: EST_CODE,
            [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
            [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
            [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
          }
          CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
          CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
          LINE_ITEM_PARAMETERS = {
            [app.GridCells.DESCRIPTION_INFO]: LI_DESC,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY
          },
          CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
          CONTAINER_COLUMNS_RESOURCE= this.data.CONTAINER_COLUMNS.RESOURCE
          CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
          CONTAINERS_MATERIAL_CATALOG= this.data.CONTAINERS.MATERIAL_CATALOG
          CONTAINER_COLUMNS_MATERIAL_GROUP = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
          CONTAINERS_MATERIAL_GROUP=this.data.CONTAINERS.MATERIAL_GROUP
          CONTAINERS_MATERIAL=this.data.CONTAINERS.MATERIAL
          CONTAINER_COLUMNS_MATERIAL=this.data.CONTAINER_COLUMNS.MATERIAL
          MATERIAL_CATALOGS_PARAMETER={
            [app.GridCells.CODE]:MATCAT_CODE1,
            [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_CATALOG.BP,
            [app.GridCells.DESCRIPTION_INFO]:MATCAT_DESC1     
        } 
          MATERIAL_CATALOGS_PARAMETER1={
            [app.GridCells.CODE]:MATCAT_CODE2,
            [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_CATALOG.BP,
            [app.GridCells.DESCRIPTION_INFO]:MATCAT_DESC2    
        } 
          MATERIAL_GROUPS_TYPE1={
            [app.GridCells.CODE]:MATGRP_CODE1,
            [app.GridCells.DESCRIPTION_INFO]:MATGRP_DESC1,
            [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.STRUCTURE
        }
          MATERIAL_SUBGROUPS_TYPE1={
            [app.GridCells.CODE]:SUBGRP_CODE1,
            [app.GridCells.DESCRIPTION_INFO]:SUBGRP_DESC1,
            [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.STRUCTURE
        }
          MATERIAL_GROUPS_TYPE2={
            [app.GridCells.CODE]:MATGRP_CODE2,
            [app.GridCells.DESCRIPTION_INFO]:MATGRP_DESC2,
            [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.STRUCTURE
        }
          MATERIAL_SUBGROUPS_TYPE2={
            [app.GridCells.CODE]:SUBGRP_CODE2,
            [app.GridCells.DESCRIPTION_INFO]:SUBGRP_DESC2,
            [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.STRUCTURE
        }
          MATERIAL_RECORD_PARAMETER1={
            [app.GridCells.CODE]:MAT_CODE1,
            [app.GridCells.DESCRIPTION_INFO_1]:MAT_DESC1,
            [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL.UOM[0],
            [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL.PRICE[0],
            [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL.LIST_PRICE[0]
        }
          MATERIAL_RECORD_PARAMETER2={
            [app.GridCells.CODE]:MAT_CODE2,
            [app.GridCells.DESCRIPTION_INFO_1]:MAT_DESC2,
            [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL.UOM[1],
            [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL.PRICE[1],
            [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL.LIST_PRICE[1]
        }
          MATERIAL_LOOKUP1={
            [app.FooterTab.MATERIALCATALOG]:Sidebar.SideBarOptions.MATERIAL_CATALOG,
            [app.InputFields.FLEX_BOX_RULE]:MATCAT_CODE1,
            [app.GridCells.MDC_MATERIAL_FK]:MAT_CODE1,
        } 
          MATERIAL_LOOKUP2={
            [app.FooterTab.MATERIALCATALOG]:Sidebar.SideBarOptions.MATERIAL_CATALOG,
            [app.InputFields.FLEX_BOX_RULE]:MATCAT_CODE2,
            [app.GridCells.MDC_MATERIAL_FK]:MAT_CODE2,
        }          
      
          /* Open desktop should be called in before block */
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();         
        });
    });
    it("TC- Create Material Catalog",function(){       
        
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
          _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.MATERIAL_CATALOG);
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
              _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG)
              _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
              _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
          })
          _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS);
          _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
          _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
           cy.SAVE()
           _common.waitForLoaderToDisappear()
          _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
          _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER1);
          cy.SAVE()
          _common.waitForLoaderToDisappear()
          _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)
          
    })
    it("TC-Create Material Group",function(){           
       
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS,app.FooterTab.MATERIALGROUP)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS,CONTAINER_COLUMNS_MATERIAL_GROUP)
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
            })
          _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,MATCAT_CODE1)
          cy.wait(500)//required wait
          _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
          _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUPS_TYPE1);
          cy.SAVE()
          _common.create_newSubRecord(cnt.uuid.MATERIAL_GROUPS)
          _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_SUBGROUPS_TYPE1);
          cy.SAVE()
          _common.waitForLoaderToDisappear()
          _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,MATCAT_CODE2)
          cy.wait(500)//required wait
          _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
          _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUPS_TYPE2);
            cy.SAVE()
          _common.create_newSubRecord(cnt.uuid.MATERIAL_GROUPS)
          _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_SUBGROUPS_TYPE2);
          cy.SAVE()
    }) 
    it("TC- Create Material for Material catalog",function(){
              
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.MATERIAL)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER,app.FooterTab.MATERIALFILTER,0);
        
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER,MATCAT_CODE1)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER,app.GridCells.IS_CHECKED,commonLocators.CommonKeys.CHECK)
        
        _common.openTab(app.TabBar.DETAILSMATERIAL)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS,app.FooterTab.MATERIAL_RECORDS,0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS,CONTAINER_COLUMNS_MATERIAL)
            _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        });  
    
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER1)
        cy.SAVE()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER,MATCAT_CODE2)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER,app.GridCells.IS_CHECKED,commonLocators.CommonKeys.CHECK)
        
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER2)
        cy.SAVE()

    })
   
    it("TC- Create estimate header",function(){        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)    
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
           _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
           _common.setup_gridLayout(cnt.uuid.ESTIMATE,CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
         cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
    })
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
           
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        });
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.edit_dropdownCellWithCaret(cnt.uuid.RESOURCES,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,commonLocators.CommonKeys.GRID,CONTAINERS_RESOURCE.SHORTKEY)        
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO)      
        _common.lookUpButtonInCell(cnt.uuid.RESOURCES,app.GridCells.CODE,app.InputFields.ICO_INPUT_LOOKUP,0)        
        _materialPage.selectMaterial_fromMaterialSearchLookup(MATERIAL_LOOKUP1)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)        
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        cy.wait(10000)
        _common.edit_dropdownCellWithCaret(cnt.uuid.RESOURCES,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,commonLocators.CommonKeys.GRID,CONTAINERS_RESOURCE.SHORTKEY)
        
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO)
        _common.lookUpButtonInCell(cnt.uuid.RESOURCES,app.GridCells.CODE,app.InputFields.ICO_INPUT_LOOKUP,0)        
        _materialPage.selectMaterial_fromMaterialSearchLookup(MATERIAL_LOOKUP2)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.SAVE()
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO)
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY[1])
        cy.SAVE()
        _package.get_valueOfcostPerUnitOfTwoResources();
        _common.waitForLoaderToDisappear()
         
    })
    it("TC- Create Separate material Package for material catalogs",function(){
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _package.create_materialPackageForUsing_separatePkgCheckbox(CONTAINERS_RESOURCE.MATERIAL_COST_CODE)
        
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env("PROJECT_NUMBER")).pinnedItem();         
  
        });
        _common.search_inSubContainer(cnt.uuid.PACKAGE,MAT_DESC1)
        cy.wait(500)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE,app.GridCells.DESCRIPTION,MAT_DESC1)        
        _common.search_inSubContainer(cnt.uuid.PACKAGE,MAT_DESC2)
        cy.wait(500)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE,app.GridCells.DESCRIPTION,MAT_DESC2)        
               
    })   
    after(() => {
        cy.LOGOUT();
    })
})