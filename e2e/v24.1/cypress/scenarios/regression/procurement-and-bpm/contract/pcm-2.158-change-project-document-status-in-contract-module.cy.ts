import AppLayout from "cypress/locators/app-layout";
import { _modalView, _rfqPage, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _materialPage, _controllingUnit, _procurementPage, _procurementContractPage } from "cypress/pages";
import { tile, cnt, app, btn, commonLocators, sidebar } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
const allure = Cypress.Allure.reporter.getInterface();
const ITEM_DESC = "ITEM-DESC-" + Cypress._.random(0, 999);

let CONTAINERS_CONTRACT
let CONTAINER_COLUMNS_CONTRACT
let CONTAINERS_ITEM
let CONTAINER_COLUMNS_ITEM
let CONTAINERS_DOCUMENT_PROJECT
let CONTAINER_COLUMNS_DOCUMENT_PROJECT

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.158 | Change Project document status in contract module");

describe("PCM- 2.158 | Change Project document status in contract module", () => {
    before(function () {
        cy.fixture("pcm/pcm-2.158-change-project-document-status-in-contract-module.json").then((data) => {
            this.data = data;
            CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINERS_ITEM = this.data.CONTAINERS.ITEM
            CONTAINER_COLUMNS_ITEM = this.data.CONTAINER_COLUMNS.ITEM
            CONTAINERS_DOCUMENT_PROJECT = this.data.CONTAINERS.DOCUMENT_PROJECT
            CONTAINER_COLUMNS_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.DOCUMENT_PROJECT
        });
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });

    it("TC - Create new contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _materialPage.enterRecord_toCreateContract(CONTAINERS_CONTRACT.BUSINESS_PARTNER)
        cy.wait(2000);//required wait otherwise assertions will get fail
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
    });

    it("TC - Create Items for Contract", function () {
        _common.openTab(app.TabBar.ORDER_ITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ITEMSCONTRACT, app.FooterTab.ITEMS, 0)
            _common.setup_gridLayout(cnt.uuid.ITEMSCONTRACT, CONTAINER_COLUMNS_ITEM)
        })
        _common.create_newRecord(cnt.uuid.ITEMSCONTRACT)
        _common.waitForLoaderToDisappear()
        _procurementContractPage.enterRecord_toCreateItem(cnt.uuid.ITEMSCONTRACT, CONTAINERS_ITEM.MATERIAL_NO, ITEM_DESC, CONTAINERS_ITEM.ITEMS_NO)
    })

    it('TC - Verify status change of multiple document project record', function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 5);
            _common.setup_gridLayout(cnt.uuid.PROJECT_DOCUMENTS, CONTAINER_COLUMNS_DOCUMENT_PROJECT)
        });
        cy.wait(2000) //required wait otherwise assertions will get fail
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_DOCUMENT_PROJECT.DOCUMENT_1)
        cy.SAVE()
        cy.wait(1000) //required wait otherwise assertions will get fail
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_DOCUMENT_PROJECT.DOCUMENT_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PROJECT_DOCUMENTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.APPROVED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, CONTAINERS_DOCUMENT_PROJECT.DOCUMENT_1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, commonLocators.CommonKeys.APPROVED)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, CONTAINERS_DOCUMENT_PROJECT.DOCUMENT_2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, commonLocators.CommonKeys.APPROVED)
    })

    it("TC - Verify status change of single document project record", function () {
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_DOCUMENT_PROJECT.DOCUMENT_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED, CONTAINERS_CONTRACT.REMARK)
        _common.waitForLoaderToDisappear()
        cy.wait(2000) //required wait otherwise assertion will get fail
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, commonLocators.CommonKeys.APPROVED)
    });

    it("TC - Verify it allows to add message to history by wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
        cy.wait(1000) //required wait otherwise script will get fail
        _common.clickOn_modalFooterButton(Buttons.ButtonText.HISTORY)
        cy.wait(1000) //required wait otherwise script will get fail
        _common.clickOn_cellHasValue_fromModal(app.GridCells.NEW_STATUS, commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        _common.verify_activeRow_fromModal(app.GridCells.REMARK, CONTAINERS_CONTRACT.REMARK)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.CLOSE)
    });
});
