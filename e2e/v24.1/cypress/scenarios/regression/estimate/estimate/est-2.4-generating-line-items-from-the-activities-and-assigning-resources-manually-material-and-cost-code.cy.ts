import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _schedulePage, _wipPage, _package, _controllingUnit, _validate } from "cypress/pages";
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
let RESOURCE_PARAMETERS_MATERIAL:DataCells
let RESOURCE_PARAMETERS:DataCells
let CONTAINERS_RESOURCE;
let CONTAINER_COLUMNS_RESOURCE;
let CONTAINER_COLUMNS_LINE_ITEM;

ALLURE.epic("ESTIMATE");
ALLURE.feature("Estimate");
ALLURE.story("EST- 2.4 | Generating line items from the activities and assigning resources manually (Material and cost code)");

describe("EST- 2.4 | Generating line items from the activities and assigning resources manually (Material and cost code)", () => {

  before(function () {

    cy.fixture("estimate/est-2.4-generating-line-items-from-the-activities-and-assigning-resources-manually-material-and-cost-code.json")
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
            CONTAINERS_RESOURCE=this.data.CONTAINERS.RESOURCE
            CONTAINER_COLUMNS_RESOURCE=this.data.CONTAINER_COLUMNS.RESOURCE
            RESOURCE_PARAMETERS = {
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY
            };
            RESOURCE_PARAMETERS_MATERIAL={
              [app.GridCells.EST_RESOURCE_TYPE_SHORT_KEY]: CONTAINERS_RESOURCE.SHORT_KEY_1,
              [app.GridCells.CODE]: CONTAINERS_RESOURCE.CODE_1,
              [app.GridCells.QUANTITY_SMALL]:CONTAINERS_RESOURCE.QUANTITY_1
            }
            CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM

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
			_common.set_columnAtTop([CONTAINER_COLUMNS_LINE_ITEM.costtotal],cnt.uuid.ESTIMATE_LINEITEMS)
		});
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.GENERATE_LINE_ITEMS);
		_common.waitForLoaderToDisappear()
		_estimatePage.generate_lineItems_fromWizard(GENERATE_LINE_ITEMS_PARAMETERS);
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
		});
	});

  it("TC - Create new record in material and cost code resource", function () {
    _common.waitForLoaderToDisappear()
    _common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
        _common.select_tabFromFooter(cnt.uuid.RESOURCES, app.FooterTab.RESOURCES, 1);
        _common.setup_gridLayout(cnt.uuid.RESOURCES, CONTAINER_COLUMNS_RESOURCE)
        _common.set_columnAtTop([CONTAINER_COLUMNS_RESOURCE.costtotal],cnt.uuid.RESOURCES)
    });
    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()

    _common.maximizeContainer(cnt.uuid.RESOURCES)
    _common.clear_subContainerFilter(cnt.uuid.RESOURCES);
    _common.create_newRecord(cnt.uuid.RESOURCES);
    _estimatePage.enterRecord_toCreateResource(cnt.uuid.RESOURCES,RESOURCE_PARAMETERS_MATERIAL);
    _common.minimizeContainer(cnt.uuid.RESOURCES)
    _common.waitForLoaderToDisappear()
    cy.SAVE();
    _common.waitForLoaderToDisappear()
  });

  it('TC - Verify resources assigned with the line item by cost total', function () {
    _validate.verify_costTotalOfResources_WithLineItemCostTotal();
  });

})