import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _estimatePage, _sidebar,_mainView, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PKG_DESC= "PACKAGE_DESC-"+ Cypress._.random(0, 999);
const EST_CODE= "EST_CODE-"+ Cypress._.random(0, 999);
const EST_DESC= "EST_DESC-"+ Cypress._.random(0, 999);
const LI_DESC= "LI_DESC-"+ Cypress._.random(0, 999);
var packageCode:string
var costUnit:string

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_LINE_ITEM;

let RESOURCE_PARAMETERS: DataCells;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let MODAL_UPDATE_MATERIAL_PACKAGE;
let CONTAINERS_PACKAGE_ITEM
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE_ITEM;
let CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT;


ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.134 | Generate material items belonging to selected package-Manual package creation ");

describe("PCM- 2.134 | Generate material items belonging to selected package-Manual package creation", () => {
    before(() => {
        cy.preLoading(
        Cypress.env("adminUserName"),
        Cypress.env("adminPassword"),         
        Cypress.env("parentCompanyName"),
        Cypress.env("childCompanyName")
        );        
        cy.fixture("pcm/pcm-2.134-generate-material-items-belonging-to-selected-package-manual-package-creation.json").then(function (data){
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
          CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
          CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
          RESOURCE_PARAMETERS = {
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
            [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
            [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY
          }
          MODAL_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.UPDATE_MATERIAL_PACKAGE
          CONTAINERS_PACKAGE_ITEM=this.data.CONTAINERS.PACKAGE_ITEM
          CONTAINER_COLUMNS_PACKAGE= this.data.CONTAINER_COLUMNS.PACKAGE
          CONTAINER_COLUMNS_PACKAGE_ITEM=this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
          CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT=this.data.CONTAINER_COLUMNS.PACKAGE_ITEM_ASSIGNMENT
          
          /* Open desktop should be called in before block */
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);          
        });
    });   
    after(() => {
		cy.LOGOUT();
	});
    it("TC- Create material package manually and add resource to it",function(){              
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PACKAGE)         
        _common.openTab(app.TabBar.PACKAGE).then(()=>{
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)            
        });        
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(MODAL_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,PKG_DESC)
        _common.waitForLoaderToDisappear() 
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PACKAGE,app.GridCells.CODE).then(($value)=>{
            packageCode = $value.text()
            cy.log(packageCode)
        })        
        _common.openTab(app.TabBar.PACKAGE).then(()=>{
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,1)
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS,CONTAINER_COLUMNS_PACKAGE_ITEM)
            _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        });
        cy.REFRESH_CONTAINER()
        _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        //_package.assingItems_ByMaterialNumber(CONTAINERS_PACKAGE_ITEM.quantity,CONTAINERS_PACKAGE_ITEM.materialNo)
        _common.enterRecord_inNewRow(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PACKAGE_ITEM.QUANTITY)
        _common.clickOn_activeRowCell(cnt.uuid.PACKAGEITEMS,app.GridCells.MDC_MATERIAL_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PACKAGE_ITEM.MATERIAL_NO)
        _common.clickOn_activeRowCell(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
        
        
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
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
         cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT).then(($value)=>{
            costUnit = $value.text()
            cy.log(costUnit)
        })        
        cy.SAVE();
        _common.minimizeContainer(cnt.uuid.RESOURCES) 
    })
    it("TC- Verify create record in Package item assignment",function(){        
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
            _common.setup_gridLayout(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT);           
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)       
        _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,app.GridCells.PRC_PACKAGE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,packageCode)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,app.GridCells.EST_RESOURCE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_RESOURCE.CODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()       
        _common.minimizeContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
    })
    it("TC- Verify update material package",function(){            
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_MATERIAL_PACKAGE_S)
        _package.enter_recordUpdate_Material_package(MODAL_UPDATE_MATERIAL_PACKAGE.ESTIMATE_SCOPE,MODAL_UPDATE_MATERIAL_PACKAGE.ESTIMATE_SCOPE_OPTION,MODAL_UPDATE_MATERIAL_PACKAGE.PKG_OPTION,MODAL_UPDATE_MATERIAL_PACKAGE.PKG_OPTION_VALUE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        
    })
    it("TC- Verify Quantity and Price in resource",function(){         
        
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PACKAGE)
        _common.waitForLoaderToDisappear() 
         cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.PACKAGE).then(()=>{            
            _common.select_tabFromFooter(cnt.uuid.PACKAGE,app.FooterTab.PACKAGE,0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE,CONTAINER_COLUMNS_PACKAGE)
        });
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.PACKAGE,packageCode)
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PACKAGE,packageCode)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.PACKAGE).then(()=>{            
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS,app.FooterTab.ITEMS,1)
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS,CONTAINER_COLUMNS_PACKAGE_ITEM)
        });
        _common.search_inSubContainer(cnt.uuid.PACKAGEITEMS,CONTAINERS_RESOURCE.CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGEITEMS,app.GridCells.QUANTITY_SMALL,CONTAINERS_RESOURCE.QUANTITY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGEITEMS, app.GridCells.PRICE,costUnit)        
        
    })
    
})