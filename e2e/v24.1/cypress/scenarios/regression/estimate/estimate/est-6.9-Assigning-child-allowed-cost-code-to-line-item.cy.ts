import { tile, cnt, app, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const LI_DESC = 'LI_DESC-' + Cypress._.random(0, 999);
const NEW_CODE = 'A0-' + Cypress._.random(0, 999);
const NEW_CODE2 = '2109-' + Cypress._.random(0, 99);

let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_COST_CODES
let CONTAINERS_COST_CODES
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_LINE_ITEM;
let LINE_ITEM_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_RESOURCES;
let RESOURCE1_PARAMETER: DataCells;
let RESOURCE2_PARAMETER: DataCells;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 6.9 | Assigning child allowed cost codes to line item")

describe("EST- 6.9 | Assigning child allowed cost codes to line item", () => {

    before(function () {

        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("estimate/est-6.9-Assigning-child-allowed-cost-codes-to-line-item.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_COST_CODES = this.data.CONTAINER_COLUMNS.COST_CODES;
            CONTAINERS_COST_CODES = this.data.CONTAINERS.COST_CODES;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            };
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LI_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
            CONTAINER_COLUMNS_RESOURCES = this.data.CONTAINER_COLUMNS.RESOURCES;
            RESOURCE1_PARAMETER = {
                [commonLocators.CommonLabels.COSTCODES]: CONTAINERS_COST_CODES.CODE_1,
                [commonLocators.CommonKeys.CODE]: NEW_CODE
            };
            RESOURCE2_PARAMETER = {
                [commonLocators.CommonLabels.COSTCODES]: CONTAINERS_COST_CODES.CODE_2,
                [commonLocators.CommonLabels.UOM]: CONTAINERS_COST_CODES.UOM,
                [commonLocators.CommonKeys.CODE]: NEW_CODE2
            };

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });

    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Precondition: Check the checkbox of child allowed for parent cost code in cost codes module", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COST_CODES);
        _common.openTab(app.TabBar.COST_CODES).then(() => {
            _common.select_tabFromFooter(cnt.uuid.COST_CODES, app.FooterTab.COSTCODES, 0);
            _common.setup_gridLayout(cnt.uuid.COST_CODES, CONTAINER_COLUMNS_COST_CODES)
        });
        _common.set_columnAtTop([CONTAINER_COLUMNS_COST_CODES.isprojectchildallowed, CONTAINER_COLUMNS_COST_CODES.uomfk], cnt.uuid.COST_CODES)
        _common.maximizeContainer(cnt.uuid.COST_CODES)
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.CODE_1)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_COST_CODES.CODE_1)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.COSTCODECHILDALLOWED, CONTAINERS_COST_CODES.CHECKBOX_STATUS)
        _common.getText_fromCell(cnt.uuid.COST_CODES, app.GridCells.UOM_FK).then(($value) => {
            Cypress.env("COSTCODEUOM", $value.text())
        })
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.COST_CODES)
        _common.search_inSubContainer(cnt.uuid.COST_CODES, CONTAINERS_COST_CODES.CODE_2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_COST_CODES.CODE_2)
        _common.clickOn_cellInSubContainer(cnt.uuid.COST_CODES, app.GridCells.UOM_FK)
        _common.lookUpButtonInCell(cnt.uuid.COST_CODES, app.GridCells.UOM_FK, btn.IconButtons.ICO_INPUT_DELETE, 0)
        _common.set_cellCheckboxValue(cnt.uuid.COST_CODES, app.GridCells.COSTCODECHILDALLOWED, CONTAINERS_COST_CODES.CHECKBOX_STATUS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.COST_CODES, app.GridCells.CODE, CONTAINERS_COST_CODES.CODE_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.COST_CODES)
    });

    it('TC - Create new estimate', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 1);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE)
        _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
        _common.waitForLoaderToDisappear()
    });

    it('TC - Create new line item with quantity', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
        _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it('TC - Assign resource to the line item', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCES)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _common.lookUpButtonInCell(cnt.uuid.RESOURCES, app.GridCells.CODE, btn.IconButtons.ICO_INPUT_LOOKUP, 0)
        _estimatePage.enterRecord_toCreateCostCodeChildRecord(RESOURCE1_PARAMETER)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.REFRESH)
        _common.select_cellHasValueWithIndexBySearch_fromModal(CONTAINERS_COST_CODES.LABLE, NEW_CODE, app.GridCells.CODE_CAPS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _common.lookUpButtonInCell(cnt.uuid.RESOURCES, app.GridCells.CODE, btn.IconButtons.ICO_INPUT_LOOKUP, 0)
        _estimatePage.enterRecord_toCreateCostCodeChildRecord(RESOURCE2_PARAMETER)
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(btn.ButtonText.REFRESH)
        _common.select_cellHasValueWithIndexBySearch_fromModal(CONTAINERS_COST_CODES.LABLE, NEW_CODE2, app.GridCells.CODE_CAPS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });

    it('TC - Verify new cost codes created and Uom added for sencond one', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.search_inSubContainer(cnt.uuid.RESOURCES, NEW_CODE)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.CODE, NEW_CODE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.BAS_UOM_FK, Cypress.env("COSTCODEUOM"))
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.search_inSubContainer(cnt.uuid.RESOURCES, NEW_CODE2)
        _common.select_rowInContainer(cnt.uuid.RESOURCES)
        _common.assert_cellData_insideActiveRow(cnt.uuid.RESOURCES, app.GridCells.BAS_UOM_FK, CONTAINERS_COST_CODES.UOM)
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });

});
