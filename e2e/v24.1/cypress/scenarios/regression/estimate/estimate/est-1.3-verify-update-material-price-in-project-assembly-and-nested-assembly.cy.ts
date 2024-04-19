import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _assembliesPage, _projectPage } from "cypress/pages";
import { app, tile, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";
const ALLURE = Cypress.Allure.reporter.getInterface();

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.3 | Verify update material price in project assembly and nested assembly")

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const LIST_PRICE:any=Cypress._.random(1, 10);
const RETAIL_PRICE:any=Cypress._.random(1, 10);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;

let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

// let CONTAINERS_MATERIAL_RECORDS
let CONTAINER_COLUMNS_MATERIAL_RECORDS

let CONTAINERS_ASSEMBLIES_CATEGORIES;
let CONTAINER_COLUMNS_ASSEMBLIES_CATEGORIES;

let CONTAINER_COLUMNS_ASSEMBLIES;

let CONTAINERS_ASSEMBLY_RESOURCES;
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCES;

let RECALCULATE_ASSEMBLIES_PARAMETERS:DataCells
let MODAL_RECALCULATE_ASSEMBLIES;

let MODAL_UPDATE_SETTING;

let RECALCULATE_PROJECT_ASSEMBLIES_PARAMETERS:DataCells

let UPDATE_ESTIMATE_PARAMETER:DataCells
let MODAL_UPDATE_ESTIMATE_WIZARD;

let MODAL_UPDATE_MATERIAL_PRICES;
let UPDATE_MATERIAL_PRICE_PARAMETER:DataCells
let MODAL_UP_MATERIAL_CODE
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS


describe("EST- 1.3 | Verify update material price in project assembly and nested assembly", () => {
    
    before(function () {
        cy.fixture("estimate/est-1.3-verify-update-material-price-in-project-assembly-and-nested-assembly.json")
          .then((data) => {
            this.data = data

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			      CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                        [app.GridCells.CODE]: ESTIMATE_CODE,
                        [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                        [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                        [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                        [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                        [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                        [app.GridCells.EST_ASSEMBLY_FK]: CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE
            };
            
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            
            //CONTAINERS_MATERIAL_RECORDS=this.data.CONTAINERS.MATERIAL_RECORDS
            CONTAINER_COLUMNS_MATERIAL_RECORDS=this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS

            CONTAINER_COLUMNS_ASSEMBLIES_CATEGORIES=this.data.CONTAINER_COLUMNS.ASSEMBLIES_CATEGORIES
            CONTAINERS_ASSEMBLIES_CATEGORIES=this.data.CONTAINERS.ASSEMBLIES_CATEGORIES
      
            CONTAINER_COLUMNS_ASSEMBLIES=this.data.CONTAINER_COLUMNS.ASSEMBLIES
      
            CONTAINERS_ASSEMBLY_RESOURCES=this.data.CONTAINERS.ASSEMBLY_RESOURCES
            CONTAINER_COLUMNS_ASSEMBLY_RESOURCES=this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCES
      
            MODAL_RECALCULATE_ASSEMBLIES=this.data.MODAL.RECALCULATE_ASSEMBLIES
            MODAL_UPDATE_SETTING=this.data.MODAL.UPDATE_SETTING
            
            RECALCULATE_ASSEMBLIES_PARAMETERS={
              [commonLocators.CommonKeys.RADIO]:MODAL_RECALCULATE_ASSEMBLIES.SELECT_UPDATE_SCOPE,
              [commonLocators.CommonKeys.RADIO_INDEX]:2,
              [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_SETTING
            }
      
            RECALCULATE_PROJECT_ASSEMBLIES_PARAMETERS={
              [commonLocators.CommonKeys.RADIO]:MODAL_RECALCULATE_ASSEMBLIES.SELECT_UPDATE_SCOPE,
              [commonLocators.CommonKeys.RADIO_INDEX]:2
            }
      
            MODAL_UPDATE_ESTIMATE_WIZARD=this.data.MODAL.UPDATE_ESTIMATE_WIZARD
      
            UPDATE_ESTIMATE_PARAMETER={
              [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_ESTIMATE_WIZARD
            }

            MODAL_UP_MATERIAL_CODE=this.data.MODAL.UP_MATERIAL_CODE
            MODAL_UPDATE_MATERIAL_PRICES= this.data.MODAL.UPDATE_MATERIAL_PRICES

            UPDATE_MATERIAL_PRICE_PARAMETER={
              [commonLocators.CommonKeys.RADIO]:MODAL_UPDATE_MATERIAL_PRICES.UPDATE_MATERIAL_PRICES_FROM_MATERIAL_CATALOG,
              [commonLocators.CommonKeys.RADIO_INDEX]:0,
              [app.GridCells.UP_MATERIAL_CODE]:MODAL_UP_MATERIAL_CODE,
            }

            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

        }).then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
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
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        })

        
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create new estimate record', function () {
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATE)
        _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    });

    it("TC - Create new line item record", function () {
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()
    
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
        _common.waitForLoaderToDisappear()
        _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.estassemblyfk],cnt.uuid.ESTIMATE_LINEITEMS)
      });
      _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
      _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    });

    it("TC - Create new record in resource and add retail,list price to material", function () {
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
      });
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
      _common.search_inSubContainer(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE);
      _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE)
      _common.goToButton_inActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE,btn.IconButtons.ICO_MATERIALS)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.RECORDS).then(() => {
          _common.setDefaultView(app.TabBar.RECORDS)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 1);
          _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
      });

      _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
      _common.select_rowHasValue(cnt.uuid.MATERIAL_RECORDS,CONTAINERS_RESOURCE.CODE)
      _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
      _common.waitForLoaderToDisappear()
      _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT,RETAIL_PRICE.toString())
      _common.waitForLoaderToDisappear()
      _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, LIST_PRICE.toString())
      _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
    });

    it("TC - Verify Update material price from material", function () {

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
      _common.waitForLoaderToDisappear()
    
      _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
        _common.setDefaultView(app.TabBar.ASSEMBLIES,commonLocators.CommonKeys.DEFAULT)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLY_CATEGORIES, 0);
        _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES,CONTAINER_COLUMNS_ASSEMBLIES_CATEGORIES)
      });
      _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
      _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
      _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,CONTAINERS_ASSEMBLIES_CATEGORIES.CODE)
      _common.select_rowHasValue(cnt.uuid.ASSEMBLY_CATEGORIES,CONTAINERS_ASSEMBLIES_CATEGORIES.CODE)
      _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
      _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
    
    
      _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,CONTAINER_COLUMNS_ASSEMBLIES)
      });
      _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
      _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
      _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE)
      _common.select_rowHasValue(cnt.uuid.ASSEMBLIES,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE)
      _common.minimizeContainer(cnt.uuid.ASSEMBLIES)
    
      _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,CONTAINER_COLUMNS_ASSEMBLY_RESOURCES)
      });
      _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    
      _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
      _common.search_inSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,CONTAINERS_RESOURCE.CODE)
      _common.select_rowHasValue(cnt.uuid.ASSEMBLY_RESOURCE,CONTAINERS_RESOURCE.CODE)

      _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.RECALCULATE_ASSEMBLIES)
      _common.waitForLoaderToDisappear()
      _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      cy.wait(1000)
      _common.assert_forNumericValues(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT, LIST_PRICE.toString())

    });

    it("TC - Recalculate project assembly", function () {

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
    
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
        _common.setup_gridLayout(cnt.uuid.ASSEMBLY,CONTAINER_COLUMNS_ASSEMBLIES)
      });
      _common.maximizeContainer(cnt.uuid.ASSEMBLY)
      _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY)
      _common.search_inSubContainer(cnt.uuid.ASSEMBLY,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE)
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.ASSEMBLY,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE)
      _common.minimizeContainer(cnt.uuid.ASSEMBLY)
    
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
        _common.setup_gridLayout(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINER_COLUMNS_ASSEMBLY_RESOURCES)
      });
      _common.maximizeContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
      _common.clear_subContainerFilter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
      _common.select_allContainerData(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
      _common.clickOn_toolbarButton(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
      _common.minimizeContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
    
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.RECALCULATE_PROJECT_ASSEMBLY);
      _common.waitForLoaderToDisappear()
      _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_PROJECT_ASSEMBLIES_PARAMETERS)
    
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
      });
      _common.maximizeContainer(cnt.uuid.ASSEMBLY)
      _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY)
      _common.search_inSubContainer(cnt.uuid.ASSEMBLY,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE)
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.select_rowHasValue(cnt.uuid.ASSEMBLY,CONTAINERS_LINE_ITEM.ASSEMBLY_TEMPLATE)
      _common.minimizeContainer(cnt.uuid.ASSEMBLY)
    
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
      });
      _common.maximizeContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
      _common.clear_subContainerFilter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
      _common.select_allContainerData(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
      _common.clickOn_toolbarButton(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
      _common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINERS_RESOURCE.CODE)
      _common.select_rowHasValue(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINERS_RESOURCE.CODE)
      _common.minimizeContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
    });

    it("TC - Update material price", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_MATERIAL_PRICES);
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      _assembliesPage.update_materialPrices_fromWizard(UPDATE_MATERIAL_PRICE_PARAMETER)
    });

    it("TC - Verify updated price in resources container", function () {
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE,2);
      });
      _common.waitForLoaderToDisappear()
      _common.filterCurrentEstimate(cnt.uuid.ESTIMATE,commonLocators.CommonKeys.NO_FILTER)
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
      _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
      _common.select_rowHasValue(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)

      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_ESTIMATE);
      _common.waitForLoaderToDisappear()
      _estimatePage.update_estimate_fromWizard(UPDATE_ESTIMATE_PARAMETER)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
      });
      _common.maximizeContainer(cnt.uuid.RESOURCES)
      _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
      _common.select_allContainerData(cnt.uuid.RESOURCES)
      _common.clickOn_toolbarButton(cnt.uuid.RESOURCES,btn.ToolBar.ICO_TREE_EXPAND_ALL)
      _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.CODE)
      _common.waitForLoaderToDisappear()
      _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,LIST_PRICE.toString());
    });
})