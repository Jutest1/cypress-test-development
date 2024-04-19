import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { _common, _controllingUnit, _package, _projectPage, _sidebar, _mainView, _assembliesPage, _estimatePage, _modalView, _schedulePage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_1 = 'LI1-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION_2= 'LI2-DESC-' + Cypress._.random(0, 999);
const CONG_DESC = "CONG-DESC-"+ Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACT_DESC = "SCH-ACT-" + Cypress._.random(0, 999);
const SCH_CODE = "ACT-" + Cypress._.random(0, 999);

let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS:DataCells
let LINE_ITEM_PARAMETERS_1:DataCells
let LINE_ITEM_PARAMETERS_2:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let RULES;
let SCH_PARAMETERS:DataCells
let CONTAINER_COLUMNS_SCHEDULING
let CONTAINERS_SCHEDULING_ACTIVITY
let CONTAINER_COLUMNS_SCHEDULING_ACTIVITY
let PLANNED_START
let PLANNED_FINISH

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 3.11 | Activity assignment to line items using bulk editor");

describe("EST- 3.11 | Activity assignment to line items using bulk editor", () => {

  before(function () {
    cy.fixture("estimate/est-3.11-activity-assignment-to-line-item-using-bulk-editor.json")
      .then((data) => {
        this.data = data;
        CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
        CONTAINER_COLUMNS_ESTIMATE=this.data.CONTAINER_COLUMNS.ESTIMATE
        ESTIMATE_PARAMETERS = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBRIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
        }	
        CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        LINE_ITEM_PARAMETERS = {
          [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        };
        LINE_ITEM_PARAMETERS_1 = {
          [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_1,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        };
        LINE_ITEM_PARAMETERS_2 = {
          [app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION_2,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
          [app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM,
        };
        SCH_PARAMETERS={
          [app.GridCells.CODE]:SCH_CODE,
          [app.GridCells.DESCRIPTION_INFO]:SCH_DESC
        }
        CONTAINER_COLUMNS_SCHEDULING=this.data.CONTAINER_COLUMNS.SCHEDULING
        CONTAINERS_SCHEDULING_ACTIVITY=this.data.CONTAINERS.SCHEDULING_ACTIVITY
        CONTAINER_COLUMNS_SCHEDULING_ACTIVITY=this.data.CONTAINER_COLUMNS.SCHEDULING_ACTIVITY
        PLANNED_START=_common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
        PLANNED_FINISH=_common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,CONTAINERS_SCHEDULING_ACTIVITY.NO_OF_DAYS)
        RULES= [{"FieldName": "Activity","Option": "Set Value to","OptionData": SCH_ACT_DESC}]
      })
      .then(()=>{
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
  })

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
      _common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)
      _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
      _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE,SCH_ACT_DESC)
      _common.saveCellDataToEnv(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CODE,"SCH_CODE")
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

  it("TC - Create new line item record", function () {
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.setDefaultView(app.TabBar.ESTIMATELINEITEM)
      _common.waitForLoaderToDisappear()
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_LINEITEMS,CONTAINER_COLUMNS_LINE_ITEM )
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.psdactivityfk],cnt.uuid.ESTIMATE_LINEITEMS)
    });
    _common.waitForLoaderToDisappear()
    _common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS_1);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS_2);
    _common.waitForLoaderToDisappear()
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
  });

  it("TC - Select all record and use bulk editor in line item container", function () {
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
    _estimatePage.bulkEditor_createNewRule(cnt.uuid.ESTIMATE_LINEITEMS,CONG_DESC,RULES);
    cy.SAVE()
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
  });

  it("TC - Verify bulk editor records", function () {
    _common.select_allContainerData(cnt.uuid.ESTIMATE_LINEITEMS);
    _validate.verify_bulkEditRecords(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.PSD_ACTIVITY_FK, Cypress.env("SCH_CODE"));
  });

});