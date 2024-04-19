import { tile, app, cnt } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";
const allure = Cypress.Allure.reporter.getInterface();

const CAL_CODE = "CAL-CODE-" + Cypress._.random(0, 999);
const CAL_DESC = "SCH-DESC-" + Cypress._.random(0, 999);

allure.epic("SCHEDULING");
allure.feature("Calendars");
allure.story("SCH- 3.3 | Create a calendars");
describe("SCH- 3.3 | Create a calendars", () => {

    beforeEach(function () {
        cy.fixture("scheduling/sch-3.3-create-a-calendar.json").then((data) => {
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
        cy.fixture("scheduling/sch-3.3-create-a-calendar.json").then((data) => {
            this.data = data
            const standardInputs = this.data.Prerequisites.SidebarInputs
            /* Open desktop should be called in before block */
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.openSidebarOption(standardInputs.Search).delete_pinnedItem()
            _common.search_fromSidebar(standardInputs.searchType, Cypress.env("PROJECT_NUMBER")).pinnedItem();
        });
      
    });
    after(() => {
        cy.LOGOUT();
      });
    it("TC - Search and select unit Hour", function () { 
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const UNITCOLOUMN = this.data.CreateUnit.UnitColumnHeaders;
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart, STANDARDINPUTS.Unit);
        _common.openTab(app.tabBar.UNIT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
        _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, UNITCOLOUMN)
        });
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType,STANDARDINPUTS.Hour)
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.gridCells.UNIT_TYPE,"list",STANDARDINPUTS.Type)

    });

    it("TC - Search and select unit Day", function () { 
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        const UNITCOLOUMN = this.data.CreateUnit.UnitColumnHeaders;
        _common.openTab(app.tabBar.UNIT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
        _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, UNITCOLOUMN)
        });
        _common.openSidebarOption(STANDARDINPUTS.Search).delete_pinnedItem()
        _common.search_fromSidebar(STANDARDINPUTS.searchType,STANDARDINPUTS.Day)
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.gridCells.UNIT_TYPE,"list",STANDARDINPUTS.Type1)
    });

    it("TC - Create Calender ", function () { 
        const STANDARDINPUTS = this.data.Prerequisites.SidebarInputs
        _common.openSidebarOption(STANDARDINPUTS.QuickStart).search_fromSidebar(STANDARDINPUTS.quickstart,STANDARDINPUTS.Calendar);
        _common.openTab(app.tabBar.CALENDER).then(() => {
        _common.setDefaultView(app.tabBar.CALENDER)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.Schedule, app.FooterTab.CALENDARS, 2);
        });
        _common.create_newRecord(cnt.uuid.Schedule)
        _common.maximizeContainer(cnt.uuid.Schedule)
        _common.enterRecord_inNewRow(cnt.uuid.Schedule,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,CAL_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.Schedule,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CAL_DESC)
        _common.edit_dropdownCellWithInput(cnt.uuid.Schedule,app.gridCells.UNIT_HOUR,"grid",app.InputFields.INPUT_GROUP_CONTENT,STANDARDINPUTS.Hour)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.Schedule,app.gridCells.UNIT_DAY,"grid",app.InputFields.INPUT_GROUP_CONTENT,STANDARDINPUTS.Day)
        cy.SAVE()
    });

    it("TC - Verify the created calender", function () { 
        _common.assert_cellData_by_contain(cnt.uuid.Schedule,app.GridCells.DESCRIPTION_INFO,CAL_DESC)

    });


}); 
