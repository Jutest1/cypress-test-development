import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM, EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"


let CREATEPROJECT_PARAMETERS
let PROJECT_CALENDER

ALLURE.epic("PROJECT AND CATALOG");
ALLURE.feature("Project");
ALLURE.story("PRJ- 1.6 | Change Calendar Type");

describe("PRJ- 1.6 | Change Calendar Type", () => {

    before(function () {
        cy.fixture("project-and-catalog/prj-1.6-Update-project-calendar.json")
          .then((data) => {
            this.data = data;
			 PROJECT_CALENDER = this.data.PROJECTCALENDER.CALENDER;
			 CREATEPROJECT_PARAMETERS = {
				[commonLocators.CommonLabels.PROJECT_NUMBER]: PRJ_NAME,
				[ commonLocators.CommonLabels.NAME] :PRJ_NAME,
				[ commonLocators.CommonLabels.CLERK] :CLERK_NAME 
				};


        }).then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.openTab(app.TabBar.PROJECT).then(() => {
            _common.setDefaultView(app.TabBar.PROJECT)
            _common.waitForLoaderToDisappear()
            _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
            });
            _common.create_newRecord(cnt.uuid.PROJECTS);
            _projectPage.enterRecord_toCreateProject(CREATEPROJECT_PARAMETERS);  
             cy.SAVE()
             _common.waitForLoaderToDisappear()
			 _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
			 _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PRJ_NAME).pinnedItem(); 
			 _common.waitForLoaderToDisappear() 
			 _common.maximizeContainer(cnt.uuid.PROJECTS)
			 _common.select_rowHasValue(cnt.uuid.PROJECTS,PRJ_NAME)
			 _common.edit_dropdownCellWithInput(cnt.uuid.PROJECTS, app.GridCells.CALENDAR_FK, 'grid', app.InputFields.INPUT_GROUP_CONTENT, PROJECT_CALENDER.VerifyCalendar);
			 cy.SAVE();
			 _common.waitForLoaderToDisappear()
			 _common.saveCellDataToEnv(cnt.uuid.PROJECTS, app.GridCells.CALENDAR_FK, "CALENDAR");
			 _common.minimizeContainer(cnt.uuid.PROJECTS)	 
        })       
    })
    after(() => {
    cy.LOGOUT();
    })

	it('TC - Verify record in Project calender ', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.setDefaultView(app.TabBar.PROJECT);
		_common.waitForLoaderToDisappear()
		_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		});
		_common.clear_subContainerFilter(cnt.uuid.PROJECTCALENDARS);
		_common.select_allContainerData(cnt.uuid.PROJECTCALENDARS);
		_common.assert_cellDataByContent_inContainer(cnt.uuid.PROJECTCALENDARS, app.GridCells.CALENDAR_FK, Cypress.env("CALENDAR"));
		cy.SAVE();
		cy.REFRESH_CONTAINER()
		_common.waitForLoaderToDisappear()
	});
	it('TC - Create another new record for update', function () {
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		});
		_common.create_newRecord(cnt.uuid.PROJECTCALENDARS);
		_projectPage.enterRecord_toCreateProjectCalender(PROJECT_CALENDER.SP, PROJECT_CALENDER.check);
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		cy.SAVE()
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);//Error pop up in Application not in manual//
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.PROJECTCALENDARS, app.GridCells.CALENDAR_FK, "NEW_CALENDER");
	});
	it('TC - Verify the record in master ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.CALENDAR);
		_common.openTab(app.TabBar.CALENDER).then(() => {
			_common.select_tabFromFooter(cnt.uuid.SCHEDULE, app.FooterTab.CALENDARS, 0);
		});
		_common.waitForLoaderToDisappear()
		cy.REFRESH_CONTAINER();
		_common.waitForLoaderToDisappear()
		_common.clear_subContainerFilter(cnt.uuid.SCHEDULE);
		 cy.wait(1000)//Need wait to load Application//
		_common.search_inSubContainer(cnt.uuid.SCHEDULE, Cypress.env("NEW_CALENDER"));
		 cy.wait(1000)//Need wait to load //
		_common.assert_cellData_insideActiveRow(cnt.uuid.SCHEDULE, app.GridCells.CODE, Cypress.env("NEW_CALENDER"));
	});
	it('TC - Updating the record', function () {
		_common.clear_subContainerFilter(cnt.uuid.SCHEDULE);
		_common.select_allContainerData(cnt.uuid.SCHEDULE);
		_common.select_allContainerData(cnt.uuid.SCHEDULE);
		_common.search_inSubContainer(cnt.uuid.SCHEDULE, PROJECT_CALENDER.SP);
		_common.waitForLoaderToDisappear()
		_common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_DAY, app.InputFields.INPUT_GROUP_CONTENT, PROJECT_CALENDER.day);
		_common.saveCellDataToEnv(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_DAY, PROJECT_CALENDER.workday);
		_common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_WEEK, app.InputFields.INPUT_GROUP_CONTENT, PROJECT_CALENDER.week);
		_common.saveCellDataToEnv(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_WEEK, PROJECT_CALENDER.workweek);
		_common.enterRecord_inNewRow(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_MONTH, app.InputFields.INPUT_GROUP_CONTENT, PROJECT_CALENDER.month);
		cy.SAVE();
		_common.saveCellDataToEnv(cnt.uuid.SCHEDULE, app.GridCells.WORK_HOURS_PER_MONTH, PROJECT_CALENDER.workmonth);
	});
	it('TC - Verify the updated record', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);
        _common.waitForLoaderToDisappear()
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.waitForLoaderToDisappear()
		_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		_common.clear_subContainerFilter(cnt.uuid.PROJECTCALENDARS)
		});
		_common.waitForLoaderToDisappear()
		_common.search_inSubContainer(cnt.uuid.PROJECTCALENDARS, Cypress.env("NEW_CALENDER"));
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.UPDATE_PROJECT_CALENDER);
		_projectPage.enterRecord_toUpdateProjectCalender();
		cy.wait(500)
		_common.clickOn_modalFooterButton(btn.ButtonText.OK);
		cy.SAVE();
		cy.REFRESH_CONTAINER()
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.waitForLoaderToDisappear()
		_common.select_tabFromFooter(cnt.uuid.CALENDARSDETAILS, app.FooterTab.CALENDARSDETAILS, 0);
		});
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		_common.clear_subContainerFilter(cnt.uuid.PROJECTCALENDARS)
		});

		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.waitForLoaderToDisappear()
		_common.select_tabFromFooter(cnt.uuid.CALENDARS, app.FooterTab.CALENDARS, 1);
		});
		_common.waitForLoaderToDisappear()
		_common.select_allContainerData(cnt.uuid.CALENDARS);
		cy.wait(500)//Need time to load Application //
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.waitForLoaderToDisappear()
		_common.select_tabFromFooter(cnt.uuid.CALENDARSDETAILS, app.FooterTab.CALENDARSDETAILS, 0);
		});
		_common.waitForLoaderToDisappear()
		_common.assert_getText_fromContainerForm(cnt.uuid.CALENDARSDETAILS, PROJECT_CALENDER.Lable1, PROJECT_CALENDER.workday);
		_common.assert_getText_fromContainerForm(cnt.uuid.CALENDARSDETAILS, PROJECT_CALENDER.Lable2, PROJECT_CALENDER.workweek);
		_common.assert_getText_fromContainerForm(cnt.uuid.CALENDARSDETAILS, PROJECT_CALENDER.Lable3, PROJECT_CALENDER.workmonth);
	});
})
