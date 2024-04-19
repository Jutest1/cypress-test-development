import { tile, app, cnt, btn, sidebar, commonLocators } from "cypress/locators";
import { _boqPage, _common, _estimatePage, _materialPage, _package, _procurementContractPage, _procurementPage, _validate, _wicpage, } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


// VARIABLES----------------------------------------------------------------
let ALLURE = Cypress.Allure.reporter.getInterface();

let MATERIALCATALOG1_CODE = "1RC" + Cypress._.random(0, 999)
let MATERIALCATALOG1_DESC = "RNM-CAT1-" + Cypress._.random(0, 999)
let MATERIALGROUP1_CODE = "1RG" + Cypress._.random(0, 999)
let MATERIALGROUP1_DESC = "RNM-1GR-" + Cypress._.random(0, 999)
let OGMATERIAL1_CODE = "AOGMT" + Cypress._.random(0, 999)
let OGMATERIAL1_DESC = "OG-MAT1-PPC" + Cypress._.random(0, 999)
let OGMATERIAL2_CODE = "AOGMT" + Cypress._.random(0, 999)
let OGMATERIAL2_DESC = "OG-MAT2-OPC" + Cypress._.random(0, 999)
let OGMATERIAL3_CODE = "AOGMT" + Cypress._.random(0, 999)
let OGMATERIAL3_DESC = "OG-MAT3-SRC" + Cypress._.random(0, 999)

let MATERIALCATALOG2_CODE = "2RC" + Cypress._.random(0, 999)
let MATERIALCATALOG2_DESC = "RNM-CAT2-" + Cypress._.random(0, 999)
let MATERIALGROUP2_CODE = "2RG" + Cypress._.random(0, 999)
let MATERIALGROUP2_DESC = "RNM-2GR-" + Cypress._.random(0, 999)
let COMATERIAL1_CODE = "COMT" + Cypress._.random(0, 999)
let COMATERIAL1_DESC = "CO-MAT1-SSC-COPY_" + Cypress._.random(0, 999)
let COMATERIAL2_CODE = "COMT" + Cypress._.random(0, 999)
let COMATERIAL2_DESC = "CO-MAT2-HSC-COPY_" + Cypress._.random(0, 999)

let CONTRACT_CODE01 = "CONT_CODE-01"
let CONTRACT_CODE02 = "CONT_CODE-02"
let ITEM_CODE1 = "Item1"
let ITEM_CODE2 = "Item2"
let ITEM_CODE3 = "Item3"
let ITEM_LOGGED_PRICE = "Price0"
let ITEM_PRICE1 = "Item1_Price"

let MATERIAL_GROUP_PARAMETER:DataCells
let MATERIAL_GROUP_PARAMETER_TYPE2:DataCells
let MATERIAL_CATALOGS_PARAMETER_TYPE2:DataCells
let MATERIAL_CATALOGS_PARAMETER:DataCells
let CONTAINERS_MATERIAL_GROUP
let CONTAINER_COLUMNS_MATERIAL_GROUP
let CONTAINERS_MATERIAL_CATALOG
let CONTAINER_COLUMNS_MATERIAL_CATALOG
let CONTAINERS_MATERIAL_RECORD
let CONTAINER_COLUMNS_MATERIAL_RECORD
let FIFTH_MATERIAL_RECORD_PARAMETER:DataCells
let FOURTH_MATERIAL_RECORD_PARAMETER:DataCells
let THIRD_MATERIAL_RECORD_PARAMETER:DataCells
let SECOND_MATERIAL_RECORD_PARAMETER:DataCells
let MATERIAL_RECORD_PARAMETER:DataCells

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;

let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;

const LINE_ITEM_DESCRIPTION='LI-DESC-' + Cypress._.random(0, 999);
let LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM
let CONTAINERS_LINE_ITEM
let MODAL_CREATE_UPDATE_MATERIAL_PACKAGE
let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_COLUMNS_CONTRACTS
let CONTAINER_COLUMNS_CONTRACTS_ITEMS
let CONTAINRES_REMOVE_REPLACE_CRITERIA

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 2.51 | Replace material at contract level from wizard");

