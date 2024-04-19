import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';

const PRJ_NO = "PR-TK-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR-TK-" + Cypress._.random(0, 999)
const ACTIONS_CODE = 'ACT-' + Cypress._.random(0, 999);
const ACTIONS_DESC = 'ACTD-' + Cypress._.random(0, 999);
const ACTION_TY='ATY-' + Cypress._.random(0, 999);
const BASE_RATE='BA-' + Cypress._.random(0, 999);
const SURCHANGE_RATE='SR-' + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let PROJECT_PARAMETERS: DataCells
let CONTAINER_COLUMNS_ACTIONS,CONTAINER_COLUMNS_PROJECT 
let CONTAINERS_ACTIONS,CONTAINERS_DATA_TYPES,CONTAINERS_PROJECT,ACTIONS_PARAMETERS:DataCells

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.19 | Create Project Action in Project module");

describe("ETK- 1.19 | Create Project Action in Project module", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.19-create-project-action-in-project-module.json").then((data) => {
            this.data = data;
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
            },

            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES
            CONTAINER_COLUMNS_ACTIONS = this.data.CONTAINER_COLUMNS.ACTIONS;
            CONTAINERS_ACTIONS = this.data.CONTAINERS.ACTIONS;
            ACTIONS_PARAMETERS = {
                [app.GridCells.CODE]: ACTIONS_CODE,
                [app.GridCells.DESCRIPTION]: ACTIONS_DESC,
                [app.GridCells.ACTION_TYPE_FK]:ACTION_TY,
                [app.GridCells.IS_ACTIVE]:CONTAINERS_ACTIONS.CHECKBOX
            }
           
        })

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
      
    });

    it("TC - Create Data records", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.ACTION_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.ACTION_TYPE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1);
        })
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.DATA_RECORDS,app.GridCells.CONTEXT_FK,commonLocators.CommonKeys.LIST,CONTAINERS_DATA_TYPES.CONTEXT)
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,ACTION_TY)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS,ACTION_TY)
        cy.wait(1000) // Required wait to execute the Result
        _common.assert_cellData(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,ACTION_TY)
        _common.waitForLoaderToDisappear()
       
    })
    
    it("TC - Create New Project & Pin it", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROJECTS, CONTAINER_COLUMNS_PROJECT)
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
    })
   
    it("TC - Create Actions Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NO).pinnedItem();
        _common.waitForLoaderToDisappear() 
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_ACTIONS, app.FooterTab.ACTIONS, 1);
            _common.setup_gridLayout(cnt.uuid.PROJECT_ACTIONS, CONTAINER_COLUMNS_ACTIONS)
        })
       _common.waitForLoaderToDisappear()
       _common.create_newRecord(cnt.uuid.PROJECT_ACTIONS);
       _common.waitForLoaderToDisappear()
       _timekeepingPage.enterRecord_toCreateActions(ACTIONS_PARAMETERS)
       _common.waitForLoaderToDisappear()
       cy.SAVE()
       _common.waitForLoaderToDisappear()
       _common.search_inSubContainer(cnt.uuid.PROJECT_ACTIONS,ACTIONS_CODE)
       cy.wait(1000) // Required wait to execute the Result
       _common.assert_cellData(cnt.uuid.PROJECT_ACTIONS,app.GridCells.CODE,ACTIONS_CODE)
       _common.assert_cellData(cnt.uuid.PROJECT_ACTIONS,app.GridCells.DESCRIPTION,ACTIONS_DESC)

    })
  
})

    after(() => {
        cy.LOGOUT();
    });
