import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import _ from "cypress/types/lodash";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const RENTEL = "Rental" + Cypress._.random(0, 999);
const CONTROLLING_UNIT_DESC = "ControllingUnit" + Cypress._.random(0, 999);
const PLANTGROUP = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANTGROUPDESC = "PLANTGROUPHEADER" + Cypress._.random(0, 999);
const PLANTDESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
const CODE_3 = "001" + Cypress._.random(0, 999);
const CODE_4 = "001" + Cypress._.random(0, 999);
const CODE_5 = "001" + Cypress._.random(0, 999);
const ITEM1_DESC = "Escavator" + Cypress._.random(0, 999);
const ITEM2_DESC = "Paylode" + Cypress._.random(0, 999);
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells

let CONTAINERS_DATA_RECORD;
let CONTAINERS_PLANT;
let CONTAINERS_PLANT_GROUP;
let CONTAINERS_CONTROLLING_UNIT
let CONTAINERS_CONTRACT;
let CONTAINERS_ITEM;
let CONTAINER_COLUMNS_DATA_TYPES;
let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_ITEMS;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_PLANT_GROUP;
let CONTAINER_COLUMNS_CONTROLLING_UNIT;

let ITEM_PARAMETER1;
let ITEM_PARAMETER2;
let PROCUREMENT_CONTRACT_PARAMETER;
let PLANT_PARAMETER;
let CONTROLLING_UNIT_PARAMETERS:DataCells

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.4 | Verify Creation of Plant from contract Module using Wizard ");

describe("LRM- 1.4 | Verify Creation of Plant from contract Module using Wizard ", () => {

    before(function () {
        
        cy.fixture("LRM/lrm-1.4-verify-creation-of-plant-from-contract-module-using-wizard.json").then((data) => {
            this.data = data;
          
            CONTAINERS_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETER = {
                [commonLocators.CommonLabels.PLANT_CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.PLANT_DESCRIPTION]: PLANTDESC,
                [commonLocators.CommonLabels.PLANT_GROUP]: PLANTGROUP,
                [commonLocators.CommonLabels.PLANT_TYPE]: RENTEL,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
            }

            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT;
            CONTROLLING_UNIT_PARAMETERS = {
				[app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
				[app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM,
			};

            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT;
            PROCUREMENT_CONTRACT_PARAMETER = {
                [commonLocators.CommonLabels.CONFIGURATION]:CONTAINERS_CONTRACT.CONFIGURATION,
                [commonLocators.CommonLabels.BUSINESS_PARTNER]:CONTAINERS_CONTRACT.BUSINESS_PARTNER
              }

            CONTAINERS_ITEM = this.data.CONTAINERS.ITEM;
            ITEM_PARAMETER1 = {
                [app.GridCells.DESCRIPTION_1]: ITEM1_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_ITEM.PROCUREMENT_STRUCTURE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ITEM.QUANTITY1,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_ITEM.PRICE1,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_ITEM.UOM1,
            };
            ITEM_PARAMETER2 = {
                [app.GridCells.DESCRIPTION_1]: ITEM2_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_ITEM.PROCUREMENT_STRUCTURE,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ITEM.QUANTITY1,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_ITEM.PRICE2,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_ITEM.UOM2,
            };

            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES;
            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT;
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINER_COLUMNS.PLANT_GROUP;
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT;
            
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
        
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem(); 
        });    
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add Plant Type Data Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CUSTOMIZING)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_RECORD.PLANT_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_RECORD.PLANT_TYPE)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, RENTEL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTER, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Add Controlling Unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTROLLING_UNITS)
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_ASSET_MANAGEMENT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_ASSET_MANAGEMENT, commonLocators.CommonKeys.CHECK)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Add New Contract And Items', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTRACT)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _common.waitForLoaderToDisappear()
        _procurementContractPage.enterRecord_createNewProcurementContract_fromModal(PROCUREMENT_CONTRACT_PARAMETER);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS)
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEMS)
        })
        _common.maximizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM_PARAMETER1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM_PARAMETER2);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
    });

    it("TC - Create New Plant Group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_GROUP)
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT_GROUP, CONTAINER_COLUMNS_PLANT_GROUP)
        })
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANTGROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANTGROUPDESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        _common.search_inSubContainer(cnt.uuid.PLANT_GROUP, PLANTGROUP)
        cy.wait(1000) //required wait
        _common.create_newSubRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CODE_3)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_PLANT_GROUP.DESCRIPTION1)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        _common.search_inSubContainer(cnt.uuid.PLANT_GROUP, PLANTGROUP)
        cy.wait(1000) //required wait
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, PLANTGROUP)
        _common.create_newSubRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CODE_4)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_PLANT_GROUP.DESCRIPTION2)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.PLANT_GROUP, PLANTGROUP)
        cy.wait(1000) //required wait
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, PLANTGROUP)
        _common.create_newSubRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CODE_5)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTAINERS_PLANT_GROUP.DESCRIPTION3)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBARIC_CATAGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(500) //required wait

    })
    it("TC - Verify Create Plant From Item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTRACT)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
        });
        cy.wait(1000) //required wait
        _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT_FROM_ITEM)
        cy.wait(1000) //required wait
        _procurementContractPage.enterRecord_CreatePlantFromContractitem(CONTAINERS_PLANT.UPDATE_PLANT, CONTAINERS_PLANT.INDEX_PLANT, PLANT_PARAMETER)
        cy.SAVE()

    })
    it('TC - Verify Plant Record In Plant Master', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_MASTER)
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT,CONTAINER_COLUMNS_PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_CODE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.select_activeRowInContainer(cnt.uuid.PLANT)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.CODE, PLANT_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.PLANT_TYPE_FK, RENTEL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.PLANT_KIND_FK, CONTAINERS_PLANT.PLANT_KIND)
    })
});
