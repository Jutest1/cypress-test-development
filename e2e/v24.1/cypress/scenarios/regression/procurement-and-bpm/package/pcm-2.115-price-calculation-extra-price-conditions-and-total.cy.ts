import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _package, _rfqPage, _validate, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import { PACKAGE_TOTAL_TRANSLATION } from "cypress/pages/variables";
const allure = Cypress.Allure.reporter.getInterface();

const MATERIAL_GROUPS_CODE = "MATGRP-DESC-" + Cypress._.random(0, 999);
const MATERIAL_GROUPS_DESC = "MATGRP-DESC-" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_DESC = "MAT-DESC-" + Cypress._.random(0, 999);
const MATERIAL_CATALOG_CODE = "MAT_CODE-" + Cypress._.random(0, 999);
const PROJECT_NO = "PRJ-" + Cypress._.random(0, 999);
const PROJECT_NAME = "PRJNAME-" + Cypress._.random(0, 999);
const CLERK = "HS";
const MATERIAL_RECORD_CODE = "MAT-REC-" + Cypress._.random(0, 999);
const MATERIAL_RECORD_DESC = "MAT-RECDESC-" + Cypress._.random(0, 999);
const VARIANT_DESC = "VARIANT-DESC-" + Cypress._.random(0, 999);

const DAYS = require('dayjs')
let date = parseInt(DAYS().format('DD'))
let month = DAYS().format('MM')
let year = DAYS().format('YYYY')
let VALID_TO = DAYS().daysInMonth() + "/" + month + "/" + year;
let VALID_FROM = date + "/" + month + "/" + year;

let PROJECTS_PARAMETERS: DataCells,
    MATERIAL_CATALOGS_PARAMETER: DataCells,
    MATERIAL_GROUPS: DataCells,
    MATERIAL_RECORD_PARAMETER: DataCells

