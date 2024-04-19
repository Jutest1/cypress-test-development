import { commonLocators, app, tile, cnt, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _controllingUnit, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PR" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CONTROLLING_UNIT = "CONTROLLING-UNIT-" + Cypress._.random(0, 999);
const CONTROLLING_CC_CODE = "01" + Cypress._.random(0, 999);
const CONTROLLING_CC_DESC = "DESC-" + Cypress._.random(0, 999);
const DATA_RECORDS_CODE = "012" + Cypress._.random(0, 999);
const DATA_RECORDS = "AAB-" + Cypress._.random(0, 999);

let MODAL_PROJECTS;
let CONTAINERS_CONTROLLING_UNIT, CONTAINER_DATA_TYPES, CONTAINER_DATA_RECORDS, CONTAINERS_CONTROLLING_COST_CODE, CONTAINER_ACCOUNT, CONTAINERS_COST_HEADER, CONTAINERS_COST_DATA;
let CONTAINER_COLUMNS_CONTROLLING_UNIT, CONTAINER_COLUMNS_DATA_TYPES, CONTAINER_COLUMNS_DATA_RECORDS, CONTAINER_COLUMNS_CONTROLLING_COST_CODE, CONTAINER_COLUMNS_ACCOUNT, CONTAINER_COLUMNS_COST_HEADER, CONTAINER_COLUMNS_COST_DATA;
let PROJECTS_PARAMETERS: DataCells, CONTROLLING_UNIT_PARAMETERS: DataCells, DATA_TYPES_PARAMETERS: DataCells, DATA_RECORDS_PARAMETERS: DataCells, CONTROLLING_COST_CODE_PARAMETERS: DataCells, COST_DATA_PARAMETERS_1: DataCells;

ALLURE.epic("CONTROLLING")
ALLURE.feature("Controlling")
ALLURE.story("CNT- 1.8 | Verify Account Mapping from Customizing and Controlling Cost Code Module in Actuals module")

describe("CNT- 1.8 | Verify Account Mapping from Customizing and Controlling Cost Code Module in Actuals module", () => {
    before(function () {
        cy.fixture("controlling/cnt-1.8-verify-account-mapping-from-customizing-and-controlling-cost-code-module-in-ctuals-module.json").then((data) => {
            this.data = data;
            MODAL_PROJECTS = this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
                [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
                [commonLocators.CommonLabels.CLERK]: MODAL_PROJECTS.CLERK
            }
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
            CONTAINER_COLUMNS_CONTROLLING_UNIT = this.data.CONTAINER_COLUMNS.CONTROLLING_UNIT
            CONTAINERS_CONTROLLING_UNIT = this.data.CONTAINERS.CONTROLLING_UNIT
            CONTROLLING_UNIT_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CONTROLLING_UNIT,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNIT.QUANTITY,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNIT.UOM
            }
            CONTAINERS_CONTROLLING_COST_CODE = this.data.CONTAINERS.CONTROLLING_COST_CODE
            CONTAINER_COLUMNS_CONTROLLING_COST_CODE = this.data.CONTAINER_COLUMNS.CONTROLLING_COST_CODE
            CONTROLLING_COST_CODE_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: CONTROLLING_CC_DESC,
                [app.GridCells.CODE]: CONTROLLING_CC_CODE,
                [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_COST_CODE.UoM
            }
            CONTAINER_ACCOUNT = this.data.CONTAINERS.ACCOUNT
            CONTAINER_COLUMNS_ACCOUNT = this.data.CONTAINER_COLUMNS.ACCOUNT
            CONTAINERS_COST_HEADER = this.data.CONTAINERS.COST_HEADER
            CONTAINER_COLUMNS_COST_HEADER = this.data.CONTAINER_COLUMNS.COST_HEADER
            CONTAINERS_COST_DATA = this.data.CONTAINERS.COST_DATA
            CONTAINER_COLUMNS_COST_DATA = this.data.CONTAINER_COLUMNS.COST_DATA
            COST_DATA_PARAMETERS_1 = {
                [app.GridCells.AMOUNT_SMALL]: CONTAINERS_COST_DATA.AMOUNT[0],
                [app.GridCells.MDC_CONTR_COST_CODE_FK]: CONTAINERS_COST_DATA.CONTROLLING_COST_CODE,
                [app.GridCells.UOM_FK]: CONTAINERS_COST_DATA.UOM[0],
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_COST_DATA.QUANTITY[0],
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        });
    })
    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new project", function () {
        _common.openDesktopTile(tile.DesktopTiles.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0)
        })
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.create_newRecord(cnt.uuid.PROJECTS)
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem()
        _common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.PROJECT_NO, "ProjectNo")
    });

    it("TC - Add account record from customising", function () {
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

    it("TC - Add controlling unit to the project", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT_PROJECTS, app.FooterTab.PROJECTS, 0)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("ProjectNo"))
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2)
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNIT)
        });
        _common.waitForLoaderToDisappear()
        _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTROLLING_UNIT)
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_UNIT, app.GridCells.CODE, "CONTROLLING_UNIT")
    });

    it("TC - Create controlling cost codes", function () {
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
        _common.saveCellDataToEnv(cnt.uuid.CONTROLLING_COST_CODE, app.GridCells.CODE, "CONTROLLING_COST_CODE")
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

    it("TC - Create cost header record in actuals module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.ACTUALS)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ACTUALS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.ACTUAL_COST_HEADER, app.FooterTab.COST_HEADER, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.ACTUAL_COST_HEADER)
        _common.create_newRecord(cnt.uuid.ACTUAL_COST_HEADER)
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTUAL_COST_HEADER, app.GridCells.PROJECT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("ProjectNo"))
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.ACTUAL_COST_HEADER, Cypress.env("ProjectNo"))
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ACTUAL_COST_HEADER, app.GridCells.PROJECT_FK, Cypress.env("ProjectNo"))
        _common.select_activeRowInContainer(cnt.uuid.ACTUAL_COST_HEADER)
    });

    it("TC - Create cost data record", function () {
        _common.openTab(app.TabBar.ACTUALS).then(() => {
            _common.waitForLoaderToDisappear()
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.ACTUAL_COST_DATA, app.FooterTab.COST_DATA, 1)
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ACTUAL_COST_HEADER, app.GridCells.PROJECT_FK, Cypress.env("ProjectNo"))
        _common.create_newRecord(cnt.uuid.ACTUAL_COST_DATA)
        _common.select_activeRowInContainer(cnt.uuid.ACTUAL_COST_DATA)
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTUAL_COST_DATA, app.GridCells.MDC_CONTROLLING_UNIT_FK_SMALL, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("CONTROLLING_UNIT"))
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTUAL_COST_DATA, app.GridCells.ACCOUNT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, Cypress.env("ACCOUNT"))
        _common.edit_dropdownCellWithInput(cnt.uuid.ACTUAL_COST_DATA, app.GridCells.UOM_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_DATA.UOM[0])
        _common.enterRecord_inNewRow(cnt.uuid.ACTUAL_COST_DATA, app.GridCells.AMOUNT_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_DATA.AMOUNT[0])
        _common.enterRecord_inNewRow(cnt.uuid.ACTUAL_COST_DATA, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_DATA.QUANTITY[0])
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Update controlling cost codes from wizard and assert it in actuals module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_CONTROLLING_COST_CODES)
        _common.clickOn_modalFooterButton(btn.ButtonText.YES)
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ACTUAL_COST_HEADER, app.GridCells.PROJECT_FK, Cypress.env("ProjectNo"))
        _common.select_rowHasValue(cnt.uuid.ACTUAL_COST_DATA, Cypress.env("CONTROLLING_UNIT"))
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTUAL_COST_DATA, app.GridCells.MDC_CONTR_COST_CODE_FK, Cypress.env("CONTROLLING_COST_CODE"))
    });
});      