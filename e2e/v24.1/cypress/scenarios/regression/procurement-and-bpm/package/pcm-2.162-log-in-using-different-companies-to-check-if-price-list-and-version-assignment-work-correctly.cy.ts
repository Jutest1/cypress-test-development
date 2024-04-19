import { app, tile, sidebar, commonLocators, cnt } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const PRICE_LIST_DESC = "PLDESC-" + Cypress._.random(0, 999);
const PRICE_VERSION_DESC = "PVDESC-" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_CODE = "CAT-CD-" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_CODE = "GRP_CD-" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC = "GRP-DESC-" + Cypress._.random(0, 999);
const MATERIAL_RECORD_CODE = "MAT-CD-" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC = "MAT-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_MATERIAL_CATALOGS, CONTAINERS_PRICE_LIST, CONTAINERS_MATERIAL_RECORDS;

let CONTAINER_COLUMNS_MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_PRICE_VERSION, CONTAINER_COLUMNS_PRICE_LIST;

let MATERIAL_CATALOGS_PARAMETERS: DataCells, MATERIAL_GROUPS_PARAMETERS: DataCells, MATERIAL_RECORDS_PARAMETERS: DataCells;

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Package");
ALLURE.story("PCM- 2.162 | Log in using different companies to check if price list & version assignment work correctly")
describe("PCM- 2.162 | Log in using different companies to check if price list & version assignment work correctly", () => {

    before(function () {

        cy.fixture("pcm/pcm-2.162-log-in-using-different-companies-to-check-if-price-list-and-version-assignment-work-correctly.json").then((data) => {
            this.data = data
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINER_COLUMNS_MATERIAL_CATALOGS = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS
            CONTAINERS_MATERIAL_CATALOGS = this.data.CONTAINERS.MATERIAL_CATALOGS
            MATERIAL_CATALOGS_PARAMETERS = {
                [app.GridCells.CODE]: MATERIAL_CATALOG_CODE,
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOGS.BUSINESS_PARTNER,
            }
            CONTAINER_COLUMNS_MATERIAL_GROUPS = this.data.CONTAINER_COLUMNS.MATERIAL_GROUPS
            MATERIAL_GROUPS_PARAMETERS = {
                [app.GridCells.CODE]: MATERIAL_GROUPS_CODE,
                [app.GridCells.DESCRIPTION_INFO]: MATERIAL_GROUPS_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: CommonLocators.CommonKeys.MATERIAL
            }
            CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG_FILTER
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS
            MATERIAL_RECORDS_PARAMETERS = {
                [app.GridCells.CODE]: MATERIAL_RECORD_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]: MATERIAL_RECORD_DESC,
                [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORDS.UOM[0],
                [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORDS.RETAIL_PRICE[0],
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORDS.LIST_PRICE[0]
            }
            CONTAINER_COLUMNS_PRICE_VERSION = this.data.CONTAINER_COLUMNS.PRICE_VERSION
            CONTAINER_COLUMNS_PRICE_LIST = this.data.CONTAINER_COLUMNS.PRICE_LIST
            CONTAINERS_PRICE_LIST = this.data.CONTAINERS.PRICE_LIST
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    })

    after(() => {
        cy.LOGOUT();
    })

    it('TC - Verify create material catalog and Material groups', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.PRICE_LIST)
        cy.REFRESH_CONTAINER()
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_RECORDS.MASTER_DATA)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.INSTANCES, app.FooterTab.DATA_RECORDS, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.INSTANCES)
        _common.create_newRecord(cnt.uuid.INSTANCES)
        _common.enterRecord_inNewRow(cnt.uuid.INSTANCES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_LIST_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.CONTEXT_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CONTEXT)
        _common.edit_dropdownCellWithCaret(cnt.uuid.INSTANCES, app.GridCells.CURRENCY_FK, CommonLocators.CommonKeys.LIST, CONTAINERS_DATA_RECORDS.CURRENCY)
        cy.SAVE().wait(1000)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOGS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETERS)
        cy.SAVE().wait(1000)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUPS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS_PARAMETERS)
        cy.SAVE().wait(1000)
        cy.REFRESH_CONTAINER()
        _common.select_rowInSubContainer(cnt.uuid.MATERIAL_GROUPS)
    })

    it('TC - Verify create new price versions', function () {
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION, app.FooterTab.PRICE_VERSIONS, 2);
            _common.setup_gridLayout(cnt.uuid.PRICE_VERSION, CONTAINER_COLUMNS_PRICE_VERSION)
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICE_VERSION)
        _common.create_newRecord(cnt.uuid.PRICE_VERSION)
        _common.select_rowInContainer(cnt.uuid.PRICE_VERSION)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICE_VERSION_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, CommonLocators.CommonKeys.LIST, PRICE_LIST_DESC)
        cy.SAVE().wait(1000)
    })

    it('TC - Verify create material records-1', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
    })

    it('TC - Verify create material records-2', function () {
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 1)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.CODE, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 2)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORDS)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORDS_PARAMETERS)
        cy.SAVE().wait(1000)
    })

    it('TC - Verify create price list in material records', function () {
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_CODE)
        _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 2)
            _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
        });
        _common.create_newRecord(cnt.uuid.PRICE_LISTS)
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.LIST_PRICE[0])
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.LIST_PRICE[0])
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.DISCOUNT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.DISCOUNT[0])
        _common.enterRecord_inNewRow(cnt.uuid.PRICE_LISTS, app.GridCells.CHARGES, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.CHARGES[0])
        cy.SAVE().wait(2000)
        _common.getText_fromCell(cnt.uuid.PRICE_LISTS, app.GridCells.COST).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("COST_PRICE_1", $ele1.text())
            cy.log(Cypress.env("COST_PRICE_1"))
        })
    })

    it('TC - Verify the data in another company', function () {
        cy.switchCompany(Cypress.env("parentCompanyName"), "222 222 Demo RIB")
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOG_FILTER)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        cy.REFRESH_CONTAINER()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.select_rowHasValue(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.CODE, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER, 1)
        });
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.CODE, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, CommonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS, 1)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_CODE)
        _common.select_rowInContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 2)
            _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
        });
        _common.select_rowInContainer(cnt.uuid.PRICE_LISTS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_FK, PRICE_LIST_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PRICE_LISTS, app.GridCells.RETAIL_PRICE, CONTAINERS_PRICE_LIST.LIST_PRICE[0])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PRICE_LISTS, app.GridCells.LIST_PRICE, CONTAINERS_PRICE_LIST.LIST_PRICE[0])
        _common.assert_cellData_insideActiveRow(cnt.uuid.PRICE_LISTS, app.GridCells.COST, Cypress.env("COSTPRICE"))
    })

})