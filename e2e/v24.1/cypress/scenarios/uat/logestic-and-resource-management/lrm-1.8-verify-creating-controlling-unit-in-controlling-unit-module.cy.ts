import { randomNo } from "cypress/commands/integration";
import { tile, app, cnt, commonLocators } from "cypress/locators";
import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _logesticPage, _controllingUnit, _projectPage, _procurementContractPage, _saleContractPage, _materialPage } from "cypress/pages";

// VARIABLES----------------------------------------------------------------
const allure = Cypress.Allure.reporter.getInterface();
const RENTEL = "Rental" + Cypress._.random(0, 999);
const BULK = "Bulk" + Cypress._.random(0, 999);
const BAL = "BAL" + Cypress._.random(0, 999);
const ControllingUnit = "ControllingUnit" + Cypress._.random(0, 999);
const PRJ_NO = "PRJ" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 999);
const CLERK_NAME = "HS"
// ALLURE ANNOATION FOR REPORTS ----------------------------------------------------------------
allure.epic("LOGISTICS AND RESOURCE MANAGEMENT");
allure.feature("Plant Type");
allure.story("LRM- 1.8 | Verify Creating Controlling Unit In Controlling Unit Module");

describe("LRM- 1.8 | Verify Creating Controlling Unit In Controlling Unit Module", () => {

    beforeEach(function () {
        cy.fixture("LRM/lrm-1.8-verify-creating-controlling-unit-in-controlling-unit-module.json").then((data) => {
            this.data = data;
        });
    });

    before(function () {
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        cy.fixture("LRM/lrm-1.8-verify-creating-controlling-unit-in-controlling-unit-module.json").then((data) => {
            this.data = data;
            const STANDARD_INPUTS = this.data.Prerequisites.SidebarInputs;
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openTab(app.tabBar.project).then(() => {
                _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
                _common.clear_subContainerFilter(cnt.uuid.Projects)
            });
            _common.openSidebarOption(STANDARD_INPUTS.Search).delete_pinnedItem();
            _common.create_newRecord(cnt.uuid.Projects);
            _projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
            cy.SAVE();
        });
    })

    it("TC - Add Controlling Unit", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs;
        const CU_COLUMN = this.data.Column_ControllingUnit

        _common.openSidebarOption(STANDARDINPUTS.inQuickstart)
        _common.search_fromSidebar(STANDARDINPUTS.searchTypeQuick, STANDARDINPUTS.ControllingUnits)
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType, PRJ_NO).pinnedItem();
        _common.openTab(app.tabBar.controllingStructure).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.setup_gridLayout(cnt.uuid.CONTROLLING_UNIT, CU_COLUMN)
            _common.maximizeContainer(cnt.uuid.CONTROLLING_UNIT)
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
        });
        cy.wait(1000) //required wait
        _common.create_newRecord(cnt.uuid.CONTROLLING_UNIT)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        cy.wait(1000) //required wait
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.gridCells.IS_PLANTMANAGEMENT, STANDARDINPUTS.check)
        cy.SAVE()
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.gridCells.IS_PLANTMANAGEMENT, STANDARDINPUTS.check)
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(RENTEL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.CONTROLLING_UNIT, PRJ_NAME)
        cy.wait(1000)
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.gridCells.IS_PLANTMANAGEMENT, STANDARDINPUTS.check)
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(BULK)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.search_inSubContainer(cnt.uuid.CONTROLLING_UNIT, PRJ_NAME)
        cy.wait(1000)
        _common.create_newSubRecord(cnt.uuid.CONTROLLING_UNIT);
        _common.set_cellCheckboxValue(cnt.uuid.CONTROLLING_UNIT, app.gridCells.IS_PLANTMANAGEMENT, STANDARDINPUTS.check)
        _controllingUnit.enterRecord_toCreateSubRecordinControllingUnit(BAL)
        cy.SAVE()
        _common.waitForLoaderToDisappear()

    })

    it("TC - Verify Added Controlling Unit", function () {
        _common.openTab(app.tabBar.controllingStructure).then(() => {
            _common.select_tabFromFooter(cnt.uuid.CONTROLLING_UNIT, app.FooterTab.CONTROLLING_UNITS, 2);
            _common.clear_subContainerFilter(cnt.uuid.CONTROLLING_UNIT)
            cy.wait(1000) //required wait
        });
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, RENTEL)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, RENTEL)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, BULK)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, BULK)
        _common.clickOn_cellHasUniqueValue(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, BAL)
        cy.SAVE()
        _common.assert_cellData_insideActiveRow(cnt.uuid.CONTROLLING_UNIT, app.GridCells.DESCRIPTION_INFO, BAL)
    })

        after(() => {
            cy.LOGOUT();
        });

});
