import { tile, app, cnt, sidebar, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_PRICELIST_TYPE = "PlantPriceType-" + Cypress._.random(0, 999);
const EST_PLANT_PRICELIST = "EST_PLANT_PRICELIST-" + Cypress._.random(0, 999);
const PLANT_PRICELIST = "Price List 2-" + Cypress._.random(0, 999);

let CONTAINER_COLUMNS_PLANT_PRICELIST_TYPES;
let CONTAINER_COLUMNS_ESTIMATE_PLANT_PRICELISTS;
let CONTAINER_COLUMNS_PLANT_PRICELISTS;

let CONTAINERS_PLANT_PRICELIST_TYPES;
let CONTAINERS_ESTIMATE_PLANT_PRICELISTS;
let CONTAINERS_PLANT_PRICELISTS;

ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("System Setup");
ALLURE.story("LRM- 1.27 | Verify Creating Estimate Plant pricelist in Plant Pricing Module");

describe("LRM- 1.27 | Verify Creating Estimate Plant pricelist in Plant Pricing Module", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.27-verify-creating-estimate-plant-pricelist-in-plant-pricing-module.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_PLANT_PRICELIST_TYPES= this.data.CONTAINER_COLUMNS.PLANT_PRICELIST_TYPES;
            CONTAINER_COLUMNS_ESTIMATE_PLANT_PRICELISTS = this.data.CONTAINER_COLUMNS.ESTIMATE_PLANT_PRICELISTS;
            CONTAINER_COLUMNS_PLANT_PRICELISTS= this.data.CONTAINER_COLUMNS.PLANT_PRICELISTS;

            CONTAINERS_PLANT_PRICELIST_TYPES= this.data.CONTAINERS.PLANT_PRICELIST_TYPES;
            CONTAINERS_ESTIMATE_PLANT_PRICELISTS = this.data.CONTAINERS.ESTIMATE_PLANT_PRICELISTS;
            CONTAINERS_PLANT_PRICELISTS= this.data.CONTAINERS.PLANT_PRICELISTS;
                   
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
    it("TC - Add Plant Pricelists Types Record", function () {
       _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PLANT_PRICING)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.PLANT_PRICING).then(() => {
            _common.setDefaultView(app.TabBar.PLANT_PRICING)
            _common.select_tabFromFooter(cnt.uuid.PLANT_PRICELIST_TYPES, app.FooterTab.PLANT_PRICELIST_TYPES)
            _common.setup_gridLayout(cnt.uuid.PLANT_PRICELIST_TYPES, CONTAINER_COLUMNS_PLANT_PRICELIST_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.PLANT_PRICELIST_TYPES)
        _common.create_newRecord(cnt.uuid.PLANT_PRICELIST_TYPES)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_PRICELIST_TYPES,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_PRICELIST_TYPE)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_PRICELIST_TYPES,app.GridCells.SORTING,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_PRICELIST_TYPES.SORTING)
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.PLANT_PRICELIST_TYPES,app.GridCells.IS_LIVE,commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.PLANT_PRICELIST_TYPES,PLANT_PRICELIST_TYPE)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT_PRICELIST_TYPES,app.GridCells.DESCRIPTION_INFO,PLANT_PRICELIST_TYPE)
    })
    it("TC - Add Estimate Plant Pricelist record", function () {
        _common.openTab(app.TabBar.PLANT_PRICING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_PLANT_PRICELISTS, app.FooterTab.ESTIMATE_PLANT_PRICELISTS)
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_PLANT_PRICELISTS, CONTAINER_COLUMNS_ESTIMATE_PLANT_PRICELISTS)
        })
        _common.maximizeContainer(cnt.uuid.ESTIMATE_PLANT_PRICELISTS)
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_PLANT_PRICELISTS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_PLANT_PRICELISTS)
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_PLANT_PRICELISTS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION, EST_PLANT_PRICELIST)
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_PLANT_PRICELISTS,app.GridCells.EQUIPMENT_CALCULATION_TYPE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_PLANT_PRICELISTS,app.GridCells.EQUIPMENT_CALCULATION_TYPE,commonLocators.CommonKeys.LIST,CONTAINERS_ESTIMATE_PLANT_PRICELISTS.CALCULATION_TYPE)
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_PLANT_PRICELISTS,app.GridCells.EQUIPMENT_CATALOG_FK)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_PLANT_PRICELISTS,app.GridCells.EQUIPMENT_CATALOG_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ESTIMATE_PLANT_PRICELISTS.CATALOG)
        _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_PLANT_PRICELISTS, app.GridCells.UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_ESTIMATE_PLANT_PRICELISTS.UOM);
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_PLANT_PRICELISTS, app.GridCells.PERCENT, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ESTIMATE_PLANT_PRICELISTS.PERCENT);
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_PLANT_PRICELISTS, app.GridCells.REFERENCE_YEAR, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ESTIMATE_PLANT_PRICELISTS.YEAR)
        cy.SAVE()
        _common.minimizeContainer(cnt.uuid.ESTIMATE_PLANT_PRICELISTS)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ESTIMATE_PLANT_PRICELISTS,EST_PLANT_PRICELIST)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_PLANT_PRICELISTS, app.GridCells.DESCRIPTION_INFO,EST_PLANT_PRICELIST )

    })
    it("TC - Add Plant Pricelist record", function () {
        _common.openTab(app.TabBar.PLANT_PRICING).then(() => {            
            _common.select_tabFromFooter(cnt.uuid.PLANT_PRICELISTS, app.FooterTab.PLANT_PRICELISTS)
            _common.setup_gridLayout(cnt.uuid.PLANT_PRICELISTS, CONTAINER_COLUMNS_PLANT_PRICELISTS)
        })
        _common.clear_subContainerFilter(cnt.uuid.PLANT_PRICELISTS)
        _common.create_newRecord(cnt.uuid.PLANT_PRICELISTS)        
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_PRICELISTS, app.GridCells.CURRENCY_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_PRICELISTS.CURRENCY);
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_PRICELISTS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION,PLANT_PRICELIST );
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_PRICELISTS, app.GridCells.PERCENT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_PRICELISTS.PERCENT);
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_PRICELISTS, app.GridCells.UOM_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_PRICELISTS.UOM);
        _common.clickOn_activeRowCell(cnt.uuid.PLANT_PRICELISTS,app.GridCells.EQUIPMENT_CALCULATION_TYPE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PLANT_PRICELISTS,app.GridCells.EQUIPMENT_CALCULATION_TYPE,commonLocators.CommonKeys.LIST, CONTAINERS_PLANT_PRICELISTS.CALCULATION_TYPE)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_PRICELISTS, app.GridCells.REFERENCE_YEAR, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_PRICELISTS.YEAR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.PLANT_PRICELISTS,PLANT_PRICELIST)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PLANT_PRICELISTS, app.GridCells.DESCRIPTION_INFO,PLANT_PRICELIST )

    })
})