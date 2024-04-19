import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

let PROJECTS_PARAMETERS:DataCells
let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;
let CONTAINER_COLUMNS_LOCATIONS;
let CONTAINERS_LOCATIONS;
let MODAL_PROJECTS
let PLANNED_START
let PLANNED_FINISH

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);
const LOCATION_CODE1 = "LOC1-" + Cypress._.random(0, 999);
const LOCATION_DESC1 = "LOC-DESC1-" + Cypress._.random(0, 999);
const LOCATION_CODE2 = "LOC2-" + Cypress._.random(0, 999);
const LOCATION_DESC2 = "LOC-DESC2-" + Cypress._.random(0, 999);
const PROJECT_NO="PRJ" + Cypress._.random(0, 999);
const PROJECT_DESC="PRDESC-" + Cypress._.random(0, 999);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Line Of Balance");
ALLURE.story("SCH- 3.35 | Split Activity by Location");

describe("SCH- 3.35 | Split Activity by Location", () => {
    before(function () {   
        cy.fixture("scheduling/sch-3.35-spilt-activity-by-location.json").then((data) => {
         this.data = data
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINERS_LOCATIONS = this.data.CONTAINERS.LOCATIONS
         CONTAINER_COLUMNS_LOCATIONS = this.data.CONTAINER_COLUMNS.LOCATIONS
         CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
         MODAL_PROJECTS=this.data.MODAL.PROJECTS
         PLANNED_START = _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
		 PLANNED_FINISH = _common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,CONTAINERS_ACTIVITY_STRUCTURE.NO_OF_DAYS)
         SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
        };
        PROJECTS_PARAMETERS={
            [commonLocators.CommonLabels.PROJECT_NUMBER]:PROJECT_NO,
            [commonLocators.CommonLabels.NAME]:PROJECT_DESC,
            [commonLocators.CommonLabels.CLERK]:MODAL_PROJECTS.CLERK
        }
      }).then(()=>{
             cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.waitForLoaderToDisappear()
           _common.waitForLoaderToDisappear()  
       })
    })

	it('TC - Create project', function () {
		_common.toggleSidebar(sidebar.sideBarList.SIDEBAR_QUICKSTART)
		_common.search_fromSidebar(commonLocators.CommonKeys.QUICKSTART, sidebar.SideBarOptions.PROJECT);		
        _common.waitForLoaderToDisappear()
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
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
        _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,PROJECT_NO).pinnedItem();
        _common.waitForLoaderToDisappear()
	})

    it("TC - Create schedule header", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_REC_NEW)
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        _common.waitForLoaderToDisappear()
        cy.SAVE();
    });

    it("TC - Create location records", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.PROJECT_LOCATION, app.FooterTab.LOCATIONS,3)
            _common.setup_gridLayout(cnt.uuid.PROJECT_LOCATION, CONTAINER_COLUMNS_LOCATIONS)
        });
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
        _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(LOCATION_CODE1, LOCATION_DESC1)
        _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT, CONTAINERS_LOCATIONS.QUANTITYFACTOR1)
        cy.SAVE()
        _common.clear_subContainerFilter(cnt.uuid.PROJECT_LOCATION)
        _common.create_newRecord(cnt.uuid.PROJECT_LOCATION)
        _estimatePage.enterRecord_toCreateLocation(LOCATION_CODE2, LOCATION_DESC2)
        _common.edit_containerCell(cnt.uuid.PROJECT_LOCATION, app.GridCells.QUANTITY_SMALL, app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_LOCATIONS.QUANTITYFACTOR2)
        cy.SAVE()
    });

    it("TC - Add activity structure", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
           });
           _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO);
        _common.openTab(app.TabBar.PLANNING).then(() => {
			_common.waitForLoaderToDisappear()
		    _common.setDefaultView(app.TabBar.PLANNING,commonLocators.CommonKeys.DEFAULT)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
		});
		_schedulePage.enterDataTo_CreateScheduleActivity(ACTIVITY_STRUCTURE_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY, CONTAINERS_ACTIVITY_STRUCTURE.UOM,PLANNED_START,PLANNED_FINISH)
		_common.waitForLoaderToDisappear()
		 cy.SAVE()
		_common.waitForLoaderToDisappear()
           
    });

    it("TC - Split Activity by Location using Wizard", function () {
        _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_NEW_WIZARD)
		_common.search_fromSidebar(commonLocators.CommonKeys.WIZARD,sidebar.SideBarOptions.SPLIT_ACTIVITY_BY_LOCATIONS);		
		_common.waitForLoaderToDisappear()
        cy.wait(1000)
        _common.clickOn_modalFooterButton(btn.ButtonText.OK);
        _common.waitForLoaderToDisappear()
        cy.REFRESH_CONTAINER()
        _common.waitForLoaderToDisappear()
        _common.select_activeRowInContainer(cnt.uuid.ACTIVITY_STRUCTURE)    

    });

    it("TC - Verify Description Assertion in Activity Structure", function () {
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.QUANTITY_SMALL).then(($ttl) => {
            Cypress.env("TOTAL_QUANTITY", $ttl.text())
        })
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC + " " + LOCATION_CODE1)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC + " " + LOCATION_CODE1)
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.QUANTITY_SMALL).then(($Qty1) => {
            Cypress.env("QUANTITY1", $Qty1.text())
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION, ACTIVITY_STRUCTURE_DESC + " " + LOCATION_CODE1)
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC + " " + LOCATION_CODE2)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC + " " + LOCATION_CODE2)
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.QUANTITY_SMALL).then(($Qty2) => {
            Cypress.env("QUANTITY2", $Qty2.text())
        })
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION, ACTIVITY_STRUCTURE_DESC + " " + LOCATION_CODE2)
    });

    it("TC - Verify Quantity Assertion in Activity Structure ", function () {
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _validate.verify_isRecordAdditionOfTwoValuesInRow(cnt.uuid.ACTIVITY_STRUCTURE, Cypress.env("QUANTITY1"), Cypress.env("QUANTITY2"), app.GridCells.QUANTITY_SMALL)
    });

})
