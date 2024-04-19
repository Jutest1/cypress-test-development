import { randomNo } from "cypress/commands/integration";
import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import AppLayout from "cypress/locators/app-layout";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _mainView, _modalView, _package, _projectPage, _validate } from "cypress/pages";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = "1" + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION1 = "LINE_ITEM-DESC-" + Cypress._.random(0, 999);


let ESTIMATE_PARAMETERS: DataCells;
let RESOURCE_PARAMETERS: DataCells;
let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_RESOURCE;
let CONTAINERS_LINE_ITEM;
let RESOURCE_2_PARAMETERS:DataCells;
let MODAL_UPDATE_MATERIAL_PACKAGE;
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE;


ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.17 | Add a resource (Material & cost code) item to existing material Package from Estimate for selected line item through 'update material package' Wizard");
describe("PCM- 2.17 |  Add a resource (Material & cost code) item to existing material Package from Estimate for selected line item through 'update material package' Wizard", () => {
 

  before(function () {
    cy.preLoading(
      Cypress.env("adminUserName"),
      Cypress.env("adminPassword"),
      Cypress.env("parentCompanyName"),
      Cypress.env("childCompanyName")
    );

    cy.fixture("procurement-and-bpm/pcm-2.17-add-resource-package-to-exesting-material-package.json").then((data) => {
      this.data = data;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEMS
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      ESTIMATE_PARAMETERS = {
        [app.GridCells.CODE]: ESTIMATE_CODE,
        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
      }
      CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
      LINE_ITEM_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,        
      };

      CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE

      CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
      };
      RESOURCE_2_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE,
      }; 
      MODAL_UPDATE_MATERIAL_PACKAGE =this.data.MODAL.UPDATE_MATERIAL_PACKAGE
      MODAL_CREATE_UPDATE_MATERIAL_PACKAGE= this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE 
     
      /* Open desktop should be called in before block */
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);      
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();      
    });
  });
  it("TC - Create Estimate Header", function () {
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
  })
  
  it("TC - Create new line item record", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });
  it("TC - Create new record in resource for material", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });
    cy.wait(1000)// REQUIRED WAIT TO PASS THE TEST
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _common.waitForLoaderToDisappear()
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.COST_TOTAL,"FINAL_PRICE")
  });
  it('TC - Create material package include cost code checkbox using wizard', function () {   
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
    _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE)
    _common.waitForLoaderToDisappear()
  });
  it('TC - Verify and Update material package', function () {   
    _common.openTab(app.TabBar.PACKAGE).then(()=>{
      _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS)      
    })
    _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS, CONTAINERS_RESOURCE.CODE)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    cy.wait(1000)//Wait required
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    _common.openTab(app.TabBar.ESTIMATE).then(() => {    
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);      
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE, ESTIMATE_DESCRIPTION)
    _common.waitForLoaderToDisappear()    
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
    cy.wait(1000)// required wait
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_DESCRIPTION)
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
    });   
    _common.select_dataFromSubContainer(cnt.uuid.RESOURCES, CONTAINERS_RESOURCE.CODE)
    _common.edit_containerCell(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY)
    cy.SAVE();
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_MATERIAL_PACKAGE_S)
   _package.enter_recordUpdate_Material_package(MODAL_UPDATE_MATERIAL_PACKAGE.SELECTED_CHECKBOX,MODAL_UPDATE_MATERIAL_PACKAGE.SELECTED_CHECKBOX_ID,MODAL_UPDATE_MATERIAL_PACKAGE.SELECT_PKG_OPTION1,MODAL_UPDATE_MATERIAL_PACKAGE.SELECT_PKG_VALUE1)
   
  });
  it("TC - Create second record in resource for material", function () {   
    
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_2_PARAMETERS);
    _common.edit_containerCell(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.QUANTITY2)
    cy.SAVE();
    cy.wait(1000)//required wait
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
           .search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_MATERIAL_PACKAGE_S)
    _package.enter_recordUpdate_Material_package(MODAL_UPDATE_MATERIAL_PACKAGE.SELECTED_CHECKBOX,MODAL_UPDATE_MATERIAL_PACKAGE.SELECTED_CHECKBOX_ID,MODAL_UPDATE_MATERIAL_PACKAGE.SELECT_PKG_OPTION2,MODAL_UPDATE_MATERIAL_PACKAGE.SELECT_PKG_VALUE2)
    _common.select_dataFromSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION1 )
    _package.verify_Totals_from_package_to_Estimate_Totals(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.GRAND_TOTAL,sidebar.SideBarOptions.PACKAGE,cnt.uuid.PACKAGEITEMS,app.GridCells.TOTAL,CONTAINERS_RESOURCE.MATERIAL_CODE)

  });
  it("TC - Verify package total and estimate cost total", function () {    
    _package.verify_Totals_from_package_to_Estimate_Totals(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.GRAND_TOTAL,sidebar.SideBarOptions.PACKAGE,cnt.uuid.PACKAGEITEMS,app.GridCells.TOTAL,CONTAINERS_RESOURCE.CODE)
  });
  after(() => {
		cy.LOGOUT();
	});
})