import { btn,tile, app, cnt,sidebar,commonLocators } from "cypress/locators";
import {_validate, _common, _projectPage, _bidPage, _saleContractPage, _estimatePage, _boqPage, _mainView, _modalView, _wipPage, _schedulePage } from "cypress/pages";
import Sidebar from 'cypress/locators/sidebar';
import CommonLocators from "cypress/locators/common-locators";
import { DataCells } from "cypress/pages/interfaces";

const ALLURE = Cypress.Allure.reporter.getInterface();
const PROJECT_NO="PRJ-SCH" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);

const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC= "SCH-DESC-" + Cypress._.random(0, 999);
const SCH_ACTDESC = " SCH_ACT_DESC-" + Cypress._.random(0, 999);
const EVENT_DESC = "EVENT_DESC-" + Cypress._.random(0, 999);
const EVENT1_DESC = "EVENT1_DESC-" + Cypress._.random(0, 999);
const UNIT_DESC = "UNI-DESC-" + Cypress._.random(0, 999);
const UNIT_DESC1 = "UNI-DESC1-" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT = "U" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT1 = "M" + Cypress._.random(0, 999);
const CALENDAR_CODE = "CALE-CODE-" + Cypress._.random(0, 99);
const CALENDAR_DESC = "CALE-DESC-" + Cypress._.random(0, 99);

let CONTAINERS_EVENT;
let SCHEDULE_PARAMETERS:DataCells;
let SCHEDULE_ACTIVITY_PARAMETERS:DataCells
let ACTIVITY_STRUCTURE_DESC;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_SCHEDULES;
let PROJECTS_PARAMETERS:DataCells
let CONTAINER_COLUMNS_CALENDAR
let CONTAINER_COLUMNS_UNIT
let CONTAINERS_UNIT

ALLURE.epic("SCHEDULING");
ALLURE.feature("Events");
ALLURE.story("SCH- 3.57 | Create new events");

