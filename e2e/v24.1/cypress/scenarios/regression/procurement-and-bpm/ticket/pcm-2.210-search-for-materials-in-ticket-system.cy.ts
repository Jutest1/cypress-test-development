
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _ticketSystemPage } from "cypress/pages";
import { app, tile, cnt, commonLocators, btn, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();


let CONTAINER_COLUMNS_MATERIAL_CATALOG
let CONTAINER_COLUMNS_MATERIAL_GROUP
let CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER
let CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER
let CONTAINER_COLUMNS_MATERIAL_RECORDS

const MATERIAL_STRUCTURE="MS-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE
let PROCUREMENT_STRUCTURE_PARAMETERS:DataCells

const PROJECT_NO="39" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS
let CLERK_PARAMETER:DataCells
let CONTAINER_COLUMNS_COMPANIES
let CONTAINER_COLUMNS_CLERKS

const CU_DESC = "CU-DESC-" + Cypress._.random(0, 999);
let CONTAINER_COLUMNS_CONTROLLING_UNIT
let CONTAINERS_CONTROLLING_UNIT
let CONTROLLING_UNIT_PARAMETERS:DataCells

const MATERIAL_CATALOG_CODE="MC" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC="MC_DESC_" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_CODE="MG" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC="MG_DESC_" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE="MR" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC="MR_DESC_" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE_2="MRC" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC_2="MRC_DESC_" + Cypress._.random(0, 999);
let CONTAINERS_MATERIAL_RECORD
let MATERIAL_CATALOGS_PARAMETER:DataCells
let MATERIAL_GROUP_PARAMETER:DataCells
let MATERIAL_RECORD_PARAMETER:DataCells
let MATERIAL_RECORD_PARAMETER_TYPE2:DataCells


const PRICE_LIST_DESC="PL-" + Cypress._.random(0, 999);
const PRICE_VERSION_DESC="PVD-" + Cypress._.random(0, 999);
const ATTRIBUTE="ATR-" + Cypress._.random(0, 999);
const ATTRIBUTEVALUE="360"
let CONTAINER_COLUMNS_PRICE_VERSIONS
let CONTAINER_COLUMNS_PRICE_LIST
let CONTAINER_COLUMNS_ATTRIBUTE
let CONTAINER_COLUMNS_ATTRIBUTE_VALUES
let CONTAINER_COLUMNS_ATTRIBUTE_RECORD_VALUES
let ATTRIBUTE_PARAMETER:DataCells
let CONTAINERS_ATTRIBUTE

let CONTAINERS_CUSTOMIZING

let COMMODITY_RESULT_PARAMETER:DataCells
let COMMODITY_RESULT_PARAMETER_EXIST:DataCells
let COMMODITY_RESULT_PARAMETER_1:DataCells
let COMMODITY_RESULT_PARAMETER_2:DataCells
let COMMODITY_RESULT_PARAMETER_3:DataCells
let COMMODITY_RESULT_PARAMETER_4:DataCells
let COMMODITY_RESULT_PARAMETER_5:DataCells
let COMMODITY_RESULT_PARAMETER_6:DataCells
let COMMODITY_RESULT_PARAMETER_7:DataCells
let COMMODITY_RESULT_PARAMETER_8:DataCells
let COMMODITY_RESULT_PARAMETER_9:DataCells
let COMMODITY_RESULT_PARAMETER_10:DataCells
let COMMODITY_RESULT_PARAMETER_11:DataCells
let COMMODITY_RESULT_PARAMETER_12:DataCells
let COMMODITY_RESULT_PARAMETER_13:DataCells
let COMMODITY_RESULT_PARAMETER_14:DataCells

let CONTAINERS_MATERIAL_TYPE

let CONTAINERS_ONLY_FRAMEWORK_CATALOG

let COMMODITY_RESULT_PARAMETER_LOWTOHIGH:DataCells
let COMMODITY_RESULT_PARAMETER_HIGHTOLOW:DataCells

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Ticket System");

ALLURE.story("PCM- 2.210 | Search for Materials in Ticket System");
describe("PCM- 2.210 | Search for Materials in Ticket System", () => {
 
    before(function () {
        cy.fixture("pcm/pcm-2.210-search-for-materials-in-ticket-system.json")
          .then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE=this.data.CONTAINER_COLUMNS.PROCUREMENT_STRUCTURE
            PROCUREMENT_STRUCTURE_PARAMETERS={
                [app.GridCells.PRC_STRUCTURE_TYPE_FK]:commonLocators.CommonKeys.MATERIAL,
                [app.GridCells.CODE]:MATERIAL_STRUCTURE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_STRUCTURE
            }

            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
                [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
                [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            CLERK_PARAMETER={
                [app.GridCells.CODE]:MODAL_PROJECTS.CLERK
            }
            CONTAINER_COLUMNS_COMPANIES=this.data.CONTAINER_COLUMNS.COMPANIES
            CONTAINER_COLUMNS_CLERKS=this.data.CONTAINER_COLUMNS.CLERKS

            CONTAINER_COLUMNS_CONTROLLING_UNIT=this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT=this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]:CU_DESC,
                [app.GridCells.QUANTITY_SMALL]:CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]:CONTAINERS_CONTROLLING_UNIT.UOM
            }

            CONTAINER_COLUMNS_MATERIAL_CATALOG=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_GROUP=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER
            CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER
            CONTAINER_COLUMNS_MATERIAL_RECORDS=this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            CONTAINERS_MATERIAL_RECORD=this.data.CONTAINERS.MATERIAL_RECORD
            MATERIAL_CATALOGS_PARAMETER={
                [app.GridCells.CODE]:MATERIAL_CATALOG_CODE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_CATALOG_DESC,
                [app.GridCells.BUSINESS_PARTNER_FK]:CONTAINERS_MATERIAL_RECORD.BUSINESS_PARTNER,
                [app.GridCells.VALID_FROM]:_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL),
                [app.GridCells.VALID_TO]:_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,5),
                [app.GridCells.MATERIAL_CATALOG_TYPE_FK]:commonLocators.CommonKeys.INTERNET_CATALOG,
                [app.GridCells.IS_TICKET_SYSTEM]:commonLocators.CommonKeys.UNCHECK,
                [app.GridCells.IS_NEUTRAL]:commonLocators.CommonKeys.CHECK
            } 
            MATERIAL_GROUP_PARAMETER={
                [app.GridCells.CODE]:MATERIAL_GROUPS_CODE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIAL_GROUPS_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]:MATERIAL_STRUCTURE
            }
            MATERIAL_RECORD_PARAMETER={
                [app.GridCells.CODE]:MATERIAL_RECORD_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]:MATERIAL_RECORD_DESC,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[0],
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[0],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[0],
                [app.GridCells.MIN_QUANTITY]:CONTAINERS_MATERIAL_RECORD.MIN_QTY[0],
                [app.GridCells.MATERIAL_TYPE_FK]:commonLocators.CommonKeys.STOCK_MANAGED_MATERIAL,
                [app.GridCells.CO2_PROJECT]:CONTAINERS_MATERIAL_RECORD.CO2_PROJECT
            }
            MATERIAL_RECORD_PARAMETER_TYPE2={
                [app.GridCells.CODE]:MATERIAL_RECORD_CODE_2,
                [app.GridCells.DESCRIPTION_INFO_1]:MATERIAL_RECORD_DESC_2,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[1],
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[1],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[1],
                [app.GridCells.MIN_QUANTITY]:CONTAINERS_MATERIAL_RECORD.MIN_QTY[1],
                [app.GridCells.MATERIAL_TYPE_FK]:commonLocators.CommonKeys.STOCK_MANAGED_MATERIAL,
                [app.GridCells.NEUTRAL_MATERIAL_CATALOG_FK]:MATERIAL_CATALOG_CODE,
                [app.GridCells.MDC_MATERIAL_FK]:MATERIAL_RECORD_CODE
            }

            CONTAINER_COLUMNS_PRICE_VERSIONS=this.data.CONTAINER_COLUMNS.PRICE_VERSIONS
            CONTAINER_COLUMNS_PRICE_LIST=this.data.CONTAINER_COLUMNS.PRICE_LIST
            CONTAINER_COLUMNS_ATTRIBUTE=this.data.CONTAINER_COLUMNS.ATTRIBUTE
            CONTAINER_COLUMNS_ATTRIBUTE_VALUES=this.data.CONTAINER_COLUMNS.ATTRIBUTE_VALUES
            CONTAINER_COLUMNS_ATTRIBUTE_RECORD_VALUES=this.data.CONTAINER_COLUMNS.ATTRIBUTE_RECORD_VALUES
            ATTRIBUTE_PARAMETER={
                [app.GridCells.PROPERTY_INFO]:ATTRIBUTE,
                [app.GridCells.HAS_FIXED_VALUES]:commonLocators.CommonKeys.CHECK
            }

            CONTAINERS_CUSTOMIZING=this.data.CONTAINERS.CUSTOMIZING

            COMMODITY_RESULT_PARAMETER={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.CATALOG_DOES_NOT_EXISTS,
                [commonLocators.CommonLabels.CATALOG]:MATERIAL_CATALOG_DESC,
            }
            COMMODITY_RESULT_PARAMETER_EXIST={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.CATALOG_EXISTS,
                [commonLocators.CommonLabels.CATALOG]:MATERIAL_CATALOG_DESC,
            }

            let path=sidebar.SideBarOptions.MATERIAL_CATALOG+'/'+MATERIAL_GROUPS_CODE+" "+MATERIAL_GROUPS_DESC
            COMMODITY_RESULT_PARAMETER_1={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.DROP_DOWN,
                [commonLocators.CommonKeys.PATH]:path,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC
            }

            let path_1=commonLocators.CommonLabels.PROCUREMENT_STRUCTURE_SMALL+'/'+MATERIAL_STRUCTURE
            COMMODITY_RESULT_PARAMETER_2={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.DROP_DOWN,
                [commonLocators.CommonKeys.PATH]:path_1,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC
            }

            COMMODITY_RESULT_PARAMETER_3={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.SEARCH_TERM,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC
            }

            CONTAINERS_ONLY_FRAMEWORK_CATALOG=this.data.CONTAINERS.ONLY_FRAMEWORK_CATALOG

            COMMODITY_RESULT_PARAMETER_4={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.FILTER_SMALL,
                [commonLocators.CommonKeys.FILTER]:CONTAINERS_ONLY_FRAMEWORK_CATALOG,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC
            }

            CONTAINERS_ATTRIBUTE=this.data.CONTAINERS.ATTRIBUTE
            COMMODITY_RESULT_PARAMETER_5={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.ATTRIBUTE,
                [commonLocators.CommonLabels.UOM]:CONTAINERS_ATTRIBUTE,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC
            }
            COMMODITY_RESULT_PARAMETER_6={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.ICON,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC
            }

            COMMODITY_RESULT_PARAMETER_7={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.MIN_QUANTITY,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC,
                [app.InputFields.QUANTITY_INPUT]:CONTAINERS_MATERIAL_RECORD.MIN_QTY[0]
            }

            CONTAINERS_MATERIAL_TYPE=this.data.CONTAINERS.MATERIAL_TYPE
            COMMODITY_RESULT_PARAMETER_8={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.MATERIAL_TYPE_SMALL,
                [commonLocators.CommonLabels.MATERIAL_TYPE]:CONTAINERS_MATERIAL_TYPE,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_CODE
            }
            COMMODITY_RESULT_PARAMETER_9={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.MATERIAL_TYPE_SMALL,
                [commonLocators.CommonLabels.MATERIAL_TYPE]:CONTAINERS_MATERIAL_TYPE,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_CODE_2
            }
            COMMODITY_RESULT_PARAMETER_10={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.LIST_PRICE,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC,
                [commonLocators.CommonLabels.PRICE_LIST]:PRICE_LIST_DESC,
                [commonLocators.CommonKeys.VALUE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[2]
            }
            COMMODITY_RESULT_PARAMETER_11={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.CART_RECORD,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC,
            }
            COMMODITY_RESULT_PARAMETER_12={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.ALTERNATIVE,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC_2,
                [app.GridCells.ICO_ALTERNATIVE]:MATERIAL_RECORD_CODE
            }
            COMMODITY_RESULT_PARAMETER_13={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.ALTERNATIVE,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC,
                [app.GridCells.ICO_ALTERNATIVE]:MATERIAL_RECORD_CODE_2
            }

            COMMODITY_RESULT_PARAMETER_14={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.DETAILS_CO2_ATTRIBUTE_PRICE_LIST,
                [commonLocators.CommonKeys.SEARCH_RESULT]:MATERIAL_RECORD_DESC,
                [app.GridCells.DESCRIPTION_CO2_PROJECT]:CONTAINERS_MATERIAL_RECORD.CO2_PROJECT,
                [app.GridCells.ATTRIBUTE_PROPERTY]:ATTRIBUTE,
                [app.GridCells.ATTRIBUTE_VALUE]:ATTRIBUTEVALUE,
                [commonLocators.CommonLabels.PRICE_LIST]:PRICE_LIST_DESC
            }

            let path_2=sidebar.SideBarOptions.MATERIAL_CATALOG+'/'+MATERIAL_GROUPS_CODE+" "+MATERIAL_GROUPS_DESC

            COMMODITY_RESULT_PARAMETER_LOWTOHIGH={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.SORTING_LOW_TO_HIGH,
                [commonLocators.CommonKeys.PATH]:path_2
            }
            COMMODITY_RESULT_PARAMETER_HIGHTOLOW={
                [commonLocators.CommonLabels.TYPE]:commonLocators.CommonKeys.SORTING_HIGH_TO_LOW,
                [commonLocators.CommonKeys.PATH]:path_2
            }
          })
          .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
        })
    });  

    after(() => {
    cy.LOGOUT();
    });

    it("TC - Set Is Framework under customizing module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING); 

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.MATERIAL_CATALOG_TYPE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.INSTANCES,app.GridCells.IS_FRAMEWORK,commonLocators.CommonKeys.UNCHECK)
        _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.INTERNET_CATALOG)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.INTERNET_CATALOG)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()

        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Set Is For Procurement under customizing module", function () {
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonKeys.MATERIAL_TYPE)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.NAME,commonLocators.CommonKeys.MATERIAL_TYPE)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.STOCK_MANAGED_MATERIAL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.STOCK_MANAGED_MATERIAL)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FOR_PROCUREMENT,commonLocators.CommonKeys.CHECK)

        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create price list under customizing module", function () {

        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ENTITY_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.search_inSubContainer(cnt.uuid.ENTITY_TYPES,commonLocators.CommonLabels.PRICE_LIST)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ENTITY_TYPES,app.GridCells.MODULE_NAME,commonLocators.CommonKeys.MASTER_DATA)
        cy.REFRESH_CONTAINER()

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 2);
        })
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_LIST_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.CONTEXT_FK, commonLocators.CommonKeys.LIST, CONTAINERS_CUSTOMIZING.CONTEXT)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.LIST, CONTAINERS_CUSTOMIZING.CURRENCY)
        _common.select_activeRowInContainer(cnt.uuid.INSTANCES)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create material procurement structure", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROCUREMENT_STRUCTURE); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.GENERALS).then(() => {
          _common.select_tabFromFooter(cnt.uuid.PROCUREMENT_STRUCTURES, app.FooterTab.PROCUREMENT_STRUCTURES, 0);
          _common.setup_gridLayout(cnt.uuid.PROCUREMENT_STRUCTURES,CONTAINER_COLUMNS_PROCUREMENT_STRUCTURE)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.select_allContainerData(cnt.uuid.PROCUREMENT_STRUCTURES)
        _common.clickOn_toolbarButton(cnt.uuid.PROCUREMENT_STRUCTURES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.PROCUREMENT_STRUCTURES)
        _procurementPage.enterRecord_toCreateProcurementStructure(cnt.uuid.PROCUREMENT_STRUCTURES,PROCUREMENT_STRUCTURE_PARAMETERS)
        cy.SAVE()
    })

    it("TC - Assign logged-in user a clerk", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY); 
    
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.COMPANY).then(() => {
            _common.setDefaultView(app.TabBar.COMPANY)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
            _common.setup_gridLayout(cnt.uuid.COMPANIES, CONTAINER_COLUMNS_COMPANIES)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.COMPANIES)
        _common.search_inSubContainer(cnt.uuid.COMPANIES,MODAL_PROJECTS.COMPANY_NAME)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COMPANIES,app.GridCells.COMPANY_NAME_SMALL,MODAL_PROJECTS.COMPANY_NAME)
        _common.clickOn_goToButton_toSelectModule(cnt.uuid.COMPANIES,commonLocators.CommonKeys.CLERK)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CLERK).then(() => {
            _common.setDefaultView(app.TabBar.CLERK)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CLERKS, app.FooterTab.CLERKS, 0);
            _common.setup_gridLayout(cnt.uuid.CLERKS, CONTAINER_COLUMNS_CLERKS)
        });
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CLERKS)
        _common.assign_clerkForLoggedInUser(cnt.uuid.CLERKS,CLERK_PARAMETER)
        _common.waitForLoaderToDisappear()
        
    });

    it("TC - Create new project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT); 

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

    it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS); 
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();  
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
          _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
          _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_UNIT,CU_DESC)
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT,app.GridCells.CODE,"CONTROLLING_UNIT_CODE")
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT,app.GridCells.IS_STOCK_MANAGEMENT,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create material catalog and material group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.setDefaultView(app.TabBar.CATALOGS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG);
            _common.set_columnAtTop([CONTAINER_COLUMNS_MATERIAL_CATALOG.isneutral,CONTAINER_COLUMNS_MATERIAL_CATALOG.isticketsystem],cnt.uuid.MATERIAL_CATALOGS)
        })
        _common.waitForLoaderToDisappear()
        cy.wait(1000) // Added this wait as container is taking time to load
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.IS_NEUTRAL,commonLocators.CommonKeys.UNCHECK)
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.MATERIAL_CATALOGS,app.GridCells.IS_TICKET_SYSTEM,commonLocators.CommonKeys.UNCHECK)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP);
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUPS)

        //!Create Price Version under Material Catalogs

        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION, app.FooterTab.PRICE_VERSIONS,2);
            _common.setup_gridLayout(cnt.uuid.PRICE_VERSION, CONTAINER_COLUMNS_PRICE_VERSIONS)
        });
        _common.maximizeContainer(cnt.uuid.PRICE_VERSION)
        _common.create_newRecord(cnt.uuid.PRICE_VERSION)
        _common.select_rowInContainer(cnt.uuid.PRICE_VERSION)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_VERSION_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICE_LIST_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICE_VERSION)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.PRICE_VERSION)

        //!Create Attribute under Material Catalogs
        
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2);
            _common.setup_gridLayout(cnt.uuid.ATTRIBUTE,CONTAINER_COLUMNS_ATTRIBUTE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ATTRIBUTE)
        _common.create_newRecord(cnt.uuid.ATTRIBUTE)
        _materialPage.enterRecord_toCreateNewAttribute(cnt.uuid.ATTRIBUTE,ATTRIBUTE_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        //!Create Attribute value under Material Catalogs

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ATTRIBUTE_VALUES, app.FooterTab.ATTRIBUTES_VALUES, 3);
            _common.setup_gridLayout(cnt.uuid.ATTRIBUTE_VALUES, CONTAINER_COLUMNS_ATTRIBUTE_VALUES)
        });
        _common.create_newRecord(cnt.uuid.ATTRIBUTE_VALUES)
        _common.enterRecord_inNewRow(cnt.uuid.ATTRIBUTE_VALUES, app.GridCells.CHARACTERISTIC_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, ATTRIBUTEVALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

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
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED,  commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUP_FILTER)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        })
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,MATERIAL_RECORD_PARAMETER_TYPE2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)

        //!Create Price List under Material Record

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 2)
            _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
        });
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DESCRIPTION_INFO_1, MATERIAL_RECORD_DESC)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 2)
        });
        _common.maximizeContainer(cnt.uuid.PRICE_LISTS)
        _common.create_newRecord(cnt.uuid.PRICE_LISTS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[2])
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL_RECORD.LIST_PRICE[2])
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRICE_VERSION_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

        _common.minimizeContainer(cnt.uuid.PRICE_LISTS)

        //!Create Attribute Values under Material Record

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_ATTRIBUTE, CONTAINER_COLUMNS_ATTRIBUTE_RECORD_VALUES)
        });
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DESCRIPTION_INFO_1, MATERIAL_RECORD_DESC)

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_ATTRIBUTE, app.FooterTab.ATTRIBUTES, 2)
        });

        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_ATTRIBUTE)
        _common.delete_recordInContainer_ifRecordExists(cnt.uuid.MATERIAL_ATTRIBUTE)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.MATERIAL_ATTRIBUTE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_ATTRIBUTE,app.GridCells.PROPERTY_DESCRIPTION,commonLocators.CommonKeys.LIST,ATTRIBUTE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.MATERIAL_ATTRIBUTE,app.GridCells.CHARACTERISTIC_DESCRIPTION,commonLocators.CommonKeys.LIST,ATTRIBUTEVALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    }) 

    it("TC - If material catalog.isticketsystem=false, then the materials in this catalog should not filter out ticket system module", function () {
        
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.deleteRecord_toClearItemsInCart(cnt.uuid.CART_ITEMS)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })

        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER)
        _common.waitForLoaderToDisappear()
  
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
        })

        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.IS_TICKET_SYSTEM, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.waitForLoaderToDisappear()

       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM); 
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        cy.wait(1000) // added this as script was failing
          .then(()=>{
            cy.reload()
            cy.wait(2000) // added this as script was failing
            cy.reload()
            cy.wait(3000) // added this as script was failing
          })
        
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.deleteRecord_toClearItemsInCart(cnt.uuid.CART_ITEMS)

        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })

        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_EXIST)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Select a material catalog to search, it search materials belong selected material", function () {
       
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
        })

        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.IS_TICKET_SYSTEM, commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TICKET_SYSTEM); 
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _ticketSystemPage.deleteRecord_toClearItemsInCart(cnt.uuid.CART_ITEMS)

        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })

        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_1)
        _common.waitForLoaderToDisappear()
    }) 

    it("TC - Select a procurement structure to search , it search materials belong selected structure", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_2)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Input value to search , it search out materials", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })

        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_3)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Check 'only framework catalog', it will only show materials which belong framework catalog", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })

        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_4)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Select attribute in left side , it will filter materials belong selected attribute", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_5)
        _common.waitForLoaderToDisappear()
    })

    it("TC - If material is framework material, then it will show icon 'from framework Catalog'", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_6)
        _common.waitForLoaderToDisappear()
    })

    it("TC - In search result, the quantity will default to min quantity", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })

        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_7)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Only material type.isprocurment=true, then it will filter out in ticket system module", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_8)
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_9)
        _common.waitForLoaderToDisappear()
    })

    it("TC - It should check, the search result sorting order (price(high to low), price(low to high))", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_HIGHTOLOW)
        _common.waitForLoaderToDisappear()
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_LOWTOHIGH)
        _common.waitForLoaderToDisappear()
    })

    it("TC - If material has price list, then select price list, the price message should from price list", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_10)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Click 'cart' button,it will add material to cart", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
        })
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [MATERIAL_RECORD_CODE], ["3"])

        _common.openTab(app.TabBar.CART).then(() => {
           _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _validate.verify_commoditySearchResult(cnt.uuid.CART_ITEMS,COMMODITY_RESULT_PARAMETER_11)
        _common.waitForLoaderToDisappear()
    })

    it("TC - If material.neutralmaterial has value, then it will have alternative icon, and click it will list relate materials", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })

        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_12)
        _common.waitForLoaderToDisappear()
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_13)

    })

    it("TC - Click material, it will go into details dialog, it will show attribute and it should show CO2(project) and select different price list, the message should be change from price list too", function () {
        _common.openTab(app.TabBar.SEARCH).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COMMODITY_SEARCH, app.FooterTab.COMMODITY_SEARCH)
            _common.waitForLoaderToDisappear()
        })
        _validate.verify_commoditySearchResult(cnt.uuid.COMMODITY_SEARCH,COMMODITY_RESULT_PARAMETER_14)
    })
});