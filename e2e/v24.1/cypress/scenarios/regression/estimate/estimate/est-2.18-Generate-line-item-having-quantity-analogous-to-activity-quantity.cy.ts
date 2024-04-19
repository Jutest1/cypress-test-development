import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView,_schedulePage, _wipPage, _package, _controllingUnit,_validate } from "cypress/pages";
import { tile, app, cnt, sidebar, commonLocators, btn } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACT_DESC = "SADES-" + Cypress._.random(0, 999);
const SCH_CODE = "ACT-" + Cypress._.random(0, 999);
const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);

let SCH_PARAMETERS:DataCells
let CONTAINER_COLUMNS_SCHEDULING
let CONTAINERS_SCHEDULING_ACTIVITY
let CONTAINER_COLUMNS_SCHEDULING_ACTIVITY
let PLANNED_START
let PLANNED_FINISH
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let GENERATE_LINE_ITEMS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_LINE_ITEM;
let ESTIMATE_CONFIGURATION_PARAMETER:DataCells

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 2.18 | Generate line item having quantity analogous to activity quantity");
describe("EST- 2.18 | Generate line item having quantity analogous to activity quantity", () => {

  before(function () {
    cy.fixture("estimate/est-2.18-Generate-line-item-having-quantity-analogous-to-activity-quantity.json")
      .then((data) => {
        this.data = data
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
        GENERATE_LINE_ITEMS_PARAMETERS={
          [commonLocators.CommonLabels.HEADER_TEXT]:[commonLocators.CommonLabels.BASIC_SETTING],
          [commonLocators.CommonLabels.SOURCE_LEADING_STRUCTURE]:SCH_DESC             
        }
        CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
        ESTIMATE_CONFIGURATION_PARAMETER = {
          [commonLocators.CommonLabels.HEADER_TEXT]: [commonLocators.CommonLabels.ESTIMATE_CONFIGURATION, commonLocators.CommonLabels.ESTIMATE_STRUCTURE],
          [commonLocators.CommonLabels.EDIT_ESTIMATE_TYPE]: commonLocators.CommonKeys.CHECK,
          [commonLocators.CommonLabels.EDIT_TYPE]: commonLocators.CommonKeys.CHECK,
          [commonLocators.CommonLabels.ESTIMATE_STRUCTURE_CONFIG_DETAILS]:commonLocators.CommonKeys.EDIT,
          [app.GridCells.EST_STRUCTURE]:commonLocators.CommonKeys.SCHEDULES,
          [app.GridCells.QUANTITY_REL]:commonLocators.CommonKeys.FROM_STRUCTURE,
        }
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
      _common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.estqtyrelactfk,CONTAINER_COLUMNS_LINE_ITEM.quantitytarget,CONTAINER_COLUMNS_LINE_ITEM.wqquantitytarget],cnt.uuid.ESTIMATE_LINEITEMS)
    });
    _common.waitForLoaderToDisappear()
    _common.clickOn_toolbarButton(cnt.uuid.ESTIMATE_LINEITEMS,btn.IconButtons.ICO_SETTING_DOC)
    _common.waitForLoaderToDisappear()
    _estimatePage.estimateConfigurationDialog(ESTIMATE_CONFIGURATION_PARAMETER)
    cy.wait(100).then(() => {
      _common.clickOn_modalFooterButton(btn.ButtonText.OK)
    })
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
    _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
    _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
    _common.waitForLoaderToDisappear()
    _estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
    _common.waitForLoaderToDisappear()
    _common.waitForLoaderToDisappear()
  });
 
  it("TC - Verify the quantity in the line item container", function () { 
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
    _common.waitForLoaderToDisappear()
    cy.REFRESH_CONTAINER()
    _common.waitForLoaderToDisappear()
    _common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS)
    _common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS, SCH_ACT_DESC);
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS, SCH_ACT_DESC)
    _common.assert_cellData_insideActiveRow(cnt.uuid.ESTIMATE_LINEITEMS,app.GridCells.EST_QTY_REL_ACT_FK,commonLocators.CommonKeys.FROM_STRUCTURE)
    _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.QUANTITY_TARGET, CONTAINERS_SCHEDULING_ACTIVITY.QUANTITY)
    _common.assert_forNumericValues(cnt.uuid.ESTIMATE_LINEITEMS, app.GridCells.WQ_QUANTITY_TARGET, CONTAINERS_SCHEDULING_ACTIVITY.QUANTITY)
  });
})