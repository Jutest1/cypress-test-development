import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _procurementContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage } from "cypress/pages";

import _ from "cypress/types/lodash";
import common from "mocha/lib/interfaces/common";
const allure = Cypress.Allure.reporter.getInterface()
const PRICELIST_DESC = "PRICELIST_DESC-" + Cypress._.random(0, 999);
const PRICEVERSION_DESC = "PVER-" + Cypress._.random(0, 999);
const PRICEVERSION_DESC2 = "PVER-" + Cypress._.random(0, 999);
const MATERIAL_CODE = "MCODE-" + Cypress._.random(0, 999);
const MATERIAL_DESC = "M-DESC-" + Cypress._.random(0, 999);


let CONTAINERS_DATA_TYPES;
let CONTAINERS_DATA_RECORDS;
let CONTAINERS_MATERIAL
let CONTAINER_COLUMNS_MATERIAL
let CONTAINERS_PRICE_LIST
let CONTAINER_COLUMNS_PRICE_LIST

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 4.2 | Assign CO2/kg to material with multiple version")
describe("EST- 4.2 |  Assign CO2/kg to material with multiple version", () => {
    before(function () {

        cy.fixture("estimate/est-4.2-Assign-co2-kg-to-material-with-multiple-version.json").then((data) => {
            this.data = data
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINERS_MATERIAL = this.data.CONTAINERS.MATERIAL
            CONTAINER_COLUMNS_MATERIAL = this.data.CONTAINER_COLUMNS.MATERIAL
            CONTAINERS_PRICE_LIST = this.data.CONTAINERS.PRICE_LIST
            CONTAINER_COLUMNS_PRICE_LIST = this.data.CONTAINER_COLUMNS.PRICE_LIST

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
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);4.2
        _common.waitForLoaderToDisappear()
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
        cy.wait(2000)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create price version in material catalog module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG)
        cy.wait(1000)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOGS, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL.MATERIAL_CODE)
        _common.openTab(app.TabBar.MATERIAL_CATALOG).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_VERSION, app.FooterTab.PRICE_VERSIONS, 0);
        });
        _common.create_newRecord(cnt.uuid.PRICE_VERSION)
        _common.edit_containerCell(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICEVERSION_DESC)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICELIST_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PRICE_VERSION)
        _common.edit_containerCell(cnt.uuid.PRICE_VERSION, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PRICEVERSION_DESC2)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PRICE_VERSION, app.GridCells.PRICE_LIST_FK, commonLocators.CommonKeys.LIST, PRICELIST_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Create material record and verify CO2/kg(project) in price list is editable and CO2/kg(source) , CO2/kg(source name) is not editable', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER, 0);
        });
        cy.REFRESH_CONTAINER()
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.DESCRIPTION_INFO, CONTAINERS_MATERIAL.MATERIAL_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, commonLocators.CommonKeys.CHECK)
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.PRICE_LISTS, 0);
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL)
        });
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        cy.wait(2000)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.MATERIAL_RECORDS,app.GridCells.DESCRIPTION_INFO_1)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, MATERIAL_CODE)
        _common.edit_dropdownCellWithInput(cnt.uuid.MATERIAL_RECORDS, app.GridCells.UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL.UOM)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_MATERIAL.CO2_PROJECT_VALUE)
        _common.edit_containerCell(cnt.uuid.MATERIAL_RECORDS, app.GridCells.DESCRIPTION_INFO_1, app.InputFields.DOMAIN_TYPE_TRANSLATION, MATERIAL_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.MATERIAL_RECORDS,MATERIAL_CODE)
        _common.clickOn_activeRowCell(cnt.uuid.MATERIAL_RECORDS,app.GridCells.DESCRIPTION_INFO_1)
        _validate.verify_isRecordNotEditable(cnt.uuid.MATERIAL_RECORDS, app.GridCells.CO2_SOURCE, 0)
        _validate.verify_isRecordNotEditable(cnt.uuid.MATERIAL_RECORDS, app.GridCells.BAS_CO2_SOURCE_FK, 0)
    })

    it('TC - Create price list in material module and verify CO2/kg(project) in price list is editable', function () {
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 2);
            _common.setup_gridLayout(cnt.uuid.PRICE_LISTS, CONTAINER_COLUMNS_PRICE_LIST)
        });
        _common.clear_subContainerFilter(cnt.uuid.PRICE_LISTS)
        cy.wait(2000)
        _common.create_newRecord(cnt.uuid.PRICE_LISTS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.PRICE_LISTS,app.GridCells.MATERIAL_PRICE_VERSION_PRICE_LIST)
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSIO_FKN,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT, PRICEVERSION_DESC)
        cy.wait(1000)
        _common.clickOn_activeRowCell(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_PRICE_LIST)
        _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.CO2_PROJECT_VALUE_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PRICE_LISTS)
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.PRICE_LISTS,app.GridCells.MATERIAL_PRICE_VERSION_PRICE_LIST)
        _common.edit_dropdownCellWithInput(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSIO_FKN,commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRICEVERSION_DESC2)
        cy.wait(1000)
        _common.clickOn_activeRowCell(cnt.uuid.PRICE_LISTS, app.GridCells.MATERIAL_PRICE_VERSION_PRICE_LIST)
        _common.edit_containerCell(cnt.uuid.PRICE_LISTS, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PRICE_LIST.CO2_PROJECT_VALUE_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify CO2/kg(source) and CO2/kg(source name) is not editable in price list', function () {
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PRICE_LISTS, app.FooterTab.PRICE_LISTS, 0);
        });
        _validate.verify_isRecordNotEditable(cnt.uuid.PRICE_LISTS, app.GridCells.CO2_SOURCE, 0)
        _validate.verify_isRecordNotEditable(cnt.uuid.PRICE_LISTS, app.GridCells.BAS_CO2_SOURCE_FK, 0)
    })
})