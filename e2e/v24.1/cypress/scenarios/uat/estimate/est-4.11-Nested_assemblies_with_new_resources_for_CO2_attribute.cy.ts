import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage, _assembliesPage } from "cypress/pages";

import _ from "cypress/types/lodash";
import common from "mocha/lib/interfaces/common";
const allure = Cypress.Allure.reporter.getInterface()


const ASSEMBLY_DESC="A-DESC-" + Cypress._.random(0, 999)
const ASSEMBLYCATAGORY_DESC="MAIN_ASSEM" + Cypress._.random(0, 999);
const ASSEMBLY_NESTED="ASSEMBLY_NESTED-" + Cypress._.random(0, 999)
const ASSEMBLYCATA_NESTED="ASSEMBLYCATA_NESTED-" + Cypress._.random(0, 999)


allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 4.11 | Nested assemblies for new added resource for CO2/kg attribute")
describe("EST- 4.11 | Nested assemblies for new added resource for CO2/kg attribute", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-4.11-Nested_assemblies_for_new_added_resource_for_CO2_attribute.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("estimate/est-4.11-Nested_assemblies_for_new_added_resource_for_CO2_attribute.json").then((data) => {
            this.data = data
            const sideBarAction = this.data.sidebarInputs.sidebar
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          
            _common.openSidebarOption(sideBarAction.search).delete_pinnedItem().search_fromSidebar(sideBarAction.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });
    after(() => {
        cy.LOGOUT();
    });
    
    it('TC - Add CO2 project value to record in cost code', function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const costCodesInputs = this.data.CostCodesInputs.CostCodes_Input
        const costCodesgrid = this.data.CostCodesInputs.CostCodes_Columnheader

        _common.openSidebarOption(sideBarAction.quickStart)
        _common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.costCode)
        cy.wait(1000)
        _common.openTab(app.tabBar.Cost_Codes).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Cost_Codes, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.Cost_Codes,costCodesgrid)
        });
        _common.maximizeContainer(cnt.uuid.Cost_Codes)
        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,costCodesInputs.costcode1)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Cost_Codes,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,costCodesInputs.co2projectvalue)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes,app.GridCells.PRC_STRUCTURE_FK)
        cy.SAVE()

        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,costCodesInputs.costcode2)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Cost_Codes,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,costCodesInputs.co2projectvalue)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes,app.GridCells.PRC_STRUCTURE_FK)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.Cost_Codes)
    })

    it('TC - Add CO2 project value to record in material module', function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const materialInputs = this.data.MaterialInputs.material_Input
        const materialgrid = this.data.MaterialInputs.material_Columnheader

        _common.openSidebarOption(sideBarAction.quickStart)
        _common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.material)
        cy.wait(3000)//required wait

        _common.openTab(app.tabBar.Records).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Material_Catalog_Filter, app.FooterTab.MATERIALFILTER, 0);
          
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.Material_Catalog_Filter)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Material_Catalog_Filter,app.GridCells.DESCRIPTION_INFO,materialInputs.materialCode)
        _common.set_cellCheckboxValue(cnt.uuid.Material_Catalog_Filter,app.GridCells.IS_CHECKED,materialInputs.chkStatus)
        
        _common.openTab(app.tabBar.Records).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Material_Records, app.FooterTab.MATERIAL_RECORDS, 0);
           _common.setup_gridLayout(cnt.uuid.Material_Records,materialgrid)
        });
        _validate.set_ColumnAtTop([materialgrid.co2project],cnt.uuid.Material_Records)
        _common.clear_subContainerFilter(cnt.uuid.Material_Records)
        _common.search_inSubContainer(cnt.uuid.Material_Records,materialInputs.materialRecordCode)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Material_Records,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,materialInputs.co2projectvalue)
        cy.SAVE()

    })

    it('TC - Add assembly resource in assemblies module', function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const assemblyResourceInputs = this.data.AssemblyResourceInputs.assemblyResource_Input
        const assemblyResourcegrid = this.data.AssemblyResourceInputs.assemblyResource_Columnheader
        const assembliesgrid = this.data.Material_RecordInputs.material_record_Columnheader

        _common.openSidebarOption(sideBarAction.quickStart)
        _common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.assembly)
        cy.wait(1000)//required wait

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
           
        });
        cy.REFRESH_CONTAINER()
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _assembliesPage.selectRecord_assemblyCategory()
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLYCATAGORY_DESC)
       // _common.edit_containerCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATAGORY_DESC)
       // _common.editContainerCellwithDynamicInputField(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLYCATAGORY_DESC)
        cy.SAVE()

        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATAGORY_DESC)
        _assembliesPage.selectRecord_assemblyCategory()
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MAIN_ASSEMBLY_CODE", $ele1.text())
            cy.log(Cypress.env("MAIN_ASSEMBLY_CODE"))
        })

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);

        });
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLY_DESC)
        cy.SAVE()
       
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,assemblyResourcegrid)
           
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,assemblyResourceInputs.lookup1,assemblyResourceInputs.resourceType1)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.lookup1,app.InputFields.INPUT_GROUP_CONTENT,assemblyResourceInputs.resourceCostCode1)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
   
        
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,assemblyResourceInputs.lookup1,assemblyResourceInputs.resourceType1)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.lookup1,app.InputFields.INPUT_GROUP_CONTENT,assemblyResourceInputs.resourceCostCode2)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()

        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,assemblyResourceInputs.lookup1,assemblyResourceInputs.resourceType2)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.lookup1,app.InputFields.INPUT_GROUP_CONTENT,assemblyResourceInputs.resourceCode2)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
 
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,assembliesgrid)
        });
        _validate.set_ColumnAtTop([assembliesgrid.co2projecttotal],cnt.uuid.ASSEMBLIES) 
        _common.select_rowInContainer(cnt.uuid.ASSEMBLIES)
        _common.getText_fromCell(cnt.uuid.ASSEMBLIES, app.gridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_PROJECT_TOTAL", $ele1.text())
            cy.log(Cypress.env("CO2_PROJECT_TOTAL"))
        })

    })

    it('TC - Add nested assembly and assign main assembly in assemblies module', function () {
       
        const assemblyResourceInputs = this.data.AssemblyResourceInputs.assemblyResource_Input
        const assemblyResourcegrid = this.data.AssemblyResourceInputs.assemblyResource_Columnheader
      
        cy.wait(1000)
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
           
        });
        cy.REFRESH_CONTAINER()
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _assembliesPage.selectRecord_assemblyCategory()
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLYCATA_NESTED)
        //_common.editContainerCellwithDynamicInputField(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLYCATA_NESTED)
        cy.SAVE()

        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATA_NESTED)
        _assembliesPage.selectRecord_assemblyCategory()

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);

        });
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLY_NESTED)
        //_common.editContainerCellwithDynamicInputField(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLY_NESTED)
        cy.SAVE()
       
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,assemblyResourcegrid)
           
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,assemblyResourceInputs.lookup1,assemblyResourceInputs.resourceType3)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.lookup1,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("MAIN_ASSEMBLY_CODE"))
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.wait(1000)//required else new resource won't get added
        cy.SAVE()
        cy.wait(1000)//required else new resource won't get added

        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,assemblyResourceInputs.lookup1,assemblyResourceInputs.resourceType1)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.lookup1,app.InputFields.INPUT_GROUP_CONTENT,assemblyResourceInputs.resourceCostCode1)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
 
    })


    it('TC - Update co2 project attribute for assembly resource of main assembly', function () {
        const assembliesgrid = this.data.Material_RecordInputs.material_record_Columnheader
        const assemblyResourcegrid = this.data.AssemblyResourceInputs.assemblyResource_Columnheader
        const assemblyResourceInputs = this.data.AssemblyResourceInputs.assemblyResource_Input
        
       
        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATAGORY_DESC)
        _assembliesPage.selectRecord_assemblyCategory()
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MAIN_ASSEMBLY_CODE", $ele1.text())
            cy.log(Cypress.env("MAIN_ASSEMBLY_CODE"))
        })

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);

        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
      
       
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,assemblyResourcegrid)
           
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
       
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.resourceCostCode1)
        _common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CO2_PROJECT,"500.00")
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
   
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.resourceCostCode2)
        _common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CO2_PROJECT,"500.00")
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
       cy.SAVE()

       _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,assemblyResourceInputs.Material)
        _common.edit_containerCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CO2_PROJECT,"500.00")
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
       cy.SAVE()
       _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)

    })

    it('TC - Recalculate assembly', function () {
       
        const sideBarAction = this.data.sidebarInputs.sidebar
        const assemblyResourcegrid = this.data.AssemblyResourceInputs.assemblyResource_Columnheader
        const Recalculate_CheckboxData = this.data.AssemblyResourceInputs.Recalculate_AssemblyData

        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATA_NESTED)
        _assembliesPage.selectRecord_assemblyCategory()
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_CATEGORIES, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("MAIN_ASSEMBLY_CODE", $ele1.text())
            cy.log(Cypress.env("MAIN_ASSEMBLY_CODE"))
        })

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);

        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_NESTED)
      
       
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,assemblyResourcegrid)
           
        });
        _common.select_rowInContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        
        _common.openSidebarOption(sideBarAction.wizard);
        _common.search_fromSidebar(sideBarAction.wizard1, "Recalculate Assemblies");
        cy.wait(1000)//required wait

        _estimatePage.recalculateAssemblies_FromWizard(sideBarAction.scope, 0,Recalculate_CheckboxData)
    })


    it('TC - Verify CO2 project Total for main and nested assembly are same after recalculate assemblies', function () {
        const assembliesgrid = this.data.Material_RecordInputs.material_record_Columnheader
       

        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLYCATAGORY_DESC)
        _assembliesPage.selectRecord_assemblyCategory()
      

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);

        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
      
      
        _validate.set_ColumnAtTop([assembliesgrid.co2projecttotal],cnt.uuid.ASSEMBLIES) 
        cy.wait(2000)//required wait

       _common.clickonCellhasValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ASSEMBLIES,app.gridCells.CO2_PROJECT_TOTAL,Cypress.env("CO2_PROJECT_TOTAL"))     

    })
   
})