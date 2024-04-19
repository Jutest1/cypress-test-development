import { _common, _controllingUnit, _package, _projectPage, _sidebar, _estimatePage, _boqPage, _mainView, _modalView, _validate, _rfqPage, _saleContractPage, _procurementPage, _salesPage } from "cypress/pages";
import { cnt, tile, app, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();

const PACKAGEDESC = "PKGDESC-1" + Cypress._.random(0, 999);
const PACKAGEDESC2 = "PKGDESC-1" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS";

let PROJECTS_PARAMETERS: DataCells

let CONTAINER_COLUMNS_PACKAGE
let CONTAINER_PACKAGE
let CONTAINER_COLUMNS_RFQ
let CONTAINER_RFQ

allure.epic("PROCUREMENT AND BPM");
allure.feature("Package");
allure.story("PCM- 1.32 | Price comparison BOQ-Use package code, procurement structure etc. to find RfQs");
describe("PCM- 1.32 | Price comparison BOQ-Use package code, procurement structure etc. to find RfQs", () => {
    before(function () {
        cy.fixture("pcm/pcm-1.32-price-comparison-boq-use-package-code-procurement-structure-etc-to-find-rfqs.json").then((data) => {
            this.data = data
            CONTAINER_COLUMNS_PACKAGE = this.data.CONTAINER_COLUMNS.PACKAGE
            CONTAINER_PACKAGE = this.data.CONTAINERS.PACKAGE
            CONTAINER_RFQ = this.data.CONTAINERS.RFQ
            CONTAINER_COLUMNS_RFQ = this.data.CONTAINER_COLUMNS.RFQ
            PROJECTS_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME,
            }
            cy.preLoading(
                Cypress.env("adminUserName"),
                Cypress.env("adminPassword"),
                Cypress.env("parentCompanyName"),
                Cypress.env("childCompanyName")
            );
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

    it('TC - Create Packages directly from Package module', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PACKAGE);
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.PACKAGE).then(() => {
            _common.setDefaultView(app.TabBar.PACKAGE)
            _common.select_tabFromFooter(cnt.uuid.PACKAGE, app.FooterTab.PACKAGE, 1);
            _common.setup_gridLayout(cnt.uuid.PACKAGE, CONTAINER_COLUMNS_PACKAGE)
        });
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE, PACKAGEDESC)
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, "PKGCODE1")
        _common.create_newRecord(cnt.uuid.PACKAGE)
        _package.enterRecord_toCreatePackage(CONTAINER_PACKAGE.PROCUREMENT_STRUCTURE, PACKAGEDESC2)
        cy.SAVE()
        _common.saveCellDataToEnv(cnt.uuid.PACKAGE, app.GridCells.CODE, "PKGCODE2")
    })

    it('TC - Verify create Requisition for Quote', function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE, app.GridCells.DESCRIPTION, PACKAGEDESC)
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_RFQ)
        cy.wait(3000) //required wait to load page
        _rfqPage.createRequestForCode_fromWizard("Business Partner", CONTAINER_RFQ.BUSINESS_PARTNER_1, "")
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_RFQ)
        cy.wait(3000) //required wait to load page
        _common.openTab(app.TabBar.RFQ).then(() => {
            _common.select_tabFromFooter(cnt.uuid.REQUEST_FOR_QUOTE, app.FooterTab.RFQ, 0);
        });
        _common.maximizeContainer(cnt.uuid.REQUEST_FOR_QUOTE)
        _salesPage.navigate_toContainer_usingGoToButtonInBills(cnt.uuid.REQUEST_FOR_QUOTE, CONTAINER_PACKAGE.PACKAGE)
        cy.wait(3000) //required wait to load page
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PACKAGE, app.GridCells.DESCRIPTION, PACKAGEDESC2)
        cy.REFRESH_CONTAINER()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CREATE_RFQ)
        _rfqPage.createRequestForCode_fromWizard(CONTAINER_PACKAGE.BUSINESS_PARTNER, CONTAINER_RFQ.BUSINESS_PARTNER_2, "")
        _modalView.findModal().acceptButton(btn.ButtonText.GO_TO_RFQ)
        cy.wait(2000) //required wait to load page
    })

    it('TC - Search record by using Sidebar search,Column filter', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PRICE_COMPARISON);
        cy.wait(2000) //required wait to load page
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.setDefaultView(app.TabBar.PRICECOMPARISON)
            _common.select_tabFromFooter(cnt.uuid.RFQPRICE_COMPARISON, app.FooterTab.RFQ, 0);
            _common.setup_gridLayout(cnt.uuid.RFQPRICE_COMPARISON, CONTAINER_COLUMNS_RFQ)
        })
        cy.REFRESH_CONTAINER().then(() => {
            _common.saveCellDataToEnv(cnt.uuid.RFQPRICE_COMPARISON, app.GridCells.CODE, "RFQCODE1")
        })
    })

    it('TC - Search record by using Sidebar search,Column filter part 2', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("RFQCODE1"))
        cy.wait(1000)//required wait to load page
        _common.openTab(app.TabBar.PRICECOMPARISON).then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.RFQPRICE_COMPARISON, app.GridCells.CODE, Cypress.env("RFQCODE1"))
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH)
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, " ")
            cy.wait(1000)//required wait to load page
            _common.openTab(app.TabBar.PRICECOMPARISON)
            _package.searchRecord_byColumnFilter(cnt.uuid.RFQPRICE_COMPARISON, app.GridCells.PACKAGE_NUMBER, app.InputFields.DOMAIN_TYPE_TEXT, Cypress.env("PKGCODE2"))
            cy.wait(1000)//required wait to load page
            _common.assert_cellData_insideActiveRow(cnt.uuid.RFQPRICE_COMPARISON, app.GridCells.PACKAGE_NUMBER, Cypress.env("PKGCODE2"))
            _package.searchRecord_byColumnFilter(cnt.uuid.RFQPRICE_COMPARISON, app.GridCells.CODE, app.InputFields.DOMAIN_TYPE_TEXT, Cypress.env("RFQCODE1"))
            cy.wait(1000)//required wait to load page
            _common.assert_cellData_insideActiveRow(cnt.uuid.RFQPRICE_COMPARISON, app.GridCells.CODE, Cypress.env("RFQCODE1"))
        })
    })
});
