import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _schedulePage, _rfqPage, _procurementPage } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar } from "cypress/locators";
import _ from "cypress/types/lodash";
import { DataCells } from 'cypress/pages/interfaces';

const allure = Cypress.Allure.reporter.getInterface()

let CONTAINER_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let CONTAINER_GENERAL;
let CONTAINER_COLUMNS_GENERAL;
let REQUISITION_PARAMETER: DataCells;



allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.172 | Change, delete general lines")
describe("PCM- 2.172 | Change, delete general lines", () => {
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("pcm/pcm-2.172-change-delete-general-lines.json").then((data) => {
            this.data = data
            CONTAINER_REQUISITION = this.data.CONTAINERS.REQUISITION_INPUTS
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION_COLUMN
            CONTAINER_GENERAL = this.data.CONTAINERS.GENERAL_INPUTS
            CONTAINER_COLUMNS_GENERAL = this.data.CONTAINER_COLUMNS.GENERAL_COLUMN

            REQUISITION_PARAMETER = {
                [commonLocators.CommonLabels.CONFIGURATION]:CONTAINER_REQUISITION.CONFIGURATION
            }
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    it('TC - Verify Creation Of Record in Requisition module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.REQUISITION);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS,REQUISITION_PARAMETER)
        cy.SAVE().wait(2000) //required as container takes time to load
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.STRUCTURE,commonLocators.CommonKeys.GRID ,app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_REQUISITION.STRUCTURE_CODE)
        _common.waitForLoaderToDisappear()
    })

    it('TC - Verify create generals for requisition', function () {
        _common.openTab(app.TabBar.GENERAL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_GENERALS, CONTAINER_COLUMNS_GENERAL)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_GENERALS)
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_GENERAL.TYPE1)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS,app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_GENERAL.CU1)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS)
        cy.SAVE().wait(1000) //required as container takes time to load
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_GENERALS,app.GridCells.PRC_GENERALS_TYPE_FK,CONTAINER_GENERAL.TYPE1)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS,app.GridCells.PRC_GENERALS_TYPE_FK,commonLocators.CommonKeys.LIST,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_GENERAL.TYPE2)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS,app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,CONTAINER_GENERAL.CU2)
        _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS)
        cy.SAVE().wait(1000) //required as container takes time to load
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_GENERALS,app.GridCells.PRC_GENERALS_TYPE_FK,CONTAINER_GENERAL.TYPE2)
        _common.delete_recordFromContainer(cnt.uuid.REQUISITION_GENERALS)
        cy.SAVE().wait(1000) //required as container takes time to load
        _validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_GENERALS,CONTAINER_GENERAL.TYPE2)
    })

    it('TC - Verify is generals record is deleted', function () {
        _validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_GENERALS,CONTAINER_GENERAL.TYPE2)
    })
})

after(() => {
    cy.LOGOUT();
});