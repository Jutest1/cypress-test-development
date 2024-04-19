import { _common, _estimatePage, _mainView, _modalView, _wipPage, _schedulePage, _projectPage, _bidPage, _saleContractPage,_sidebar, _validate } from 'cypress/pages';
import { app,tile, cnt, sidebar, commonLocators, btn } from 'cypress/locators';
import type { DataCells } from 'cypress/pages/interfaces.d.ts'

let SCHEDULE_PARAMETERS:DataCells;
let CONTAINER_COLUMNS_SCHEDULES;
let CONTAINER_COLUMNS_ACTIVITY_STRUCTURE;
let CONTAINERS_ACTIVITY_STRUCTURE;
let PLANNED_START
let PLANNED_FINISH

const ALLURE = Cypress.Allure.reporter.getInterface();
const SCHEDULES_CODE = "SCHE-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCHE-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);
const ACT_STRUCT_DESC2 = "ACT_STRUCT_DESC2" + Cypress._.random(0, 999);
const ACT_STRUCT_DESC3 = "ACT_STRUCT_DESC3" + Cypress._.random(0, 999);
const QUANTITY_EDIT = Cypress._.random(0, 999);
const NO_OF_DAYS = Cypress._.random(0, 100);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Generate Activities");
ALLURE.story("SCH- 3.33 | Create Schedule Sub Activity ");

describe("SCH- 3.33 | Create Schedule Sub Activity ", () => {
    before(function () {   
        cy.fixture("scheduling/sch-3.33-create-sub-activities.json").then((data) => {
            this.data = data
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
         PLANNED_START = _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
		 PLANNED_FINISH = _common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,NO_OF_DAYS)
         SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
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
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem(); 
            _common.waitForLoaderToDisappear()   
       })
    })
   
    it("TC - Create new schedule header", function () {
        _common.openTab(app.TabBar.SCHEDULING).then(() => {
            _common.select_tabFromFooter(cnt.uuid.SCHEDULES, app.FooterTab.SCHEDULES, 2);
            _common.setup_gridLayout(cnt.uuid.SCHEDULES,CONTAINER_COLUMNS_SCHEDULES)
        });
        _common.clear_subContainerFilter(cnt.uuid.SCHEDULES);
        _common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_REC_NEW)
        _schedulePage.enterRecord_toCreateSchedules(cnt.uuid.SCHEDULES,SCHEDULE_PARAMETERS);
        _common.waitForLoaderToDisappear()
         cy.SAVE();
        _common.waitForLoaderToDisappear()
		_common.clickOn_toolbarButton(cnt.uuid.SCHEDULES,btn.ToolBar.ICO_GO_TO)
		_common.waitForLoaderToDisappear()
    });

    it("TC - Add activity structure, sub activity and append data by copy paste button ", function () {
        _common.openTab(app.TabBar.PLANNING).then(() => {
			_common.waitForLoaderToDisappear()
			_common.setDefaultView(app.TabBar.PLANNING,commonLocators.CommonKeys.DEFAULT)
			_common.waitForLoaderToDisappear()
			_common.select_tabFromFooter(cnt.uuid.ACTIVITY_STRUCTURE, app.FooterTab.ACTIVITY_STRUCTURE, 0);
			_common.setup_gridLayout(cnt.uuid.ACTIVITY_STRUCTURE, CONTAINER_COLUMNS_ACTIVITY_STRUCTURE)
		});
		_schedulePage.enterDataTo_CreateScheduleActivity(ACTIVITY_STRUCTURE_DESC, CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[0],CONTAINERS_ACTIVITY_STRUCTURE.UOM[0], PLANNED_START,PLANNED_FINISH)
		_common.waitForLoaderToDisappear()
		 cy.SAVE()
		_common.waitForLoaderToDisappear()
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,ACT_STRUCT_DESC2)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[1])
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.QUANTITY_UOM_FK,app.InputFields.INPUT_GROUP_CONTENT,CONTAINERS_ACTIVITY_STRUCTURE.UOM[1])
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_START,app.InputFields.INPUT_GROUP_CONTENT, PLANNED_START)
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_FINISH,app.InputFields.INPUT_GROUP_CONTENT,PLANNED_FINISH)
         cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.ToolBar.ICO_COPY_PASTE_DEEP)
        _common.waitForLoaderToDisappear()
           
    });

    it("TC - Verify the assertion of Append by context paste button ", function() {
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,ACT_STRUCT_DESC2)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.QUANTITY_SMALL,CONTAINERS_ACTIVITY_STRUCTURE.QUANTITY[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.QUANTITY_UOM_FK,CONTAINERS_ACTIVITY_STRUCTURE.UOM[1])
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_START,PLANNED_START)
        _common.assert_cellData_insideActiveRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.PLANNED_FINISH,PLANNED_FINISH)

    })
    it("TC - Edit, Delete the appended Data and verify the deleted data", function () {
        _common.clickOn_activeRowCell(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION)
        _common.edit_containerCell(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,ACT_STRUCT_DESC3)
        _common.edit_containerCell(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.QUANTITY_SMALL,app.InputFields.INPUT_GROUP_CONTENT,QUANTITY_EDIT)
         cy.SAVE()
        _common.waitForLoaderToDisappear()
        _common.delete_recordFromContainer(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.waitForLoaderToDisappear()
        _validate.verify_isRecordDeleted(cnt.uuid.ACTIVITY_STRUCTURE, ACT_STRUCT_DESC3)
        
    })

    after(() => {
        cy.LOGOUT();
    })
})