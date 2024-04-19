import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import Sidebar from 'cypress/locators/sidebar';
import Buttons from 'cypress/locators/buttons';

let CONTAINERS_PROJECT_CALENDAR;
let CONTAINER_COLUMNS_CALENDAR_PROJECT;
let CONTAINER_CALENDAR;
let CONTAINER_COLUMNS_CALENDAR;

const ALLURE = Cypress.Allure.reporter.getInterface();

ALLURE.epic('SCHEDULING');
ALLURE.feature('Calendars');
ALLURE.story('SCH- 3.5 | Calendar Type as Project');

describe('SCH- 3.5 | Calendar Type as Project', () => {
	
	before(function () {
		cy.fixture('scheduling/sch-3.5-calendar-type-as-project.json').then((data) => {
			this.data = data;
		}).then(()=>{
			CONTAINERS_PROJECT_CALENDAR =this.data.CONTAINERS.PROJECT_CALENDAR;
            CONTAINER_COLUMNS_CALENDAR_PROJECT=this.data.CONTAINER_COLUMNS.CALENDAR_PROJECT;
			CONTAINER_CALENDAR=this.data.CONTAINER_COLUMNS.CALENDAR
            CONTAINER_COLUMNS_CALENDAR=this.data.CONTAINER_COLUMNS.CALENDAR
		});
		cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    });

	});
	after(() => {
		cy.LOGOUT();
	});
	it('TC - Create project calender record with uncheck type', function () {
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
	it('TC - Create project calender record with check type', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
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
	it('TC - Verify the record in master', function () {
		_common.search_inSubContainer(cnt.uuid.PROJECTCALENDARS,CONTAINERS_PROJECT_CALENDAR.PROJECT_CALENDAR);
		_common.waitForLoaderToDisappear();
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.CALENDARS, app.FooterTab.CALENDARS, 1);
			_common.setup_gridLayout(cnt.uuid.PROJECTCALENDARS,CONTAINER_COLUMNS_CALENDAR)
			});
			_common.select_allContainerData(cnt.uuid.CALENDARS)
			_common.clickOn_cellHasValue(cnt.uuid.CALENDARS,app.GridCells.CODE,CONTAINERS_PROJECT_CALENDAR.PROJECT_CALENDAR)
			_common.waitForLoaderToDisappear()
			_validate.verify_inputFieldVisibility(cnt.uuid.CALENDARS,app.GridCells.CODE,CONTAINERS_PROJECT_CALENDAR.VISIBILITY)
		 });
	it('TC - Updating the record', function () {
		_common.clear_subContainerFilter(cnt.uuid.SCHEDULE);
		_common.search_inSubContainer(cnt.uuid.SCHEDULE,CONTAINERS_PROJECT_CALENDAR);
        _common.waitForLoaderToDisappear() 
		_common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.BAS_UOM_DAY_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CALENDAR.TYPE);
		_common.saveCellDataToEnv(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_DAY,CONTAINER_CALENDAR.DAY);
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.BAS_UOM_WEEK_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CALENDAR.TYPE1);
		_common.saveCellDataToEnv(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_WEEK,CONTAINER_CALENDAR.WEEK);
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.BAS_UOM_MONTH_FK, app.InputFields.INPUT_GROUP_CONTENT, CONTAINER_CALENDAR.TYPE2);
		_common.saveCellDataToEnv(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_MONTH,CONTAINER_CALENDAR.MONTH);
		_common.waitForLoaderToDisappear()
		cy.SAVE();
	});
	it('TC - Verify the updated record', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
			_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		});
        _common.waitForLoaderToDisappear() 
		_common.search_inSubContainer(cnt.uuid.SCHEDULE,CONTAINERS_PROJECT_CALENDAR);
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,Sidebar.SideBarOptions.UPDATE_PROJECT_CALENDER);	
        _common.waitForLoaderToDisappear() 
		_projectPage.enterRecord_toUpdateProjectCalender();
        _common.waitForLoaderToDisappear()
		_common.clickOn_modalFooterButton(Buttons.ButtonText.OK);
		cy.SAVE();
		_common.openTab(app.TabBar.PROJECT).then(() => {
            _common.waitForLoaderToDisappear() 
			_common.select_tabFromFooter(cnt.uuid.CALENDARS, app.FooterTab.CALENDARS, 1);
		});
        _common.waitForLoaderToDisappear() 
		_common.select_allContainerData(cnt.uuid.CALENDARS);
        _common.waitForLoaderToDisappear() 
		_common.assert_cellDataByContent_inContainer(cnt.uuid.CALENDARS,app.GridCells.WORK_HOURS_PER_DAY,CONTAINER_CALENDAR.MONTH)
		_common.assert_cellDataByContent_inContainer(cnt.uuid.CALENDARS,app.GridCells.WORK_HOURS_PER_WEEK,CONTAINER_CALENDAR.MONTH)
		_common.assert_cellDataByContent_inContainer(cnt.uuid.CALENDARS,app.GridCells.WORK_HOURS_PER_MONTH,CONTAINER_CALENDAR.MONTH)
	});