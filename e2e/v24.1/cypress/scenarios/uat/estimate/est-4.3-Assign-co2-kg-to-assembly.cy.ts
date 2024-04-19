import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage, _assembliesPage } from "cypress/pages";

import _ from "cypress/types/lodash";
import common from "mocha/lib/interfaces/common";
const allure = Cypress.Allure.reporter.getInterface()

const PRICELIST_DESC = "PRICELIST_DESC-" + Cypress._.random(0, 999);
const PRICEVERSION_DESC="PVER-" + Cypress._.random(0, 999);
const PRICEVERSION_DESC2="PVER-" + Cypress._.random(0, 999);
const MATERIAL_CODE="MCODE-" + Cypress._.random(0, 999);
const MATERIAL_DESC="M-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 4.3 | Assign CO2/kg to assemblies")
describe("EST- 4.3 |  Assign CO2/kg to assemblies", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-4.3-Assign-co2-kg-to-assemblies.json").then((data) => {
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
        cy.fixture("estimate/est-4.3-Assign-co2-kg-to-assemblies.json").then((data) => {
            this.data = data
            const sideBarAction = this.data.sidebarInputs.sidebar
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            cy.wait(4000)
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
        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.DESCRIPTION_INFO,costCodesInputs.costcode)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Cost_Codes,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,costCodesInputs.co2projectvalue)
        _common.selectCellInSubContainer(cnt.uuid.Cost_Codes,app.GridCells.CO2_PROJECT)
        cy.SAVE()
    })

    it('TC - Add CO2 project value to record in material module', function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const materialInputs = this.data.MaterialInputs.material_Input
        const materialgrid = this.data.MaterialInputs.material_Columnheader

        _common.openSidebarOption(sideBarAction.quickStart)
        _common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.material)
        cy.wait(3000)

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
        _common.clear_subContainerFilter(cnt.uuid.Material_Records)
        _common.search_inSubContainer(cnt.uuid.Material_Records,materialInputs.materialRecordCode)
        _common.editContainerCellwithDynamicInputField(cnt.uuid.Material_Records,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,materialInputs.co2projectvalue)
        cy.SAVE()

    })

    it('TC - Add assembly resource in assemblies module', function () {
        const sideBarAction = this.data.sidebarInputs.sidebar
        const assemblyResourceInputs = this.data.AssemblyResourceInputs.assemblyResource_Input
        const assemblyResourcegrid = this.data.AssemblyResourceInputs.assemblyResource_Columnheader
      
        _common.openSidebarOption(sideBarAction.quickStart)
        _common.search_fromSidebar(sideBarAction.quickStart1, sideBarAction.assembly)
        cy.wait(1000)
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
           
        });
        cy.REFRESH_CONTAINER()
        _common.select_rowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _assembliesPage.selectRecord_assemblyCategory()

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);

        });
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        cy.SAVE()
       
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE,assemblyResourcegrid)
           
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,assemblyResourceInputs.lookup1,assemblyResourceInputs.resourceType1)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.lookup1,app.InputFields.INPUT_GROUP_CONTENT,assemblyResourceInputs.resourceCode1)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
   
        
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,assemblyResourceInputs.lookup1,assemblyResourceInputs.resourceType2)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,assemblyResourceInputs.lookup1,app.InputFields.INPUT_GROUP_CONTENT,assemblyResourceInputs.resourceCode2)
        _common.selectCellInSubContainer(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
 
    })

    it('TC - Verify CO2/kg(source) is not editable in assembly resource', function () {
        const assemblyResourceInputs = this.data.AssemblyResourceInputs.assemblyResource_Input

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,assemblyResourceInputs.resourceDesc1)
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.gridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_PROJECT_TOTAL1", $ele1.text())
        })

        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.gridCells.CO2_SOURCE_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_SOURCE_TOTAL1", $ele1.text())
        })
        _validate.verify_isRecordNotEditable(cnt.uuid.ASSEMBLY_RESOURCE,app.gridCells.CO2_SOURCE,0)

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.DESCRIPTION_INFO,assemblyResourceInputs.resourceDesc2)
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.gridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_PROJECT_TOTAL2", $ele1.text())
        })   
        _common.getText_fromCell(cnt.uuid.ASSEMBLY_RESOURCE, app.gridCells.CO2_SOURCE_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_SOURCE_TOTAL2", $ele1.text())
        })    
        _validate.verify_isRecordNotEditable(cnt.uuid.ASSEMBLY_RESOURCE,app.gridCells.CO2_SOURCE,0)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it('TC - Verify CO2/kg(project) Total in assemblies is sum of CO2/kg(project) Total in assembly resource', function () {
        const assemblyRecordgrid = this.data.Material_RecordInputs.material_record_Columnheader

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,assemblyRecordgrid)
        });
        _common.getText_fromCell(cnt.uuid.ASSEMBLIES, app.gridCells.CO2_PROJECT_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_PROJECT_TOTALASSEMBLIES", $ele1.text())
        })   
        _common.getText_fromCell(cnt.uuid.ASSEMBLIES, app.gridCells.CO2_SOURCE_TOTAL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CO2_SOURCE_TOTALASSEMBLIES", $ele1.text())
        })   
        cy.wait(2000)
        _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ASSEMBLIES, Cypress.env("CO2_PROJECT_TOTAL1"), Cypress.env("CO2_PROJECT_TOTAL2"),app.gridCells.CO2_PROJECT_TOTAL)      
    })

    it('TC - Verify CO2/kg(source) Total in assemblies is sum of CO2/kg(source) Total in assembly resource', function () {
        const assemblyRecordgrid = this.data.Material_RecordInputs.material_record_Columnheader

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,assemblyRecordgrid)
        });
        cy.wait(2000)
        _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ASSEMBLIES, Cypress.env("CO2_SOURCE_TOTAL1"), Cypress.env("CO2_SOURCE_TOTAL2"),app.gridCells.CO2_SOURCE_TOTAL)      
    })

    it('TC - Verify CO2 Total variance in assemblies is difference of CO2/kg(source) and CO2/kg(project)', function () {
        const assemblyRecordgrid = this.data.Material_RecordInputs.material_record_Columnheader

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES,assemblyRecordgrid)
        });
        cy.wait(2000)
        _validate.verify_isRecordSubstractTwoValues(cnt.uuid.ASSEMBLIES, Cypress.env("CO2_PROJECT_TOTALASSEMBLIES"), Cypress.env("CO2_SOURCE_TOTALASSEMBLIES"),app.gridCells.CO2_TOTAL_VARIANCE)      
    })

   
   
   
})