import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _mainView, _validate } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface()

const PRICELIST_DESC = "PRICELIST_DESC-" + Cypress._.random(0, 999);
const PRICEVERSION_DESC = "PVER-" + Cypress._.random(0, 999);
const PRICEVERSION_DESC2 = "PVER-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES;
let CONTAINERS_DATA_RECORDS;
let CONTAINERS_COST_CODES;
let CONTAINER_COLUMNS_COST_CODES;
let CONTAINERS_PRICE_LIST;
let CONTAINER_COLUMNS_PRICE_LIST;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.1 | Assign CO2/kg to cost code with multiple version")
describe("EST- 4.1 |  Assign CO2/kg to cost code with multiple version", () => {

    before(function () {


        cy.fixture("estimate/est-4.1-Assign-co2-kg-to-cost-code-with-multiple-version.json").then((data) => {
            this.data = data
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES
            CONTAINERS_PRICE_LIST = this.data.CONTAINERS.PRICE_LIST
            CONTAINER_COLUMNS_PRICE_LIST = this.data.CONTAINER_COLUMNS.PRICE_LIST

        }).then(() => {
            cy.preLoading(
                Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create price list record in customizing', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CommonLocators.CommonLabels.PRICE_LIST)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.DATA_TYPES, app.GridCells.MODULE_NAME, CONTAINERS_DATA_TYPES.MASTER_DATA)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICELIST_DESC)
        _common.lookUpButtonInCell(cnt.uuid.DATA_RECORDS, app.GridCells.CONTEXT_FK, btn.IconButtons.BTN_DEFAULT, 1)
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CONTEXT_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CONTEXT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CURRENCY)
        _validate.customizing_DataRecordCheckBox(app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create price version and price list record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.COST_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE)
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION_V1, app.FooterTab.PRICE_VERSIONS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICE_VERSION_V1)
        _common.create_newRecord(cnt.uuid.PRICE_VERSION_V1)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PRICE_VERSION_V1, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICEVERSION_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION_V1, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICELIST_DESC)
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.PRICE_VERSION_V1)
        _common.edit_containerCell(cnt.uuid.PRICE_VERSION_V1, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICEVERSION_DESC2)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION_V1, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICELIST_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICELIST, app.FooterTab.PRICE_LISTS, 2);
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICELIST)
        _common.create_newRecord(cnt.uuid.PRICELIST)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICELIST, app.GridCells.COST_CODE_PRICE_VER_FK, commonLocators.CommonKeys.GRID, PRICEVERSION_DESC)
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.edit_containerCell(cnt.uuid.PRICELIST, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.CO2_PROJECT_VALUE_1)
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.PRICELIST)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICELIST, app.GridCells.COST_CODE_PRICE_VER_FK, commonLocators.CommonKeys.GRID, PRICEVERSION_DESC2)
        _common.select_activeRowInContainer(cnt.uuid.PRICELIST)
        _common.edit_containerCell(cnt.uuid.PRICELIST, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.CO2_PROJECT_VALUE_2)
        cy.SAVE()
    })

    it('TC - Verify CO2/kg(project) in price list is editable and CO2/kg(source) , CO2/kg(source name) is not editable', function () {
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        });
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        _validate.verify_isRecordNotEditable(cnt.uuid.COST_CODES, app.GridCells.CO2_SOURCE, 0)
        _validate.verify_isRecordNotEditable(cnt.uuid.COST_CODES, app.GridCells.CO2_SOURCE_FK, 0)
    })

    it('TC - Verify price list against selected cost code', function () {
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICELIST, app.FooterTab.PRICE_LISTS, 0);
            _common.setup_gridLayout(cnt.uuid.PRICELIST, CONTAINER_COLUMNS_PRICE_LIST)
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICELIST)
        _common.select_rowHasValue(cnt.uuid.PRICELIST, PRICEVERSION_DESC)
        _common.assert_forNumericValues(cnt.uuid.PRICELIST, app.GridCells.CO2_PROJECT, CONTAINERS_PRICE_LIST.CO2_PROJECT_VALUE_1)
        _common.select_rowHasValue(cnt.uuid.PRICELIST, PRICEVERSION_DESC2)
        _common.assert_forNumericValues(cnt.uuid.PRICELIST, app.GridCells.CO2_PROJECT, CONTAINERS_PRICE_LIST.CO2_PROJECT_VALUE_2)
    })

})