import { tile, app, cnt,sidebar, btn,commonLocators } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage,_schedulePage,_controllingUnit, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _billPage, _salesPage, _validate, _package } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();

const BOQ_DESC = "BOQ-DESC-" + Cypress._.random(0, 999);
const BOQ_STRUCT_DESC = "BOQSTR-DESC-" + Cypress._.random(0, 999);
const CONTROLLING_DESC = "CONTRO-DESC-" + Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACT_DESC = "ACT-" + Cypress._.random(0, 999);
const SCH_CODE = "SCH-CODE-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);

let BOQS_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_BOQ;
let BOQS_STRUCTURE_PARAMETERS:DataCells;
let CONTAINERS_BOQ_STRUCTURE;
let CONTAINER_COLUMNS_BOQ_STRUCTURE;
let CONTROLLING_UNIT_MAIN_PARAMETERS_1: DataCells;
let CONTAINERS_CONTROLLING_UNITS;
let CONTAINER_COLUMNS_CONTROLLING_UNITS;
let CONTAINER_COLUMNS_SCHEDULING
let CONTAINERS_SCHEDULING_ACTIVITY
let CONTAINER_COLUMNS_SCHEDULING_ACTIVITY
let SCH_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_ESTIMATE;
let CONTAINERS_ESTIMATE;
let ESTIMATE_PARAMETER:DataCells;
let CONTAINER_COLUMNS_ESTIMATE_BOQ;
let CONTAINER_COLUMNS_ESTIMATE_ACTIVITIES;
let CONTAINER_COLUMNS_ESTIMATE_CONTROLLING_UNITS;
let CONTAINERS_CONFIDENCE_CHECK;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 9.4 | Multi select several records to filter Estimate Line items");

