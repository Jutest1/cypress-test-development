
import { tile, app, cnt,btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_procurementPage, _wipPage,_estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage, _ticketSystemPage } from "cypress/pages";
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
let CONTAINERS_MATERIAL_RECORD
let MATERIAL_CATALOGS_PARAMETER:DataCells
let MATERIAL_GROUP_PARAMETER:DataCells
let MATERIAL_RECORD_PARAMETER:DataCells

let CART_REQUISITION_PARAMETER:DataCells

let CONTAINER_COLUMNS_REQUISITION

let CONTAINER_COLUMNS_REQUISITION_ITEMS

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");

ALLURE.story("PCM- 2.212 | Choose procurement type as requisition and create one");
describe("PCM- 2.212 | Choose procurement type as requisition and create one", () => {
        
    before(function () {
        cy.fixture("pcm/pcm-2.212-choose-procurement-type-as-requisition-and-create-one.json")
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
                [app.GridCells.MATERIAL_CATALOG_TYPE_FK]:commonLocators.CommonKeys.NEUTRAL_MATERIAL,
                [app.GridCells.IS_TICKET_SYSTEM]:commonLocators.CommonKeys.CHECK,
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

            CONTAINER_COLUMNS_REQUISITION=this.data.CONTAINER_COLUMNS.REQUISITION

            CONTAINER_COLUMNS_REQUISITION_ITEMS=this.data.CONTAINER_COLUMNS.REQUISITION_ITEMS
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
        _common.search_inSubContainer(cnt.uuid.INSTANCES,commonLocators.CommonKeys.NEUTRAL_MATERIAL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.INSTANCES,app.GridCells.DESCRIPTION_INFO,commonLocators.CommonKeys.NEUTRAL_MATERIAL)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT,commonLocators.CommonKeys.CHECK)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_FRAMEWORK,commonLocators.CommonKeys.CHECK)
        _common.waitForLoaderToDisappear()

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
        _common.waitForLoaderToDisappear()
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

        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
    })    

    it("TC - Add material to cart", function () {
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
        })
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.enterRecord_toAddMaterialInCart(cnt.uuid.COMMODITY_SEARCH, [MATERIAL_RECORD_CODE], [CONTAINERS_MATERIAL_RECORD.QUANTITY])
        _common.waitForLoaderToDisappear()
    })

    it("TC - If 'Procurement Type' is 'Requisition', click place order button, in dialog,each fields is working and filter is ok", function () {
        CART_REQUISITION_PARAMETER={
            [commonLocators.CommonLabels.PROJECT]:PROJECT_NO,
            [commonLocators.CommonElements.PROC_STRUCTURE]:MATERIAL_STRUCTURE,
            [commonLocators.CommonLabels.REQUISITION_OWNER]:Cypress.env("CLERK_LOGGED_USER"),
            [commonLocators.CommonLabels.RESPONSIBLE]:Cypress.env("CLERK_LOGGED_USER"),
            [commonLocators.CommonLabels.CONTROLLING_UNIT]:CU_DESC
        }
        _common.openTab(app.TabBar.CART).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CART_ITEMS, app.FooterTab.CART_ITEMS)
        })
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.set_cartViewMaterialsHeader({[commonLocators.CommonLabels.PROCUREMENT_TYPE]:commonLocators.CommonLabels.REQUISITION})
        _common.waitForLoaderToDisappear()
        _ticketSystemPage.enterRecord_toPlaceOrderForRequisitionFromCart(cnt.uuid.CART_ITEMS)
        _common.waitForLoaderToDisappear()
        _validate.verify_createRequisitionFromCartData(CART_REQUISITION_PARAMETER)
        _common.waitForLoaderToDisappear()
    })

    it("TC - It will create a requisition, check messages from dialog", function () {
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _validate.verify_modalTitle(commonLocators.CommonKeys.PLACE_ORDER_SUCCESSFULLY)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.REQUISITION)
        _common.waitForLoaderToDisappear()
    })

    it("TC - After create requisition, if it is framework material, then it will set framework catalog to requisition header, also for procurement structure", function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS,CONTAINER_COLUMNS_REQUISITION);
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.search_inSubContainer(cnt.uuid.REQUISITIONS,Cypress.env("TICKET_ORDER"))
        _common.waitForLoaderToDisappear()

        cy.REFRESH_SELECTED_ENTITIES().then(()=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS,app.GridCells.DESCRIPTION,Cypress.env("TICKET_ORDER"))
        })
        cy.REFRESH_SELECTED_ENTITIES().then(()=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS,app.GridCells.STRUCTURE,MATERIAL_STRUCTURE)
        })
        cy.REFRESH_SELECTED_ENTITIES().then(()=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS,app.GridCells.MATERIAL_CATALOG_FK,MATERIAL_CATALOG_CODE)
        })
        cy.REFRESH_SELECTED_ENTITIES().then(()=>{
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS,app.GridCells.CONTROLLING_UNIT_FK, Cypress.env("CONTROLLING_UNIT_CODE"))
        })
        _common.minimizeContainer(cnt.uuid.REQUISITIONS)
        _common.waitForLoaderToDisappear()
    })

    it("TC - Check records in items container, and check its calculation", function () {

        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 2)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEMS);
            _common.set_columnAtTop([CONTAINER_COLUMNS_REQUISITION_ITEMS.price,CONTAINER_COLUMNS_REQUISITION_ITEMS.quantity,CONTAINER_COLUMNS_REQUISITION_ITEMS.total],cnt.uuid.REQUISITIONITEMS)
        })
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.REQUISITIONITEMS)
        _common.select_rowInContainer(cnt.uuid.REQUISITIONITEMS)
        _common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS,app.GridCells.QUANTITY_SMALL,CONTAINERS_MATERIAL_RECORD.QUANTITY)
        _common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRICE_SMALL,CONTAINERS_MATERIAL_RECORD.LIST_PRICE[0])
        let total:any= parseFloat(CONTAINERS_MATERIAL_RECORD.QUANTITY) * parseFloat(CONTAINERS_MATERIAL_RECORD.LIST_PRICE[0])
        _common.assert_forNumericValues(cnt.uuid.REQUISITIONITEMS,app.GridCells.TOTAL,(total).toString())
    })

});