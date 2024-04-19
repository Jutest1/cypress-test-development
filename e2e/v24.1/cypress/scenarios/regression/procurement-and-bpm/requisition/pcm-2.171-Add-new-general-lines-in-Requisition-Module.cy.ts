import { tile, cnt, app, sidebar, commonLocators, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _package, _procurementPage, _validate, _modalView } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const GENERALS_01 = "GR1-" + Cypress._.random(0, 999);
const GENERALS_02 = "GR2-" + Cypress._.random(0, 999);

let CONTAINERS_DATA_TYPES, CONTAINERS_DATA_RECORDS, CONTAINERS_GENERALS;

let CONTAINER_COLUMNS_REQUISITION, CONTAINER_COLUMNS_GENERALS;

let DATA_RECORDS_PARAMETERS_1: DataCells, DATA_RECORDS_PARAMETERS_2: DataCells, REQUISITION_PARAMETER_1: DataCells;
ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Requisition");
ALLURE.story("PCM- 2.171 | Add new general lines in Requisition Module")

describe("PCM- 2.171 | Add new general lines in Requisition Module", () => {

    before(function () {

        cy.fixture("pcm/pcm-2.171-Add-new-general-lines-in-Requisition-Module.json").then((data) => {
            this.data = data
            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINERS_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            DATA_RECORDS_PARAMETERS_1 = {
                [app.GridCells.LEDGER_CONTEXT_FK]: CONTAINERS_DATA_RECORDS.LEDGER_CONTEXT,
                [app.GridCells.DESCRIPTION_INFO]: GENERALS_01,
                [app.GridCells.IS_COST]: CommonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_SALES]: CommonLocators.CommonKeys.UNCHECK,
                [app.GridCells.IS_PROCUREMENT]: CommonLocators.CommonKeys.CHECK
            }
            DATA_RECORDS_PARAMETERS_2 = {
                [app.GridCells.LEDGER_CONTEXT_FK]: CONTAINERS_DATA_RECORDS.LEDGER_CONTEXT,
                [app.GridCells.DESCRIPTION_INFO]: GENERALS_02,
                [app.GridCells.IS_SALES]: CommonLocators.CommonKeys.UNCHECK,
                [app.GridCells.IS_PROCUREMENT]: CommonLocators.CommonKeys.CHECK,
                [app.GridCells.IS_PERCENT]: CommonLocators.CommonKeys.CHECK
            }
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION;
            REQUISITION_PARAMETER_1 = {
                [commonLocators.CommonLabels.CONFIGURATION]: CommonLocators.CommonKeys.MATERIAL
            }
            CONTAINERS_GENERALS = this.data.CONTAINERS.GENERALS
            CONTAINER_COLUMNS_GENERALS = this.data.CONTAINER_COLUMNS.GENERALS;
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create Customising and assertion for Amount and Percent ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING);
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINERS_DATA_TYPES.GENERAL_TYPE)
        cy.REFRESH_CONTAINER()
        _common.select_rowInContainer(cnt.uuid.DATA_TYPES)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORD, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.select_allContainerData(cnt.uuid.DATA_RECORDS)
        _common.set_cellCheckboxValueForAllRowCell(cnt.uuid.DATA_RECORDS, app.GridCells.IS_DEFAULT, commonLocators.CommonKeys.UNCHECK)
        cy.SAVE()
        _package.enterRecord_toCreateGeneralsTypeDataRecord(cnt.uuid.DATA_RECORDS, DATA_RECORDS_PARAMETERS_1)
        cy.SAVE()
        _package.enterRecord_toCreateGeneralsTypeDataRecord(cnt.uuid.DATA_RECORDS, DATA_RECORDS_PARAMETERS_2)
        cy.SAVE()
    })

    it('TC - Verify creation requisition', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION)
        cy.wait(5000)
        _common.setDefaultView(app.TabBar.MAIN)
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS)
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETER_1)
        cy.SAVE()
    })

    it('TC - Add Generals Record', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_GENERALS, CONTAINER_COLUMNS_GENERALS)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_GENERALS)
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, CommonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, GENERALS_01)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUES[0])
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, GENERALS_01)
    })

    it('TC - Verify value Type of generals record with iscost Data type', function () {
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE_TYPE, CONTAINERS_GENERALS.COST_VALUE_TYPE[0])
        cy.SAVE()
    })

    it('TC - Verify type is mandatory field, and lookup filter is correct', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 1);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_GENERALS, CONTAINER_COLUMNS_GENERALS)
        });
        _common.clear_subContainerFilter(cnt.uuid.REQUISITION_GENERALS)
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUES[0])
        cy.SAVE()
        _validate.validate_Text_message_In_PopUp("The field should not be empty.")
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        _common.clickOn_toolbarButton(cnt.uuid.REQUISITION_GENERALS, btn.IconButtons.ICO_REC_DELETE)
        cy.SAVE()
    })

    it('TC - Verify type type should not duplicated', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 0);
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, CommonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, GENERALS_01)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUES[0])
        cy.SAVE()
        _validate.validate_Text_message_In_PopUp("The generals type should be unique")
        _common.clickOn_modalFooterButton(btn.ButtonText.CANCEL)
        _common.clickOn_toolbarButton(cnt.uuid.REQUISITION_GENERALS, btn.IconButtons.ICO_REC_DELETE)
    })

    it('TC - Verify Tax field and Contrlling Unit are editable', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 0);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, GENERALS_01)
        _common.edit_dropdownCellWithCaret(cnt.uuid.REQUISITION_GENERALS, app.GridCells.MDC_TAX_CODE_FK_SMALL, CommonLocators.CommonKeys.GRID, CONTAINERS_GENERALS.TAX_CODE[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowInContainer(cnt.uuid.REQUISITION_GENERALS)
        _common.clickOn_toolbarButton(cnt.uuid.REQUISITION_GENERALS, btn.IconButtons.ICO_REC_DELETE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDeleted(cnt.uuid.REQUISITION_GENERALS, GENERALS_01)
    })

    it('TC - Verify controlling unit and tax become are not editable with ISPERCENT Data type', function () {
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUISITION_GENERALS, app.FooterTab.GENERALS, 3);
            _common.setup_gridLayout(cnt.uuid.REQUISITION_GENERALS, CONTAINER_COLUMNS_GENERALS)
        });
        _common.create_newRecord(cnt.uuid.REQUISITION_GENERALS)
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITION_GENERALS, app.GridCells.PRC_GENERALS_TYPE_FK, CommonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, GENERALS_02)
        _common.enterRecord_inNewRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_GENERALS.VALUES[1])
        cy.SAVE()
        cy.wait(500).then(() => {
            _validate.verify_isRecordNotEditable(cnt.uuid.REQUISITION_GENERALS, app.GridCells.MDC_TAX_CODE_FK_SMALL, 0)
            _validate.verify_isRecordNotEditable(cnt.uuid.REQUISITION_GENERALS, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, 0)
        })
    })

    it('TC - Verify value Type of genreals record with ISPERCENT Data type', function () {
        cy.wait(500).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITION_GENERALS, app.GridCells.VALUE_TYPE, CONTAINERS_GENERALS.COST_VALUE_TYPE[1])
        })
    })

})
