import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;
let PLANNED_START
let PLANNED_FINISH

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCHE-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCHE-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);
const NO_OF_DAYS = Cypress._.random(0, 100);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Generate Activities");
ALLURE.story("SCH- 3.36 | Create Milestone-Hammock-SubSchedule Activity ");

describe("SCH- 3.36 | Create Milestone-Hammock-SubSchedule Activity ", () => {
    before(function () {   
        cy.fixture("scheduling/sch-3.36-milestone-hammock-sub-schedule.json").then((data) => {
        this.data = data
        CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
        CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
        CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
        PLANNED_START = _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
		PLANNED_FINISH = _common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,NO_OF_DAYS)
        SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
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
            _common.waitForLoaderToDisappear()   
       })
    })
   
    it("TC - Create new schedule header", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_REC_NEW)
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        _common.waitForLoaderToDisappear()
         cy.SAVE();
        _common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
    });

    it("TC - Add activity structure", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
			_common.waitForLoaderToDisappear()
			_common.setDefaultView(app.TabBar.PLANNING,commonLocators.CommonKeys.DEFAULT)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
		});
        _common.maximizeContainer(cnt.uuid.ACTIVITY_STRUCTURE)
		_schedulePage.enterDataTo_CreateScheduleActivity(ACTIVITY_STRUCTURE_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0],CONTAINERS_ACTIVITY_STRUCTURE.UOM[0], PLANNED_START,PLANNED_FINISH)
	    cy.SAVE()
    });

    it("TC- Create Milestone and Assert the milestone activity", function(){
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.IconButtons.ICO_TASK_TO_HAMMOCK)
        cy.SAVE()
        _validate.verify_isIconPresent(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_MILESTONE);
    })

    it("TC- Create Hammock and Assert the Hammock activity", function(){
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.IconButtons.ICO_TASK_TO_HAMMOCK)
        cy.SAVE()
        _validate.verify_isIconPresent(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_HAMMOCK);
    })

    it("TC- Create Sub Schedule and Assert the SubSchedule activity", function(){
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.IconButtons.ICO_TASK_TO_HAMMOCK)
        cy.SAVE()
        _validate.verify_isIconPresent(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.TREE,app.GridCellIcons.ICO_SUB_TASK);
    })

    after(() => {

        cy.LOGOUT();

    })
})