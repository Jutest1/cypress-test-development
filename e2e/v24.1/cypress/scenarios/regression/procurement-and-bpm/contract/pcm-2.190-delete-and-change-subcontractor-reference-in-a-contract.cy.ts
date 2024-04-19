import { _common, _projectPage, _bidPage, _saleContractPage, _procurementPage, _wipPage, _estimatePage, _boqPage, _mainView, _modalView, _salesPage, _billPage, _package, _wicpage, _procurementConfig, _rfqPage, _validate, _controllingUnit, _materialPage } from "cypress/pages";
import { app, tile, cnt, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();

const CONTRACT_CODE = 'CONTRACT_CODE'

let CONTAINERS_CONTRACT;
let CONTAINER_COLUMNS_CONTRACT
let CONTAINER_COLUMNS_SUBCONTRACTOR
let SUBCONTRACT_PARAMETER: DataCells
let SUBCONTRACT_UPDATE_PARAMETER: DataCells

ALLURE.epic("PROCUREMENT AND BPM");
ALLURE.feature("Contract");
ALLURE.story("PCM- 2.190 | Delete and change subcontractor reference in a contract");

describe("PCM- 2.190 | Delete and change subcontractor reference in a contract", () => {

    before(function () {
        cy.fixture("pcm/pcm-2.190-delete-and-change-subcontractor-reference-in-a-contract.json")
            .then((data) => {
                this.data = data;
                CONTAINERS_CONTRACT = this.data.CONTAINERS.CONTRACT
                CONTAINER_COLUMNS_CONTRACT = this.data.CONTAINER_COLUMNS.CONTRACT
                CONTAINER_COLUMNS_SUBCONTRACTOR = this.data.CONTAINER_COLUMNS.SUBCONTRACTOR
                SUBCONTRACT_PARAMETER = {
                    [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_CONTRACT.STRUCTURE_SERVICE,
                    [app.GridCells.BPD_BUSINESS_PARTNER_FK]: CONTAINERS_CONTRACT.BUSINESS_PARTNER
                }
                SUBCONTRACT_UPDATE_PARAMETER = {
                    [app.GridCells.PRC_STRUCTURE_FK]: CONTAINERS_CONTRACT.STRUCTURE_MATERIAL,
                    [app.GridCells.BPD_BUSINESS_PARTNER_FK]: CONTAINERS_CONTRACT.BUSINESS_PARTNER_1
                }
                cy.preLoading(
                    Cypress.env("adminUserName"),
                    Cypress.env("adminPassword"),
                    Cypress.env("parentCompanyName"),
                    Cypress.env("childCompanyName"));
                _common.openDesktopTile(tile.DesktopTiles.PROJECT);
                _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
                _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env('PROJECT_NUMBER')).pinnedItem();
            });
    });

    after(() => {
    cy.LOGOUT();
    });

    it("TC - Create contract new record", function () {

        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CONTRACT);
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.setDefaultView(app.TabBar.CONTRACT)
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
            _common.setup_gridLayout(cnt.uuid.PROCUREMENTCONTRACT, CONTAINER_COLUMNS_CONTRACT)
        })
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.PROCUREMENTCONTRACT);
        _materialPage.enterRecord_toCreateContract(CONTAINERS_CONTRACT.BUSINESS_PARTNER)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        cy.wait(2000) //required wait
        _common.waitForLoaderToDisappear()
        _common.saveCellDataToEnv(cnt.uuid.PROCUREMENTCONTRACT, app.GridCells.CODE, CONTRACT_CODE)
        _common.waitForLoaderToDisappear()
    });

    it("TC - Verify create and update subcontractor", function () {

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE))
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 1);
            _common.setup_gridLayout(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINER_COLUMNS_SUBCONTRACTOR)
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.create_newRecord(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _procurementPage.enterRecord_toCreateSubcontractor(cnt.uuid.CONTRACT_SUBCONTRACTOR, SUBCONTRACT_PARAMETER)
        _common.clickOn_activeRowCell(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_CONTACT_FK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE))
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 1);
        });
        _common.maximizeContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.clear_subContainerFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.search_inSubContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINERS_CONTRACT.BUSINESS_PARTNER)
        _procurementPage.enterRecord_toCreateSubcontractor(cnt.uuid.CONTRACT_SUBCONTRACTOR, SUBCONTRACT_UPDATE_PARAMETER)
        _common.clickOn_activeRowCell(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_CONTACT_FK)
        _common.waitForLoaderToDisappear()
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.minimizeContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE))
        _common.maximizeContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.clear_subContainerFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.search_inSubContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.BPD_BUSINESS_PARTNER_FK, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
        cy.REFRESH_SELECTED_ENTITIES().then(() => {
            _common.assert_cellData_insideActiveRow(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.GridCells.PRC_STRUCTURE_FK, CONTAINERS_CONTRACT.STRUCTURE_MATERIAL)
        })
        _common.minimizeContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
    })

    it("TC - Verify delete subcontractor", function () {

        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE))
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.search_inSubContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
        _common.delete_recordFromContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROCUREMENTCONTRACT, app.FooterTab.CONTRACTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROCUREMENTCONTRACT)
        _common.search_inSubContainer(cnt.uuid.PROCUREMENTCONTRACT, Cypress.env(CONTRACT_CODE))
        _common.openTab(app.TabBar.CONTRACT).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTRACT_SUBCONTRACTOR, app.FooterTab.SUBCONTRACTOR, 1);
        });
        _common.clear_subContainerFilter(cnt.uuid.CONTRACT_SUBCONTRACTOR)
        _common.search_inSubContainer(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
        _validate.verify_isRecordDeleted(cnt.uuid.CONTRACT_SUBCONTRACTOR, CONTAINERS_CONTRACT.BUSINESS_PARTNER_1)
    })

});