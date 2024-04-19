import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _procurementPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

import _ from "cypress/types/lodash";
const allure = Cypress.Allure.reporter.getInterface()

let REQUISITION_PARAMETERS: DataCells
let REQUISTION_ITEM_PARAMETER:DataCells
let CONTAINER_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION
let CONTAINER_REQUISITION_ITEM
let CONTAINER_COLUMNS_REQUISITION_TOTALS
let CONTAINER_COLUMNS_REQUISITION_ITEM

allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.2 | Create requisition directly from requisition module for material")

describe("PCM- 2.2 | Create requisition directly from requisition module for material", () => {
    before(function () {

        cy.fixture("pcm/pcm-2.2-create-requisition-directly-from-requisition-module-for-material.json").then((data) => {
            this.data = data
            CONTAINER_REQUISITION = this.data.CONTAINERS.REQUISITION
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_COLUMNS_REQUISITION_TOTALS = this.data.CONTAINER_COLUMNS.REQUISITION_TOTALS
            CONTAINER_REQUISITION_ITEM = this.data.CONTAINERS.REQUISITION_ITEM
            CONTAINER_COLUMNS_REQUISITION_ITEM = this.data.CONTAINER_COLUMNS.REQUISITION_ITEM
            REQUISITION_PARAMETERS = {
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINER_REQUISITION.CONFIGURATION
            }
            REQUISTION_ITEM_PARAMETER = {
                [app.GridCells.MDC_MATERIAL_FK]: CONTAINER_REQUISITION_ITEM.MATERIAL_NO,
                [app.GridCells.QUANTITY_SMALL]: CONTAINER_REQUISITION_ITEM.QUANTITY,
                [app.GridCells.PRICE_SMALL]: CONTAINER_REQUISITION_ITEM.PRICE
            }
        })
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });

    // after(() => {
    //     cy.LOGOUT();
    // });

    it('TC - Verify Creation Of Record in Requisition module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS)
        cy.SAVE()
        cy.wait(1000)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_REQUISITION.STRUCTURE_CODE)
        _common.waitForLoaderToDisappear()
        _mainView.findModuleClientArea().select_popupItem("grid", CONTAINER_REQUISITION.STRUCTURE_CODE)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify Addition of Material item in items container', function () {
        _common.openTab(app.TabBar.REQUISITIONITEMS).then(() => {
            _common.setDefaultView(app.TabBar.REQUISITIONITEMS)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONITEMS, app.FooterTab.ITEMS, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONITEMS, CONTAINER_COLUMNS_REQUISITION_ITEM)
        });
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.REQUISITIONITEMS)
        _package.enterRecord_toCreateNewRequisitionItem(cnt.uuid.REQUISITIONITEMS, REQUISTION_ITEM_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_SELECTED_ENTITIES()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONITEMS, app.GridCells.MDC_MATERIAL_FK, CONTAINER_REQUISITION_ITEM.MATERIAL_NO)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_TOTALS, app.FooterTab.TOTALS, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_TOTALS, CONTAINER_COLUMNS_REQUISITION_TOTALS)
        });
        _validate.verifyNetValueOf_requisitionItems(CONTAINER_REQUISITION_ITEM.QUANTITY, CONTAINER_REQUISITION_ITEM.PRICE)
    })
})
