import { _common, _estimatePage, _validate } from 'cypress/pages';
import { app, tile, cnt } from 'cypress/locators';
const allure = Cypress.Allure.reporter.getInterface();

const SCH_CODE = "2" + Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const EST_CODE = "1" + Cypress._.random(0, 999);
const EST_DESC = "EST-DESC-" + Cypress._.random(0, 999);

allure.epic("ESTIMATE");
allure.feature("Estimate");
allure.story("EST- 3.1 | Update line item quantities from schedule");

describe("EST- 3.1 | Update line item quantities from schedule", () => {
  beforeEach(function () {
    cy.fixture("estimate/est-3.1-update_line_item_quantities_from_schedule.json").then((data) => {
      this.data = data;
    });
  });

  before(function () {
    cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
    cy.fixture("estimate/est-3.1-update_line_item_quantities_from_schedule.json").then((data) => {
      this.data = data;
      const standerdInputs = this.data.Prerequisites.SidebarInputes;
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    });
    /* Open desktop should be called in before block */
  });

  after(() => {
    cy.LOGOUT();
  });

  it("TC- Create Schedule Header and Activity Structure Record", function () {
    const scheduleActivityInputs = this.data.CreateScheduleHeader.ScheduleActivityInputs;
    const schedulingGrid = this.data.schedule_ColumnHeaders.column_headers
    const actStructureGrid = this.data.activityStructure_ColumnHeaders.columnHeaders
    _common.openTab(app.tabBar.scheduling).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      _common.setup_gridLayout(cnt.uuid.SCHEDULES, schedulingGrid)
    });
    _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
    _common.create_newRecord(cnt.uuid.SCHEDULES);
    _estimatePage.enterRecord_ToCreateScheduleHeader(SCH_CODE, SCH_DESC);
    cy.SAVE();
    _common.goToButton_inActiveRow(cnt.uuid.SCHEDULES, app.GridCells.CODE);
    cy.wait(2000);
    _common.openTab(app.tabBar.Planning).then(() => {
      cy.wait(1000)
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, actStructureGrid)
    });
    _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
	_estimatePage.enterRecord_toScheduleActivity(scheduleActivityInputs.description, scheduleActivityInputs.quantity, scheduleActivityInputs.uom, scheduleActivityInputs.Startdate, scheduleActivityInputs.FinishDate);
	cy.SAVE();
    cy.wait(5000)
    cy.SAVE();
    cy.wait(5000)
  });

  it("TC- Navigate to Estimate Tab and Create Estimate Header Record", function () {
    const estimateInputs = this.data.EstimatePageInputes.CreateEstimate;
    const SidebarInputs = this.data.EstimatePageInputes.SidebarInputes;
    const estimateGrid = this.data.columns.column_headers;
    const standerdInputs = this.data.Prerequisites.SidebarInputes;

    _common.openSidebarOption(SidebarInputs.quickstart).search_fromSidebar(SidebarInputs.quickstart1, SidebarInputs.project);
    cy.wait(2000)
   
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    cy.wait(2000)
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimateHeader(EST_CODE, EST_DESC, estimateInputs.rubicCategory, estimateInputs.estimateType);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
  });

  it("TC- Generate Line Item from Scheduling", function () {
    const sidebarInputs = this.data.LineItemPageInputes.SidebarInputes;
    const leadingselectionoption = this.data.leadingstructureoption.structureInput;
    const lineItemGrid = this.data.lineItem_ColumnHeaders.column_headers;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, lineItemGrid)
    });
    _estimatePage.confirm_EstimateConfiguration(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.change_EstQtyRelation_For_Schedule(leadingselectionoption.searchType,leadingselectionoption.structureType,null)
    _common.openSidebarOption(sidebarInputs.Wizard).search_fromSidebar(sidebarInputs.Wizard1, sidebarInputs.genrateLineItem);
    _estimatePage.generate_LineItemFromScheduling(SCH_DESC);
    cy.REFRESH_CONTAINER();
  });

  it("TC- Creating Progress Report History Record", function () {
    const progressReportHistoryGrid = this.data.progressReportHistory_Columns.column_headers;
    const ReportHistoorySidebarInputs = this.data.CreateHistoryInputes.SidebarInputes;
    const ReportHistooryInputs = this.data.CreateHistoryInputes.CreateHistory;
    const ReportActStructure = this.data.CreateHistoryInputes.CreateActStructure;
    const scheduleActivityInputs = this.data.CreateScheduleHeader.ScheduleActivityInputs;
    const schedulingGrid = this.data.schedule_ColumnHeaders.column_headers
    const actStructureGrid = this.data.activityStructure_ColumnHeaders.columnHeaders
    const SidebarInputs = this.data.EstimatePageInputes.SidebarInputes;
    const standerdInputs = this.data.Prerequisites.SidebarInputes;

    // _common.openSidebarOption(ReportHistoorySidebarInputs.quickstart).search_fromSidebar(ReportHistoorySidebarInputs.quickstart1, ReportHistoorySidebarInputs.schedule);
    _common.openSidebarOption(SidebarInputs.quickstart).search_fromSidebar(SidebarInputs.quickstart1, SidebarInputs.project);
    cy.wait(2000)
    _common.openTab(app.tabBar.scheduling).then(() => {
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      _common.setup_gridLayout(cnt.uuid.SCHEDULES, schedulingGrid)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    cy.wait(2000)

    _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
    _common.search_inSubContainer(cnt.uuid.SCHEDULES,SCH_CODE);
    cy.wait(5000)

    _common.goToButton_inActiveRow(cnt.uuid.SCHEDULES, app.GridCells.CODE);
    cy.wait(2000);    
    _common.openTab(app.tabBar.Planning).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
    });
   
    cy.wait(2000)

    _common.openTab(app.tabBar.Performance).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.PROGRESS_REPORT_HISTORY, progressReportHistoryGrid)
    });
  
    cy.wait(2000)
   
    _estimatePage.select_RecordFrom_ActivityStructure(ReportHistoorySidebarInputs.actStructure);
    _common.create_newRecord(cnt.uuid.PROGRESS_REPORT_HISTORY);
    _estimatePage.create_ProgressReportHistory(ReportHistooryInputs.remainingQuantity);
    cy.SAVE();
    cy.wait(5000)
    cy.SAVE();
    cy.wait(5000)
    _estimatePage.verify_remainingPercentageOf_activityStructure(ReportActStructure.remainingPercentage);
    cy.SAVE();
  });

  it("TC- Update Line Item Quantities", function () {
    const SidebarInputs = this.data.EstimatePageInputes.SidebarInputes;
    const estimateGrid = this.data.columns.column_headers;
    const standerdInputs = this.data.Prerequisites.SidebarInputes;
    const UpdateLineItemInputs = this.data.UpdateLineItemInputes.SidebarInputes;
    _common.openSidebarOption(SidebarInputs.quickstart).search_fromSidebar(SidebarInputs.quickstart1, SidebarInputs.project);
    cy.wait(2000)
   
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, estimateGrid)
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(standerdInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    cy.wait(2000)
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
    _common.search_inSubContainer(cnt.uuid.ESTIMATE,EST_CODE)
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE);
    cy.wait(2000)
    _common.openSidebarOption(UpdateLineItemInputs.Wizard).search_fromSidebar(UpdateLineItemInputs.Wizard1, UpdateLineItemInputs.updateLineitemQuantity);
    _estimatePage.updating_LineItemFromSchedule();
  });

  it("TC- Verify the Quantity in the Line Item Quantity Container", function () {
    const VerifyLineItemInputs = this.data.VerifyLineItemInputes.LineItem;
    const lineItemQtyGrid = this.data.lineItemQty_Columns.column_headers;
    _common.openTab(app.TabBar.ESTIMATELineItem).then(() => {
      _common.select_tabFromFooter(cnt.uuid.LINE_ITEM_QUANTITIES, app.FooterTab.LINE_ITEM_QUANTITY);
      cy.wait(1000)
      _common.setup_gridLayout(cnt.uuid.LINE_ITEM_QUANTITIES, lineItemQtyGrid)
    });
    cy.REFRESH_CONTAINER()
    _estimatePage.verify_LineItemQuantityFrom_Schedule(VerifyLineItemInputs.quantity);
  });
});