describe("SCH- 3.57 | Create new events", () => {
    before(function () {
        cy.fixture("scheduling/sch-3.57-create-new-events.json").then((data) => {
            this.data = data
         CONTAINERS_EVENT= this.data.CONTAINERS.EVENT
         CONTAINERS_ACTIVITY_STRUCTURE= this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINER_COLUMNS_CALENDAR = this.data.CONTAINER_COLUMNS.CALENDAR
         CONTAINER_COLUMNS_UNIT= this.data.CONTAINER_COLUMNS.UNIT
         CONTAINERS_UNIT= this.data.CONTAINERS.UNIT

         PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:"SmiJ"
        }

        SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
        };
       })
     cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    }) 

    it("TC - Search and select unit Hour", function () { 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.UNIT);
        _common.openTab(app.TabBar.UNIT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
        _common.setup_gridLayout(cnt.uuid.UNITSOFMEASUREMENT, CONTAINER_COLUMNS_UNIT)
        });
        _common.create_newRecord(cnt.uuid.UNITSOFMEASUREMENT);
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_DESC)
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UNIT_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_OF_MEASUREMENT)
        cy.SAVE();
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,UNIT_DESC);
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UOM_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_UNIT.TYPE)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    });
    it("TC - Search and select unit Day", function () { 
        _common.create_newRecord(cnt.uuid.UNITSOFMEASUREMENT);
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_DESC1)
        _common.enterRecord_inNewRow(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UNIT_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,UNIT_OF_MEASUREMENT1)
        cy.SAVE();
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,UNIT_DESC1);
        _common.edit_dropdownCellWithCaret(cnt.uuid.UNITSOFMEASUREMENT,app.GridCells.UOM_TYPE_FK,commonLocators.CommonKeys.LIST,CONTAINERS_UNIT.TYPE1)
        _common.waitForLoaderToDisappear()
        cy.SAVE();
        _common.waitForLoaderToDisappear()    
    });
    it("TC - Create Calender ", function () { 
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART);
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART,Sidebar.SideBarOptions.CALENDAR);
        _common.openTab(app.TabBar.CALENDER).then(() => {
        _common.setDefaultView(app.TabBar.CALENDER)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.SCHEDULE, app.FooterTab.CALENDARS, 2);
        _common.setup_gridLayout(cnt.uuid.SCHEDULE,CONTAINER_COLUMNS_CALENDAR)
        });
        _common.create_newRecord(cnt.uuid.SCHEDULE)
        _common.maximizeContainer(cnt.uuid.SCHEDULE)
        _common.enterRecord_inNewRow(cnt.uuid.SCHEDULE,app.GridCells.CODE,app.InputFields.DOMAIN_TYPE_CODE,CALENDAR_CODE)
        _common.enterRecord_inNewRow(cnt.uuid.SCHEDULE,app.GridCells.DESCRIPTION_INFO,app.InputFields.DOMAIN_TYPE_TRANSLATION,CALENDAR_DESC)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULE,app.GridCells.BAS_UOM_HOUR_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,UNIT_DESC)
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.SCHEDULE,app.GridCells.BAS_UOM_DAY_FK,commonLocators.CommonKeys.GRID,app.InputFields.INPUT_GROUP_CONTENT,UNIT_DESC1)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    }); 
    it('TC - Create project', function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
        _common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);		
        _common.waitForLoaderToDisappear()
        _common.openTab(app.TabBar.PROJECT).then(() => {
        _common.setDefaultView(app.TabBar.PROJECT)
        _common.waitForLoaderToDisappear()
        _common.select_tabFromFooter(cnt.uuid.PROJECTS, app.FooterTab.PROJECTS, 0);
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECTS)
        _common.create_newRecord(cnt.uuid.PROJECTS);
        _projectPage.enterRecord_toCreateProject(PROJECTS_PARAMETERS);
        cy.SAVE();          
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
        _common.edit_dropdownCellWithInput(cnt.uuid.PROJECTS, app.GridCells.CALENDAR_FK, commonLocators.CommonKeys.GRID, app.InputFields.INPUT_GROUP_CONTENT, CALENDAR_CODE);
        cy.SAVE();
        _common.waitForLoaderToDisappear()
    })
    it("TC - Create new schedule header and activity record.", function () {
          _common.openTab(app.TabBar.SCHEDULING).then(() => {
          _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES,2);
          _common.setup_gridLayout(cnt.uuid.SCHEDULES, CONTAINER_COLUMNS_SCHEDULES)
          });
          _common.clear_subContainerFilter(cnt.uuid.SCHEDULES)
          _common.create_newRecord(cnt.uuid.SCHEDULES);
          _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
          _common.waitForLoaderToDisappear()
          cy.SAVE();
          _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
          _common.waitForLoaderToDisappear()
    });
    it("TC - Add activity structure ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
        _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _schedulePage.enterDataTo_CreateScheduleActivity(SCH_ACTDESC,CONTAINERS_EVENT.SCH_QUANTITY, CONTAINERS_EVENT.SCH_UOM, _common.getDate(CONTAINERS_EVENT.CURRENT),_common.getDate(CONTAINERS_EVENT.CURRENT))
		_common.waitForLoaderToDisappear()
		 cy.SAVE()
		_common.waitForLoaderToDisappear()
    });
    it("TC - Create Event and verify  IS_DISPLAYED and  PLACED_BEFORE is checked ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
        _common.select_tabFromFooter(cnt.uuid.SCHEDULING_EVENTS,app.FooterTab.EVENTS)
        });
        _common.maximizeContainer(cnt.uuid.SCHEDULING_EVENTS)
        _common.create_newRecord(cnt.uuid.SCHEDULING_EVENTS)
        _common.enterRecord_inNewRow(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_DESCRIPTION,EVENT_DESC)
        _common.set_cellCheckboxValue(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.IS_DISPLAYED,CONTAINERS_EVENT.CHECK)
        _common.set_cellCheckboxValue(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.PLACED_BEFORE,CONTAINERS_EVENT.CHECK)
        _common.enterRecord_inNewRow(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.DISTANCE_TO,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_EVENT.POSITIVE_DATE)
        cy.SAVE()
        _common.waitForLoaderToDisappear()
    })
    it("TC - Veriy the Distance to Date with Date", function () {
        _common.select_rowHasValue(cnt.uuid.SCHEDULING_EVENTS,EVENT_DESC)
        _common.assert_cellData_insideActiveRow(cnt.uuid.SCHEDULING_EVENTS,app.GridCells.DATE,_common.getDate(CONTAINERS_EVENT.FETCHED_DATE_DECREMENT ,CONTAINERS_EVENT.POSITIVE_DATE, _common.getDate(CONTAINERS_EVENT.CURRENT)))
    })
    after(() => {
      cy.LOGOUT();
      })    
});
