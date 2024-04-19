import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _projectPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface()
const PRJ_NO = "PROJ" + Cypress._.random(0, 999);
const PRJ_NAME = "PRJ-DESC-" + Cypress._.random(0, 999);
const EST_CODE = "EST-" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC" + Cypress._.random(0, 999);
const LINEITEM_DESC = "LI-orignal" + Cypress._.random(0, 999);
const REFERENCE_LINEITEM_DESC = "REF_LI" + Cypress._.random(0, 999);

let PROJECT_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_COST_CODES;
let CONTAINERS_COST_CODES;
let CONTAINERS_MATERIAL_RECORDS;
let CONTAINER_COLUMNS_MATERIAL_RECORDS;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE1_PARAMETERS: DataCells;

let RESOURCE_SUB_PARAMETERS
let CONTAINER_COLUMNS_ESTIMATE_LINE_ITEM;
let CONTAINER_COLUMNS_ESTIMATE_RESOURCE;
const CLERK_NAME="SmiJ"

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 4.18 | Reference line item for CO2 attributes")
describe("EST- 4.18 | Reference line item for CO2 attributes", () => {

    before(function () {
        cy.fixture("estimate/est-4.18-Reference-line-item-for-CO2-attributes.json").then((data) => {
            this.data = data

            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            };
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES;
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
            CONTAINERS_MATERIAL_RECORDS = this.data.CONTAINERS.MATERIAL_RECORDS;
            CONTAINER_COLUMNS_MATERIAL_RECORDS = this.data.CONTAINER_COLUMNS.MATERIAL_RECORDS;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE;
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE1_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_S,
            };
            RESOURCE_SUB_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_C,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
            };

        }).then(() => {
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Add CO2 project value to record in cost code', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
            _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.co2project, CONTAINER_COLUMNS_COST_CODES.descriptioninfo], cnt.uuid.COST_CODES)
        });
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE1)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE1)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CostCode1_CO2_Value", $ele1.text())
            cy.log(Cypress.env("CostCode1_CO2_Value"))
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE2)
        _common.edit_containerCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.CO2_PROJECT_VALUE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.DESCRIPTION_INFO, CONTAINERS_COST_CODES.COST_CODE2)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.CO2_PROJECT).then(($ele1: JQuery<HTMLElement>) => {
            Cypress.env("CostCode2_CO2_Value", $ele1.text())
            cy.log(Cypress.env("CostCode2_CO2_Value"))
        })
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new project and estimate header", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()

        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        cy.wait(1000) // Added this wait modal takes time to load
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _common.waitForLoaderToDisappear()

        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()

        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new line item record", function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, LINEITEM_DESC)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 9);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.co2project, CONTAINER_COLUMNS_RESOURCE.estresourcetypeshortkey], cnt.uuid.RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_SUB_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _common.waitForLoaderToDisappear()
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE1_PARAMETERS);
        _common.waitForLoaderToDisappear()
        _common.create_newSubRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_SUB_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.select_rowHasValue(cnt.uuid.RESOURCES,CONTAINERS_RESOURCE.SHORT_KEY_C)
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create Reference Line item and verify CO2 attribute', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS, btn.ToolBar.ICO_COPY_LINE_ITEM_REF)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.edit_containerCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION,REFERENCE_LINEITEM_DESC)
        cy.SAVE()
        cy.wait(1000)
        _common.clickOn_activeRowCell(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL, CONTAINERS_COST_CODES.CO2_PROJECT_TOTAL)
    })

    it('TC - Verify updated CO2 attribute from resource record gets updated in Reference line item record', function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINEITEM_DESC)
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        });
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.CO2_PROJECT, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_COST_CODES.UPDATED_CO2_PROJECT_VALUE1)
        cy.SAVE()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, LINEITEM_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL, CONTAINERS_COST_CODES.UPDATED_CO2_PROJECT_VALUE2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.DESCRIPTION_INFO, REFERENCE_LINEITEM_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.CO2_PROJECT_TOTAL, CONTAINERS_COST_CODES.UPDATED_CO2_PROJECT_VALUE2)
        _common.waitForLoaderToDisappear()
    })
})