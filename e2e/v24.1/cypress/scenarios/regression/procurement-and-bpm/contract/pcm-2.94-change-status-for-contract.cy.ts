import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _package, _controllingUnit, _validate, _rfqPage, _materialPage } from "cypress/pages";
import { tile, app, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { randomNo } from "cypress/commands/integration";
import _ from "cypress/types/lodash";
import { DataCells } from "cypress/pages/interfaces";
import Buttons from "cypress/locators/buttons";

const allure = Cypress.Allure.reporter.getInterface();

const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"

let CREATE_PROJECT_PARAMETERS: DataCells;
let CONTAINER_COLUMNS_CONTRACT;
let CONTAINER_CONTRACT

allure.epic("PROCUREMENT AND BPM");
allure.feature("Contract");
allure.story("PCM- 2.94 | Change status for contract");
describe("PCM- 2.94 | Change status for contract", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.94-change-status-for-contract.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
            CONTAINER_CONTRACT = this.data.CONTAINERS.CONTRACT
            CREATE_PROJECT_PARAMETERS = {
                [commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NO,
                [commonLocators.CommonLabels.NAME]: PRJ_NAME,
                [commonLocators.CommonLabels.CLERK]: CLERK_NAME
            }
        })
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

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Create new contract", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
            cy.REFRESH_SELECTED_ENTITIES()
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _materialPage.enterRecord_toCreateContract(CONTAINER_CONTRACT.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify it allows to change one record by wizard at one time", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
        cy.wait(2000)
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CONSTATUS_FK, commonLocators.CommonKeys.APPROVED)
        _common.delete_recordFromContainer(cnt.uuid.PROCUREMENTCONTRACT)
        _common.clickOn_modalFooterButton(btn.ButtonText.YES)
    });

    it("TC - Verify it allows to change multiple records by wizard at one time;", function () {
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toCreateContract(CONTAINER_CONTRACT.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify it allows to add message to history by wizard;", function () {
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _common.waitForLoaderToDisappear()
        _materialPage.enterRecord_toCreateContract(CONTAINER_CONTRACT.BUSINESS_PARTNER)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.changeStatus_fromModal(commonLocators.CommonKeys.APPROVED, CONTAINER_CONTRACT.REMARK)
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
        _common.search_fromSidebar(commonLocators.CommonKeys.WIZARD, sidebar.SideBarOptions.CHANGE_CONTRACT_STATUS);
        _common.waitForLoaderToDisappear()
        _common.clickOn_modalFooterButton(Buttons.ButtonText.HISTORY)
        _common.clickOn_cellHasValue_fromModal(app.GridCells.NEW_STATUS, commonLocators.CommonKeys.APPROVED)
        _common.assert_cellDataByContent_fromModal(app.GridCells.REMARK, CONTAINER_CONTRACT.REMARK)
        _common.clickOn_modalFooterButton(Buttons.ButtonText.CLOSE)
    });
});

