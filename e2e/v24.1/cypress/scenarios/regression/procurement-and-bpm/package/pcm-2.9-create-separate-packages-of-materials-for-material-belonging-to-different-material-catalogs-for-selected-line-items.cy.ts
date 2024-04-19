import { _common,  _sidebar, _rfqPage,_materialPage,_projectPage,_mainView, _package,_validate,_estimatePage, _modalView } from 'cypress/pages';
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

let ESTIMATE_PARAMETERS: DataCells;
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
let CONTAINER_COLUMNS_TOTALS;
let CONTAINER_COLUMNS_PACKAGE

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
var ContractCode:string

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.9 | Create separate packages of materials for material belonging to different material catalogs for selected lineitems");
describe("PCM- 2.9 | Create separate packages of materials for material belonging to different material catalogs for selected lineitems", () => {
      before(function () {
        cy.fixture('pcm/pcm-2.9-create-separate-packages-of-materials-for-material-belonging-to-different-material-catalogs-for-selected-line-items.json').then((data) => {
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
                [app.GridCells.CODE]:CONTAINERS_RESOURCE.CODE1,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY
              }
              RESOURCE_PARAMETERS1 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY1
              }
             
        });
    
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
  });
  after(() => {
		cy.LOGOUT();
	});

  it("TC - Create new project", function () { 
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

  });
  
  it("TC - Create new estimate", function () {
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
  it("TC - Create new line item with quantity", function () {
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
  it("TC - Assign resource to the line item", function () {
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
    
    _common.create_newRecord(cnt.uuid.RESOURCES)
   
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS1);
     cy.SAVE();
     _common.waitForLoaderToDisappear()
  });
  it("TC - Create material package", function () {
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION)
    _common.getTextfromCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL);
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINE_ITEM_DESCRIPTION1)
    _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("COST_TOTAL_EST_2", $ele1.text())
    })

    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE);
    _common.waitForLoaderToDisappear()
     _estimatePage.enterRecord_toCreateMultiplePackage_wizard(commonLocators.CommonKeys.MATERIAL_AND_COST_CODE,CONTAINERS_RESOURCE.CODE,CONTAINERS_RESOURCE.CODE1);
     cy.SAVE();
     _common.waitForLoaderToDisappear()
  });
  it("TC - Verify the first package with material catalog number ", function () {

    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)

      _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.setDefaultView(app.TabBar.PACKAGE)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      });
      _common.search_inSubContainer(cnt.uuid.PACKAGE, CONTAINERS_RESOURCE.DESC)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
        });
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
      _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE)
      _common.waitForLoaderToDisappear()
  }); 
  it("TC - Verify the second package with material catalog number ", function () {
      
    _common.openTab(app.TabBar.PACKAGE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
      });
      _common.search_inSubContainer(cnt.uuid.PACKAGE, CONTAINERS_RESOURCE.DESC1)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PACKAGE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
        });
      _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
      _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE1)
      _common.waitForLoaderToDisappear()
  });

});
