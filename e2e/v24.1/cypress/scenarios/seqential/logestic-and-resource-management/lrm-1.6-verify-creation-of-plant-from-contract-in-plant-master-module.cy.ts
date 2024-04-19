
import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANTDESC = "Paylons" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
const ITEM1_DESC = "Escavator" + Cypress._.random(0, 999);
const ITEM2_DESC = "Paylode" + Cypress._.random(0, 999);
const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PROJECT_DESC = "TEST-PRJ-" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells

let CONTAINERS_PLANT;
let CONTAINERS_CONTRACT;
let CONTAINERS_ITEM;

let CONTAINER_COLUMNS_PLANT;
let CONTAINER_COLUMNS_ITEMS;
let CONTAINER_COLUMNS_CONTRACT;

let ITEM_PARAMETER1;
let ITEM_PARAMETER2;
let PROCUREMENT_CONTRACT_PARAMETER;
let PLANT_PARAMETER;

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.6 | Verify Creation Of Plant From Contract In Plant Master Module");

describe("LRM- 1.6 | Verify Creation Of Plant From Contract In Plant Master Module", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.6-verify-creation-of-plant-from-contract-in-plant-master-module.json").then((data) => {
            this.data = data;

            CONTAINERS_PLANT = this.data.CONTAINERS.PLANT;
            PLANT_PARAMETER = {
                [commonLocators.CommonLabels.PLANT_CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.PLANT_DESCRIPTION]: PLANTDESC,
                [commonLocators.CommonLabels.PLANT_GROUP]: CONTAINERS_PLANT.PLANT_GROUP,
                [commonLocators.CommonLabels.PLANT_TYPE]: CONTAINERS_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_KIND]: CONTAINERS_PLANT.PLANT_KIND,
            }

            CONTAINER_COLUMNS_PLANT = this.data.CONTAINER_COLUMNS.PLANT;
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT;
            
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }

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
            cy.wait(1000)
        });    
    })

    after(() => {
        cy.LOGOUT();
    });

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
        _common.waitForLoaderToDisappear()
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
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.PLANT_TYPE_FK, CONTAINERS_PLANT.PLANT_TYPE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT, app.GridCells.PLANT_KIND_FK, CONTAINERS_PLANT.PLANT_KIND)
    })
});
