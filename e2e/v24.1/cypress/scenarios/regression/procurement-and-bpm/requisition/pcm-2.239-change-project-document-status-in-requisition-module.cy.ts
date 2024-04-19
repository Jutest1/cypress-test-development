import AppLayout from "cypress/locators/app-layout";
import { _modalView, _rfqPage, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _materialPage, _controllingUnit, _procurementPage, _procurementContractPage } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";
import { tile, cnt, app, btn, commonLocators, sidebar } from "cypress/locators";
import cypress from "cypress";
import Buttons from "cypress/locators/buttons";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_REQUISITION;
let REQUISITION_PARAMETER:DataCells;
let CONTAINER_DOCUMENT_PROJECT;
let CONTAINER_COLUMNS_DOCUMENT_PROJECT


allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.239 | Change Project document status in Requisition module");

describe("PCM- 2.239 | Change Project document status in Requisition module", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.239-change-project-document-status-in-requisition-module.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION
            CONTAINER_REQUISITION = this.data.CONTAINERS.REQUISITION
            CONTAINER_DOCUMENT_PROJECT = this.data.CONTAINERS.DOCUMENT_PROJECT
            CONTAINER_COLUMNS_DOCUMENT_PROJECT = this.data.CONTAINER_COLUMNS.DOCUMENT_PROJECT
            REQUISITION_PARAMETER={
                [commonLocators.CommonLabels.CONFIGURATION]:CONTAINER_REQUISITION.CONFIGURATION,
            }
        });
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });

    it("TC - Create new Requisition", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, commonLocators.CommonLabels.REQUISITION);
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS,REQUISITION_PARAMETER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Verify status change of multiple document project record', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT, 5);
            _common.setup_gridLayout(cnt.uuid.PROJECT_DOCUMENTS, CONTAINER_COLUMNS_DOCUMENT_PROJECT)
        });
        cy.wait(1000)
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_DOCUMENT_PROJECT.DOCUMENT_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_DOCUMENT_PROJECT.DOCUMENT_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PROJECT_DOCUMENTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_ofMultipleRecord_fromModal(commonLocators.CommonKeys.APPROVED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, CONTAINER_DOCUMENT_PROJECT.DOCUMENT_1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, commonLocators.CommonKeys.APPROVED)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, CONTAINER_DOCUMENT_PROJECT.DOCUMENT_2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, commonLocators.CommonKeys.APPROVED)
    })

    it("TC - Verify status change of single document project record", function () {
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINER_DOCUMENT_PROJECT.DOCUMENT_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED, CONTAINER_REQUISITION.REMARK)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.PRJ_DOCUMENT_STATUS_FK, commonLocators.CommonKeys.APPROVED)
    });

    it("TC - Verify it allows to add message to history by wizard", function () {
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROJECT_DOCUMENTS, app.GridCells.DESCRIPTION, CONTAINER_DOCUMENT_PROJECT.DOCUMENT_3)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS);
        _common.clickOn_modalFooterButton(Buttons.ButtonText.HISTORY)
        _common.clickOn_cellHasValue_fromModal(app.GridCells.REMARK, CONTAINER_REQUISITION.REMARK)
        _common.assert_cellDataByContent_fromModal(app.GridCells.REMARK, CONTAINER_REQUISITION.REMARK)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.CLOSE)
    });
});
