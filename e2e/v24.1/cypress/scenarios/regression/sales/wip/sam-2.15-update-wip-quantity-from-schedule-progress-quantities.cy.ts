import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _schedulePage, _wipPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const SCH_CODE = "SCH_CODE-" + Cypress._.random(0, 999);
const SCH_DESC = "SCH_DESC-" + Cypress._.random(0, 999);
const EST_CODE = "EST_DESC-" + Cypress._.random(0, 999);
const EST_DESC = "EST_DESC-" + Cypress._.random(0, 999);
const SCH_ACT = "ACT1_DESC-" + Cypress._.random(0, 999);
const ACT_PROGRESS_DESC = "PROG_DESC-" + Cypress._.random(0, 999);
const BID_DESC = "BID_DESC-" + Cypress._.random(0, 999);
const CONT_DESC = "CONT_DESC-" + Cypress._.random(0, 999);
const WIP_DESC = "WIP_DESC-" + Cypress._.random(0, 999);

let MODAL_BID;

let CONTAINER_ACTIVITY_STRUCTURE;
let CONTAINER_PROGRESS;
let CONTAINER_ESTIMATE;
let CONTAINER_RESOURCE;
let CONTAINER_CONTRACT;

let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_GANTT_TREE_GRID;
let CONTAINER_COLUMNS_PROGRESS;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINER_COLUMNS_LINE_ITEM;

let SCHEDULE_ACTIVITY_PARAMETERS:DataCells;
let SCHEDULE_PARAMETERS:DataCells;
let ESTIMATE_PARAMETERS:DataCells;
let LINE_ITEMS_PARAMETERS:DataCells;
let RESOURCE_PARAMETERS:DataCells;
let ESTIMATE_CONFIGURATION_PARAMETER:DataCells

const PROJECT_NO = "34" + Cypress._.random(0, 999);
const PROJECT_DESC = "PRDESC-" + Cypress._.random(0, 999);
const CLERK = "HS";
let PROJECTS_PARAMETERS: DataCells
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("SALES");
ALLURE.feature("Sales-WIP");
ALLURE.story("SAM- 2.15 | Update WIP Quantity from Schedule(Progress Quantities). ");

