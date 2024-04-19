import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage, _assembliesPage, _materialPage } from "cypress/pages";
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()

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
let ASSEMBLY_RESOURCE_MATERIAL_PARAMETERS:DataCells
let ASSEMBLY_RESOURCE__COST_CODE_PARAMETERS:DataCells

let RECALCULATE_ASSEMBLIES_PARAMETERS:DataCells
let MODAL_RECALCULATE_ASSEMBLIES;

let MODAL_UPDATE_SETTING;


ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.6 | Update CO2/kg attribute from master in assemblies ")
describe("EST- 4.6 | Update CO2/kg attribute from master in assemblies ", () => {
  
    before(function () {
        cy.fixture("estimate/est-4.6-Update-co2-attribute-from-master-in-assemblies.json")
          .then((data) => {
            this.data=data
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
            ASSEMBLY_RESOURCE__COST_CODE_PARAMETERS={
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY[0],
                [app.GridCells.CODE]:CONTAINERS_COST_CODES.CODE,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY
            }
            ASSEMBLY_RESOURCE_MATERIAL_PARAMETERS={
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]:CONTAINERS_ASSEMBLY_CATEGORIES.SHORT_KEY[1],
                [app.GridCells.CODE]:MATERIAL_RECORD_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_ASSEMBLY_CATEGORIES.QUANTITY
            }
            MODAL_RECALCULATE_ASSEMBLIES=this.data.MODAL.RECALCULATE_ASSEMBLIES
            RECALCULATE_ASSEMBLIES_PARAMETERS={
                [commonLocators.CommonKeys.RADIO]:MODAL_RECALCULATE_ASSEMBLIES.SELECT_UPDATE_SCOPE,
                [commonLocators.CommonKeys.RADIO_INDEX]:1,
                [commonLocators.CommonKeys.CHECKBOX]:MODAL_UPDATE_SETTING
            }
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
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();  
          })
    });

    after(() => {
        cy.LOGOUT();
    });
    
    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES,CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.code,CONTAINER_COLUMNS_COST_CODES.co2project],cnt.uuid.COST_CODES)
        })
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // This wait is required as its taking time to load container
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE)
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CO2_PROJECT)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
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
        _common.edit_dropdownCellWithInput(cnt.uuid.PROCUREMENT_STRUCTURES,app.GridCells.COST_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CODE)
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

    it("TC - Create material record and add CO2 project value to it", function () {
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
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_MATERIAL_RECORDS.CO2_PROJECT)
        _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
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
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.code,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2project,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2source,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2projecttotal,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2sourcetotal],cnt.uuid.ASSEMBLY_RESOURCE)
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
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

       
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
        _common.edit_dropdownCellWithInput(cnt.uuid.ASSEMBLIES,app.GridCells.MDC_COST_CODE_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.CODE)
        _common.select_activeRowInContainer(cnt.uuid.ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

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
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE__COST_CODE_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.create_newRecord(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.waitForLoaderToDisappear()
        _assembliesPage.enterRecord_toCreateAssemblyResource(ASSEMBLY_RESOURCE_MATERIAL_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it('TC - Verify CO2/kg(source) is not editable in assembly resource', function () {
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.select_rowHasValue(cnt.uuid.ASSEMBLY_RESOURCE,CONTAINERS_COST_CODES.CODE)
        _validate.verify_isRecordNotEditable(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CO2_SOURCE,0)

        _common.select_rowHasValue(cnt.uuid.ASSEMBLY_RESOURCE,MATERIAL_RECORD_CODE)
        _validate.verify_isRecordNotEditable(cnt.uuid.ASSEMBLY_RESOURCE,app.GridCells.CO2_SOURCE,0)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
    })

    it('TC - Update CO2/kg(Project) for cost code record', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES,CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.code,CONTAINER_COLUMNS_COST_CODES.co2project],cnt.uuid.COST_CODES)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE)
        cy.wait(1000) // This wait is required as container take time to load
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.COST_CODES,CONTAINERS_COST_CODES.CODE)
        _common.enterRecord_inNewRow(cnt.uuid.COST_CODES,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_COST_CODES.UPDATED_CO2_PROJECT)
        _common.select_activeRowInContainer(cnt.uuid.COST_CODES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Update CO2 project value to record in material module', function () {
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
        _common.select_rowHasValue(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.MATERIAL_RECORDS,app.GridCells.CO2_PROJECT,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_MATERIAL_RECORDS.UPDATE_CO2_PROJECT)
        _common.select_activeRowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
    })

    it('TC - Recalculate assembly', function () {
       
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
            _common.set_columnAtTop([CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.estresourcetypeshortkey,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.code,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2project,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2source,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2projecttotal,CONTAINER_COLUMNS_ASSEMBLY_RESOURCE.co2sourcetotal],cnt.uuid.ASSEMBLY_RESOURCE)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)


        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.select_rowHasValue(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.select_allContainerData(cnt.uuid.ASSEMBLY_RESOURCE)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.RECALCULATE_ASSEMBLIES)
        _common.waitForLoaderToDisappear()
        _assembliesPage.recalculate_assemblies_fromWizard(RECALCULATE_ASSEMBLIES_PARAMETERS)
        _common.waitForLoaderToDisappear()      
    })

    it('TC - Verify co2 attribute for material and cost code resource is updated after recalculate assembly', function () {

        _common.waitForLoaderToDisappear()
        
        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_CATEGORIES, app.FooterTab.ASSEMBLYCATEGORY, 0);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLY_CATEGORIES)
        _common.search_inSubContainer(cnt.uuid.ASSEMBLY_CATEGORIES,ASSEMBLY_CATEGORY_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.ASSEMBLY_CATEGORIES,app.GridCells.MARKER)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_CATEGORIES)


        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLIES, app.FooterTab.ASSEMBLIES, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.ASSEMBLIES)
        _common.select_rowHasValue(cnt.uuid.ASSEMBLIES,ASSEMBLIES_DESC)


        _common.openTab(app.TabBar.ASSEMBLIES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ASSEMBLY_RESOURCE, app.FooterTab.ASSEMBLY_RESOURCE, 2);
        });
        _common.maximizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)
        _common.select_rowHasValue(cnt.uuid.ASSEMBLY_RESOURCE,CONTAINERS_COST_CODES.CODE)
        _common.assert_forNumericValues(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT,CONTAINERS_COST_CODES.UPDATED_CO2_PROJECT)

        _common.select_rowHasValue(cnt.uuid.ASSEMBLY_RESOURCE,MATERIAL_RECORD_CODE)
        _common.assert_forNumericValues(cnt.uuid.ASSEMBLY_RESOURCE, app.GridCells.CO2_PROJECT,CONTAINERS_MATERIAL_RECORDS.UPDATE_CO2_PROJECT)
        _common.minimizeContainer(cnt.uuid.ASSEMBLY_RESOURCE)       
    })

})