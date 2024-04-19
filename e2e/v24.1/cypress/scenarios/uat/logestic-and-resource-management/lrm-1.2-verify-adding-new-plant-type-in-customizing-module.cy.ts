import { tile, app, cnt } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const FIRMLYMOUNTED = "Firmly Mounted" + Cypress._.random(0, 999);
const PERFORMANCE = "Performance" + Cypress._.random(0, 999);
const BAL = "Bal" + Cypress._.random(0, 999);
const BULK = "Bulk" + Cypress._.random(0, 999);
const RENTEL = "Rental" + Cypress._.random(0, 999);


// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("LOGISTICS AND RESOURCE MANAGEMENT");
allure.feature("Plant Type");
allure.story("LRM- 1.2 | Verify Adding New Plant Type In Customizing Module");

describe("LRM- 1.2 | Verify Adding New Plant Type In Customizing Module", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.2-verify-adding-new-plant-type-in-customizing-module.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture("LRM/lrm-1.2-verify-adding-new-plant-type-in-customizing-module.json").then((data) => {
            this.data = data;
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem()
            _common.search_fromSidebar(STANDARD_INPUTS.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    })

    it("TC - Add Plant Type Data Record", function () {
        const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
        const DATATYPE_Column = this.data.DataTypes.Column_Headers;
        const DATA_RECORD_INPUTS = this.data.DataRecords.DataRecordsInput;
        _common.openSidebarOption(STANDARD_INPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARD_INPUTS.searchTypeQuick, STANDARD_INPUTS.customizingModule)
        cy.REFRESH_CONTAINER()
        _common.openTab(app.tabBar.MasterData).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Data_Types, app.FooterTab.DATA_TYPES)
            _common.setup_gridLayout(cnt.uuid.Data_Types, DATATYPE_Column)
        })
        _common.clear_subContainerFilter(cnt.uuid.Data_Types)
        _common.search_inSubContainer(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantType)
        _common.select_rowHasValue(cnt.uuid.Data_Types, DATA_RECORD_INPUTS.PlantType)
        _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        _common.maximizeContainer(cnt.uuid.DATA_RECORDS)
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, RENTEL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISCLUSTER, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BULK);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISBULK, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })
    it("TC - Create Second Plant Type Data Record", function () {
        const DATA_RECORD_INPUTS = this.data.DataRecords.DataRecordsInput;
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, BAL);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISBULK, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, PERFORMANCE);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISTIMEKEEPING, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.DATA_RECORDS)
        _common.waitForLoaderToDisappear()
        cy.wait(1000)//required wait
        _common.enterRecord_inNewRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, app.InputFields.DOMAIN_TYPE_TRANSLATION, FIRMLYMOUNTED);
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.set_cellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISCLUSTERED, "check")
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })

    it("TC - Verify Plant Type Record", function () {
        _common.openTab(app.tabBar.MasterData).then(() => {
            _common.select_tabFromFooter(cnt.uuid.DATA_RECORDS, app.FooterTab.DATA_RECORDS)
        })
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, RENTEL)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, RENTEL)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISCLUSTER, "check")
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, BULK)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, BULK)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISBULK, "check")
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, PERFORMANCE)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, PERFORMANCE)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISTIMEKEEPING, "check")
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, BAL)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, BAL)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISBULK, "check")
        _common.clear_subContainerFilter(cnt.uuid.DATA_RECORDS)
        _common.search_inSubContainer(cnt.uuid.DATA_RECORDS, FIRMLYMOUNTED)
        cy.wait(1000)//required wait
        _common.assert_cellData_insideActiveRow(cnt.uuid.DATA_RECORDS, app.GridCells.DESCRIPTION_INFO, FIRMLYMOUNTED)
        _validate.verify_activeRowsCellCheckboxValue(cnt.uuid.DATA_RECORDS, app.gridCells.ISCLUSTERED, "check")
        _common.minimizeContainer(cnt.uuid.DATA_RECORDS)
    })

    after(() => {
        cy.LOGOUT();
    });

});
