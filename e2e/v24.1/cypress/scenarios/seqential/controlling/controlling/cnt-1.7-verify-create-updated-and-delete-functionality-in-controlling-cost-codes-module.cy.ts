import { app, sidebar, commonLocators, cnt } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const allure = Cypress.Allure.reporter.getInterface();
const CONTROLLING_CC_CODE = "01" + Cypress._.random(0, 999);
const CONTROLLING_CC_DESC = "DESC-" + Cypress._.random(0, 999);
const CONTROLLING_CC_DESC_1 = "UPDATE-" + Cypress._.random(0, 999);
const DATA_RECORDS_CODE = "012" + Cypress._.random(0, 999);
const DATA_RECORDS = "AAB-" + Cypress._.random(0, 999);

let CONTAINERS_CONTROLLING_COST_CODE, CONTAINER_ACCOUNT, CONTAINER_DATA_TYPES, CONTAINER_DATA_RECORDS;

let CONTAINER_COLUMNS_CONTROLLING_COST_CODE, CONTAINER_COLUMNS_ACCOUNT, CONTAINER_COLUMNS_DATA_TYPES, CONTAINER_COLUMNS_DATA_RECORDS;

let CONTROLLING_COST_CODE_PARAMETERS: DataCells, DATA_TYPES_PARAMETERS: DataCells, DATA_RECORDS_PARAMETERS: DataCells;

allure.epic("CONTROLLING");
allure.feature("Controlling Unit");
allure.story("CNT- 1.7 | Verify Create, Updated and delete functionality in Controlling Cost codes Module");

describe("CNT- 1.7 | Verify Create, Updated and delete functionality in Controlling Cost codes Module", () => {
    before(function () {
        cy.fixture("controlling/cnt-1.7-verify-create-updated-and-delete-functionality-in-controlling-cost-codes-module.json").then((data) => {
            this.data = data
            CONTAINERS_CONTROLLING_COST_CODE = this.data.CONTAINERS.CONTROLLING_COST_CODE
            CONTAINER_COLUMNS_CONTROLLING_COST_CODE = this.data.CONTAINER_COLUMNS.CONTROLLING_COST_CODE
            CONTROLLING_COST_CODE_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CONTROLLING_CC_DESC,
                [app.GridCells.CODE]: CONTROLLING_CC_CODE,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_COST_CODE.UoM
            }
            CONTAINER_ACCOUNT = this.data.CONTAINERS.ACCOUNT
            CONTAINER_COLUMNS_ACCOUNT = this.data.CONTAINER_COLUMNS.ACCOUNT
            CONTAINER_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES
            DATA_TYPES_PARAMETERS = {
                [app.GridCells.DB_TABLE_NAME]: CONTAINER_DATA_TYPES.DB_TABLE_NAME
            }
            CONTAINER_DATA_RECORDS = this.data.CONTAINERS.DATA_RECORDS
            CONTAINER_COLUMNS_DATA_RECORDS = this.data.CONTAINER_COLUMNS.DATA_RECORDS
            DATA_RECORDS_PARAMETERS = {
                [app.GridCells.DESCRIPTION_2_INFO]: DATA_RECORDS,
                [app.GridCells.CODE]: DATA_RECORDS_CODE,
                [app.GridCells.LEDGER_CONTEXT_FK]: CONTAINER_DATA_RECORDS.LEDGER_CONTEXT
            }
        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        })
    });
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add account from customising", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
        });
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, commonLocators.CommonKeys.ACCOUNTING)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_TYPES.DB_TABLE_NAME)

        _common.openTab(app.TabBar.MASTER_DATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_2_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, DATA_RECORDS)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, DATA_RECORDS_CODE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS, app.GridCells.LEDGER_CONTEXT_FK, commonLocators.CommonKeys.LIST, CONTAINER_DATA_RECORDS.LEDGER_CONTEXT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.DATA_RECORDS, app.GridCells.CODE, "ACCOUNT")
    });

    it("TC - Create and update controlling cost codes", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_COST_CODES)
        _common.openTab(app.TabBar.CONTROLLING_COST_CODES).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_COST_CODE, app.FooterTab.CONTROLLING_COST_CODE, 0);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_COST_CODE, CONTAINER_COLUMNS_CONTROLLING_COST_CODE)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_COST_CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        cy.REFRESH_CONTAINER()
        _common.create_newRecord(cnt.uuid.CONTROLLING_COST_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_COST_CODE, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTROLLING_CC_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.CONTROLLING_COST_CODE, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, CONTROLLING_CC_CODE)
        _common.edit_dropdownCellWithInput(cnt.uuid.CONTROLLING_COST_CODE, app.GridCells.UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_CONTROLLING_COST_CODE.UoM)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _validate.verify_isRecordPresent(cnt.uuid.CONTROLLING_COST_CODE, CONTROLLING_CC_DESC)
        _common.edit_containerCell(cnt.uuid.CONTROLLING_COST_CODE, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, CONTROLLING_CC_DESC_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create account to created record in account container in controlling Cost Codes module", function () {
        _common.openTab(app.TabBar.CONTROLLING_COST_CODES).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.ACCOUNT1, app.FooterTab.ACCOUNT, 1);
            _common.setup_gridLayout(cnt.uuid.ACCOUNT1, CONTAINER_COLUMNS_ACCOUNT)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACCOUNT1)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        cy.REFRESH_CONTAINER()
        _common.create_newRecord(cnt.uuid.ACCOUNT1)
        _common.edit_dropdownCellWithInput(cnt.uuid.ACCOUNT1, app.GridCells.BAS_ACCOUNT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("ACCOUNT"))
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify delete Account", function () {
        _common.openTab(app.TabBar.CONTROLLING_COST_CODES).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.ACCOUNT1, app.FooterTab.ACCOUNT, 1);
            _common.setup_gridLayout(cnt.uuid.ACCOUNT1, CONTAINER_COLUMNS_ACCOUNT)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACCOUNT1)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        cy.REFRESH_CONTAINER()
        _validate.verify_isRecordPresent(cnt.uuid.ACCOUNT1, Cypress.env("ACCOUNT"))
        _common.select_rowHasValue(cnt.uuid.ACCOUNT1, Cypress.env("ACCOUNT"))
        _common.delete_recordFromContainer(cnt.uuid.ACCOUNT1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_recordNotPresentInContainer(cnt.uuid.ACCOUNT1, Cypress.env("ACCOUNT"))
    });

    it("TC - Verify delete Controlling Cost Codes", function () {
        _common.openTab(app.TabBar.CONTROLLING_COST_CODES).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_COST_CODE, app.FooterTab.CONTROLLING_COST_CODE, 0);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_COST_CODE, CONTAINER_COLUMNS_CONTROLLING_COST_CODE)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_COST_CODE)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        cy.REFRESH_CONTAINER()
        _validate.verify_isRecordPresent(cnt.uuid.CONTROLLING_COST_CODE, CONTROLLING_CC_DESC_1)
        _common.select_rowHasValue(cnt.uuid.CONTROLLING_COST_CODE, CONTROLLING_CC_DESC_1)
        _common.delete_recordFromContainer(cnt.uuid.CONTROLLING_COST_CODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_recordNotPresentInContainer(cnt.uuid.CONTROLLING_COST_CODE, CONTROLLING_CC_DESC_1)
    });
});