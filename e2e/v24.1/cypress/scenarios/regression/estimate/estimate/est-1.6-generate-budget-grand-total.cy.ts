import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from "cypress/pages";
import { app, tile, cnt, sidebar, btn, commonLocators } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);


let CONTAINER_ESTIMATE, CONTAINER_LINE_ITEM, CONTAINER_RESOURCE;
let MODAL_GENERATE_BUDGET;
let ESTIMATE_PARAMETERS: DataCells, LINE_ITEM_PARAMETERS: DataCells, RESOURCE_PARAMETERS: DataCells, RESOURCE_PARAMETERS_2: DataCells, RESOURCE_PARAMETERS_3: DataCells;
let CONTAINER_COLUMNS_ESTIMATE, CONTAINER_COLUMNS_LINE_ITEM, CONTAINER_COLUMNS_RESOURCE;
let DJC_BUDGET_PARAMETERS: DataCells
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.6 | Generating Budget Grand Total");

describe("EST- 1.6 | Generating Budget Grand Total", () => {
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));

        cy.fixture("estimate/est-1.6.generate-budget-grand-total.json").then((data) => {
            this.data = data;

            //Define variables with container data
            CONTAINER_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
            CONTAINER_LINE_ITEM = this.data.CONTAINERS.LINE_ITEM;
            CONTAINER_RESOURCE = this.data.CONTAINERS.RESOURCE;
            MODAL_GENERATE_BUDGET = this.data.MODAL.GENERATE_BUDGET;

            //Define variables with container columns
            CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE
            CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM
            CONTAINER_COLUMNS_RESOURCE = this.data.CONTAINER_COLUMNS.RESOURCE

            //Test Data set
            ESTIMATE_PARAMETERS = {
                [app.GridCells.CODE]: ESTIMATE_CODE,
                [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
                [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINER_ESTIMATE.RUBRIC_CATEGORY,
                [app.GridCells.EST_TYPE_FK]: CONTAINER_ESTIMATE.ESTIMATE_TYPE,
            };

            LINE_ITEM_PARAMETERS = {
                [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
                [app.GridCells.QUANTITY_SMALL]: CONTAINER_LINE_ITEM.QUANTITY,
                [app.GridCells.UOM]: CONTAINER_LINE_ITEM.UOM
            };

            RESOURCE_PARAMETERS = {
                [app.GridCells.SHORT_KEY_INFO]: CONTAINER_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINER_RESOURCE.CODE[0]
            };
            RESOURCE_PARAMETERS_2 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINER_RESOURCE.SHORT_KEY[1],
            };
            RESOURCE_PARAMETERS_3 = {
                [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINER_RESOURCE.SHORT_KEY[0],
                [app.GridCells.CODE]: CONTAINER_RESOURCE.CODE[1],
            };

            DJC_BUDGET_PARAMETERS = {
                [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE,
                [commonLocators.CommonLabels.BUDGET_FROM]: MODAL_GENERATE_BUDGET.BUDGET_FROM,
                [commonLocators.CommonLabels.X_FACTOR]: MODAL_GENERATE_BUDGET.X_FACTOR,
                [commonLocators.CommonKeys.INDEX]: MODAL_GENERATE_BUDGET.ESTIMATE_SCOPE_INDEX,
                [commonLocators.CommonKeys.RADIO_INDEX]: MODAL_GENERATE_BUDGET.BUDGET_FROM_INDEX
            }

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 1);

            _common.openTab(app.TabBar.ESTIMATE).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
                _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
            });
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
            _common.create_newRecord(cnt.uuid.ESTIMATE);
            _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE, ESTIMATE_PARAMETERS);
            cy.SAVE();
            _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.ToolBar.ICO_GO_TO);
            _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
                _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
            });

            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
            _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
            _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS, LINE_ITEM_PARAMETERS);
            _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
            cy.SAVE();

            _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
                _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
                _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
            });
            _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
            _common.create_newRecord(cnt.uuid.RESOURCES);
            _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS);
            cy.SAVE();
            _common.create_newRecord(cnt.uuid.RESOURCES);
            _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_2);
            _common.waitForLoaderToDisappear();
            cy.SAVE();
            _common.waitForLoaderToDisappear();
            _common.create_newSubRecord(cnt.uuid.RESOURCES);
            _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES, RESOURCE_PARAMETERS_3);
            _common.waitForLoaderToDisappear();
            cy.SAVE();
            _common.select_allContainerData(cnt.uuid.RESOURCES)
            _common.clickOn_toolbarButton(cnt.uuid.RESOURCES, btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        });
    });

    it("TC - Generate budget from wizard and verify budget field of line item", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_BUDGET_FROM_DJC)
        _estimatePage.generate_budgetFromDJC_fromWizard(DJC_BUDGET_PARAMETERS)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.verify_BudgetForLineItem(cnt.uuid.ESTIMATE_LINEITEMS, MODAL_GENERATE_BUDGET.X_FACTOR)
    })
});
