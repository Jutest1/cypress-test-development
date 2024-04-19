import { tile, app, cnt, btn } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView, _boqPage, _validate } from "cypress/pages";


const allure = Cypress.Allure.reporter.getInterface();
const BUDGET_LINE_ITEM = "BUDGET_LINE_ITEM";
const contractCode = "contractCode";
allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 3.7 | Update Project BoQ budget");
describe("EST- 3.7 | Update Project BoQ budget", () => {
    beforeEach(function () {
        cy.fixture("estimate/est-3.7-Update-Projec-BoQ-budget.json").then((data) => {
            this.data = data;
        });
    });
    before(function () {
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        cy.fixture("estimate/est-3.7-Update-Projec-BoQ-budget.json").then((data) => {
            this.data = data;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            const standerdInputs = this.data.Prerequisites.SidebarInputes;
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, standerdInputs.projectName).pinnedItem();
        });
    });
        
    after(() => {
            cy.LOGOUT();
    });

    it("TC - Open Contract Sales module", function () {
        const stanerdquickSearch = this.data.Prerequisites.SidebarInputes;
        const boqStructureColumn = this.data.CreateNewBoQStructure.Column_header;
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(stanerdquickSearch.quickStartWindow, stanerdquickSearch.Contract_Sales);
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 2);
            cy.REFRESH_CONTAINER()
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTACTS)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTACTS, app.gridCells.CONTRACT_SALE_STATUS, stanerdquickSearch.In_Progress)
        _common.saveCellDataToEnv(cnt.uuid.CONTACTS, app.GridCells.CODE, contractCode)
        _common.openTab(app.tabBar.contractBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.contractSales_BoQs, app.FooterTab.BOQS, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, boqStructureColumn)
        });
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE1, app.SubContainerLayout.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.BUDGET_TOTAL, "0.00")
    })
    it('TC - Change Contract Status', function () {
        const sidebar = this.data.Prerequisites.SidebarInputes;
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 2);
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTACTS, app.GridCells.CODE, Cypress.env("contractCode"))
        _common.openSidebarOption(sidebar.Wizard);
        _common.search_fromSidebar(sidebar.wizard, sidebar.ChangeContractStatus);
        _common.changeStatus_fromModal(sidebar.Contracted);
        cy.SAVE();
    })
    it("TC - verify Navigate to Bid Module", function () {
        cy.wait(1000)
        _common.maximizeContainer(cnt.uuid.CONTACTS)
        _common.clickGotoButtonToolBarAndSelectModule(cnt.uuid.CONTACTS, "Bid(1)")
        cy.wait(4000);
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
        });
        _common.select_rowInContainer(cnt.uuid.BIDS)
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BidDetails, app.FooterTab.BILLDETAILS, 1);
        });
        _mainView.findButtonWithTitle("Go To estimate").clickIn()
    })
    it("TC - Generate Budget from DJC", function () {
        const sidebar = this.data.Prerequisites.SidebarInputes;
        const budgetInput = this.data.GenerateBudget.BudgetInputs;
        const LineitemColumn = this.data.lineItem_ColumnHeaders.column_headers;
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LineitemColumn)
            cy.REFRESH_CONTAINER()
        });
        cy.wait(3000)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET, "0.00")
        _common.openSidebarOption(sidebar.Wizard);
        _common.search_fromSidebar(sidebar.wizard, sidebar.GenrateBudget);
        _estimatePage.generate_BudgetForLineItem(budgetInput.XFactor, budgetInput.EstimateScope, budgetInput.EstimateScopeIndex, budgetInput.BugetFrom, budgetInput.BugetFromIndex)
        cy.SAVE()
    })
    it("TC - Update Project BoQ budget", function () {
        const sidebar = this.data.Prerequisites.SidebarInputes;
        const LineitemColumn = this.data.lineItem_ColumnHeaders.column_headers;
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, LineitemColumn)
        });
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.openSidebarOption(sidebar.Wizard);
        _common.search_fromSidebar(sidebar.wizard, sidebar.UpdateProjectBoQBudget);
        _validate.validate_Text_message_In_PopUp("The Project and Contract BoQ(s) Budget updated successfully!")
        _modalView.findModal().acceptButton(btn.ButtonText.OK);
        cy.REFRESH_CONTAINER()
        cy.wait(3000)
        _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
        _common.saveCellDataToEnv(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.BUDGET, BUDGET_LINE_ITEM)
        cy.SAVE()
    })
    it("TC - Verify budget total of LI and Contract sale Boq", function () {
        const stanerdquickSearch = this.data.Prerequisites.SidebarInputes;
        const boqStructureColumn = this.data.CreateNewBoQStructure.Column_header;

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(stanerdquickSearch.quickStartWindow, stanerdquickSearch.Contract_Sales);
        _common.openTab(app.TabBar.CONTRACTS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTACTS, app.FooterTab.CONTRACTS, 2);
            cy.REFRESH_CONTAINER()
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTACTS, app.GridCells.CODE, Cypress.env("contractCode"))
        _common.openTab(app.tabBar.contractBOQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.contractSales_BoQs, app.FooterTab.BOQS, 0);
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURE1, app.FooterTab.BOQ_STRUCTURE, 0);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURE1, boqStructureColumn)
        });
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURE1, app.SubContainerLayout.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _common.assert_cellData_by_contain(cnt.uuid.BOQ_STRUCTURE1, app.GridCells.BUDGET_TOTAL, Cypress.env("BUDGET_LINE_ITEM"))
        cy.SAVE()
    })
    it("TC - Verify budget total of Boq Structure", function () {
        const stanerdquickSearch = this.data.Prerequisites.SidebarInputes;
        const boqStructureColumn = this.data.CreateNewBoQStructure.Column_header;
        const BoQInputs = this.data.CreateNewBoQ.BoQInputs;
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(stanerdquickSearch.quickStartWindow, stanerdquickSearch.Project);
        cy.wait(3000)
        cy.REFRESH_CONTAINER()
        _common.select_rowInContainer(cnt.uuid.Projects)
        _common.openTab(app.tabBar.BoQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.BOQS);
        _common.search_inSubContainer(cnt.uuid.BOQS, BoQInputs.outline_Specification)
        cy.wait(2000)
        _common.select_rowInContainer(cnt.uuid.BOQS)
        _common.clickOn_toolbarButton(cnt.uuid.BOQS);
        cy.wait(5000)
        _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, boqStructureColumn)
        });
        cy.REFRESH_CONTAINER()
        _common.clickOn_cellHasIcon(cnt.uuid.BOQ_STRUCTURES, app.SubContainerLayout.TREE, app.GridCellIcons.ICO_BOQ_ITEM)
        _validate.set_ColumnAtTop([boqStructureColumn.budgettotal],cnt.uuid.BOQ_STRUCTURES)
        _common.assert_cellData_by_contain(cnt.uuid.BOQ_STRUCTURES, app.GridCells.BUDGET_TOTAL, Cypress.env("BUDGET_LINE_ITEM"))
    })
});
