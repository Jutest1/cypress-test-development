import { tile, app, cnt, btn } from "cypress/locators";
import { _common, _projectPage,_procurementPage,_estimatePage, _validate, _controllingUnit, _materialPage, _assembliesPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const LINE_ITEM_DESC_1="LINE_ITEM_DESC1-" + Cypress._.random(0, 999);
const EST_CODE="1" + Cypress._.random(0, 999);
const EST_DESC="EST_DESC-" + Cypress._.random(0, 999);
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_CODE="MC" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC="MC_DESC_" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_CODE="MG" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC="MG_DESC_" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE="MR" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC="MR_DESC_" + Cypress._.random(0, 999);
const MATERIAL_STRUCTURE="MR-" + Cypress._.random(0, 999);
const ASSEMBLY_CATEGORY_DESC="AC_DESC-" + Cypress._.random(0, 999);
const ASSEMBLIES_DESC="AC_DESC-" + Cypress._.random(0, 999);

//! Type under Cost Code and Assembly Type under Assembly Category is to be added Manually.

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.85 | Create CA Assembly Line Item");

describe("EST- 1.85 | Create CA Assembly Line Item", () => {

    beforeEach(function () {
    cy.fixture("estimate/est-1.85-create-ca-assembly-lineitem.json")
      .then((data) => {
        this.data = data;
       });        
    });  
        
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("estimate/est-1.85-create-ca-assembly-lineitem.json")
          .then((data) => {
            this.data = data;
            const BASIC_INPUTS = this.data.basicInputs;
            /* Open desktop should be called in before block */
            cy.wait(2000) // This wait is required , if not added script fails
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            cy.wait(2000) // This wait is required , if not added script fails
            _common.openSidebarOption(BASIC_INPUTS.quickStart);
            _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename); 

            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
            });

            _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();

            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PROJECT_NO, PROJECT_DESC,BASIC_INPUTS.clerk);
            cy.SAVE();
            cy.wait(2000) // This wait is required , if not added script fails
            cy.SAVE();
            cy.wait(2000) // This wait is required , if not added script fails
            _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
            _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();
          });
    });  

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Set pre-requisite parameter for cost codes (type,iscost)", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const COST_CODES_COLUMN = this.data.columns.costCodesColumn;
        const RESOURCE_CODE_INPUT=this.data.resourceCodeInput
    
        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.costCodes);

        _common.openTab(app.tabBar.Cost_Codes).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Cost_Codes, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.Cost_Codes,COST_CODES_COLUMN)
            _validate.set_ColumnAtTop([COST_CODES_COLUMN.code,COST_CODES_COLUMN.iscost,COST_CODES_COLUMN.costcodetypefk],cnt.uuid.Cost_Codes)
        })
        cy.wait(2000) // This wait is required , if not added script fails

        _common.maximizeContainer(cnt.uuid.Cost_Codes)
        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.search_inSubContainer(cnt.uuid.Cost_Codes,RESOURCE_CODE_INPUT.code)
        cy.wait(2000) // This wait is required , if not added script fails
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,RESOURCE_CODE_INPUT.code)
        _common.set_cellCheckboxValue(cnt.uuid.Cost_Codes,app.GridCells.IS_COST,BASIC_INPUTS.uncheck)
        _common.edit_dropdownCellWithCaret(cnt.uuid.Cost_Codes,app.gridCells.COST_CODE_TYPE_FK,BASIC_INPUTS.list,BASIC_INPUTS.estimateCostCode)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes,app.GridCells.CODE)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails

        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.search_inSubContainer(cnt.uuid.Cost_Codes,RESOURCE_CODE_INPUT.code_1)
        cy.wait(2000) // This wait is required , if not added script fails
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,RESOURCE_CODE_INPUT.code_1)
        _common.set_cellCheckboxValue(cnt.uuid.Cost_Codes,app.GridCells.IS_COST,BASIC_INPUTS.check)
        _common.edit_dropdownCellWithCaret(cnt.uuid.Cost_Codes,app.gridCells.COST_CODE_TYPE_FK,BASIC_INPUTS.list,BASIC_INPUTS.information)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes,app.GridCells.CODE)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails


        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.search_inSubContainer(cnt.uuid.Cost_Codes,RESOURCE_CODE_INPUT.code_2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,RESOURCE_CODE_INPUT.code_2)
        _common.set_cellCheckboxValue(cnt.uuid.Cost_Codes,app.GridCells.IS_COST,BASIC_INPUTS.uncheck)
        _common.edit_dropdownCellWithCaret(cnt.uuid.Cost_Codes,app.gridCells.COST_CODE_TYPE_FK,BASIC_INPUTS.list,BASIC_INPUTS.information)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes,app.GridCells.CODE)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails

        _common.clear_subContainerFilter(cnt.uuid.Cost_Codes)
        _common.search_inSubContainer(cnt.uuid.Cost_Codes,RESOURCE_CODE_INPUT.code_3)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.Cost_Codes,app.GridCells.CODE,RESOURCE_CODE_INPUT.code_3)
        _common.set_cellCheckboxValue(cnt.uuid.Cost_Codes,app.GridCells.IS_COST,BASIC_INPUTS.check)
        _common.edit_dropdownCellWithCaret(cnt.uuid.Cost_Codes,app.gridCells.COST_CODE_TYPE_FK,BASIC_INPUTS.list,BASIC_INPUTS.estimateCostCode)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.Cost_Codes,app.GridCells.CODE)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails

        _common.minimizeContainer(cnt.uuid.Cost_Codes)

    })

    it("TC - Create material procurement structure", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const PROCUREMENT_STRUCTURE_COLUMN=this.data.columns.procurementStructureColumn
        const RESOURCE_CODE_INPUT=this.data.resourceCodeInput

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.procurementStructure); 
 
        _common.openTab(app.tabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_COLUMN)
        });
        cy.wait(2000) // This wait is required , if not added script fails
        cy.REFRESH_CONTAINER()
        cy.wait(2000) // This wait is required , if not added script fails
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.collapseAll(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _procurementPage.enterRecord_ToCreateProcurementStructure(MATERIAL_STRUCTURE,BASIC_INPUTS.material,BASIC_INPUTS.material)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENT_STRUCTURES,app.gridCells.COST_CODE_FK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,RESOURCE_CODE_INPUT.code_2)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
    })

    it("TC - Create material catalog and material group", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const MATERIAL_CATALOGS_COLUMN = this.data.columns.materialCatalogsColumn;  
        const MAERIAL_GROUPS_COLUMN = this.data.columns.materialGroupsColumn; 
        const MATERIAL_CATALOG_INPUT=this.data.catalogInputs
 
        const MATERIAL_CATALOGS_PARAMETER:DataCells={
            [app.GridCells.CODE]:MATERIAL_CATALOG_CODE,
            [app.GridCells.DESCRIPTION_INFO]:MATERIAL_CATALOG_DESC,
            [app.GridCells.BUSINESS_PARTNER_FK]:MATERIAL_CATALOG_INPUT.businessPartner,
            [app.GridCells.VALID_FROM]:_validate.getDate(BASIC_INPUTS.current),
            [app.GridCells.VALID_TO]:_validate.getDate(BASIC_INPUTS.incremented,5),
            [app.GridCells.MATERIAL_CATALOG_TYPE_FK]:MATERIAL_CATALOG_INPUT.materialType
        } 
        const MATERIAL_GROUP_PARAMETER:DataCells={
            [app.GridCells.CODE]:MATERIAL_GROUPS_CODE,
            [app.GridCells.DESCRIPTION_INFO]:MATERIAL_GROUPS_DESC,
            [app.GridCells.PRC_STRUCTURE_FK]:MATERIAL_STRUCTURE
        }
        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.materialCatalog); 
        cy.wait(1000) // This wait is required , if not added script fails
        cy.REFRESH_CONTAINER()
        cy.wait(2000) // This wait is required , if not added script fails

        _common.openTab(app.tabBar.CATALOGS).then(() => {
            _common.setDefaultView(app.tabBar.CATALOGS)
            cy.wait(2000)
            _common.select_tabFromFooter(cnt.uuid.Material_Catalogs, app.FooterTab.MATERIALCATALOG, 0)
            _common.setup_gridLayout(cnt.uuid.Material_Catalogs, MATERIAL_CATALOGS_COLUMN);
        })
        cy.wait(2000)

        _common.maximizeContainer(cnt.uuid.Material_Catalogs)
        _common.clear_subContainerFilter(cnt.uuid.Material_Catalogs)
        _common.create_newRecord(cnt.uuid.Material_Catalogs)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.Material_Catalogs,MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        _common.minimizeContainer(cnt.uuid.Material_Catalogs)

        _common.openTab(app.tabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, MAERIAL_GROUPS_COLUMN);
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUPS)
    })

    it("TC - Create material record", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const MATERIAL_RECORD_INPUT=this.data.materialRecordInput
        const MATERIAL_CATALOGS_FILTER_COLUMN = this.data.columns.materialCatalogsFilterColumn;  
        const MATERIAL_GROUP_FILTER_COLUMN = this.data.columns.materialGroupFilterColumn;  
        const MATERIAL_RECORD_COLUMN = this.data.columns.materialRecordColumn;  
        const MATERIAL_RECORD_PARAMETER:DataCells={
            [app.GridCells.CODE]:MATERIAL_RECORD_CODE,
            [app.GridCells.DESCRIPTION_INFO_1]:MATERIAL_RECORD_DESC,
            [app.GridCells.UOM_FK]:MATERIAL_RECORD_INPUT.uom,
            [app.GridCells.RETAIL_PRICE]:MATERIAL_RECORD_INPUT.retailPrice,
            [app.GridCells.LIST_PRICE]:MATERIAL_RECORD_INPUT.listPrice
        }
        
        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.material); 
        cy.wait(2000) // This wait is required , if not added script fails

        _common.openTab(app.tabBar.Records).then(() => {
            _common.setDefaultView(app.tabBar.Records)
            cy.wait(2000) // This wait is required , if not added script fails
            _common.select_tabFromFooter(cnt.uuid.Material_Catalog_Filter, app.FooterTab.MATERIALFILTER)
            _common.setup_gridLayout(cnt.uuid.Material_Records, MATERIAL_CATALOGS_FILTER_COLUMN)
        })
        cy.wait(2000) // This wait is required , if not added script fails
        _common.maximizeContainer(cnt.uuid.Material_Catalog_Filter)
        _common.clear_subContainerFilter(cnt.uuid.Material_Catalog_Filter)
        _common.search_inSubContainer(cnt.uuid.Material_Catalog_Filter, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.Material_Catalog_Filter, app.GridCells.IS_CHECKED, BASIC_INPUTS.check)
        _common.minimizeContainer(cnt.uuid.Material_Catalog_Filter)

        _common.openTab(app.tabBar.Records).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Material_Group_Filter, app.FooterTab.MATERIALGROUPFILTER)
            _common.setup_gridLayout(cnt.uuid.Material_Group_Filter, MATERIAL_GROUP_FILTER_COLUMN)
        })
        _common.maximizeContainer(cnt.uuid.Material_Group_Filter)
        _common.clear_subContainerFilter(cnt.uuid.Material_Group_Filter)
        _common.search_inSubContainer(cnt.uuid.Material_Group_Filter, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.Material_Group_Filter, app.GridCells.IS_CHECKED,BASIC_INPUTS.check)
        _common.minimizeContainer(cnt.uuid.Material_Group_Filter)

        _common.openTab(app.tabBar.Records).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Material_Records, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.Material_Records, MATERIAL_RECORD_COLUMN)
        })
        _common.maximizeContainer(cnt.uuid.Material_Records)
        _common.clear_subContainerFilter(cnt.uuid.Material_Records)
        _common.create_newRecord(cnt.uuid.Material_Records)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.Material_Records,MATERIAL_RECORD_PARAMETER)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        _common.minimizeContainer(cnt.uuid.Material_Records)
    }) 

    it("TC - Create assembly category", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const ASSEMBLIES_INPUT = this.data.assembliesInput;
        const ASSEMBLY_CATEGORY_COLUMN=this.data.columns.assemblyCategoriesColumn
        const ASSEMBLIES_COLUMN=this.data.columns.assembliesColumn
        const ASSEMBLIES_RESOURCE_COLUMN=this.data.columns.assembliesResourceColumn

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.assemblies);
        cy.wait(2000) // This wait is required , if not added script fails
        
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, ASSEMBLY_CATEGORY_COLUMN)
        });
        cy.wait(2000) // This wait is required , if not added script fails
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, ASSEMBLIES_COLUMN)
            _validate.set_ColumnAtTop([ASSEMBLIES_COLUMN.code,ASSEMBLIES_COLUMN.descriptioninfo,ASSEMBLIES_COLUMN.quantity,ASSEMBLIES_COLUMN.estassemblycatfk,ASSEMBLIES_COLUMN.mdccostcodefk,ASSEMBLIES_COLUMN.mdcmaterialfk],cnt.uuid.ASSEMBLIES)
        });
        cy.wait(2000) // This wait is required , if not added script fails
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, ASSEMBLIES_RESOURCE_COLUMN)
            _validate.set_ColumnAtTop([ASSEMBLIES_RESOURCE_COLUMN.estresourcetypeshortkey,ASSEMBLIES_RESOURCE_COLUMN.code,ASSEMBLIES_RESOURCE_COLUMN.costunit,ASSEMBLIES_RESOURCE_COLUMN.iscost],cnt.uuid.ASSEMBLY_RESOURCE)
        });
        cy.wait(2000) // This wait is required , if not added script fails

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLY_CATEGORY_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.gridCells.ESTASSEMBLYTYPEFK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,ASSEMBLIES_INPUT.assemblyType)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLIES_INPUT.existingAssemblyCategory)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.gridCells.ESTASSEMBLYTYPEFK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,ASSEMBLIES_INPUT.assemblyType)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        cy.REFRESH_CONTAINER()
        cy.wait(2000) // This wait is required , if not added script fails
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)  
    })

    it("TC - Create assemblies", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const ASSEMBLIES_INPUT = this.data.assembliesInput;
        const RESOURCE_CODE_INPUT=this.data.resourceCodeInput
        const ASSEMBLIES_PARAMETER:DataCells={
            [app.GridCells.DESCRIPTION_INFO]:ASSEMBLIES_DESC,
            [app.GridCells.QUANTITY_SMALL]:ASSEMBLIES_INPUT.quantity
        }
      
        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(ASSEMBLIES_PARAMETER)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLIES,app.gridCells.MDC_COST_CODE_FK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,RESOURCE_CODE_INPUT.code_3)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,"ASSEMBLY_CA_CODE")

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)
    })

    it("TC - Create assembly resources", function () {
        const ASSEMBLIES_INPUT = this.data.assembliesInput;
        const RESOURCE_CODE_INPUT=this.data.resourceCodeInput
        const ASSEMBLY_RESOURCE_PARAMETER:DataCells={
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:ASSEMBLIES_INPUT.shortKey,
            [app.GridCells.CODE]:RESOURCE_CODE_INPUT.code,
            [app.GridCells.QUANTITY_SMALL]:ASSEMBLIES_INPUT.quantity_1
        }
        const ASSEMBLY_RESOURCE_CA_PARAMETER:DataCells={
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:ASSEMBLIES_INPUT.shortKeyCA,
            [app.GridCells.CODE]:ASSEMBLIES_INPUT.existingAssemblies,
            [app.GridCells.QUANTITY_SMALL]:ASSEMBLIES_INPUT.quantity_3
        }
        const ASSEMBLY_RESOURCE_MATERIAL_PARAMETER:DataCells={
            [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:ASSEMBLIES_INPUT.shortKeyMaterial,
            [app.GridCells.CODE]:MATERIAL_RECORD_CODE,
            [app.GridCells.QUANTITY_SMALL]:ASSEMBLIES_INPUT.quantity_2
        }

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
       
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_CA_PARAMETER)
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails 
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_3_COST_PER_UNIT")
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,"CA_CODE")


        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_PARAMETER)
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_1_COST_PER_UNIT")

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_MATERIAL_PARAMETER)
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_2_COST_PER_UNIT")       

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it("TC - Create estimate header", function () {
        const BASIC_INPUTS = this.data.basicInputs;
        const ESTIMATE_INPUT = this.data.estimateInputs;
        const ESTIMATE_COLUMN = this.data.columns.estimateColumn

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.modulename);

        _common.openSidebarOption(BASIC_INPUTS.search).delete_pinnedItem();
        _common.search_fromSidebar(BASIC_INPUTS.searchType,PROJECT_NO).pinnedItem();

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, ESTIMATE_COLUMN)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, ESTIMATE_INPUT.rubricCategory, ESTIMATE_INPUT.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    });

    it("TC - Create line item with assembly", function() {
        const ESTIMATE_LINE_ITEM_COLUMN = this.data.columns.estimateLineItemColumn;
        const LINE_ITEM_INPUT = this.data.lineItemInput;
        const BASIC_INPUTS = this.data.basicInputs;

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELineItem)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, ESTIMATE_LINE_ITEM_COLUMN);
            _validate.set_ColumnAtTop([ESTIMATE_LINE_ITEM_COLUMN.quantity,ESTIMATE_LINE_ITEM_COLUMN.estassemblyfk,ESTIMATE_LINE_ITEM_COLUMN.descriptioninfo,ESTIMATE_LINE_ITEM_COLUMN.basuomfk],cnt.uuid.ESTIMATE_LINEITEMS,)
        });

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem( LINE_ITEM_DESC_1, LINE_ITEM_INPUT.quantity, LINE_ITEM_INPUT.uom);
        cy.wait(1000)  // This wait is required if not added script fails
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("ASSEMBLY_CA_CODE"))
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE)
        cy.wait(2000) // This wait is required if not added script fails
        cy.SAVE()
        cy.wait(2000) // This wait is required if not added script fails

    });

    it("TC - Verify resources gets assigned automatically after assigning assembly template to line item in the resources container of estimate and Verify Cost/unit values of resources with assembly resources", function() {
        const RESOURCES_COLUMN=this.data.columns.resourceColumn
        const RESOURCE_CODE_INPUT = this.data.resourceCodeInput;
        const BASIC_INPUTS = this.data.basicInputs;

        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES,1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES,RESOURCES_COLUMN)
            _validate.set_ColumnAtTop([RESOURCES_COLUMN.iscost,RESOURCES_COLUMN.code,RESOURCES_COLUMN.estresourcetypeshortkey,RESOURCES_COLUMN.costunit],cnt.uuid.RESOURCES,)
        });

        cy.wait(2000) // This wait is required , if not added script fails
        _common.maximizeContainer(cnt.uuid.RESOURCES)

        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,RESOURCE_CODE_INPUT.code)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.RESOURCES,app.GridCells.TREE)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,(parseFloat(Cypress.env("AS_1_COST_PER_UNIT"))).toString())
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES,app.GridCells.IS_COST,BASIC_INPUTS.uncheck)
        

        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,MATERIAL_RECORD_CODE)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.RESOURCES,app.GridCells.TREE)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,(parseFloat(Cypress.env("AS_2_COST_PER_UNIT"))).toString())
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES,app.GridCells.IS_COST,BASIC_INPUTS.uncheck)


        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,Cypress.env("CA_CODE"))
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.RESOURCES,app.GridCells.TREE)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,(parseFloat(Cypress.env("AS_3_COST_PER_UNIT"))).toString())
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES,app.GridCells.IS_COST,BASIC_INPUTS.check)

        _common.minimizeContainer(cnt.uuid.RESOURCES)
        cy.wait(3000) // This wait is required if not added script fails
    })

    it("TC - Verify iscost under assembly resources", function() {
        const BASIC_INPUTS = this.data.basicInputs;
        const RESOURCE_CODE_INPUT=this.data.resourceCodeInput

        _common.openSidebarOption(BASIC_INPUTS.quickStart);
        _common.search_fromSidebar(BASIC_INPUTS.searchTypeQuick, BASIC_INPUTS.assemblies);
        cy.wait(2000) // This wait is required , if not added script fails

        cy.reload()
        cy.wait(3000) // This wait is required if not added script fails

        _validate.verify_isContainerMinimized(cnt.uuid.ASSEMBLY_CATEGORIES)
        _validate.verify_isContainerMinimized(cnt.uuid.ASSEMBLIES)
        _validate.verify_isContainerMinimized(cnt.uuid.ASSEMBLY_RESOURCE)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        cy.wait(2000) // This wait is required , if not added script fails
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,RESOURCE_CODE_INPUT.code)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.TREE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.IS_COST,BASIC_INPUTS.uncheck)

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,MATERIAL_RECORD_CODE)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.TREE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.IS_COST,BASIC_INPUTS.uncheck)

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,Cypress.env("CA_CODE"))
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.TREE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.IS_COST,BASIC_INPUTS.check)

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)      
    })

    it("TC - Cost code should not be displayed under assembly resource if cost code type=information and iscost=1", function() {
        const BASIC_INPUTS = this.data.basicInputs;
        const ASSEMBLIES_INPUT = this.data.assembliesInput;
        const RESOURCE_CODE_INPUT=this.data.resourceCodeInput
        cy.reload()
        cy.wait(3000) // This wait is required if not added script fails

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        cy.wait(2000) // This wait is required , if not added script fails
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,BASIC_INPUTS.grid,ASSEMBLIES_INPUT.shortKey)
        _validate.verify_dataUnderCostCodeLookups(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,app.GridCells.CODE_CAPS,RESOURCE_CODE_INPUT.code_1,"shouldNotExist")
        _common.delete_recordFromContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_modalFooterButton(btn.ButtonText.YES)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it("TC - If you select cost code, the material column will be read only and If you select material, the cost code column will be readonly", function() {
        const BASIC_INPUTS = this.data.basicInputs;

        cy.reload()
        cy.wait(3000) // This wait is required if not added script fails

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        cy.wait(2000) // This wait is required , if not added script fails
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)

        _validate.verify_inputFieldVisibility(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_MATERIAL_FK,"notVisible")

        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLIES,app.gridCells.MDC_COST_CODE_FK)
        _common.clickOn_activeContainerButton(cnt.uuid.ASSEMBLIES,btn.IconButtons.ICO_INPUT_DELETE)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_MATERIAL_FK)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()

        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_MATERIAL_FK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,MATERIAL_RECORD_CODE)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLIES,app.gridCells.MDC_COST_CODE_FK)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()

        _validate.verify_inputFieldVisibility(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_MATERIAL_FK,"Visible",app.InputFields.INPUT_GROUP_CONTENT)

        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)
    })

    it("TC - Verify if Assembly Type is CA then under resource short key Standard Assembly will not be displayed", function() {
        const BASIC_INPUTS = this.data.basicInputs;
        const ASSEMBLIES_INPUT = this.data.assembliesInput;

        cy.reload()
        cy.wait(3000) // This wait is required if not added script fails

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        cy.wait(2000) // This wait is required , if not added script fails
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.gridCells.ESTASSEMBLYTYPEFK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,ASSEMBLIES_INPUT.assemblyType)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _validate.verify_shortKeyVisibility(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,ASSEMBLIES_INPUT.shortKeyStandardAssembly,"not visible")
        _common.delete_recordFromContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_modalFooterButton(btn.ButtonText.YES)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it("TC - Verify if Assembly Type is standard assembly then under resource short key CA will be displayed", function() {
        const BASIC_INPUTS = this.data.basicInputs;
        const ASSEMBLIES_INPUT = this.data.assembliesInput;

        cy.reload()
        cy.wait(3000) // This wait is required if not added script fails

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        cy.wait(2000) // This wait is required , if not added script fails
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.gridCells.ESTASSEMBLYTYPEFK,BASIC_INPUTS.grid,app.InputFields.INPUT_GROUP_CONTENT,ASSEMBLIES_INPUT.standardAssemblyType)
        _common.app.GridCells.BAS_UOM_FK(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.tabBar.Assemblies).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _validate.verify_shortKeyVisibility(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,ASSEMBLIES_INPUT.shortKeyCA,"visible")
        _common.delete_recordFromContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clickOn_modalFooterButton(btn.ButtonText.YES)
        cy.SAVE()
        cy.wait(2000) // This wait is required , if not added script fails
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })
});