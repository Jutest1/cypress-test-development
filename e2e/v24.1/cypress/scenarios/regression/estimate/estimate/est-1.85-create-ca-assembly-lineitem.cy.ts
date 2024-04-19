import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage,_procurementPage,_estimatePage, _validate, _controllingUnit, _materialPage, _assembliesPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS

let CONTAINERS_COST_CODES
let CONTAINER_COLUMNS_COST_CODES

const MATERIAL_STRUCTURE="MR-" + Cypress._.random(0, 999);
const MATERIAL_STRUCTURE_DESC="MRD-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE
let PROCUREMENT_STRUCTURE_PARAMETERS:DataCells

const MATERIAL_CATALOG_CODE="MC" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC="MC_DESC_" + Cypress._.random(0, 999);
let CONTAINERS_MATERIAL_CATALOGS
let CONTAINER_COLUMNS_MATERIAL_CATALOGS
let MATERIAL_CATALOGS_PARAMETERS:DataCells

const MATERIAL_GROUPS_CODE="MG" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC="MG_DESC_" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_MATERIAL_GROUPS
let MATERIAL_GROUPS_PARAMETERS:DataCells

const MATERIAL_RECORD_CODE="MR" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC="MR_DESC_" + Cypress._.random(0, 999);
let CONTAINERS_MATERIAL_RECORDS
let CONTAINER_COLUMNS_MATERIAL_RECORDS
let MATERIAL_RECORDS_PARAMETERS:DataCells

let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER

let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER

const ASSEMBLY_CATEGORY_DESC="AC_DESC-" + Cypress._.random(0, 999);
let CONTAINERS_ASSEMBLY_CATEGORIES
let CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES

const ASSEMBLIES_DESC="AC_DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_ASSEMBLIES
let ASSEMBLIES_PARAMETERS:DataCells

let CONTAINER_COLUMNS_ASSEMBLY_RESOURCE
let ASSEMBLY_RESOURCE_PARAMETERS:DataCells
let ASSEMBLY_RESOURCE_PARAMETERS_CA:DataCells
let ASSEMBLY_RESOURCE_PARAMETERS_MATERIAL:DataCells

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_LINE_ITEM
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM

let CONTAINER_COLUMNS_RESOURCE

let CONTAINER_COLUMNS_DATA_TYPE

let CONTAINER_COLUMNS_DATA_RECORD
let CONTAINER_COLUMNS_DATA_RECORD_1

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 1.85 | Create CA Assembly Line Item");

