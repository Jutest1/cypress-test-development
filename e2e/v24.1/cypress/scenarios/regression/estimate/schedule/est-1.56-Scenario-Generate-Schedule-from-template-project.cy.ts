import { tile, app, cnt, btn, sidebar, commonLocators } from 'cypress/locators';
import Buttons from 'cypress/locators/buttons';
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from 'cypress/pages';
import { DataCells } from 'cypress/pages/interfaces';

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO="PR" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);
const PROJECT_NO_1="PRS" + Cypress._.random(0, 999);
const PROJECT_DESC_1="PRSDESC-" + Cypress._.random(0, 999);
const SCH_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACT_DESC = "SCH-ACT-" + Cypress._.random(0, 999);
const SCH_CODE = "ACT-" + Cypress._.random(0, 999);

const ESTIMATE_CODE = '1' + Cypress._.random(0, 999);
const ESTIMATE_DESCRIPTION = 'EST-DESC-' + Cypress._.random(0, 999);
const LINE_ITEM_DESCRIPTION = 'LI-DESC-' + Cypress._.random(0, 999);

let CONTAINERS_COMPANIES
let PROJECTS_PARAMETERS:DataCells
let MODAL_PROJECTS
let SCH_PARAMETERS:DataCells
let PROJECTS_PARAMETERS_1:DataCells
let CONTAINER_COLUMNS_SCHEDULING
let CONTAINERS_SCHEDULING_ACTIVITY
let CONTAINER_COLUMNS_SCHEDULING_ACTIVITY
let PLANNED_START
let PLANNED_FINISH
let ESTIMATE_PARAMETERS: DataCells;
let CONTAINERS_ESTIMATE;
let CONTAINER_COLUMNS_ESTIMATE;
let LINE_ITEM_PARAMETERS:DataCells
let CONTAINERS_LINE_ITEM;
let CONTAINER_COLUMNS_LINE_ITEM;
let CREATE_SCHEDULE_PARAMETERS:DataCells

