import { tile, app, cnt } from "cypress/locators";
import Buttons from "cypress/locators/buttons";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage, _package } from "cypress/pages";
const allure = Cypress.Allure.reporter.getInterface();
const SCH_CODE ="SCH_CODE-" + Cypress._.random(0, 999);

allure.epic("SALES");
allure.feature("Sales-BID");
allure.story("SAM- 1.16 | Creation of sales bid in estimate module using wizard create bid & structure type activity");
describe("SAM- 1.16 | Creation of sales bid in estimate module using wizard create bid & structure type activity", () => {

    beforeEach(function () {
        cy.fixture("sam/sam-1.16-creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-&-structure-type-Activity copy.json").then((data) => {
            this.data = data
        })
    })

    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("sam/sam-1.16-creation-of-Sales-Bid-in-Estimate-Module-using-wizard-Create-bid-&-structure-type-Activity copy.json").then((data) => {
            this.data = data
            const standardInputs = this.data.Prerequisites.SidebarInputs
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
            _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });

    it("TC - Create new schedule header and activity record.", function () {
        const SchedulesInputs = this.data.CreateSchedules.SchedulesInputs;
        const ActivityStructureInputs = this.data.CreateActivityStructure.ActivityStructureInputs;
        const requireColumns = this.data.CreateSchedules.ScheduleColumnHeaders;
        const ActivityStructureColumns = this.data.CreateSchedules.ActivityStructureColumnHeaders;

        Cypress.env("SchCode", ActivityStructureInputs.ActVal + Cypress._.random(0, 999));
        Cypress.env("SchDesc", SchedulesInputs.ScheduleDesc + Cypress._.random(0, 999));
        _common.openTab(app.tabBar.scheduling).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES, requireColumns)
        });
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(Cypress.env("SchDesc"),SCH_CODE);
        cy.SAVE();
        _common.goToButton_inActiveRow(cnt.uuid.SCHEDULES, app.GridCells.CODE);
        cy.wait(10000)
        _common.openTab(app.tabBar.Planning).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 2);
            _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, ActivityStructureColumns)
        });
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        cy.SAVE()
        _schedulePage.enterRecord_toCreateActivityStructure(ActivityStructureInputs.description,ActivityStructureInputs.quantity,ActivityStructureInputs.uom);
        _mainView
            .findModuleClientArea()
            .findAndShowContainer(cnt.uuid.ACTIVITY_STRUCTURE)
            .findGrid()
            .findActiveRow()
            .findCell(app.GridCells.CODE)
            .typeIn(Cypress.env("SchCode"));
        cy.SAVE();

    });

    it("TC - Create new estimate header record", function () {
        const estimateInputs = this.data.Estimate.EstimateHeaderInputs
        const sidebarInputs = this.data.SidebarOptions.SidebarInputs
        const requireColumns = this.data.Estimate.ColumnHeaders;
        const standardInputs = this.data.Prerequisites.SidebarInputs

        _common.openSidebarOption(sidebarInputs.Quickstart)
        _common.search_fromSidebar(sidebarInputs.Qckstrttype, sidebarInputs.project);
        _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
         _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.ESTIMATE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
            _common.setup_gridLayout(cnt.uuid.ESTIMATE, requireColumns)
        });
        _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
        _common.create_newRecord(cnt.uuid.ESTIMATE);
        _estimatePage.enterRecord_toCreateEstimateHeader(estimateInputs.code, estimateInputs.description, estimateInputs.rubricCategory, estimateInputs.estimateType);
        cy.SAVE();
        _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    });

    it("TC - Generate line item and assign activity to it", function () {
        const SidebarInputs = this.data.VerifygeneratelineItem.SidebarInputs
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
        });
        _common.openSidebarOption(SidebarInputs.wizard1)
        _common.search_fromSidebar(SidebarInputs.wizard2, SidebarInputs.GenerateLineItem)
        _boqPage.generate_LineItemBycode(Cypress.env("SchDesc"))
        cy.SAVE()
    });

    it("TC - Verify assign resource to line item", function () {
        const resourceInputs = this.data.AssignResources.resourceInputs
        const resourcesGrid = this.data.AssignResources.column_headers;
        const ResourceData = this.data.AssignResources.Footers;
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 3);
        _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
            _common.select_tabFromFooter(cnt.uuid.RESOURCES, ResourceData.FootersTab, 3);
            _common.setup_gridLayout(cnt.uuid.RESOURCES, resourcesGrid)
        })
        _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
        _common.create_newRecord(cnt.uuid.RESOURCES);
        _estimatePage.enterRecord_toCreateResource(resourceInputs.shortKey, resourceInputs.code);
        cy.SAVE();
    });
    it("TC -Generate budget from wizard and verify budget field of line item", function () {

        const SidebarInputs = this.data.VerifygeneratelineItem.SidebarInputs
        const GenrateBudgetInput = this.data.VerifygeneratelineItem.GenrateBudgetInput
        _common.openSidebarOption(SidebarInputs.wizard1)
        _common.search_fromSidebar(SidebarInputs.wizard2, SidebarInputs.GenrateBudget)
        _package.generate_BudgetForLineItem(GenrateBudgetInput.X_Factor)

    })
    it("TC - Create new sales bid", function () {
        const bidInputs = this.data.BidCreation.bidInputs
        const standerdInputs = this.data.Prerequisites.SidebarInputs
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(standerdInputs.Wizard, standerdInputs.CreateBid);
        _estimatePage.enterRecord_toCreate_BID_from_Wizard(bidInputs.description, bidInputs.businessPartner);
        _modalView.findModal().acceptButton(Buttons.buttonText.Previous);
        _modalView.findModal().acceptButton(btn.ButtonText.NEXT);
        _bidPage.select_structure_type(bidInputs.sourceLead);
        _bidPage.uncheck_checkbox(bidInputs.structure_checkbox);
        _modalView.findModal().acceptButton(Buttons.buttonText.Execute);
        cy.wait(10000)
        _modalView.acceptButton("Go to Bid")
        cy.wait(10000)
    });

    it("TC - Verify net amount and BoQ structure quantity", function () {
        const ActivityStructureInputs = this.data.CreateActivityStructure.ActivityStructureInputs;
        const BoQBid = this.data.BoQStructureBID.ColumnHeaders;
        _common.openTab(app.TabBar.BID).then(() => {
            _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
        });
        _bidPage.verifying_Bid_Net_Amount()
        cy.wait(10000)
        _common.openTab(app.tabBar.bidBoQ).then(() => {
          _common.select_tabFromFooter(cnt.uuid.bidBoQs, app.FooterTab.BOQs, 0);
        });
    
        _common.clickOn_cellHasUniqueValue(cnt.uuid.BIDBOQSTRUCTURE,app.GridCells.BOQ_LINE_TYPE_FK,"Position")
        _package.assert_cellData_insideActiveRow(cnt.uuid.BIDBOQSTRUCTURE, app.GridCells.QUANTITY_SMALL, (ActivityStructureInputs.quantity))

    });

    after(() => {
        cy.LOGOUT();
    });
});
