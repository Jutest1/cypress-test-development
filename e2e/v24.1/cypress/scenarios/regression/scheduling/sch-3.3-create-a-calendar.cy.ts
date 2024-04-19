import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'
import Sidebar from 'cypress/locators/sidebar';

let CONTAINERS_UNIT;
let CONTAINER_COLUMNS_UNIT;
let CONTAINER_COLUMNS_CALENDAR;

const ALLURE = Cypress.Allure.reporter.getInterface();

const UNIT_DESC = "UNIT-DESC-" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT = "H-" + Cypress._.random(0, 999);
const UNIT_OF_MEASUREMENT1 = "D-" + Cypress._.random(0, 999);
const UNIT_DESC1 = "UNIT-DESC-" + Cypress._.random(0, 999);
const CALENDAR_CODE = "CAL-CODE" + Cypress._.random(0, 99);
const CALENDAR_DESC = "CAL-DESC" + Cypress._.random(0, 99);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Calendars");
ALLURE.story("SCH- 3.3 | Create a calendars");
describe("SCH- 3.3 | Create a calendars", () => {

    before(function () {
        cy.fixture("scheduling/sch-3.3-create-a-calendar.json").then((data) => {
            this.data = data;
            CONTAINER_COLUMNS_UNIT= this.data.CONTAINER_COLUMNS.UNIT
            CONTAINERS_UNIT= this.data.CONTAINERS.UNIT
            CONTAINER_COLUMNS_CALENDAR = this.data.CONTAINER_COLUMNS.CALENDAR
        }).then(()=>{
            cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
    
        })
    });
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
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.openTab(app.TabBar.UNIT).then(() => {
        _common.select_tabFromFooter(cnt.uuid.UNITSOFMEASUREMENT, app.FooterTab.UNITOFMEASUREMENT, 2);
        });
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

    it("TC - Verify the created calender", function () { 
        _common.maximizeContainer(cnt.uuid.SCHEDULE)
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.SCHEDULE)
        _common.assert_cellData_insideActiveRow(cnt.uuid.SCHEDULE,app.GridCells.DESCRIPTION_INFO,CALENDAR_DESC)   
    });
    after(() => {
        cy.LOGOUT();
        })

}); 
