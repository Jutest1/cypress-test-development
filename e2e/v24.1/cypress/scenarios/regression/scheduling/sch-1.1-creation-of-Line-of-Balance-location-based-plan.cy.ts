import { _common, _estimatePage, _mainView, _modalView, _schedulePage, _sidebar, _validate } from 'cypress/pages';
import { app, btn,tile, cnt, sidebar, commonLocators } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

let SCHEDULE_ACTIVITY_PARAMETERS: DataCells;
let SCHEDULE_ACTIVITY_PARAMETERS1:DataCells;
let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_LOCATIONS;
let CONTAINERS_LOCATIONS;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;

const ALLURE = Cypress.Allure.reporter.getInterface();

const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const LOCATION_CODE = "LOC-" + Cypress._.random(0, 999);
const LOCATION_DESC = "LOC-DESC-" + Cypress._.random(0, 999);
const LOCATION_CODE1 = "LOC1-" + Cypress._.random(0, 999);
const LOCATION_DESC1 = "LOC-DESC1-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC1 = "ACT-DESC1-" + Cypress._.random(0, 999);


ALLURE.epic("SCHEDULING");
ALLURE.feature("Line Of Balance");
ALLURE.story("SCH- 1.1 | Creation of line of balance: location-based plan");

describe("SCH- 1.1 | Creation of line of balance: location-based plan", () => {

    before(function () {
        cy.fixture("scheduling/sch-1.1-creation-of-Line-of-Balance-location-based-plan.json").then((data) => {
            this.data = data;
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINER_COLUMNS_LOCATIONS = this.data.CONTAINER_COLUMNS.LOCATIONS
         CONTAINERS_LOCATIONS = this.data.CONTAINERS.LOCATIONS
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE

            SCHEDULE_PARAMETERS = {
                [app.GridCells.CODE]: SCHEDULES_CODE,
                [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
            };
			SCHEDULE_ACTIVITY_PARAMETERS = {
				[app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_DESC,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
				[app.GridCells.PLANNED_START]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START),
                [app.GridCells.PLANNED_FINISH]:_common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_FINISH,5),
			};
            SCHEDULE_ACTIVITY_PARAMETERS1 = {
				[app.GridCells.DESCRIPTION]: ACTIVITY_STRUCTURE_DESC1,
				[app.GridCells.QUANTITY_SMALL]: CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY,
				[app.GridCells.PLANNED_START]: _common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_START),
                [app.GridCells.PLANNED_FINISH]: _common.getDate(CONTAINERS_ACTIVITY_STRUCTURE.PLANNED_FINISH,10),
			};
        })
        cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
        _common.openDesktopTile(tile.DesktopTiles.PROJECT);
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();
        });
        
       
    it("TC - Create new schedules header", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.create_newRecord(cnt.uuid.SCHEDULES);
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        cy.SAVE();
    });

    it("TC - Create locations record", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS,3)
            _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATIONS)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
        _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(LOCATION_CODE, LOCATION_DESC)
        _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATIONS.QUANTITYFACTOR1)
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
        _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(LOCATION_CODE1, LOCATION_DESC1)
        _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LOCATIONS.QUANTITYFACTOR1)
        cy.SAVE()
    });

    it("TC - Add first activity structure", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
         _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
        });
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.PLANNING).then(() => {
         _common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE)
         _common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
        });
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS)
        
        _common.waitForLoaderToDisappear()
        _estimatePage.assign_LocationCode_To_Line_Items(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.LOCATION_FK, LOCATION_CODE)
        cy.SAVE();
    });

    it("TC - Add second activity structure", function () {
        _schedulePage.enterRecord_ToActivityAndGANTTGrid(cnt.uuid.ACTIVITY_STRUCTURE,SCHEDULE_ACTIVITY_PARAMETERS1)
        _common.waitForLoaderToDisappear()
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _estimatePage.assign_LocationCode_To_Line_Items(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.LOCATION_FK,LOCATION_CODE1)
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        cy.SAVE();
    });

    it("TC - Verify line of balance for both location activity", function () {
        _common.openTab(app.TabBar.LOB)
               .then(()=>{
                    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.LINE_OF_BALANCE).containsValue(LOCATION_CODE);
                    _mainView.findModuleClientArea().findAndShowContainer(cnt.uuid.LINE_OF_BALANCE).containsValue(LOCATION_CODE1);
                }); 
    })

    after(() => {
        cy.LOGOUT();
    });
})
