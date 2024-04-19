import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let CREATEPROJECT_PARAMETERS
let SCHEDULE_CONTAINER_DATATYPE

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCHE-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCHE-DESC-" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"


ALLURE.epic("SCHEDULING");
ALLURE.feature("Generate Schedule");
ALLURE.story("SCH- 3.25 | Create new Schedule");

describe("SCH- 3.25 | Create Schedule Sub Activity ", () => {
    before(function () {   
        cy.fixture("scheduling/sch-3.25-create-new-schedules.json").then((data) => {
            this.data = data
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         SCHEDULE_CONTAINER_DATATYPE = this.data.CONTAINERS.DATA_TYPES

          CREATEPROJECT_PARAMETERS = {
            [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NAME,
            [ commonLocators.CommonLabels.NAME] :PRJ_NAME,
            [ commonLocators.CommonLabels.CLERK] :CLERK_NAME 
            };

         SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
            [app.GridCells.CALENDAR_FK]:SCHEDULE_CONTAINER_DATATYPE.CALENDER,
            [app.GridCells.PERFORMANCE_SHEET]:SCHEDULE_CONTAINER_DATATYPE.PERFORMANCESHEET,
            [app.GridCells.CODE_FORMATE_FK]:SCHEDULE_CONTAINER_DATATYPE.CODEFORMATE,
            [app.GridCells.TARGET_START]:_common.getDate(commonLocators.CommonKeys.CURRENT),
            [app.GridCells.TARGET_END] :_common.getDate(commonLocators.CommonKeys.INCREMENTED,5)
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
             _common.create_newRecord(cnt.uuid.PROJECTS);
             _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);  
              cy.SAVE()
              _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NAME).pinnedItem(); 
            _common.waitForLoaderToDisappear()   
       })
    })
   
    it("TC - Create new schedule header and assert the header ", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
        _common.setDefaultView(app.TabBar.SCHEDULING)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
        _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.maximizeContainer(cnt.uuid.SCHEDULES)
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_REC_NEW)
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        _common.waitForLoaderToDisappear()
         cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.SCHEDULES,app.GridCells.DESCRIPTION_INFO,SCHEDULES_DESC)

    });
    it("TC - Verify finish the activity  by 100% progress check box is checked in  container", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {        
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES,2);            
        });        
        _common.set_cellCheckboxValue(cnt.uuid.SCHEDULES,app.GridCells.IS_ACTIVE,"check")
    })
    it("TC - Verify finish the activity  by 100% progress check box is checked in  container", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {        
        _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES,2);            
        });        
        _common.set_cellCheckboxValue(cnt.uuid.SCHEDULES,app.GridCells.IS_FINISHED_WITH100_PERCENT,"check")
        _common.minimizeContainer(cnt.uuid.SCHEDULES)
    })
    it("TC - Verify loctions in scheduling details container", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {        
        _common.select_tabFromFooter(cnt.uuid.SCHEDULE_DETAILS, app.FooterTab.SCHEDULE_DETAILS,1);            
        });        
        _validate.verify_isRecordInPresent_inContainersForm(cnt.uuid.SCHEDULE_DETAILS,commonLocators.CommonLabels.DESCRIPTION,commonLocators.CommonElements.DOMAIN_TYPE_TRANSLATION,SCHEDULES_DESC)      
    })
    after(() => {
        cy.LOGOUT();
    })
})