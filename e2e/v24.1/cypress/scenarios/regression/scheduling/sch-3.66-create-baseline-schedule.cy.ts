import { btn,tile, app, cnt,sidebar,commonLocators } from "cypress/locators";
import {_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";
import Sidebar from 'cypress/locators/sidebar';
import CommonLocators from "cypress/locators/common-locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO="PRJ-SCH" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);

const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC= "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACTDESC = " SCH_ACT_DESC-" + Cypress._.random(0, 999);
const BASELINE_DESC = "BASELINE_DESC-" + Cypress._.random(0, 999);
const BASELINE_REMARK_DESC = "BASELINE_REMARK_DESC-" + Cypress._.random(0, 999);


let SCHEDULE_PARAMETERS:DataCells;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_SCHEDULES;
let PROJECTS_PARAMETERS:DataCells


let BASELINE_PARAMETER

ALLURE.epic("SCHEDULING");
ALLURE.feature("Baseline");
ALLURE.story("SCH- 3.66 | Create new Baseline");

describe("SCH- 3.66 | Create new Baseline", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.66-create-baseline-schedule.json").then((data) => {
            this.data = data
       
         CONTAINERS_ACTIVITY_STRUCTURE= this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
    
         BASELINE_PARAMETER= {
            [commonLocators.CommonLabels.DESCRIPTION]:BASELINE_DESC,
            [commonLocators.CommonLabels.REMARKS]:BASELINE_REMARK_DESC
        }

         PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:"SmiJ"
        }

        SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
        };
       })
     cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    }) 

    it('TC - Create project', function () {
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
        cy.SAVE();          
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
    })
    it("TC - Create new schedule header and activity record.", function () {
          _common.openTab(app.TabBar.SCHEDULING).then(() => {
          _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES,2);
          _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
          });
          _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
          _common.create_newRecord(cnt.uuid.SCHEDULES);
          _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
          _common.waitForLoaderToDisappear()
          cy.SAVE();
          _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
          _common.waitForLoaderToDisappear()
    });
    it("TC - Add activity structure ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ACTDESC,CONTAINERS_ACTIVITY_STRUCTURE.SCH_QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.SCH_UOM, _common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START),_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START))
		_common.waitForLoaderToDisappear()
		 cy.SAVE()
		_common.waitForLoaderToDisappear()
    });
    it("TC - Create Baseline  ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
            });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,Sidebar.SideBarOptions.CREATE_BASELINE);
        _schedulePage.enterRecord_toCreateBaseline(BASELINE_PARAMETER)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
     
    });
    it("TC - Verify the created baseline  ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.BASE_LINES, app.FooterTab.BASE_LINES)
        })
        _common.search_inSubContainer(cnt.uuid.BASE_LINES,BASELINE_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.BASE_LINES,app.GridCells.REMARK,BASELINE_REMARK_DESC)
     
    });
   
    after(() => {
      cy.LOGOUT();
      })    
});
