import { app, cnt, commonLocators, sidebar, tile } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _mainView, _package, _validate } from "cypress/pages";
const allure = Cypress.Allure.reporter.getInterface();

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 2.124 | Check calculation relation for item prices in Procurement, When 'Calculate over Gross' is enabled");

const PACKAGE_DESC = "PACKAGE_DESC-" + Cypress._.random(0, 999);

let CONTAINER_PACKAGE,
    CONTAINER_ITEM,
    CONTAINER_COLUMNS_ITEM,
    CONTAINER_COLUMNS_ITEM_GET_TEXT_COLUMNS

var PACKAGEITEM_ARRAY_1
var PACKAGEITEM_ARRAY_2

describe("PCM- 2.124 | Check calculation relation for item prices in Procurement, When 'Calculate over Gross' is enabled", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.124-check-calculation-relation-for-item-prices-in-Procurement-when-calculate-over-gross-is-enabled.json").then((data) => {
            this.data = data
            this.data = data
            CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_ITEM = this.data.CONTAINERS.ITEM
            CONTAINER_COLUMNS_ITEM = this.data.CONTAINER_COLUMNS.ITEM
            CONTAINER_COLUMNS_ITEM_GET_TEXT_COLUMNS = this.data.CONTAINERS
            cy.preLoading(
                Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName")
            );
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    })

    after(() => {
        cy.LOGOUT();
    })

    it("add currency conversion and exchange rates to home currency", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CURRENCY);
        cy.wait(2000)  //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.HOME_CURRENCY, app.GridCells.CURRENCY, CONTAINER_PACKAGE.HOME_CURRENCY)
        cy.wait(5000).then(() => {
            _package.createNewRecordINCurrencyConversion_IfnotExist(cnt.uuid.CURRENCY_CONVERSION, app.GridCells.CURRENCY_FOREIGN_FK, CONTAINER_PACKAGE.CURRENCY, CONTAINER_ITEM.RATE, 0)
        })
    })

    it("Create New Package Manually", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.clear_searchInSidebar()
        _common.clear_subContainerFilter(cnt.uuid.PACKAGE)
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(commonLocators.CommonKeys.MATERIAL, PACKAGE_DESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("Create New Item Manually", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM);
            _common.set_columnAtTop([CONTAINER_COLUMNS_ITEM.quantity,CONTAINER_COLUMNS_ITEM.mdcmaterialfk,CONTAINER_COLUMNS_ITEM.price],cnt.uuid.PACKAGEITEMS)
        });
        _common.create_newRecord(cnt.uuid.PACKAGEITEMS)
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_MATERIAL_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ITEM.MATERIAL_NUMBER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PACKAGEITEMS, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_ITEM.QUANTITY)
        cy.wait(2000) //required wait to load page
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.PACKAGEITEMS)
        _common.getText_fromCell(cnt.uuid.PACKAGEITEMS, app.GridCells.PRICE_SMALL).then(($ele) => {
            Cypress.env("PackageItemPrice", $ele.text())
        })
    })

    it("Verify Price will be Price = Price (OC) / Foreign currency rate Price (Gross) after  updating rate value", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PACKAGE_DETAILS, app.FooterTab.PACKAGEDETAILS, 2);
        });
        _mainView.findInputInContainerByLabel(cnt.uuid.PACKAGE_DETAILS, CONTAINER_ITEM.RATE_LABEL).clear().type(CONTAINER_ITEM.RATE)
        cy.wait(2000)  //required wait to load page
        _common.openTab(app.TabBar.PACKAGE)
        _validate.verify_isContainerMinimized(cnt.uuid.PACKAGE_DETAILS)
        cy.wait(2000)  //required wait to load page
        _common.clickOn_modalFooterButton(Buttons.ButtonText.YES)
        cy.wait(2000)  //required wait to load page
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
        _common.select_rowInContainer(cnt.uuid.PACKAGEITEMS)
        cy.wait(3000).then(() => {
            _validate.verify_isRecordDivisionOfTwoValuesAnd_ComapreWithThirdValue(cnt.uuid.PACKAGEITEMS, Cypress.env("PackageItemPrice"), CONTAINER_ITEM.RATE, app.GridCells.PRICE_SMALL)
        })
    })

    it("Verify when modify tax code, it should keep total(gross) and to recalculate  total, same for total price(gross), price(gross)", function () {
        _common.select_rowInContainer(cnt.uuid.PACKAGEITEMS)
        PACKAGEITEM_ARRAY_1 = _common.returnArrayForMultipleCell(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM_GET_TEXT_COLUMNS.GET_TEXT_COLUMNS)
        _common.edit_dropdownCellWithCaret(cnt.uuid.PACKAGEITEMS, app.GridCells.MDC_TAX_CODE_FK_SMALL, commonLocators.CommonKeys.GRID, CONTAINER_ITEM.TAX_CODE)
        cy.SAVE()
        _common.select_rowInContainer(cnt.uuid.PACKAGEITEMS)
        PACKAGEITEM_ARRAY_2 = _common.returnArrayForMultipleCell(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM_GET_TEXT_COLUMNS.GET_TEXT_COLUMNS)
        cy.wait(500).then(() => {
            cy.wrap(PACKAGEITEM_ARRAY_1).should('not.deep.equal', PACKAGEITEM_ARRAY_2);
        });
    })

    it("Verify modify currency, it should keep total(gross) and to recalculate  total , same for total price(gross), price(gross)", function () {
        PACKAGEITEM_ARRAY_1 = _common.returnArrayForMultipleCell(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM_GET_TEXT_COLUMNS.GET_TEXT_COLUMNS)
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE, app.GridCells.CURRENCY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE.CURRENCY)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.YES)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
        _common.select_rowInContainer(cnt.uuid.PACKAGEITEMS)
        PACKAGEITEM_ARRAY_2 = _common.returnArrayForMultipleCell(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM_GET_TEXT_COLUMNS.GET_TEXT_COLUMNS)
        cy.wait(500).then(() => {
            cy.wrap(PACKAGEITEM_ARRAY_1).should('not.deep.equal', PACKAGEITEM_ARRAY_2);
        });
    })

    it("Verify modify vat group, it should keep total(gross) and to reclacluate total , same for total price(gross), price(gross)", function () {
        PACKAGEITEM_ARRAY_1 = _common.returnArrayForMultipleCell(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM_GET_TEXT_COLUMNS.GET_TEXT_COLUMNS)
        _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 0);
        _common.edit_dropdownCellWithInput(cnt.uuid.PACKAGE, app.GridCells.BPD_VAT_GROUP_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PACKAGE.VAT_GROUP)
        _common.select_rowInContainer(cnt.uuid.PACKAGE)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.YES)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PACKAGEITEMS, app.FooterTab.ITEMS, 1);
        _common.select_rowInContainer(cnt.uuid.PACKAGEITEMS)
        PACKAGEITEM_ARRAY_2 = _common.returnArrayForMultipleCell(cnt.uuid.PACKAGEITEMS, CONTAINER_COLUMNS_ITEM_GET_TEXT_COLUMNS.GET_TEXT_COLUMNS)
        cy.wait(500).then(() => {
            cy.wrap(PACKAGEITEM_ARRAY_1).should('not.deep.equal', PACKAGEITEM_ARRAY_2);
        });
    })
});