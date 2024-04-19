import { _common, _estimatePage, _controllingUnit,_projectPage,_mainView, _modalView, _schedulePage, _sidebar, _validate, _timekeepingPage } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts';

import { TimekeepingPage } from 'cypress/pages/module/timekeeping/timekeeping-page';

const PRJ_NO = "PR-TK-" + Cypress._.random(0, 999)
const PRJ_NAME = "PR-TK-" + Cypress._.random(0, 999)
const TIME_SYM_CODE='TS-' + Cypress._.random(0, 999);
const TIME_SYM_TYP_DESC='TST-' + Cypress._.random(0, 999);
const TIME_SYM_GRP_DESC='TSG-' + Cypress._.random(0, 999);

const ALLURE = Cypress.Allure.reporter.getInterface();

let PROJECT_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_PROJECT,CONTAINERS_PROJECT
let CONTAINERS_DATA_TYPES;
let CONTAINER_COLUMNS_TIME_SYMBOLS,
    TIME_SYMBOLS_PARAMETERS

ALLURE.epic("TIME KEEPING");
ALLURE.feature("Time Keeping");
ALLURE.story("ETK- 1.4 | Create time symbol group and time symbol type");

describe("ETK- 1.4 | Create time symbol group and time symbol type", () => {

    before(function () {
        cy.fixture("time-keeping/etk-1.4-create-time-symbol-group-and-time-symbol-type.json").then((data) => {
            this.data = data;
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT
            CONTAINER_COLUMNS_PROJECT = this.data.CONTAINER_COLUMNS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
            }

            CONTAINERS_DATA_TYPES = this.data.CONTAINERS.DATA_TYPES

            CONTAINER_COLUMNS_TIME_SYMBOLS = this.data.CONTAINER_COLUMNS.TIME_SYMBOLS
            TIME_SYMBOLS_PARAMETERS = {
                [app.GridCells.CODE]: TIME_SYM_CODE,
                [app.GridCells.TIME_SYMBOL_GROUP_FK]: TIME_SYM_GRP_DESC,
                [app.GridCells.TIME_SYMBOL_TYPE_FK]: TIME_SYM_TYP_DESC
            } 
        })

        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
    }) 
          
    it("TC - Create New Project & Pin it", function () {
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

    it("TC - Create Data records", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIME_SYMBOL_GROUP)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIME_SYMBOL_GROUP)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1);
        })
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TIME_SYM_GRP_DESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES, 0);
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIME_SYMBOL_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES,CONTAINERS_DATA_TYPES.TIME_SYMBOL_TYPE)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS, 1);
        })
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.DATA_RECORDS,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,TIME_SYM_TYP_DESC)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        
    })

    it("TC - Verify time symbol group and time symbol type", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.TIME_SYSBOLS)
        _common.openTab(app.TabBar.TIME_SYMBOLS).then(() => {
            _common.select_tabFromFooter(cnt.uuid.TIME_SYMBOLS, app.FooterTab.TIME_SYMBOLS, 0);
            _common.setup_gridLayout(cnt.uuid.TIME_SYMBOLS, CONTAINER_COLUMNS_TIME_SYMBOLS)
        })
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.TIME_SYMBOLS)
        cy.wait(1000)
        _timekeepingPage.enterRecord_toCreateTimeSymbols(TIME_SYMBOLS_PARAMETERS)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithCaret(cnt.uuid.TIME_SYMBOLS, app.GridCells.TIME_SYMBOL_TYPE_FK, commonLocators.CommonKeys.LIST,TIME_SYM_TYP_DESC);
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.TIME_SYMBOLS,app.GridCells.TIME_SYMBOL_GROUP_FK,TIME_SYM_GRP_DESC)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData(cnt.uuid.TIME_SYMBOLS,app.GridCells.TIME_SYMBOL_TYPE_FK,TIME_SYM_TYP_DESC)
        _common.waitForLoaderToDisappear()
    })
})  
    after(() => {
        cy.LOGOUT();
    })
