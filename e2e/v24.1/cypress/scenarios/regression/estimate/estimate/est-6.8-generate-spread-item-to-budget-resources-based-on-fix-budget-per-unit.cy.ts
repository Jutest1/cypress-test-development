import { tile, sidebar, app, cnt, btn, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const EST_CODE = '1' + Cypress._.random(0, 999);
const EST_DESC = 'EST-DESC-' + Cypress._.random(0, 999);
const LI_DESC = 'LI_DESC-' + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS: DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let RESOURCE1_PARAMETERS: DataCells;
let RESOURCE2_PARAMETERS: DataCells;
let SPREAD_BUDGET_WIZARD;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 6.8 | Generate spread item to budget resource based on fix budget/unit")

describe("EST- 6.8 | Generate spread item to budget resource based on fix budget/unit", () => {

    before(function () {

        cy.fixture("estimate/est-6.8-generate-spread-item-to-budget-resources-based-on-fix-budget-per-unit.json").then((data) => {
            this.data = data
            CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: EST_CODE,
                [app.GridCells.DESCRIPTION_INFO]: EST_DESC,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
            }
            CONTAINERS_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LI_DESC,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
                [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
            };
            CONTAINERS_RESOURCE = this.data.CONTAINERS.RESOURCE
            SPREAD_BUDGET_WIZARD = this.data.MODAL.SPREAD_ITEM_BUDGET_WIZARD
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE1_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY_1
            };
            RESOURCE2_PARAMETERS = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
                [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_2,
                [app.GridCells.QUANTITY_SMALL]: CONTAINERS_RESOURCE.QUANTITY_2
            };

            cy.preLoading(
                Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName")
            );

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        })
    });

    it('TC - Create new estimate', function () {
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
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
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE1_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.RESOURCES)
        _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE2_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });

    it('TC - Verify spread budget in resources', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.budgetunit, CONTAINER_COLUMNS_LINE_ITEM.isfixedbudgetunit, CONTAINER_COLUMNS_LINE_ITEM.budget, CONTAINER_COLUMNS_LINE_ITEM.isfixedbudget], cnt.uuid.ESTIMATE_LINEITEMS)
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.IS_FIXED_BUDGET, commonLocators.CommonKeys.CHECK)
        _common.enterRecord_inNewRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LINE_ITEM.BUDGET_VALUE)
        cy.SAVE()
        _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.IS_FIXED_BUDGET_UNIT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.IS_FIXED_BUDGET, commonLocators.CommonKeys.UNCHECK)
        _common.set_cellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.IS_FIXED_BUDGET, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.IS_FIXED_BUDGET_UNIT, commonLocators.CommonKeys.UNCHECK)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.SPREAD_ITEM_BUDGET_TO_RESOURCES)
        _common.findRadio_byLabel_fromModal(SPREAD_BUDGET_WIZARD.ESTIMATE_SCOPE, commonLocators.CommonKeys.RADIO, SPREAD_BUDGET_WIZARD.INDEX, commonLocators.CommonElements.RADIO1)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.budgetunit, CONTAINER_COLUMNS_RESOURCE.isfixedbudgetunit, CONTAINER_COLUMNS_RESOURCE.budget, CONTAINER_COLUMNS_RESOURCE.isfixedbudget], cnt.uuid.RESOURCES)
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.perform_additionOfCellData(cnt.uuid.RESOURCES, app.GridCells.BUDGET)
        _common.minimizeContainer(cnt.uuid.RESOURCES)
    });

    it('TC - Verify Budget of resources in Line item ', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET, Cypress.env("AdditionOfColumnValues").toFixed(2))
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_RESOURCE.CODE_1)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.BUDGET).then(($value) => {
            Cypress.env("BudgetRes1", $value.text())
            cy.log("Budget_Res1=> " + Cypress.env("BudgetRes1"))
        })
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_RESOURCE.CODE_2)
        _common.getText_fromCell(cnt.uuid.RESOURCES, app.GridCells.BUDGET_UNIT).then(($value) => {
            Cypress.env("BudgetUnit", $value.text())
            cy.log("Budget_Unit=> " + Cypress.env("BudgetUnit"))
        })
    })

    it('TC - Verify Budget and budget/unit with Fix budget and fix budget/unit checkbox', function () {
        _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        });
        _common.maximizeContainer(cnt.uuid.RESOURCES)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_RESOURCE.CODE_1)
        _common.set_cellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_FIXED_BUDGET, commonLocators.CommonKeys.CHECK)
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.QUANTITY_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDivisionOfTwoValuesAnd_ComapreWithThirdValue(cnt.uuid.RESOURCES, Cypress.env("BudgetRes1"), CONTAINERS_RESOURCE.QUANTITY_3, app.GridCells.BUDGET_UNIT)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.RESOURCES, app.GridCells.CODE, CONTAINERS_RESOURCE.CODE_2)
        _common.set_cellCheckboxValue(cnt.uuid.RESOURCES, app.GridCells.IS_FIXED_BUDGET_UNIT, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.enterRecord_inNewRow(cnt.uuid.RESOURCES, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_RESOURCE.QUANTITY_4)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _validate.verify_FractionalProductofTwo_AndCompareWithThirdValue(cnt.uuid.RESOURCES, Cypress.env("BudgetUnit"), CONTAINERS_RESOURCE.QUANTITY_4, app.GridCells.BUDGET)
    })

    after(() => {
        cy.LOGOUT();
    });

})
