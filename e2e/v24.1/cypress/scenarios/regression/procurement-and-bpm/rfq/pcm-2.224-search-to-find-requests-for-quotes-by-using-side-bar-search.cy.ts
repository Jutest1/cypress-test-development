

import { commonLocators, tile, app, cnt, sidebar } from "cypress/locators";
import CommonLocators from "cypress/locators/common-locators";
import { _common, _projectPage, _validate } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";

const PRJ_NO = 'PRJ' + Cypress._.random(0, 999);
const PRJ_NAME = 'PRO' + Cypress._.random(0, 999);
const SEARCHFORM = "SEARCHFORM-" + Cypress._.random(0, 999);
const SEARCHDESC = "TEST-" + Cypress._.random(0, 999);
const AN_FILTERNAME = "FILTERNAME-" + Cypress._.random(0, 999);
const RFQDESC = "RFQDESC-" + Cypress._.random(0, 999);

let CONTAINERS_PROJECT;

let CONTAINER_COLUMNS_RFQ;

let PROJECT_PARAMETERS: DataCells;

const allure = Cypress.Allure.reporter.getInterface();
allure.epic("PROCUREMENT AND BPM");
allure.feature("RFQ");
allure.story("PCM- 2.224 | Search to find requests for quotes by using Side bar search ")
describe("PCM- 2.224 | Search to find requests for quotes by using Side bar search ", () => {

    before(function () {
        cy.fixture("procurement-and-bpm/pcm-2.224-search-to-find-requests-for-quotes-by-using-side-bar-search.json").then((data) => {
            this.data = data;
            CONTAINERS_PROJECT = this.data.CONTAINERS.PROJECT;
            PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CONTAINERS_PROJECT.CLERK_NAME
            };
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
        }).then(() => {
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS)
            })
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECT_PARAMETERS);
            cy.SAVE();
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
            _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
    });

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create RFQ header and do Standered search -Assertion 1", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(CommonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.RFQ);
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.setDefaultView(app.TabBar.RFQ)
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 1)
            _common.setup_gridLayout(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_COLUMNS_RFQ)
        })
        _common.clear_subContainerFilter(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.create_newRecord(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DESCRIPTION, app.InputFields.DOMAIN_TYPE_DESCRIPTION, RFQDESC)
        _common.enterRecord_inNewRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DATE_REQUESTED, app.InputFields.INPUT_GROUP_CONTENT, _common.getDate(CommonLocators.CommonKeys.CURRENT_SMALL))
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.PROJECT_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, PRJ_NO)
        cy.SAVE()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem();
        _common.search_fromSidebar(CommonLocators.CommonKeys.STANDARD, PRJ_NO)
        _common.select_rowInSubContainer(cnt.uuid.REQUEST_FOR_QUOTE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.PROJECT_FK, PRJ_NO)
    })

    it("TC - Performing Enhanced search with 2 search option -Assertion 2", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        cy.SAVE()
        _validate.verify_enhancedSearch(CommonLocators.CommonKeys.HEADER, CommonLocators.CommonLabels.DESCRIPTION, RFQDESC, AN_FILTERNAME)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.PROJECT_FK, PRJ_NO)
    })

    it("TC -  Edit search form -Assertion 3", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        cy.SAVE()
        _validate.verify_createSearchForm(SEARCHDESC, SEARCHFORM, RFQDESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.PROJECT_FK, PRJ_NO)
    })

    it("TC-  search by date -Assertion 4", function () {
        _validate.verify_searchByDate(CommonLocators.CommonKeys.DATE_REQUESTED, CommonLocators.CommonKeys.TODAY)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUEST_FOR_QUOTE, app.GridCells.DATE_REQUESTED, _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL))
    })
    
})