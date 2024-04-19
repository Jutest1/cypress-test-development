import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package, _rfqPage, _procurementPage, _projectPage } from "cypress/pages";
import { DataCells } from "cypress/pages/interfaces";
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"

const SEARCHFORM = "SEARCHFORM-" + Cypress._.random(0, 999);
const SEARCHDESC = "TEST-" + Cypress._.random(0, 999);
const FILTERNAME = "FILTERNAME-" + Cypress._.random(0, 999);
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() +1;
const currentYear = today.getFullYear();
const TodaysDate = `${currentDay.toString().padStart(2,"0")}/${currentMonth.toString().padStart(2,"0")}/${currentYear.toString()}`
const allure = Cypress.Allure.reporter.getInterface();
let REQUISITION_PARAMETERS: DataCells;
let CONTAINERS_REQUISITION;
let CONTAINER_COLUMNS_REQUISITION;
let PROJECTS_PARAMETERS
allure.epic("PROCUREMENT AND BPM");
allure.feature("Requisition");
allure.story("PCM- 2.163 | Find Requisition")
describe("PCM- 2.163 | Find Requisition", () => {
    beforeEach(function () {
        cy.fixture("pcm/pcm-2.163-find-requisition.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.fixture("pcm/pcm-2.163-find-requisition.json").then((data) => {
            this.data = data;
            CONTAINERS_REQUISITION = this.data.CONTAINERS.REQUISITION;
            CONTAINER_COLUMNS_REQUISITION = this.data.CONTAINER_COLUMNS.REQUISITION

            REQUISITION_PARAMETERS = {
                [commonLocators.CommonLabels.CONFIGURATION]: CONTAINERS_REQUISITION.CONFIGURATION,
            }
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
              }
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
              });
              _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
              _common.waitForLoaderToDisappear()
              _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
              _common.create_newRecord(cnt.uuid.PROJECTS);
              _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
              cy.SAVE();
              _common.waitForLoaderToDisappear()
              _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
              _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
                  })
    });
    it("TC - Create Requisition", function () {
      
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.REQUISITION);
        _common.openTab(app.TabBar.MAIN).then(() => {
            _common.setDefaultView(app.TabBar.MAIN)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.REQUISITIONS, app.FooterTab.REQUISITIONS, 0);
            _common.setup_gridLayout(cnt.uuid.REQUISITIONS, CONTAINER_COLUMNS_REQUISITION);
        });
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.maximizeContainer(cnt.uuid.REQUISITIONS)
        _common.create_newRecord(cnt.uuid.REQUISITIONS);
        _procurementPage.enterRecord_toCreateNewRequisition(cnt.uuid.REQUISITIONS, REQUISITION_PARAMETERS);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
        _common.clickOn_activeRowCell(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_REQUISITION.BP)
        cy.wait(1000)
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.REQUISITIONS, app.GridCells.CODE, "REQCODE")
        _common.minimizeContainer(cnt.uuid.REQUISITIONS)


    })
    it("TC - Verify search record using standard search,Enhanced search,Search form", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("REQCODE"));
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.CODE, Cypress.env("REQCODE"))
        _validate.verify_enhancedSearch(sidebar.SideBarOptions.BUSINESS_PARTNER, CONTAINERS_REQUISITION.NAME, CONTAINERS_REQUISITION.BP, FILTERNAME)
        cy.wait(1000)
        _common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BP)
        _validate.verify_createSearchForm(SEARCHDESC, SEARCHFORM, CONTAINERS_REQUISITION.BP)
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS, app.GridCells.BUSINESS_PARTNER_FK, CONTAINERS_REQUISITION.BP)
        cy.wait(1000)
    })

    it("TC- Verify Edit search form and search by date",function(){
        _validate.verify_editTheCurrentSearchForm(SEARCHFORM,CONTAINERS_REQUISITION.BP2)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS,app.GridCells.BUSINESS_PARTNER_FK,CONTAINERS_REQUISITION.BP2)
        _validate.verify_searchByDate(sidebar.SideBarOptions.DATA_RECEIVED,CONTAINERS_REQUISITION.TODAY)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.REQUISITIONS,app.GridCells.DATE_RECEIVED,TodaysDate)
    })
    after(() => {
        cy.LOGOUT();
    });
})
