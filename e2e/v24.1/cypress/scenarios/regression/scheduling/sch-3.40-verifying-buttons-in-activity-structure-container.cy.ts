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
const SCHEDULES_CODE = "SCH-" + Cypress._.random(0, 999);
const SCHEDULES_DESC = "SCH-DESC-" + Cypress._.random(0, 999);
const ACTIVITY_STRUCTURE_DESC = "ACT-DESC-" + Cypress._.random(0, 999);
const ACT_SUBDESC1 = "ACT_SUBDECS1-" + Cypress._.random(0, 999);
const ACT_DECS2 = "LOC-ACT_DECS2-" + Cypress._.random(0, 999);
const ACT_SUBDECS2 = "ACT_SUBDECS2-" + Cypress._.random(0, 999);

ALLURE.epic("SCHEDULING");
ALLURE.feature("Line Of Balance");
ALLURE.story("SCH- 3.40 | Verify Button in activity structure container");

describe("SCH- 3.40 | Verify Button in activity structure container", () => {
    before(function () {   
        cy.fixture("scheduling/sch-3.40-verifying-buttons-in-activity-structure-container.json").then((data) => {
         this.data = data
         CONTAINER_COLUMNS_SCHEDULES = this.data.CONTAINER_COLUMNS.SCHEDULES
         CONTAINER_COLUMNS_ACTIVITY_STRUCTURE = this.data.CONTAINER_COLUMNS.ACTIVITY_STRUCTURE
         CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
         CONTAINERS_ACTIVITY_STRUCTURE = this.data.CONTAINERS.ACTIVITY_STRUCTURE
         PLANNED_START = _common.getDate(commonLocators.CommonKeys.CURRENT_SMALL)
		 PLANNED_FINISH = _common.getDate(commonLocators.CommonKeys.INCREMENTED_SMALL,CONTAINERS_ACTIVITY_STRUCTURE.NO_OF_DAYS)
         SCHEDULE_PARAMETERS = {
            [app.GridCells.CODE]: SCHEDULES_CODE,
            [app.GridCells.DESCRIPTION_INFO]: SCHEDULES_DESC,
        };
      }).then(()=>{
             cy.preLoading(Cypress.env('adminUserName'), Cypress.env('adminPassword'), Cypress.env('parentCompanyName'), Cypress.env('childCompanyName'));
            _common.openDesktopTile(tile.DesktopTiles.PROJECT);
            _common.toggleSidebar(sidebar.sideBarList.SIDEBAR_SEARCH).delete_pinnedItem()
            _common.search_fromSidebar(commonLocators.CommonKeys.STANDARD,Cypress.env('PROJECT_NUMBER')).pinnedItem();   
       })
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

    it("TC - Create Record and Sub record in activity structure", function () {
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
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION).then(($desc1) => {
            Cypress.env("ACTIVITY_DESC1", $desc1.text())
        })   
        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,ACT_SUBDESC1) 
        cy.SAVE()    
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACT_SUBDESC1)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACT_SUBDESC1)
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION).then(($subdesc1) => {
            Cypress.env("ACTIVITY_SUBDESC1", $subdesc1.text())
        })  
        
        _common.create_newRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,ACT_DECS2)
       cy.SAVE()
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACT_DECS2)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACT_DECS2)
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION).then(($desc2) => {
            Cypress.env("ACTIVITY_DESC2", $desc2.text())
        }) 

        _common.create_newSubRecord(cnt.uuid.ACTIVITY_STRUCTURE);
        _common.enterRecord_inNewRow(cnt.uuid.ACTIVITY_STRUCTURE,app.GridCells.DESCRIPTION,app.InputFields.DOMAIN_TYPE_COMMENT,ACT_SUBDECS2)
        cy.SAVE()
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACT_SUBDECS2)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACT_SUBDECS2)
        _common.getText_fromCell(cnt.uuid.ACTIVITY_STRUCTURE, app.GridCells.DESCRIPTION).then(($subdesc2) => {
            Cypress.env("ACTIVITY_SUBDESC2", $subdesc2.text())
        }) 
        cy.REFRESH_CONTAINER()

    });

    it("TC - Check Collapse,Expand,Collapseall,Expandall button functionality", function () {

        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACT_DECS2)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.IconButtons.ICO_TREE_COLLAPSE)    
        _validate.verify_isRecordPresent(cnt.uuid.ACTIVITY_STRUCTURE,ACT_DECS2);
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACT_DECS2)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACT_SUBDECS2)
        _validate.verify_isRecordPresent(cnt.uuid.ACTIVITY_STRUCTURE,ACT_SUBDECS2);          
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.ToolBar.ICO_TREE_COLLAPSE_ALL)
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _validate.verify_isRecordPresent(cnt.uuid.ACTIVITY_STRUCTURE,ACTIVITY_STRUCTURE_DESC);
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.clickOn_toolbarButton(cnt.uuid.ACTIVITY_STRUCTURE,btn.ToolBar.ICO_TREE_EXPAND_ALL) 
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACT_SUBDESC1)
        _validate.verify_isRecordPresent(cnt.uuid.ACTIVITY_STRUCTURE,ACT_SUBDESC1);
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACT_SUBDECS2)
        _validate.verify_isRecordPresent(cnt.uuid.ACTIVITY_STRUCTURE,ACT_SUBDECS2); 
    })

    it("TC - Verify Search activity Functionality", function () {
        _common.clear_subContainerFilter(cnt.uuid.ACTIVITY_STRUCTURE)
        _common.search_inSubContainer(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _common.select_rowHasValue(cnt.uuid.ACTIVITY_STRUCTURE, ACTIVITY_STRUCTURE_DESC)
        _validate.verify_isRecordPresent(cnt.uuid.ACTIVITY_STRUCTURE,ACTIVITY_STRUCTURE_DESC);
    })
})

    after(() => {
        cy.LOGOUT();
    })
