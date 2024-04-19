import { _common,  _sidebar,_projectPage,_package, _rfqPage,_mainView, _validate,_estimatePage, _modalView } from 'cypress/pages';
import { cnt, tile, app,sidebar,commonLocators ,btn} from 'cypress/locators';
import common from 'mocha/lib/interfaces/common';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { EST_HEADER } from 'cypress/pages/variables';

const allure = Cypress.Allure.reporter.getInterface();

// VARIABLES----------------------------------------------------------------

const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-N" + Cypress._.random(0, 999);
const PROJECT_NO = "PR-" + Cypress._.random(0, 999);
const PROJECT_DESC = "PR-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI_DESC_" + Cypress._.random(0, 999);
const CLERK = "HS";


let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let UPDATE_ESTIMATE_PARAMETER:DataCells
let DJC_BUDGET_PARAMETERS:DataCells
let PROJECTS_PARAMETERS:DataCells
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let CONTAINERS_PACKAGE_ITEM;
let CONTAINERS_PACKAGE
let MODAL_UPDATE_ESTIMATE_WIZARD
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_TOTALS;


// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.22 | Add new line item respective to resources, which are added to package AFTER generating package from estimate");

describe("PCM- 2.22 | Add new line item respective to resources, which are added to package AFTER generating package from estimate)", () => {
  before(function () {
  cy.fixture('pcm/pcm-2.22-Add-new-line-item-respective-to-resources-AFTER-generating-package-from-estimate.json').then((data) => {
    this.data = data;
    CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
    CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
    CONTAINERS_PACKAGE_ITEM = this.data.CONTAINERS.PACKAGE_ITEM;
    CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
    CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEMS
    CONTAINER_COLUMNS_TOTALS = this.data.CONTAINER_COLUMNS.TOTALS
    
    CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
    CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
    CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
    CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
    MODAL_UPDATE_ESTIMATE_WIZARD=this.data.MODAL.UPDATE_ESTIMATE_WIZARD

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
      
    DJC_BUDGET_PARAMETERS={
        [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]:commonLocators.CommonLabels.RADIO_HIGHLETED_LINE_ITEM,
        [commonLocators.CommonLabels.BUDGET_FROM]:CONTAINERS_PACKAGE.COST_TOTAL,
        [commonLocators.CommonLabels.X_FACTOR]:CONTAINERS_PACKAGE.XFACTOR,
        [commonLocators.CommonKeys.INDEX]:CONTAINERS_PACKAGE.ESTIMATE_SCOPE_INDEX,
        [commonLocators.CommonKeys.RADIO_INDEX]:CONTAINERS_PACKAGE.BUDGET_FROM_INDEX
    }
    RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
       
      }
    
    UPDATE_ESTIMATE_PARAMETER={
        [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_ESTIMATE_WIZARD
      }
   
    });
cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
_common.openDesktopTile(tile.DesktopTiles.PROJECT);
_common.waitForLoaderToDisappear()


});

after(() => {
  cy.LOGOUT();
});

it("TC - Create new estimate having line item and material resource to it", function () {
  
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

  _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
    });
    
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
  

    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()

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

it("TC - Add Resource for selected line item", function () {
   
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
  });
  _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
  _common.create_newRecord(cnt.uuid.RESOURCES);
  _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
   cy.SAVE();
  _common.waitForLoaderToDisappear()
   
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.waitForLoaderToDisappear()
    _common.select_allContainerData(cnt.uuid.RESOURCES);
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC);
    _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
    cy.REFRESH_CONTAINER()
  
});

it("TC - Create Material Package from Estimate", function () {
   
  
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreatePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE);
        cy.SAVE();
    _common.waitForLoaderToDisappear()
   

    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
      _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
  })
  _common.waitForLoaderToDisappear()
  _common.saveCellDataToEnv(cnt.uuid.PACKAGE,app.GridCells.CODE,"PackageCode")

    _common.openTab(app.TabBar.PACKAGE).then(() =>{
    _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.PACKAGEITEMS,2);
   _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEM)
      });
    _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS);
    _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
    _common.create_newRecord(cnt.uuid.PACKAGEITEMS);
    _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PACKAGE_ITEM.MATERIAL_NO)
    _common.edit_containerCell(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PACKAGE_ITEM.QUANTITY)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.wait(2000);//required wait
    _common.select_allContainerData(cnt.uuid.PACKAGEITEMS)
    _common.waitForLoaderToDisappear()
    _common.perform_additionOfCellData(cnt.uuid.PACKAGEITEMS,app.GridCells.TOTAL);
    _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_ESTIMATE);
    _common.waitForLoaderToDisappear()
  
    
    _estimatePage.openModalContainerByDownArrow();
    _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER);
    _common.waitForLoaderToDisappear()
    cy.wait(1000)//required wait
    _modalView.findModal().acceptButton(btn.ButtonText.OK);
    cy.SAVE();
    cy.REFRESH_CONTAINER();
    _common.waitForLoaderToDisappear()
   
});

it("TC - Get Estimate Line Items Cost Total by generating budget", function () {

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

  _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);            
  }); 
  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
  _common.waitForLoaderToDisappear()

  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);            
  });        
  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
  _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
  _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE,app.GridCells.DESCRIPTION_INFO,ESTIMATE_DESCRIPTION,EST_HEADER)
  _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
  _common.waitForLoaderToDisappear()
  _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);            
});
  _common.waitForLoaderToDisappear()
  _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
   
});

it("TC - Verify Package Item Total with Package Total net value ", function () {

  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
  

  _common.waitForLoaderToDisappear()
  _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
  _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO);
  _common.openTab(app.TabBar.PACKAGE).then(() =>{
    _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 2);
}) 
_common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PackageCode"))  


  _common.openTab(app.TabBar.PACKAGE).then(() =>{
      _common.select_tabFromFooter(cnt.uuid.TOTALS,app.FooterTab.TOTAL,3);
  });
  _common.clickOn_cellHasUniqueValue(cnt.uuid.TOTALS,app.GridCells.TOTAL_TYPE_FK,CONTAINERS_RESOURCE.TOTALTYPE)
    
    _common.assert_forNumericValues(cnt.uuid.TOTALS,app.GridCells.VALUE_NET,Cypress.env("AdditionOfColumnValues").toString())
 
  });
});
















