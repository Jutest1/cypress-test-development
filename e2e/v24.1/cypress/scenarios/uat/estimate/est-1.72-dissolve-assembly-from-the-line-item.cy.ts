import { tile, app, cnt, btn} from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _projectPage, _assembliesPage } from "cypress/pages";

import _ from "cypress/types/lodash";

const allure = Cypress.Allure.reporter.getInterface()
const ASSEMBLIES_DESC = "ASSEMBLIES_DESC-" + Cypress._.random(0, 999);
const ASSEMBLIES_DESC1 = "ASSEMBLIES_DESC-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINEITEM_DESC = "LI-DESC-" + Cypress._.random(0, 999);
const LINEITEM_DESC1 = "LI-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.72 | Dissolve assembly from the line item")
describe("EST- 1.72 | Dissolve assembly from the line item", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-1.72-dissolve-assembly-from-the-line-item.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.clearAllLocalStorage()
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),            
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("estimate/est-1.72-dissolve-assembly-from-the-line-item.json").then((data) => {
            this.data = data
            const SIDEBARINPUTS = this.data.sidebarInputs.sidebar
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });            
            _common.openSidebarOption(SIDEBARINPUTS.search).delete_pinnedItem().search_fromSidebar(SIDEBARINPUTS.Standard, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });
     after(() => {
         cy.LOGOUT();
     });
    it('TC - Verify Assign Protected assembly and create assembly record', function () {
        const SIDEBARACTION = this.data.sidebarInputs.sidebar
        const ASSEMBLYCATEGRID = this.data.assemblyCategories_ColumnHeaders.ColumnHeaders
        const ASSEMBLYCATEINPUTS = this.data.assemblyCategoryPage.assemblyCategoryInputs 
        const ASSEMBLY_COLUMN = this.data.Assemblies_column       
        const ASSEMBLIES_PARAMETER1:DataCells={
            [app.GridCells.DESCRIPTION_INFO]:ASSEMBLIES_DESC,            
        }
        const ASSEMBLIES_PARAMETER2:DataCells={
            [app.GridCells.DESCRIPTION_INFO]:ASSEMBLIES_DESC1,            
        }
        _common.openSidebarOption(SIDEBARACTION.quickStart)
        _common.search_fromSidebar(SIDEBARACTION.quickStart1, SIDEBARACTION.assemblies)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLY_CATEGORIES, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLYCATEGRID)
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLYCATEINPUTS.description)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATEINPUTS.description)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.gridCells.ESTASSEMBLYTYPEFK,SIDEBARACTION.popupType1,app.InputFields.INPUT_GROUP_CONTENT,ASSEMBLYCATEINPUTS.assemblytype)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.CODE,"ASSEMCATCODE")
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,ASSEMBLY_COLUMN)
            _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        });
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(ASSEMBLIES_PARAMETER1)
        _common.waitForLoaderToDisappear()// This wait is required , if not added script fails
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.ASSEMBLIES,app.GridCells.CODE).then(($value)=>{
            Cypress.env("AssemblyCode1",$value.text())
        })
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(ASSEMBLIES_PARAMETER2)
        _common.waitForLoaderToDisappear() // This wait is required , if not added script fails
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.ASSEMBLIES,app.GridCells.CODE).then(($value)=>{
            Cypress.env("AssemblyCode2",$value.text())
        })
})
    it("TC - Create Assembly resources", function () { 
        const ASSEMBLY_COLUMN = this.data.Assemblies_column
        const ASSEMBLYRESOURCE_COLUMN = this.data.assemblyResourcePage.columnHeader
        const ASSEMBLRESOURCEINPUTS = this.data.assemblyResourcePage.assembyResourceInputs      
        const ASSEMBLY_RESOURCE_COST_CODE_PARAMETER1:DataCells={            
            [app.GridCells.CODE]:ASSEMBLRESOURCEINPUTS.code1,
            [app.GridCells.QUANTITY_SMALL]:ASSEMBLRESOURCEINPUTS.quantity
        }    
        
        const ASSEMBLY_RESOURCE_COST_CODE_PARAMETER2:DataCells={            
            [app.GridCells.CODE]:ASSEMBLRESOURCEINPUTS.code2,
            [app.GridCells.QUANTITY_SMALL]:ASSEMBLRESOURCEINPUTS.quantity1
        }    
        
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,Cypress.env("AssemblyCode1"))
        _common.waitForLoaderToDisappear()      
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,ASSEMBLYRESOURCE_COLUMN)
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)        
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)       
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_COST_CODE_PARAMETER1)
       cy.wait(2000)  // This wait is required , if not added script fails
        cy.SAVE()
        _common.waitForLoaderToDisappear()        
       
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,ASSEMBLY_COLUMN)
        });
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,Cypress.env("AssemblyCode2"))
        _common.waitForLoaderToDisappear()    
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,ASSEMBLYRESOURCE_COLUMN)
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)        
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)        
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_COST_CODE_PARAMETER2)
        cy.wait(1000)  // This wait is required , if not added script fails
        cy.SAVE()
        _common.waitForLoaderToDisappear()       
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        cy.REFRESH_CONTAINER()
    })

    it('TC - Verify Create Estimate and Line Item,Resources', function () {
        const SIDEBARACTION = this.data.sidebarInputs.sidebar
        const ESTIMATEINPUTS = this.data.EstimateHeader.EstimateHeaderInputs;
        const ESTIMATEGRID = this.data.estimate_ColumnHeaders.column_headers
        const LINEITEMGRID = this.data.lineItem_ColumnHeaders.column_headers
        const LINEITEMINPUTS = this.data.lineItemPage.lineItemInputs
        const RESOURCEINPUTS = this.data.assemblyResourcePage.assembyResourceInputs
        const RESOURCEGRID = this.data.resources_ColumnHeaders.column_headers;
        const ASSEMBLYCATEINPUTS = this.data.assemblyCategoryPage.assemblyCategoryInputs
        _common.openSidebarOption(SIDEBARACTION.quickStart)
        _common.search_fromSidebar(SIDEBARACTION.quickStart1, SIDEBARACTION.project)
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, ESTIMATEGRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);  
        _common.create_newRecord(cnt.uuid.ESTIMATE)     
        _estimatePage.enterRecord_toCreateEstimateHeader(ESTIMATEINPUTS.newCode, EST_DESC, ESTIMATEINPUTS.rubricCategory, ESTIMATEINPUTS.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
        _common.waitForLoaderToDisappear()      
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEMGRID)
        })
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(LINEITEM_DESC,LINEITEMINPUTS.quantity,LINEITEMINPUTS.uom)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCEGRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(ASSEMBLYCATEINPUTS.assemblytype,Cypress.env("AssemblyCode1"));
        cy.SAVE()
        _common.waitForLoaderToDisappear()  
        _common.expandAll(cnt.uuid.RESOURCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCEINPUTS.code1)        
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,0)
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,0)      
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEMGRID)
        })
        
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(LINEITEM_DESC1,LINEITEMINPUTS.quantity,LINEITEMINPUTS.uom)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCEGRID)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(ASSEMBLYCATEINPUTS.assemblytype,Cypress.env("AssemblyCode2"));
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.expandAll(cnt.uuid.RESOURCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCEINPUTS.code2)        
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,0)
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,0)
    })   

    it('TC - Verify Dissolve assembly wizard option', function () {
        const LINEITEMGRID = this.data.lineItem_ColumnHeaders.column_headers
        const SIDEBARINPUTS = this.data.sidebarInputs.sidebar
        const RESOURCEINPUTS = this.data.assemblyResourcePage.assembyResourceInputs
        const RESOURCEGRID = this.data.resources_ColumnHeaders.column_headers;
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LINEITEMGRID)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINEITEM_DESC)
        _common.openSidebarOption(SIDEBARINPUTS.wizard)
        _common.search_fromSidebar(SIDEBARINPUTS.wizard1,SIDEBARINPUTS.dissolveAssembly)        
        _modalView.findModal().findRadio_byLabel(RESOURCEINPUTS.estimateScope, RESOURCEINPUTS.radio, 0)
        _common.selectCell_hasValueInModal(app.GridCells.CODE,Cypress.env("AssemblyCode1"),0)
        _common.setCell_checkboxValue_Inmodal(app.SubContainerLayout.SELECTED, RESOURCEINPUTS.check)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, RESOURCEGRID)
        });       
        _common.expandAll(cnt.uuid.RESOURCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCEINPUTS.code1)        
        _validate.verify_inputFieldVisibility(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,RESOURCEINPUTS.visible,app.InputFields.INPUT_GROUP_CONTENT)        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,LINEITEM_DESC1)  
        _common.expandAll(cnt.uuid.RESOURCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCEINPUTS.code2)        
        _validate.verify_isRecordNotEditable(cnt.uuid.RESOURCES,app.GridCells.QUANTITY_SMALL,0)
              
    })
})
