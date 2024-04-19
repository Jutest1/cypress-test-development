import { _common, _estimatePage, _validate, _mainView, _boqPage, _modalView, _bidPage, _saleContractPage, _projectPage } from "cypress/pages";
import { app, tile, cnt, btn, commonLocators, sidebar } from "cypress/locators";
import { DataCells } from "cypress/pages/interfaces";
import { BOQ_ROOT_ITEM, EST_HEADER } from "cypress/pages/variables";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PRJ_NO = "PRC" + Cypress._.random(0, 999);
const PRJ_NAME = "TEST-PRJ-" + Cypress._.random(0, 9999);
const CLERK_NAME = "HS"


let CREATEPROJECT_PARAMETERS
let PROJECTCALENDER

ALLURE.epic("PROJECT AND CATALOG");
ALLURE.feature("Project");
ALLURE.story("PRJ- 1.5 | Change Calendar Type");

describe("PRJ- 1.5 | Change Calendar Type", () => {

    before(function () {
        cy.fixture("project-and-catalog/prj-1.5-change-calendar-type.json")
          .then((data) => {
            this.data = data;
			 PROJECTCALENDER = this.data.PROJECTCALENDER.CALENDER;
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
        })       
    })
    after(() => {
    cy.LOGOUT();
    })
	it('TC - Create Project calender and verify project calender ', function () {
		const PROJECTCALENDER = this.data.PROJECTCALENDER.CALENDER;
		_common.openTab(app.TabBar.PROJECT).then(() => {
		_common.setDefaultView(app.TabBar.PROJECT);
		_common.waitForLoaderToDisappear() 
		_common.select_tabFromFooter(cnt.uuid.PROJECTCALENDARS, app.FooterTab.PROJECTCALENDARS, 1);
		});
		_common.select_allContainerData(cnt.uuid.PROJECTCALENDARS);
		_common.delete_recordFromContainer(cnt.uuid.PROJECTCALENDARS);
		cy.SAVE();
		_common.waitForLoaderToDisappear() 
		_common.create_newRecord(cnt.uuid.PROJECTCALENDARS);
		_projectPage.enterRecord_toCreateProjectCalender(PROJECTCALENDER.VerifyCalendar, PROJECTCALENDER.uncheck);
		cy.SAVE();
		_common.waitForLoaderToDisappear() 
		_common.assert_cellDataByContent_inContainer(cnt.uuid.PROJECTCALENDARS, app.GridCells.CALENDAR_FK, PROJECTCALENDER.VerifyCalendar)
		cy.SAVE();
		_common.waitForLoaderToDisappear() 
	});
	it('TC - Update project Calendar from Enterprise to project ', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD);
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.CHANGE_CALENDER_TYPE);
		cy.wait(1000)//Need wait to load //
		cy.SAVE();
		_common.waitForLoaderToDisappear()
		_common.saveCellDataToEnv(cnt.uuid.PROJECTCALENDARS, app.GridCells.CALENDAR_TYPE_FK, "CALENDER");
	});
	it('TC - Verify project Calendar from Enterprise to project ', function () {
        _common.waitForLoaderToDisappear() 
	    _common.assert_cellDataByContent_inContainer(cnt.uuid.PROJECTCALENDARS, app.GridCells.CALENDAR_TYPE_FK, Cypress.env('CALENDER'));
	});

});
