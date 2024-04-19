import { tile, app, cnt, commonLocators, sidebar } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const ALLURE = Cypress.Allure.reporter.getInterface();
const FIRMLYMOUNTED = "Firmly Mounted" + Cypress._.random(0, 999);
const PERFORMANCE = "Performance" + Cypress._.random(0, 999);
const BAL = "Bal" + Cypress._.random(0, 999);
const BULK = "Bulk" + Cypress._.random(0, 999);
const RENTEL = "Rental" + Cypress._.random(0, 999);

let CONTAINER_DATA_RECORD;
let CONTAINER_COLUMNS_DATA_TYPES;


// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
ALLURE.epic("LOGISTICS AND RESOURCE MANAGEMENT");
ALLURE.feature("System Setup");
ALLURE.story("LRM- 1.2 | Verify Adding New Plant Type In Customizing Module");

describe("LRM- 1.2 | Verify Adding New Plant Type In Customizing Module", () => {

    before(function () {
        cy.fixture("LRM/lrm-1.2-verify-adding-new-plant-type-in-customizing-module.json").then((data) => {
            this.data = data;
            CONTAINER_DATA_RECORD = this.data.CONTAINERS.DATA_RECORD;
            CONTAINER_COLUMNS_DATA_TYPES = this.data.CONTAINER_COLUMNS.DATA_TYPES;
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD, Cypress.env("PROJECT_NUMBER")).pinnedItem();
    })

    after(() => {
        cy.LOGOUT();
    });

    it("TC - Add Plant Type Data Record", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CUSTOMIZING)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_TYPES, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.DATA_TYPES, CONTAINER_COLUMNS_DATA_TYPES)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_TYPES)
        _common.search_inSubContainer(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_TYPE)
        _common.select_rowHasValue(cnt.uuid.DATA_TYPES, CONTAINER_DATA_RECORD.PLANT_TYPE)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, RENTEL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTER, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_BULK, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create Second Plant Type Data Record", function () {
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BAL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_BULK, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PERFORMANCE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_TIMEKEEPING, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, FIRMLYMOUNTED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTERED, commonLocators.CommonKeys.CHECK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Plant Type Record", function () {
        _common.openTab(app.TabBar.MASTERDATA).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, RENTEL)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, RENTEL)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTER, commonLocators.CommonKeys.CHECK)
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, BULK)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, BULK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_BULK, commonLocators.CommonKeys.CHECK)
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, PERFORMANCE)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, PERFORMANCE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_TIMEKEEPING, commonLocators.CommonKeys.CHECK)
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, BAL)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, BAL)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_BULK, commonLocators.CommonKeys.CHECK)
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, FIRMLYMOUNTED)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, FIRMLYMOUNTED)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.GridCells.IS_CLUSTERED, commonLocators.CommonKeys.CHECK)
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    })

});
