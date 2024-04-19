import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView } from "cypress/pages";
import { app, tile, cnt } from "cypress/locators";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);
const LINE_ITEM_DESC = "LINE-ITEM-DESC-" + Cypress._.random(0, 999);

// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 1.6 | Generating Budget Grand Total");

describe("EST- 1.6 | Generating Budget Grand Total", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-1.6.generate-budget-grand-total.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));

        cy.fixture("estimate/est-1.6.generate-budget-grand-total.json").then((data) => {
            this.data = data;
            const standerdInputs = this.data.Prerequisites.SidebarInputes;
            const estimateInputs = this.data.Prerequisites.EstimatePageInputes;
            const lineItemInput = this.data.CreateNewLineItemRecord.LineItemsInputs;
            const CostcodeInput = this.data.CreateNewResource.CostCodeResourceInput;
            const estimateGrid = this.data.estimate_ColumnHeaders.column_headers;
            const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers;
            const resourcesGrid = this.data.resources_ColumnHeaders.column_headers;

            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
            _common.openTab(app.TabBar.ESTIMATE).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
                _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
            });
            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
            _common.create_newRecord(cnt.uuid.ESTIMATE);
            _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.CreateEstimate.rubicCategory, estimateInputs.CreateEstimate.estimateType);
            cy.SAVE();
            _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
            _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 3);
                _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
            });

            _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
            _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
            _estimatePage.enterRecord_toCreateLineItem(LINE_ITEM_DESC, lineItemInput.quantity, lineItemInput.uom);
            _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
            cy.SAVE();

            _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
                _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
                _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
            });
            _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
            _common.create_newRecord(cnt.uuid.RESOURCES);
            _estimatePage.enterRecord_toCreateResource(CostcodeInput.ShortKey, CostcodeInput.Code);
            cy.SAVE();
            _common.search_inSubContainer(cnt.uuid.RESOURCES, CostcodeInput.Code);
        });
    });

    it("TC -Generate budget from wizard and verify budget field of line item", function () {
        const budgetInput = this.data.GenerateBudget.BudgetInputs;
        _common.openSidebarOption(budgetInput.wizard1)
        _common.search_fromSidebar(budgetInput.wizard2, budgetInput.GenerateBudget)
        _estimatePage.generate_BudgetForLineItem(budgetInput.XFactor,budgetInput.EstimateScope,budgetInput.EstimateScopeIndex,budgetInput.BugetFrom,budgetInput.BugetFromIndex)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS);
        _estimatePage.verify_BudgetForLineItem(cnt.uuid.ESTIMATE_LINEITEMS, budgetInput.XFactor)
    })
});
