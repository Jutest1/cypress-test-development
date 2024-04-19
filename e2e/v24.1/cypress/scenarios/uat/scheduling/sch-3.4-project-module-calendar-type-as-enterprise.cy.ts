import { tile, app, cnt } from "cypress/locators";
import { _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage, _validate } from "cypress/pages";
const allure = Cypress.Allure.reporter.getInterface();

allure.epic("SCHEDULING");
allure.feature("Calendars");
allure.story("SCH- 3.4 | Calendar Type as Enterprise");
describe("SCH- 3.4 | Calendar Type as Enterprise", () => {

    beforeEach(function () {
        cy.fixture("scheduling/sch-3.4-project-module-calendar-type-as-enterprise.json").then((data) => {
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
        cy.fixture("scheduling/sch-3.4-project-module-calendar-type-as-enterprise.json").then((data) => {
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

    it('TC- Create Project calender and verify project calender ', function () {
		const STDSRCH = this.data.Prerequisites.SidebarInputs;
		_common.openTab(app.tabBar.project).then(() => {
			_common.setDefaultView(app.tabBar.project);
            _common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		});
		_common.select_allContainerData(cnt.uuid.PROJECTCALENDARS);
		_common.delete_recordFromContainer(cnt.uuid.PROJECTCALENDARS);
		cy.SAVE();
        _common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.PROJECTCALENDARS);
		_projectPage.enterRecord_toCreateProjectCalender(STDSRCH.VerifyCalendar,STDSRCH.uncheck);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.assert_cellData_by_contain(cnt.uuid.PROJECTCALENDARS, app.gridCells.CALENDAR,STDSRCH.VerifyCalendar);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
	});

	it('TC- Verify project Calendar from Enterprise to project ', function () {
		const STDSRCH = this.data.Prerequisites.SidebarInputs;
		cy.wait(1000);
		_common.assert_cellData_by_contain(cnt.uuid.PROJECTCALENDARS, app.gridCells.CALENDARSTYPE, STDSRCH.Enterprise);
		cy.SAVE();
	});

    it('TC- Verify is calender (Dependent) is read only  ', function () {
        const STDSRCH = this.data.Prerequisites.SidebarInputs;
        _common.openTab(app.tabBar.project).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CALENDARS, app.FooterTab.CALENDARS, 1);
        });
        _common.select_allContainerData(cnt.uuid.CALENDARS)
        _common.clickonCellhasValue(cnt.uuid.CALENDARS,app.GridCells.CODE,STDSRCH.VerifyCalendar)
        _common.waitForLoaderToDisappear()
        _validate.verify_inputFieldVisibility(cnt.uuid.CALENDARS,app.GridCells.CODE,STDSRCH.OPTION3)
    }); 

}); 