import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _bidPage, _boqPage, _common, _estimatePage, _mainView, _modalView, _validate } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const COSTCODE_CODE = "1L-" + Cypress._.random(0, 9999);
const COSTCODE_DESC = "CC-LAB-" + Cypress._.random(0, 9999);
const PRICEVERSION_DESC = "PV-C-" + Cypress._.random(0, 9999);
const PRICELIST_DESC = "PL-C-" + Cypress._.random(0, 9999);
let CONTAINERS_COST_CODES,CONTAINER_COLUMNS_COST_CODES
let CONTAINERS_DATA_TYPES,CONTAINER_COLUMNS_DATA_TYPES
let CONTAINERS_DATA_RECORDS,CONTAINER_COLUMNS_DATA_RECORDS
let CONTAINERS_PRICE_VERSIONS,CONTAINER_COLUMNS_PRICE_VERSION
let CONTAINERS_PRICELIST,CONTAINER_COLUMNS_PRICELIST
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.120 | Add cost code price list in cost code module.");

describe("EST- 1.120 | Add cost code price list in cost code module.", () => {

    beforeEach(function () {
        cy.fixture(
            "estimate/est-1.120-add-cost-code-price-list-in-cost-code-module.json"
        ).then((data) => {
            this.data = data;
        });
    });

    before(function () {

        cy.fixture("estimate/est-1.120-add-cost-code-price-list-in-cost-code-module.json").then((data) => {
            this.data = data;
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES

            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES

            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINER_COLUMNS_DATA_RECORDS = this.data.CONTAINER_COLUMNS.DATA_RECORDS

            CONTAINERS_PRICELIST = this.data.CONTAINERS.PRICELIST
            CONTAINER_COLUMNS_PRICELIST = this.data.CONTAINER_COLUMNS.PRICELIST

            CONTAINERS_PRICE_VERSIONS = this.data.CONTAINERS.PRICE_VERSION
            CONTAINER_COLUMNS_PRICE_VERSION = this.data.CONTAINER_COLUMNS.PRICE_VERSION
            cy.preLoading(Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName"));
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        });
    });

    it('TC - Create a Price list in Customizing', function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PRICE_LIST)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.DB_TABLE_NAME)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 1);
            _common.setup_gridLayout(cnt.uuid.DATA_RECORDS, CONTAINER_COLUMNS_DATA_RECORDS);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICELIST_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CONTEXT_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CONTEXT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CURRENCY_FK,commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CURRENCY)
        cy.SAVE()
        cy.wait(500)/*The wait is mandatory here, as save takes time.*/
    })

    it('TC - Create a Cost code record in Cost Code Module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.waitForLoaderToDisappear()

         _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.setDefaultView(app.TabBar.COST_CODES,commonLocators.CommonKeys.DEFAULT)
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.waitForLoaderToDisappear()
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.select_allContainerData(cnt.uuid.COST_CODES)
        _common.clickOn_toolbarButton(cnt.uuid.COST_CODES,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        cy.wait(1000) //The wait is mandatory here
        _common.create_newRecord(cnt.uuid.COST_CODES)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, COSTCODE_CODE)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, COSTCODE_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.COST_CODES, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CURRENCY)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.MARKET_RATE)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.DAYWORK_RATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.DAY_RATE)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        cy.SAVE()
        cy.wait(500)/*The wait is mandatory here, as save takes time.*/
        _common.minimizeContainer(cnt.uuid.COST_CODES)
    })

    it('TC - Create a Price list and Price version record in Cost Code Module', function () {
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION_V1, app.FooterTab.PRICE_VERSIONS, 1);
            _common.setup_gridLayout(cnt.uuid.PRICE_VERSION_V1, CONTAINER_COLUMNS_PRICE_VERSION)
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICE_VERSION_V1)
        _common.create_newRecord(cnt.uuid.PRICE_VERSION_V1)
        _common.edit_containerCell(cnt.uuid.PRICE_VERSION_V1, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICEVERSION_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION_V1, app.GridCells.PRICE_LIST_FK,commonLocators.CommonKeys.LIST, PRICELIST_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICE_VERSION_V1)
        cy.SAVE()
        _common.getText_fromCell(cnt.uuid.PRICE_VERSION_V1, app.GridCells.DESCRIPTION_INFO).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("PV_Desc", $ele1.text())
        })
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICELIST, app.FooterTab.PRICE_LISTS, 2);
            _common.setup_gridLayout(cnt.uuid.PRICELIST, CONTAINER_COLUMNS_PRICELIST)
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICELIST)
        _common.create_newRecord(cnt.uuid.PRICELIST)
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICELIST, app.GridCells.COST_CODE_PRICE_VER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRICEVERSION_DESC)
        _common.clickOn_activeRowCell(cnt.uuid.PRICELIST, app.GridCells.CURRENCY_FK)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICELIST, app.GridCells.CURRENCY_FK,commonLocators.CommonKeys.LIST, CONTAINERS_COST_CODES.CURRENCY)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PRICELIST, app.GridCells.RATE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_VERSIONS.MARKET_RATE)
        _common.edit_containerCell(cnt.uuid.PRICELIST, app.GridCells.SALES_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICELIST.DAY_RATE)
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.edit_containerCell(cnt.uuid.PRICELIST, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICELIST.CO2_PROJECT_VALUE)
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        cy.SAVE()
        cy.wait(500)/*The wait is mandatory here, as save takes time.*/
    })

    it('TC - Verify created Price List in Cost Code Module.', function () {

        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, COSTCODE_DESC)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.COST_CODES, COSTCODE_DESC)
        cy.wait(500).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICELIST, app.FooterTab.PRICE_LISTS, 2);
            _common.maximizeContainer(cnt.uuid.PRICELIST)
            _common.select_rowHasValue(cnt.uuid.PRICELIST, PRICELIST_DESC)
            _common.assert_forNumericValues(cnt.uuid.PRICELIST, app.GridCells.RATE, CONTAINERS_PRICELIST.MARKET_RATE)
            _common.assert_forNumericValues(cnt.uuid.PRICELIST, app.GridCells.SALES_PRICE, CONTAINERS_PRICELIST.DAY_RATE)
            _common.assert_forNumericValues(cnt.uuid.PRICELIST, app.GridCells.CO2_PROJECT, CONTAINERS_PRICELIST.CO2_PROJECT_VALUE)
            _common.minimizeContainer(cnt.uuid.PRICELIST)
        })
    })

    after(() => {
        cy.LOGOUT();
    });

});