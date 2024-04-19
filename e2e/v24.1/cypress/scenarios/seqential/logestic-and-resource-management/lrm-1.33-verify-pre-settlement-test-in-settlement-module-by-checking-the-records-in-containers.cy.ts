
import { tile, app, cnt, commonLocators, sidebar, btn } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO = "PRJ" + Cypress._.random(0, 999);
const PROJECT_DESC = "TEST-PRJ-" + Cypress._.random(0, 999);

let MODAL_PROJECTS
let PROJECTS_PARAMETERS:DataCells


// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("Plant Master Data in Life Cycle");
ALLURE.story("LRM- 1.33 | Verify pre settlement test in settlement module by checking the records in containers");

describe("LRM- 1.33 | Verify pre settlement test in settlement module by checking the records in containers", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.33-verify-pre-settlement-test-in-settlement-module-by-checking-the-records-in-containers.json").then((data) => {
            this.data = data;
            MODAL_PROJECTS=this.data.MODAL.PROJECTS
            PROJECTS_PARAMETERS={
              [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
              [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
              [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
            }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.setDefaultView(app.TabBar.PROJECT)
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            _common.waitForLoaderToDisappear()
            cy.SAVE();          
            _common.waitForLoaderToDisappear()
        });    
    })
    after(() => {
        cy.LOGOUT();
    });

    it('TC - Check if data is present in the container after clicking refresh button', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,sidebar.SideBarOptions.SETTLEMENT)
        _common.openTab(app.TabBar.SETTLEMENT).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.POSTED_DISPATCH_NOTES_NOT_READY_FOR_SETTLEMENT, app.FooterTab.POSTED_DISPATCH_NOTES_NOT_READY_FOR_SETTLEMENT, 0);
            _common.clear_subContainerFilter(cnt.uuid.POSTED_DISPATCH_NOTES_NOT_READY_FOR_SETTLEMENT)
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolBarButtonWithTitle(cnt.uuid.POSTED_DISPATCH_NOTES_NOT_READY_FOR_SETTLEMENT, btn.ButtonText.LOAD_UNSETTLED_DISPATCH_NOTES)
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.SETTLEMENT).then(() => {
            _common.set_containerLayoutUnderEditView(CommonLocators.CommonKeys.LAYOUT_1)
            _common.select_tabFromFooter(cnt.uuid.LOGISTIC_JOB_WITH_NEGATIVE_QUANTITY_FOR_BULK, app.FooterTab.LOGISTIC_JOB_WITH_NEGATIVE_QUANTITY_FOR_BULK, 1);
            _common.clear_subContainerFilter(cnt.uuid.LOGISTIC_JOB_WITH_NEGATIVE_QUANTITY_FOR_BULK)
        });
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolBarButtonWithTitle(cnt.uuid.LOGISTIC_JOB_WITH_NEGATIVE_QUANTITY_FOR_BULK, btn.ButtonText.REFRESH)
        _common.waitForLoaderToDisappear()
    })   
});
