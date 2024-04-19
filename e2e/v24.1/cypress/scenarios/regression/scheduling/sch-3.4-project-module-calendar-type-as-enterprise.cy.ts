import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import Sidebar from 'cypress/locators/sidebar';

let CONTAINERS_PROJECT_CALENDAR;
let CONTAINER_COLUMNS_CALENDAR_PROJECT;
let CONTAINER_COLUMNS_CALENDAR;

const ALLURE = Cypress.Allure.reporter.getInterface();

ALLURE.epic("SCHEDULING");
ALLURE.feature("Calendars");
ALLURE.story("SCH- 3.4 | Calendar Type as Enterprise");
describe("SCH- 3.4 | Calendar Type as Enterprise", () => {

    before(function () {
        cy.fixture("scheduling/sch-3.4-project-module-calendar-type-as-enterprise.json").then((data) => {
            this.data = data
            CONTAINERS_PROJECT_CALENDAR =this.data.CONTAINERS.PROJECT_CALENDAR;
            CONTAINER_COLUMNS_CALENDAR_PROJECT=this.data.CONTAINER_COLUMNS.CALENDAR_PROJECT;
            CONTAINER_COLUMNS_CALENDAR=this.data.CONTAINER_COLUMNS.CALENDAR
        });
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });

    it('TC- Create Project calender and verify project calender ', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
            _common.setup_gridLayout(cnt.uuid.PROJECTCALENDARS,CONTAINER_COLUMNS_CALENDAR_PROJECT)
        });
        _common.waitForLoaderToDisappear()
		_common.select_allContainerData(cnt.uuid.PROJECTCALENDARS);
		_common.delete_recordFromContainer(cnt.uuid.PROJECTCALENDARS);
		cy.SAVE();
        _common.waitForLoaderToDisappear()
		_common.create_newRecord(cnt.uuid.PROJECTCALENDARS);
		_projectPage.enterRecord_toCreateProjectCalender(CONTAINERS_PROJECT_CALENDAR.PROJECT_CALENDAR,CONTAINERS_PROJECT_CALENDAR.TYPE);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
        _common.assert_cellData_insideActiveRow(cnt.uuid.PROJECTCALENDARS,app.GridCells.CALENDAR_FK,CONTAINERS_PROJECT_CALENDAR.PROJECT_CALENDAR)   
		_common.waitForLoaderToDisappear()
	});

	it('TC- Verify project Calendar from Enterprise to project ', function () {
		_common.assert_cellData_insideActiveRow(cnt.uuid.PROJECTCALENDARS, app.GridCells.CALENDAR_TYPE_FK, CONTAINERS_PROJECT_CALENDAR.ENTERPRISE);
	});

    it('TC- Verify is calender (Dependent) is read only  ', function () {
        _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.CALENDARS, app.FooterTab.CALENDARS, 1);
        _common.setup_gridLayout(cnt.uuid.PROJECTCALENDARS,CONTAINER_COLUMNS_CALENDAR)
        });
        _common.select_allContainerData(cnt.uuid.CALENDARS)
        _common.clickOn_cellHasValue(cnt.uuid.CALENDARS,app.GridCells.CODE,CONTAINERS_PROJECT_CALENDAR.PROJECT_CALENDAR)
        _common.waitForLoaderToDisappear()
        _validate.verify_inputFieldVisibility(cnt.uuid.CALENDARS,app.GridCells.CODE,CONTAINERS_PROJECT_CALENDAR.VISIBILITY)
    }); 

    after(() => {
        cy.LOGOUT();
        })
}); 