describe("SAM- 2.15 | Update WIP Quantity from Schedule(Progress Quantities). ", () => {

  before(function () {
    cy.fixture("sam/sam-2.15-update-wip-quantity-from-schedule-progress-quantities").then((data) => {
      this.data = data;
  
      PROJECTS_PARAMETERS = {
          [commonLocators.CommonLabels.PROJECT_NUMBER]: PROJECT_NO,
          [commonLocators.CommonLabels.NAME]: PROJECT_DESC,
          [commonLocators.CommonLabels.CLERK]: CLERK
      }
      MODAL_BID=this.data.MODAL.BID

      CONTAINER_PROGRESS  = this.data.CONTAINERS.PROGRESS,
      CONTAINER_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
      CONTAINER_ESTIMATE = this.data.CONTAINERS.ESTIMATE
      ESTIMATE_PARAMETERS = {
				[app.GridCells.CODE]: EST_CODE,
				[app.GridCells.DESCRIPTION_INFO]: EST_DESC,
				[app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINER_ESTIMATE.RUBRIC_CATEGORY,
				[app.GridCells.EST_TYPE_FK]: CONTAINER_ESTIMATE.ESTIMATE_TYPE,
			};

      CONTAINER_CONTRACT  = this.data.CONTAINERS.CONTRACT,

      LINE_ITEMS_PARAMETERS = {
        [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.BASIC_SETTING],
        [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]: SCH_DESC
      };

      SCHEDULE_PARAMETERS = {
        [app.GridCells.DESCRIPTION_INFO]:SCH_DESC
      };
      CONTAINER_RESOURCE = this.data.CONTAINERS.RESOURCE
      RESOURCE_PARAMETERS = {
        [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINER_RESOURCE.SHORT_KEY,
        [app.GridCells.CODE]: CONTAINER_RESOURCE.CODE,
      };

      CONTAINER_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
      SCHEDULE_ACTIVITY_PARAMETERS = {
        [app.GridCells.CODE]: CONTAINER_ACTIVITY_STRUCTURE.CODE,
				[app.GridCells.DESCRIPTION]: SCH_ACT,
        [app.GridCells.UOM]: CONTAINER_ACTIVITY_STRUCTURE.UOM,
				[app.GridCells.QUANTITY_SMALL]: CONTAINER_ACTIVITY_STRUCTURE.QUANTITY,
				[app.GridCells.PLANNED_START]:_common.getDate(CONTAINER_ACTIVITY_STRUCTURE.PLANNED_START),
        [app.GridCells.PLANNED_FINISH]:_common.getDate(CONTAINER_ACTIVITY_STRUCTURE.PLANNED_FINISH,5),
			};

      CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES;
      CONTAINER_COLUMNS_GANTT_TREE_GRID = this.data.CONTAINER_COLUMNS.GANTT_TREE_GRID;
      CONTAINER_COLUMNS_PROGRESS = this.data.CONTAINER_COLUMNS.PROGRESS;
      CONTAINER_COLUMNS_LINE_ITEM = this.data.CONTAINER_COLUMNS.LINE_ITEM;
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
      ESTIMATE_CONFIGURATION_PARAMETER = {
				[commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.ESTIMATE_CONFIGURATION, commonLocators.CommonLabels.ESTIMATE_STRUCTURE],
				[commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
				[commonLocators.CommonLabels.EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
        [commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS]:commonLocators.CommonKeys.EDIT,
				[app.GridCells.EST_STRUCTURE]:commonLocators.CommonKeys.SCHEDULES,
				[app.GridCells.QUANTITY_REL]:commonLocators.CommonKeys.FROM_STRUCTURE,
			}
      cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      _common.openDesktopTile(tile.DesktopTiles.PROJECT);
      _common.waitForLoaderToDisappear()
      _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.setDefaultView(app.TabBar.PROJECT)
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
      });
      _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
      _common.create_newRecord(cnt.uuid.PROJECTS);
      _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
      _common.waitForLoaderToDisappear()
      cy.SAVE();
      _common.waitForLoaderToDisappear()
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
});
  });

  after(() => {
    cy.LOGOUT();
});

  it("TC - Create new Schedule header and Activity record.", function () {
    _common.openTab(app.TabBar.SCHEDULING).then(() => {
      _common.setDefaultView(app.TabBar.SCHEDULING)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
        _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
    })
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
    _common.create_newRecord(cnt.uuid.SCHEDULES);
    cy.wait(1000)
    _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.goToButton_inActiveRow(cnt.uuid.SCHEDULES, app.GridCells.CODE,btn.IconButtons.ICO_SCHEDULING);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.GANTT).then(() => {
      _common.setDefaultView(app.TabBar.GANTT,commonLocators.CommonKeys.DEFAULT)
      _common.select_tabFromFooter(cnt.uuid.GANTT_TREE_GRID, app.FooterTab.GANTT_TREEGRID)
      _common.setup_gridLayout(cnt.uuid.GANTT_TREE_GRID, CONTAINER_COLUMNS_GANTT_TREE_GRID)
    })
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.GANTT_TREE_GRID);
    _common.create_newRecordInSubContainer_ifNoRecordExists(cnt.uuid.GANTT_TREE_GRID,0);
    _common.create_newSubRecord(cnt.uuid.GANTT_TREE_GRID)
    
    _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.GANTT_TREE_GRID,SCHEDULE_ACTIVITY_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.PLANNING).then(() => {
      _common.select_tabFromFooter(cnt.uuid.PROGRESS_REPORT_HISTORY, app.FooterTab.PROGRESS_REPORT)
      _common.setup_gridLayout(cnt.uuid.PROGRESS_REPORT_HISTORY, CONTAINER_COLUMNS_PROGRESS)
    })
    _common.clear_subContainerFilter(cnt.uuid.PROGRESS_REPORT_HISTORY);
    _common.create_newRecord(cnt.uuid.PROGRESS_REPORT_HISTORY);
    _common.enterRecord_inNewRow(cnt.uuid.PROGRESS_REPORT_HISTORY, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, ACT_PROGRESS_DESC);
    _common.enterRecord_inNewRow(cnt.uuid.PROGRESS_REPORT_HISTORY, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_PROGRESS.QUANTITY);
    cy.SAVE();
_common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.PROGRESS_REPORT_HISTORY)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.PROGRESS_REPORT_HISTORY, ACT_PROGRESS_DESC)
    _common.getText_fromCell(cnt.uuid.PROGRESS_REPORT_HISTORY, app.GridCells.QUANTITY_SMALL).then(($ele1: JQuery<HTMLElement>) => {
      Cypress.env("Progress_Qty_01", $ele1.text())
      cy.log(Cypress.env("Progress_Qty_01"))
    })
    _common.minimizeContainer(cnt.uuid.PROGRESS_REPORT_HISTORY)
  });

  it("TC - Create new Estimate header record", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
    _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
    cy.REFRESH_CONTAINER()
    _common.openTab(app.TabBar.ESTIMATE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
    })
    cy.SAVE()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE);
    _common.create_newRecord(cnt.uuid.ESTIMATE);
    _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETERS);
    cy.SAVE();
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE, btn.IconButtons.ICO_GO_TO);
    _common.waitForLoaderToDisappear();
  });

  it("TC - Generate Line item from Schedule and Assign Activity to it", function () {

    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
		_common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS,btn.IconButtons.ICO_SETTING_DOC)
		_common.waitForLoaderToDisappear()
		_estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIGURATION_PARAMETER)
		cy.wait(100).then(() => {
			_common.clickOn_modalFooterButton(btn.ButtonText.OK)
		})