let CONTAINERS_MATERIAL_CATALOG,
    CONTAINER_COLUMNS_MATERIAL_CATALOG,
    CONTAINER_COLUMNS_MATERIAL_GROUPS,
    CONTAINERS_MATERIAL_RECORD,
    CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER,
    CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER,
    CONTAINER_COLUMNS_MATERIAL_RECORD,
    CONTAINER_COLUMNS_VARIANT,
    CONTAINER_REQUISITION,
    CONTAINER_COLUMNS_REQUISITION,
    CONTAINER_COLUMNS_ITEMS,
    CONTAINER_ITEMS,
    CONTAINER_COLUMNS_SCOPE_OF_SUPPLY,
    CONTAINER_SCOPE_OF_SUPPLY,
    CONTAINER_TAX_CODE

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.115 | Price calculation, Extra Price conditions and Total");
describe("PCM- 2.115 | Price calculation, Extra Price conditions and Total", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.115-price-calculation-extra-price-conditions-and-total.json").then((data) => {
            this.data = data
            CONTAINERS_MATERIAL_CATALOG = this.data.CONTAINERS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_CATALOG = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOG
            CONTAINER_COLUMNS_MATERIAL_GROUPS = this.data.CONTAINER_COLUMNS.MATERIAL_GROUPS
            CONTAINERS_MATERIAL_RECORD = this.data.CONTAINERS.MATERIAL_RECORD
            CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS_FILTER
            CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_GROUP_FILTER
            CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER = this.data.CONTAINER_COLUMNS.MATERIAL_CATALOGS_FILTER
            CONTAINER_COLUMNS_MATERIAL_RECORD = this.data.CONTAINER_COLUMNS.MATERIAL_RECORD
            CONTAINER_COLUMNS_VARIANT = this.data.CONTAINER_COLUMNS.VARIANT
            CONTAINER_REQUISITION = this.data.CONTAINERS.REQUISITION
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_ITEMS = this.data.CONTAINER_COLUMNS.ITEMS
            CONTAINER_ITEMS = this.data.CONTAINERS.ITEMS
            CONTAINER_COLUMNS_SCOPE_OF_SUPPLY = this.data.CONTAINER_COLUMNS.SCOPE_OF_SUPPLY
            CONTAINER_SCOPE_OF_SUPPLY = this.data.CONTAINERS.SCOPE_OF_SUPPLY
            CONTAINER_TAX_CODE = this.data.CONTAINERS.TAX_CODE

            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK
            }
            MATERIAL_CATALOGS_PARAMETER = {
                [app.GridCells.CODE]: MATERIAL_CATALOG_CODE,
                [app.GridCells.BUSINESS_PARTNER_FK]: CONTAINERS_MATERIAL_CATALOG.BUSINESS_PARTNER,
                [app.GridCells.PAYMENT_TERM_FI_FK]: CONTAINERS_MATERIAL_CATALOG.PAYMENT_TERM_FI,
                [app.GridCells.PAYMENT_TERM_AD_FK]: CONTAINERS_MATERIAL_CATALOG.PAYMENT_TERM_AD,
                [app.GridCells.DESCRIPTION_INFO]: MATERIAL_CATALOG_DESC,
                [app.GridCells.VALID_FROM]: VALID_FROM,
                [app.GridCells.VALID_TO]: VALID_TO,
                [app.GridCells.MATERIAL_CATALOG_TYPE_FK]: CONTAINERS_MATERIAL_CATALOG.MATERIAL_TYPE
            }
            MATERIAL_GROUPS = {
                [app.GridCells.CODE]: MATERIAL_GROUPS_CODE,
                [app.GridCells.DESCRIPTION_INFO]: MATERIAL_GROUPS_DESC,
                [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_MATERIAL_CATALOG.STRUCURE_CODE
            }
            MATERIAL_RECORD_PARAMETER = {
                [app.GridCells.CODE]: MATERIAL_RECORD_CODE,
                [app.GridCells.DESCRIPTION_INFO_1]: MATERIAL_RECORD_DESC,
                [app.GridCells.UOM_FK]: CONTAINERS_MATERIAL_RECORD.UOM,
                [app.GridCells.RETAIL_PRICE]: CONTAINERS_MATERIAL_RECORD.RETAIL_PRICE,
                [app.GridCells.LIST_PRICE]: CONTAINERS_MATERIAL_RECORD.LIST_PRICE,
                [app.GridCells.BAS_CURRENCY_FK]: CONTAINERS_MATERIAL_RECORD.CURRENCY
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create material catalog and material group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL_CATALOG);
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOGS, app.FooterTab.MATERIALCATALOG, 0)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOGS, CONTAINER_COLUMNS_MATERIAL_CATALOG);
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOGS)
        _common.create_newRecord(cnt.uuid.MATERIAL_CATALOGS)
        _materialPage.enterRecord_toCreateMaterialCatalogs(cnt.uuid.MATERIAL_CATALOGS, MATERIAL_CATALOGS_PARAMETER);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_CATALOGS)
        _common.openTab(app.TabBar.CATALOGS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUPS, app.FooterTab.MATERIALGROUP, 1)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUPS, CONTAINER_COLUMNS_MATERIAL_GROUPS);
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_GROUPS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUPS)
        _common.create_newRecord(cnt.uuid.MATERIAL_GROUPS)
        _materialPage.enterRecord_toCreateNewMaterialGroups(cnt.uuid.MATERIAL_GROUPS, MATERIAL_GROUPS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_GROUPS)
    })

    it("TC - Create material record and Variant", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.MATERIAL);
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_CATALOG_FILTER, app.FooterTab.MATERIALFILTER)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_CATALOG_FILTER, CONTAINER_COLUMNS_MATERIAL_CATALOGS_FILTER)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_CATALOG_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_CATALOG_FILTER, MATERIAL_CATALOG_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_CATALOG_FILTER, app.GridCells.IS_CHECKED, "check")

        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_GROUP_FILTER, app.FooterTab.MATERIALGROUPFILTER)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_GROUP_FILTER, CONTAINER_COLUMNS_MATERIAL_GROUP_FILTER)
        })
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_GROUP_FILTER)
        _common.search_inSubContainer(cnt.uuid.MATERIAL_GROUP_FILTER, MATERIAL_GROUPS_CODE)
        _common.set_cellCheckboxValue(cnt.uuid.MATERIAL_GROUP_FILTER, app.GridCells.IS_CHECKED, "check")
        cy.wait(1000) //required wait to load page
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.MATERIAL_RECORDS, app.FooterTab.MATERIAL_RECORDS)
            _common.setup_gridLayout(cnt.uuid.MATERIAL_RECORDS, CONTAINER_COLUMNS_MATERIAL_RECORD)
        })
        _common.maximizeContainer(cnt.uuid.MATERIAL_RECORDS)
        _common.clear_subContainerFilter(cnt.uuid.MATERIAL_RECORDS)
        _common.create_newRecord(cnt.uuid.MATERIAL_RECORDS)
        cy.wait(1000) //required wait to load page
        _materialPage.enterRecord_toCreateNewMaterialRecord(cnt.uuid.MATERIAL_RECORDS, MATERIAL_RECORD_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.MATERIAL_RECORDS)
        cy.wait(1000) //required wait to load page
        _common.openTab(app.TabBar.RECORDS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.VARIANT1, app.FooterTab.VARIANT)
            _common.setup_gridLayout(cnt.uuid.VARIANT1, CONTAINER_COLUMNS_VARIANT)
        })
        _common.create_newRecord(cnt.uuid.VARIANT1)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.VARIANT1)
        _common.enterRecord_inNewRow(cnt.uuid.VARIANT1, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, VARIANT_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.VARIANT1, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_REQUISITION.BUSINESS_PARTNER)
    })

    it("TC - Create requisition and Items", function () {
        cy.wait(500).then(() => {
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
            _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
            cy.wait(2000) //required wait to load page
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
            _common.waitForLoaderToDisappear()
            cy.wait(2000) //required wait to load page
        })
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        })
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        cy.wait(1000) //required wait to load page
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        cy.wait(1000) //required wait to load page
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_REQUISITION.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.REQUISITIONITEMS).then(() => {
            _common.setDefaultView(app.TabBar.REQUISITIONITEMS)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0)
            _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_ITEMS)
            _common.set_columnAtTop([CONTAINER_COLUMNS_ITEMS.mdctaxcodefk, CONTAINER_COLUMNS_ITEMS.prcpriceconditionfk], cnt.uuid.REQUISITIONITEMS)
            cy.wait(1000) //required wait to load page
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        cy.wait(1000) //required wait to load page
        cy.SAVE()
        _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
        cy.wait(1000) //required wait to load page
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_TAX_CODE_FK_SMALL, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ITEMS.TAX_CODE)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, MATERIAL_RECORD_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ITEMS.QUANTITY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(1000) //required wait to load page
    })

    it("TC - Create Variant and Scope of supply in items", function () {
        _common.openTab(app.TabBar.REQUISITIONITEMS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.VARIANT_REQUISITION_ITEM, app.FooterTab.VARIANT, 1)
            _common.setup_gridLayout(cnt.uuid.VARIANT_REQUISITION_ITEM, CONTAINER_COLUMNS_VARIANT)
        })
        _common.create_newRecord(cnt.uuid.VARIANT_REQUISITION_ITEM)
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.VARIANT_REQUISITION_ITEM)
        _common.edit_dropdownCellWithCaret(cnt.uuid.VARIANT_REQUISITION_ITEM, app.GridCells.MAT_SCOPE, commonLocators.CommonKeys.GRID, VARIANT_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.VARIANT_REQUISITION_ITEM, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_REQUISITION.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.REQUISITIONITEMS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCOPE_OF_SUPPLY, app.FooterTab.SCOPE_OF_SUPPLY, 7)
            _common.setup_gridLayout(cnt.uuid.SCOPE_OF_SUPPLY, CONTAINER_COLUMNS_SCOPE_OF_SUPPLY)
        })
        _common.create_newRecord(cnt.uuid.SCOPE_OF_SUPPLY)
        cy.wait(1000) //required wait to load page
        _common.select_rowInContainer(cnt.uuid.SCOPE_OF_SUPPLY)
        _common.edit_dropdownCellWithCaret(cnt.uuid.SCOPE_OF_SUPPLY, app.GridCells.SCOPE_OF_SUPPLY_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINER_SCOPE_OF_SUPPLY.TYPE)
        _common.edit_dropdownCellWithInput(cnt.uuid.SCOPE_OF_SUPPLY, app.GridCells.PRC_STRUCTURE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_SCOPE_OF_SUPPLY.STRUCTURE)
        _common.enterRecord_inNewRow(cnt.uuid.SCOPE_OF_SUPPLY, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_SCOPE_OF_SUPPLY.QUANTITY)
        _common.enterRecord_inNewRow(cnt.uuid.SCOPE_OF_SUPPLY, app.GridCells.PRICE_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_SCOPE_OF_SUPPLY.PRICE)
        _common.enterRecord_inNewRow(cnt.uuid.SCOPE_OF_SUPPLY, app.GridCells.PRICE_UNIT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_SCOPE_OF_SUPPLY.PRICE_UNIT)
        _common.edit_dropdownCellWithInput(cnt.uuid.SCOPE_OF_SUPPLY, app.GridCells.UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_SCOPE_OF_SUPPLY.UOM)
        cy.SAVE()
        cy.wait(1000) //required wait to load page
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify total in Variant as per the scope of supply inputs", function () {
        _common.openTab(app.TabBar.REQUISITIONITEMS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.VARIANT_REQUISITION_ITEM, app.FooterTab.VARIANT, 3)
            _common.setup_gridLayout(cnt.uuid.VARIANT_REQUISITION_ITEM, CONTAINER_COLUMNS_VARIANT)
        })
        _validate.verify_isCalculateFractionalProduct(cnt.uuid.VARIANT_REQUISITION_ITEM, CONTAINER_SCOPE_OF_SUPPLY.PRICE, CONTAINER_SCOPE_OF_SUPPLY.QUANTITY, CONTAINER_SCOPE_OF_SUPPLY.PRICE_UNIT, app.GridCells.TOTAL)
        _common.openTab(app.TabBar.REQUISITIONITEMS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 0)
        })
        _validate.verify_isCalculateFractionalProduct(cnt.uuid.REQUISITIONITEMS, CONTAINER_SCOPE_OF_SUPPLY.PRICE, CONTAINER_SCOPE_OF_SUPPLY.QUANTITY, CONTAINER_SCOPE_OF_SUPPLY.PRICE_UNIT, app.GridCells.PRICE_SMALL)
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONITEMS, app.GridCells.TOTAL, "ITEMTOTALVALUE")
    })

    it("TC - Verify the 'Total' in Items and Totals container-1", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PRICE_CONDITION);
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PRICE_CONDITION, app.GridCells.DESCRIPTION_INFO, CONTAINER_ITEMS.PRICE_CONDITION)
        cy.wait(1000) //required wait to load page
        _common.saveCellDataToEnv(cnt.uuid.PRICE_CONDITION_DETAILS, app.GridCells.VALUE, "PRICECONDITIONVALUE")
    })

    it("TC - Verify the 'Total' in Items and Totals container-2", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        cy.wait(2000) //required wait to load page
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONITEMS, app.GridCells.DESCRIPTION_1, MATERIAL_RECORD_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONITEMS, app.GridCells.PRC_PRICE_CONDITION_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ITEMS.PRICE_CONDITION)
        cy.SAVE().wait(2000).SAVE().wait(500) //required wait to load page
        _common.openTab(app.TabBar.REQUISITIONITEMS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 4)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, CONTAINER_ITEMS.TOTAL_CELL_VALUE, PACKAGE_TOTAL_TRANSLATION)
        _validate.verify_isCalculateLinearExpression(cnt.uuid.REQUISITION_TOTALS, Cypress.env("ITEMTOTALVALUE"), Cypress.env("PRICECONDITIONVALUE"), Cypress.env("ITEMTOTALVALUE"), app.GridCells.VALUE_NET)
    })

    it("TC - Verify the VAT in totals container-1", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TAX_CODE);
        _common.openTab(app.TabBar.TAXCODE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TAX_CODE, app.FooterTab.TAXCODE, 0)
        })
        cy.wait(2000) //required wait to load page
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.TAX_CODE, app.GridCells.DESCRIPTION_INFO, CONTAINER_TAX_CODE.DESCRIPTION)
        _common.saveCellDataToEnv(cnt.uuid.TAX_CODE, app.GridCells.VAT_PERCENT, "TAXCODEPERCENTAGE")
    })

    it("TC - Verify the VAT in totals container-2", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        cy.wait(2000).REFRESH_CONTAINER() //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITIONITEMS, app.GridCells.DESCRIPTION_1, MATERIAL_RECORD_DESC)
        _common.openTab(app.TabBar.REQUISITIONITEMS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 4)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_TOTALS, app.GridCells.TRANSLATED, CONTAINER_ITEMS.TOTAL_CELL_VALUE, PACKAGE_TOTAL_TRANSLATION)
        _validate.verify_VATCalculation(cnt.uuid.REQUISITION_TOTALS, Cypress.env("TAXCODEPERCENTAGE"))
    })
})