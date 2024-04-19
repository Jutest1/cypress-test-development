import { _common, _estimatePage, _validate,  _modalView, _assembliesPage, _projectPage } from "cypress/pages";
import { tile, app, cnt,sidebar, btn,commonLocators } from "cypress/locators";
import _ from "cypress/types/lodash";

import { DataCells } from 'cypress/pages/interfaces';
import common from "mocha/lib/interfaces/common";
const allure = Cypress.Allure.reporter.getInterface();

const ASSEMBLY_DESC="A-DESC-" + Cypress._.random(0, 999)
const ASSEMBLYCATAGORY_DESC="A-DESC-" + Cypress._.random(0, 999);


const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);


let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS:DataCells;
let ASSEMBLIES_PARAMETERS:DataCells
let RECALCULATE_ASSEMBLIES_PARAMETERS:DataCells


let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINERS_ASSEMBLY_RESOURCE;
let CONTAINERS_RECALCULATE_ASSEMBLY


let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE
let CONTAINER_COLUMNS_COST_CODE;
let CONTAINER_COLUMNS_COST_CODE_JOBRATE;
let CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.88 | Part-1 Update project assembly with highlighted assembly option ")

describe('EST- 1.88 | Part-1 Update project assembly with highlighted assembly option', () => {
        before(function () {
            cy.fixture('estimate/est-1.88-Update_project_assembly_with_highlight_option.json')
              .then((data) => {
                this.data=data
                
                CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
                CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
                CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
                CONTAINERS_ASSEMBLY_RESOURCE = this.data.CONTAINERS.ASSEMBLY_RESOURCE;
                CONTAINERS_RECALCULATE_ASSEMBLY = this.data.MODAL.RECALCULATE_ASSEMBLY;
               
                CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
                CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
                CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
                CONTAINER_COLUMNS_ASSEMBLY_RESOURCE=this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
                CONTAINER_COLUMNS_COST_CODE=this.data.CONTAINER_COLUMNS.COST_CODE
                CONTAINER_COLUMNS_COST_CODE_JOBRATE=this.data.CONTAINER_COLUMNS.COST_CODE_JOBRATE
                CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE=this.data.CONTAINER_COLUMNS.PROJECT_ASSEMBLY_RESOURCE
                
                ESTIMATE_PARAMETERS = {
                    [app.GridCells.CODE]: ESTIMATE_CODE,
                    [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                    [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                    [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
                }
            
                LINE_ITEMS_PARAMETERS={
                    [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                    [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY1,
                    [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
                }
    
                RESOURCE_PARAMETERS={
                    [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                    [app.GridCells.CODE]: ASSEMBLY_DESC
                }

                RECALCULATE_ASSEMBLIES_PARAMETERS={
                    [commonLocators.CommonKeys.RADIO]: CONTAINERS_RECALCULATE_ASSEMBLY.SCOPE,
                    [commonLocators.CommonKeys.RADIO_INDEX]:0
                }

                ASSEMBLIES_PARAMETERS={
                    [app.GridCells.DESCRIPTION_INFO]: ASSEMBLY_DESC,
                }
    
              })
              .then(()=>{
                cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.waitForLoaderToDisappear()
                _common.openTab(app.TabBar.PROJECT).then(() => {
                    _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
                  
                });
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
      })
        });
    
        after(() => {
            cy.LOGOUT();
        });

    it('TC - Prerequisistes - customizing UDP-1-5', function () {
       

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CUSTOMIZING)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES,app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ENTITY_TYPES)
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,"User Defined Cost Columns")
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.INSTANCES,app.GridCells.IS_LIVE,commonLocators.CommonKeys.CHECK)
    });

    it('TC - Add assembly resource in assemblies module', function () {
    
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
      
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
           
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLYCATAGORY_DESC) 
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLYCATAGORY_DESC)
        _common.clickOn_cellInSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO)
        _common.toggle_radioFiledInContainer(commonLocators.CommonKeys.SELECT_RADIO_BUTTON,cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES,ASSEMBLIES_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.quantity,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.quantityfactor1,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.productivityfactor,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.efficiencyfactor1,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.costfactorcc,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.costfactor1],cnt.uuid.ASSEMBLY_RESOURCE)

        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,commonLocators.CommonKeys.GRID,CONTAINERS_ASSEMBLY_RESOURCE.RESOURCE_TYPE1)
        _common.clickOn_cellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_RESOURCE.CODE1)
        _common.clickOn_cellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.QUANTITY_FACTOR_1)
        _common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.QUANTITY_FACTOR_1,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)

       
       
        _common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)
        _common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.PRODUCTIVITY_FACTOR,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)
        _common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EFFICIENCY_FACTOR_1,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)
        _common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_FACTOR_1,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)
        _common.clickOn_cellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,commonLocators.CommonKeys.GRID,CONTAINERS_ASSEMBLY_RESOURCE.RESOURCE_TYPE2)
        _common.clickOn_cellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_RESOURCE.CODE2)
        _common.clickOn_cellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE) 

    })

    it("TC - Create estimate header", function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);

        });
        _common.search_inSubContainer(cnt.uuid.ESTIMATE, " ")
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
         cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)

    })

    it("TC - Create new line item record and assign resource", function () {
       
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        });
      
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
           
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
    
    });

    it('TC - Update Project assembly in project and verify changes from assemblies are reflected in project', function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
          
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.waitForLoaderToDisappear()

         _common.openTab(app.TabBar.PROJECT).then(() => {
             _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
           
         });
         
         cy.wait(1000)//required wait 
         _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY)
         _common.search_inSubContainer(cnt.uuid.ASSEMBLY,ASSEMBLY_DESC)
         _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
        
         _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
         _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY)
         _common.waitForLoaderToDisappear()

         _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
        


        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
            _common.setup_gridLayout(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE.costunit,CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE.quantityfactor1,CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE.efficiencyfactor1,CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE.productivityfactor,CONTAINER_COLUMNS_PROJECT_ASSEMBLY_RESOURCE.costfactor1],cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
        });

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
          
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
        });
        _common.maximizeContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION1)
        _common.getText_fromCell(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.GridCells.COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CostUnitOriginal", $ele1.text())
            }) 
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.QUANTITY_FACTOR_1,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.QUANTITY_SMALL,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.PRODUCTIVITY_FACTOR,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.EFFICIENCY_FACTOR_1,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.COST_FACTOR_1,CONTAINERS_ASSEMBLY_RESOURCE.QUANTITY_FACTOR)
        _common.minimizeContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)

        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
          
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
        _common.search_inSubContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINERS_ASSEMBLY_RESOURCE.CODE2)
        _common.select_rowInContainer(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION2)
       
    })


    
    it('TC - Check IsRate and update Rate(Project) in cost code job rates and verify in assembly resources in project', function () {
       
         _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESINPROJECT, app.FooterTab.COSTCODES, 1);  
            _common.setup_gridLayout(cnt.uuid.COSTCODESINPROJECT,CONTAINER_COLUMNS_COST_CODE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODE.israte],cnt.uuid.COSTCODESINPROJECT)
        });

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COST_CODE_JOB_RATE, 1);  
            _common.setup_gridLayout(cnt.uuid.COSTCODESJOBRATE,CONTAINER_COLUMNS_COST_CODE_JOBRATE )
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODE_JOBRATE.rate],cnt.uuid.COSTCODESJOBRATE) 
        });

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESINPROJECT, app.FooterTab.COSTCODES, 1);  
        });
        _common.clear_subContainerFilter(cnt.uuid.COSTCODESINPROJECT)
        _common.search_inSubContainer(cnt.uuid.COSTCODESINPROJECT,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COSTCODESINPROJECT,app.GridCells.DESCRIPTION,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION1)
        cy.wait(1000)//required wait
        _common.set_cellCheckboxValue(cnt.uuid.COSTCODESINPROJECT,app.GridCells.IS_RATE,commonLocators.CommonKeys.CHECK)

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESJOBRATE, app.FooterTab.COST_CODE_JOB_RATE, 1);  
        });
        _common.select_rowInContainer(cnt.uuid.COSTCODESJOBRATE)
        _common.edit_containerCell(cnt.uuid.COSTCODESJOBRATE,app.GridCells.RATE,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_RESOURCE.RATE)
        cy.SAVE()

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);    
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
         _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY)
         _common.waitForLoaderToDisappear()

         _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);    
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
          
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,CONTAINERS_ASSEMBLY_RESOURCE.RATE)
       
    })


    it('TC - Uncheck IsRate and update Rate(Project) in cost code job rates and verify in assembly resources in project', function () {
      
         _common.openTab(app.TabBar.PROJECT).then(() => {
             _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);    
         });
         _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
        
         _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COSTCODESINPROJECT, app.FooterTab.COSTCODES, 1);    
        });
        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COSTCODESINPROJECT,app.GridCells.DESCRIPTION,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION1)
        _common.set_cellCheckboxValue(cnt.uuid.COSTCODESINPROJECT,app.GridCells.IS_RATE,commonLocators.CommonKeys.UNCHECK)

       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY)
        _common.waitForLoaderToDisappear()
        _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);    
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 1);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,Cypress.env("CostUnitOriginal"))  
    })

    

it('TC - Delete assembly resource in assemblies module and verify it in project assembly resource', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.ASSEMBLIES)
        _common.waitForLoaderToDisappear()

    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATAGORY_DESC)
   
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);

    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
     cy.SAVE()
   
    _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
        _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
    });

    _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION2)
    _common.delete_recordFromContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    _modalView.acceptButton(btn.ButtonText.YES)
    cy.SAVE()


    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
    _common.waitForLoaderToDisappear()

     _common.openTab(app.TabBar.PROJECT).then(() => {
         _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
     });
     _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
    
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_PROJECT_ASSEMBLY)
    _common.waitForLoaderToDisappear()
     _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)

    _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ASSEMBLY, app.FooterTab.ASSEMBLY, 0);
    });
    _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)

    _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
    });
    _validate.verify_isRecordDeleted(cnt.uuid.PROJECT_ASSEMBLY_RESOURCE,CONTAINERS_ASSEMBLY_RESOURCE.DESCRIPTION2)
    
})
})