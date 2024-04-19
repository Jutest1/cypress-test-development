import { _common, _estimatePage, _validate,  _modalView, _assembliesPage, _projectPage } from "cypress/pages";
import { tile, app, cnt,sidebar, btn,commonLocators } from "cypress/locators";
import _ from "cypress/types/lodash";

import { DataCells } from 'cypress/pages/interfaces';
import common from "mocha/lib/interfaces/common";
const allure = Cypress.Allure.reporter.getInterface()


const ASSEMBLY_DESC="A-DESC-" + Cypress._.random(0, 999)
const ASSEMBLY_DESC1="A-DESC2-" + Cypress._.random(0, 999)
const ASSEMBLYCATAGORY_DESC="A-DESC-" + Cypress._.random(0, 999);
const ASSEMBLYCATAGORY_DESC1="A-DESC2-" + Cypress._.random(0, 999);


const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);


let ESTIMATE_PARAMETERS: DataCells;
let LINE_ITEMS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS1:DataCells
let ASSEMBLIES_PARAMETERS:DataCells

let CONTAINERS_ESTIMATE;
let CONTAINERS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINERS_ASSEMBLY_RESOURCE;
let CONTAINERS_RECALCULATE_ASSEMBLY


let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINER_COLUMNS_RESOURCE
let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE


