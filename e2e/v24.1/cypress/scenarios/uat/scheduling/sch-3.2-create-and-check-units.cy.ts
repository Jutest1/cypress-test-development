import { tile, app, cnt } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";
const allure = Cypress.Allure.reporter.getInterface();


const UNIT_DESC = "SCH-DESC-" + Cypress._.random(0, 999);

allure.epic("SCHEDULING");
allure.feature("Unit");
allure.story("SCH- 3.2 | Create and check Units");
describe("SCH- 3.2 | Create and check Units", () => {

    beforeEach(function () {
        cy.fixture("scheduling/sch-3.2-create-and-check-units.json").then((data) => {
            this.data = data
        })
    })
    before(function () {
        cy.preLoading(
            Cypress.env("adminUserName"),
            Cypress.env("adminPassword"),
            Cypress.env("parentCompanyName"),
            Cypress.env("childCompanyName")
        );
        cy.fixture("scheduling/sch-3.2-create-and-check-units.json").then((data) => {
            this.data = data
            const standardInputs = this.data.Prerequisites.SidebarInputs
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
            _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
    });
    it("TC - Create Unit", function () {
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const UNITCOLOUMN = this.data.CreateUnit.UnitColumnHeaders;
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.Unit);
        _common.openTab(app.tabBar.UNIT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
        _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, UNITCOLOUMN)
        });
        _common.create_newRecord(cnt.uuid.UNITSOFMEASUREMENT);
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,STANDARDINPUTS.Unitdes)
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.gridCells.UNIT_MEASUREMENT,app.InputFields.DOMAIN_TYPE_TRANSLATION,STANDARDINPUTS.Unitdes)
        cy.SAVE();
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType,STANDARDINPUTS.Unitdes )
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.gridCells.UNIT_TYPE,"list",STANDARDINPUTS.Type)
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });

    it("TC - Search and Verify the created unit", function () { 
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType,STANDARDINPUTS.Unitdes )
        _common.assert_cellData_by_contain(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,STANDARDINPUTS.Unitdes)

    });
  
    after(() => {
        cy.LOGOUT();
    });
});