describe("EST- 9.4 | Multi select several records to filter Estimate Line items", () => {
  before(function () {
    cy.fixture("estimate/est-9.4-multi-select-several-records-to-filter-estimate-line-items.json").then((data) => {
      this.data = data;
      CONTAINER_COLUMNS_BOQ= this.data.CONTAINER_COLUMNS.BOQ
      CONTAINER_COLUMNS_BOQ_STRUCTURE= this.data.CONTAINER_COLUMNS.BOQ_STRUCTURE
      CONTAINERS_BOQ_STRUCTURE= this.data.CONTAINERS.BOQ_STRUCTURE
      CONTAINER_COLUMNS_SCHEDULING=this.data.CONTAINER_COLUMNS.SCHEDULING
			CONTAINERS_SCHEDULING_ACTIVITY=this.data.CONTAINERS.SCHEDULING_ACTIVITY
			CONTAINER_COLUMNS_SCHEDULING_ACTIVITY=this.data.CONTAINER_COLUMNS.SCHEDULING_ACTIVITY
      CONTAINER_COLUMNS_ESTIMATE_BOQ=this.data.CONTAINER_COLUMNS.ESTIMATE_BOQ
      CONTAINER_COLUMNS_ESTIMATE_ACTIVITIES=this.data.CONTAINER_COLUMNS.ESTIMATE_ACTIVITIES
      CONTAINER_COLUMNS_ESTIMATE_CONTROLLING_UNITS=this.data.CONTAINER_COLUMNS.ESTIMATE_CONTROLLING_UNITS
      CONTAINERS_CONFIDENCE_CHECK=this.data.CONTAINERS.CONFIDENCE_CHECK
      SCH_PARAMETERS={
				[app.GridCells.CODE]:SCH_CODE,
				[app.GridCells.DESCRIPTION_INFO]:SCH_DESC
			};
      BOQS_PARAMETERS = {
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_DESC
      };
      BOQS_STRUCTURE_PARAMETERS = {
        [commonLocators.CommonLabels.TYPE]:commonLocators.CommonLabels.NEW_RECORD,
        [app.GridCells.BRIEF_INFO_SMALL]: BOQ_STRUCT_DESC,
        [app.GridCells.QUANTITY_SMALL]: CONTAINERS_BOQ_STRUCTURE.QUANTITY,
        [ app.GridCells.PRICE_SMALL]: CONTAINERS_BOQ_STRUCTURE.UNIT_RATE,
        [app.GridCells.BAS_UOM_FK]: CONTAINERS_BOQ_STRUCTURE.UOM
      };
      CONTAINER_COLUMNS_ESTIMATE = this.data.CONTAINER_COLUMNS.ESTIMATE;
      CONTAINERS_ESTIMATE = this.data.CONTAINERS.ESTIMATE;
      ESTIMATE_PARAMETER = {
          [app.GridCells.CODE]: ESTIMATE_CODE,
          [app.GridCells.DESCRIPTION_INFO]: ESTIMATE_DESCRIPTION,
          [app.GridCells.RUBRIC_CATEGORY_FK]: CONTAINERS_ESTIMATE.RUBIC_CATEGORY,
          [app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,   
      }
      CONTAINERS_CONTROLLING_UNITS = this.data.CONTAINERS.CONTROLLING_UNITS
      CONTAINER_COLUMNS_CONTROLLING_UNITS = this.data.CONTAINER_COLUMNS.CONTROLLING_UNITS;
      CONTROLLING_UNIT_MAIN_PARAMETERS_1 = {
          [app.GridCells.DESCRIPTION_INFO]: CONTROLLING_DESC,
          [app.GridCells.QUANTITY_SMALL]: CONTAINERS_CONTROLLING_UNITS.QUANTITY,
          [app.GridCells.UOM_FK]: CONTAINERS_CONTROLLING_UNITS.UOM
      };
   
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
   it("TC - Create new BoQ header and BoQ Structure", function () {
    _common.openTab(app.TabBar.BOQS).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQS, app.FooterTab.BOQs, 1);
     _common.setup_gridLayout(cnt.uuid.BOQS, CONTAINER_COLUMNS_BOQ)
    });
    _common.clear_subContainerFilter(cnt.uuid.BOQS);
    _common.waitForLoaderToDisappear()
    _common.create_newRecord(cnt.uuid.BOQS);
    _boqPage.enterRecord_toCreateBoQ(cnt.uuid.BOQS,BOQS_PARAMETERS)
    _common.saveCellDataToEnv(cnt.uuid.BOQS, app.GridCells.BRIEF_INFO_SMALL, BOQ_DESC, BOQ_ROOT_ITEM)
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.BOQS,btn.ToolBar.ICO_GO_TO);
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.BOQSTRUCTURE).then(() => {
      _common.select_tabFromFooter(cnt.uuid.BOQ_STRUCTURES, app.FooterTab.BOQ_STRUCTURE, 0);
      _common.setup_gridLayout(cnt.uuid.BOQ_STRUCTURES, CONTAINER_COLUMNS_BOQ_STRUCTURE)
    });
    _boqPage.enterRecord_toCreateBoQStructure(cnt.uuid.BOQ_STRUCTURES,BOQS_STRUCTURE_PARAMETERS);
    cy.SAVE();
    _common.waitForLoaderToDisappear()
    });
    it("TC - Create controlling unit", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTROLLING_UNITS)
        _common.openTab(app.TabBar.CONTROLLINGSTRUCTURE).then(() => {
            _common.setDefaultView(app.TabBar.CONTROLLINGSTRUCTURE)
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 1);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CONTAINER_COLUMNS_CONTROLLING_UNITS,)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER'))
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _controllingUnit.enterRecord_toCreateControllingUnit(CONTROLLING_UNIT_MAIN_PARAMETERS_1)
        cy.SAVE()
    });

    it("TC - Create Schedule header and Schedule activity", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
      _common.openTab(app.TabBar.SCHEDULING).then(() => {
        _common.setDefaultView(app.TabBar.SCHEDULING)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
        _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULING)
      });
      _common.waitForLoaderToDisappear()
      cy.REFRESH_CONTAINER()
      _common.waitForLoaderToDisappear()
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
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_SCHEDULING_ACTIVITY)
      });
      _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ACT_DESC, CONTAINERS_SCHEDULING_ACTIVITY.QUANTITY, CONTAINERS_SCHEDULING_ACTIVITY.UOM)
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
    });
    it("TC - Create Estimate Record", function () {
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
      _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.PROJECT)
      _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
      _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
      _common.openTab(app.TabBar.ESTIMATE).then(() => {
          _common.select_tabFromFooter(cnt.uuid.ESTIMATE, app.FooterTab.ESTIMATE, 0)
          _common.setup_gridLayout(cnt.uuid.ESTIMATE, CONTAINER_COLUMNS_ESTIMATE)
      })
      _common.clear_subContainerFilter(cnt.uuid.ESTIMATE)
      _common.create_newRecord(cnt.uuid.ESTIMATE)
      _estimatePage.enterRecord_toCreateEstimate(cnt.uuid.ESTIMATE,ESTIMATE_PARAMETER);
      _common.waitForLoaderToDisappear()
      cy.SAVE()
      _common.waitForLoaderToDisappear()
      _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE,btn.IconButtons.ICO_GO_TO)
      _common.waitForLoaderToDisappear()
  })
  it("TC - Verify schedulling record to filter estimate line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_ACTIVITIES, app.FooterTab.ACTIVITIES, 2)
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_ACTIVITIES, CONTAINER_COLUMNS_ESTIMATE_ACTIVITIES)
  })
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_ACTIVITIES)
  cy.REFRESH_CONTAINER()
  _common.waitForLoaderToDisappear()
  _common.search_inSubContainer(cnt.uuid.ESTIMATE_ACTIVITIES,SCH_ACT_DESC)
  _common.waitForLoaderToDisappear()
  _common.select_rowHasValue(cnt.uuid.ESTIMATE_ACTIVITIES,SCH_ACT_DESC)
  _common.waitForLoaderToDisappear()
  _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0)
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
  _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
  cy.SAVE();
  _common.waitForLoaderToDisappear()
  _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,SCH_ACT_DESC)
  _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,SCH_ACT_DESC)
  _common.waitForLoaderToDisappear()
  _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,SCH_ACT_DESC)

  })
  it("TC - Verify Boq record to filter estimate line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.ESTIMATE_BOQS, app.FooterTab.BOQs, 2)
      _common.waitForLoaderToDisappear()
      _common.setup_gridLayout(cnt.uuid.ESTIMATE_BOQS, CONTAINER_COLUMNS_ESTIMATE_BOQ)
    })
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_BOQS)
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_BOQS,BOQ_STRUCT_DESC)
    _common.waitForLoaderToDisappear()
    _common.select_rowHasValue(cnt.uuid.ESTIMATE_BOQS,BOQ_STRUCT_DESC)
    _common.waitForLoaderToDisappear()
    _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0)
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
   _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
   _common.waitForLoaderToDisappear()
   cy.SAVE();
   _common.waitForLoaderToDisappear()
   _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCT_DESC)
   _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,BOQ_STRUCT_DESC)
  _common.waitForLoaderToDisappear()
  _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,BOQ_STRUCT_DESC)
  })
  it("TC - Verify controlling record to filter estimate line item", function () {
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
      _common.select_tabFromFooter(cnt.uuid.LINEITEMBOQ, app.FooterTab.CONTROLLING_UNITS, 2)
      _common.setup_gridLayout(cnt.uuid.LINEITEMBOQ, CONTAINER_COLUMNS_ESTIMATE_CONTROLLING_UNITS)
  })
  _common.waitForLoaderToDisappear()
  _common.clear_subContainerFilter(cnt.uuid.LINEITEMBOQ)
  _common.search_inSubContainer(cnt.uuid.LINEITEMBOQ,CONTROLLING_DESC)
  _common.waitForLoaderToDisappear()
  _common.select_rowHasValue(cnt.uuid.LINEITEMBOQ,CONTROLLING_DESC)
  _common.waitForLoaderToDisappear()
  _common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0)
  _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
  _common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS)
  cy.SAVE();
  _common.waitForLoaderToDisappear()
  _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,CONTROLLING_DESC)
  _common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,CONTROLLING_DESC)
  _common.waitForLoaderToDisappear()
  _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.DESCRIPTION_INFO,CONTROLLING_DESC)
  })
})
  after(() => {
	cy.LOGOUT();
  })
