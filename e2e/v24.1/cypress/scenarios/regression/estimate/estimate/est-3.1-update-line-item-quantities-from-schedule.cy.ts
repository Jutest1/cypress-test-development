import { _common, _estimatePage, _schedulePage, _validate } from 'cypress/pages';
import { app, tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACT_DESC = "SADES-" + Cypress._.random(0, 999);
const SCH_CODE = "ACT-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let SCH_PARAMETERS:DataCells
let CONTAINER_COLUMNS_SCHEDULING
let CONTAINERS_SCHEDULING_ACTIVITY
let CONTAINER_COLUMNS_SCHEDULING_ACTIVITY
let PLANNED_START
let PLANNED_FINISH
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINERS_PROGRESS_REPORT_HISTORY
let CONTAINER_COLUMNS_PROGRESS_REPORT_HISTORY
let MODAL_UPDATE_LINE_ITEM_QUANTITIES
let MODAL_UPDATE_LINE_ITEM_QUANTITIES_PARAMETERS
let CONTAINER_COLUMNS_LINE_ITEM_QUANTITY

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.1 | Update line item quantities from schedule");

describe("EST- 3.1 | Update line item quantities from schedule", () => {

  before(function () {
    cy.fixture("estimate/est-3.1-update_line_item_quantities_from_schedule.json")
      .then((data) => {
        this.data = data;
        SCH_PARAMETERS={
          [app.GridCells.CODE]:SCH_CODE,
          [app.GridCells.DESCRIPTION_INFO]:SCH_DESC
        }
        CONTAINER_COLUMNS_SCHEDULING=this.data.CONTAINER_COLUMNS.SCHEDULING
        CONTAINERS_SCHEDULING_ACTIVITY=this.data.CONTAINERS.SCHEDULING_ACTIVITY
        CONTAINER_COLUMNS_SCHEDULING_ACTIVITY=this.data.CONTAINER_COLUMNS.SCHEDULING_ACTIVITY
        PLANNED_START=_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
        PLANNED_FINISH=_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,CONTAINERS_SCHEDULING_ACTIVITY.NO_OF_DAYS)
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
			  CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE
        }
        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        GENERATE_LINE_ITEMS_PARAMETERS={
          [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:SCH_DESC                
        }
        CONTAINERS_PROGRESS_REPORT_HISTORY=this.data.CONTAINERS.PROGRESS_REPORT_HISTORY
        CONTAINER_COLUMNS_PROGRESS_REPORT_HISTORY=this.data.CONTAINER_COLUMNS.PROGRESS_REPORT_HISTORY
        MODAL_UPDATE_LINE_ITEM_QUANTITIES=this.data.MODAL.UPDATE_LINE_ITEM_QUANTITIES
        MODAL_UPDATE_LINE_ITEM_QUANTITIES_PARAMETERS={
          [commonLocators.CommonLabels.TYPE]:[commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE,commonLocators.CommonLabels.UPDATED_PLANNED_QUANTITY,commonLocators.CommonLabels.IQ_QUANTITY_UPDATE],
          [commonLocators.CommonLabels.SELECT_ESTIMATE_SCOPE]:MODAL_UPDATE_LINE_ITEM_QUANTITIES.SELECT_ESTIMATE_SCOPE,
          [commonLocators.CommonLabels.UPDATED_PLANNED_QUANTITY]:MODAL_UPDATE_LINE_ITEM_QUANTITIES.UPDATED_PLANNED_QUANTITY,
          [commonLocators.CommonLabels.IQ_QUANTITY_UPDATE]:MODAL_UPDATE_LINE_ITEM_QUANTITIES.IQ_QUANTITY_UPDATE
        }
        CONTAINER_COLUMNS_LINE_ITEM_QUANTITY=this.data.CONTAINER_COLUMNS.LINE_ITEM_QUANTITY
      }).then(()=>{
          cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
          _common.openDesktopTile(tile.DesktopTiles.PROJECT);
          _common.waitForLoaderToDisappear()
          _common.openTab(app.TabBar.PROJECT).then(() => {
              _common.setDefaultView(app.TabBar.PROJECT)
              _common.waitForLoaderToDisappear()
              _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
          });
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    })
  });

  after(() => {
    cy.LOGOUT();
  });

  it('TC - Create new schedule header and activity structure', function () {

      _common.openTab(app.TabBar.SCHEDULING).then(() => {
          _common.setDefaultView(app.TabBar.SCHEDULING)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
          _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULING)
      });
      _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
      _common.create_newRecord(cnt.uuid.SCHEDULES)
      _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCH_PARAMETERS)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.PLANNING).then(() => {
          _common.waitForLoaderToDisappear()
          _common.setDefaultView(app.TabBar.PLANNING,commonLocators.CommonKeys.DEFAULT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
          _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_SCHEDULING_ACTIVITY)
      });
      _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ACT_DESC, CONTAINERS_SCHEDULING_ACTIVITY.QUANTITY, CONTAINERS_SCHEDULING_ACTIVITY.UOM,PLANNED_START,PLANNED_FINISH)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
  })

  it('TC - Create new estimate record', function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
          _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
          _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
      });
      _common.select_rowHasValue(cnt.uuid.PROJECTS,Cypress.env('PROJECT_NUMBER'))
    
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.setDefaultView(app.TabBar.ESTIMATE)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 2);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
      _common.create_newRecord(cnt.uuid.ESTIMATE);
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
  });

  it("TC - Generate scheduling line item", function () {
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
          _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
      _common.waitForLoaderToDisappear()
      _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      });
      _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,SCH_ACT_DESC)
  });
  

  it("TC - Creating progress report history record", function () {
    
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		  _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);

      _common.openTab(app.TabBar.SCHEDULING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      });
      _common.waitForLoaderToDisappear()
		
      _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();

      _common.openTab(app.TabBar.SCHEDULING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      });
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
      _common.search_inSubContainer(cnt.uuid.SCHEDULES, SCH_DESC)
      _common.select_rowHasValue(cnt.uuid.SCHEDULES, SCH_DESC)
      _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO)
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
      });

      _common.openTab(app.TabBar.PERFORMANCE).then(() => {
        _common.setDefaultView(app.TabBar.PERFORMANCE,commonLocators.CommonKeys.DEFAULT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROGRESS_REPORT_HISTORY, app.FooterTab.PROGRESS_REPORT, 1);
        _common.setup_gridLayout(cnt.uuid.PROGRESS_REPORT_HISTORY, CONTAINER_COLUMNS_PROGRESS_REPORT_HISTORY)
      })
     

      _common.openTab(app.TabBar.PERFORMANCE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
      });
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
      _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)
      _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
      _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, SCH_ACT_DESC)

      _common.openTab(app.TabBar.PERFORMANCE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROGRESS_REPORT_HISTORY, app.FooterTab.PROGRESS_REPORT, 1);
      })
      _common.create_newRecord(cnt.uuid.PROGRESS_REPORT_HISTORY);
      _common.enterRecord_inNewRow(cnt.uuid.PROGRESS_REPORT_HISTORY,app.GridCells.REMAINING_QUANTITY,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_PROGRESS_REPORT_HISTORY.REMAINING_QUANTITY)
      _common.select_activeRowInContainer(cnt.uuid.PROGRESS_REPORT_HISTORY)
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()

      _common.openTab(app.TabBar.PERFORMANCE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
      });
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
      _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
      _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)
      _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
      _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, SCH_ACT_DESC)

      _common.openTab(app.TabBar.PERFORMANCE).then(() => {
        _common.select_tabFromFooter(cnt.uuid.PROGRESS_REPORT_HISTORY, app.FooterTab.PROGRESS_REPORT, 1);
      })
      _common.select_rowInContainer(cnt.uuid.PROGRESS_REPORT_HISTORY)
      _common.waitForLoaderToDisappear()

      _validate.verify_remainingPercentageOf_activityStructure(CONTAINERS_PROGRESS_REPORT_HISTORY.REMAINING_PERCENT);
  });

  it("TC - Update Line Item Quantities", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT); 
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();    
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
      _common.filterCurrentEstimate(cnt.uuid.ESTIMATE,commonLocators.CommonKeys.NO_FILTER)
      _common.search_inSubContainer(cnt.uuid.ESTIMATE,ESTIMATE_DESCRIPTION)
      _common.select_rowInContainer(cnt.uuid.ESTIMATE)
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
      });
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.select_rowInContainer(cnt.uuid.ESTIMATE_LINEITEMS)
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS);
      });
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
      _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.UPDATE_LINE_ITEM_QUANTITIES);
      _common.waitForLoaderToDisappear()
      _estimatePage.update_lineItem_fromWizard(MODAL_UPDATE_LINE_ITEM_QUANTITIES_PARAMETERS);
      _common.waitForLoaderToDisappear()

  });

  it("TC - Verify the Quantity in the Line Item Quantity Container", function () {

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.LINE_ITEM_QUANTITIES, app.FooterTab.LINE_ITEM_QUANTITY);
      _common.setup_gridLayout(cnt.uuid.LINE_ITEM_QUANTITIES, CONTAINER_COLUMNS_LINE_ITEM_QUANTITY)
    });
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _validate.verify_LineItemQuantities(CONTAINERS_PROGRESS_REPORT_HISTORY.QUANTITY);
  });
});
