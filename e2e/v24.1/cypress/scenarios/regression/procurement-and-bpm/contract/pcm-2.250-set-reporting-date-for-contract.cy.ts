import AppLayout from "cypress/locators/app-layout";
import { _modalView, _rfqPage, _bidPage, _billPage, _boqPage, _common, _estimatePage, _package, _projectPage, _saleContractPage, _salesPage, _validate, _wipPage, _materialPage, _controllingUnit, _procurementPage, _procurementContractPage } from "cypress/pages";
import { SalesPage } from "cypress/pages/module/sales/sales/sales-page";
import { tile, cnt, app, btn, commonLocators, sidebar } from "cypress/locators";
import cypress from "cypress";
import { DataCells } from "cypress/pages/interfaces";
const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"
const CONTRACT_3 = "CONTRACT_3"
const CONTRACT_2 = "CONTRACT_3"

let CREATE_PROJECT_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_CONTRACT

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.250 | Set reporting date for contract");
describe("PCM- 2.250 | Set reporting date for contract", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.250-set-reporting-date-for-contract.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_CONTRACT = this.data.CONTAINERS.CONTRACT
            CREATE_PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            }
        });
        cy.preLoading(Cypress.env("adminUserName"), Cypress.env("adminPassword"), Cypress.env("parentCompanyName"), Cypress.env("childCompanyName"));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
    });

    it('TC - Create new project', function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(CREATE_PROJECT_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.wait(2000) // required wait
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem().search_fromSidebar(commonLocators.CommonKeys.STANDARD, PRJ_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
    })

    it("TC - Create new contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _materialPage.enterRecord_toCreateContract(CONTAINER_CONTRACT.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Create 2nd contract", function () {
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _materialPage.enterRecord_toCreateContract(CONTAINER_CONTRACT.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PART_DELIVERED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, CONTRACT_2)
    });

    it("TC - Create 3rd contract", function () {
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _materialPage.enterRecord_toCreateContract(CONTAINER_CONTRACT.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        _common.edit_containerCell(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DATE_REPORTED, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CONTRACT.REPORTED_DATE_1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.PART_DELIVERED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, CONTRACT_3)
    });

    it("TC - Set Reporting date", function () {
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        });
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.SET_REPORTING_DATE);
        _procurementContractPage.enterRecord_toSetReportingDate(CONTAINER_CONTRACT.REPORTED_DATE_2, commonLocators.CommonKeys.RECORDED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.SET_REPORTING_DATE);
        _procurementContractPage.enterRecord_toSetReportingDate(CONTAINER_CONTRACT.REPORTED_DATE_3, commonLocators.CommonKeys.PART_DELIVERED)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify Reported Date", function () {
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONSTATUS_FK, commonLocators.CommonKeys.RECORDED)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DATE_REPORTED, CONTAINER_CONTRACT.REPORTED_DATE_2)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env(CONTRACT_2))
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DATE_REPORTED, CONTAINER_CONTRACT.REPORTED_DATE_3)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, Cypress.env(CONTRACT_3))
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.DATE_REPORTED, CONTAINER_CONTRACT.REPORTED_DATE_3)
    });


});
