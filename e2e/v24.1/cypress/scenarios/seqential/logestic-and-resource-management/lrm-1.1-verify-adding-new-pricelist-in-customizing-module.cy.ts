import { tile, app, cnt, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_TYPE = "Plant_Type-" + Cypress._.random(0, 999);
const PLANT_LIST1 = "Price List 1-" + Cypress._.random(0, 999);
const PLANT_LIST2 = "Price List 2-" + Cypress._.random(0, 999);

let CONTAINER_DATA_RECORD;
let CONTAINER_COLUMNS_DATA_TYPES;
let DATA_RECORD_PARAMETER1;
let DATA_RECORD_PARAMETER2;

ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("System Setup");
ALLURE.story("LRM- 1.1 | Verify Adding New Pricelist In Customizing Module");

describe("LRM- 1.1 | Verify Adding New Pricelist In Customizing Module", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.1-verify-adding-new-pricelist-in-customizing-module.json").then((data) => {
            this.data = data;
            CONTAINER_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD;
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES;

            DATA_RECORD_PARAMETER1 = {
                [app.GridCells.PRICE_LIST_TYPE_FK]: PLANT_TYPE,
                [app.GridCells.ETM_CONTEXT_FK]: CONTAINER_DATA_RECORD.RIB_EQUIPMENT_CONTEXT,
                [app.GridCells.CURRENCY_FK]: CONTAINER_DATA_RECORD.CURRENCY,
                [app.GridCells.PERCENT]: CONTAINER_DATA_RECORD.PERCENT,
                [app.GridCells.DESCRIPTION_INFO]: PLANT_LIST1,
                [app.GridCells.UOM_FK]: CONTAINER_DATA_RECORD.UOM,
                [app.GridCells.CALCULATION_TYPE_FK]: CONTAINER_DATA_RECORD.AVERAGE_CATALOG_VALUE
    
            }
            DATA_RECORD_PARAMETER2 = {
                [app.GridCells.PRICE_LIST_TYPE_FK]: PLANT_TYPE,
                [app.GridCells.ETM_CONTEXT_FK]: CONTAINER_DATA_RECORD.RIB_EQUIPMENT_CONTEXT,
                [app.GridCells.CURRENCY_FK]: CONTAINER_DATA_RECORD.CURRENCY,
                [app.GridCells.PERCENT]: CONTAINER_DATA_RECORD.PERCENT,
                [app.GridCells.DESCRIPTION_INFO]: PLANT_LIST2,
                [app.GridCells.UOM_FK]: CONTAINER_DATA_RECORD.UOM,
                [app.GridCells.CALCULATION_TYPE_FK]: CONTAINER_DATA_RECORD.AVERAGE_CATALOG_VALUE
            }
            
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add Plant Type Record", function () {
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.CUSTOMIZING)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_LIST_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_LIST_TYPE)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_TYPE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create New Data Record", function () {
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_PRICE_LIST)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_PRICE_LIST)

        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _logesticPage.enterRecord_toCreatePlantListDataRecord(DATA_RECORD_PARAMETER1)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_MANUAL_EDIT_PLANT_MASTER, CONTAINER_DATA_RECORD.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _logesticPage.enterRecord_toCreatePlantListDataRecord(DATA_RECORD_PARAMETER2)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_MANUAL_EDIT_PLANT_MASTER, CONTAINER_DATA_RECORD.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    })

    it("TC - Verify Data Record", function () {
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, PLANT_LIST1)
        cy.wait(1000) //container takes time to visible data in container
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, PLANT_LIST1)
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, PLANT_LIST2)
        cy.wait(1000) //container takes time to visible data in container
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, PLANT_LIST2)
    })

});