allure.epic("ESTIMATE");
    allure.feature("Estimate");
    allure.story("EST- 1.90 | Part-2 Update project assembly with entire assembly option ")
    
    describe('EST- 1.90 | Part-2 Update project assembly with entire assembly option', () => {
            before(function () {
                cy.fixture('estimate/est-1.90-Update_project_assembly_with_entire_assembly_option.json')
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

                    RESOURCE_PARAMETERS1={
                        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORTKEY,
                        [app.GridCells.CODE]: ASSEMBLY_DESC1
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
    
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantitytotal,CONTAINER_COLUMNS_LINE_ITEM.costfactor1,CONTAINER_COLUMNS_LINE_ITEM.costfactor2],cnt.uuid.ESTIMATE_LINEITEMS)    
        })
    
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_FACTOR_1).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("LineCOSTFactor1", $ele1.text())
        })
    
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.COST_FACTOR_2).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("LineCOSTFactor2", $ele1.text())
        })
    
        _common.getText_fromCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
        Cypress.env("LineQuantityTotal", $ele1.text())
        })
    
        });


    it("TC - Fetch the required values from resource and line item", function () {
     
            _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
                _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE)
                _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.costunit,CONTAINER_COLUMNS_RESOURCE.quantity,CONTAINER_COLUMNS_RESOURCE.quantitytotal,CONTAINER_COLUMNS_RESOURCE.costfactor1,CONTAINER_COLUMNS_RESOURCE.costfactor2,CONTAINER_COLUMNS_RESOURCE.costfactorcc],cnt.uuid.RESOURCES) 
            })
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
    
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("CostUnit", $ele1.text())
                }) 
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("QuantityTotal", $ele1.text())
                }) 
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("Quantity", $ele1.text())
                }) 
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_1).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("COSTFactor1", $ele1.text())
                })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_2).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("COSTFactor2", $ele1.text())
                })  
    
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.COST_FACTOR_CC).then(($ele1: JQuery<HTMLElement>) => {
                Cypress.env("COSTFactorCC", $ele1.text())
                })  

             _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.quantityfactor1,CONTAINER_COLUMNS_RESOURCE.quantityfactor2,CONTAINER_COLUMNS_RESOURCE.quantityfactor3,CONTAINER_COLUMNS_RESOURCE.quantityfactor4,CONTAINER_COLUMNS_RESOURCE.quantityfactorcc],cnt.uuid.RESOURCES)    
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
        
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_1).then(($ele1: JQuery<HTMLElement>) => {
                    Cypress.env("RESQuantityFact1", $ele1.text())
                    }) 
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_2).then(($ele1: JQuery<HTMLElement>) => {
                    Cypress.env("RESQuantityFact2", $ele1.text())
                    })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_3).then(($ele1: JQuery<HTMLElement>) => {
                    Cypress.env("RESQuantityFact3", $ele1.text())
                    })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_4).then(($ele1: JQuery<HTMLElement>) => {
                    Cypress.env("RESQuantityFact4", $ele1.text())
                    })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_FACTOR_CC).then(($ele1: JQuery<HTMLElement>) => {
                    Cypress.env("RESQuantityFactcc", $ele1.text())
                    })

       

            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.efficiencyfactor1,CONTAINER_COLUMNS_RESOURCE.efficiencyfactor2,CONTAINER_COLUMNS_RESOURCE.productivityfactor],cnt.uuid.RESOURCES)    
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
            
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.PRODUCTIVITY_FACTOR).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("RESPRODFACTOR", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.EFFICIENCY_FACTOR_1).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("RESEffiFact1", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.EFFICIENCY_FACTOR_2).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("RESEffiFact2", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.DAY_WORK_RATE_UNIT).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("RESDWRate", $ele1.text())
                        })
            
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP1costunit,CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP2costunit,CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP3costunit,CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP4costunit,CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP5costunit],cnt.uuid.RESOURCES)  
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
            
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP1_COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDP1", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP2_COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDP2", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP3_COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDP3", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP4_COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDP4", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP5_COST_UNIT).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDP5", $ele1.text())
                        })
            
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP1total,CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP2total,CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP3total,CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP4total,CONTAINER_COLUMNS_RESOURCE.EstimateResourceUDP5total],cnt.uuid.RESOURCES)  
            _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
            
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP1_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDPTotal1", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP2_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDPTotal2", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP3_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDPTotal3", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP4_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDPTotal4", $ele1.text())
                        })
            _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.ESTIMATE_RESOURCE_UDP5_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
                        Cypress.env("UDPTotal5", $ele1.text())
            })
                   
    })

    it("TC - Verify cost total , quantity total and D/W Rate Total  in resources", function () {
       
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.costtotal,CONTAINER_COLUMNS_RESOURCE.quantitytotal],cnt.uuid.RESOURCES)  
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
   
      _validate.verify_AndCalculateCostTotal(cnt.uuid.RESOURCES,app.GridCells.COST_TOTAL, Cypress.env("CostUnit"),Cypress.env("QuantityTotal"),Cypress.env("COSTFactor1"), Cypress.env("COSTFactor2"), Cypress.env("COSTFactorCC"),Cypress.env("LineCOSTFactor1"),Cypress.env("LineCOSTFactor2"))
      _validate.verify_AndCalculateQuantityTotal(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_TOTAL,Cypress.env("LineQuantityTotal"), Cypress.env("Quantity"), Cypress.env("RESQuantityFact1"), Cypress.env("RESQuantityFact2"), Cypress.env("RESQuantityFact3"), Cypress.env("RESQuantityFact4"), Cypress.env("RESQuantityFactcc"), Cypress.env("RESPRODFACTOR"), Cypress.env("RESEffiFact1"),Cypress.env("RESEffiFact2"))
      _validate.verify_AndCalculateDWRateTotal(cnt.uuid.RESOURCES,app.GridCells.DAY_WORK_RATE_TOTAL, Cypress.env("RESDWRate"), Cypress.env("QuantityTotal"), Cypress.env("COSTFactor1"), Cypress.env("COSTFactor2"), Cypress.env("COSTFactorCC"), Cypress.env("LineCOSTFactor1"), Cypress.env("LineCOSTFactor2"))
      _validate.verify_additionOfMultipleValues(Cypress.env("UDPTotal1"),Cypress.env("UDPTotal2"),Cypress.env("UDPTotal3") ,Cypress.env("UDPTotal4"),Cypress.env("UDPTotal5"))
})

it("TC - Verify UDP Total in resources", function () {

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
         _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
    })
  _validate.verify_AndCalculateUDPTotal(Cypress.env("TotalOfAll"),Cypress.env("UDP1"),Cypress.env("UDP2"),Cypress.env("UDP3") ,Cypress.env("UDP4"),Cypress.env("UDP5"),Cypress.env("QuantityTotal"), Cypress.env("COSTFactor1"), Cypress.env("COSTFactor2"), Cypress.env("COSTFactorCC"), Cypress.env("LineCOSTFactor1"), Cypress.env("LineCOSTFactor2"))  

})
})