ALLURE.epic('ESTIMATE');
ALLURE.feature('Schedule');
ALLURE.story('EST- 1.56 | Generate schedule from template project');
describe('EST- 1.56 | Generate schedule from template project', () => {

	before(function () {
		cy.fixture('estimate/est-1.56-generate-schedule-from-template-project.json')
		  .then((data) => {
			this.data = data;
			MODAL_PROJECTS=this.data.MODAL.PROJECTS
			PROJECTS_PARAMETERS={
			  [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
			  [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
			  [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
			}
			PROJECTS_PARAMETERS_1={
				[commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO_1,
				[commonLocators.CommonLabels.NAME]:PROJECT_DESC_1,
				[commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
			  }
			CONTAINERS_COMPANIES=this.data.CONTAINERS.COMPANIES
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
						[app.GridCells.EST_TYPE_FK]: CONTAINERS_ESTIMATE.ESTIMATE_TYPE,
			}
			
			CONTAINERS_LINE_ITEM=this.data.CONTAINERS.LINE_ITEM
			CONTAINER_COLUMNS_LINE_ITEM=this.data.CONTAINER_COLUMNS.LINE_ITEM
			LINE_ITEM_PARAMETERS = {
						[app.GridCells.DESCRIPTION_INFO]: LINE_ITEM_DESCRIPTION,
						[app.GridCells.QUANTITY_SMALL]: CONTAINERS_LINE_ITEM.QUANTITY,
						[app.GridCells.BAS_UOM_FK]: CONTAINERS_LINE_ITEM.UOM
			};
			
		})
		.then(()=>{
			cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
		})
	});

	after(() => {
	  cy.LOGOUT();
	});

	it('TC - Set number range under customizing', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.COMPANY);
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.COMPANY).then(() => {
			_common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
		});
		_common.clear_subContainerFilter(cnt.uuid.COMPANIES)
		_common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.CODE);
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.select_rowHasValue(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.CODE);

		_common.openTab(app.TabBar.NUMBER_SERIES).then(() => {
			_common.setDefaultView(app.TabBar.NUMBER_SERIES)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.NUMBER_RANGES, app.FooterTab.NUMBERRANGE, 1);
		});
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()

		_common.openTab(app.TabBar.NUMBER_SERIES).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.COMPANIES, app.FooterTab.COMPANIES, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.maximizeContainer(cnt.uuid.COMPANIES)
		_common.clear_subContainerFilter(cnt.uuid.COMPANIES)
		_common.search_inSubContainer(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.CODE);
		_common.select_rowHasValue(cnt.uuid.COMPANIES, CONTAINERS_COMPANIES.CODE);
		_common.minimizeContainer(cnt.uuid.COMPANIES)

		_common.openTab(app.TabBar.NUMBER_SERIES).then(() => {
			_common.select_tabFromFooter(cnt.uuid.NUMBER_RANGES, app.FooterTab.NUMBERRANGE, 0);
		});
		_common.maximizeContainer(cnt.uuid.NUMBER_RANGES)
		_common.search_dataInNumberRangeContainer(cnt.uuid.NUMBER_RANGES,  commonLocators.CommonKeys.SCHEDULING);
		_common.select_dataFromSubContainer(cnt.uuid.NUMBER_RANGES, commonLocators.CommonKeys.SCHEDULING);
		_common.clickOn_cellHasIcon(cnt.uuid.NUMBER_RANGES, app.GridCells.TREE, app.GridCellIcons.ICO_RUBRIC_CATEGORY);
		_common.waitForLoaderToDisappear()
		_common.select_numberRangeSetting();
		_common.waitForLoaderToDisappear()
		_common.waitForLoaderToDisappear()
	})

	it('TC - Create first project', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
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
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
	})

	it('TC - Create new schedule header and activity structure', function () {
		_common.openTab(app.TabBar.SCHEDULING).then(() => {
			_common.setDefaultView(app.TabBar.SCHEDULING)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
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
		_common.saveCellDataToEnv(cnt.uuid.SCHEDULES,app.GridCells.CODE,"SCH_CODE")
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
		_common.saveCellDataToEnv(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.CODE,"SCH_ACT_CODE")
		_common.saveCellDataToEnv(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_DURATION,"PLANNED_DURATION")

	})

	it('TC - Make first project a Template Project', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();

		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.MAKE_TEMPLATE_PROJECT);		
		_common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC - Create second project', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS_1);
        _common.waitForLoaderToDisappear()
        cy.SAVE();          
        _common.waitForLoaderToDisappear()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_1).pinnedItem();
	})

    it('TC - Create new estimate record', function () {
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
		  _common.waitForLoaderToDisappear()
		});
		_common.maximizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.create_newRecord(cnt.uuid.ESTIMATE_LINEITEMS);
		_estimatePage.enterRecord_toCreateLineItem(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_PARAMETERS);
		_common.waitForLoaderToDisappear()
		cy.SAVE()
		_common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.ESTIMATE_LINEITEMS)
	});

	it('TC - Create schedule from wizard', function () {
		CREATE_SCHEDULE_PARAMETERS={
			[commonLocators.CommonLabels.TEMPLATE_PROJECT]:PROJECT_NO,
			[commonLocators.CommonLabels.SCHEDULE]:Cypress.env("SCH_CODE")
		}
		_common.openTab(app.TabBar.ESTIMATELINEITEM).then(() => {
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ESTIMATE_LINEITEMS, app.FooterTab.LINE_ITEMS, 0);
			_common.waitForLoaderToDisappear()
		});
		_common.clear_subContainerFilter(cnt.uuid.ESTIMATE_LINEITEMS);
		_common.search_inSubContainer(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
		_common.select_rowHasValue(cnt.uuid.ESTIMATE_LINEITEMS,LINE_ITEM_DESCRIPTION)
		_common.waitForLoaderToDisappear()
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_SCHEDULE);
		_schedulePage.create_schedule_fromWizard(CREATE_SCHEDULE_PARAMETERS);
	});

	it('TC - Verify planned duration and description', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
		_common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
          _common.waitForLoaderToDisappear()
          _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO_1).pinnedItem();

		_common.openTab(app.TabBar.SCHEDULING).then(() => {
			_common.setDefaultView(app.TabBar.SCHEDULING)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
			_common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULING)
		});
		_common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
		_common.search_inSubContainer(cnt.uuid.SCHEDULES,SCH_DESC)
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

		_common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
		_common.select_allContainerData(cnt.uuid.ACTIVITY_STRUCTURE)
		_common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL)
		_common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE,SCH_ACT_DESC)
		_common.assert_forNumericValues(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_DURATION,Cypress.env("PLANNED_DURATION"))
		_common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,SCH_ACT_DESC)
	});
});
