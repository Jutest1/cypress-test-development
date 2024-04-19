import { _common, _projectPage, _validate } from 'cypress/pages';

import { app, tile, cnt, btn } from 'cypress/locators';
import _ from 'cypress/types/lodash';
const allure = Cypress.Allure.reporter.getInterface();
const PRJ_NO = 'PRC' + Cypress._.random(0, 999);
const PRJ_NAME = 'TEST-PRJ-' + Cypress._.random(0, 9999);
const CLERK_NAME = 'HS';

allure.epic('SCHEDULING');
allure.feature('Calendars');
allure.story('SCH- 3.5 | Calendar Type as Project');

describe('SCH- 3.5 | Calendar Type as Project', () => {
	beforeEach(function () {
		cy.fixture('scheduling/sch-3.5-calendar-type-as-project.json').then((data) => {
			this.data = data;
		});
	});

	before(function () {
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
		cy.fixture('scheduling/sch-3.5-calendar-type-as-project.json').then((data) => {
			this.data = data;
			const standardInputs = this.data.Prerequisites.SidebarInputs;
			/* Open desktop should be called in before block */
			_common.openDesktopTile(tile.DesktopTiles.PROJECT);
			_common.openTab(app.tabBar.project).then(() => {
				_common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
			});
			_common.create_newRecord(cnt.uuid.Projects);
			_projectPage.enterRecord_toCreateProject(PRJ_NO, PRJ_NAME, CLERK_NAME);
			cy.SAVE();
            _common.waitForLoaderToDisappear() 
			_common.openSidebarOption(standardInputs.Search).delete_pinnedItem();
			_common.search_fromSidebar(standardInputs.searchType, PRJ_NO).pinnedItem();
            _common.waitForLoaderToDisappear()
			_common.select_rowHasValue(cnt.uuid.Projects,PRJ_NO)
			_common.app.GridCells.BAS_UOM_FK(cnt.uuid.Projects, app.gridCells.CALENDAR)
			_common.edit_dropdownCellWithInput(cnt.uuid.Projects, app.gridCells.CALENDAR, standardInputs.grid, app.InputFields.INPUT_GROUP_CONTENT, standardInputs.VerifyCalendar);
			cy.SAVE();
            _common.waitForLoaderToDisappear() 
			_common.saveCellDataToEnv(cnt.uuid.Projects, app.gridCells.CALENDAR, standardInputs.Calendar);
		
		});
	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create new record in Project calender', function () {
		const STDINPUTS = this.data.Prerequisites.SidebarInputs;
		_common.openTab(app.tabBar.project).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
			_common.waitForLoaderToDisappear() 
		});
		_common.waitForLoaderToDisappear() 
		_common.maximizeContainer(cnt.uuid.PROJECTCALENDARS)
		_common.clear_subContainerFilter(cnt.uuid.PROJECTCALENDARS);
		_common.select_allContainerData(cnt.uuid.PROJECTCALENDARS);
		_common.delete_recordFromContainer(cnt.uuid.PROJECTCALENDARS);
		cy.SAVE();
        _common.waitForLoaderToDisappear()
		_common.minimizeContainer(cnt.uuid.PROJECTCALENDARS)

        _common.openTab(app.tabBar.project).then(() => {
            _common.select_tabFromFooter(cnt.uuid.Projects, app.FooterTab.PROJECTS, 0);
        });
		_common.maximizeContainer(cnt.uuid.Projects)
        _common.select_rowHasValue(cnt.uuid.Projects,PRJ_NO)
		_common.minimizeContainer(cnt.uuid.Projects)

        _common.openTab(app.tabBar.project).then(() => {
		_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		});
		_common.create_newRecord(cnt.uuid.PROJECTCALENDARS);
		_projectPage.enterRecord_toCreateProjectCalender(STDINPUTS.VerifyCalendar, STDINPUTS.uncheck);
		cy.SAVE();
        _common.waitForLoaderToDisappear() 
		_common.assert_cellData_by_contain(cnt.uuid.PROJECTCALENDARS, app.gridCells.CALENDAR, STDINPUTS.VerifyCalendar);
		cy.SAVE();
        _common.waitForLoaderToDisappear() 
	});
	it('TC - Create another new record for update', function () {
		const STDINPUTS = this.data.Prerequisites.SidebarInputs;
		const CLDINPUTS = this.data.projectCalendarsinputs.prjcalInputs;
		_common.openTab(app.tabBar.project).then(() => {
            _common.waitForLoaderToDisappear() 
			_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		});
		_common.waitForLoaderToDisappear() 
		_common.maximizeContainer(cnt.uuid.PROJECTCALENDARS)
		_common.create_newRecord(cnt.uuid.PROJECTCALENDARS);
		_projectPage.enterRecord_toCreateProjectCalender(CLDINPUTS.SP, STDINPUTS.check);
        _common.waitForLoaderToDisappear() 
		cy.wait(2000) // This wait is required
		_common.saveCellDataToEnv(cnt.uuid.PROJECTCALENDARS, app.gridCells.CALENDAR, CLDINPUTS.PROJCALENDARS);
        _common.waitForLoaderToDisappear() 
		_common.minimizeContainer(cnt.uuid.PROJECTCALENDARS)
	});
	it('TC - Verify the record in master', function () {
		const CLDINPUTS = this.data.projectCalendarsinputs.prjcalInputs;
		const STDINPUTS = this.data.Prerequisites.SidebarInputs;
		_common.openSidebarOption(STDINPUTS.QuickStart);
		_common.search_fromSidebar(STDINPUTS.quickstart, STDINPUTS.Calendar);
		_common.openTab(app.tabBar.CALENDER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.Schedule, app.FooterTab.CALENDARS, 0);
		});
        _common.waitForLoaderToDisappear() 
		cy.REFRESH_CONTAINER();
        _common.waitForLoaderToDisappear() 
		_common.clear_subContainerFilter(cnt.uuid.Schedule);
        _common.waitForLoaderToDisappear() 
		_common.search_inSubContainer(cnt.uuid.Schedule, Cypress.env(CLDINPUTS.PROJCALENDARS));
        _common.waitForLoaderToDisappear() 
		cy.wait(2000)// This wait is required
		_common.assert_cellData_insideActiveRow(cnt.uuid.Schedule, app.GridCells.CODE, Cypress.env(CLDINPUTS.PROJCALENDARS));
	});
	it('TC - Updating the record', function () {
		const STDINPUTS = this.data.projectCalendarsinputs.prjcalInputs;
		_common.clear_subContainerFilter(cnt.uuid.Schedule);
		_common.select_allContainerData(cnt.uuid.Schedule);
		_common.search_inSubContainer(cnt.uuid.Schedule, STDINPUTS.SP);
        _common.waitForLoaderToDisappear() 
		_common.enterRecord_inNewRow(cnt.uuid.Schedule, app.gridCells.WORKHOURSPERDAY, app.InputFields.INPUT_GROUP_CONTENT, STDINPUTS.day);
		_common.saveCellDataToEnv(cnt.uuid.Schedule, app.gridCells.WORKHOURSPERDAY, STDINPUTS.workday);
		_common.enterRecord_inNewRow(cnt.uuid.Schedule, app.gridCells.WORKHOURSPERWEEK, app.InputFields.INPUT_GROUP_CONTENT, STDINPUTS.week);
		_common.saveCellDataToEnv(cnt.uuid.Schedule, app.gridCells.WORKHOURSPERWEEK, STDINPUTS.workweek);
		_common.enterRecord_inNewRow(cnt.uuid.Schedule, app.gridCells.WORKHOURSEPERMONTH, app.InputFields.INPUT_GROUP_CONTENT, STDINPUTS.month);
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.Schedule, app.gridCells.WORKHOURSEPERMONTH, STDINPUTS.workmonth);
	});
	it('TC - Verify the updated record', function () {
		const STDINPUTS = this.data.Prerequisites.SidebarInputs;
		const CLDINPUTS = this.data.projectCalendarsinputs.prjcalInputs;
		_common.openSidebarOption(STDINPUTS.QuickStart);
		_common.search_fromSidebar(STDINPUTS.quickstart, CLDINPUTS.Projectmodulesearch);
        _common.waitForLoaderToDisappear() 
		_common.openTab(app.tabBar.project).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		});
        _common.waitForLoaderToDisappear() 
		_common.search_inSubContainer(cnt.uuid.PROJECTCALENDARS, Cypress.env(CLDINPUTS.PROJCALENDARS));
		_common.openSidebarOption(STDINPUTS.wizard);
		_common.search_fromSidebar(STDINPUTS.wizard1, CLDINPUTS.UpdateProjectCalendar);
        _common.waitForLoaderToDisappear() 
		_projectPage.enterRecord_toUpdateProjectCalender();
        _common.waitForLoaderToDisappear()
		cy.wait(1000) // This is required 
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		cy.SAVE();
		_common.openTab(app.tabBar.project).then(() => {
            _common.waitForLoaderToDisappear() 
			_common.select_tabFromFooter(cnt.uuid.CALENDARSDETAILS, app.FooterTab.CALENDARSDETAILS, 0);
		});
		_common.openTab(app.tabBar.project).then(() => {
            _common.waitForLoaderToDisappear() 
			_common.select_tabFromFooter(cnt.uuid.CALENDARS, app.FooterTab.CALENDARS, 1);
		});
        _common.waitForLoaderToDisappear() 
		_common.select_allContainerData(cnt.uuid.CALENDARS);
		_common.openTab(app.tabBar.project).then(() => {
            _common.waitForLoaderToDisappear() 
			_common.select_tabFromFooter(cnt.uuid.CALENDARSDETAILS, app.FooterTab.CALENDARSDETAILS, 0);
		});
        _common.waitForLoaderToDisappear() 
		_common.assert_getTextfromContainerForm(cnt.uuid.CALENDARSDETAILS, CLDINPUTS.Lable1, CLDINPUTS.workday);
		_common.assert_getTextfromContainerForm(cnt.uuid.CALENDARSDETAILS, CLDINPUTS.Lable2, CLDINPUTS.workweek);
		_common.assert_getTextfromContainerForm(cnt.uuid.CALENDARSDETAILS, CLDINPUTS.Lable3, CLDINPUTS.workmonth);
	});
});