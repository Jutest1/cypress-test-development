import { commonLocators, tile, sidebar, app, cnt, btn } from "cypress/locators";
import { _common, _logesticPage, _validate } from "cypress/pages";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PLANT_GROUP_1 = "PLANTGROUP" + Cypress._.random(0, 999);
const PLANT_GROUP_DESC = "PLANTGROUPHEADER" + Cypress._.random(0, 999);
const SUB_A_PLANT_GROUP_1 = "SUB A" + Cypress._.random(0, 999);
const SUB_A_PLANT_GROUP_DESC = "SUB PLANTGROUPHEADER" + Cypress._.random(0, 999);
const SUB_B_PLANT_GROUP_1 = "SUB B" + Cypress._.random(0, 999);
const SUB_B_PLANT_GROUP_DESC = "SUB PLANTGROUPHEADER" + Cypress._.random(0, 999);
const SUB_C_PLANT_GROUP_1 = "SUB C" + Cypress._.random(0, 999);
const SUB_C_PLANT_GROUP_DESC = "SUB PLANTGROUPHEADER" + Cypress._.random(0, 999);
const SPECIFIC_VALUE_DESC_1 = "PERFORMANCE RECORD" + Cypress._.random(0, 999);
const SPECIFIC_VALUE_DESC_2 = "DEPRECIATION RECORD" + Cypress._.random(0, 999);
const PLANT_CODE = "PLANT_CODE" + Cypress._.random(0, 999);
const PLANT_DESC = "PLANT_NAME" + Cypress._.random(0, 999);

let CONTAINERS_PLANT_GROUP, CONTAINERS_SPECIFIC_VALUE;

let CONTAINER_COLUMNS_PLANT_GROUP, CONTAINER_COLUMNS_SPECIFIC_VALUE

let PLANTS_PARAMETERS;

let MODAL_PLANT;

ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.24 | Verify Creating Plant from Plant Group module and Generate specific value");