cy.SAVE()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 2);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS, CONTAINER_COLUMNS_LINE_ITEM)
    });
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _estimatePage.generate_lineItems_fromWizard(LINE_ITEMS_PARAMETERS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SCH_ACT)
    cy.wait(1000).then(() => {
      _common.edit_dropdownCellWithCaret(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_TELAOT_FK, commonLocators.CommonKeys.LIST,CONTAINER_ESTIMATE.ACT_RELATION)
      _common.edit_dropdownCellWithInput(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PSD_ACTIVITY_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, SCH_ACT)
    });
    cy.wait(1000);
    cy.SAVE();
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Assign resource to line item", function () {
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SCH_ACT)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES)
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    cy.SAVE()
  
  });

  it("TC - Create new sales bid", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_BID);
    _bidPage.createBidRecord_byWizardOptions(MODAL_BID.BY_ACTIVITY, BID_DESC, MODAL_BID.BUSINESS_PARTNER,MODAL_BID.SOURCE_LEAD);
    cy.SAVE();
    _common.openTab(app.TabBar.BID).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BIDS, app.FooterTab.BIDS, 0);
    });
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BIDS)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _bidPage.changeStatus_BidRecord();
    cy.SAVE();
  });

  it("TC - Create Sales Contract using Wizard option", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_CONTRACT);
    _saleContractPage.createContractRecord_byWizardOptions(CONTAINER_CONTRACT.CONTRACT_TYPE, CONT_DESC, CONTAINER_CONTRACT.CUSTOMER);
    cy.SAVE();
    _common.openTab(app.TabBar.CONTRACTS).then(() => {
      _common.setDefaultView(app.TabBar.CONTRACTS)
      _common.select_tabFromFooter(cnt.uuid.CONTRACTS, app.FooterTab.CONTRACTS, 0);
    });
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PROJECT_NO).pinnedItem();

    cy.REFRESH_CONTAINER()
    _common.clear_subContainerFilter(cnt.uuid.CONTRACTS)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
    _common.changeStatus_fromModal(sidebar.SideBarOptions.CONTRACTED);
    cy.SAVE();
    cy.wait(2000);
    _common.select_dataFromSubContainer(cnt.uuid.CONTRACTS, CONT_DESC);
  });

  it("TC - Create new WIP", function () {
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CREATE_WIP);
    _wipPage.create_WIPfrom_Wizard(WIP_DESC)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.WIP).then(() => {
      _common.select_tabFromFooter(cnt.uuid.WIP, app.FooterTab.WIP);
    })
    _common.clear_subContainerFilter(cnt.uuid.WIP)
    _common.waitForLoaderToDisappear()

    _common.openTab(app.TabBar.WIPBOQ).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_WIP, app.FooterTab.BOQs)
    })
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQ_WIP)
    _common.select_dataFromSubContainer(cnt.uuid.BOQ_WIP, SCH_DESC)
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_WIP_QUANTITIES);
    _wipPage.updateWipQuantitywizard_fromSchedule()
    cy.SAVE()
   _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.BOQ_STRUCTUREWIP)
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()

    _common.select_rowHasValue(cnt.uuid.BOQ_STRUCTUREWIP, SCH_ACT)
    cy.wait(1000).then(()=>{
      _common.assert_cellData_insideActiveRow(cnt.uuid.BOQ_STRUCTUREWIP, app.GridCells.QUANTITY_SMALL, Cypress.env("Progress_Qty_01"))
    })
  });
})
