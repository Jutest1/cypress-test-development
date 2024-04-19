import { _projectPage, _common, _estimatePage, _validate, _mainView, _boqPage, _bidPage, _saleContractPage, _modalView, _salesPage, _wipPage, _package } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import CommonLocators from "cypress/locators/common-locators";

const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const PACKAGEDESC = "LineDesc_" + Cypress._.random(0, 999);
const REMARK = "REMARK-" + Cypress._.random(0, 999);

let PROJECTS_PARAMETERS: DataCells

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.73 | Change Project document status in Package module")

describe("PCM- 1.73 | Change Project document status in Package module", () => {
    before(function () {
        cy.fixture("procurement-and-bpm/pcm-1.73-change-project-document-status-in-package-module.json").then((data) => {
            this.data = data
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.TabBar.PROJECT).then(() => {
                _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
            cy.SAVE();
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        })
    })

    after(() => {
        cy.LOGOUT();
    });

    it('TC - Create  package', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART).search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        cy.wait(1000) //required wait to load page
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE)
        })
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(commonLocators.CommonKeys.MATERIAL, PACKAGEDESC)
        cy.SAVE()
        cy.wait(1000) //required wait to load page
    });

    it("TC - Assertion-1 Add single record in document project and change status with remark", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT)
        })
        cy.wait(2000) //required wait to load page
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        cy.wait(2000) //required wait to load page
        cy.SAVE()
        _common.select_allContainerData(cnt.uuid.PROJECT_DOCUMENTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD).search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS)
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED, REMARK)
    });

    it("TC - Assertion-3 Verying the added remark ", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT)
        })
        _common.select_allContainerData(cnt.uuid.PROJECT_DOCUMENTS)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS)
        cy.wait(1000) //required wait to load page
        _common.clickOn_modalFooterButton(commonLocators.CommonKeys.HISTORY)
        _common.clickOn_cellHasValue_fromModal(app.GridCells.REMARK, REMARK)
        _common.assert_cellDataByContent_fromModal(app.GridCells.REMARK, REMARK)
        _common.clickOn_modalFooterButton(btn.ButtonText.CLOSE)
    });

    it("TC - Assertion-2 Add multiple record in document project and change status with remark", function () {
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_DOCUMENTS, app.FooterTab.DOCUMENTS_PROJECT)
        })
        _common.create_newRecord(cnt.uuid.PROJECT_DOCUMENTS)
        _common.select_allContainerData(cnt.uuid.PROJECT_DOCUMENTS)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_PROJECT_DOCUMENTS_STATUS)
        cy.wait(1000) //required wait to load page
        _common.changeStatus_ofMultipleRecord_fromModal(CommonLocators.CommonKeys.NEW)
        cy.wait(1000) //required wait to load page
        _common.clickOn_modalFooterButton(btn.ButtonText.CLOSE)
        _common.waitForLoaderToDisappear()
    })
})

