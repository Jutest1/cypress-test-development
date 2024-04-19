import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";


// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const CONTROLLING_UNIT_DESC = "ControllingUnit" + Cypress._.random(0, 999);
const PLANT_DESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
const ITEM1_DESC = "Escavator" + Cypress._.random(0, 999);
const ITEM2_DESC = "Paylode" + Cypress._.random(0, 999);
const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PROJECT_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells

let CONTAINERS_DATA_RECORD;
let CONTAINERS_PLANT;
let CONTAINERS_PLANT_GROUP;
let CONTAINERS_CONTROLLING_UNIT
let CONTAINERS_CONTRACT;
let CONTAINERS_ITEM;
let CONTAINERS_PES_ITEM
let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_ITEMS;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_COLUMNS_CONTROLLING_UNIT;
let CONTAINER_COLUMNS_PES_ITEM;
let CONTAINER_COLUMNS_PES;

let ITEM_PARAMETER1;
let ITEM_PARAMETER2;
let PES_ITEM_PARAMETER;
let PROCUREMENT_CONTRACT_PARAMETER;
let PLANT_PARAMETER;
let PLANT_TRANSFER_PARAMETER;
let CONTROLLING_UNIT_PARAMETERS:DataCells

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.5 | Verify Creating New PES Record From Contract And Quantity Transfer In Plant Master Module");

describe("LRM- 1.5 | Verify Creating New PES Record From Contract And Quantity Transfer In Plant Master Module", () => {

    
    before(function () {
        
        cy.fixture("LRM/lrm-1.5-verify-creating-new-PES-record-from-contract-and-quantity-transfer-in-plant-master-module.json").then((data) => {
            this.data = data;
            CONTAINERS_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD;
            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETER = {
                [commonLocators.CommonLabels.PLANT_CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.PLANT_DESCRIPTION]: PLANT_DESC,
                [commonLocators.CommonLabels.PLANT_GROUP]: CONTAINERS_PLANT.PLANT_GROUP,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
            }
            PLANT_TRANSFER_PARAMETER = {
                [commonLocators.CommonLabels.JOB]: PROJECT_NO,
                [commonLocators.CommonLabels.WorkOperationType]: CONTAINERS_PLANT.WORK_OPERATION_TYPE
            };

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
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_ITEM.QUANTITY2,
                [app.GridCells.PRICE_SMALL]: CONTAINERS_ITEM.PRICE2,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_ITEM.UOM2,
            };

            CONTAINERS_PES_ITEM = this.data.CONTAINERS.PES_ITEM;
            PES_ITEM_PARAMETER = {
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_PLANT.PES_ITEM,
            };

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT;
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT;
            CONTAINER_COLUMNS_PES = this.data.CONTAINER_COLUMNS.PES;
            CONTAINER_COLUMNS_PES_ITEM = this.data.CONTAINER_COLUMNS.PES_ITEM;

            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_NAME,
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

    it("TC - Add Controlling Unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTROLLING_UNITS)
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait to create new record
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_ASSET_MANAGEMENT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.IS_ASSET_MANAGEMENT, commonLocators.CommonKeys.CHECK)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //wait required to save contraolling unit parameters
    })

    it('TC - Add New Contract And Items', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTRACT)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
            _common.set_columnAtTop([CONTAINER_COLUMNS_CONTRACT.controllingunitfk],cnt.uuid.PROCUREMENTCONTRACT)
            _common.waitForLoaderToDisappear()
            _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        });
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        cy.wait(1000) //required wait to create contract to clear configuration type
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
        cy.wait(1000) //wait required to save contract items parameter
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMSCONTRACT, ITEM_PARAMETER2);
        cy.SAVE() //wait required to save contract items parameter
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.ITEMSCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify Create Plant From Item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CONTRACT)
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTACTS, 0);
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 2)
        });
        cy.wait(1000) //required wait to select row
        _common.select_rowInContainer(cnt.uuid.ITEMSCONTRACT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT_FROM_ITEM)
        _procurementContractPage.enterRecord_CreatePlantFromContractitem(CONTAINERS_PLANT.UPDATE_PLANT, CONTAINERS_PLANT.INDEX_PLANT, PLANT_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC- Create PES from contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PES)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to appear modal footer button
        _common.clickOn_modalFooterButton(Buttons.ButtonText.GO_TO_PES)
        cy.wait(1000)//required wait to open tab
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.HEADERS, app.FooterTab.HEADERS);
            _common.setup_gridLayout(cnt.uuid.HEADERS, CONTAINER_COLUMNS_PES)
            _common.clear_subContainerFilter(cnt.uuid.HEADERS)
        });
        _common.select_rowInContainer(cnt.uuid.HEADERS)
        _common.getText_fromCell(cnt.uuid.HEADERS, app.GridCells.CODE).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PESCODE", $ele1.text())
        })
        _common.openTab(app.TabBar.PERFORMANCEENTRYSHEET).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMS, app.FooterTab.ITEMS);
            _common.setup_gridLayout(cnt.uuid.ITEMS, CONTAINER_COLUMNS_PES_ITEM)
            _common.clear_subContainerFilter(cnt.uuid.ITEMS)
        });
        _common.select_rowInContainer(cnt.uuid.ITEMS)
        _procurementContractPage.enterRecord_toCreateContractItems(cnt.uuid.ITEMS, PES_ITEM_PARAMETER);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PES_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.DATE_RECEIVED)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Plant Record In Plant Master', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_MASTER)
        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS)
            _common.setup_gridLayout(cnt.uuid.PLANT,CONTAINER_COLUMNS_PLANT)
            cy.REFRESH_CONTAINER()
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PLANT_CODE)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait to appear the row
        _common.select_activeRowInContainer(cnt.uuid.PLANT)
        cy.wait(1000)// required wait to read cell data
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.CODE, PLANT_CODE)
    })
});
