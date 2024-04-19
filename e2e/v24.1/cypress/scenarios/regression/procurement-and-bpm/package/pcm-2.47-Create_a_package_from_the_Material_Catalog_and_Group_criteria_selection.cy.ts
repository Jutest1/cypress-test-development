import { _common,  _sidebar, _rfqPage,_materialPage,_projectPage,_mainView, _package,_validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();
// VARIABLES----------------------------------------------------------------
const MATERIALCatalog_CODE ="Material-" + Cypress._.random(0, 999);
const MATERIALCatalog_DESC ="Benstock"+ Cypress._.random(0, 999);
const MATERIALGROUP_CODE ="M-" + Cypress._.random(0, 999);
const MATERIALGROUP_DESC ="MG"+ Cypress._.random(0, 999);
const MATERIALRECORD_CODE ="Material-" + Cypress._.random(0, 999);
const MATERIALRECORD_DESC ="AnsibleT"+ Cypress._.random(0, 999);
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);

const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS1:DataCells
let RESOURCE_PARAMETERS2:DataCells
let MATERIAL_RECORD_PARAMETER:DataCells;
let MATERIAL_CATALOGS_PARAMETER:DataCells
let MATERIAL_GROUP_PARAMETER:DataCells


let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;


let CONTAINERS_PACKAGE,CONTAINER_COLUMNS_PACKAGE_ITEMS

let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_MATERIAL_CATALOG
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;
let CONTAINER_COLUMNS_PACKAGE
let CONTAINERS_MATERIAL
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------


allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.47 | Create a package from the 'Material Catalog & Group' criteria selection")

describe('PCM- 2.47 | Create a package from the material catalog & group criteria selection', () => {

    before(function () {
      cy.fixture('pcm/pcm-2.47-Create_a_package_from_the_material_catalog_and_group_criteria_selection.json').then((data) => {
          this.data = data;
          CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
          CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
         
          CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
          CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
          CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
          
          CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
          CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
          CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
          CONTAINERS_MATERIAL = this.data.CONTAINERS.MATERIAL
          CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
          CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
          CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
          CONTAINER_COLUMNS_PACKAGE_ITEMS=this.data.CONTAINER_COLUMNS.PACKAGE_ITEMS
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
            
           
          RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
              [app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE1,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY
            }
            RESOURCE_PARAMETERS1 = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
              [app.GridCells.CODE]: MATERIALRECORD_CODE,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY1
            }
          
            
            MATERIAL_CATALOGS_PARAMETER={
              [app.GridCells.CODE]:MATERIALCatalog_CODE,
              [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL.BP
            } 

            MATERIAL_GROUP_PARAMETER={
              [app.GridCells.CODE]:MATERIALGROUP_CODE,
              [app.GridCells.DESCRIPTION_INFO]:MATERIALGROUP_DESC,
              
            } 

            MATERIAL_RECORD_PARAMETER={
              [app.GridCells.CODE]:MATERIALRECORD_CODE,
              [app.GridCells.DESCRIPTION_INFO_1]:MATERIALRECORD_DESC,
              [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL.UOM,
              [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL.RETAIL_PRICE,
              [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL.LIST_PRICE
            }

          
      });
  
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      

  });
  after(() => {
		cy.LOGOUT();
	});

  it('TC - Precondition-Create material Catalog', function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);

    cy.REFRESH_CONTAINER()

   _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
    _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS,app.FooterTab.MATERIALCATALOG)
   
    })
    cy.REFRESH_CONTAINER()
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
   _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
   _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
    //_materialPage.enterRecord_toCreateMaterialCatalogsPopUp(MATERIALCatalog_CODE,"Adolf Koch");
    cy.SAVE()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS,app.FooterTab.MATERIALGROUP)
     
      })
      _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
    _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
    _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER);
    cy.SAVE()
 _common.waitForLoaderToDisappear()

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
    cy.wait(2000)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER,app.FooterTab.MATERIALFILTER)
      
      })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER,app.GridCells.DESCRIPTION_INFO,MATERIALCatalog_DESC)
    _common.openTab(app.TabBar.RECORDS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS,app.FooterTab.MATERIAL_RECORDS)
      })
    _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
    _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
    _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER)
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

    _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS,app.FooterTab.PROJECTS)
      
      })
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

  })
  it('TC - Create new estimate', function () {

    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
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

  it('TC - Create new line item with quantity', function () {
   
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

  it('TC - Assign resource to the line item', function () {

    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
  });

   
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
     cy.SAVE();
    _common.waitForLoaderToDisappear()
   
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS1);
     cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION);
    _common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL);

  });
  
  it('TC - Create material package', function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
     _estimatePage.enterRecord_toCreateCostCodePackage_wizard(commonLocators.CommonKeys.MATERIAL_CATALOG_AND_GROUP);
     cy.SAVE();
     _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE)
      _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
    })
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)

    
  });

  it('TC - Verify package net value with item total', function () {
   

    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE,3);
      _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
    })
      _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE, app.GridCells.DESCRIPTION,CONTAINERS_PACKAGE.CODE2);
      _package.sumofNetValPackage(cnt.uuid.PACKAGE,app.GridCells.VALUE_NET,CONTAINERS_PACKAGE.CODE3)   
      
    
      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS,3);
        _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEMS)
      })
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE, app.GridCells.DESCRIPTION,CONTAINERS_PACKAGE.CODE2);
    _common.getText_fromCell(cnt.uuid.PACKAGE, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
          Cypress.env("NET_VALUE_1", $ele1.text())
          _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
          _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS,app.GridCells.PRC_PACKAGE_FK_DESCRIPTION,CONTAINERS_PACKAGE.CODE2) 
          _common.assert_forNumericValues (cnt.uuid.PACKAGEITEMS,app.GridCells.TOTAL,Cypress.env("NET_VALUE_1").toString()) 
    })
     
    _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE, app.GridCells.DESCRIPTION,CONTAINERS_PACKAGE.CODE3);
    _common.getText_fromCell(cnt.uuid.PACKAGE, app.GridCells.VALUE_NET).then(($ele1: JQuery<HTMLElement>) => {
          Cypress.env("NET_VALUE_2", $ele1.text())
        
          _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGEITEMS,app.GridCells.PRC_PACKAGE_FK_DESCRIPTION,CONTAINERS_PACKAGE.CODE3) 
          _common.assert_forNumericValues (cnt.uuid.PACKAGEITEMS,app.GridCells.TOTAL,Cypress.env("NET_VALUE_2").toString()) 
    })
  });
 
})
