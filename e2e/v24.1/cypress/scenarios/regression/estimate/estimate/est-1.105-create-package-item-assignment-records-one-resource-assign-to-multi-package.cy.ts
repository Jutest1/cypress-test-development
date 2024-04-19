import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _estimatePage, _sidebar,_mainView, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


const allure = Cypress.Allure.reporter.getInterface();
const PKG_DESC= "PACKAGE_DESC-"+ Cypress._.random(0, 999);
const PKG_DESC_2= "PACKAGE_DESC-"+ Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LI_DESC" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
var packageCode1:string
var packageCode2:string
var costCode_total:string
var material_total:string
var assembly_total:string
var expResult:any
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let RESOURCE_PARAMETERS: DataCells
let RESOURCE_2_PARAMETERS: DataCells
let RESOURCE_3_PARAMETERS: DataCells
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM;
let CONTAINERS_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE;
let CONTAINER_COLUMNS_PACKAGE_ITEM;
let CONTAINERS_PACKAGE_ITEM
let CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT;
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.105 | Create package item assignment records: One resource assign to multi-package");

describe("EST- 1.105 | Create package item assignment records: One resource assign to multi-package", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-1.105-create-package-item-assignment-records-one-resource-assign-to-multi-package.json").then((data) => {
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
        cy.fixture("estimate/est-1.105-create-package-item-assignment-records-one-resource-assign-to-multi-package.json").then(function (data){
          this.data = data;
          CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
          CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
          RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
          };
          RESOURCE_2_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_2,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.MATERIAL_CODE,
          };
          RESOURCE_3_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_3,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.ASSEMBY_CODE,
          };
          CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
          CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM

          LINE_ITEM_PARAMETERS = {
              [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
              [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_LINE_ITEM.QUANTITY

          };

          CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
          CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
          ESTIMATE_PARAMETERS = {
              [app.GridCells.CODE]: ESTIMATE_CODE,
              [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
          }
          CONTAINERS_PACKAGE = this.data.CONTAINERS.PACKAGE
          CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
          CONTAINER_COLUMNS_PACKAGE_ITEM = this.data.CONTAINER_COLUMNS.PACKAGE_ITEM
          CONTAINERS_PACKAGE_ITEM = this.data.CONTAINERS.PACKAGE_ITEM
          CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT= this.data.CONTAINER_COLUMNS.PACKAGE_ITEM_ASSIGNMENT
          /* Open desktop should be called in before block */
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.waitForLoaderToDisappear()
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
    });   
    
    });

    after(() => {
		cy.LOGOUT();
	});

    it("TC- Create 1st material package manually and add resource to it",function(){
   
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE);
        })
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(CONTAINERS_PACKAGE.CONFIGURATION, PKG_DESC)
        cy.SAVE()   
        _common.getText_fromCell(cnt.uuid.PACKAGE,app.GridCells.CODE).then(($value)=>{
            packageCode1 = $value.text()            
        })        
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_PACKAGE_ITEM)
            _common.waitForLoaderToDisappear()
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        })
      
        _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.waitForLoaderToDisappear()
        _package.assingItems_ByMaterialNumber( CONTAINERS_PACKAGE_ITEM.QUANTITY,CONTAINERS_PACKAGE_ITEM.MATERIAL_NO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
    })

    it("TC- Create 2nd material package manually and add resource to it",function(){         
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })

        _common.create_newRecord(cnt.uuid.PACKAGE)
        _common.waitForLoaderToDisappear()
        _package.enterRecord_toCreatePackage(CONTAINERS_PACKAGE.CONFIGURATION, PKG_DESC_2)
        cy.SAVE()     
        _common.waitForLoaderToDisappear()
        cy.wait(1000)     
        _common.getText_fromCell(cnt.uuid.PACKAGE,app.GridCells.CODE).then(($value)=>{
            packageCode2 = $value.text()           
        })        
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.PACKAGEITEMS)
        })
        _common.maximizeContainer(cnt.uuid.PACKAGEITEMS)
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.waitForLoaderToDisappear()
        _package.assingItems_ByMaterialNumber( CONTAINERS_PACKAGE_ITEM.QUANTITY_2,CONTAINERS_PACKAGE_ITEM.MATERIAL_NO_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PACKAGEITEMS)
        
        
    })

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create line item with assembly", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Create resources for line item", function () {
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()

        _common.getText_fromCell(cnt.uuid.RESOURCES,app.GridCells.COST_TOTAL).then(($value2)=>{
            costCode_total= $value2.text()
        }) 
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_2_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()

        _common.getText_fromCell(cnt.uuid.RESOURCES,app.GridCells.COST_TOTAL).then(($value2)=>{
            material_total= $value2.text()
        })   
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_3_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()

        _common.getText_fromCell(cnt.uuid.RESOURCES,app.GridCells.COST_TOTAL).then(($value3)=>{
            assembly_total= $value3.text()
        }) 
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    })

    it("TC - Verify Cost Total in line item", function () {
        expResult = parseFloat(costCode_total.replace(",", "")) + parseFloat(material_total.replace(",", "")) + parseFloat(assembly_total.replace(",", ""))
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_TOTAL, expResult.toFixed(2))
    })

    it("TC - Verify create record in Package item assignment",function(){
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.FooterTab.PACKAGE_ITEM_ASSIGNMENT, 2);
            _common.setup_gridLayout(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, CONTAINER_COLUMNS_PACKAGE_ITEM_ASSIGNMENT);
            _common.clear_subContainerFilter(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        });      
        _common.maximizeContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        cy.wait(100)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,app.GridCells.PRC_PACKAGE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,packageCode2)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, commonLocators.CommonKeys.GRID,CONTAINERS_RESOURCE.CODE_DESC)     
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        cy.wait(100)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,app.GridCells.PRC_PACKAGE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,packageCode2)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, commonLocators.CommonKeys.GRID,CONTAINERS_RESOURCE.CODE_DESC)     
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _validate.verify_isCertificateTypeUniqueAndMandatory(CONTAINERS_RESOURCE.MASSAGE)
        cy.wait(1000)
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        _common.delete_recordFromContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.create_newRecord(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK, commonLocators.CommonKeys.GRID,CONTAINERS_RESOURCE.CODE_DESC)     
        _common.clickOn_activeRowCell(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.EST_RESOURCE_FK)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT, app.GridCells.PRC_PACKAGE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, packageCode1)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.search_inSubContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,packageCode1)
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,app.GridCells.EST_RESOURCE_FK,CONTAINERS_RESOURCE.CODE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,packageCode2)
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT,app.GridCells.EST_RESOURCE_FK,CONTAINERS_RESOURCE.CODE)
        _common.minimizeContainer(cnt.uuid.PACKAGE_ITEM_ASSIGNMENT) 
    })
})