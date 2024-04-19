import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';


const WORKING_TI_MOD_DESC='WTM-' + Cypress._.random(0, 999);
const ALLURE = Cypress.Allure.reporter.getInterface();

let CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS,CONTAINER_COLUMNS_WORKING_TIME_MODELS
let CONTAINERS_WORKING_TIME_MODELS,CONTAINERS_WORKING_TIME_MODEL_DAYS
let WORKING_TIME_MODELS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_1:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_2:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_3:DataCells,WORKING_TIME_MODEL_DAYS_PARAMETERS_4:DataCells

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.12 | Create working time model ");

describe("ETK- 1.12 | Create working time model ", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.12-create-working-time-model.json").then((data) => {
            this.data = data;
            
            CONTAINER_COLUMNS_WORKING_TIME_MODELS=this.data.CONTAINER_COLUMNS.WORKING_TIME_MODELS
            CONTAINERS_WORKING_TIME_MODELS=this.data.CONTAINERS.WORKING_TIME_MODELS
            WORKING_TIME_MODELS_PARAMETERS={
                [app.GridCells.IS_DEFAULT]: CONTAINERS_WORKING_TIME_MODELS.CHECKBOX,
                [app.GridCells.DESCRIPTION_INFO]: WORKING_TI_MOD_DESC,
                [app.GridCells.WEEK_ENDS_ON]: CONTAINERS_WORKING_TIME_MODELS.WEEKENDSON,


            },
            CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS=this.data.CONTAINER_COLUMNS.WORKING_TIME_MODEL_DAYS
            CONTAINERS_WORKING_TIME_MODEL_DAYS=this.data.CONTAINERS.WORKING_TIME_MODEL_DAYS
            WORKING_TIME_MODEL_DAYS_PARAMETERS={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[0],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS
            },
            WORKING_TIME_MODEL_DAYS_PARAMETERS_1={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[1],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS,
            },
            WORKING_TIME_MODEL_DAYS_PARAMETERS_2={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[2],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS,
            },
            WORKING_TIME_MODEL_DAYS_PARAMETERS_3={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[3],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS,
            },
            WORKING_TIME_MODEL_DAYS_PARAMETERS_4={
                [app.GridCells.WEEK_DAY_INDEX]: CONTAINERS_WORKING_TIME_MODEL_DAYS.WEEKDAY[4],
                [app.GridCells.TARGET_HOURS]: CONTAINERS_WORKING_TIME_MODEL_DAYS.TARGET_HRS,
            }
            
        })
        
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
       
    });
    
    it("TC - Create Working time model and add working time model days", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.WORKING_TIME_MODEL)
        _common.openTab(app.TabBar. WORKTIMEMODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WORKING_TIME_MODELS, app.FooterTab.WORKING_TIME_MODELS, 0);
            _common.setup_gridLayout(cnt.uuid.WORKING_TIME_MODELS, CONTAINER_COLUMNS_WORKING_TIME_MODELS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODELS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModels(WORKING_TIME_MODELS_PARAMETERS)
        cy.SAVE()
        _common.search_inSubContainer(cnt.uuid.WORKING_TIME_MODELS,WORKING_TI_MOD_DESC)
        _common.waitForLoaderToDisappear()
        _common.select_rowInSubContainer(cnt.uuid.WORKING_TIME_MODELS)
        cy.wait(1000) // Required wait to get result
        _common.assert_cellData(cnt.uuid.WORKING_TIME_MODELS,app.GridCells.DESCRIPTION_INFO,WORKING_TI_MOD_DESC)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar. WORKTIMEMODEL).then(() => {
            _common.select_tabFromFooter(cnt.uuid.WORKING_TIME_MODEL_DAYS, app.FooterTab.WORKING_TIME_MODEL_DAYS, 1);
            _common.setup_gridLayout(cnt.uuid.WORKING_TIME_MODEL_DAYS, CONTAINER_COLUMNS_WORKING_TIME_MODEL_DAYS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_3)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.WORKING_TIME_MODEL_DAYS)
        _timekeepingPage.enterRecord_toCreateWorkingTimeModelDays(WORKING_TIME_MODEL_DAYS_PARAMETERS_4)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
   
})
    after(() => {
        cy.LOGOUT();
    });