describe("EST- 1.85 | Create CA Assembly Line Item", () => {

    before(function () {
        cy.fixture("estimate/est-1.85-create-ca-assembly-lineitem.json")
          .then((data) => {
            this.data=data

            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

            CONTAINERS_COST_CODES=this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES=this.data.CONTAINER_COLUMNS.COST_CODES

            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
            PROCUREMENT_STRUCTURE_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_STRUCTURE_DESC,
                [app.GridCells.PRC_STRUCTURE_TYPE_FK]:commonLocators.CommonKeys.MATERIAL,
                [app.GridCells.CODE]:MATERIAL_STRUCTURE
            }

            CONTAINERS_MATERIAL_CATALOGS=this.data.CONTAINERS.MATERIAL_CATALOGS
            CONTAINER_COLUMNS_MATERIAL_CATALOGS=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
            MATERIAL_CATALOGS_PARAMETERS={
                [app.GridCells.CODE]:MATERIAL_CATALOG_CODE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_CATALOG_DESC,
                [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_CATALOGS.BUSINESS_PARTNER,
                [app.GridCells.VALID_FROM]:_common.getDate(commonLocators.CommonKeys.CURRENT),
                [app.GridCells.VALID_TO]:_common.getDate(commonLocators.CommonKeys.INCREMENTED,5),
                [app.GridCells.MATERIAL_CATALOG_TYPE_FK]:CONTAINERS_MATERIAL_CATALOGS.MATERIAL_TYPE
            }

            CONTAINER_COLUMNS_MATERIAL_GROUPS=this.data.CONTAINER_COLUMNS.MATERIAL_GROUPS
            MATERIAL_GROUPS_PARAMETERS={
                [app.GridCells.CODE]:MATERIAL_GROUPS_CODE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_GROUPS_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]:MATERIAL_STRUCTURE
            }

            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER

            CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER

            CONTAINERS_MATERIAL_RECORDS=this.data.CONTAINERS.MATERIAL_RECORDS
            CONTAINER_COLUMNS_MATERIAL_RECORDS=this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            MATERIAL_RECORDS_PARAMETERS={
                [app.GridCells.CODE]:MATERIAL_RECORD_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]:MATERIAL_RECORD_DESC,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORDS.UOM,
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE,
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORDS.LIST_PRICE
            }

            CONTAINERS_ASSEMBLY_CATEGORIES=this.data.CONTAINERS.ASSEMBLY_CATEGORIES
            CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES=this.data.CONTAINER_COLUMNS.ASSEMBLY_CATEGORIES

            CONTAINER_COLUMNS_ASSEMBLIES=this.data.CONTAINER_COLUMNS.ASSEMBLIES
            ASSEMBLIES_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:ASSEMBLIES_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY
            }

            CONTAINER_COLUMNS_ASSEMBLY_RESOURCE=this.data.CONTAINER_COLUMNS.ASSEMBLY_RESOURCE
            ASSEMBLY_RESOURCE_PARAMETERS={
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY,
                [app.GridCells.CODE]:CONTAINERS_COST_CODES.CODE,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY_1
            }
            ASSEMBLY_RESOURCE_PARAMETERS_CA={
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY_CA,
                [app.GridCells.CODE]:CONTAINERS_ASSEMBLY_CATEGORIES.EXISTING_ASSEMBLIES,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY_3
            }
            ASSEMBLY_RESOURCE_PARAMETERS_MATERIAL={
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY_MATERIAL,
                [app.GridCells.CODE]:MATERIAL_RECORD_CODE,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY_2
            }

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
              [app.GridCells.CODE]: ESTIMATE_CODE,
              [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
              [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
              [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            LINE_ITEM_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]:CONTAINERS_LINE_ITEM.UOM
            }

            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE

            CONTAINER_COLUMNS_DATA_TYPE=this.data.CONTAINER_COLUMNS.DATA_TYPE

            CONTAINER_COLUMNS_DATA_RECORD=this.data.CONTAINER_COLUMNS.DATA_RECORD
            CONTAINER_COLUMNS_DATA_RECORD_1=this.data.CONTAINER_COLUMNS.DATA_RECORD_1
          })
          .then(()=>{
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

    it("TC - Assign cost code type under customizing", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES,CONTAINER_COLUMNS_DATA_TYPE)
            _common.waitForLoaderToDisappear()
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.COST_CODE_TYPE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.COST_CODE_TYPE)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.INSTANCES,CONTAINER_COLUMNS_DATA_RECORD)
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        _common.create_newRecordIfDataNotFound(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, commonLocators.CommonKeys.INFORMATION);
        cy.get('@CHECK_DATA')
		  .then((value) => {
			cy.log(value.toString())
			if (value.toString()=="Data does not exist") {
                _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,commonLocators.CommonKeys.INFORMATION)
                cy.SAVE()
                _common.waitForLoaderToDisappear()
			}		
		  })
    })

    it("TC - Assign Est. Assembly Type under customizing", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.ENTITY_TYPES,CONTAINER_COLUMNS_DATA_TYPE)
            _common.waitForLoaderToDisappear()
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.ASSEMBLY_TYPE)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.EST_ASSEMBLY_TYPE)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.INSTANCES,CONTAINER_COLUMNS_DATA_RECORD_1)
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        _common.create_newRecordIfDataNotFound(cnt.uuid.INSTANCES, app.GridCells.ASSEMBLY_TYPE_LOGIC_FK, commonLocators.CommonKeys.CREW_ASSEMBLY);
        cy.get('@CHECK_DATA')
          .then((value) => {
            if (value.toString()=="Data does not exist") {
                _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.SHORT_KEY_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY_CA)
                _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,commonLocators.CommonKeys.CREW_ASSEMBLY)
                _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.ASSEMBLY_TYPE_LOGIC_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.CREW_ASSEMBLY)
                cy.SAVE()
                _common.waitForLoaderToDisappear()
            }		
          })

        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.waitForLoaderToDisappear()
        _common.create_newRecordIfDataNotFound(cnt.uuid.INSTANCES, app.GridCells.ASSEMBLY_TYPE_LOGIC_FK, commonLocators.CommonKeys.STANDARD_ASSEMBLY);
        cy.get('@CHECK_DATA')
          .then((value) => {
            if (value.toString()=="Data does not exist") {
                _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.SHORT_KEY_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY_SA)
                _common.enterRecord_inNewRow(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,commonLocators.CommonKeys.STANDARD_ASSEMBLY)
                _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES,app.GridCells.ASSEMBLY_TYPE_LOGIC_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.STANDARD_ASSEMBLY)
                cy.SAVE()
                _common.waitForLoaderToDisappear()
            }		
          })        
    })

    it("TC - Set pre-requisite parameter for cost codes (type,is_cost)", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES,CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.code,CONTAINER_COLUMNS_COST_CODES.iscost,CONTAINER_COLUMNS_COST_CODES.costcodetypefk],cnt.uuid.COST_CODES)
        })
        _common.waitForLoaderToDisappear()

        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE)
        cy.wait(500)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES,app.GridCells.CODE,CONTAINERS_COST_CODES.CODE)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES,app.GridCells.IS_COST,commonLocators.CommonKeys.UNCHECK)
        _common.edit_dropdownCellWithCaret(cnt.uuid.COST_CODES,app.GridCells.COST_CODE_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.ESTIMATE_COST_CODE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE_1)
        cy.wait(500)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES,app.GridCells.CODE,CONTAINERS_COST_CODES.CODE_1)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES,app.GridCells.IS_COST,commonLocators.CommonKeys.CHECK)
        _common.edit_dropdownCellWithCaret(cnt.uuid.COST_CODES,app.GridCells.COST_CODE_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.INFORMATION)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()


        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE_2)
        cy.wait(500)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES,app.GridCells.CODE,CONTAINERS_COST_CODES.CODE_2)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES,app.GridCells.IS_COST,commonLocators.CommonKeys.UNCHECK)
        _common.edit_dropdownCellWithCaret(cnt.uuid.COST_CODES,app.GridCells.COST_CODE_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.INFORMATION)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE_3)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES,app.GridCells.CODE,CONTAINERS_COST_CODES.CODE_3)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES,app.GridCells.IS_COST,commonLocators.CommonKeys.CHECK)
        _common.edit_dropdownCellWithCaret(cnt.uuid.COST_CODES,app.GridCells.COST_CODE_TYPE_FK,commonLocators.CommonKeys.LIST,commonLocators.CommonKeys.ESTIMATE_COST_CODE)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.minimizeContainer(cnt.uuid.COST_CODES)

    })

    it("TC - Create material procurement structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE); 
 
        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.waitForLoaderToDisappear()
        _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_PARAMETERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.COST_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CODE_2)
        _common.select_activeRowInContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PROCUREMENT_STRUCTURES)
    })

    it("TC - Create material catalog and material group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG); 
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.setDefaultView(app.TabBar.CATALOGS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS);
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUPS);
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUPS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUPS)
    })

    it("TC - Create material record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.setDefaultView(app.TabBar.RECORDS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOG_FILTER)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED,commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORDS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
    }) 

    it("TC - Create assembly category", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_CATEGORIES, CONTAINER_COLUMNS_ASSEMBLY_CATEGORIES)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLIES, CONTAINER_COLUMNS_ASSEMBLIES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLIES.code,CONTAINER_COLUMNS_ASSEMBLIES.descriptioninfo,CONTAINER_COLUMNS_ASSEMBLIES.quantity,CONTAINER_COLUMNS_ASSEMBLIES.estassemblycatfk,CONTAINER_COLUMNS_ASSEMBLIES.mdccostcodefk,CONTAINER_COLUMNS_ASSEMBLIES.mdcmaterialfk],cnt.uuid.ASSEMBLIES)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
            _common.setup_gridLayout(cnt.uuid.ASSEMBLY_RESOURCE, CONTAINER_COLUMNS_ASSEMBLY_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.code,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.costunit,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.iscost],cnt.uuid.ASSEMBLY_RESOURCE)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_TYPE)
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,CONTAINERS_ASSEMBLY_CATEGORIES.EXISTING_ASSEMBLY_CATEGORY)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK)
        _common.clickOn_activeContainerButton(cnt.uuid.ASSEMBLY_CATEGORIES,btn.IconButtons.ICO_INPUT_DELETE)
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_TYPE)
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)  
    })

    it("TC - Create assemblies", function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.create_newRecord(cnt.uuid.ASSEMBLIES)
        _assembliesPage.enterRecord_toCreateAssemblies(cnt.uuid.ASSEMBLIES,ASSEMBLIES_PARAMETERS)
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_COST_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CODE_3)
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLIES,app.GridCells.CODE,"ASSEMBLY_CA_CODE")

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)
    })

    it("TC - Create assembly resources", function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
       
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_PARAMETERS_CA)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_3_COST_PER_UNIT")
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,"CA_CODE")


        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_1_COST_PER_UNIT")

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_PARAMETERS_MATERIAL)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.COST_UNIT,"AS_2_COST_PER_UNIT")       

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it("TC - Create estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        _common.waitForLoaderToDisappear()
    
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

    it("TC - Create line item with assembly", function() {
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.quantity,CONTAINER_COLUMNS_LINE_ITEM.estassemblyfk,CONTAINER_COLUMNS_LINE_ITEM.descriptioninfo,CONTAINER_COLUMNS_LINE_ITEM.basuomfk],cnt.uuid.ESTIMATE_LINEITEMS,)
            _common.waitForLoaderToDisappear()
        });

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_ASSEMBLY_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,Cypress.env("ASSEMBLY_CA_CODE"))
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify resources gets assigned automatically after assigning assembly template to line item in the resources container of estimate and Verify Cost/unit values of resources with assembly resources", function() {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES,1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES,CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.iscost,CONTAINER_COLUMNS_RESOURCE.code,CONTAINER_COLUMNS_RESOURCE.estresourcetypeshortkey,CONTAINER_COLUMNS_RESOURCE.costunit],cnt.uuid.RESOURCES,)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,CONTAINERS_COST_CODES.CODE)
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.TREE)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,(parseFloat(Cypress.env("AS_1_COST_PER_UNIT"))).toString())
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES,app.GridCells.IS_COST,commonLocators.CommonKeys.UNCHECK)
        
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,MATERIAL_RECORD_CODE)
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.TREE)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,(parseFloat(Cypress.env("AS_2_COST_PER_UNIT"))).toString())
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES,app.GridCells.IS_COST,commonLocators.CommonKeys.UNCHECK)

        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES,app.GridCells.CODE,Cypress.env("CA_CODE"))
        _common.clickOn_activeRowCell(cnt.uuid.RESOURCES,app.GridCells.TREE)
        _common.assert_forNumericValues(cnt.uuid.RESOURCES,app.GridCells.COST_UNIT,(parseFloat(Cypress.env("AS_3_COST_PER_UNIT"))).toString())
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.RESOURCES,app.GridCells.IS_COST,commonLocators.CommonKeys.CHECK)

        _common.minimizeContainer(cnt.uuid.RESOURCES)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify is_cost under assembly resources", function() {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ASSEMBLIES);
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // This wait is required if not added script fails
          .then(()=>{
            _common.waitForLoaderToDisappear()
            cy.reload()
            cy.wait(2000) // This wait is required if not added script fails
          })
        
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,CONTAINERS_COST_CODES.CODE)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.TREE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.IS_COST,commonLocators.CommonKeys.UNCHECK)

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,MATERIAL_RECORD_CODE)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.TREE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.IS_COST,commonLocators.CommonKeys.UNCHECK)

        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,Cypress.env("CA_CODE"))
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.TREE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.IS_COST,commonLocators.CommonKeys.CHECK)

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)      
    })

    it("TC - Cost code should not be displayed under assembly resource if cost code type=information and is_cost=1", function() {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,commonLocators.CommonKeys.GRID,CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY)
        _validate.verify_dataUnderCostCodeLookups(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CODE,app.GridCells.CODE_CAPS,CONTAINERS_COST_CODES.CODE_1,commonLocators.CommonKeys.SHOULD_NOT_EXIST)
        _common.delete_recordFromContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it("TC - If you select cost code, the material column will be read only and If you select material, the cost code column will be readonly", function() {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _validate.verify_inputFieldVisibility(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.NOT_VISIBLE)

        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_COST_CODE_FK)
        _common.clickOn_activeContainerButton(cnt.uuid.ASSEMBLIES,btn.IconButtons.ICO_INPUT_DELETE)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_MATERIAL_FK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,MATERIAL_RECORD_CODE)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_COST_CODE_FK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _validate.verify_inputFieldVisibility(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_MATERIAL_FK,commonLocators.CommonKeys.VISIBLE,app.InputFields.INPUT_GROUP_CONTENT)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)
    })

    it("TC - Verify if Assembly Type is CA then under resource short key Standard Assembly will not be displayed", function() {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_TYPE)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _validate.verify_shortKeyVisibility(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY_SA,commonLocators.CommonKeys.NOT_SPACE_VISIBLE)
        _common.delete_recordFromContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it("TC - Verify if Assembly Type is standard assembly then under resource short key CA will be displayed", function() {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.EST_ASSEMBLY_TYPE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ASSEMBLY_CATEGORIES.ASSEMBLY_TYPE_SA)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.DESCRIPTION_INFO)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ASSEMBLIES,app.GridCells.DESCRIPTION_INFO,ASSEMBLIES_DESC)
        _common.minimizeContainer(cnt.uuid.ASSEMBLIES)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _validate.verify_shortKeyVisibility(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY,CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY_CA,commonLocators.CommonKeys.VISIBLE_SMALL)
        _common.delete_recordFromContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })
});