describe("PCM- 2.51 | Replace material at contract level from wizard", () => {
    before(function () {
      
        cy.fixture("pcm/pcm-2.51-replace-material-at-contract-level-from-wizard.json")
          .then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_MATERIAL_CATALOG=this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            CONTAINERS_MATERIAL_CATALOG=this.data.CONTAINERS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_GROUP=this.data.CONTAINER_COLUMNS.MATERIAL_GROUP
            CONTAINERS_MATERIAL_GROUP=this.data.CONTAINERS.MATERIAL_GROUP

            MATERIAL_CATALOGS_PARAMETER={
                [app.GridCells.CODE]:MATERIALCATALOG1_CODE,
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER,
                [app.GridCells.DESCRIPTION_INFO]:MATERIALCATALOG1_DESC,
                [app.GridCells.IS_NEUTRAL]:commonLocators.CommonKeys.CHECK
            } 
            MATERIAL_CATALOGS_PARAMETER_TYPE2={
                [app.GridCells.CODE]:MATERIALCATALOG2_CODE,
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER,
                [app.GridCells.DESCRIPTION_INFO]:MATERIALCATALOG2_DESC
            } 
            MATERIAL_GROUP_PARAMETER_TYPE2={
                [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIALGROUP2_DESC,
                [app.GridCells.CODE]:MATERIALGROUP2_CODE
            }
            MATERIAL_GROUP_PARAMETER={
                [app.GridCells.PRC_STRUCTURE_FK]:CONTAINERS_MATERIAL_GROUP.PROCUREMENT_STRUCTURE,
                [app.GridCells.DESCRIPTION_INFO]:MATERIALGROUP1_DESC,
                [app.GridCells.CODE]:MATERIALGROUP1_CODE
            }

            CONTAINER_COLUMNS_MATERIAL_RECORD = this.data.CONTAINER_COLUMNS.MATERIAL_RECORD
            CONTAINERS_MATERIAL_RECORD = this.data.CONTAINERS.MATERIAL_RECORD
    
            MATERIAL_RECORD_PARAMETER={
                [app.GridCells.CODE]:OGMATERIAL1_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]:OGMATERIAL1_DESC,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[0],
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[0],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[0]
            }
    
            SECOND_MATERIAL_RECORD_PARAMETER={
                [app.GridCells.CODE]:OGMATERIAL2_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]:OGMATERIAL2_DESC,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[0],
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[1],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[1]
            }
    
            THIRD_MATERIAL_RECORD_PARAMETER={
                [app.GridCells.CODE]:OGMATERIAL3_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]:OGMATERIAL3_DESC,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[0],
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[2],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[2]
            }
    
            FOURTH_MATERIAL_RECORD_PARAMETER={
                [app.GridCells.CODE]:COMATERIAL1_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]:COMATERIAL1_DESC,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[0],
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[2],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[2]
            }
    
            FIFTH_MATERIAL_RECORD_PARAMETER={
                [app.GridCells.CODE]:COMATERIAL2_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]:COMATERIAL2_DESC,
                [app.GridCells.UOM_FK]:CONTAINERS_MATERIAL_RECORD.UOM[0],
                [app.GridCells.RETAIL_PRICE]:CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE[3],
                [app.GridCells.LIST_PRICE]:CONTAINERS_MATERIAL_RECORD.LIST_PRICE[3]
            }

            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
			ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: ESTIMATE_CODE,
				[app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}

            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
			CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
			RESOURCE_PARAMETERS = {
				[app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
				[app.GridCells.CODE]: OGMATERIAL1_CODE,
			};

            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
            LINE_ITEMS_PARAMETERS={
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
            }

            MODAL_CREATE_UPDATE_MATERIAL_PACKAGE=this.data.MODAL.CREATE_UPDATE_MATERIAL_PACKAGE

            CONTAINER_COLUMNS_PACKAGE=this.data.CONTAINER_COLUMNS.PACKAGE

            CONTAINER_COLUMNS_CONTRACTS=this.data.CONTAINER_COLUMNS.CONTRACTS

            CONTAINER_COLUMNS_CONTRACTS_ITEMS=this.data.CONTAINER_COLUMNS.CONTRACTS_ITEMS

            CONTAINRES_REMOVE_REPLACE_CRITERIA=this.data.CONTAINERS.REMOVE_REPLACE_CRITERIA
          })
          .then(()=>{
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.waitForLoaderToDisappear()
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
            _common.waitForLoaderToDisappear() 
          })
    });

    after(() => {
        cy.LOGOUT();
    })

    it("TC - Create Material Catalogs, Material Groups in Material Catalog Module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG)
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS, 0)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER);

        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALCATALOG, 0);
        _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
        });
        
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS, 0)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS,MATERIAL_CATALOGS_PARAMETER_TYPE2);
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALCATALOG, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUP)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateMaterialGroups(cnt.uuid.MATERIAL_GROUPS,MATERIAL_GROUP_PARAMETER_TYPE2)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create Material Records for Material Catalogs in Material Module and Assign a Neutral Material to a Material", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIALCATALOG1_DESC)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIALCATALOG1_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK, 0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIALGROUP1_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK, 0)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
       
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, SECOND_MATERIAL_RECORD_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, THIRD_MATERIAL_RECORD_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIALCATALOG1_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.UNCHECK, 0)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIALCATALOG2_DESC)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIALCATALOG2_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK, 0)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 0);
        _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINER_COLUMNS_MATERIAL_GROUP)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIALGROUP2_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK, 0)
         _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,FOURTH_MATERIAL_RECORD_PARAMETER)
        _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.NEUTRAL_MATERIAL_CATALOG_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MATERIALCATALOG1_CODE)
        _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, OGMATERIAL1_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS,FIFTH_MATERIAL_RECORD_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create an Estimate Header, Create a new Line item and Assign Material Resources to Line Item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT); 
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
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

        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)

        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM);
        });
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEMS_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()


        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 2);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
    })

    it("TC - Create a Material Package", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_UPDATE_MATERIAL_PACKAGE)
        _common.waitForLoaderToDisappear()

        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreatePackage_wizard(MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.MATERIAL_AND_COST_CODE,null,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.CONFIGURATION,MODAL_CREATE_UPDATE_MATERIAL_PACKAGE.PROCUREMENT_STRUCTURE);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'));  
    })

    it("TC - Create a Contract from Package", function () {

        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.search_inSubContainer(cnt.uuid.PACKAGE,Cypress.env("PACKAGE_CODE_0"))
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PACKAGE_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.IN_MINUS_PROGRESS);
        _common.waitForLoaderToDisappear()

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_CONTRACT);
        _common.waitForLoaderToDisappear()
        _package.create_ContractfromPackage(CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)
    })

    it("TC - Create a New Contract with New material in it", function () {

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0)
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACTS);
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'))
        _common.waitForLoaderToDisappear()

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT,Cypress.env("CONTRACT_CODE"))
        _common.waitForLoaderToDisappear()

        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE,CONTRACT_CODE01)

        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_CONTRACTS_ITEMS)
        })
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _procurementContractPage.enterRecord_toCreateItem(cnt.uuid.ITEMSCONTRACT, OGMATERIAL2_CODE,OGMATERIAL2_CODE, CONTAINERS_MATERIAL_RECORD.QUANTITY)
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
          .then(() => {
                _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("CONTRACT_CODE"))
                _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env("CONTRACT_CODE"))
                _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
          })
        _procurementPage.copyRecord_toIncludingDependencies(cnt.uuid.PROCUREMENTCONTRACT, btn.ToolBar.ICO_COPY_PASTE_DEEP)
        cy.wait(1000)
        _common.waitForLoaderToDisappear()
        _common.getText_fromCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(CONTRACT_CODE02, $ele1.text())
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE02))
            _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE02))
        })
        _common.select_allContainerData(cnt.uuid.ITEMSCONTRACT)
        _common.delete_recordFromContainer(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        _procurementContractPage.enterRecord_toCreateItem(cnt.uuid.ITEMSCONTRACT, OGMATERIAL3_CODE,OGMATERIAL3_CODE, CONTAINERS_MATERIAL_RECORD.QUANTITY)
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Scopes of Materials", function () {
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        cy.wait(1000).then(() => {
            _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
            _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
        })
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL1_CODE)
        _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(ITEM_CODE1, $ele1.text())
        })
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
        _common.waitForLoaderToDisappear()

        cy.wait(1000).then(() => {
            _validate.assertValueOf_scopeReplamenetCriteria_with_replaceMaterial(commonLocators.CommonKeys.HIGHLIGHTED_MATERIAL, 0, commonLocators.CommonKeys.ALL_CATALOGS, 0, null, null, [Cypress.env(ITEM_CODE1)])
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL1_CODE)
        _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(ITEM_CODE1, $ele1.text())
        })
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL2_CODE)
        _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(ITEM_CODE2, $ele1.text())
        })
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL1_CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _validate.assertValueOf_scopeReplamenetCriteria_with_replaceMaterial(commonLocators.CommonKeys.CURRENT_CONTRACT, 1, commonLocators.CommonKeys.ALL_CATALOGS, 0, null, null, [Cypress.env(ITEM_CODE1), Cypress.env(ITEM_CODE2)])
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL1_CODE)
        cy.wait(1000).then(() => {
            _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE02))
            _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE02))
        })
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL3_CODE)
        _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(ITEM_CODE3, $ele1.text())
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _validate.assertValueOf_scopeReplamenetCriteria_with_replaceMaterial(commonLocators.CommonKeys.ALL_CONTRACTS_FROM_CURRENT_PROJECT, 2, commonLocators.CommonKeys.ALL_CATALOGS, 0, null, null, [Cypress.env(ITEM_CODE1), Cypress.env(ITEM_CODE2), Cypress.env(ITEM_CODE3)])
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Replace From for Materials.", function () {

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        cy.wait(1000).then(() => {
            _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
            _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
        })
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
        cy.wait(1000).then(() => {
            _validate.assertValueOf_scopeReplamenetCriteria_with_replaceMaterial(commonLocators.CommonKeys.CURRENT_CONTRACT, 1, commonLocators.CommonKeys.ALL_CATALOGS, 0, null, null, [Cypress.env(ITEM_CODE1), Cypress.env(ITEM_CODE2)], [OGMATERIAL3_CODE, OGMATERIAL3_CODE])
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        cy.wait(1000).then(() => {
            _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
            _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
        })
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
        cy.wait(1000).then(() => {
            _validate.assertValueOf_scopeReplamenetCriteria_with_replaceMaterial(commonLocators.CommonKeys.CURRENT_CONTRACT, 1, commonLocators.CommonKeys.SPECIFIC_CATALOG, 1, MATERIALCATALOG1_CODE, null, [Cypress.env(ITEM_CODE1), Cypress.env(ITEM_CODE2)], [OGMATERIAL3_CODE, OGMATERIAL3_CODE])
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Replacement Criteria(By neutral material assignment) for Materials and Replace A Material with Neutral Material.", function () {
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        cy.wait(1000).then(() => {
            _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
            _common.select_rowHasValue(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE01))
        })
        _common.clear_subContainerFilter(cnt.uuid.ITEMSCONTRACT)
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL1_CODE)
        _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT, app.GridCells.MDC_MATERIAL_FK).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(ITEM_CODE1, $ele1.text())
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
        cy.wait(1000).then(() => {
            _validate.assertValueOf_scopeReplamenetCriteria_with_replaceMaterial(commonLocators.CommonKeys.HIGHLIGHTED_MATERIAL, 0, commonLocators.CommonKeys.ALL_CATALOGS, 0, null, CONTAINRES_REMOVE_REPLACE_CRITERIA, [Cypress.env(ITEM_CODE1)], [COMATERIAL1_CODE])
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL1_CODE)
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, OGMATERIAL1_CODE)
        _common.getText_fromCell(cnt.uuid.ITEMSCONTRACT,  app.GridCells.PRICE_SMALL).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env(ITEM_PRICE1, $ele1.text())
        })
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.REPLACE_MATERIAL)
        _common.waitForLoaderToDisappear()
        cy.wait(1000).then(() => {
            _procurementContractPage.replaceMaterial_atContractLevel_fromWizard(commonLocators.CommonKeys.HIGHLIGHTED_MATERIAL, commonLocators.CommonKeys.ALL_CATALOGS, null, [commonLocators.CommonKeys.BY_IDENTICAL_MATERIAL_CODE, commonLocators.CommonKeys.BY_PROCUREMENT_STRUCTURE], [OGMATERIAL1_CODE], [COMATERIAL1_CODE])
        })
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, COMATERIAL1_CODE)
        cy.wait(1000).then(() => {
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
            _common.select_rowHasValue(cnt.uuid.ITEMSCONTRACT, COMATERIAL1_CODE)
            _common.assert_cellData_insideActiveRow(cnt.uuid.ITEMSCONTRACT,  app.GridCells.PRICE_SMALL, Cypress.env(ITEM_LOGGED_PRICE))
            _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
        })
    })

})