describe("LRM- 1.24 | Verify Creating Plant from Plant Group module and Generate specific value.cy.ts", () => {
    before(function () {
        cy.fixture("LRM/lrm-1.24-verify-creating-plant-from-plant-group-module-and-generate-specific-value.json").then((data) => {
            this.data = data;
            CONTAINERS_PLANT_GROUP = this.data.CONTAINERS.PLANT_GROUP;
            CONTAINERS_SPECIFIC_VALUE = this.data.CONTAINERS.SPECIFIC_VALUE
            CONTAINER_COLUMNS_PLANT_GROUP = this.data.CONTAINERS_COLUMNS.PLANT_GROUP;
            CONTAINER_COLUMNS_SPECIFIC_VALUE = this.data.CONTAINERS_COLUMNS.SPECIFIC_VALUE;
            MODAL_PLANT = this.data.MODAL.PLANT;
            PLANTS_PARAMETERS = {
                [commonLocators.CommonLabels.PLANT_TYPE]: MODAL_PLANT.PLANT_TYPE,
                [commonLocators.CommonLabels.PLANT_GROUP]: MODAL_PLANT.SUB_A_PLANT_GROUP_1,
                [commonLocators.CommonLabels.PLANT_KIND]: MODAL_PLANT.PLANT_KIND,
                [commonLocators.CommonLabels.DESCRIPTION]: PLANT_DESC,
                [commonLocators.CommonKeys.CODE]: PLANT_CODE,
                [commonLocators.CommonLabels.STRUCTURE]: MODAL_PLANT.STRUCTURE
            }
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    })

    it("TC - Create New Plant Group", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PLANT_GROUP)
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT_GROUP, CONTAINER_COLUMNS_PLANT_GROUP)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_allContainerData(cnt.uuid.PLANT_GROUP)
        _common.clickOn_toolbarButton(cnt.uuid.PLANT_GROUP, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, PLANT_GROUP_1)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create Sub Plant Group Record", function () {
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT_GROUP, app.FooterTab.PLANT_GROUPS, 0)
            _common.setup_gridLayout(cnt.uuid.PLANT_GROUP, CONTAINER_COLUMNS_PLANT_GROUP)
            _common.clear_subContainerFilter(cnt.uuid.PLANT_GROUP)
        })
        _common.create_newSubRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB_A_PLANT_GROUP_1)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SUB_A_PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB_B_PLANT_GROUP_1)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SUB_B_PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PLANT_GROUP)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_CODE, SUB_C_PLANT_GROUP_1)
        _common.enterRecord_inNewRow(cnt.uuid.PLANT_GROUP, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SUB_C_PLANT_GROUP_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.PLANT_GROUP, app.GridCells.RUBRIC_CATEGORY_FK, commonLocators.CommonKeys.LIST, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_PLANT_GROUP.RUBRIC_CATEGORY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP, PLANT_GROUP_DESC)
    })

    it("TC - Create New Specific Value Records ", function () {
        _common.openTab(app.TabBar.PLANT_GROUP_AND_LOCATIONS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SPECIFIC_VALUES, app.FooterTab.SPECIFIC_VALUES, 1)
            _common.setup_gridLayout(cnt.uuid.SPECIFIC_VALUES, CONTAINER_COLUMNS_SPECIFIC_VALUE)
            _common.clear_subContainerFilter(cnt.uuid.SPECIFIC_VALUES)
        })
        _common.create_newRecord(cnt.uuid.SPECIFIC_VALUES)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SPECIFIC_VALUE_DESC_1)
        _common.edit_dropdownCellWithCaret(cnt.uuid.SPECIFIC_VALUES, app.GridCells.SPECIFIC_VALUE_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_SPECIFIC_VALUE.SPECIFIC_VALUE_TYPE)
        _common.edit_dropdownCellWithCaret(cnt.uuid.SPECIFIC_VALUES, app.GridCells.UOM_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SPECIFIC_VALUE.UOM)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.VALUE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_SPECIFIC_VALUE.VALUE)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.FACTOR, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SPECIFIC_VALUE.FACTOR)
        _common.edit_dropdownCellWithInput(cnt.uuid.SPECIFIC_VALUES, app.GridCells.COST_CODE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SPECIFIC_VALUE.COST_CODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.SPECIFIC_VALUES, app.GridCells.ISINHERITED, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.SPECIFIC_VALUES)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, SPECIFIC_VALUE_DESC_2)
        _common.edit_dropdownCellWithCaret(cnt.uuid.SPECIFIC_VALUES, app.GridCells.SPECIFIC_VALUE_TYPE_FK, commonLocators.CommonKeys.LIST, CONTAINERS_SPECIFIC_VALUE.SPECIFIC_VALUE_TYPE_1)
        _common.edit_dropdownCellWithCaret(cnt.uuid.SPECIFIC_VALUES, app.GridCells.UOM_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SPECIFIC_VALUE.UOM)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.VALUE, app.InputFields.DOMAIN_TYPE_DESCRIPTION, CONTAINERS_SPECIFIC_VALUE.VALUE)
        _common.edit_containerCell(cnt.uuid.SPECIFIC_VALUES, app.GridCells.FACTOR, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SPECIFIC_VALUE.FACTOR)
        _common.edit_dropdownCellWithInput(cnt.uuid.SPECIFIC_VALUES, app.GridCells.COST_CODE_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_SPECIFIC_VALUE.COST_CODE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.SPECIFIC_VALUES, app.GridCells.ISINHERITED, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.PLANT_GROUP, SUB_A_PLANT_GROUP_1)
    })

    it("TC - Create Plant using wizard in plantgroup module ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_PLANT);
        _common.waitForLoaderToDisappear()
        _logesticPage.enterRecord_CreatePlantFromPlantGroup(PLANTS_PARAMETERS)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PLANT, app.FooterTab.PLANTS, 0)
        })
        _common.clear_subContainerFilter(cnt.uuid.PLANT)
        _common.search_inSubContainer(cnt.uuid.PLANT, PLANT_DESC)
        _common.select_rowInContainer((cnt.uuid.PLANT))

    })
    it("TC - Generate Specific Value Using Wizard Takeover group specific value ", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.TAKEOVER_GROUP_SPECIFIC_VALUE);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()

        _common.openTab(app.TabBar.PLANTS_OVERVIEW).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SPECIFIC_VALUE_PLANT_MASTER, app.FooterTab.SPECIFIC_VALUES, 1)
        })
        _common.clear_subContainerFilter(cnt.uuid.SPECIFIC_VALUE_PLANT_MASTER)
        _common.select_rowInContainer((cnt.uuid.PLANT))
        _validate.verify_isRecordPresent(cnt.uuid.SPECIFIC_VALUE_PLANT_MASTER, SPECIFIC_VALUE_DESC_1)
        _validate.verify_isRecordPresent(cnt.uuid.SPECIFIC_VALUE_PLANT_MASTER, SPECIFIC_VALUE_DESC_2)

    })
    after(() => {
        cy.LOGOUT();
    });

})